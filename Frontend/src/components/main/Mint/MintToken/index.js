import React from 'react'
import { useState } from 'react'
 
import { AdminCard } from '../../../shared'
import { Button,Input } from '../../../../styles'
import { useForm } from 'react-hook-form'
import {
  CardForm,
  FormGroup,
  ErrorMessage 
} from './styles'
import { toast } from 'react-toastify' 
import { transferToken } from '../Lib/algorand'

export const MintToken = (props) => {
  const {balance,address} = props
  const { register, handleSubmit, formState: { errors }} = useForm()
  const [loading,setLoading] = useState(false)

  const getSecrectKey = ()=>{
    let data = localStorage.getItem('data')
    const slist = data.split(",")
    let s = [] 
    slist.forEach(ele => {
      s.push(parseInt(ele))  
    });
    return Uint8Array.from(s)
  }

  const onSubmit = async (values) => {
     
    if( parseFloat(values.amount) == 0 || isNaN(parseFloat(values.amount)))
    {
      toast("please enter amount correctly",{ type: 'error' });
      return;
    }
    if(values.receiver == "")
    {
      toast("please enter receiver address correctly",{ type: 'error' });
      return;
    }
    const amount = values.amount / 10;
    const receiver = values.receiver;
   try{
    if(amount > balance) 
    {
      toast('Enter the amount correctly',{type:'error'})
      return;
    }
    setLoading(true)
    await transferToken(address,receiver,amount,getSecrectKey())
    setLoading(false)
    toast("Successfully sent.",{type:"success"})
  }
   catch(error){
    console.log(error)
    setLoading(false)
    toast("Error! Please confirm receiver address or balance and Network State.",{type:"error"})
   }

  }

return(
  <AdminCard title = 'Mint BRT Token'>
    <CardForm onSubmit={handleSubmit(onSubmit)}>
    <FormGroup>
          <p>My Address</p>
          <Input
            styleType='admin'
            value = {localStorage.getItem("address")}
            onChange = {()=>{}}
          />
        </FormGroup>
        <FormGroup>
          <p>Current Balance</p>
          <Input
            styleType='admin'
            value = {balance + " BRT"}
            onChange = {()=>{}}
          />
        </FormGroup>
        <FormGroup>
        <p>Amount</p>
        <Input
              placeholder='(USD)'
              styleType='admin'
              autoComplete='off'
              {...register(
                'amount',
                {
                  
                }
            
              )}
              // value = "100"
              />
            {errors?.name && <ErrorMessage>{errors?.name?.message}</ErrorMessage>}

        </FormGroup>
        <FormGroup>
          <p>receiver address</p>
          <Input
            styleType='admin'
            // value = "ZRFBPB2L34LOEGKTFIA4YUNEIWQCANDRINYIULU4SWVWYHDOFE4HFFBDKM"
            autoComplete='off'
            {...register(
              'receiver',
              {
                 
              }
            )}    
          />
        {errors?.name && <ErrorMessage>{errors?.name?.message}</ErrorMessage>}
        </FormGroup>
        <Button color='primary' isLoading = {loading}>Deposite</Button>
    </CardForm>
  </AdminCard>
)

}