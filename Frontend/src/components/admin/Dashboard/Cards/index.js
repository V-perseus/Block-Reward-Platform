import React from 'react'
import { AdminOriginalCard } from '../../../shared/AdminOriginalCard'
import { Tabs } from '../../../shared'
import { NoResult } from '../../../shared/NoResult'
import AiFillStar from '@meronex/icons/ai/AiFillStar';

import {
  CardsWrapper,
  Offers,
  Starred,
  CardInnerWrapper,
  CardBody,
  StarredCardHeader
} from './styles'

export const Cards = () => {

  const offerList = [
    { key: 'received', name: 'Your Membership' },
  ]

  return (
    <CardsWrapper>
      <Offers>
        <AdminOriginalCard>
          <CardInnerWrapper>
            <Tabs
              tabList={offerList}
              selectedTab='received'
            />
            <CardBody>
              <NoResult
                content='No offers found'
              />
            </CardBody>
          </CardInnerWrapper>
        </AdminOriginalCard>
      </Offers>
      <Starred>
        <AdminOriginalCard>
          <CardInnerWrapper>
            <StarredCardHeader>
              <AiFillStar/>
              Quick View
            </StarredCardHeader>
            <CardBody>
              <NoResult
                content='No items found'
              />
            </CardBody>
          </CardInnerWrapper>
        </AdminOriginalCard>
      </Starred>
    </CardsWrapper>
  )
}