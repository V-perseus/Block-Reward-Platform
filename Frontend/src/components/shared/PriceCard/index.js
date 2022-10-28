import React from 'react'
import { useState } from 'react'
import logoPng from '../../../assets/images/logo-short.png'
import { ReedmeModal } from './ReedmeModal'
 
import {
  Container,
  TitleDiv,
  SubtitleDiv,
  Button
} from './styles'
export const PriceCard = (props) => {
  const {
    item
   } = props
   const [open,setOpen] = useState(false)

  return (
      <Container>
        <TitleDiv> {item.title} </TitleDiv>
        <SubtitleDiv>{item.subtitle}</SubtitleDiv>
        <Button onClick={()=>setOpen(true)} ><p>Reedme</p> <img src = {logoPng} style = {{width:20,marginLeft:10}}></img> </Button>    
        <ReedmeModal open = {open} onClose = {setOpen}/>
      </Container>
  )
}