const mongoose = require("mongoose");
const Item = require("../models/Item");

// CREATE
exports.createItem = async (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;

    const item = await Item.create({
      name,
      description,
      price,
      category,
      inStock
    });

    res.status(201).json({
      success: true,
      message: "Item created successfully.",
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// READ
exports.getItems = async (req, res, next) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    next(error);
  }
};

// READ ONE
exports.getItemById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID."
      });
    }

    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found."
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE
exports.updateItem = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID."
      });
    }

    const allowedFields = ["name", "description", "price", "category", "inStock"];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const item = await Item.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true
      }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found."
      });
    }

    res.status(200).json({
      success: true,
      message: "Item updated successfully.",
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// DELETE
exports.deleteItem = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID."
      });
    }

    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found."
      });
    }

    res.status(200).json({
      success: true,
      message: "Item deleted successfully.",
      data: item
    });
  } catch (error) {
    next(error);
  }
};