import styled from 'styled-components'

export const TransactionContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1rem;
`

export const TableContainer = styled.div`
  overflow: auto;
  margin-bottom: 2rem;
`

export const TransactionTable = styled.table`
  width: 100%;
  margin-top: 1.5rem;
  border-collapse: separate;
  border-spacing: 0 0.5rem;

  tr {
    background-color: ${(props) => props.theme['gray-700']};
  }

  td {
    padding: 1.25rem 2rem;

    &:first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      width: 50%;
    }

    &:last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      padding: 1.25rem 1rem;
    }

    svg {
      cursor: pointer;
      color: ${(props) => props.theme['red-500']};
    }
  }
`

interface PriceHighLightProps {
  variant: 'income' | 'outcome'
}

export const PriceHighLight = styled.span<PriceHighLightProps>`
  white-space: nowrap;
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};
`
