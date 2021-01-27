import React, { Component } from 'react'
import axios from 'axios'


export class Homeforuser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tasks: [], timg: "", err: "", tname: ""
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('email')) {
            this.props.history.push("/registerasuser")
        }
        axios.get(`http://localhost:9000/taskforuser/${localStorage.getItem('email')}`)
            .then(res => {


                if (res.data.err == 0) {
                    this.setState({ tasks: res.data.tasks })
                }

                else {
                    alert(res.data.mssg)

                }

            })
            .catch(err => {
                console.log(err);
            })
    }

    image = (e, tname) => {
        this.setState({ err: "" })
       
        if (e.target.files.length > 0) {
            if (e.target.files[0].type == "image/jpeg" || e.target.files[0].type == "image/png" || e.target.files[0].type == "image/jpg") {
               
                this.setState({ timg: e.target.files[0], tname: tname }, () => {
                })

            }
            else {
                this.setState({ err: "only jpeg or png image allowed" })
            }
        }

    }

    submit = (e, tname) => {
        this.setState({ err: "" })
        if (tname != this.state.tname) {
            this.setState({ err: "Plz select a image" })

        }
        else {
            let formdata = new FormData()
            formdata.append('tname', this.state.tname)
            formdata.append('attach', this.state.timg)

            axios.post(`http://localhost:9000/submittask/${localStorage.getItem('email')}`, formdata)
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

    logout = () => {
        localStorage.removeItem('email')
        localStorage.removeItem('name')
        localStorage.removeItem('logas')

        window.location.reload()


    }
    render() {
        return (
            <div>
                <button style={{ cursor: "pointer", textAlign: "right", border: "none", background: "transparent", height: "100%", color: "black", marginBottom: "20px", fontSize: "small", float: "right", marginRight: "8px", verticalAlign: "center", marginTop: 0, marginRight: "10px" }} onClick={this.logout}>Logout</button>


                <div style={{ fontSize: "large", color: "purple", textAlign: "center", margin: "auto", marginBottom: "20px", width: "70%", marginTop: "80px" }}>
                    Welcome  {localStorage.getItem('name')} <span style={{ fontSize: "medium", color: "darkblue" }}>(Solve Tasks)</span>

                </div>
                <div>
                    <table className="homeforuser">
                        <tr>
                            <th>S.No.</th>
                            <th style={{ width: "250px" }}>Task Name/id</th>
                            <th style={{ width: "500px" }} >Description</th>
                            <th style={{ width: "300px" }}>Image</th>

                        </tr>

                        {this.state.tasks.map((i, ind) =>
                            <tr>
                                <td>{ind + 1}</td>

                                <td style={{ color: "rgb(8,8,1)" }}>{i.tname}</td>
                                <td style={{ color: "rgb(8,8,1)" }}>{i.addDet}</td>
                                <td>
                                    <img src={`http://localhost:9000/${i.timg}`} height={200} width={200}>
                                    </img>
                                    {this.state.err != 0 && <div style={{ color: "crimson", fontSize: "small" }}>{this.state.err}</div>}

                                </td>
                                <td style={{ width: "70px" }}><input type="file" onChange={(e) => this.image(e, i.tname)} title="Upload Image" /></td>
                                <td ><button style={{ color: "white", background: "orange", border: "none", borderRadius: "1.5px", width: "60px", height: "30px" }} onClick={(e) => this.submit(e, i.tname)}>Submit</button></td>
                            </tr>

                        )}
                    </table>




                </div>
            </div >
        )
    }
}

export default Homeforuser
