import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import { Input,Button } from '../../../../styles'
import { cidToReserveURL, sendFileToIPFS } from '../Lib/pinata'
import { CreateArc19 } from '../Lib/algorand'
import {
  Container,
  Heading,
  Body,
  Form,
  FormGroup,
  ErrorMessage 
} from './styles'
import { toast } from 'react-toastify' 
 
export const MintDialog = (props) => {
  const { onClose, address} = props
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }} = useForm()
  
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
    try{
      setIsLoading(true)
      const CID =   await sendFileToIPFS(fileImg);
      console.log(CID)
      const {url,reserveAddress}  =   cidToReserveURL(CID);
      await CreateArc19(address,values.name, values.unit_name ,values.description ,url, reserveAddress,getSecrectKey() )     
      setIsLoading(false)
      onClose && onClose()
      window.location.reload(false); 
    }
    catch(error){
        console.log(error)
        toast('Control Failed. Please Confirm Network State', { type: 'error' })
        setIsLoading(false)
      }
  }
 
const [fileImg, setFileImg] = useState(null)

return(
    <Container>
    <Heading>
      <span>Mint a NFT</span>
    </Heading>
    <Body>
    <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Input
              placeholder='Enter the Asset Name'
              styleType='admin'
              style = {{marginTop:20}}
              autoComplete='off'
              {...register(
                'name',
                {
                  required: {
                    value: true,
                    message: 'The field is required*'
                  }
                }
              )}
            />
            {errors?.name && <ErrorMessage>{errors?.name?.message}</ErrorMessage>}
             <Input
              placeholder='Enter the Unit Name'
              styleType='admin'
              style = {{marginTop:20}}
              autoComplete='off'
              {...register(
                'unit_name',
                {
                  required: {
                    value: true,
                    message: 'The field is required*'
                  }
                }
              )}
           
            />
            {errors?.unit_name && <ErrorMessage>{errors?.unit_name?.message}</ErrorMessage>}
             <Input
              placeholder='Enter the Description'
              styleType='admin'
              style = {{marginTop:20}}
              autoComplete='off'
              {...register(
                'description',
                {
                }
              )}
            />
            <input type = "file" style = {{marginTop:20}} accept=".jpg" onChange={(e) =>setFileImg(e.target.files[0])} required/>
          </FormGroup>
          <div style = {{display:'flex',marginTop:20}}>
            <Button color='primary' type='submit' isLoading={isLoading}>
              Start Mint
            </Button>
            <Button color='primary' type='submit' style={{marginLeft:10}} onClick={onClose} >
              Cancel
            </Button>
          </div>
        </Form>
    </Body>
  </Container>
    )


}