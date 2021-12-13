const Product = require("../models/productModel");
const ErrorHandler = require("../Utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../Utils/apifeatures");

//? Create Product --> For Admin
exports.createProduct = catchAsyncErrors(async (req, resp, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  resp.status(201).json({
    success: true,
    product,
  });
});

//? Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, resp) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeature.query;

  resp.status(200).json({
    success: true,
    products,
    productCount
  });
});

//? Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, resp, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  resp.status(200).json({
    success: true,
    product,
    // productCount,
  });
});

//? Update Product --> For Admin
exports.updateProduct = catchAsyncErrors(async (req, resp, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  resp.status(200).json({
    success: true,
    product,
  });
});

//? Delete Product --> For Admin
exports.deleteProduct = catchAsyncErrors(async (req, resp, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return resp.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  await product.remove();

  resp.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
