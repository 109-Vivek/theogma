require("dotenv").config();


const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

//Routes
const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");
const superAdminRoute = require("./routes/super-admin");

app.get("/", (req, res) => {
  res.send("Your backend is up and running");
});

app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/super-admin", superAdminRoute);



//Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});

