const express = require("express");
const cookiePrser = require("cookie-parser");
const path = require("path");
const { setHeaders } = require("./middlewares/headers");

const authRouter = require("./routes/v1/auth");
const userRouter = require("./routes/v1/user");

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

//404 not found path
app.use((req, res) => {
  console.log(`404 not found  path ${req.path}`);

  return res.status(404).json({ message: "404 ! not fount the path" });
});

module.exports = app;
