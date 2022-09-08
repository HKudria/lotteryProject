import React, {Component} from "react";
import UserLogin from "../userLogin";

export default class Lottery extends Component{
    state = {
        userToken: '',
        lotteryCount: '',
        lotteryToken: ''
    }

    updateUserToken = (token) => {
       this.setState({
           userToken: token
       })
    }

    render() {
        return (
            <>
                {!this.state.userToken?<UserLogin updateToken={this.updateUserToken}/>:''}
            </>
        )
    }
}