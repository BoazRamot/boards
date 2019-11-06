import React, { ReactEventHandler } from 'react';
import { Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface IProps {
  userName: any,
  avatar: any
  handleNewPostOpen: ReactEventHandler
}

const PostInput: React.FC<IProps> = ({ handleNewPostOpen, userName, avatar }) => {

  return (
    <Grid item>
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

const mapStateToProps = (state: any) => ({
  userName: state.user.userData.name,
  avatar: state.user.userData.avatar,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PostInput);
