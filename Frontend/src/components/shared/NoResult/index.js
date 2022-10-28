import React from 'react'
import AiFillFolderOpen from '@meronex/icons/ai/AiFillFolderOpen'
import {
  Container
} from './styles'

export const NoResult = (props) => {
  const { content } = props

  return (
    <Container>
      <AiFillFolderOpen />
      <span>{content}</span>
    </Container>
  )
}
