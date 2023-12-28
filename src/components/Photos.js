import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPhotos } from '../redux/posts/photoSlice';
import PhotoCard from './PhotoCard';
import loadingIcon from '../assets/loading-photos-icon.gif';

const Photos = () => {
  const dispatch = useDispatch();
  const { photos, isLoading } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  if (isLoading) {
    return (
      <img className="loading-icon" src={loadingIcon} alt="loading" />
    );
  }

  return (
    <div className="photos-container">
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
          navigator
        />
      ))}
    </div>
  );
};
export default Photos;
