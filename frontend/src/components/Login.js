import React, { Component, Fragment } from 'react'
// import { Link } from "react-router-dom";
import logo from '../logos/descarga2.jpg'
import '../App.css';
import axios from 'axios'




export default class Login extends Component {
    state = {
        email: "",
        password: "", 
        valortoken: ""

    };

    onSubmit = async (e) => {
        e.preventDefault(); //Evento por defecto que evita que la pagina se recargue
        const loginUser = {
            email: this.state.email,
            password: this.state.password
        };

      

        if (this.state.email  && this.state.password ) {
           const res = await axios.post("http://localhost:3900/user/signin", loginUser);
        
            const entoken= res.data.token
            console.log("Entoken: ", entoken)
           
            const ress= await axios.get("http://localhost:3900/user/perfil/2", {headers: {'token' : entoken}, mode: 'cors'})
            .then( (res) => {
                console.log(res.data)
                this.setState({valortoken: entoken})
                localStorage.setItem('token', entoken)
                console.log("El token es: ", localStorage.getItem('token'))
                
            }).catch((err) => {console.log("El error es :", err)})

        

            this.props.history.push("/perfil");
        } else { 
           alert("Email o contraseña incorrectos")     
           
        }
    };


    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }


    render() {
      

        
        return (
            <Fragment>
                <div className="row p-4 login ">
                    <div className="col-md-4 mx-auto login ">
                        <div className="card mt-4 text-center login-menu  " >
                            <div className="card-header">
                                <h1>Ingresar</h1>
                            </div>
                            <img src={logo} className="rounded-circle mx-auto d-block" alt="Imagen" />
                            <div className="card-body">
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="email" onChange={this.onInputChange} className="form-control" name="email" placeholder="Email" />
                                    </div>

                                    <div className="form-group">
                                        <input type="password" onChange={this.onInputChange} className="form-control" name="password" placeholder="Contraseña" />
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

