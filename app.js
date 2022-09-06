const express = require('express')
const passport = require('passport')
const expressSession = require('express-session')
const path = require('path')
const favicon = require('static-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const dotenv = require('dotenv')

const {initPassport} = require('./srx/models/config/passport_config')
const UserRouter = require('./srx/controllers/routes/user_router.js')
const ProductRouter = require('./srx/controllers/routes/product_router')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3090
const server = app.listen(PORT, () => {
  console.log(`Server run on Port ${PORT}`)
})

app.use(favicon())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'srx/views'))
app.set('view engine', 'ejs')

const URL = process.env.URL

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) return ('Unable to Connect')
  console.log('database Connected')
})
app.use(expressSession({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

initPassport()

app.use('/', UserRouter)
app.use('/products', ProductRouter)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}
