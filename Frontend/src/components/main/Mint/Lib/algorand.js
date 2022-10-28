import algosdk from 'algosdk';
import { Buffer } from 'buffer';
 
const token = {
  'X-API-key': process.env.REACT_APP_PURESTACK_API_TOKEN,
}
 
const port = '';
const server = 'https://testnet-algorand.api.purestake.io/ps2'  ;
const contract_id = parseInt(process.env.REACT_APP_CONTRACT_ADDRESS);
const usdc_id = parseInt(process.env.REACT_APP_USDC_ADDRESS);
export const algodClient = new algosdk.Algodv2(
  token,
  server,
  port
);
if (!window.Buffer) window.Buffer = Buffer;
 
export const CreateArc19 = async (from,asset_name, unit_name, description, url,reserveAddress,sk) =>{
  try{
    const params = await algodClient.getTransactionParams().do();
     
    // comment out the next two lines to use suggested fee
    params.fee = algosdk.ALGORAND_MIN_TX_FEE;
    params.flatFee = true;
  
    const note = {
      name: asset_name,
      description: description,
      image: url,
      decimals: 18,
      unitName: unit_name,
      image_integrity: '',
      image_mimetype: "image/jpeg",
      properties: {}, // Here you can add traits info for rarity!
    };
    const encNote =   Uint8Array.from(Buffer.from(JSON.stringify(note)));
    console.log("address",from)
    console.log("reserveAddress",reserveAddress)
    const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: from,
      total: 1,
      decimals: 0,
      assetName: asset_name,
      unitName: unit_name,
      assetURL: url,
      assetMetadataHash: '',
      defaultFrozen: false,
      freeze: from,
      manager: from,
      clawback: from,
      reserve: reserveAddress,
      note: encNote,
      suggestedParams: params,
    });
  
    console.log("txn",txn)
    const signedTxn = txn.signTxn(sk)
    console.log("signed",signedTxn)
    
    const txId = txn.txID().toString();
    // Submit the transaction
    await algodClient.sendRawTransaction(signedTxn).do();
  
    // Wait for confirmation
    const confirmedTxn = await algosdk.waitForConfirmation(
      algodClient,
      txId,
      4
    );
    console.log(
      `Transaction ${txId} confirmed in round ${confirmedTxn['confirmed-round']}\n`
    );
  }
  catch(error){
    console.log(error)
  }


}
export const ConfigArc19 = async (from,asset_id,asset_name,unit_name,description,url,reserveAddress,sk)=>{

  const params = await algodClient.getTransactionParams().do();
     
  // comment out the next two lines to use suggested fee
  params.fee =  algosdk.ALGORAND_MIN_TX_FEE;
  params.flatFee = true;

  const note = {
    name: asset_name,
    description: description,
    image: url,
    decimals: 18,
    unitName: unit_name,
    image_integrity: '',
    image_mimetype: "image/jpeg",
    properties: {}, // Here you can add traits info for rarity!
  };
  const encNote =   Uint8Array.from(Buffer.from(JSON.stringify(note)));
    console.log("address",from)
    console.log("reserveAddress",reserveAddress)

  const txn = algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject({
      from: from,
      note: encNote,
      suggestedParams: params,
      assetIndex: asset_id,
      freeze: from,
      manager: from,
      clawback: from,
      reserve: reserveAddress,
      strictEmptyAddressChecking: false,
    });
    console.log("txn",txn)
    
    const signedTxn = txn.signTxn(sk)
    // const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
    console.log("signed",signedTxn)
    
    const txId = txn.txID().toString();
    // Submit the transaction
    await algodClient.sendRawTransaction(signedTxn).do();
  
    // Wait for confirmation
    const confirmedTxn = await algosdk.waitForConfirmation(
      algodClient,
      txId,
      4
    );
    console.log(
      `Transaction ${txId} confirmed in round ${confirmedTxn['confirmed-round']}\n`
    );   

}

export const transferToken = async(sender,receiver,amount,sk)=>{

  const params = await algodClient.getTransactionParams().do();
  params.fee = 1000;
  params.flatFee = true;
   
 const recipient = receiver;
 const revocationTarget = undefined;
 const closeRemainderTo = undefined;
  //Amount of the asset to transfer
  amount = amount * 10;
 
  
  let xtxn = algosdk.makeAssetTransferTxnWithSuggestedParams(
      sender, 
      recipient, 
      closeRemainderTo, 
      revocationTarget,
      amount,  
      undefined, 
      contract_id, 
      params);
  // const signedTxn = await myAlgoConnect.signTransaction(xtxn.toByte());
  const signedTxn =  xtxn.signTxn(sk)
  console.log("signed",signedTxn)
  const txId = xtxn.txID().toString();
  let ttx = (await algodClient.sendRawTransaction(signedTxn).do());
// Wait for confirmation
const confirmedTxn = await algosdk.waitForConfirmation(
  algodClient,
  txId,
  4
  );
  console.log(
    `Transaction ${txId} confirmed in round ${confirmedTxn['confirmed-round']}\n`
  );   
  
}
export const transferAlgo = async (from,to,amount,sk)=>{
    const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    amount  = amount *1000000;
    let txn = algosdk.makePaymentTxnWithSuggestedParams(
    from,
    to,
    amount,
    undefined,
    undefined,
    params,
  )

  let signedTxn = txn.signTxn(sk)
  let txId = txn.txID().toString()
  console.log('Signed transaction with txID: %s', txId)

  // Submit the transaction
  await algodClient.sendRawTransaction(signedTxn).do()

  // Wait for confirmation
  let confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4)
  console.log("transfered",to)

}
export const transferUSDC = async(sender,receiver,amount,sk)=>{

  const params = await algodClient.getTransactionParams().do();
  params.fee = 1000;
  params.flatFee = true;
   
 const recipient = receiver;
 const revocationTarget = undefined;
 const closeRemainderTo = undefined;
  //Amount of the asset to transfer
  amount = amount * 1000000;
 
  let xtxn = algosdk.makeAssetTransferTxnWithSuggestedParams(
      sender, 
      recipient, 
      closeRemainderTo, 
      revocationTarget,
      amount,  
      undefined, 
      usdc_id, 
      params);
  // const signedTxn = await myAlgoConnect.signTransaction(xtxn.toByte());
  const signedTxn =  xtxn.signTxn(sk)
  console.log("signed",signedTxn)
  const txId = xtxn.txID().toString();
  let ttx = (await algodClient.sendRawTransaction(signedTxn).do());
// Wait for confirmation
const confirmedTxn = await algosdk.waitForConfirmation(
  algodClient,
  txId,
  4
  );
  console.log(
    `Transaction ${txId} confirmed in round ${confirmedTxn['confirmed-round']}\n`
  );   
  
}
