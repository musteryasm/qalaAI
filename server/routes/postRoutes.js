import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// get all post
router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});

// create a post
router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
  }
});

// Delete a post
router.route('/:postId').delete(async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    // Delete the photo from Cloudinary
    await cloudinary.uploader.destroy(post.photo.public_id);

    // Delete the post from MongoDB
    await Post.findByIdAndDelete(postId);

    res.status(200).json({ success: true, message: 'Post and photo deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Unable to delete the post and photo, please try again' });
  }
});

export default router;