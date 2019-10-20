const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  location: {
    address: {
      type: String,
      // required: true,
    },
    info: {
      type: String,
    },
    latitude: {
      type: Number,
      // required: true,
    },
    longitude: {
      type: Number,
      // required: true,
    },
  },
  community: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'post',
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
  created: {
    type: Date,
    default: Date.now,
  },
});

const Board = mongoose.model('board', boardSchema);

module.exports = Board;
