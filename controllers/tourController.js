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

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(404).json({
//       status: 'failed',
//       message: 'Missing name or price'
//     });
//   }
//   next();
// };

// Get all tours
exports.getAllTours = async (req, res) => {
  try {
    // console.log(req.query, queryObj);
    // Build the query
    // 1. Filtering
    const queryObj = { ...req.body };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    excludedFields.forEach(el => delete queryObj[el]);

    // 2. Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|ge|lte|lt)\b/g, match => `$${match}`);
    console.log(JSON.parse(queryStr));

    const query = Tour.find(queryObj);

    // Execute the query
    const tours = await query;

    // Send response
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    req.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

// Get tour by ID
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

// Create a new tour
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    req.status(400).json({
      status: 'Fail',
      message: err
    });
  }
};

// Path tour data
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(201).json({
      status: 'success',
      data: {
        tour: tour
      }
    });
  } catch (err) {
    req.status(400).json({
      status: 'Fail',
      message: 'Invalid Data'
    });
  }
};

// Delete tour data
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: 'success',
      data: {
        tour: tour
      }
    });
  } catch (err) {
    req.status(400).json({
      status: 'Fail',
      message: 'Invalid Data'
    });
  }
};
