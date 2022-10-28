import algosdk from 'algosdk';
 
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

export const transfer  = async(from,to,sk,amount) =>{
   console.log("started transfer")
 
  const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
   console.log("making transaction")
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
 
}
export const installBRT  = async(from,sk)=>{
  
  const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    
    let sender = from;
    let recipient = sender;
    let revocationTarget = undefined;
    let closeRemainderTo = undefined;
    
    const amount = 0;
    let opttxn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        sender, 
        recipient, 
        closeRemainderTo, 
        revocationTarget,
        amount, 
        undefined, 
        contract_id, 
        params);
    
    // Must be signed by the account wishing to opt in to the asset    
    // const signedTxn = await myAlgoConnect.signTransaction(opttxn.toByte());
    let signedTxn = opttxn.signTxn(sk);
    console.log("signed",signedTxn)
    const txId = opttxn.txID().toString();
    let opttx = (await algodClient.sendRawTransaction(signedTxn).do());
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

export const installUSDC  = async(from,sk)=>{
  
  const params = await algodClient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    
    let sender = from;
    let recipient = sender;
    let revocationTarget = undefined;
    let closeRemainderTo = undefined;
    
    const amount = 0;
    let opttxn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        sender, 
        recipient, 
        closeRemainderTo, 
        revocationTarget,
        amount, 
        undefined, 
        usdc_id, 
        params);
    
    // Must be signed by the account wishing to opt in to the asset    
    // const signedTxn = await myAlgoConnect.signTransaction(opttxn.toByte());
    let signedTxn = opttxn.signTxn(sk);
    console.log("signed",signedTxn)
    const txId = opttxn.txID().toString();
    let opttx = (await algodClient.sendRawTransaction(signedTxn).do());
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

