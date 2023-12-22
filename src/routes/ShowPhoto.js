import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PhotoCard from '../components/PhotoCard';
import { fetchPhoto, resetPhoto } from '../redux/posts/photoSlice';
import Comments from '../components/Comments';

const ShowPhoto = () => {
  const id = +useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { photo, isLoading, error } = useSelector((state) => state.photo);
  useEffect(() => {
    resetPhoto();
    dispatch(fetchPhoto(id));
    if (error) {
      navigate('/');
    }
  }, [dispatch, navigate, id, error]);

  if (isLoading) {
    return (
      <p>
        is loading
      </p>
    );
  }

  return (
    <div>
      <PhotoCard
        id={id}
        name={photo.user.name}
        imageUrl={photo.image_url}
        caption={photo.caption}
        likes={photo.likes}
        liked={photo.liked}
        control={photo.user.control}
        navigator={false}
        archive={photo.archive}
      />
      <Comments
        photoId={id}
      />
      <br />
    </div>
  );
};
export default ShowPhoto;
