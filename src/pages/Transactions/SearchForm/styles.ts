import styled from 'styled-components'

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;
  margin-top: 4rem;
  flex-wrap: wrap;
  justify-content: center;

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    padding: 1rem;
    background-color: ${(props) => props.theme['gray-900']};
  }

  button {
    border: 1px solid ${(props) => props.theme['green-300']};
    border-radius: 6px;
    background: transparent;
    color: ${(props) => props.theme['green-300']};
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    align-items: center;
    padding: 0.875rem 2rem;
    cursor: pointer;
    font-weight: bold;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background-color: ${(props) => props.theme['green-500']};
      border-color: ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme.white};

      transition: all 0.2s;
    }
  }
`
