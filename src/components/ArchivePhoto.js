import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
import { archivePhoto } from '../redux/posts/photoSlice';

const ArchivePhoto = ({ id, archive }) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleArchive = async () => {
    try {
      await dispatch(archivePhoto(id));
    } catch (error) {
      console.error('An error occurred during deletion:', error);
    }
  };
  return (
    <>
      <button type="button" onClick={handleArchive}>
        {archive ? 'Unarchive' : 'Archive'}
      </button>
    </>
  );
};
export default ArchivePhoto;
ArchivePhoto.propTypes = {
  id: PropTypes.number.isRequired,
  archive: PropTypes.bool,
};

ArchivePhoto.defaultProps = {
  archive: false,
};
