

import mongoose from 'mongoose'

const connectDB = async ()=>{
  try {
    await   mongoose.connect(process.env.MONGO)
    console.log('mongoDB connected successfully')
  } catch (error) {
    console.log(error.message);
  }
}

export default connectDB