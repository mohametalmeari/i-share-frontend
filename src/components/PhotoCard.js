import PropTypes from 'prop-types';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { archivePhoto, deletePhoto, likePhoto } from '../redux/posts/photoSlice';
import {
  ArchiveIcon, ArchivedIcon, DeleteIcon, EmptyStarIcon, FilledStarIcon,
} from '../assets/icons';

const PhotoCard = ({
  id, name, imageUrl, caption, likes, liked, control, navigator, archive, profileImage, comments,
}) => {
  const defaultImgUrl = 'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg';
  const defaultProfileUrl = 'https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(profileImage);
  const [postImg, setPostImg] = useState(imageUrl);

  const handleArchive = () => {
    dispatch(archivePhoto(id));
  };
  const handleDelete = async () => {
    const { payload } = await dispatch(deletePhoto(id));
    if (payload && payload.deleted) {
      navigate('/');
    }
  };

  const profileImageError = () => {
    setProfileImg(defaultProfileUrl);
  };

  const postImageError = () => {
    setPostImg(defaultImgUrl);
  };

  const handleLike = () => {
    dispatch(likePhoto({ id, liked }));
  };
  return (
    <div className="photo-card">
      <div className="post-header">
        <img className="profile-img" src={profileImg} alt="i-share" onError={profileImageError} />
        <p>
          {name}
        </p>
      </div>
      {navigator
        ? (
          <NavLink to={`photos/${id}`}>
            <img className="photo-img" src={postImg} alt="i-share" onError={postImageError} />
          </NavLink>
        )
        : (
          <div>
            <img className="photo-img" src={postImg} alt="i-share" onError={postImageError} />
          </div>
        )}
      <p>
        {caption}
      </p>

      <div className="control-container">
        <button className="icon-btn" type="button" onClick={handleLike}>
          {liked
            ? (<FilledStarIcon /> || 'Unlike')
            : (<EmptyStarIcon /> || 'Like')}
        </button>
        {control && (
        <>
          <button className="icon-btn" type="button" onClick={handleDelete}>
            {<DeleteIcon /> || 'delete'}
          </button>
          <button className="icon-btn" type="button" onClick={handleArchive}>
            {archive
              ? (<ArchivedIcon /> || 'Unarchive')
              : (<ArchiveIcon /> || 'Archive')}
          </button>
        </>
        )}
      </div>

      <span className="interaction-counts">
        {likes === 0
          ? 'No stars'
          : ''}
        {likes > 1
          ? `${likes} stars`
          : ''}
        {likes === 1
          ? 'One star'
          : ''}
        {', '}
        {comments === 0
          ? 'No comments'
          : ''}
        {comments > 1
          ? `${comments} comments`
          : ''}
        {comments === 1
          ? 'One comments'
          : ''}

      </span>
    </div>
  );
};
export default PhotoCard;

PhotoCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  comments: PropTypes.number,
  liked: PropTypes.bool.isRequired,
  control: PropTypes.bool.isRequired,
  navigator: PropTypes.bool.isRequired,
  archive: PropTypes.bool,
};
PhotoCard.defaultProps = {
  archive: false,
  comments: 0,
};
