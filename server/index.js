// Create server
const express = require("express");
const app = express();
const _PORT = process.env.PORT;
const cors = require("cors");
const authRouter = require('./routes/authRouter');
const birthRouter = require('./routes/birthRouter');
const cowsRouter = require('./routes/cowsRouter');
const milkRouter = require('./routes/milkRouter');
const exalinationRouter = require('./routes/examinationRouter');


// MIDDELWARES 
app.use(cors())
app.use(express.json())

// Route
app.use('/api/auth', authRouter);
app.use('/api/cows', cowsRouter);
app.use('/api/examinations', exalinationRouter);
app.use('/api/milk', milkRouter);
app.use('/api/births', birthRouter);


app.listen(_PORT, ()=> {
    console.log(`App runing on ${_PORT}`)
})