import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPhotos } from '../redux/posts/photoSlice';
import PhotoCard from './PhotoCard';

const Photos = () => {
  const dispatch = useDispatch();
  const { photos, isLoading, error } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  if (isLoading) {
    return (
      <p>
        Loading Photos
      </p>
    );
  }

  if (error) {
    return (
      <p>
        {error}
      </p>
    );
  }
  return (
    <>
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          id={photo.id}
          name={photo.user.name}
          imageUrl={photo.image_url}
          caption={photo.caption}
          likes={photo.likes}
          liked={photo.liked}
          control={photo.user.control}
          navigator
        />
      ))}
    </>
  );
};
export default Photos;
