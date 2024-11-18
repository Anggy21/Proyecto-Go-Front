import './ModalCategory.scss';

const Modal = ({ isOpen, onClose, onSubmit, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        {children}
        <div className="modal-actions">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={onSubmit}>Aceptar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;