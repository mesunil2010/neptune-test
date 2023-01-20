import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../components/Connectors";
import { WalletDetails } from "./WalletDetails";
import { useEffect, useState } from "react";
import web3 from 'web3'


interface WalletModalProps {
    show: boolean;
    onHide: () => void;
}

export const WalletModal = (props: WalletModalProps) => {
    const [balance, setBalance] = useState<number>(0);
    const { active, account, library, connector, activate, deactivate, chainId } =
        useWeb3React();


    async function connect() {
        try {
            await activate(injected);
        } catch (ex) {
            console.log(ex);
        }
    }

    async function disconnect() {
        try {
            const x = await deactivate();
            console.log(x);
        } catch (ex) {
            console.log(ex);
        }
    }

    useEffect(() => {
        (async () => {
            const provider: any = await connector?.getProvider()
            const client = new web3(provider)
            if (account) {
                client.eth.getBalance(account)
                    .then(balance => {
                        const x = Number(balance)
                        setBalance(Number((x) / 1000000000000000000))
                    });
            }
        })();
    }, [account]);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Wallet Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {active ? (
                    <WalletDetails
                        account={account as string}
                        chainId={chainId as number}
                        balance={balance as number}
                    />
                ) : (
                    <span className="text-danger">
                        Wallet not connected. Please cick "Connect Now" button below{" "}
                    </span>
                )}
            </Modal.Body>
            <Modal.Footer>
                {active ? (<Button variant="danger" onClick={disconnect}>
                    Disconnect
                </Button>) : (<Button disabled={active} onClick={connect}>
                    Connect
                </Button>)}
                <Button variant="secondary" onClick={props.onHide}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
