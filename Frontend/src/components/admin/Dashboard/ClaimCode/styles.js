import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
`

export const ModalHeader = styled.div`
  padding: 15px 20px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 500;
`

export const ModalContent = styled.div`
  padding: 0 20px 15px;
`

export const FromRow = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 22px;
  label {
    font-weight: 500;
    display: block;
  }
  input {
    width: 100%;
  }
`

export const ModalButtonWrapper = styled.div`
  padding: 20px 0px 10px 0px;
`

export const ErrorMessage = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.warning};
  text-align: left;
  margin-top: 5px;
`
