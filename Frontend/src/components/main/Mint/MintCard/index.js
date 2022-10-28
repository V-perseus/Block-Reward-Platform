import React from 'react'
import { useState } from 'react'
import { UpdateDialog } from '../UpdateDialog'
import { Modal } from '../../../shared'
import { Container,Content } from './styles'
export const MintCard = (props) => {
  const {name,url} = props.item
  const [open,setOpen] = useState(false)
  const handleupdate = ()=>{
    setOpen(true)
  }
const styles = {width:140,height:140,marginTop:5,cursor:'pointer'}
  return(
    <>
       <Container>
        <Content>
            <img src = {url} style = {styles} onClick = {handleupdate} />
        </Content>
        <p style = {{marginTop:5}}>{name}</p>
    </Container>
      <Modal
      width='420px'
      open={open}
      onClose={() => setOpen(false)}
        >
          <UpdateDialog onClose={() => setOpen(false)} item = {props.item} />
      </Modal>
  </>
  )


}