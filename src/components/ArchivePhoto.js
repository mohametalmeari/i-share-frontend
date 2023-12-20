import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { archivePhoto } from '../redux/posts/photoSlice';

const ArchivePhoto = ({ id }) => {
  const dispatch = useDispatch();

  const handleArchive = async () => {
    dispatch(archivePhoto(id));
  };
  return (
    <>
      <button type="button" onClick={handleArchive}>
        Archive
      </button>
    </>
  );
};
export default ArchivePhoto;
ArchivePhoto.propTypes = {
  id: PropTypes.number.isRequired,
};
