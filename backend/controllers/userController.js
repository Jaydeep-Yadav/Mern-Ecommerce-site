const ErrorHandler = require("../Utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../Utils/jwtToken");
const sendEmail = require("../Utils/sendEmail");
const crypto = require("crypto");

//! Register User
exports.registerUser = catchAsyncErrors(async (req, resp, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id url",
      url: "profilepic",
    },
  });

  sendToken(user, 200, resp);
});


//! Login User
exports.loginUser = catchAsyncErrors(async (req, resp, next) => {
    const { email, password } = req.body;
    
    //? Checking if email and password are entered
    if(!email || !password) {
        return next(new ErrorHandler("Please enter email and password",400));
    }

    //? Checking if email and password are correct
    const user = await User.findOne({ email }).select("+password");
    
    if (!user) {
        return next(new ErrorHandler("Invalid Credentials", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Credentials", 401));
    }

    sendToken(user, 200, resp);
});


//! Logout User
exports.logout = catchAsyncErrors(async (req, resp, next) => {
    resp.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
 
    resp.status(200).json({
        success: true,
        message: "You are logged out"
    })
})

//! Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, resp, next)=>{
    const user = await User.findOne({ email:req.body.email });
    if(!user){
        return next(new ErrorHandler("User not found",404));
    }

    //? Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });


    //? Send Email
    // const resetPasswordURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;
    const resetPasswordURL = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is : \n\n ${resetPasswordURL} \n\n If you have not requested this email, then please ignore it`;

    try {

        await sendEmail({
            email: user.email,
            subject : `Esite Password Recovery`,
            message
        });

        resp.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        });

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }

});

//! Reset Password
exports.resetPassword = catchAsyncErrors(async (req, resp, next) => {
    // creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
  
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
  
    if (!user) {
      return next(
        new ErrorHandler(
          "Reset Password Token is invalid or has been expired",
          400
        )
      );
    }
  
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not password", 400));
    }
  
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();
  
    sendToken(user, 200, resp);
  });