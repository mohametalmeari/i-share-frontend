import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPhotos } from '../redux/posts/photoSlice';
import PhotoCard from './PhotoCard';

const Photos = () => {
  const dispatch = useDispatch();
  const { photos } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(fetchPhotos());
    console.log(photos);
  }, [dispatch]);
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
