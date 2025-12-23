import { UserModel } from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//-------controller for user registration--------
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body
  try {
    //validate if all required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Check if a user already exists with the provided email
    const userExist = await UserModel.findOne({ email })

    if (userExist) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Hash the password using bcrypt before saving it to the database
    const hashPassword = await bcrypt.hash(password, 10)

    // Create a new user with the hashed password
    const newUser = await UserModel.create({
      username,
      email,
      password: hashPassword,
    })

    // Save the new user to the database
    await newUser.save()

    // Respond with a success message
    return res.status(201).json({
      success: true,
      message: 'Successfully Registered!!!',
    })
  } catch (error) {
    console.log(error) // Log the error for debugging
    return res.status(500).json({ error: 'Internal Server Error' }) // Respond with a server error
  }
}

//-------controller for user login-----------------
export const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    // Validate if all required fields are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Find the user by email and include the password field
    const userExist = await UserModel.findOne({ email }).select('+password')

    if (!userExist) {
      return res.status(400).json({ error: 'Invalid Credentials' })
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, userExist.password)

    if (!isPasswordMatch) {
      return res.status(400).json({ error: 'Invalid Credentials' })
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      {
        id: userExist._id,
        username: userExist.username,
        email: userExist.email,
        role: userExist.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    // Respond with the token and user details
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: false, // set to false for local development
      sameSite: 'strict', //prevent from CSRF
      maxAge: 60 * 60 * 1000, //1hour
    })

    // Prepare user data to send in response
    const userData = {
      _id: userExist._id,
      email: userExist.email,
      username: userExist.username,
      role: userExist.role,
    }

    // Respond with a success message and the generated token
    return res.status(200).json({
      success: true,
      message: 'Login Successfully!!!',
      token,
      user: userData,
    })
  } catch (error) {
    console.log(error) // Log the error for debugging
    return res.status(500).json({ error: 'Internal Server Error' }) // Respond with a server error
  }
}

// -------- controller for user logout ----------
export const logoutUser = async (req, res) => {
  try {
    // Clear the auth cookie
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: false, // set false in local dev if not using https
      sameSite: 'strict',
    })

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully.',
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

//---------- controller for deleting a user---------------
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await UserModel.findByIdAndDelete(id)

    if (!user) {
      return res.status(404).send({
        message: 'User not found.',
      })
    }
    res.status(200).send({ message: 'User deleted successfully.' })
  } catch (error) {
    console.log(error) // Log the error for debugging
    return res.status(500).json({ error: 'Internal Server Error' }) // Respond with a server error
  }
}
