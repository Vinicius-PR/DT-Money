import { Trash } from 'phosphor-react'
import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './SearchForm'
import {
  PriceHighLight,
  TableContainer,
  TransactionContainer,
  TransactionTable,
} from './styles'

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  const { deleteTransactions } = useContextSelector(
    TransactionsContext,
    (context) => {
      return context
    },
  )

  function handleDeleteTransaction(id: string) {
    deleteTransactions(id)
    // saveTransactionsAtStorage()
  }

  return (
    <div>
      <Header />
      <Summary />

      <TransactionContainer>
        <SearchForm />
        <TableContainer>
          <TransactionTable>
            <tbody>
              {transactions.map((transaction) => {
                return (
                  <tr key={transaction.id}>
                    <td>{transaction.description}</td>
                    <td>
                      <PriceHighLight variant={transaction.type}>
                        {transaction.type === 'outcome' && '- '}
                        {priceFormatter.format(transaction.price)}
                      </PriceHighLight>
                    </td>
                    <td>{transaction.category}</td>
                    <td>
                      {dateFormatter.format(new Date(transaction.createdAt))}
                    </td>
                    <td>
                      <Trash
                        size={20}
                        onClick={() => handleDeleteTransaction(transaction.id)}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </TransactionTable>
        </TableContainer>
      </TransactionContainer>
    </div>
  )
}
