const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Board = require('../models/board');
const User = require('../models/user');

const app = express();


router
  // @route   GET api/boards
  // @desc    Get all boards
  // @access  Public
  .get('/', async (req, res) => {
    try {
      const boards = await Board.find()
        .sort({ created: -1 })
        .populate('user', ['name', 'avatar']);
      return res.json(boards);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  })

  // @route   GET api/boards/:id
  // @desc    Get board by id
  // @access  Public
  .get('/:id', async (req, res) => {
    try {
      const board = await Board.findOne({ _id: req.params.id }).populate('user', ['name', 'avatar']);
  
      if (!board) {
        return res.status(404).json('Board not found');
      }
  
      res.json(board);
    } catch (error) {
      console.error(error.message);
  
      if (error.kind === 'ObjectId') {
        return res.status(404).send('Board not found');
      }
  
      res.status(400).send('Server error');
    }
  })

  // @route   GET api/boards/me
  // @desc    Get current user boards
  // @access  Private
  .get('/me', auth, async (req, res) => {
    try {
      const boards = await Board.find({ user: req.user.id }).populate('user', ['name', 'avatar']);
  
      if (boards.length < 1) {
        return res.status(500).json('There is no boards for this user');
      }
  
      res.json(boards);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  })

  // @route   POST api/boards
  // @desc    Create board
  // @access  Private
  .post('/',  auth, 
    // (req, res, next) => {console.log('post', {  body: req.body  }); next();},[
    //     // check('name', 'Name is required').not().isEmpty(),
    //     // check('location', 'Address is required').not().isEmpty(),
    //     // check('location.*.', 'Address is required').not().isEmpty(),
    //     // check('location.latitude:', 'Latitude is required').not().isEmpty(),
    //     // check('location.longitude:', 'Longitude is required').not().isEmpty(),
    //     // check('community', 'Community is required').not().isEmpty(),
    //   ],

    async (req, res) => {
      const errors = await validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { name, location, community, description } = req.body;
      const users = [req.user.id];
      const boardFields = { name, community, description, location, users };
  
      // Create board
      try {
        const board = new Board(boardFields);
        await board.save();
        // Add board id to user boards[]
        const user = await User.findOne({ _id: req.user.id });
        user.boards = [...user.boards, board._id];
        await user.save();
        // res.redirect(`http://localhost:3000/board/${board._id}`);
        res.json(board);
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }
    }
  )

  // @route   DELETE api/boards/:id
  // @desc    DELETE board by id
  // @access  Private
  .delete('/delete/:id', auth, async (req, res) => {
    try {
      // Remove board
      const removedBoard = await Board.findOne({ _id: req.params.id });
  
      if (!removedBoard) {
        return res.status(404).json('Board not found');
      }
  
      // Check if board is belongs to user
      if (req.user.id === removedBoard.user._id.toString()) {
        await Board.findByIdAndRemove({ _id: req.params.id });
        res.send('Board deleted');
      } else {
        return res.status(401).json({ msg: 'User not authorized' });
      }
    } catch (error) {
      console.error(error.message);
      if (error.kind === 'ObjectId') {
        return res.status(404).json('Board not found');
      }
      res.status(400).send('Board not found');
    }
  })

  // @route   POST api/boards/:board_id/post
  // @desc    Create post
  // @access  Private
  .post(
    '/:board_id/post',
    [
      auth,
      [
        check('text', 'Text is required')
          .not()
          .isEmpty(),
      ],
    ],
    async (req, res) => {
      const errors = await validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      //const user = await User.findById(req.user.id).select('-password');
      const board = await Board.findById(req.params.board_id);
  
      const newPost = {
        user: req.user.id,
        text: req.body.text,
      };
  
      board.posts.unshift(newPost);
  
      // Add post
      try {
        await board.save();
        res.json(board.posts);
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }
    }
  )

  // @route   PUT api/boards/:board_id/post/:post_id/like
  // @desc    Like a post
  // @access  Private
  .put('/:board_id/post/:post_id/like', auth, async (req, res) => {
    try {
      const board = await Board.findById(req.params.board_id);
  
      if (!board) {
        return res.status(404).json('Board not found');
      }
  
      const post = board.posts.find(post => post._id === req.params.post_id);
  
      if (!post) {
        return res.status(404).json('Post not found');
      }
  
      //Check if the post has already been liked
      if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.json({ msg: 'Post already liked' });
      }
  
      const postIndex = board.posts.findIndex(post => post.id === req.params.post_id);
  
      board.posts[postIndex].likes.unshift({ user: req.user.id });
      await board.save();
      res.json(board.posts[postIndex]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  })

  // @route   PUT api/boards/:board_id/post/:post_id/unlike
  // @desc    Unlike a board
  // @access  Private
  .put('/:board_id/post/:post_id/unlike', auth, async (req, res) => {
    try {
      let board = await Board.findById(req.params.board_id);
  
      if (!board) {
        return res.status(404).json('Board not found');
      }
  
      const post = board.posts.find(post => post._id == req.params.post_id);
  
      if (!post) {
        return res.status(404).json('Post not found');
      }
  
      //Check if the board has not yet been liked
      if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        return res.json({ msg: 'Post has not yet been liked' });
      }
  
      const postIndex = board.posts.findIndex(post => post._id == req.params.post_id);
      post.likes.splice(postIndex, 1);
  
      await board.save();
      res.json(post.likes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  })

  // @route   POST api/boards/:board_id/pots/:post_id
  // @desc    Create comment for post
  // @access  Private
  .post(
    '/:board_id/post/:post_id',
    [
      auth,
      [
        check('text', 'Text is required')
          .not()
          .isEmpty(),
      ],
    ],
    async (req, res) => {
      const errors = await validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const user = await User.findById(req.user.id).select('-password');
      const board = await Board.findById(req.params.board_id);
      const postIndex = board.posts.findIndex(post => post._id == req.params.post_id);
  
      const newComment = {
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
        text: req.body.text,
      };
  
      board.posts[postIndex].comments.unshift(newComment);
    }
  );

module.exports = router;
