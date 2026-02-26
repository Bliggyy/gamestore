import { useState } from 'react';
import { Alert } from 'react-bootstrap';

export default function ErrorPopup({ message }) {
    const [show, setShow] = useState(true);

    if (!show) return null;

    return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Error</Alert.Heading>
            <p>{message}</p>
        </Alert>
    );
}