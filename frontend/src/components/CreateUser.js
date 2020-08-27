import React, { Component, Fragment } from 'react'
import axios from "axios";
// import { Link } from "react-router-dom";
import '../App.css';


export default class CreateUser extends Component {

    // Se crea un estado para ir asignandole valores
    state = {
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
        id: "",
        error: "Las contraseñas no coinciden"
    };


    //Evento creado para asignarlo al formulario cuando se envia
    onSubmit = async (e) => {
        e.preventDefault(); //Evento por defecto que evita que la pagina se recargue
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmpassword: this.state.confirmpassword,

        };

        if (this.state.password === this.state.confirmpassword) {
            await axios.post("http://localhost:3900/user/save", newUser);
            console.log(this.state)
            this.props.history.push("/signin");
        } else {
            alert("La contraseña", "titulo")

        }
        console.log(this.state.error)
    };

    //Actualiza el estado con los valores ingresados en el body
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });

    };






    render() {
        return (
            <Fragment>
                
                <div className="row pt-5 login">
                    <div className="col-md-4 mx-auto login">
                        <div className="card mt-4 text-center login-menu">
                            <div className="card-header">
                                <h1>Crear Usuario</h1>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="name" placeholder="Nombre" onChange={this.onInputChange}
                                            value={this.state.name}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control" name="email" placeholder="Email" onChange={this.onInputChange}
                                            value={this.state.email}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="password" placeholder="Contraseña" onChange={this.onInputChange}
                                            value={this.state.password}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="confirmpassword" placeholder="Confirmar contraseña" onChange={this.onInputChange}
                                            value={this.state.confirmpassword}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary btn-block">Crear</button>
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
