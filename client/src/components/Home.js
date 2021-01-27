import React, { Component } from 'react'
import Homeforinstructor from './Homeforinstructor'
import Homeforuser from './Homeforuser'

export class Home extends Component {

    componentDidMount=()=>{
     
        if(!localStorage.getItem('logas')){
            this.props.history.push("/registerasuser")
        }

    }

    render() {
        return (
            <div>
                {localStorage.getItem('logas')=="user"&& <Homeforuser history={this.props.history}/>}
                {localStorage.getItem('logas')=="instructor"&& <Homeforinstructor history={this.props.history}/>}

            </div>
        )
    }
}

export default Home
