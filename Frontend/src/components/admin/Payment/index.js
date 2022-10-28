import React, { useState } from 'react'
import { Button } from '../../../styles'
import { AdminOriginalCard } from '../../shared/AdminOriginalCard'
import { DashboardHeading } from '../../shared/DashboardHeading'
import { NoResult } from '../../shared/NoResult'
import BsCreditCard from '@meronex/icons/bs/BsCreditCard'
import { Modal } from '../../shared'

import {
  Container,
  CardWrapper,
  CardInnerWrapper,
  CardBody,
  CardHeader
} from './styles'
import { AddCredit } from './AddCredit'

export const Payment = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Container>
        <DashboardHeading title='Credit Cards'>
          <Button color='primary' onClick={() => setOpen(true)}>Add Credit Card</Button>
        </DashboardHeading>
        <CardWrapper>
          <AdminOriginalCard>
            <CardInnerWrapper>
              <CardHeader>
                <BsCreditCard />
                Credit Cards
              </CardHeader>
              <CardBody>
                <NoResult
                  content='No credit cards found'
                />
              </CardBody>
            </CardInnerWrapper>
          </AdminOriginalCard>
        </CardWrapper>
      </Container>
      <Modal
        width='450px'
        open={open}
        onClose={() => setOpen(false)}
      >
        <AddCredit onClose={() => setOpen(false)} />
      </Modal>
    </>
  )
}
