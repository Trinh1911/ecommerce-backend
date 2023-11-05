const Order = require("../models/OderProduct")
const Product = require('../models/ProductModel');

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user } = newOrder
        try {
            const promises = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        countInStock: { $gte: order.amount }
                    },
                    {
                        $inc: {
                            countInStock: -order.amount,
                            selled: +order.amount
                        }
                    },
                    { new: true }
                )
                console.log('productData', productData)
                if (productData) {
                    const createdOrder = await Order.create({
                        orderItems,
                        shippingAddress: {
                            fullName,
                            address,
                            city, phone
                        },
                        paymentMethod,
                        itemsPrice,
                        shippingPrice,
                        totalPrice,
                        user: user,
                    })
                    if (createdOrder) {
                        return {
                            status: 'OK',
                            message: 'SUCCESS',
                        }
                    }
                } else {
                    return {
                        status: 'OK',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results.filter((item) => item.id)
            console.log('newData', newData)
            if (newData.length) {
                resolve({
                    status: 'ERR',
                    message: `Sản phẩm với id${newData.id} không còn hàng`,
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
            })
            console.log('results', results)
        } catch (e) {
            console.log('e', e)
            reject(e)
        }
    })
}
const getAllOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({ user: id })
            // kiem tra user co trung khong
            if (order === null) {
                resolve({
                    status: "OK",
                    message: "the order is not defined"
                })
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: order
            })
        }
        catch (e) {
            reject(e);
        }
    })
}
const getDetailsOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({ _id: id })
            // kiem tra user co trung khong
            if (order === null) {
                resolve({
                    status: "OK",
                    message: "the order is not defined"
                })
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: order
            })
        }
        catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createOrder, getAllOrderDetails, getDetailsOrder
}