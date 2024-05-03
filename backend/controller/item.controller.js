const mongoose = require("mongoose");
const itemModel = require("../models/item.model");

//Add/Create item router controller
const addItem = async (req, res) => {
  try {
    const { itemName, itemCategory, itemQty, itemDescription } = req.body;
    const user_id = req.user._id; //taking user Id from request which is come to requireAuth.js middleware

    // create array for contain validation errors.
    let emptyfields = [];

    //validations
    if (!itemName) {
      emptyfields.push("Item Name");
    }
    if (!itemCategory) {
      emptyfields.push("Item Category");
    }
    if (!itemQty) {
      emptyfields.push("Item Qty");
    }
    if (!itemDescription) {
      emptyfields.push("Item Description");
    }
    if (emptyfields.length > 0) {
      return res.status(400).send({
        errorMessage: "Please fill in all the fields",
        emptyfields,
      });
    }

    const newItemData = {
      itemName: itemName,
      itemCategory: itemCategory,
      itemQty: itemQty,
      itemDescription: itemDescription,
      user_id: user_id,
    };

    const newItemObj = new itemModel(newItemData);
    await newItemObj.save();

    return res.status(200).send({
      status: true,
      message: "✨ :: Data saved successfuly!",
      CreatedData: newItemObj,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      errorMessage: err.message,
    });
  }
};

//get all item router controller
const getAllItems = async (req, res) => {
  try {
    const user_id = req.user._id; //taking user Id from request which is come to requireAuth.js middleware
    const allItems = await itemModel.find({ user_id }).sort({ createdAt: -1 }); //Only getting current loggedin user data

    return res.status(200).send({
      status: true,
      message: "✨ :: All items are fetched!",
      AllItems: allItems,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      errorMessage: err.message,
    });
  }
};

//get one-specified item router controller
const getOneItem = async (req, res) => {
  try {
    const itemID = req.params.id;

    // checking id is valid id
    if (!mongoose.Types.ObjectId.isValid(itemID)) {
      return res.status(404).json({
        errorMessage: "🤕 No such item in database!",
      });
    }

    const item = await itemModel.findById(itemID);

    return res.status(200).send({
      status: true,
      message: "✨ :: Item Fetched!",
      Item: item,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      errorMessage: err.message,
    });
  }
};

//Update item details router controller
const updateitem = async (req, res) => {
  try {
    const itemID = req.params.id;

    // checking id is valid id
    if (!mongoose.Types.ObjectId.isValid(itemID)) {
      return res.status(404).json({
        errorMessage: "🤕 Can't update Item, No such item in database!",
      });
    }

    const { itemName, itemCategory, itemQty, itemDescription } = req.body;
    const user_id = req.user._id; //taking user Id from request which is come to requireAuth.js middleware

    // create array for contain validation errors.
    let emptyfields = [];

    //validations
    if (!itemName) {
      emptyfields.push("Item Name");
    }
    if (!itemCategory) {
      emptyfields.push("Item Category");
    }
    if (!itemQty) {
      emptyfields.push("Item Qty");
    }
    if (!itemDescription) {
      emptyfields.push("Item Description");
    }
    if (emptyfields.length > 0) {
      return res.status(400).send({
        errorMessage: "Please fill in all the fields",
        emptyfields,
      });
    }

    const itemData = {
      itemName: itemName,
      itemCategory: itemCategory,
      itemQty: itemQty,
      itemDescription: itemDescription,
      user_id: user_id,
    };

    // Check for there is item available or not in the DB
    const data = await itemModel.findById(itemID);
    if (!data) {
      return res.status(404).send({
        errorMessage: "🤕 Item not found!",
      });
    }

    // Checking loggedd user is updating only his data
    const itemUserID = data.user_id;
    if (itemUserID != user_id) {
      return res.status(401).send({
        errorMessage:
          "🔒 :: Unauthorized behaviour! User not belong to edit this data.",
      });
    }

    const updateItemObj = await itemModel.findByIdAndUpdate(itemID, itemData);

    return res.status(200).send({
      status: true,
      message: "✨ :: Item Updated!",
      UpdateItemObj: updateItemObj,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      errorMessage: err.message,
    });
  }
};

//Delete item router controller
const deleteItem = async (req, res) => {
  try {
    const itemID = req.params.id;

    // checking id is valid id
    if (!mongoose.Types.ObjectId.isValid(itemID)) {
      return res.status(404).json({
        errorMessage: "🤕 Can't delete Item, No such item in database!",
      });
    }

    const delItem = await itemModel.findByIdAndDelete(itemID);

    return res.status(200).send({
      status: true,
      message: "✨ :: Item Deleted!",
      DelItem: delItem,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      errorMessage: err.message,
    });
  }
};

module.exports = {
  addItem,
  getAllItems,
  getOneItem,
  updateitem,
  deleteItem,
};
