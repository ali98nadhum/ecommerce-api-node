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
app.use("api/v1/category" , require("./Routes/categoryRoutes"));



// Run server
const port = process.env.PORT || 8000;
app.listen(port , () => console.log(`Server is run on port ${port}`)
)