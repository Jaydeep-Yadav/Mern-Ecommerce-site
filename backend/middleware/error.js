const ErrorHandler = require("../Utils/errorhandler");

module.exports = (err, req, resp, next) => {
    err.statusCode = err.statusCode ||500;
    err.message = err.message || "Internal Server Error";


    //! Wrong MongoDB ID Error
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    resp.status(err.statusCode).json({
        success : false,
        message : err.message
        //? error : err.stack //To see the full error stack
    })
};
