import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';
import { Container, TransactionTypeContainer, RadioBox } from './styles'
import { api } from '../../services/api';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0)
    const [type, setType] = useState('INCOME')

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault()
        const data = {
            title,
            value,
            type
        }

        await api.post('api/v1/transactions/94F6E01F-3488-4D21-BF87-4876206CF7B7', data);
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src={closeImg} alt="close" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>
                <input
                    placeholder="Título"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <input
                    type="number"
                    placeholder="Valor"
                    value={value}
                    onChange={event => setValue(Number(event.target.value))}
                />
                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => setType('INCOME')}
                        isActive={type === 'INCOME'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        onClick={() => setType('OUTCOME')}
                        isActive={type === 'OUTCOME'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    );
}