import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom";

export default class Nav extends Component {
    render() {
        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                
                    <div className="container">
                    <Link className="navbar-brand " to="/">App</Link>
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
                                    <Link className="nav-link" to="/typeuser">Iniciar Sesión</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/typeuserc">Crear Cuenta</Link>
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
    }
}
