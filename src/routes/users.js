const express = require('express')
const User = require('../models/User')
const expressAsyncHandler = require('express-async-handler')
const {generateToken, isAuth} = require('../../auth')

const router = express.Router() // 하위 url 로직을 처리하는 라우터 모듈

router.post('/register', expressAsyncHandler(async (req, res, next) => {
    console.log(req.body)
    const user = new User({
        id: req.body.id,
        address: req.body.address,
        password: req.body.password,
    })
    const newUser = await user.save()   // DB에 User 생성
    if(!newUser){
        res.status(401).json({code: 401, message: 'Invalid User Data'})
    }else{
        const { id, address } = newUser
        res.json({
            code: 200,
            token: generateToken(newUser),
            id, address
        })
    }
}))

router.post('/login', expressAsyncHandler(async (req, res, next) => {
    console.log(req.body)
    const loginUser = await User.findOne({
        id: req.body.id,
        password: req.body.password,
    })
    if(!loginUser){
        res.status(401).json({code: 401, message: 'Invalid Email or Password'})
    }else{
        const { id, address } = loginUser
        res.json({
            code: 200,
            token: generateToken(loginUser),
            id, address
        })
    }
}))

router.post('/logout', (req, res, next) => {
    res.json("로그아웃")
})

// isAuth : 사용자를 수정할 권한이 있는지 검사하는 미들웨어
router.put('/:id', isAuth, expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(404).json({code: 404, message: 'User Not Founded'})
    }else{
        user.id = req.body.id || user.id
        user.address = req.body.address || user.address
        user.password = req.body.password || user.password

        const updatedUser = await user.save()   // DB에 사용자정보 업데이트
        const { id, address} = updatedUser
        res.json({
            code: 200,
            token: generateToken(updatedUser),
            id, address
        })
    }
}))

router.delete('/:id', isAuth, expressAsyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if(!user) {
        res.status(404).json({code: 404, message: 'User Not Founded'})
    }else{
        res.status(204).json({code: 204, message: 'User deleted successfully !'})
    }
}))

module.exports = router // 외부에서 쓰기 위해