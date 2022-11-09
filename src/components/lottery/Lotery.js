import React, {Component} from "react";
import UserLogin from "./userLogin";
import MainLotteryPage from "./mainLotteryPage";

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
        if(!this.state.userToken){
            return <UserLogin updateToken={this.updateUserToken}/>
        }
        return (
            <>
                <MainLotteryPage userToken={this.state.userToken} updateToken={this.updateUserToken}/>
            </>
        )
    }
}