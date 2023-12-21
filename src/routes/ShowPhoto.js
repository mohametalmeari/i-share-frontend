import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PhotoCard from '../components/PhotoCard';
import { fetchPhoto } from '../redux/posts/photoSlice';
import CommentForm from '../components/CommentForm';

const ShowPhoto = () => {
  const id = +useParams().id;
  const dispatch = useDispatch();
  const { photo } = useSelector((state) => state.photo);
  useEffect(() => {
    dispatch(fetchPhoto(id));
  }, [dispatch, id]);

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
      <CommentForm
        photoId={id}
      />
      <br />
    </div>
  );
};
export default ShowPhoto;
