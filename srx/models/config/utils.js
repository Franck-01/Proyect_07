const bcrypt = require('bcryptjs')

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}
const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password)
}
const cookieExtractor = (req, res) => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies['JWT_COOKIE']
  }
  return token
}

module.exports = {createHash, isValidPassword, cookieExtractor}
