import styled from 'styled-components'

export const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media (min-width: 1200px) {
    flex-direction: row;
  }
`

export const Offers = styled.div`
  width: 100%;
  @media (min-width: 1200px) {
    width: 63%;
  }
`

export const Starred = styled.div`
  width: 100%;
  @media (min-width: 1200px) {
    width: 35%;
  }
`

export const CardInnerWrapper = styled.div`
  padding: 15px 20px;
`

export const CardBody = styled.div`
  margin-top: 15px;
  height: 300px;
`

export const StarredCardHeader = styled.div`
  display: flex;
  align-items: center;
  height: 28px;
  width: 100%;
  margin-bottom: 15px;
  > svg {
    margin-right: 6px;
  }
`