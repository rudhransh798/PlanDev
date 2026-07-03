import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/' , (req , res) => {
    res.json({ message : 'Plandev API is running' })
})

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  })