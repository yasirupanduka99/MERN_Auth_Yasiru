import React, { useState } from "react";
import axios from "axios";
import { useItemContext } from "../hooks/useItemContext";
import { useAuthContext } from "../hooks/useAuthContext";

//importing CSS files
import "./CreateForm.css";

const CreateForm = () => {
  const { dispatch } = useItemContext();
  const { user } = useAuthContext();

  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemQty, setItemQty] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [error, setError] = useState(null);
  const [emptyfields, setEmptyFields] = useState([]);

  const sendData = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("🔒 :: You must be logged in ☝🏽");
      return;
    }

    try {
      let newItemData = {
        itemName: itemName,
        itemCategory: itemCategory,
        itemQty: itemQty,
        itemDescription: itemDescription,
      };

      await axios
        .post("/api/create", newItemData, {
          headers: {
            Authorization: `Bearer ${user.token}`, //we send logged user token through the request header as Authorization
          },
        })
        .then((res) => {
          setError(null);
          setEmptyFields([]);
          alert(res.data.message);
          dispatch({ type: "CREATE_ITEM", payload: res.data.CreatedData });
          console.log(res.data.status);
          console.log(res.data.message);
        })
        .catch((err) => {
          // Handling error response from backend
          if (err.response) {
            // If response has error messages
            setError(err.response.data.errorMessage); // Set error message from response, validation errors also asign to this
            setEmptyFields(err.response.data.emptyfields); // Set validation input fields name
          } else {
            // If no response received
            setError(
              "☠️ Error occurred while processing your request." + err.message
            ); // Set a generic error message
          }
        });

      //set State back to first state
      setItemName("");
      setItemCategory("");
      setItemQty("");
      setItemDescription("");
    } catch (err) {
      console.log("☠️ :: sendData Function failed! ERROR : " + err.message);
      setError(err.message);
    }
  };

  return (
    <div className="createFormContainer">
      <div className="formBootstrap">
        <h2 className="mb-4">Add Items Form</h2>

        <form onSubmit={sendData}>
          <div className="form-group mb-3">
            <label htmlFor="itemNameID">Item Name</label>
            <input
              type="text"
              className={
                emptyfields.includes("Item Name")
                  ? "error form-control"
                  : "form-control"
              }
              id="itemNameID"
              placeholder="Enter Item Name"
              onChange={(e) => setItemName(e.target.value)}
              value={itemName}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="itemCategoryID">Item Category</label>
            <input
              type="text"
              className={
                emptyfields.includes("Item Category")
                  ? "error form-control"
                  : "form-control"
              }
              id="itemCategoryID"
              placeholder="Enter Item Category"
              onChange={(e) => setItemCategory(e.target.value)}
              value={itemCategory}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="itemQtyID">Item Qty</label>
            <input
              type="number"
              className={
                emptyfields.includes("Item Qty")
                  ? "error form-control"
                  : "form-control"
              }
              id="itemQtyID"
              placeholder="Enter Item Qty"
              onChange={(e) => setItemQty(e.target.value)}
              value={itemQty}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="itemDescriptionID" className="form-label">
              Item Description
            </label>
            <textarea
              className={
                emptyfields.includes("Item Description")
                  ? "error form-control"
                  : "form-control"
              }
              id="itemDescriptionID"
              rows="3"
              onChange={(e) => setItemDescription(e.target.value)}
              value={itemDescription}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          {error && <div className="error"> {error} </div>}
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
