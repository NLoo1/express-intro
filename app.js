const express = require('express')
const ExpressError = require('./expressError')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes will be defined with parameter nums

app.get('/mean/int:nums', (req, res, next) => {
    const nums = {...req.params.nums}
    let sum;
    for(let i = 0; i < nums.length; i++){
        sum+= nums[i]
    }
    return res.json({
        operation: "mean",
        value: `${sum/nums.length}`
    })
})

app.use((req,res,next) => {
    const e = new ExpressError("Page not found", 404)
    next(e)
})

app.use((err, req, res, next) => {
    let status = err.status || 500
    let message = err.msg 
    return res.status(status).json({
        error: {message, status}
    })
})


app.listen(3000, () => {
    console.log("Server running on port 3000")
  });
  