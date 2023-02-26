import { Component } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import css from '../Modal/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClose);
  }

  handleClose = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.hideModal();
    }
  };

  render() {
    const { children } = this.props;

    return createPortal(
      <div className={css.Overlay} onClick={this.handleClose}>
        <div className={css.Modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  hideModal: PropTypes.func.isRequired,
};
