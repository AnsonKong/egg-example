'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    username: { type: String, default: 'unknown' },
    email: { type: String },
    password: { type: String },
    salt: { type: String },
    avatar: { type: String },
    created_time: { type: Number },
    github: { type: String },
    website: { type: String },
    location: { type: String },
    weibo: { type: String },
    signature: { type: String },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    collections: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    admin: { type: Boolean, default: false },
  });

  return mongoose.model('User', UserSchema);
};
