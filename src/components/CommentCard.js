import PropTypes from 'prop-types';

const CommentCard = ({
  id, name, content, likes, liked, control,
}) => (
  <>
    {id}
    ,
    {name}
    :
    {content}
    ,
    {likes}
    ,
    {liked}
    ,
    {control}
    <br />
  </>
);

export default CommentCard;

CommentCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  control: PropTypes.bool.isRequired,
};
