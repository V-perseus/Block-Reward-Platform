import Router from "express";
import { User } from "../models/userModel.js";
import { Client } from "../models/clientModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import Nylas from 'nylas';
import nodemailer from 'nodemailer'
import  Twilio from "twilio";
import  {installBRT,transfer,installUSDC} from './Lib/algorand.js'
import algosdk from 'algosdk';
Nylas.config({
    clientId: process.env['NYLAS_CLIENT_ID'],
    clientSecret: process.env['NYLAS_CLIENT_SECRET'],
});
console.log(process.env['NYLAS_ACCESS_TOKEN'])
const nylas = Nylas.with(process.env['NYLAS_ACCESS_TOKEN']);


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

const client = new Twilio(accountSid, authToken);
const router = Router();
const verifycodeList = {};


// Endpoint for Register
router.post("/", async (req, res) => {

    const { firstName, lastName, email, password, location, language, experience, availableTime, phoneNumber } = req.body;
    // if (!firstName || !lastName) {
    //     return res
    //         .status(404)
    //         .json({ msg: "Please Provide all necessary fields" });
    // }

    if (!email || !password) {
        return res
            .status(404)
            .json({ msg: "Please Provide all necessary fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ msg: "User Already Exists!" });
    }

    const saltRounds = 10;
    const isInterpreter = "interpreter"
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const balance = 0;
    const newUser = new User({
        firstName,
        lastName,
        email,
        passwordHash,
        location,
        experience,
        language,
        phoneNumber,
        availableTime,
        isInterpreter,
        balance
    });

    const savedUser = await newUser.save();
    res.send({ user: savedUser })

});

router.post("/client", async (req, res) => {

    const { firstName, lastName, email, password, location, phoneNumber, company } = req.body;
    if (!email || !password) {
        return res
            .status(404)
            .json({ msg: "Please Provide all necessary fields" });
    }
    if (!email || !password) {
        return res
            .status(404)
            .json({ msg: "Please Provide all necessary fields" });
    }

    const existingclient = await Client.findOne({ email });
    if (existingclient) {
        return res.status(400).json({ msg: "Client Already Exists!" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const isInterpreter = "client"
    const newClient = new Client({
        firstName,
        lastName,
        email,
        passwordHash,
        location,
        phoneNumber,
        company,
        isInterpreter
    });

    const savedClient = await newClient.save();
    res.send({ client: savedClient })
})

// Endpoint for Login
router.post("/login", async (req, res) => {
    const {type, email, password } = req.body;
 
         if (!email || !password) {
                return res.status(400).json({ msg:  type + " or Password is missing" });
            }

            const matchUser = await User.findOne({ email });

            if (!matchUser) {
                const matchClient = await Client.findOne({ email })
                if (!matchClient)
                    return res.status(401).json({ msg: type + " or Password is invalid!" });
                const matchPassword = await bcrypt.compare(
                    password,
                    matchClient.passwordHash
                );

                if (!matchPassword) {
                    return res.status(401).json({ msg: type + " or Password is invalid!" });
                }
                const token = jwt.sign(
                    {
                        userId: matchClient._id,
                        emailConfirmed: matchClient.emailConfirmed,
                    },
                    process.env["JWT_SECRET"],
                    {
                        expiresIn: process.env["TOKEN_EXPIRATION_TIME"]
                    }
                );
                console.log(process.env["COOKIE_SECURE"])
                console.log(matchClient._id, 'id')
                res.send({ token: token, id: matchClient._id });
            }
            else {
                const matchPassword = await bcrypt.compare(
                    password,
                    matchUser.passwordHash
                );

                if (!matchPassword) {
                    return res.status(401).json({ msg: type + " or Password is invalid!" });
                }
                const token = jwt.sign(
                    {
                        userId: matchUser._id,
                        emailConfirmed: matchUser.emailConfirmed,
                    },
                    process.env["JWT_SECRET"],
                    {
                        expiresIn: process.env["TOKEN_EXPIRATION_TIME"]
                    }
                );
                console.log(process.env["COOKIE_SECURE"])
                console.log(matchUser._id, 'id')
                let sk = matchUser.algo_sk

                res.send({ token: token, id: matchUser._id,balance:matchUser.balance,address:matchUser.algo_address,data:sk });
            }
     });

// Endpoint for Logout
router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    }).send();
});

// Endpoint to check if logged in
router.get("/loggedin", (req, res) => {
    if (!req.user) {
        return res.json({ loggedIn: false, emailConfirmed: false });
    }
    if (req.user.emailConfirmed)
        return res.json({ loggedIn: true, emailConfirmed: true });
    else
        return res.json({ loggedIn: true, emailConfirmed: false });
});

router.get("/sendVerifyEmail", (req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Invalid Token" });
    }

    User.findById(req.user.userId).then(user => {
        if (user.emailConfirmed)
            return res.json({ status: 1, msg: "Already Email Verified!" })
        let emailVerifyToken = jwt.sign(
            {
                userId: user._id
            },
            process.env["JWT_EMAIL_VERIFY_SECRET"]
        );
        let verifyUrl = `${process.env["FRONT_URL"]}/verifyEmail?token=${emailVerifyToken}`;
        const draft = nylas.drafts.build({
            subject: 'Verify Email',
            body: `<html>
                             Please click <a href="${verifyUrl}">this url</a> to verify your email!
                            </html>`,
            to: [{ name: 'My Event Friend', email: user.email }]
        });
        draft.send().then(message => {
            return res.json({ status: 2, msg: "Successfully verification email was sent!" });
        }).catch(err => {
            return res.json({ status: 3, msg: "Error in verification email!" });
        })

    }).catch(err => {
        console.log(err);
        return res.status(401).json({ msg: "Invalid Token3" });
    })
});

router.post("/sendResetEmail", (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        let emailVerifyToken = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env["JWT_SECRET"]
        );
        let verifyUrl = `${process.env["FRONT_URL"]}/resetPassword?token=${emailVerifyToken}`;

        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'veniaminit9@gmail.com',
            pass: 'xkemqmtklxqirgkz'
                  }
                });
                var mailOptions = {
                  from: 'petri430tom@gmail.com',
                  to: user.email,
                  subject: 'Reset Password',
                  html: `<html>
                             Please click <a href="${verifyUrl}">this url</a> to reset your password!
                            </html>`
                };
                  
                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                    res.status(400).json({status:2,msg:'Error in sending reset email!'});
                  } else {
                    console.log('Email sent: ' + info.response);
                    res.status(400).json({status:3,msg:'Successfully reset email was sent!'});
                  }
                });

    }).catch(err => {
        return res.status(401).json({ msg: "Not Found Email!" });
    })

});

router.get("/verifyEmail", (req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Invalid Token" });
    }
    jwt.verify(req.query.token, process.env['JWT_EMAIL_VERIFY_SECRET'], async (error, decoded) => {

        if (error) {
            return res.status(401).json({ msg: "Invalid Verification Token" });
        }
        else if (req.user.userId !== decoded.userId) {
            return res.status(401).json({ msg: "Please Open verification page on the same browser in which you logged in!" });
        } else {
            let result = await User.findByIdAndUpdate(decoded.userId, { emailConfirmed: true });
            console.log(result, decoded.userId)
            const token = jwt.sign(
                {
                    userId: req.user.userId,
                    emailConfirmed: true
                },
                process.env["JWT_SECRET"],
                {
                    expiresIn: process.env["TOKEN_EXPIRATION_TIME"]
                }
            );
            return res.json({ token: token });
        }
    })

});

router.post("/resetPassword", (req, res) => {
    let { token, newpassword } = req.body;
    jwt.verify(token, process.env['JWT_SECRET'], async (error, decoded) => {
        if (error) {
            return res.status(401).json({ msg: "Invalid Reset Token" });
        }
        else {
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(newpassword, saltRounds);
            console.log(decoded.userId, passwordHash, newpassword)
            User.findByIdAndUpdate(decoded.userId, { passwordHash: passwordHash, emailConfirmed: true })
                .then(user => {
                    const newToken = jwt.sign(
                        {
                            userId: user._id,
                            emailConfirmed: true
                        },
                        process.env["JWT_SECRET"],
                        {
                            expiresIn: process.env["TOKEN_EXPIRATION_TIME"]
                        }
                    );
                    return res.json({ user: newToken });
                }   ).catch(error => {
                    return res.status(401).json({ msg: "New Email Save Error!" });
                })

        }
    })

});

router.post("/update_balance",(req,res)=>{
    let {email,balance} = req.body;

    User.updateOne({email:email},{balance:balance},function(err,res1){
             return res.json({ status: 'ok' });
    })
       
})

router.post("/info", (req, res) => {
    const { language, experience, time, phoneNumber, userId, availableTime, firstName, location, lastName, company } = req.body;
    User.findById(userId, function (err, user) {
        if (!user) {
            Client.findById(userId, function (err, client) {
                client.firstName = firstName;
                client.lastName = lastName;
                client.phoneNumber = phoneNumber
                client.company = company
                client.location = location.label;
                client.save()
                    .then((client) => res.json("client updated"))
                    .catch((error) => console.log(error, 'error'))
                if (!client) {
                    res.status(404).send("file is not found");
                }
            })
        }
        else {
            if (user.isInterpreter == "interpreter") {
                user.language = language;
                user.experience = experience;
                user.time = time;
                user.phoneNumber = phoneNumber;
                user.availableTime = availableTime;
                user.location = location.label;
            }
            user
                .save()
                .then((user) => {
                    res.json("user updated!");
                })
                .catch((err) => {
                    res.status(400).send("Update not possible");
                });
        }
    });
})
router.post("/sendcode",(req,res)=>{
    const {email,password,type} = req.body;
    console.log(req.body)
    var code = Math.floor(Math.random() * 10000000) % 1000000 ;
    verifycodeList[email] = code;
    if(type == 'email')
    {
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'veniaminit9@gmail.com',
            pass: 'xkemqmtklxqirgkz'
          }
        });
        console.log(verifycodeList);
        var mailOptions = {
          from: 'petri430tom@gmail.com',
          to: email,
          subject: 'Blackward SignUp Verify Code',
          html: '<html><p>Verification code is ' +  code + ' </p></html>'
        };
          
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
            res.status(400).json({msg:'failed'});
          } else {
            console.log('Email sent: ' + info.response);
            res.status(400).json({msg:'success'});
          }
        });
    }
    else{
        console.log("sending sms code to " + email );
            client.messages
                .create({
                  from: twilioNumber,
                  to: email,
                  body: code,
                })
                .then((message) => console.log('sms sent: ' + message.sid));
        }
})
router.post("/verifycode",async (req,res)=>{
 
     const {code,email, password , firstName, lastName,location, language, experience, availableTime, phoneNumber } = req.body;

    // console.log(verifycodeList);
    // console.log(code);  
    // if(verifycodeList[email] == '' ){
    //     return res.status(400).json({ msg: "Verify Code is not correct!" });
    // } 
    // else{

    //     if (verifycodeList[email] == code) {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User Already Exists!" });
        }
        console.log("started creating account")
        const saltRounds = 10;
        const isInterpreter = "interpreter"
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const balance = "0"
        const account = algosdk.generateAccount();
        // console.log("generated new  account")
        const algo_address = account.addr
        const algo_sk = account.sk
        const manager = algosdk.mnemonicToSecretKey(process.env.REACT_APP_MANAGER_KEY)
        // console.log("manager",manager)
        try
            {
                
                await transfer(manager.addr,algo_address,manager.sk,5000000)
                console.log("Fee created",algo_address)
                
                await installBRT(algo_address,account.sk)
                console.log("installed brt")

                await installUSDC(algo_address,account.sk)
                console.log("installed usdc")

            }
            catch(err){
                console.log(err)
                   return res.status(400).json({ msg: "Server Error!" });     
            }
        
       
        const newUser = new User({
            firstName,
            lastName,
            email,
            passwordHash,
            location,
            experience,
            language,
            phoneNumber,
            availableTime,
            isInterpreter,
            balance,
            algo_address,
            algo_sk
        });

        const savedUser = await newUser.save();
        console.log("successed creating account")
        res.send({ user: savedUser,msg:'success',address:algo_address,data:algo_sk })
        
        // }
        // else{
        //        return res.status(400).json({ msg: "Verify Code is not correct!" });     
        // }
    // }
})

router.get("/get", (req, res) => {
    const userId = req.query.userId;
    User.findById(userId, function (err, user) {
        if (!user) {
            Client.findById(userId, function (err, client) {
                res.send({ data: "client", email: client.email })
                if (!client) {
                    res.status(404).send("user is not found");
                }
            })
        }
        else {
            res.send({ data: "Interpreter", email: user.email })
        }
    })
})

router.get("/clientinfo", (req, res) => {
    Client.find({ isInterpreter: "client" }).then((users) => res.send({ data: users }))
})
router.get("/interpreterinfo", (req, res) => {
    User.find({ isInterpreter: "interpreter" }).then((users) => res.send({ data: users }))
})


export default router;
