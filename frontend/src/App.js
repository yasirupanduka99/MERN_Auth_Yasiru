import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react';

// import pages
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

// import components
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import AllItems from './components/AllItems';
import NavBar from './components/NavBar';


function App() {
  return (
    <div className="App">
        
      <BrowserRouter>

      <NavBar />

      <div className='pages'>
        <Routes>

          <Route path='/' element={ <Home /> } />

          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/login" element={<Login/>} />

          <Route path='/createform' element={<CreateForm/>} />
          <Route path='/updateform/:id' element={<UpdateForm/>} />
          <Route path='/allitems' element={<AllItems/>} />

        </Routes>
      </div>
        
      </BrowserRouter>

    </div>
  );
}

export default App;
