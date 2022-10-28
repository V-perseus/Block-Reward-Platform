import React from 'react'
import { LayoutContainer } from '../../../shared'
import { Button } from '../../../../styles'
import { useTheme } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import {
  ComponentWraper,
  Container,
  LeftWrapper,
  RightWrapper,
  ButtonGroup,
  ImgWrapper
} from './styles'
const collectionId = '6315d423-5532-47a0-8953-7c336abe503f'
export const LmwrHero = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const style1 = {display:'flex',marginTop: '17vw',marginRight: '1vw',alignItems:'center'}
  const style2 = {height:50,width:200,fontSize:18}
  const style3 = {color:'white',textDecoration:'auto'}
  return (
    <ComponentWraper>
      <LayoutContainer>
        <Container>
          <LeftWrapper>
            <h1>
              <span className="marker">Block Reward Token What it is</span> <span className="marker">and how it works</span>
            </h1>
            <h2>
            Block Reward Token is earned on purchases made from a business within our ecosystem, think of BRT as a reward point. Our token is used to redeem discounts, limited-time offers and other promotional activities offered by businesses on our platform. Users can also use the token to upgrade their membership tier within the system. There may be ways to gain more BRT in the future through our platform. 
            Our token is hosted on the Algorand Blockchain, doing this allows for easy accounting of tokens in circulations and can provide business analytics through its public ledger.
              {/* <br /><br />
              Join our waitlist to stay up-to-date: */}
            </h2>
         
          </LeftWrapper>
              
          <RightWrapper>
            <ButtonGroup style={style1} >
              <Button color='primary' style={style2}  onClick={() => navigate(`/collection/${collectionId}`)} >Use  BRT</Button>
            </ButtonGroup>
            <ImgWrapper>
              {/* <h2>Timeline</h2> */}
              <img src={theme.images.timeLine} alt='' />
            </ImgWrapper>
          </RightWrapper>
        </Container>
      </LayoutContainer>
    </ComponentWraper>
  )
}
