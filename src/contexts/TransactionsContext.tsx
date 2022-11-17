import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  category: string
  price: number
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[]
  fecthTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  deleteTransactions: (transactionID: number) => Promise<void>
}

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, SetTransactions] = useState<Transaction[]>([])

  const fecthTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    SetTransactions(response.data)
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, category, price, type } = data
      const response = await api.post('transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      })

      SetTransactions((state) => [response.data, ...state])
    },
    [],
  )

  const deleteTransactions = useCallback(
    async (transactionId: number) => {
      await api.delete(`transactions/${transactionId}`)
      const filteredTransactions = transactions.filter((transaction) => {
        return transaction.id !== transactionId
      })
      SetTransactions(filteredTransactions)
    },
    [transactions],
  )

  useEffect(() => {
    fecthTransactions()
  }, [fecthTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fecthTransactions,
        createTransaction,
        deleteTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
