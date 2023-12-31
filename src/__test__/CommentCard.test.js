import render from 'render';
import CommentCard from '../components/CommentCard';

describe(CommentCard, () => {
  const comment = {
    id: 123,
    user: {name: 'Alex', control: false},
    content: 'Test Comment',
    likes: 7,
    replies: 13,
    liked: true,
  }
  const photoId = 456;

  test('renders Snapshot', () => {
    const { container } = render(
        <CommentCard
          id={comment.id}
          photoId={photoId}
          name={comment.user.name}
          content={comment.content}
          likes={comment.likes}
          repliesCount={comment.replies}
          liked={comment.liked}
          control={comment.user.control}
        />
    );
    expect(container).toMatchSnapshot();
  });
});