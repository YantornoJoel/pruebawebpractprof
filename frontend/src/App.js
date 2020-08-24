import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';

  // IMPORTAR COMPONENTES
import CreateUser from './components/CreateUser'
import Nav from './components/Nav'
import Login from './components/Login'
import UserList from './components/UserList'
import Index from './components/Index'
import TypeUser from './components/TypeUser'
import TypeUserC from './components/TypeUserC'
import Product from './components/Product'
import ProductList from './components/ProductList'


function App() {
  return (
    <Router>
      <Nav/>

      <Route path= "/" exact component= {Index} />
      <Route path= "/product" exact component= {Product} />
      <Route path= "/product/:id" exact component= {Product} />
      <Route path= "/productlist" exact component= {ProductList} />
      <Route path= "/typeuser" exact component= {TypeUser} />
      <Route path= "/typeuserc" exact component= {TypeUserC} />
      <Route path= "/createuser" exact component= {CreateUser} />
      <Route path= "/signin" exact component= {Login} />
      <Route path= "/userlist" exact component= {UserList} />
    </Router>
  );
}

export default App;
