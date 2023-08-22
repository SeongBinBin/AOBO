const { unwatchFile } = require('fs')
const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({ // 스키마 정의
    id: {
        type: String,
        required: true,
        unique: true,
        maxLength: 10,
    },
    email: {
        type: String,
        required: true,
        maxLength: 100,
    },
    password: {
        type: String,
        required: true,
        maxLength: 10,
    },
})

const User = mongoose.model('User', userSchema) // User => users, 이름 설정을 위함이라면 세번째 인자에 '**' 추가
module.exports = User