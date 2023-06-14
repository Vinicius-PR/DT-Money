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

  useEffect(() => {
    const jsonTransactions = JSON.stringify(transactions)
    localStorage.setItem('dt-money/transaction', jsonTransactions)
  }, [transactions])

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
    setTransactions((state) => [transaction, ...state])
  }, [])

  const deleteTransactions = useCallback(
    (transactionId: string) => {
      const filteredTransactions = transactions.filter((transaction) => {
        return transaction.id !== transactionId
      })
      setTransactions(filteredTransactions)
    },
    [transactions],
  )

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
        deleteTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
