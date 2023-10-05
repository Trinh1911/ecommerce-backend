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
                    status: "ERR",
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
            const checkProduct = await Product.findOne({
                _id: id
            })
            // kiem tra Product co trung khong
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProduct
            })
        } catch (e) {
            reject(e)
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
const deleteMany = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({_id:ids})
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
const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.count()
            console.log('filter', filter)
            if(filter) {
                const label = filter[0]
                const allObjectFiter = await Product.find({
                    [label]: {'$regex': filter[1]}
                }).limit(limit).skip(page * limit)
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: allObjectFiter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPages: Math.ceil(totalProduct / limit)
                })
            }
            if(sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                console.log('objectSort', objectSort)
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPages: Math.ceil(totalProduct / limit)
                })
            }
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
    createProduct, updateProduct, deleteProduct, getAllProduct, getDetailProduct, deleteMany
}