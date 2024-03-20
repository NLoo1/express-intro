const express = require('express')
const ExpressError = require('./expressError')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes will be defined with parameter nums

app.get('/mean', (req, res, next) => {
    try{
        if (!req.query.nums) throw new ExpressError('nums cannot be empty', 400)
        const nums = req.query.nums.split(',').map(Number);
        if(!Array.isArray(nums)) throw new ExpressError('Invalid nums', 400)
        else {
            let sum = 0;
            for (let i = 0; i < nums.length; i++) {
                sum += nums[i];
            }
            const mean = sum / nums.length;
    
            return res.json({
                operation: "mean",
                value: mean
        });
        }
        }
    catch(e){
        next(e)
    }
});

app.get('/median', (req, res, next) => {
    try{
        if (!req.query.nums) throw new ExpressError('nums cannot be empty', 400)
        const nums = req.query.nums.split(',').map(Number);
        if(!Array.isArray(nums)) throw new ExpressError('Invalid nums', 400)
        else {
            nums.sort()
            let median = nums[Math.floor(nums.length/2)]
            if(nums.length % 2 == 0) median = (nums[Math.floor(nums.length/2)-1] + nums[Math.floor(nums.length/2)])/2
            return res.json({
                operation: "median",
                value: median
        });
        }
        }
    catch(e){
        next(e)
    }
});

app.get('/mode', (req, res, next) => {
    try{
        if (!req.query.nums) throw new ExpressError('nums cannot be empty', 400)
        const nums = req.query.nums.split(',').map(Number);
        if(!Array.isArray(nums)) throw new ExpressError('Invalid nums', 400)
        else {
            //TODO
            let dictNums = {}
            for(let i = 0; i <nums.length; i++){
                if(dictNums[nums[i]]){
                    dictNums[nums[i]] +=1
                }
                else{
                    dictNums[nums[i]] = 1
                }
            }

            let mode = 0;

            for(let i = 0; i < nums.length; i++){
                if(dictNums[i] > mode) mode = i
            }
            return res.json({
                operation: "mode",
                value: mode
        });
        }
        }
    catch(e){
        next(e)
    }
});


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
  