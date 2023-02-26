import { useState, useEffect } from 'react';
import { getImages } from 'components/api/image';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from '../shared/Loader/Loader';
import { Button } from '../shared/Button/Button';
import { Modal } from 'shared/Modal/Modal';
import css from '../components/App.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imgDetails, setImgDetails] = useState({});

  const showModalHandler = (largeImageURL, tags) => {
    setShowModal(true);
    setImgDetails({ largeImageURL, tags });
  };

  const hideModalHandler = () => {
    setShowModal(false);
    setImgDetails({});
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await getImages(page, search);
        setImages(prevImages => [...prevImages, ...data.hits]);
        setIsLoading(false);
      } catch (error) {
        setError(error.message || 'Oooopppsss! Try again');
        setIsLoading(false);
      }
    }

    fetchData();
  }, [page, search]);

  const updateSearchHandler = search => {
    setSearch(search);
    setImages([]);
    setPage(1);
  };

  const loadMoreHandler = () => {
    setPage(prevPage => prevPage + 1);
  };

  const noMoreImages = images.length > 0 && images.length % 12 !== 0;

  return (
    <div className={css.App}>
      <Searchbar onSubmit={updateSearchHandler} />
      {error && <p>{error}</p>}
      {isLoading && <Loader />}
      {!isLoading && images.length === 0 && (
        <p>
          No results found for "{search}". Please enter a valid search term.
        </p>
      )}
      {images.length > 0 && (
        <>
          <ImageGallery images={images} showModal={showModalHandler} />

          {!isLoading && !error && !noMoreImages && (
            <Button onBtnClick={loadMoreHandler} title={'Load more'}></Button>
          )}
        </>
      )}
      {showModal && (
        <Modal showModal={showModalHandler} hideModal={hideModalHandler}>
          <img src={imgDetails.largeImageURL} alt={imgDetails.tags} />
        </Modal>
      )}
    </div>
  );
};
