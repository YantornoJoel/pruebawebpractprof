import React, { Component, Fragment } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'

import axiosCreate from './axiosCreate'
// import '../App.css'

export default class Perfil extends Component {

    state = {
        _id: "",
        email: "",
        name: "",
        token: false,
        list: false
    }

    async componentDidMount() {
        this.setState({list: true})
        const token = localStorage.getItem('token')
        console.log("El valor del token obtenido es: ", token)

        // await axios.get("http://localhost:3900/user/perfil/2", { headers: { 'token': localStorage.getItem('token') }, mode: 'cors' })
        //     .then((res) => {
        //         console.log("Los datos obtenidos son: ", res.data)
        //         this.setState({
        //             name: res.data.name,
        //             email: res.data.email,
        //             _id: res.data._id,
        //             token: true
        //         })
        //     }).catch((err) => { console.log("El error es :", err) })

        axiosCreate('/perfil/1', { headers: { 'token': localStorage.getItem('token') } })
            .then((res) => {
                this.setState({
                    name: res.data.name,
                    email: res.data.email,
                    _id: res.data._id,
                    token: true
                })
            }).catch((err) => { console.log("El error es :", err) })
    }

    
    componentWillUnmount() {
        this.setState({list: false})
      }



    getUsers = async () => {
        const res = await axios.get("http://localhost:3900/user/allusers/");
        this.setState({ users: res.data.users });
        console.log(res.data.users)
    }

    deleteUser = async (id) => {
        await axios.delete('http://localhost:3900/user/delete/' + id)
        this.getUsers();
        this.props.history.push("/");
    }




    render() {
        if (!this.state.token) {
            return (
                <div className="container p-5">
                    <li className="list-group-item mb-5">No ha iniciado sesión.</li>


                </div>
            )
        } else {
            return (
                <Fragment>

                    <div className="perfil  mt-5 container p-5 ">



                        <div className="  col-md-10 mx-auto perfil">
                            <h1 className=" text-white text-center">Datos personales</h1>
                            <hr className="linea-datos"/>
                            <div className="mt-5 text-white">

                            <h5 className="d-inline-flex mt-1">ID usuario: </h5>
                            <p className="d-inline-flex ml-3">{this.state._id}</p>
                            <hr/>

                            <h5 className="d-inline-flex mt-2">Nombre: </h5>
                               <p className="d-inline-flex ml-3">{this.state.name} </p>
                            
                            <hr/>

                            <h5 className="d-inline-flex mt-2">Email: </h5>
                            <p className="d-inline-flex ml-3">{this.state.email}</p>
                            <hr/>

                            <button className="btn  btn-lg  btn-perfil-delete " onClick={() => this.deleteUser(this.state._id)}>
                                Borrar usuario
                                    </button>
                            </div>

                        

                                
                        </div>





                    </div>


                </Fragment>
            )
        }
    }
}
