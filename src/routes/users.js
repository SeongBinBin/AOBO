const express = require('express')
const User = require('../models/User')
const expressAsyncHandler = require('express-async-handler')
const {generateToken, isAuth} = require('../../auth')

const router = express.Router() // 하위 url 로직을 처리하는 라우터 모듈

router.post('/register', expressAsyncHandler(async (req, res, next) => {
    console.log(req.body)
    const user = new User({
        userId: req.body.userId,
        email: req.body.email,
        password: req.body.password,
    })
    const newUser = await user.save()   // DB에 User 생성
    if(!newUser){
        res.status(401).json({code: 401, message: 'Invalid User Data'})
    }else{
        const { userId, email } = newUser
        res.json({
            code: 200,
            token: generateToken(newUser),
            userId, email
        })
    }
}))

router.post('/idcheck', expressAsyncHandler(async (req, res, next) => {
    console.log(req.body)
    const checkId = req.body.userId

    const sameUser = await User.findOne({
        userId: checkId
    })

    if(sameUser || checkId === ''){
        res.status(409).json({ code: 409, message: '중복된 ID입니다.' });
    }else{
        res.status(200).json({ code: 200, message: '사용가능한 ID입니다.' });
    }
}))

router.post('/login', expressAsyncHandler(async (req, res, next) => {
    console.log(req.body)
    const loginUser = await User.findOne({
        userId: req.body.userId
    })
    if(!loginUser){
        res.status(401).json({code: 401, message: 'Invalid ID or Password'})
    }else{  // 암호화된 비밀번호 로그인하기
        const isMatch = await loginUser.comparePassword(req.body.password)
        
        if(isMatch){
            const { userId, email } = loginUser
            res.json({
                code: 200,
                token: generateToken(loginUser),
                userId, email
            })
        }else{
            res.status(401).json({code: 401, message: 'Invalid ID or Password'})
        }
        
    }
}))

router.get('/logout', (req, res, next) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).send({
          success: true,
          logout: "로그 아웃 완료",
        })
      })
})

// isAuth : 사용자를 수정할 권한이 있는지 검사하는 미들웨어
router.put('/:userId', expressAsyncHandler(async (req, res, next) => {
    const user = await User.findOneAndUpdate(req.params.userId)
    if(!user){
        res.status(404).json({code: 404, message: 'User Not Founded'})
    }else{
        user.userId = req.body.userId || user.userId
        user.email = req.body.email || user.email
        user.password = req.body.password || user.password

        const updatedUser = await user.save()   // DB에 사용자정보 업데이트
        const { email, password } = updatedUser
        res.json({
            code: 200,
            token: generateToken(updatedUser),
            email, password
        })
    }
}))

router.delete('/:userId', isAuth, expressAsyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.userId)
    if(!user) {
        res.status(404).json({code: 404, message: 'User Not Founded'})
    }else{
        res.status(204).json({code: 204, message: 'User deleted successfully !'})
    }
}))

module.exports = router // 외부에서 쓰기 위해