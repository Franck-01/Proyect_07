var LocalStrategy = require('passport-local').Strategy
const PassportJWT= require('passport-jwt').Strategy;
const ExtractJwt= require('passport-jwt').ExtractJwt
var User = require('../daos/Schemas/UserSchema')
const {createHash, isValidPassword, cookieExtractor} = require("./utils.js")
const passport = require("passport")
const dotenv = require('dotenv')

dotenv.config()

const initPassport = () => {
    
    passport.serializeUser((user, done) => {
        console.log('serializing user: ');console.log(user)
        done(null, user._id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
        console.log('deserializing user:', user)
        done(err, user)
        })
    })
    passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    }, async (req, username, password, done) => {
        findOrCreateUser = () => {
            User.findOne({ 'username': username }, (err, user) => {
            if (err) {
                console.log('Error in SignUp: ' + err)
                return done(err)
            }
            if (user) {
                console.log('User already exists with username: ' + username)
                return done(null, false, req.flash('message', 'User Already Exists'))
            } else {
                const newUser = new User()

                newUser.username = username
                newUser.password = createHash(password)
                newUser.mail = req.param('mail')
                newUser.name = req.param('name')
                newUser.age = req.param('age')
                newUser.phone = req.param("phone")
                newUser.role = req.param("role")
                newUser.lastLogin = req.param.apply("lastLogin")

                newUser.save((err, user) => {
                    if (err) {
                        console.log('Error in Saving user: ' + err)
                        throw err
                    }
                    console.log('User Registration succesful')
                    return done(null, newUser)
                })}
            })
        }
        process.nextTick(findOrCreateUser)
    }))
    passport.use('login', new LocalStrategy({
        passReqToCallback : true
    }, async (req, username, password, done) => { 
        User.findOne({ username :  username }, (err, user) => {
            if (err)
                return done(err)
            if (!user){
                console.log('User Not Found with username '+username);
                return done(null, false, req.flash('message', 'User Not found.'));                 
            }
            if (!isValidPassword(user, password)){
                console.log('Invalid Password')
                return done(null, false, req.flash('message', 'Invalid Password'))
            }
            return done(null, user)
        })
    }))
    passport.use('jwt', new PassportJWT({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), secretOrKey: 'cualquiercosa'
    }, async (jwt_payload, done) => {
        User.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                console.log("Error Token" + err)
                return done(err)
            }
            if (!user) {
                return done(null, false, { messages: "User not found" })
            }
            return done(null,user)
        })
    }))
}

module.exports = {initPassport}