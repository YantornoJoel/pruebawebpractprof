import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'

export default class Nav extends Component {

    state = {
        email: "",
        token: false
    }


    async componentDidMount() {

        
  
        const token = localStorage.getItem('token')
        console.log("El valor del token obtenido es: ", token)

        await axios.get("http://localhost:3900/user/perfil/2", { headers: { 'token': token }, mode: 'cors' })
            .then((res) => {
                console.log("Res es: ", res.data)
                this.setState({
                    email: res.data.email,
                    token: true
                })
            }).catch((err) => { console.log("El error es :", err) })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        localStorage.removeItem('token')
        console.log("El localstorage: ", localStorage.getItem('token'))
        
    }


    render() {
        if(!this.state.token){
        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                
                    <div className="container">
                    <Link className="navbar-brand " to="/perfil">App</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Inicio <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/userlist">Acerca de</Link>
                                </li>

                            </ul>
                            <ul className="navbar-nav ml-auto">
                                
                                <li className="nav-item ">
                                    <Link className="nav-link" to="/signin">Iniciar Sesión</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/createuser">Crear Cuenta</Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link className="nav-link" to="/product">Añadir Producto</Link>
                                </li> */}
                               


            </ul>
                        </div>
                    </div>
                </nav>

            </Fragment>
        )
    }else{
        return(
            <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            
                <div className="container">
                <Link className="navbar-brand " to="/perfil">App</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Inicio <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/userlist">Acerca de</Link>
                            </li>

                        </ul>
                        <ul className="navbar-nav ml-auto">
                            
                            <li className="nav-item">
                                <Link className="nav-link" to="/createuser">{this.state.email}</Link>
                            </li>
                             <li className="nav-item">
                             <form onSubmit={this.onSubmit}>
                                <button type="submit" className="btn btn-dark nav-link"  >Cerrar Sesión</button>
                                </form>
                            </li> 
                           


        </ul>
                    </div>
                </div>
            </nav>

        </Fragment>
    )
    }
    }
}
