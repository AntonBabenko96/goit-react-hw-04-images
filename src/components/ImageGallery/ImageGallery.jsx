import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

import css from '../ImageGallery/ImageGallery.module.css';

export const ImageGallery = ({ images, showModal }) => {
  const element = images.map(image => (
    <ImageGalleryItem
      key={image.id}
      tag={image.tag}
      webformatURL={image.webformatURL}
      showModal={showModal}
      largeSrc={image.largeImageURL}
      tags={image.tags}
    />
  ));

  return <ul className={css.ImageGallery}>{element}</ul>;
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tag: PropTypes.string,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    })
  ).isRequired,
  showModal: PropTypes.func.isRequired,
};
