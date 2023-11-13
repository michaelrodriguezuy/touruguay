import React from "react";

function Modal({ isOpen, onClose, children }) {
    return (
        <div className={`modal ${isOpen ? 'block' : 'hidden'}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;
