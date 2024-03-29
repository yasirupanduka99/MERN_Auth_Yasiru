import axios from "axios";
import React, { useEffect, useState } from "react";
import { useItemContext } from "../hooks/useItemContext";

//import css file
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
                    console.log(res.data);
                    console.log('status : ' + res.data.status);
                })
                .catch((err) => {
                    console.log("☠️ :: Error on API URL! ERROR : ", err.message);
                    setError(err.message);
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

            await axios.delete(`/api/deleteItem/${id}`)
            .then((res) => {
                alert('✨ Delete Successfully!');
                dispatch({type: 'DELETE_ITEM', payload: res.data.DelItem});
                console.log('✅ Deleted item : ', res.data.DelItem);
            })
            .catch((err) => {
                console.log("☠️ :: Delete API failed! ERROR : " + err.message);
            })

        } catch(err) {
            console.log("☠️ :: handleDelete Function failed! ERROR : " + err.message);
        }
    }



  return (
    <div className="allItemscontainer">
        
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
                        <td>{index + 1}</td>
                        {/* <td>{item._id}</td> */}
                        <td>{item.itemName}</td>
                        <td>{item.itemCategory}</td>
                        <td>{item.itemQty}</td>
                        <td>{item.itemDescription}</td>
                        <td>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><button type="button" className="btn btn-warning">Edit</button></td>
                                        <td><button type="button" className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        {error && <div className="error"> {error} </div>}

    </div>
  )
};

export default AllItems;
