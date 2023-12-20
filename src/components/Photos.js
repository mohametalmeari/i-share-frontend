import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPhotos } from '../redux/posts/photoSlice';
import PhotoCard from './PhotoCard';

const Photos = () => {
  const dispatch = useDispatch();
  const { photos } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);
  return (
    <>
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          id={photo.id}
          photo={photo}
        />
      ))}
    </>
  );
};
export default Photos;
