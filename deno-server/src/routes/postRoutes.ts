// src/routes/postRoutes.ts
import { Hono } from 'hono';
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from '../controllers/postController.ts';

const postRoutes = new Hono();

postRoutes.post('/posts', createPost);
postRoutes.get('/posts', getPosts);
postRoutes.get('/posts/:id', getPost);
postRoutes.put('/posts/:id', updatePost);
postRoutes.delete('/posts/:id', deletePost);

export default postRoutes;
