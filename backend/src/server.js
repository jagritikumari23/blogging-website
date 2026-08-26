import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env from the project root
const envPath = path.resolve(__dirname, '../.env')
console.log('Loading .env from:', envPath)
console.log('.env exists:', fs.existsSync(envPath))

const result = dotenv.config({ path: envPath })

if (result.error) {
  console.error('Error loading .env:', result.error)
} else {
  console.log('.env loaded successfully')
  console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Found' : 'NOT FOUND')
  console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Found' : 'NOT FOUND')
}

async function startServer() {
  const app = express()
  const PORT = process.env.PORT || 5000

  // Middleware
  app.use(cors())
  app.use(express.json())

  // Import routes after dotenv is configured using dynamic imports
  const postRoutes = (await import('./routes/postRoutes.js')).default
  const commentRoutes = (await import('./routes/commentRoutes.js')).default
  const categoryRoutes = (await import('./routes/categoryRoutes.js')).default
  const profileRoutes = (await import('./routes/profileRoutes.js')).default

  // Routes
  app.use('/api/posts', postRoutes)
  app.use('/api', commentRoutes)
  app.use('/api/categories', categoryRoutes)
  app.use('/api/profile', profileRoutes)

  // Error handling
  app.use(notFound)
  app.use(errorHandler)

  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

startServer()
