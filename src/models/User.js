const { unwatchFile } = require('fs')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

const { Schema } = mongoose

const userSchema = new Schema({ // 스키마 정의
    userId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 10,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 10,
    },
})

userSchema.pre("save", function(next){  // bcrypt, salt를 이용한 비밀번호 암호화
    let user = this

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else{
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword){
    return bcrypt
        .compare(plainPassword, this.password)
        .then((isMatch) => isMatch)
        .catch((err) => err)
}

const User = mongoose.model('User', userSchema) // User => users, 이름 설정을 위함이라면 세번째 인자에 '**' 추가
module.exports = User