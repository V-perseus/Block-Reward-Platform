import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1200px) {
    flex-direction: row;
    border-top: 1px solid ${props => props.theme.colors.borderColor};
  }
`
export const ImageWrapper  = styled.img`
    width:200px;
    height:200px;
    cursor:pointer;
    border-radius:10px;
`
