//! Creating token and saving in cookie

const sendToken = (user, statusCode, resp) => {
    const token = user.getJWTToken();

    //! Option for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    }

    resp.status(statusCode).cookie('token', token, options).json({
    success: true,
    user,
    token,
    });
};

module.exports = sendToken;