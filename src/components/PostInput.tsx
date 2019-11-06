import React, { ReactEventHandler, useEffect, useRef, useState } from 'react';
import IBoard from '../models/IBoard';
import ILookup from '../models/ILookup';
import IPost from '../models/IPost';
import BoundDataService from '../services/BoundDataService';
import { DataCollections } from '../services/data.service';
import Loading from './Loading';
import PostForm from './PostForm';
import PostList from './PostList';
import { useHistory } from 'react-router';
import { Card, CardContent, CardHeader, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PostFormDialog from './PostFormDialog';




// interface IProps {
//   board: IBoard;
//   handleNewPostOpen: ReactEventHandler;
// }

interface State {
  post: string;
  category: string;
}

interface IProps {
  userName: any,
  avatar: any
  handleNewPostOpen: ReactEventHandler
}



const PostInput: React.FC<IProps> = ({ handleNewPostOpen, userName, avatar }) => {

  return (
    <Grid item
          style={{
            // backgroundColor: "default", flexGrow: 1, overflow: "auto", /*minHeight: 'calc(100%)'*/
          }}
    >
      {/*<PostForm postDataService={postDataService} onSubmit={onNewPost} />*/}
      <Box mb={2} ml={1}>
        <Card onClick={handleNewPostOpen} style={{cursor: "pointer"}}>
          <CardContent>
            <Typography variant="h5" color="textSecondary" component="p" >
              Create A Post
            </Typography>
            <CardHeader
              avatar={ <Avatar alt={userName} src={avatar} /> }
              title={`What's On Your Mind, ${userName}?`}
            />
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

// export default PostInput;

const mapStateToProps = (state: any) => ({
  userName: state.user.userData.name,
  avatar: state.user.userData.avatar,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PostInput);
