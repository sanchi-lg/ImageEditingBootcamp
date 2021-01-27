
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export class Tasks extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tasks: []
        }
    }


    componentDidMount() {
        if (!localStorage.getItem('email')) {
            this.props.history.push("/signup")
        }
        else if (localStorage.getItem('logas') == "user") {
            this.props.history.push("/")

        }
        else {
            axios.get(`http://localhost:9000/tasks/${localStorage.getItem('email')}`)
                .then(res => {
                    this.setState({ tasks: res.data })
                })
                .catch(err => { console.log(err); })
        }
    }

    render() {

        return (
            <table >
                <tr>
                    <th>S.No.</th>
                    <th style={{ width: "300px" }}>Task Name/id</th>
                    <th ></th>
                </tr>

                { this.state.tasks.map((i, ind) =>
                    <tr>
                        <td>{ind + 1}</td>

                        <td style={{ color: "rgb(8,8,1)" }}>{i}</td>
                        <td><Link style={{ textDecoration: "none" }} to={`/scoretask/${i}`}>Score Task</Link></td>

                    </tr>
                )}
            </table>
        )
    }
}

export default Tasks

