import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { v4 as uuidv4 } from 'uuid'

interface Transaction {
  id: string
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: Date
}

interface CreateTransactionInput {
  description: string
  category: string
  price: number
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query: string) => void
  createTransaction: (data: CreateTransactionInput) => void
  deleteTransactions: (transactionID: string) => void
}

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionProvider({ children }: TransactionProviderProps) {
  const transactionJsonData = localStorage.getItem('dt-money/transaction')
  const inicialTransaction = transactionJsonData
    ? JSON.parse(transactionJsonData)
    : []

  const [transactions, setTransactions] =
    useState<Transaction[]>(inicialTransaction)

  const [transactionsBackUp, setTransactionsBackUp] =
    useState<Transaction[]>(inicialTransaction)

  console.log('transactions', transactions)
  console.log('transactionsBackUp', transactionsBackUp)
  useEffect(() => {
    const jsonTransactions = JSON.stringify(transactionsBackUp)
    localStorage.setItem('dt-money/transaction', jsonTransactions)
  }, [transactionsBackUp])

  const fetchTransactions = useCallback(
    (query: string) => {
      if (query === '') {
        setTransactions(transactionsBackUp)
      } else {
        const fetchedTransactions: Transaction[] = transactionsBackUp.filter(
          (transaction) => {
            return (
              transaction.category.indexOf(query) !== -1 ||
              transaction.description.indexOf(query) !== -1
            )
          },
        )
        setTransactions(fetchedTransactions)
      }
    },
    [transactionsBackUp],
  )

  const createTransaction = useCallback((data: CreateTransactionInput) => {
    const { description, category, price, type } = data
    const transaction = {
      id: uuidv4(),
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    }
    setTransactionsBackUp((state) => [transaction, ...state])
    setTransactions((state) => [transaction, ...state])
  }, [])

  const deleteTransactions = useCallback(
    (transactionId: string) => {
      const filteredTransactions = transactions.filter((transaction) => {
        return transaction.id !== transactionId
      })
      setTransactionsBackUp(filteredTransactions)
      setTransactions(filteredTransactions)
    },
    [transactions],
  )

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        deleteTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
