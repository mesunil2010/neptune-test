import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { WalletModal } from "./WalletModal";

const Converter = () => {
    const CHANGE_RATE = 3
    const [nep, setNep] = useState<number>(0)
    const [busd, setBusd] = useState<number>(0)

    const formatNumber = (value: number) => value.toFixed(2) as unknown as number;

    const onNepChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)

        setNep((value))
        setBusd(formatNumber(value * CHANGE_RATE))
    }

    const onBusdChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)

        setNep(formatNumber(value / CHANGE_RATE))
        setBusd((value))
    }

    const [modalShow, setModalShow] = useState<boolean>(false);

    return (
        <Card style={{ width: "480px" }} className="p-4">
            <Card.Body>
                <Card.Title>Crypto Converter</Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>NEP</Form.Label>
                            <Form.Control type="text" placeholder="0.00" onChange={onNepChangeHandle} value={nep}/>
                            <Form.Text className="text-muted" ></Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>BUSD</Form.Label>
                            <Form.Control type="text" placeholder="0.00" onChange={onBusdChangeHandle} value={busd}/>
                        </Form.Group>
                    </Form>
                <Button variant="primary" className="text-center" onClick={() => setModalShow(true)}>
                    Connect
                </Button>
            </Card.Body>
            <WalletModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Card>
    );
};

export default Converter;
