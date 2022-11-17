import styled, { css } from 'styled-components'

export const SummaryContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1rem;

  margin-top: -5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

interface SummaryCardProps {
  variant?: 'green'
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background-color: ${(props) => props.theme['gray-600']};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  border-radius: 6px;

  ${(props) =>
    props.variant === 'green' &&
    css`
      background-color: ${props.theme['green-700']};
    `}

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${(props) => props.theme['gray-300']};
  }

  strong {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    strong {
      font-size: 1.5rem;
    }
  }
`
