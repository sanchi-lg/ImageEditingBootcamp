import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export class Registerasinstructor extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: "", password: "", name: ""
        }
    }

    submit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:9000/registerasinstructor", this.state)

            .then(res => {
                if (res.data.err == 0) {
                    alert("You are registered successfully")
                    this.props.history.replace("/login")

                }
                else {
                    alert(res.data.mssg)

                }
            })
            .catch(err => {
            })
    }

    handle = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })

    }

    componentDidMount() {
        if (localStorage.getItem('email')) {
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div style={{ width: "70%", margin: "auto", marginTop: "80px" }}>
                <form className="new" onSubmit={this.submit}>
                    <fieldset style={{ padding: "5px", borderWidth: "0.1px", borderRadius: "3px" }}>
                        <legend style={{ marginTop: "10px", marginBottom: "17px", color: "blue", fontSize: "large" }}>New Instructor:Register</legend>
                        <div>
                            <label>Email</label>
                            <input type="email" name="email" onChange={this.handle} required />
                        </div>
                        <div>
                            <label>Name</label>
                            <input type="text" name="name" onChange={this.handle} required />
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" name="password" onChange={this.handle} required />
                        </div>

                        <div style={{ fontSize: "10px", marginLeft: "106px" }}>
                            Already have an account?<Link style={{ textDecoration: "none" }} to="/login"> Login here</Link>
                        </div>


                        <button>Submit</button>
                    </fieldset>
                </form>

            </div>
        )
    }
}

export default Registerasinstructor
