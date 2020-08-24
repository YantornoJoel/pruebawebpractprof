import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom";
import logo from '../logos/descarga2.jpg'
import '../App.css';

export default class Login extends Component {
    render() {
        return (
            <Fragment>
                <div className="row p-4 login ">
    <div className="col-md-4 mx-auto login ">
        <div className="card mt-4 text-center login-menu  " >
            <div className="card-header">
                <h1>Ingresar</h1>
            </div>
            <img src={logo} className="rounded-circle mx-auto d-block" />
            <div className="card-body">
                <form action="/users/signin" method="POST">
                    <div className="form-group">
                        <input type="email" className="form-control" name="email" placeholder="Email" />
                    </div>
    
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" placeholder="Contraseña" />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Iniciar Sesión</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
            </Fragment>
        )
    }
}
