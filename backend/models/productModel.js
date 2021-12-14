const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxlength: [7, "Price must be less than 8 digits"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: [true, "Please enter product type"],
      },
      url: {
        type: String,
        required: [true, "Please enter product image url"],
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter product category"],
    // enum: ["Shirts","Pants","Shoes","Accessories"]
  },
  Stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxlength: [4, "Stock must be less than 4 digits"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: [true, "Please enter your name"],
      },
      rating: {
        type: Number,
        required: [true, "Please enter your rating"],
      },
      comment: {
        type: String,
        required: [true, "Please enter your comment"],
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
