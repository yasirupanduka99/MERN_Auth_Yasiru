import axios from "axios";
import React, { useEffect, useState } from "react";
import { useItemContext } from "../hooks/useItemContext";
import { Link } from "react-router-dom";

// date-fns
import { format } from 'date-fns';

// import css file
import './AllItems.css'

const AllItems = () => {


    // const [ allItems, setAllItems ] = useState([]); //no longer need useState cuz we setup useContext
    const [ error, setError ] = useState(null);

    const { items, dispatch } = useItemContext(); // this 'allItems' came through useItemContext and go to ItemContext.js file initilizer value 'items'

    useEffect(() => {

        const getAllItems = async () => {

            try{

                await axios.get('/api/items')
                .then((res) => {
                    // setAllItems(res.data.AllItems); // no longer need cuz of useContext hook.
                    setError(null)
                    dispatch({type: 'SET_ITEM', payload: res.data.AllItems})
                    console.log(res.data.message);
                    console.log('res.data is : ', res.data);
                    console.log('status : ' + res.data.status);
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
                console.log("☠️ :: getAllItems Function failed! ERROR : " + err.message);
                setError(err.message);
            }

        }

        getAllItems(); // This line calls the getAllItems() function when the component mounts | mounts means when component start

    }, [dispatch]) //The empty dependency array ([]) as the second argument to useEffect indicates that this effect should only run once when the component mounts.


    // implementing function for delete data when button pressed!
    const handleDelete = async (id) => {
        
        try{

            const confirmed = window.confirm('Are you sure you want to delete this item?');
            if (confirmed) {
                await axios.delete(`/api/deleteItem/${id}`)
                .then((res) => {
                    setError(null);
                    alert('✨ Delete Successfully!');
                    dispatch({type: 'DELETE_ITEM', payload: res.data.DelItem});
                    console.log('✅ Deleted item : ', res.data.DelItem);
                })
                .catch((err) => {
                    if(err.response){
                        setError(err.response.data.errorMessage);
                    } else {
                        // If no response received
                        setError("☠️ Error occurred while processing your delete request." + err.message); // Set a generic error message
                    }
                })
            } else {
                console.log('Deletion cancelled.');
            }


        } catch(err) {
            console.log("☠️ :: handleDelete Function failed! ERROR : " + err.message);
        }
    }



  return (
    <div className="allItemscontainer">

        {error && <div className="error"> {error} </div>}
        
        <table className="table align-middle">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    {/* <th scope="col">id</th> */}
                    <th scope="col">Item Name</th>
                    <th scope="col">Item Category</th>
                    <th scope="col">Item Qty</th>
                    <th scope="col">Item Description</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody className="text-start">
                {items && items.map((item, index) => (
                    <tr key={item._id}>
                        <td><p>{index + 1}</p></td>
                        {/* <td><p>{item._id}</p></td> */}
                        <td>
                            <table>
                                <tbody>
                                    <tr><td><h4>{item.itemName}</h4></td></tr>
                                    <tr><td><small>{format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm:ss')}</small></td></tr>
                                </tbody>
                            </table>
                        </td>
                        <td><p>{item.itemCategory}</p></td>
                        <td><p>{item.itemQty}</p></td>
                        <td><p>{item.itemDescription}</p></td>
                        <td>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><Link to={`/updateform/${item._id}`}><button type="button" className="btn btn-warning material-icons">edit</button></Link></td>
                                        <td><button type="button" className="btn btn-danger material-icons" onClick={() => handleDelete(item._id)}>delete</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
  )
};

export default AllItems;
