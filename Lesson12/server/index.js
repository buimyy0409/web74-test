const express = require('express')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT;
const cors = require('cors')
const router = require('./routes/index')
const {connectDB} = require('./configs/db.cfg')


app.use(express.static("public"));

app.use(express.json());

app.use("/", router);
// app.use("/api/auth", authRoutes);
// app.use("/user", userRoutes);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send(err.message || "Something broke!");
});

connectDB()
  .then((res) => {
    console.log(res);
    app.listen(PORT, () => {
      console.log(`Server running up in port :${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });