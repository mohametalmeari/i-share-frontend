import { useDispatch } from 'react-redux';
import { fetchPhotos } from '../redux/posts/photoSlice';

const Photos = () => {
  const dispatch = useDispatch();

  const handleFetchPhotos = async () => {
    dispatch(fetchPhotos());
  };
  return (
    <>
      <button type="button" onClick={handleFetchPhotos}>
        Get Photos
      </button>
    </>
  );
};
export default Photos;
