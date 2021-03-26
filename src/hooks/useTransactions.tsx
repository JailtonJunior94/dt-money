import { createContext, useEffect, useState, ReactNode, useContext } from 'react';

import { api } from '../services/api';

interface Transaction {
    id: string;
    date: Date;
    total: number;
    income: number;
    outcome: number;
    active: boolean;
    items: TransactionItem[]
}

interface TransactionItem {
    id: string;
    title: string;
    value: number;
    type: string;
    active: boolean;
}

type TransactionInput = Omit<TransactionItem, 'id' | 'active'>;

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transaction: Transaction
    transactionItems: TransactionItem[]
    createTransaction: (transaction: TransactionInput) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transaction, setTransaction] = useState<Transaction>({} as Transaction)
    const [transactionItems, setTansactionItems] = useState<TransactionItem[]>([])

    useEffect(() => {
        api.get<Transaction>('api/v1/transactions/94F6E01F-3488-4D21-BF87-4876206CF7B7')
            .then(response => {
                setTransaction(response.data);
                setTansactionItems(response.data.items);
            })
    }, [])

    async function createTransaction(transaction: TransactionInput) {
        const response = await api.post<TransactionItem>('api/v1/transactions/94F6E01F-3488-4D21-BF87-4876206CF7B7', transaction);
        setTansactionItems([...transactionItems, response.data]);
    }

    return (
        <TransactionsContext.Provider value={{ transaction, transactionItems, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext)
    return context;
}
