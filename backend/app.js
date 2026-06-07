const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require('./routes/dashboard')
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use('/dashboard', userRouter)



app.listen(PORT, () => {
    console.log("Quizora Server Running")
})