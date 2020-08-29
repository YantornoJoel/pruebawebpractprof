import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';


import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import $ from 'jquery';
	import Popper from 'popper.js';
	import 'bootstrap/dist/js/bootstrap.bundle.min';

import './App.css';

  // IMPORTAR COMPONENTES
import CreateUser from './components/CreateUser'
import Nav from './components/Nav'
import NavUser from './components/NavUser'
import Login from './components/Login'
import UserList from './components/UserList'
import Index from './components/Index'
import TypeUserC from './components/TypeUserC'
import Product from './components/Product'
import ProductList from './components/ProductList'
import Perfil from './components/Perfil'




function App() {
  return (
    <Fragment>
       
       
    <Router>
      
      {/* {localStorage.getItem('token')} */}

      
      
      
       <Route 
       
        render={props => (
          !localStorage.getItem('token') ?
          <Route path= "/" component= {Nav}/> :
            <Route path="/" component= {NavUser} />
        )} 
      /> 
      
      
      <Route path= "/" exact component= {Index} />
      <Route path= "/product" exact component= {Product} />
      <Route path= "/product/:id" exact component= {Product} />
      <Route path= "/productlist" exact component= {ProductList} />
      <Route path= "/typeuserc" exact component= {TypeUserC} />
      <Route path= "/createuser" exact component= {CreateUser} />
      <Route path= "/signin" exact component= {Login} />
      <Route path= "/userlist" exact component= {UserList} />
      <Route path= "/perfil" exact component= {Perfil} />
    </Router>
    
    </Fragment>
   
    
  );
  
}


export default App;
