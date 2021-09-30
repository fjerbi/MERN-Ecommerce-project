import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import blog from './data/blog.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import Blog from './models/blogModel.js'
import connectDb from './config/db.js'

dotenv.config()

connectDb()

const importData= async () =>{
    try{
       await Order.deleteMany()
       await Product.deleteMany()
       await User.deleteMany()
       await Blog.deleteMany()
      const createdUsers =   await User.insertMany(users)

      const adminUser = createdUsers[0]._id

      const sampleProducts = products.map(product=>{
          //...product means all the products
          return {...product, user:adminUser}
      })
      const samplePosts = blog.map(blog=>{
        //...product means all the products
        return {...blog, user:adminUser}
    })
    await Blog.insertMany(samplePosts)
      await Product.insertMany(sampleProducts)
      console.log('Data imported')
      process.exit()

    }catch(error){
        console.error(`${error}`)
        process.exit(1)
    }

    
}


dotenv.config()

connectDb()

const destroyData= async () =>{
    try{
       await Order.deleteMany()
       await Product.deleteMany()
       await User.deleteMany()
       await Blog.deleteMany()
      console.log('Data Destroyed')
      process.exit()

    }catch(error){
        console.error(`${error}`)
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData
}else{
    importData()
}