import express from "express";
import Product from "../models/orderModel.js";
import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc Create new order
// @route POOST /api/orders
// @access private route
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if(orderItems && orderItems.length===0){
      res.status(400)
      throw new Error('No order items')
  }else{
      const order = new Order({
        orderItems,
        user:req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice, 
      })

      const createdOrder = await order.save()
      res.status(201).json({createdOrder})
  }
});




// @desc Get  order by id
// @route GET /api/orders/:id
// @access private route
const getOrderById = asyncHandler(async (req, res) => {
  
 const order = await Order.findById(req.params.id)
 .populate('user','name email' )

 if(order){
   res.json(order)
 }else{
   res.status(404)

   throw new Error('Order not found')
 }
});


// @desc Get  order by user
// @route GET /api/orders/myorders
// @access private route
const getMyOrders = asyncHandler(async (req, res) => {
  
  const orders = await Order.find({user: req.user._id})
res.json(orders)
 
 });
 


export {addOrderItems, getOrderById, getMyOrders}