import React from 'react'
import { DashboardHeading } from '../../shared/DashboardHeading'
import { BillingAddress } from './BillingAddress'
import { Credentinal } from './Credentinal'
import {
  Container
} from './styles'
import { VerifyIdentity } from './VerifyIdentity'

export const Account = () => {
  return (
    <Container>
      <DashboardHeading title='Account' />
      <Credentinal />
      {/* <VerifyIdentity /> */}
      <BillingAddress />
    </Container>
  )
}
