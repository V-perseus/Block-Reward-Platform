import React from 'react'
import { Button, Input } from '../../../../styles'
import { AdminCard } from '../../../shared'
import { useForm } from 'react-hook-form'
import {
  CardForm,
  FormGroup
} from './styles'

export const BillingAddress = () => {
  const { register, handleSubmit, formState: { errors }} = useForm()

  const onSubmit = async (values) => {
    console.log(values)
  }

  return (
    <AdminCard title='Billing Address'>
      <CardForm onSubmit={handleSubmit(onSubmit)}>
        <FormGroup isHalf>
          <p>First Name</p>
          <Input
            styleType='admin'
          />
        </FormGroup>
        <FormGroup isHalf>
          <p>Last Name</p>
          <Input
            styleType='admin'
          />
        </FormGroup>
        <FormGroup isHalf>
          <p>Company Name</p>
          <Input
            styleType='admin'
            placeholder='optional'
          />
        </FormGroup>
        <FormGroup isHalf>
          <p>VAT Number / Tax ID</p>
          <Input
            styleType='admin'
            placeholder='optional'
          />
        </FormGroup>
        <FormGroup>
          <p>Phone Number</p>
          <Input
            styleType='admin'
          />
        </FormGroup>
        <FormGroup>
          <p>Address</p>
          <Input
            styleType='admin'
          />
        </FormGroup>
        <FormGroup isHalf>
          <p>Postal Code</p>
          <Input
            styleType='admin'
          />
        </FormGroup>
        <FormGroup isHalf>
          <p>City</p>
          <Input
            styleType='admin'
          />
        </FormGroup>
        <Button color='primary'>Save Changes</Button>
      </CardForm>
    </AdminCard>
  )
}