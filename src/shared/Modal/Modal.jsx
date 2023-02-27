import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import css from '../Modal/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, hideModal }) => {
  const handleClose = useCallback(
    ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        hideModal();
      }
    },
    [hideModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleClose);
    return () => {
      window.removeEventListener('keydown', handleClose);
    };
  }, [handleClose]);

  return createPortal(
    <div className={css.Overlay} onClick={handleClose}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  hideModal: PropTypes.func.isRequired,
};
