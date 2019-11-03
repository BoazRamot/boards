import React, {useEffect, useRef, useState} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {Link as RouterLink, RouteComponentProps, useHistory} from 'react-router-dom';
import PostCard from "../../components/PostCard";
import {Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField} from "@material-ui/core";
import {Dispatch} from "redux";
import {closeDrawer, setPopstate} from "../../store/actions/action.mapReducer";
import {createNewBoard} from "../../store/actions/action.mapApiMiddleware";
import {boardDataSet} from "../../store/actions/action.boardsDataReducer";
import {connect} from "react-redux";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import logo from "../../logo.svg"
import boardSnapShoot from "../../boardSnapShoot.jpg";
import {saveMapDataNow} from "../../store/actions/action.mapDataMiddleware";
// import {getAllPosts} from '../../services/posts.data.service';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      height: '100vh',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },

    card: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },

    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      // width: '35vw'
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },

  }),
);

interface IProps {
  board: any
  saveMapDataNow: Function
}

interface State {
  post: string;
  category: string;
}

const Board: React.FC<IProps & RouteComponentProps> = ({ match, board, saveMapDataNow }) => {
  const [openNewPost, setOpenNewPost] = useState(false);
  const [values, setValues] = useState<State>({
    post: '',
    category: 'General'
  });
  const formEl = useRef<HTMLFormElement>(null);
  const classes = useStyles();
  let history = useHistory();

  const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const category = [
    { value: 'General' },
  ];

  const handleNewPostOpen = () => {
    setOpenNewPost(true);
  };

  const handleNewPostClose = () => {
    setOpenNewPost(false);
  };


  useEffect(() => {
    const boardId = (match.params as any).id;
    console.log('boardId', boardId)
    // getBoardPosts();
    // const getPosts = async () => {
    //   const result = await getAllPosts();
    //   setPosts(result);
    // };
    // getPosts();
  // }, [updateRequired]);
  }, []);

  // const board = {
  //   name: values.name,
  //   community: values.community,
  //   description: values.description,
  //   geoLocation: {
  //     type : 'Point',
  //     coordinates : [latLng.lng, latLng.lat]
  //   },
  //   location: {
  //     address: values.address,
  //     info: values.info,
  //     latitude: latLng.lat ,
  //     longitude: latLng.lng
  //   },
  // };
  
  const handleImageClick = () => {
    saveMapDataNow();
    history.push("/");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const post = {
      post: values.post,
      category: values.category
    }
    console.log('post', post)
    // const board = {
    //   name: values.name,
    //   community: values.community,
    //   description: values.description,
    //   geoLocation: {
    //     type : 'Point',
    //     coordinates : [latLng.lng, latLng.lat]
    //   },
    //   location: {
    //     address: values.address,
    //     info: values.info,
    //     latitude: latLng.lat ,
    //     longitude: latLng.lng
    //   },
    // };
    // console.log('board', board)
    // createNewBoard(board);
    // handleNewBoardClose();
    // handleNewBoardCreatedOpen();
  };

  return (
    <div className={classes.root} style={{backgroundImage: `url(${boardSnapShoot})`}}>
      <Dialog open={openNewPost} onClose={handleNewPostClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create New Board</DialogTitle>
        <form autoComplete="off" onSubmit={handleSubmit} ref={formEl} className={classes.container}>
          <DialogContent>
            <TextField
              required
              id="outlined-name"
              label="Board Name"
              className={classes.textField}
              value={values.post}
              onChange={handleChange('post')}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Category"
              className={classes.textField}
              value={values.category}
              onChange={handleChange('category')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Please Select Your Post Category"
              margin="normal"
              variant="outlined"
            >
              {category.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            {/*<TextField*/}
            {/*  id="outlined-dense-multiline"*/}
            {/*  label="Board Description"*/}
            {/*  className={clsx(classes.textField, classes.dense)}*/}
            {/*  margin="dense"*/}
            {/*  variant="outlined"*/}
            {/*  multiline*/}
            {/*  fullWidth*/}
            {/*  rowsMax="4"*/}
            {/*  value={values.description}*/}
            {/*  onChange={handleChange('description')}*/}
            {/*/>*/}
            {/* todo: add static map*/}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNewPostClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Box mt={2}>
        <Grid container spacing={1} >
          {/*<Grid item xs={12} sm={4}>*/}
          <Grid item xs={12} sm >
            <Card className={classes.card}>
              <CardActionArea onClick={handleImageClick}>
              {/*<CardActionArea >*/}
                <CardMedia
                  className={classes.media}
                  image={logo}
                  title={board.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {board.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {board.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {board.location.address}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {board.location.info}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {board.community}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Join Community
                </Button>
              </CardActions>
            </Card>
            {/*board detail*/}
            {/*<Paper className={classes.paper}>xs=12</Paper>*/}
          </Grid>
          {/*<Grid item xs={12} sm={8}>*/}
          <Grid item xs={12} sm>
            {/*post a post*/}
            {/*posts*/}
            <PostCard handleNewPostOpen={handleNewPostOpen}/>
            {/*<Paper className={classes.paper}>xs=12 sm=6</Paper>*/}
          </Grid>
        </Grid>
      </Box>
    </div>

  )
};

const mapStateToProps = (state: any) => ({
  board: state.mapBoards.board,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveMapDataNow: () => {
    dispatch(saveMapDataNow(true));
    // dispatch(setPopstate());
  },
  // setPopstate: () => dispatch(setPopstate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);

// {/*<Grid container justify="center">*/}
// {/*  <Grid item xs={10}>*/}
// {/*    <RouterLink to={`/new-post/`}>*/}
// {/*      <Box m={3}>*/}
// {/*        <Button variant="contained" color="primary">*/}
// {/*          Create new Post*/}
// {/*        </Button>*/}
// {/*      </Box>*/}
// {/*    </RouterLink>*/}
//
// {/*  </Grid>*/}
// {/*  <Grid item xs={10}>*/}
// {/*    <PostCard/>*/}
// {/*  </Grid>*/}
// {/*</Grid>*/}
