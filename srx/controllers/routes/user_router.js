const express = require('express')
const router = express.Router()
const passport = require('passport')
const {passportCall, isAuthenticated, uploader} = require('../middlewares/middlewares.js')
const jwt = require('jsonwebtoken')

const PRIVATE_KEY = 'commandDeltaEco'

router.get('/', (req, res) => {
  res.render('home', { user: req.user })
})
router.get('/nav', (req, res) => {
  res.render('nav', { user: req.user })
})
router.get('/login', (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/')
  res.render('login', { message: req.flash('message') })
})
router.get('/signup', (req, res) => {
  if (req.isAuthenticated())return res.redirect('/')
  res.render('register', {message: req.flash('message')})
})
router.get('/profile', (req, res) => {
  res.render('profile', { user: req.user })
})
router.get('/signout', (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) return next(err)
    })
  }
  res.redirect('/')
})
router.post('/login', passport.authenticate('login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}), async (req, res) => {
  let user = req.user
  let token = jwt.sign({ data: user }, PRIVATE_KEY)
  res.cookie("JWT_COOKIE", token, {
    httpOnly: true,
    maxAge:2592000
  })
  return token
})
router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}), async (req, res) => {
  let user = req.user
  let token = jwt.sign({ data: user }, PRIVATE_KEY)
  res.cookie("JWT_COOKIE", token, {
    httpOnly: true,
    maxAge:2592000
  })
  return token
})

module.exports = router
