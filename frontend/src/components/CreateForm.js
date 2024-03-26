import React, { useState } from "react";
import axios from 'axios';

//importing CSS files
import './CreateForm.css'

const CreateForm = () => {

    const [itemName, setItemName] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [itemQty, setItemQty] = useState('');
    const [itemDescription, setItemDescription] = useState('');

    const sendData = (e) => {
        e.preventDefault();

        try{

            let newItemData = {
                itemName: itemName,
                itemCategory: itemCategory,
                itemQty: itemQty,
                itemDescription: itemDescription,
            }
    
            axios.post('http://localhost:8000/api/create', newItemData)
            .then((res) => {
                alert(res.data.message);
                console.log(res.data.status);
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log("☠️ :: Error on API URL or newItemData object : " + err.message);
            })
    
            //set State back to first state
            setItemName('');
            setItemCategory('');
            setItemQty('');
            setItemDescription('');

        }catch(err){
            console.log("☠️ :: sendData Function failed! ERROR : " + err.message);
        }
    }

  return (

    <div className="createFormContainer">
        
        <div className="formBootstrap">
            <h2 className="mb-4">Add Items Form</h2>

            <form onSubmit={sendData}>
                <div className="form-group mb-3">
                    <label htmlFor="itemNameID">Item Name</label>
                    <input type="text" className="form-control" id="itemNameID" placeholder="Enter Item Name" onChange={(e) => setItemName(e.target.value)} value={itemName}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="itemCategoryID">Item Category</label>
                    <input type="text" className="form-control" id="itemCategoryID" placeholder="Enter Item Category" onChange={(e) => setItemCategory(e.target.value)} value={itemCategory}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="itemQtyID">Item Qty</label>
                    <input type="number" className="form-control" id="itemQtyID" placeholder="Enter Item Qty" onChange={(e) => setItemQty(e.target.value)} value={itemQty}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="itemDescriptionID" className="form-label">Item Description</label>
                    <textarea className="form-control" id="itemDescriptionID" rows="3" onChange={(e) => setItemDescription(e.target.value)} value={itemDescription}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>

    </div>

  )

};

export default CreateForm;
