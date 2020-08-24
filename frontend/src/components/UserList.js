import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../App.css'

export default class UserList extends Component {
    state = {
        users: []
    }

    componentDidMount() {
    
        this.getUsers()
    }
    

    getUsers = async () => {
        const res = await axios.get("http://localhost:3900/user/allusers/");
        this.setState({ users: res.data.users });
        console.log(res.data.users)
    }

    deleteUser = async (id) =>{
        await axios.delete('http://localhost:3900/user/delete/' + id)
        this.getUsers();
    }
    



    render() {
        return (
            <Fragment>
                
                <div className="container  "  >
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
                </div>







            </Fragment>
        )
    }
}
