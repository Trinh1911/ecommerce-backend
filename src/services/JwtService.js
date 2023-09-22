const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const genneralAccessToken = async (payload) => {
    const access_token = jwt.sign(
        {
            ...payload
        }, process.env.ACCESSS_TOKEN, { expiresIn: '30s' }
    )
    return access_token
}
const genneralRefresToken = async (payload) => {
    const refresh_token = jwt.sign(
        {
            ...payload
        }, process.env.REFRESH_TOKEN, { expiresIn: '365d' }
    )
    return refresh_token
}
const refresTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            console.log('token', token)
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    console.log('err', err)
                    resolve(
                        {
                            status: 'ERR',
                            message: 'the authentication'
                        }
                    )
                }
                const access_token = await genneralAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                })
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    access_token
                })
            })
        }
        catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    genneralAccessToken, genneralRefresToken, refresTokenJwtService
}