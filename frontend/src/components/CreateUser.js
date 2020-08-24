import React, { Component, Fragment } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import '../App.css';


export default class CreateUser extends Component {

    state = {
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
        id: ""
    };

  

      onSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          confirmpassword: this.state.confirmpassword,

        };

        if(this.state.password == this.state.confirmpassword){

        
        await axios.post("http://localhost:3900/user/save", newUser);
        console.log(this.state)
        this.props.history.push("/");
    }else{
        alert("Las contraseñas no coinciden")
        console.log("Las contraseñas no coinciden?")
    }
      };


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
                  required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="password" placeholder="Contraseña" onChange={this.onInputChange}
                  value={this.state.password}
                  required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="confirmpassword" placeholder="Confirmar contraseña" onChange={this.onInputChange}
                  value={this.state.confirmpassword}
                  required/>
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
