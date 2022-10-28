import React from 'react'
import { Button, Input } from '../../../../styles'
import { useForm } from 'react-hook-form'
import {
  Container,
  Heading,
  Body,
  Form,
  FormGroup,
  ErrorMessage
} from './styles'

export const ClaimCode = (props) => {
  const {
    onClose
  } = props

  const { register, handleSubmit, formState: { errors }} = useForm()

  const onSubmit = (values) => {
    console.log(values)
    onClose && onClose()
  }

  return (
    <Container>
      <Heading>
        <span>Redeem Claim Code</span>
      </Heading>
      <Body>
        <p>To claim an NFT, please enter your claim code below and submit.</p>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <label>Claim Code</label>
            <Input
              placeholder='Enter claim code'
              styleType='admin'
              autoComplete='off'
              {...register(
                'claim_code',
                {
                  required: {
                    value: true,
                    message: 'The field is required*'
                  },
                  minLength: {
                    value: 10,
                    message: `Your code must contain 10 digits/letters`
                  }
                }
              )}
            />
            {errors?.claim_code && <ErrorMessage>{errors?.claim_code?.message}</ErrorMessage>}
          </FormGroup>
          <Button color='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Body>
    </Container>
  )
}
