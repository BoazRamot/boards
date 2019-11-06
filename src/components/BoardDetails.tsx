import React, { ReactEventHandler } from 'react';
import IBoard from '../models/IBoard';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import logo from '../logo.svg';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  }),
);

interface IProps {
  board: IBoard;
  handleImageClick: ReactEventHandler;
}

const BoardDetails: React.FC<IProps> = ({ board, handleImageClick }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm >
      <Card className={classes.card}>
        <CardActionArea onClick={handleImageClick}>
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
    </Grid>
  );
};

export default BoardDetails;
