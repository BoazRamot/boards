import React from 'react';
import {Card, CardContent, createStyles, Theme, Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {Link as RouterLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
// import {deletePost, imagesBaseURL} from '../services/posts.data.service';
// import {IPost} from '../models/IPost';
import CardMedia from '@material-ui/core/CardMedia';
import makeStyles from '@material-ui/core/styles/makeStyles';

interface IProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 300,
      width: 'auto',
      margin: 'auto',
      marginTop: theme.spacing(2)
    }
  })
);

const PostCard: React.FC<IProps> = () => {
  const classes = useStyles();

  return (
    <Box p={3}>

      <Card>
        <CardContent>
          <Typography variant="h5" color="textSecondary" component="p">
            post
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
};

export default PostCard;
