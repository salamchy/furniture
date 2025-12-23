import express from 'express'
import multer from 'multer'
import {
  getAllBannerImg,
  addBannerImg,
  deleteBannerImg,
} from '../controllers/banner.controller.js'
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js'

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

// Admin routes
router.get('/', getAllBannerImg)
router.post(
  '/',
  upload.single('image'),
  authenticate,
  authorizeRoles('admin'),
  addBannerImg
)
router.delete('/:id', authenticate, authorizeRoles('admin'), deleteBannerImg)

export default router
