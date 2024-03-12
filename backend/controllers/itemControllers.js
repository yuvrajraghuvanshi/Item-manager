const Item = require("../models/Item");


exports.getItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 

    const skip = (page - 1) * limit;
    const filter={}

    if (req.query.title) {
      filter.title = { $regex: new RegExp(req.query.title, 'i') };
    }
    
    if (req.query.startDate) {
      filter.date = { ...filter.date, $gte: new Date(req.query.startDate) };
    }
    
    if (req.query.endDate) {
      filter.date = { ...filter.date, $lte: new Date(req.query.endDate) };
    }
    const items = await Item.find(filter)
      .skip(skip)
      .limit(limit);

    const totalCount = await Item.countDocuments(filter);

    res.json({
      items,
      totalItems: totalCount
    });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}



exports.postManyItem = async (req, res) => {
  try {
    const { items } = req.body;
    await Item.insertMany(items, { ordered: false }); 
    res.status(201).json({ message: 'All items saved successfully' });
  }
  catch (error) {
    // Check if the error is a duplicate key error (E11000)
    if (error.code === 11000) {
      console.warn('Duplicate key error:', error);
      res.status(400).json({ message: 'Some items were not saved due to duplicate keys' });
    } else {
      console.error('Error saving all items', error);
      res.status(500).json({ message: 'Failed to save all items' });
    }
  }
}

