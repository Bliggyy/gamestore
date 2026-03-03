import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { deleteGame } from "../api/game";
import { useNotification } from "../context/NotificationContext";

export default function DeleteModal({ show, onHide, gameName, gameId }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteGame(gameId);
      addNotification("Game deleted successfully!", "success");
      navigate("/games");
    } catch (err) {
      addNotification(err.message, "danger");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Game</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete <strong>{gameName}</strong>? This action
        cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
