import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import css from '../Modal/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, hideModal }) => {
  useEffect(() => {
    const handleClose = ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        hideModal();
      }
    };
    window.addEventListener('keydown', handleClose);
    return () => {
      window.removeEventListener('keydown', handleClose);
    };
  }, [hideModal]);

  return createPortal(
    <div className={css.Overlay} onClick={() => hideModal()}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  hideModal: PropTypes.func.isRequired,
};
