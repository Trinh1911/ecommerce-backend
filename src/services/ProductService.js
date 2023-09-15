const Product = require('../models/ProductModel');
const bcrypt = require('bcrypt');
const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description, discount, selled } = newProduct
        try {
            const checkProduct = await Product.findOne({ name: name })
            // kiem tra product co trung khong
            if (checkProduct !== null) {
                resolve({
                    status: "OK",
                    message: "the product is already"
                })
            }
            const createdProduct = await Product.create({
                name, image, type, price, countInStock, rating, description, discount, selled
            })
            if (createdProduct) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createdProduct
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ _id: id })
            // kiem tra Product co trung khong
            if (checkProduct === null) {
                resolve({
                    status: "OK",
                    message: "the Product is not defined"
                })
            }
            const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            console.log('updatedUser', updateProduct)
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updateProduct
            })
        }
        catch (e) {
            reject(e);
        }
    })
}
const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ _id: id })
            // kiem tra user co trung khong
            if (checkProduct === null) {
                resolve({
                    status: "OK",
                    message: "the product is not defined"
                })
            }
            await Product.findByIdAndDelete(id)
            resolve({
                status: "OK",
                message: "DELETED SUCCESS"
            })
        }
        catch (e) {
            reject(e);
        }
    })
}
const getAllProduct = (limit = 2, page = 0) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.count()
            const allProduct = await Product.find().limit(limit).skip(page * limit)
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPages: Math.ceil(totalProduct / limit)
            })
        }
        catch (e) {
            reject(e);
        }
    })
}
const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({ _id: id })
            // kiem tra user co trung khong
            if (product === null) {
                resolve({
                    status: "OK",
                    message: "the product is not defined"
                })
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: product
            })
        }
        catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createProduct, updateProduct, deleteProduct, getAllProduct, getDetailProduct
}