import React from 'react'
import { Button, Input, OriginalSelect } from '../../../../styles'
import { useForm } from 'react-hook-form'
import {
  Container,
  Heading,
  Body,
  Form,
  FormGroup,
  ErrorMessage
} from './styles'

export const AddCredit = (props) => {
  const {
    onClose
  } = props

  const { register, handleSubmit, formState: { errors }} = useForm()

  const onSubmit = (values) => {
    console.log('value')
    onClose && onClose()
  }

  return (
    <Container>
      <Heading>
        <span>Add Credit Card</span>
      </Heading>
      <Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup isHalf>
            <label>First Name</label>
            <Input
              styleType='admin'
              autoComplete='off'
              {...register(
                'firstname',
                {
                  required: {
                    value: true,
                    message: 'The field is required*'
                  },
                }
              )}
            />
            {errors?.firstname && <ErrorMessage>{errors?.firstname?.message}</ErrorMessage>}
          </FormGroup>
          <FormGroup isHalf>
            <label>Last Name</label>
            <Input
              styleType='admin'
              autoComplete='off'
              {...register(
                'lastname',
                {
                  required: {
                    value: true,
                    message: 'The field is required*'
                  },
                }
              )}
            />
            {errors?.lastname && <ErrorMessage>{errors?.lastname?.message}</ErrorMessage>}
          </FormGroup>
          <FormGroup isHalf>
            <label>Company Name</label>
            <Input
              styleType='admin'
              autoComplete='off'
              placeholder='optional'
              {...register(
                'companyname'
              )}
            />
          </FormGroup>
          <FormGroup isHalf>
            <label>VAT Number / Tax ID</label>
            <Input
              styleType='admin'
              placeholder='optional'
              autoComplete='off'
              {...register(
                'vatnumber'
              )}
            />
          </FormGroup>
          <FormGroup>
            <label>Phone Number</label>
            <Input
              styleType='admin'
              autoComplete='off'
              {...register(
                'phonenumber',
                {
                  required: {
                    value: true,
                    message: 'The field is required*'
                  },
                }
              )}
            />
            {errors?.phonenumber && <ErrorMessage>{errors?.phonenumber?.message}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <label>Address</label>
            <Input
              styleType='admin'
              autoComplete='off'
              {...register(
                'address',
                {
                  required: {
                    value: true,
                    message: 'The field is required*'
                  },
                }
              )}
            />
            {errors?.address && <ErrorMessage>{errors?.address?.message}</ErrorMessage>}
          </FormGroup>
          <FormGroup isHalf>
            <label>Postal Code</label>
            <Input
              styleType='admin'
              autoComplete='off'
              {...register(
                'postalcode',
                {
                  required: {
                    value: true,
                    message: 'The field is required*'
                  },
                }
              )}
            />
            {errors?.postalcode && <ErrorMessage>{errors?.postalcode?.message}</ErrorMessage>}
          </FormGroup>
          <FormGroup isHalf>
            <label>City</label>
            <Input
              styleType='admin'
              autoComplete='off'
              {...register(
                'city',
                {
                  required: {
                    value: true,
                    message: 'The field is required*'
                  },
                }
              )}
            />
            {errors?.city && <ErrorMessage>{errors?.city?.message}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <label>Country</label>
            <OriginalSelect>
              <option>United State</option>
              <option>United Kingdom</option>
              <option>Mexico</option>
              <option>Germany</option>
              <option>French</option>
            </OriginalSelect>
          </FormGroup>
          <Button color='primary' type='submit'>
            Save Changes
          </Button>
        </Form>
      </Body>
    </Container>
  )
}
