const express = require("express");
const bodyparser = require("body-parser");

const placesRoutes = require("./routes/placesRoute")
const usersRoute = require('./routes/usersRoute')

const HttpError = require('./models/http-error')

const app = express();

app.use(bodyparser.json())


app.use("/api/places", placesRoute)
app.use("/api/users", usersRoute)
app.use(req, res, next) =>{
    const error = new HttpError HttpError('could not find this route', 404)
    throw error
}

app.use ((error, req, res, next) => {
    if(res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500).json({
        msg: error.message || 'An unknown error occured'
    })

})

app.listen(5000);
