const express = require("express");
const ItemRoutes = express.Router();

const {
    addItem,
    getAllItems,
    getOneItem,
    updateitem,
    deleteItem,
} = require("../controller/item.controller");


ItemRoutes.post('/create', addItem);
ItemRoutes.get('/items', getAllItems);
ItemRoutes.get('/item/:id', getOneItem);
ItemRoutes.patch('/itemUpdate/:id', updateitem);
ItemRoutes.delete('/deleteItem/:id', deleteItem);



module.exports = ItemRoutes;