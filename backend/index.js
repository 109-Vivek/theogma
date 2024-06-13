require("dotenv").config();


const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

//Routes
const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");
const superAdminRoute = require("./routes/super-admin");

app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/super-admin", superAdminRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});
