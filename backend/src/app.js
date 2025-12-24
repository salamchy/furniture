import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { errorHandler } from './middlewares/error.middleware.js'

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(',')
      : ['furniture-ri8t.vercel.app'],
    credentials: true,
    optionsSuccessStatus: 200,
  })
)

app.use(express.json({ limit: '100kb' }))

app.use(express.urlencoded({ extended: true, limit: '100kb' }))

app.use(express.static('public'))

app.use(cookieParser())

//router import
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import bannerImgRouter from './routes/bannerImg.routes.js'
import blogsRouter from './routes/blog.routes.js'
// import reviewRouter from './routes/reviews.routes.js'

//router declaration
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/bannerImg', bannerImgRouter)
app.use('/api/v1/blogs', blogsRouter)
// app.use('/api/v1/reviews', reviewRouter)

// Global error handler
app.use(errorHandler)
export { app }
