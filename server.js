const express = require('express');
const dotenv = require('dotenv');
const router = require("./routes/bootcamps");
const logger = require('./middleware/logger')
const morgan = require('morgan');
const connectDB = require('./config/mongoose')
    // load env var
dotenv.config({ path: './config/config.env' });
const app = express();
//body parser
app.use(express.json());

connectDB();
app.use(logger)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use("/bootcamp", router)
const PORT = process.env.PORT || 9999;

const server = app.listen(PORT, console.log("server rinning in  " + process.env.NODE_ENV + " mode on port " + PORT));
//handle unhandled promise rejections
process.on("unhandledRejection", (error, promise) => {
    console.log("error" + error.message);
    //close server and exit
    server.close(() => process.exit(1));
})
