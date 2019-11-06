import React, { useState } from 'react';
// import ILookup from '../models/ILookup';
// import IPost from '../models/IPost';
import PostCard from './PostCard';
import Box from '@material-ui/core/Box';
import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  Menu,
  MenuItem,
  Theme,
  Typography,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import postNotePaperY from '../postNotePaperY.jpg';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

interface IProps {
  posts: any;
  boardId: any;
  deleteBoardPost: Function;
  // postList: ILookup<IPost>;
  // onPostDelete: (id: string) => void;
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
// {/*<PostCard key={post._id} post={post} onDelete={onPostDelete} />*/}
export default PostList;
