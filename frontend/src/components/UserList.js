import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../App.css'

export default class UserList extends Component {
    state = {
        users: [],
        usersCliente: [],
        list: false
    }

    componentDidMount() {
        this.setState({ list: true })
        // this.getUsers()
        this.getUsersCliente()

    }

    componentWillUnmount() {
        this.setState({ list: false })
    }



    getUsers = async () => {

        const res = await axios.get("http://localhost:3900/userCliente/allusers/");
        this.setState({ users: res.data.users });
        console.log(res.data.users)

    }

    deleteUser = async (id) => {
        await axios.delete('http://localhost:3900/userCliente/delete/' + id)
        this.getUsers();
    }


    // ---------------------------
    getUsersCliente = async () => {
        if (localStorage.getItem('borrarusuario')) {
            const res = await axios.get("http://localhost:3900/userCliente/allusers/")
            this.setState({ users: res.data.users });
            console.log(res.data.users)
        }

    }


    render() {
        if (localStorage.getItem('borrarusuario')) {
            return (
                <Fragment>

                    {/* <div className="container  "  >
                {this.state.users.map(user => (
                    <div  className="row mt-4 p-5 "key={user._id}>
                        <div className="col-md-3 " >
                            
                            <div className="card" id="tarjeta">
                                <div className="card-body">
                                <button 
                                        className="btn btn-danger"
                                        id="btn-deletee"
                                        onClick= {() => this.deleteUser(user._id) }>
                                          X
                                    </button>
                                    <h4 className="card-title d-flex justify-content-between align-items-center">
                                        {user.name}
                                    </h4>
                                    <p>{user.email}</p>
                                    <Link to="/" className="btn btn-success">Iniciar Sesión</Link>
                                    

                                </div>
                            </div>
                            

                        </div>
                    </div>
                    ))}
                </div> */}
                    <div className=" container  mx-auto mt-5 "  >
                        <h1 className="text-center">Lista de usuarios</h1>
                        <hr className="mb-5" />
                        <div className="row   ">
                            {this.state.users.map(user => (
                                <div className="col-lg-3 mt-5 mb-4 text-center card fondo-listado-cliente mr-lg-5 container " key={user._id}>

                                    <h4 className="mt-3 card-title justify-content-between align-items-center">
                                        {user.name} {user.apellido}
                                    </h4>
                                    <hr  className="mb-3"/>
                                        <p className="">{user.email}</p>
                                    <p className="">{user.telefono}</p>

                                    <button
                                        className=" btn btn-perfil-delete ml-0 mb-3  btn-sm btn-listado-cliente"
                                        onClick={() => this.deleteUser(user._id)}>
                                        Borrar Usuario
                                            </button>
                                          

                                </div>





                            ))}
                        </div>
                    </div>


                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <h1>Tenes que iniciar sesión como administrador para acceder.</h1>
                </Fragment>
            )
        }
    }
}
