import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchMyPhotos } from '../redux/posts/photoSlice';
import PhotoCard from './PhotoCard';

const MyPhotos = () => {
  const dispatch = useDispatch();
  const { photos, isLoading } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(fetchMyPhotos());
  }, [dispatch]);

  if (isLoading) {
    return (
      <p>
        Loading Photos
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
          profileImage={photo.user.profile_image}
          caption={photo.caption}
          likes={photo.likes}
          comments={photo.comments}
          liked={photo.liked}
          control={photo.user.control}
          archive={photo.archive}
          navigator
        />
      ))}
    </>
  );
};
export default MyPhotos;
