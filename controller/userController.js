const HttpError = require("../models/http-error");
const uuid = require('uuid/v4')

const {validatonResult} = require("express-validator")

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Kehinde Joseph",
    email: "test@test.com",
    password: "testers",
  },
];
exports.getUsers = (req, res, next) => {
    res,json(users: DUMMY_USERS)
};

exports.signup = (req, res, next) => {
     if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }

    const { name, email, password} = req.body

    const hasUser = DUMMY_USERS.find(u=> u.email === email)
    if(hasUser) {
         throw new HttpError ('could not identify user, credentials seems to be wrong', 422)
    }

    const createdUser = {
        id: uuid(),
        name,
        email, 
        password
    }

    DUMMY_USERS.push(createdUser)

    res.status(201).json({ user: createdUser})

};

exports.login = (req, res, next) => {
    const {email, password} = req.body

    const identifiedUser = DUMMY_USERS.find(u=> u.email === email)
    if(!identifiedUser || identifiedUser.password !== password){
        throw new HttpError ('could not identify user, credentials seems to be wrong', 401)
    }
    res.json({ message: 'Logged In'})
};


