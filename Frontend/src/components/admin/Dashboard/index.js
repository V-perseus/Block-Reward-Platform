import React from 'react'
import { Details } from './Details'
import { OriginalBar } from './OriginalBar'
import { Cards } from './Cards'

import {
  Container,
} from './styles'

export const Dashboard = () => {
  return (
    <Container>
      <Details />
      <OriginalBar />
      <Cards />
    </Container>
  )
}
