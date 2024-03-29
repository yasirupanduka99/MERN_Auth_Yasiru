import React from "react";
import { Link } from "react-router-dom";

import './Home.css';

import AllItems from "../components/AllItems";
import CreateForm from "../components/CreateForm";

const Home = () => {

    const handleLogout = async () => {
        
    }

    return (
        <div className="homeContainer">
            <div className="addItemBtnDiv">
                <div className="buttonsDiv">
                    <Link to='/createform'><button type="button" className="btn btn-success addItemBtn">Add Item</button></Link>
                    <button onClick={handleLogout} type="button" className="btn btn-danger addItemBtn">Logout</button>
                </div> 
            </div>
            <div className="home">
                <div className="homeAllItems">
                    <AllItems />
                </div>
                <div className="homeCreateForm">
                    <CreateForm />
                </div>
            </div>
            
        </div>
    )
};

export default Home;
