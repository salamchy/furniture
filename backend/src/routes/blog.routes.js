import express from 'express'
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blog.controller.js'
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js'
import multer from 'multer'

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

router.get('/', getAllBlogs)
router.get('/:id', getSingleBlog)

router.post(
  '/',
  upload.single('image'),
  authenticate,
  authorizeRoles('admin'),
  createBlog
)
router.put(
  '/:id',
  upload.single('image'),
  authenticate,
  authorizeRoles('admin'),
  updateBlog
)
router.delete('/:id', authenticate, authorizeRoles('admin'), deleteBlog)

export default router
