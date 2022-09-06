const multer = require('multer')
const passport = require("passport")

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated())
    return next()
  res.redirect('/login')
}
const passportCall = (strategy)=>{
    return async (req, res, next)=>{
        passport.authenticate(strategy,function(err,user,info){
            if(err) return next(err);
            if(!user) {return res.redirect('/login')};
            req.user = user;
            next();
        })(req,res,next);
    }
}
const uploader = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './srx/controllers/profile.images')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname)
    }
  })
})
const isAdmin = async (req, res, next) =>{
    if(req.user.role == 'admin'){
        next();
    } else {
        let message = 'Access Dennied'
        res.send(message)
        console.log(message)
    }
}

module.exports = {isAuthenticated, passportCall, uploader, isAdmin}
