import { Alert } from "react-bootstrap";

export default function ErrorPopup({ message }) {
  return (
    <Alert variant="danger">
      <Alert.Heading>Error</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
}
