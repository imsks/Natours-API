const Tour = require('./../models/tourModel');

// exports.checkID = (req, res, next, val) => {
//   console.log(`The tour id is ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'failed',
//       message: 'Invalid ID'
//     });
//   }
//   next();
// };

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'failed',
      message: 'Missing name or price'
    });
  }
  next();
};

// Get all tours
exports.getAllTours = (req, res) => {
  // console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime
    // results: tours.length,
    // data: {
    //   tours
    // }
  });
};

// Get tour by ID
exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  // const tour = tours[id];

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour
  //   }
  // });
};

// Create a new tour
exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success'
    // data: {
    //   tour: newTour
    // }
  });
};

// Path tour data
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'Done'
  });
};

// Delete tour data
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'Deleted'
  });
};
