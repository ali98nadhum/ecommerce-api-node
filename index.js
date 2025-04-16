const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dataBase = require("./config/dataBase");



// Connect to DB 
dataBase()

// Run express server
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "*"
}))


// Routes
app.use("/api/v1/category" , require("./Routes/categoryRoutes"));
app.use("/api/v1/subcategory" , require("./Routes/subcategoryRoute"));
app.use("/api/v1/products" , require("./Routes/productRoutes"));
app.use("/api/v1/auth" , require("./Routes/authRoutes"));
app.use("/api/v1/user" , require("./Routes/userRoutes"));
app.use("/api/v1/brand" , require("./Routes/brandRoutes"));
app.use("/api/v1/order" , require("./Routes/orderRoutes"));



// Run server
const port = process.env.PORT || 5000;
app.listen(port , () => console.log(`Server is run on port ${port}`)
)