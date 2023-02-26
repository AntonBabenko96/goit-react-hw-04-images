import PropTypes from 'prop-types';

import css from '../Button/Button.module.css';

export const Button = ({ children, onBtnClick, type = 'button' }) => {
  return (
    <>
      <button className={css.Button} onClick={onBtnClick} type={type}>
        {children}
      </button>
    </>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onBtnClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};
