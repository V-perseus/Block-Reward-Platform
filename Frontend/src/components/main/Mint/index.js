import React, { useState,useEffect } from 'react'
import { DashboardHeading } from '../../shared/DashboardHeading';
import { ButtonWrapper } from './styles';
import { Button } from '../../../styles';
import algosdk from 'algosdk'; 
import { base58btc } from 'multiformats/bases/base58';
import { MintCard } from './MintCard';
import { ItemView } from './MintCard/styles';
import { Modal } from '../../shared'
import { MintDialog } from './MintDialog'
import { algodClient } from './Lib/algorand';
import { MintToken } from './MintToken';
import { toast } from 'react-toastify';
import { useApi } from '../../../contexts/ApiContext';
import { S } from 'memfs/lib/constants';
export const Mint = () => {

  /**************Common Variables*****************/

  const [nfts,setNFTs] = useState([])  
  const [isMint,setIsMint] = useState(false)
  const [user_address,setUserAddress] = useState(localStorage.getItem("address"))
  const [buttonTitle,setButtonTitle] = useState(user_address?"connected":"Wallet connect")
  const [balance,setBalance] = useState(0)
  const [{ doPost }] = useApi()
  
  /**********AlgoSDK  Variables*********/
 
 const getBalance = async()=>{
  if(user_address){
    const clientInfo = await algodClient.accountInformation(user_address).do();
    const assets = clientInfo.assets   
 
    for (var asset of assets) {
      const asset_map = await LoadNFTs(asset['asset-id'])    
          if(!asset_map['name']){  
            {
                setBalance(asset['amount'] / 10 )
                localStorage.setItem('balance',asset['amount'] / 10 )
                await doPost('auth/update_balance', {
                email : localStorage.getItem('email'),
                balance : asset['amount'] / 10
              })
            } 
          }
    }         
  }
 }


 useEffect(() => {
    async function fetchData(){
      if(user_address){
        try{
          const clientInfo = await algodClient.accountInformation(user_address).do();
          const assets = clientInfo.assets   
          console.log(assets)
          var asset_list = []
          for (var asset of assets) {
            const asset_map = await LoadNFTs(asset['asset-id'])    
            if(asset_map['name']) 
              { 
                asset_map['address'] = user_address 
                asset_list.push(asset_map)
              }
            else if(asset_map['unit_name'] == "BRT"){
                setBalance(asset['amount'] / 10 )
              }
          }         
          setNFTs(asset_list)  
        }
        catch(error){
            console.log(error)
        }
    
      }
    
    }
      fetchData()
      
  }, []);

  useEffect(()=>{
    const timeout = setInterval(() => {
       getBalance();      
    }, 3000);  
    return () => clearInterval(timeout);
  },[])

  
  /**************User Functions******************/
  // load Nfts from user Wallet
  
  const LoadNFTs  = async(asset_id)=>{
    try{
      const asset_info = await algodClient.getAssetByID(asset_id).do()
      
      const reserveURL = asset_info.params.reserve
      const cid = getCID(reserveURL)
      var NFT_metadata = {}
      // console.log(asset_info.params)
      NFT_metadata['unit_name'] = asset_info.params['unit-name']
      if(asset_info.params['decimals'] > 0  &&  NFT_metadata['unit_name'] =="BRT" ) return NFT_metadata;
      NFT_metadata['name'] = asset_info.params['name']
      NFT_metadata['url'] = 'https://ipfs.io/ipfs/'+ cid
      NFT_metadata['id'] = asset_id
      return NFT_metadata;  
    }catch(error){
        console.log(error)

    }
    
  }

  const getCID  = (reserve)=>{
    const data = algosdk.decodeAddress(reserve)
    let newArray = new Uint8Array(34);

    newArray[0] = 18;
    newArray[1] = 32;
    let i = 2;
    data.publicKey.forEach((byte) => {
      newArray[i] = byte;
      i++;
    });
    let encoded = base58btc.baseEncode(newArray);
    return encoded
  }
 
  
  const handleMint = ()=>{
    setIsMint(true)
  }
  
/*****************Document Part*********************/  
  return (  <>
    
    <div style = {{padding:20,marginTop:20,marginLeft:30}}>
      <DashboardHeading title = 'My Membership'>
            <ButtonWrapper>            
              <Button color='primary' onClick={handleMint} style = {{marginRight:20}}>Mint</Button>
            </ButtonWrapper>
      </DashboardHeading>
        <ItemView>
        {nfts.map((item, i) => (
            <MintCard
              item={item}
              key={i}            
            />
          ))}
        </ItemView>    
        <MintToken balance = {balance} address = {user_address}/>
    </div>
    <Modal
          width='420px'
          open={isMint}
          onClose={() => setIsMint(false)}
        >
          <MintDialog onClose={() => setIsMint(false)} address = {user_address} />
      </Modal>
 </>
);
}