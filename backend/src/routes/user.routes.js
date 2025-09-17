import express from 'express'
import {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
} from '../controllers/user.controller.js'
import {
  validateRegister,
  validateLogin,
} from '../middlewares/validation.middleware.js'
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js'

const router = express.Router()

// Public routes
router.post('/register', validateRegister, registerUser)
router.post('/login', validateLogin, loginUser)
router.post('/logout', authenticate, logoutUser)

// Protected routes
router.delete('/:id', authenticate, authorizeRoles('admin'), deleteUser)

export default router
