import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react';

// import pages
import Home from './pages/Home';

// import components
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import AllItems from './components/AllItems';
import Register from './auth/Register';
import Login from './auth/Login';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
        
      <BrowserRouter>

      <NavBar />

      <div className='pages'>
        <Routes>

          <Route path='/' element={ <Home /> } />

          <Route exact path="/register" element={<Register/>} />
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
