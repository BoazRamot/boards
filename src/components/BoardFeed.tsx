import React, { useEffect, useState } from 'react';
import { postsDataService } from '../App';
import IPost from '../models/IPost';
import IPostList from '../models/IPostList';
import PostForm from './PostForm';
import PostList from './PostList';

const BoardFeed: React.FC = () => {
  const [postList, setPostList] = useState<IPostList>({});
  useEffect(() => {
    const getPostList = async () => {
      const posts = await postsDataService.get();
      const list: IPostList = {};
      posts.forEach(post => (list[post._id] = post));
      setPostList(list);
    };
    getPostList();
  }, []);

  const onNewPost = (newPost: IPost) => {
    setPostList({ [newPost._id]: newPost, ...postList });
  };

  const onPostDelete = async (id: string) => {
    await postsDataService.remove(id);
    delete postList[id];
    setPostList({ ...postList });
  };

  return (
    <section className="board-feed">
      <PostForm onSubmit={onNewPost} />
      <PostList postList={postList} onPostDelete={onPostDelete} />
    </section>
  );
};

export default BoardFeed;
