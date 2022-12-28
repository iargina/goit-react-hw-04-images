import css from './Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ largeSrc, modalClose }) => {
  const escapeClick = event => {
    if (event.key !== 'Escape') {
      return;
    }
    modalClose();
    return;
  };

  useEffect(() => {
    document.addEventListener(`keydown`, escapeClick);
    return () => {
      document.removeEventListener(`keydown`, escapeClick);
    };
  });
  return (
    <div className={css.overlay} onClick={modalClose}>
      <div className={css.modal}>
        <img src={largeSrc.src} alt={largeSrc.alt} />
      </div>
    </div>
  );
};
