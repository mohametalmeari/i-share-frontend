import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPhotos } from '../redux/posts/photoSlice';
import PhotoCard from './PhotoCard';

const Photos = () => {
  const dispatch = useDispatch();
  const { photos, isLoading } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch, isLoading]);
  return (
    <>
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          id={photo.id}
          imageUrl={photo.image_url}
          user={photo.user_id.toString()}
        />
      ))}
    </>
  );
};
export default Photos;
