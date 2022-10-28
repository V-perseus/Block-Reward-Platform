import React from "react";
import { useState } from "react";
import { Modal } from "../../RModal"
import {Heading,Body,TextInput,DepositeButton} from './styles'
import logo from '../../../../assets/images/logo-white.png'
import reedmeicon from '../../../../assets/images/reedmeicon.png'
export const ReedmeModal = (props) => {
const {open,onClose} = props
const [val,setVal] = useState(0)
const [error,setError] = useState(false)
const handleClick = ()=>{
 val==0?setError(true):setError(false);
  
}
const style1 = {
  color:'#05a861',
  marginTop:5,
  marginBottom:5,
  display:(error==false?'block':'none')
}
const style2 = {
  color:'red',
  background:'lightred',
  marginTop:5,
  marginBottom:5,
  display:(error==true?'block':'none')
}
return (
  <Modal
  width='300px'
  
  open={open}
  onClose={onClose}
>
      <Heading>
        <img src = {logo} style = {{width:30}}/>
        <span style = {{marginLeft:10}}>You have 45 tokens</span>
      </Heading>
      <Body>
        <h3 style = {{marginTop:20}}>Enter the amount of tokens</h3>
        <h3>you like to deposite</h3>
        <p>Max. is 5 tokens</p>
        <TextInput type = "text" value={val} onChange={e => setVal(e.target.value)}  />
       <p style = {style1}>20% off</p>
       <p style = {style2}>You must  enter at least 1 token</p>

        <DepositeButton onClick = {handleClick} >
          <img src = {reedmeicon} style = {{width:30,height:30,marginRight:10,marginLeft:3}}/>
         <p style = {{fontSize:12,display:'contents' }} >Swipe to deposit tokens</p> 
        </DepositeButton>
      </Body>
 
</Modal>
)

}