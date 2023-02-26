import { Component } from 'react';
import { getImages } from 'components/api/image';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from '../shared/Loader/Loader';
import { Button } from '../shared/Button/Button';
import { Modal } from 'shared/Modal/Modal';

import css from '../components/App.module.css';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    page: 1,
    search: '',
    showModal: false,
    imgDetails: {},
  };

  showModal = (largeImageURL, tags) => {
    this.setState({ showModal: true, imgDetails: { largeImageURL, tags } });
  };

  hideModal = () => {
    this.setState({ showModal: false, postDetails: {} });
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (search !== prevState.search || page !== prevState.page) {
      this.fetchData();
    }
  }

  updateSearch = search => {
    this.setState({ search, images: [], page: 1 });
  };

  async fetchData() {
    const { page, search } = this.state;
    try {
      this.setState({ isLoading: true });
      const { data } = await getImages(page, search);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        loading: false,
      }));
    } catch (error) {
      this.setState({ error: error.message || 'Oooopppsss! Try again' });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  loadMoreHandle = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading, error, showModal, imgDetails } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.updateSearch} />
        {error && <p>{error}</p>}
        {isLoading && <Loader />}
        {images.length > 0 && (
          <>
            <ImageGallery images={images} showModal={this.showModal} />
            <Button onBtnClick={this.loadMoreHandle}> Load more</Button>
          </>
        )}
        {showModal && (
          <Modal showModal={this.showModal} hideModal={this.hideModal}>
            <img src={imgDetails.largeImageURL} alt={imgDetails.tags} />
          </Modal>
        )}
      </div>
    );
  }
}
