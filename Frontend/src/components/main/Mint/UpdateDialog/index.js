import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import { Input,Button } from '../../../../styles'
import { cidToReserveURL, sendFileToIPFS } from '../Lib/pinata'
import { ConfigArc19} from '../Lib/algorand'
import {
  Container,
  Heading,
  Body,
  Form,
  FormGroup,
  ErrorMessage 
} from './styles'
import { toast } from 'react-toastify' 
 
export const UpdateDialog = (props) => {
  const { onClose,item} = props
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }} = useForm()
  const address = item.address
  const [name,setName] = useState(item.name)
  const [unit_name,setUnitName] = useState(item.unit_name)
  
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
      const CID  =   await sendFileToIPFS(fileImg);
      console.log(CID)
      const {url,reserveAddress}  =   cidToReserveURL(CID);
      await ConfigArc19(address,item.id,values.name, values.unit_name ,values.description ,url, reserveAddress,getSecrectKey() )     
      setIsLoading(false)
      window.location.reload(false);
      onClose && onClose()
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
      <span>Update NFT</span>
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
              value = {name}
               
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
              value = {unit_name}
             
             
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
            Update NFT
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