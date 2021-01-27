import React, { Component } from 'react'
import axios from 'axios'


export class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: "", password: "", logas: "user"
        }
    }

    submit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:9000/login", this.state)

            .then(res => {
                console.log(res.data);
                if (res.data.err == 0) {
                    localStorage.setItem('name', res.data.uid.name)
                    localStorage.setItem("email", res.data.uid.email)
                    localStorage.setItem("logas", res.data.uid.logas)

                    this.props.history.replace("/")

                }
                else {
                    alert(res.data.mssg)

                }
            })
            .catch(err => {
                console.log(err);
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
                        <legend style={{ marginTop: "10px", marginBottom: "17px", color: "blue", fontSize: "large" }}>Login</legend>
                        <div>
                            <label>Login as</label>
                            <select name="logas" onChange={this.handle} required>
                                <option value="user">User</option>
                                <option value="instructor">Instructor</option>
                            </select>
                        </div>

                        <div>
                            <label>Email</label>
                            <input type="email" name="email" onChange={this.handle} required />
                        </div>

                        <div>
                            <label>Password</label>
                            <input type="password" name="password" onChange={this.handle} required />
                        </div>

                        <button>Submit</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default Login
