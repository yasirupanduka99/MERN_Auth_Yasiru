import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { useAuthContext } from "./hooks/useAuthContext";

// import pages
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

// import components
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
import AllItems from "./components/AllItems";
import NavBar from "./components/NavBar";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />

        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />} // if user logged in show the Home component and if user not logged in then navigate to login page.
            />

            <Route
              exact
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/" />} // if user not logged in then show Signup componnent and if user logged in then navigate to Home component.
            />
            <Route
              exact
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />} // if user not logged in then show Login componnent and if user logged in then navigate to Home component.
            />

            <Route path="/createform" element={<CreateForm />} />
            <Route path="/updateform/:id" element={<UpdateForm />} />
            <Route path="/allitems" element={<AllItems />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
