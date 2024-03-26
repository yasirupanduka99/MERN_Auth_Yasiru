const express = require("express");
const ItemRouter = express.Router();

const {
    addItem,
    getAllItems,
    getOneItem,
    updateitem,
    deleteItem,
} = require("../controller/item.controller");


ItemRouter.post('/create', addItem);
ItemRouter.get('/items', getAllItems);
ItemRouter.get('/item/:id', getOneItem);
ItemRouter.patch('/itemUpdate/:id', updateitem);
ItemRouter.delete('/deleteItem/:id', deleteItem);



module.exports = ItemRouter;