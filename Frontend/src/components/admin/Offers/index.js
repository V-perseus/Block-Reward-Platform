import React from 'react'
import { AdminOriginalCard } from '../../shared/AdminOriginalCard'
import { DashboardHeading } from '../../shared/DashboardHeading'
import { NoResult } from '../../shared/NoResult'
import { Tabs } from '../../shared'

import {
  Container,
  CardWrapper,
  CardInnerWrapper,
  CardBody
} from './styles'

export const Offers = () => {
  const tabList = [
    { key: 'received', name: 'Offers Received' },
    { key: 'sent', name: 'Offers Sent' },
    { key: 'bids', name: 'Auction Bids Placed' }
  ]

  return (
    <Container>
      <DashboardHeading title='Offers' />
      <CardWrapper>
        <AdminOriginalCard>
          <CardInnerWrapper>
            <Tabs
              tabList={tabList}
              selectedTab='received'
            />
            <CardBody>
              <NoResult
                content='No offers found'
              />
            </CardBody>
          </CardInnerWrapper>
        </AdminOriginalCard>
      </CardWrapper>
    </Container>
  )
}
