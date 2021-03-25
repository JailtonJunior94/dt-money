import { useEffect, useState } from 'react';

import { api } from '../../services/api';
import { Container } from './styles';

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

export function TransactionTable() {
    const [transaction, setTransaction] = useState<Transaction>(Object)
    const [transactionItems, setTansactionItems] = useState<TransactionItem[]>([])

    useEffect(() => {
        api.get<Transaction>('api/v1/transactions/94F6E01F-3488-4D21-BF87-4876206CF7B7')
            .then(response => {
                setTransaction(response.data);
                setTansactionItems(response.data.items);
            })
    }, [])

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {transactionItems.map(item => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td className={item.type}>{new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(item.value)}
                            </td>
                            <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.date))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    );
}