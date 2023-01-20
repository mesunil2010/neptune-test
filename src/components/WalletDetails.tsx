
import ListGroup from 'react-bootstrap/ListGroup';

interface WalletProps {
    account?: string
    chainId?: number
    balance?: number
}

export const WalletDetails = (props: WalletProps) => {
    const { account, chainId, balance } = props
    return (
        <ListGroup variant="flush">
            <ListGroup.Item>Account: {account}</ListGroup.Item>
            <ListGroup.Item>ChainId: {chainId}</ListGroup.Item>
            <ListGroup.Item>Balance: {balance}</ListGroup.Item>
        </ListGroup>
    )
}