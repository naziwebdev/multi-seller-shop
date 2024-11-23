const express = require("express");
const cookiePrser = require("cookie-parser");
const path = require("path");
const { setHeaders } = require("./middlewares/headers");

const authRouter = require("./routes/v1/auth");
const userRouter = require("./routes/v1/user");
const locationRouter = require("./routes/v1/location");
const sellerRouter = require("./routes/v1/seller");
const categoryRouter = require("./routes/v1/category");
const productRouter = require("./routes/v1/product");
const sellerRequestRouter = require("./routes/v1/sellerRequest");
const commentRouter = require("./routes/v1/comment");
const cartRouter = require("./routes/v1/cart");
const checkoutRouter = require("./routes/v1/checkout");
const orderRouter = require("./routes/v1/order");
const apiDocRouter = require("./routes/v1/apiDoc");

const { redirectToProduct } = require("./controllers/v1/shortLink");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

//Body parser
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

//Cookie parser
app.use(cookiePrser());

//Cors
app.use(setHeaders);

//Statics file
app.use(express.static(path.resolve(__dirname, "public")));

//Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/locations", locationRouter);
app.use("/api/v1/seller", sellerRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/seller-requests", sellerRequestRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/checkout", checkoutRouter);
app.use("/api/v1/orders", orderRouter);
app.get("/p/:shortIdentifier", redirectToProduct);
app.use("/apis", apiDocRouter);

//404 not found path
app.use((req, res) => {
  console.log(`404 not found  path ${req.path}`);

  return res.status(404).json({ message: "404 ! not fount the path" });
});

app.use(errorHandler);

module.exports = app;
