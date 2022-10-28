import React from 'react'
import { Button, Input } from '../../../../styles'
import { useForm } from 'react-hook-form'
import {
  Container,
  ModalHeader,
  ModalContent,
  FromRow,
  ModalButtonWrapper,
  ErrorMessage
} from './styles'

export  const ClaimCode = (props) => {
  const { onClose } = props
  const { register, handleSubmit, formState: { errors }} = useForm()

  const onSubmit = (values) => {
    console.log(values)
    onClose && onClose()
  }

  return (
    <Container>
      <ModalHeader>
        Redeem Claim Code
      </ModalHeader>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FromRow>
            To get your BlockReward Original NFT, please enter your claim code below and submit.
          </FromRow>
          <FromRow>
            <label>Claim Code</label>
            <Input
              placeholder='Enter Claim Code'
              styleType='admin'
              autoComplete='off'
              {...register(
                'code',
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
            {errors?.code && <ErrorMessage>{errors?.code?.message}</ErrorMessage>}
          </FromRow>
          <ModalButtonWrapper>
            <Button type="submit" color="primary">Submit</Button>
          </ModalButtonWrapper>
        </form>
      </ModalContent>
    </Container>
  )
}
