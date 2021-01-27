import Axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export class ScoreTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sres: [], score: "", err: "", uemail: "", tname: this.props.match.params.tname
        }
    }

    componentDidMount() {
        console.log(this.props);
        if (!localStorage.getItem('email')) {
            this.props.history.push("/registerasuser")
        }
        else if (localStorage.getItem('logas') == "user") {
            this.props.history.push("/")

        }
        axios.get(`http://localhost:9000/taskresponses/${this.state.tname}`)
            .then(res => {

                console.log(res);

                if (res.data.err == 0) {
                    this.setState({ sres: res.data.sres })
                }

                else {
                    alert(res.data.mssg)

                }

            })
            .catch(err => {
                console.log(err);
            })
    }

    score = (e, uemail) => {
        this.setState({ err: "" })

        this.setState({ score: e.target.value, uemail: uemail })


    }

    submit = (e, uemail) => {
        this.setState({ err: "" })
        if (uemail != this.state.uemail) {
            this.setState({ err: "Plz enter score" })

        }
        else if (this.state.score < 1 || this.state.score > 10) {
            this.setState({ err: "Enter score in range 1-10" })

        }
        else {


            axios.post(`http://localhost:9000/scoretask`, this.state)
                .then(res => {
                    if (res.data.err == 2) {
                        this.setState({ err: "You have already submitted it" })

                    }
                    else {
                        this.setState({ err: "submitted successfully" })

                    }
                })
                .catch(err => {

                })
        }

    }


    render() {
        return (
            <div>


                <div style={{ fontSize: "large", color: "purple", textAlign: "center", margin: "auto", marginBottom: "20px", width: "70%", marginTop: "80px" }}>Score Task
                   <span style={{ fontSize: "medium", color: "darkblue" }}> ({this.state.tname})</span>

                </div>
                <div>
                    <table style={{ marginLeft: "60px" }}>
                        <tr >
                            <th>S.No.</th>

                            <th style={{ width: "300px" }}>Image</th>

                        </tr>

                        {this.state.sres.map((i, ind) =>
                            <tr style={{marginBottom:"30px"}}>
                                <td>{ind + 1}</td>

                                <td>
                                    <img src={`http://localhost:9000/${i.timg}`} height={200} width={230}>
                                    </img>
                                    {this.state.err != 0 && <div style={{ color: "crimson", fontSize: "small" }}>{this.state.err}</div>}

                                </td>
                                <td style={{ width: "70px" }}><input type="number" min='1' max="10" placeholder="Score" onChange={(e) => this.score(e, i.email)} /></td>
                                <td ><button style={{ color: "white", background: "orange", border: "none", borderRadius: "1.5px", width: "60px", height: "30px" }} onClick={(e) => this.submit(e, i.email)}>Submit</button></td>
                            </tr>

                        )}
                    </table>




                </div>
            </div >
        )
    }
}

export default ScoreTask
