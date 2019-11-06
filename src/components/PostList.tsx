import React from 'react';
import PostCard from './PostCard';

interface IProps {
  posts: any;
  boardId: any;
  deleteBoardPost: Function;
}

const PostList: React.FC<IProps> = ({ posts, boardId, deleteBoardPost }) => {

  return (
    <div>
      {Object.values(posts)
        .reverse()
        .map((post: any) => (
          <PostCard key={post._id} post={post} boardId={boardId} deleteBoardPost={deleteBoardPost}/>
        ))}
    </div>
  )
};

export default PostList;
