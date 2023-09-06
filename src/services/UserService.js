const User = require('../models/UserModel');
const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {
            const createdUser = await User.create({
                name, email, password, confirmPassword, phone
            })
            if (createdUser) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createdUser
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createUser
}