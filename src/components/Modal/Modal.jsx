import css from './Modal.module.css';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

export const Modal = ({ largeSrc, modalClose }) => {
  useEffect(() => {
    const escapeClick = event => {
      if (event.key !== 'Escape') {
        return;
      }
      modalClose();
      return;
    };
    document.addEventListener(`keydown`, escapeClick);
    return () => {
      document.removeEventListener(`keydown`, escapeClick);
    };
  }, [modalClose]);

  return ReactDOM.createPortal(
    <div className={css.overlay} onClick={modalClose}>
      <div className={css.modal}>
        <img src={largeSrc.src} alt={largeSrc.alt} />
      </div>
    </div>,
    document.getElementById('modalDiv')
  );
};
