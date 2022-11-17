import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme['gray-900']};
  padding: 2.5rem 1rem 7.6rem;
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 375px) {
    flex-direction: column;
    gap: 1rem;
  }
`

export const NewTransactionButton = styled.button`
  width: 9.5rem;
  height: 3.125rem;
  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: ${(props) => props.theme['green-300']};
    transition: background-color 0.2s;
  }
`
