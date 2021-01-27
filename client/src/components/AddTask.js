
import React, { Component } from 'react'
import axios from 'axios'


export class AddTask extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tname: "", addDet: "", timg: "", track: "beginner", err: ""
        }
    }


    submit = (e) => {
        console.log(this.state);

        e.preventDefault()
        let formdata = new FormData()
        formdata.append('pro', JSON.stringify(this.state))
        formdata.append('attach', this.state.timg)

        axios.post(`http://localhost:9000/addtask/${localStorage.getItem('email')}`, formdata)

            .then(res => {

                console.log(res);
                alert(res.data.mssg)

                if (res.data.err == 0) {
                    this.props.history.push("/")
                }

                else {

                }

            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        if (!localStorage.getItem('email')) {
            this.props.history.push("/registerasuser")
        }
        else if (localStorage.getItem('logas') == "user") {
            this.props.history.push("/")

        }
    }

    handle = (e) => {
        const { name, value } = e.target

        this.setState({ [name]: value })

    }
    image = (e) => {
        this.setState({ err: "" })
        if (e.target.files.length > 0) {
            if (e.target.files[0].type == "image/jpeg" || e.target.files[0].type == "image/png" || e.target.files[0].type == "image/jpg") {

                this.setState({ timg: e.target.files[0] }, () => {
                })

            }
            else {
                this.setState({ err: "only jpeg or png image allowed" })
            }
        }

    }


    render() {
        return (
            <div style={{ width: "70%", margin: "auto", marginTop: "80px" }}>
                <form className="new order" onSubmit={this.submit}>
                    <fieldset style={{ padding: "5px", borderWidth: "0.1px", borderRadius: "3px" }}>
                        <legend style={{ marginTop: "10px", marginBottom: "17px", color: "blue", fontSize: "large" }}>Add Task</legend>



                        <div>
                            <br />
                            <label>Task Name/Id</label>
                            <input type="text" name="tname" onChange={this.handle} required />
                        </div>
                        <br />
                        <div>
                            <br />
                            <label>Track</label>
                            <select name="track" onChange={this.handle} required>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>

                            </select>
                        </div>
                        <br />

                        <div>
                            <label>Description</label>

                            <textarea style={{ height: "50px" }} name="addDet" onChange={this.handle} />
                        </div>

                        <div>
                            <br />
                            <label>Upload image</label>
                            <input type="file" name="timg" onChange={this.image} required />
                        </div>
                        {this.state.err != "" && <div style={{ fontSize: "small", color: "crimson" }}>{this.state.err}</div>}
                        <button>Submit</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default AddTask
