import React, { Component, Fragment } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'

import axiosCreate from './axiosCreate'

export default class Perfil extends Component {

    state = {
        _id: "",
        email: "",
        name: "",
        token: false
    }

    async componentDidMount() {

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

                    <div className="card fondo  container mx-auto mt-5">



                        <div className="container m-5">

                            <h4 className="card-title d-flex justify-content-between align-items-center">
                                {this.state.name}
                            </h4>
                            <p>{this.state.email}</p>
                            <p>{this.state._id}</p>

                            <button className="btn btn-danger " onClick={() => this.deleteUser(this.state._id)}>
                                Borrar usuario
                                    </button>
                        </div>





                    </div>


                </Fragment>
            )
        }
    }
}
