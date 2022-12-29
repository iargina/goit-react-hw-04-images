import { useState, useEffect } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from './App.module.css';
import { getImagesArr } from 'services/getphoto';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [largeImg, setLargeImg] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = ({ text }) => {
    setQuery(text);
    setPage(1);
    setTotalPages(0);
    setImages([]);
    setError('');
  };

  const modalClose = () => {
    setLargeImg(null);
  };

  const onClickImg = ({ large, alt }) => {
    setLargeImg({ src: large, alt: alt });
    return;
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    setLoading(true);
    getImagesArr(query, page)
      .then(({ finalPhotos, total_results }) => {
        setImages(prevState => [...prevState, ...finalPhotos]);
        setTotalPages(Math.floor(total_results / 12));
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, [query, page]);

  const loadMoreClick = () => {
    return setPage(prevState => prevState + 1);
  };

  return (
    <div className={css.mainDiv}>
      <SearchBar onSubmit={onSubmit} />

      {images.length > 0 ? (
        <>
          <ImageGallery>
            <ImageGalleryItem imagesArr={images} onClickImg={onClickImg} />
          </ImageGallery>
          {totalPages > page && !loading && (
            <Button loadMoreClick={loadMoreClick} />
          )}
        </>
      ) : (
        <h3>There is no images here. Type or refine your search query</h3>
      )}
      {error && <p>{error}</p>}
      {loading && <Loader />}
      {largeImg && <Modal largeSrc={largeImg} modalClose={modalClose} />}
    </div>
  );
};
