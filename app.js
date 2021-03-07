const express = require('express');
const app = express();

const { calculateMode, calculateMedian, calculateMean, convertAndValidate } = require('./utils')

/* --------------------------------- Routes --------------------------------- */
app.get('/mean', (req, res, next) => {
  let arr = req.query.nums;

  if (!arr) {
    throw new ErrorHandler('Bad request. Please enter an array of numbers separated by commas.', 400)
  }

  let splitArr = req.query.nums.split(',');
  let nums = convertAndValidate(splitArr);

  if (nums instanceof Error) {
    throw new ErrorHandler(nums.msg);
  }

  let result = {
    operation: 'mean',
    result: calculateMean(nums)
  }

  return res.send(result);
})

app.get('/median', (req, res, next) => {
  let arr = req.query.nums;

  if (!arr) {
    throw new ErrorHandler('Bad request. Please enter an array of numbers separated by commas.', 400)
  }

  let numsAsStrings = req.query.nums.split(',');
  let nums = convertAndValidate(numsAsStrings);

  if (nums instanceof Error) {
    throw new ErrorHandler(nums.message);
  }

  let result = {
    operation: 'median',
    result: calculateMedian(nums)
  }

  return res.send(result);
})

app.get('/mode', (req, res, next) => {
  let arr = req.query.nums;

  if (!arr) {
    throw new ErrorHandler('Bad request. Please enter an array of numbers separated by commas.', 400)
  }

  let numsAsStrings = req.query.nums.split(',');
  let nums = convertAndValidate(numsAsStrings);

  if (nums instanceof Error) {
    throw new ErrorHandler(nums.message);
  }

  let result = {
    operation: 'mode',
    result: calculateMode(nums)
  }

  return res.send(result);
})

app.use((req, res, next) => {
  const err = new ErrorHandler('Not found', 404);

  return next(err);
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.msg
  })
})

/* ----------------------------- Error Handling ----------------------------- */
class ErrorHandler extends Error {
  constructor(msg, sts) {
    super();
    this.msg = msg;
    this.sts = sts;
    console.error(this.stack)
  }
}

/* -------------------------------- Listener -------------------------------- */
app.listen(3000, () => {
  console.log("Server running on port 3000")
});
