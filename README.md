# Mern-Ecommerce-Esite

# Install Dependencies

**In root Folder** - `npm i`

**For installing node** - `npm install -g node`

**For installing express** - `npm install -g express`

**For installing heroku** - `npm install -g heroku-cli`

**For installing nodemon** - `npm install -g nodemon`

**For installing mongoose** - `npm install -g mongoose` and `npm link mongoose`

PS : `-g` for global install 

# Running Project

**For localhost deployment** - `npm run dev`



# Developent Timeline

## 1. Verify Connection and API working with Postman by Sending Get request to 
 `http://localhost:4000/api/v1/products`

## 2. Added CRUD for Products in productController
Create Product : Post Request
 `http://localhost:4000/api/v1/product/new`

Get All Products : Get Request
`http://localhost:4000/api/v1/products`

Update Product : Put Request
 `http://localhost:4000/api/v1/product/:id`

Delete Product : Delete Request
`http://localhost:4000/api/v1/product/:id`

Get Product Details : Get Request
`http://localhost:4000/api/v1/product/:id`

## 3. Backend Error Handling

### Error handled: 
`MongoDB id error`, `Uncaught Exception` and `Unhandled Promise Rejection`

## 4. Search, Filter and Pagination

## 5. Backend User and Password Authentication
`bcryptjs`, `jsonwebtoken`, `nodemailer`, `cookie-parser` and `body-parser`  

## 6. Backend User Routes APIs