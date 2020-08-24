import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'


export default class TypeUser extends Component {
    render() {
        return (
            <Fragment>
                <div className="container p-5">
                    <li className="list-group-item mb-5">Elija el tipo de usuario.</li>

                    <div className="card mb-4" >
                        <div className="card-body">
                            <h3 className="card-title pb-2">Tipo Cliente</h3>
                            <p className="card-text pb-3">Texto de ejemplo en el que se puede poner una descripcion de lo que hace este tipo de usuario .</p>
                            <Link to="/" className="btn btn-success btn-sm card-link">Iniciar Sesión</Link>
                           
                        </div>
                    </div>
                    <div className="card mb-1" >
                        <div className="card-body">
                            <h3 className="card-title pb-2">Tipo Administrador</h3>
                            <p className="card-text pb-3">Texto de ejemplo en el que se puede poner una descripcion de lo que hace este tipo de usuario. </p>
                            <Link to="/login" className="btn btn-success btn-sm card-link ">Iniciar Sesión</Link>
                            
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
