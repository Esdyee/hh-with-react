const Modal = ({ onClose, children }: { onClose: () => void; children: React.ReactNode }) => {
    return (
        <div className="modal-overlay">
            <button onClick={onClose}>닫기</button>
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
};

export default Modal;