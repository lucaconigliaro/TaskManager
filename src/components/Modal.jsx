import { createPortal } from "react-dom";

export default function Modal({ title, content, show, onClose, onConfirm, confirmText = "Confirm" }) {
    if (!show) return null;

    return createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                {content}
                <div className="modal-actions">
                    <button onClick={onClose} className="btn btn-outline-secondary shadow">Cancel</button>
                    <button onClick={onConfirm} className="btn btn-btn btn-outline-primary shadow">{confirmText}</button>
                </div>
            </div>
        </div>,
        document.body
    );
}