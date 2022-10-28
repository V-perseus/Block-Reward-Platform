import React, { useRef, useState } from 'react'
import { DashboardHeading } from '../../shared/DashboardHeading'
import { useForm } from 'react-hook-form'
import MdEdit from '@meronex/icons/md/MdEdit'
import {
  Container,
  CardForm,
  FormGroup,
  PhotoUpload
} from './styles'
import { Button, Input } from '../../../styles'
import { AdminCard } from '../../shared'

export const Profile = () => {
  const [image, setImage] = useState(null)
  const inputRef = useRef()
  const { register, handleSubmit, formState: { errors }} = useForm()

  const handleUploadImage = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const onSubmit = async (values) => {
    console.log(values)
  }

  return (
    <Container>
      <DashboardHeading title='Profile' />
      <AdminCard title='Profile'>
        <CardForm onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <p>Profile Picture</p>
            <PhotoUpload bgimage={image} onClick={() => inputRef?.current.click()}>
              <input type='file' onChange={handleUploadImage} ref={inputRef} />
              <MdEdit />
            </PhotoUpload>
          </FormGroup>
          <FormGroup>
            <p>Username</p>
            <Input
              styleType='admin'
              placeholder='Enter your blockreward @username'
            />
          </FormGroup>
          <FormGroup>
            <p>Twitter Handle</p>
            <Input
              styleType='admin'
              placeholder='Enter your Twitter @username'
            />
          </FormGroup>
          <FormGroup>
            <p>Instagram Handle</p>
            <Input
              styleType='admin'
              placeholder='Enter your Instagram @username'
            />
          </FormGroup>
          <Button
            color='primary'
            type='submit'
          >
          Save Changes
          </Button>
        </CardForm>
      </AdminCard>
    </Container>
  )
}
