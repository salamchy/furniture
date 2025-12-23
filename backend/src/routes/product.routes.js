import express from 'express'
import {
  addProduct,
  editProduct,
  deleteProduct,
  getProducts,
  getProductById,
} from '../controllers/product.controller.js'
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js'
import multer from 'multer'

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

router.post(
  '/',
  upload.single('image'),
  authenticate,
  authorizeRoles('admin'),
  addProduct
)
router.put(
  '/:id',
  upload.single('image'),
  authenticate,
  authorizeRoles('admin'),
  editProduct
)
router.delete('/:id', authenticate, authorizeRoles('admin'), deleteProduct)

router.get('/', getProducts)
router.get('/:id', getProductById)

export default router
