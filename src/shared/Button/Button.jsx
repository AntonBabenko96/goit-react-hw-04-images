import PropTypes from 'prop-types';

import css from '../Button/Button.module.css';

export const Button = ({ title, onBtnClick, type = 'button' }) => {
  return (
    <button className={css.Button} onClick={onBtnClick} type={type}>
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onBtnClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};
