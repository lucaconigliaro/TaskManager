import { createPortal } from "react-dom";

export default function Modal({
    title,
    content,
    show,
    onClose,
    onConfirm,
    confirmText = "Conferma"
}) {
    if (!show) return null;

    return createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                {content}
                <div className="modal-actions">
                    <button onClick={onClose} className="btn btn-secondary">Annulla</button>
                    <button onClick={onConfirm} className="btn btn-danger">{confirmText}</button>
                </div>
            </div>
        </div>,
        document.body
    );
};