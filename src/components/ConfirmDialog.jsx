import { CircleAlert } from "lucide-react";
import Modal from "./Modal";

function ConfirmDialog({ taskTitle, onConfirm, onCancel }) {
  return (
    <Modal titleId="confirm-title" onClose={onCancel} role="alertdialog" size="small">
      <div className="confirm">
        <span className="confirm-icon" aria-hidden="true">
          <CircleAlert size={28} />
        </span>
        <h2 id="confirm-title">Delete this task?</h2>
        <p>
          <strong>"{taskTitle}"</strong> will be permanently removed from your board.
        </p>
        <div className="form-actions">
          <button type="button" className="button button-secondary" onClick={onCancel} data-autofocus>
            Cancel
          </button>
          <button type="button" className="button button-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
