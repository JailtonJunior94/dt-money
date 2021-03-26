import { useTransactions } from '../../hooks/useTransactions';

import { Container } from './styles';

export function TransactionTable() {
    const { transaction, transactionItems } = useTransactions();
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
