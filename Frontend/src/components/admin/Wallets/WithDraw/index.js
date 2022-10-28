import React,{useState} from 'react'
import { toast } from 'react-toastify'
import { Button, Input } from '../../../../styles'
import {
  Container,
  Heading,
  Body,
  Description,
  FromWrapper,
  FromBox,
  WraningMessage,
  ButtonWrapper,
  FormGroup
} from './styles'
import { transferAlgo,transferUSDC } from '../../../main/Mint/Lib/algorand'
export const WithDraw = (props) => {
  const { wallet, onClose } = props
  const [receiver,setReceiver] = useState('')
  const [amount,setAmount] = useState(0)
  const [isLoading,setIsLoading] = useState(false)
  
  const getSecrectKey = ()=>{
    let data = localStorage.getItem('data')
    const slist = data.split(",")
    let s = [] 
    slist.forEach(ele => {
      s.push(parseInt(ele))  
    });
    return Uint8Array.from(s)
  }
  
  const onWithdraw = async()=>{
    const sender_addr = wallet.address;
    const amount_value = parseFloat(amount)
    if(amount_value == 0 || amount_value > wallet.price) {
      toast('Invalid amount',{type:'error'})
      return;
    }
    try{
      setIsLoading(true)
      switch(wallet.name){
        case "ALGO":
          await transferAlgo(sender_addr,receiver,amount,getSecrectKey()) 
          break;
        case "USDC":
          await transferUSDC(sender_addr,receiver,amount,getSecrectKey())
          break; 
      }
      toast('Successfully sent',{type:'success'})
    }
    catch(err){
      toast('Server Error',{type:'error'})
      console.log(err)
    }
    setIsLoading(false)
    onClose()
    // window.location.reload(false)
  }
  return (
    <Container>
      <Heading>
        {wallet?.icon}
        <span>Withdraw {wallet.name}</span>
      </Heading>
      <Body>
        <Description>To make a withdrawal, please enter an amount and wallet address below. Once your withdrawal has been processed, you will receive an email.</Description>
        <FromWrapper>
          <label>From</label>
          <FromBox>
            <div>
              <span>Wallet balance</span>
              <span className='price'>{wallet?.name} {wallet.price}</span>
            </div>
            <div>
              <span>Available for withdrawal</span>
              <span className='price'>{wallet?.name} {wallet.price > 0 ? parseFloat(wallet.price*1000 - wallet.minium* 1000)/1000 : 0}</span>
            </div>
            <div>
              <span>Reserved Funds</span>
              <span className='price'>{wallet?.name} 0.00</span>
            </div>
          </FromBox>
        </FromWrapper>
        <FormGroup>
          <label>Amount ({wallet?.name})</label>
          <Input
            styleType='admin'
            placeholder={`${wallet.name} 0.00`}
            value = {amount}
            onChange = {(e)=>{setAmount(e.target.value)}}
          />
        </FormGroup>
        <FormGroup>
          <label>Wallet Address</label>
          <Input
            styleType='admin'
            placeholder={`Enter ${wallet.name} Wallet Address`}
            value = {receiver}
            onChange = {(e)=>{setReceiver(e.target.value)}}
          />
        </FormGroup>
        {/* <WraningMessage>
        Please always double-check your wallet address before submitting a withdrawal request.
        </WraningMessage> */}
        <ButtonWrapper>
          <Button
            color='primary'
            type='submit'
            onClick={() => onWithdraw()}
            isLoading = {isLoading}
          >
            Withdraw {wallet?.name}
          </Button>
          <Button color='primary' type='button' naked onClick={() => onClose()}>Cancel</Button>
        </ButtonWrapper>
      </Body>
    </Container>
  )
}
