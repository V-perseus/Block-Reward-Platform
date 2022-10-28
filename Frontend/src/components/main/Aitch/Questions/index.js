import React from 'react'
import { LandingLayout } from '../../../shared/LandingLayout'
import { Accordion } from '../Accordion'

import {
  Container,
  Heading,
  AccordionContainer
} from './styles'

export const Questions = () => {
  const data = [
    {
      title: "How do I earn Block Reward Tokens(BRT)?",
      description: "Simply stated BRT is a reward point. You earn tokens back on purchases from business in the Block Reward ecosystem. Percentages sent back are set by the business. (minimum is 10% BRT back on purchases, a limited amount of tokens can be sent) On our platform we may offer the opportunity to earn and purchase BRT.",
      customeContent: false,
      list: []
    },
    {
      title: "How can I use Block Reward Token on the platform?",
      description: "You will use Block Reward Token to redeem discounts offered by businesses within our ecosystem. Businesses will have different offerings that will be able to be redeemed using BRT.",
      customeContent: false,
      list: []
    },
    {
      title: "What does my Block Reward Membership include? ",
      description: "Having a membership with a business within the Block Reward Ecosystem unlocks special rewards and discounts. Owning one business membership allows access to discounts offered by other businesses within the BR ecosystem but full benefits are reserved for that business membership holders. - Owning the Block Reward Membership (our membership) will allow special BRT earnings and discounts within the ecosystem ",
      customeContent: false,
      list: []
    },
    {
      title: "How can I recover my membership if I lose my device? ",
      description: " When you set up an account you register with an email or phone number that will allow you to recover your data and membership.",
      customeContent: true,
      list: [
        "5 x Unlimited VIP access to Aitch shows for life for yourself and a friend",
        "10 x Unlimited pass for Aitch shows next year for you and a friend",
        "1 x FaceTime with Aitch",
        "1 x Shopping trip with Aitch treating you",
        "1 x Aitch music video behind-the-scenes experience",
        "16 x signed physical artworks on canvas",
        "1 x artwork of fan done by artist of Aitch’s collection",
        "10 x Aitch merch bundle",
        "1 x Personal message from Aitch",
      ]
    },
    {
      title: "How can I get my business on Block Reward? ",
      description: "Please go to “Partner with us” and fill out the form and we will be in touch!",
      customeContent: false,
      list: []
    }
  ]

  return (
    <Container>
      <LandingLayout>
        <Heading data-aos='fade-up' data-aos-delay="200">
          <h2>Frequently Asked Questions</h2>
          <p>We provide information about the drop and general FAQs</p>
        </Heading>
        <AccordionContainer data-aos='fade-up' data-aos-delay="100">
          {data.map((item, i) => 
            <Accordion key={i} item={item}/>
          )}
        </AccordionContainer>
      </LandingLayout>
    </Container>
  );
}