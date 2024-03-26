const itemModel = require("../models/item.model");

//Add/Create item router controller
const addItem = async (req, res) => {
    try{

        const { itemName, itemCategory, itemQty, itemDescription } = req.body;

        const newItemData = {
            itemName: itemName,
            itemCategory: itemCategory,
            itemQty: itemQty,
            itemDescription: itemDescription,
        }

        const newItemObj = new itemModel(newItemData);
        await newItemObj.save();

        return res.status(200).send({
            status: true,
            message: "✨ :: Data saved successfuly!"
        })

    }catch(err){
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}


//get all item router controller
const getAllItems = async (req, res) => {

    try{

        const allItems = await itemModel.find();

        return res.status(200).send({
            status: true,
            message: "✨ :: All items are fetched!",
            AllItems: allItems,
        })

    }catch(err){
        return res.status(500).send({
            status: false,
            message: err.message,
        })
    }

}


//get one-specified item router controller
const getOneItem = async (req, res) => {

    try{

        const itemID = req.params.id;
        const item = await itemModel.findById(itemID);

        return res.status(200).send({
            status: true,
            message: "✨ :: Item Fetched!",
            Item: item,
        })

    }catch(err){
        return res.status(500).send({
            status: false,
            message: err.message,
        })  
    }

}


//Update item details router controller
const updateitem = async (req, res) => {

    try{

        const itemID = req.params.id;
        const { itemName, itemCategory, itemQty, itemDescription } = req.body;

        const itemData = {
            itemName: itemName,
            itemCategory: itemCategory,
            itemQty: itemQty,
            itemDescription: itemDescription,
        }

        // Check for there is item available or not in the DB
        const data = await itemModel.findById(itemID);
        if (!data) {
            return res.status(404).send({ 
                DataNotFoundMessage: '⚠️ :: Data not found!',
            });
        }

        const updateItemObj = await itemModel.findByIdAndUpdate(itemID, itemData);

        return res.status(200).send({
            status: true,
            message: "✨ :: Item Updated!",
            UpdateItemObj: updateItemObj,
        })

    }catch(err){
        return res.status(500).send({
            status: false,
            message: err.message,
        })  
    }

}


//Delete item router controller
const deleteItem = async (req, res) => {

    try{

        const itemID = req.params.id;
        const delItem = await itemModel.findByIdAndDelete(itemID);

        return res.status(200).send({
            status: true,
            message: "✨ :: Item Deleted!",
        })

    }catch(err){
        return res.status(500).send({
            status: false,
            message: err.message,
        })  
    }

}


module.exports = {
    addItem,
    getAllItems,
    getOneItem,
    updateitem,
    deleteItem,
}