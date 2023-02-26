import PropTypes from 'prop-types';

import css from '../ImageGalleryItem/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  tag,
  webformatURL,
  largeSrc,
  tags,
  showModal,
}) => {
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => showModal(largeSrc, tags)}
    >
      <img className={css.ImageGalleryItemImage} src={webformatURL} alt={tag} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  tag: PropTypes.string,
  webformatURL: PropTypes.string,
  largeSrc: PropTypes.string,
  tags: PropTypes.string,
  showModal: PropTypes.func,
};
