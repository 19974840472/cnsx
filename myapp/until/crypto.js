// 引入加密模块
const crypto = require('crypto');

// 密钥
const secret = "rookie";

// 加密
const output = text => {
    const cipher = crypto.createCipher('aes192',secret);
    cipher.update(text);
    const result = cipher.final('hex');
    return result;
}

// 解密
const input = text => {
    const deCipher = crypto.createDecipher('aes192',secret);
    deCipher.update(text,'hex');
    const result = deCipher.final('utf-8');
    return result;
}

module.exports = {
    output,input
}
