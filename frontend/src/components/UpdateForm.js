import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useItemContext } from "../hooks/useItemContext";
import { useParams, useNavigate } from "react-router-dom";

//importing CSS files
import './CreateForm.css'

const UpdateForm = () => {

    const { dispatch } = useItemContext();

    const [itemName, setItemName] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [itemQty, setItemQty] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [error, setError] = useState(null);
    const [emptyfields, setEmptyFields] = useState([])

    const { id } = useParams(); //catch id from URL
    const navigate = useNavigate();

    useEffect(() => {

        const getOneItem = async () => {
            try{

                await axios.get(`/api/item/${id}`)
                .then((res) => {
                    setError(null);
                    setItemName(res.data.Item.itemName);
                    setItemCategory(res.data.Item.itemCategory);
                    setItemQty(res.data.Item.itemQty);
                    setItemDescription(res.data.Item.itemDescription);
                    console.log("✨ Project fetched successfuly!");
                })
                .catch((err) => {
                    if(err.response){
                        setError(err.response.data.errorMessage);
                    } else {
                        // If no response received
                        setError("☠️ Error occurred while processing your get request." + err.message); // Set a generic error message
                    }
                })

            }catch(err){
                console.log("☠️ :: getOneItem Function failed! ERROR : " + err.message);
                setError(err.message);
            }
        }

        getOneItem();

    }, [id])

    const updatedata = async (e) => {
        e.preventDefault();

        try{

            let itemData = {
                itemName: itemName,
                itemCategory: itemCategory,
                itemQty: itemQty,
                itemDescription: itemDescription,
            }

            if (window.confirm('Are you sure you want to update this project?')) (
                
                await axios.patch(`/api/itemUpdate/${id}`, itemData)
                .then((res) => {
                    setError(null);
                    setEmptyFields([]);
                    alert(res.data.message);
                    console.log(res.data.message);
                    navigate('/'); // redirect to home page
                })
                .catch((err) => {
                    if(err.response){
                        setError(err.response.data.errorMessage);
                        setEmptyFields(err.response.data.emptyfields); // Set validation input fields name
                    } else {
                        // If no response received
                        setError("☠️ Error occurred while processing your patch request." + err.message); // Set a generic error message
                    }
                })
            )

        }catch(err){
            console.log("☠️ :: updatedata Function failed! ERROR : " + err.message);
            setError(err.message);
        }
    }

  return (

    <div className="createFormContainer">
        
        <div className="formBootstrap">
            <h2 className="mb-4">Update Form</h2>

            <form onSubmit={updatedata}>
                <div className="form-group mb-3">
                    <label htmlFor="itemNameID">Item Name</label>
                    <input type="text" className={emptyfields.includes('Item Name') ? 'error form-control' : 'form-control'} id="itemNameID" placeholder="Enter Item Name" onChange={(e) => setItemName(e.target.value)} value={itemName}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="itemCategoryID">Item Category</label>
                    <input type="text" className={emptyfields.includes('Item Category') ? 'error form-control' : 'form-control'} id="itemCategoryID" placeholder="Enter Item Category" onChange={(e) => setItemCategory(e.target.value)} value={itemCategory}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="itemQtyID">Item Qty</label>
                    <input type="number" className={emptyfields.includes('Item Qty') ? 'error form-control' : 'form-control'} id="itemQtyID" placeholder="Enter Item Qty" onChange={(e) => setItemQty(e.target.value)} value={itemQty}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="itemDescriptionID" className="form-label">Item Description</label>
                    <textarea className={emptyfields.includes('Item Description') ? 'error form-control' : 'form-control'} id="itemDescriptionID" rows="3" onChange={(e) => setItemDescription(e.target.value)} value={itemDescription}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                {error && <div className="error"> {error} </div>}
            </form>

        </div>

    </div>

  )

};

export default UpdateForm;