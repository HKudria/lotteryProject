import React, {Component} from "react";
import Login from "./login";
import CreateLottery from "./createLottery";
import LotteryList from "./lotteryList";
import {getCookie, deleteCookie, createCookieInHour} from "../../helper/cookie";

export default class AdminPanel extends Component {
    state = {
        auth: false,
        loginError: false,
        loginShort: false,
        lotteryState: ''
    }

    componentDidMount() {
        this.checkAuth()
    }

    checkAuth() {
        fetch('/api/login.php', {
            crossDomain: true,
            method: 'POST',
            body: JSON.stringify({
                'route': 'checkAuth',
                'session_id': getCookie('sessionId'),
            })
        }).then(response => response.json())
            .then(res => {
                this.setState({
                    auth: res.auth
                })
                if (res.auth) {
                    this.updateComponent()
                }
            })
    }

    login = (pass) => {
        fetch('/api/login.php', {
            crossDomain: true,
            method: 'POST',
            body: JSON.stringify({
                'route': 'authorize',
                'password': pass
            })
        }).then(response => response.json())
            .then(res => {
                this.setState({
                    auth: res.auth
                })
                if (res.auth) {
                    createCookieInHour('sessionId', res.id, 1)
                    this.updateComponent()
                }
            })
    }



    logout = () => {
        fetch('/api/login.php', {
            crossDomain: true,
            method: 'POST',
            body: JSON.stringify({
                'route': 'logout',
                'session_id': getCookie('sessionId'),
            })
        }).then(() => {
            deleteCookie('sessionId')
            this.setState({
                auth: false
            })
        })
    }

    updateComponent = () => {
        fetch('/api/admin.php', {
            crossDomain: true,
            method: 'POST',
            body: JSON.stringify({
                'route': 'getAllList',
                'session_id': getCookie('sessionId'),
            })
        }).then(response => response.json())
            .then(res => {
                this.setState({
                    lotteryState: res
                })
            })
    }

    render() {
        const {auth, loginError, loginShort} = this.state;

        if (!auth) {
            return <Login login={this.login} loginShort={loginShort} loginError={loginError}/>
        }

        return (
            <div className="container">
                <div className='row d-flex flex-wrap'>
                    <div className='col col-5-sm mw-300'><CreateLottery updateComponent={this.updateComponent} logout={this.logout}/></div>
                    <div className='col col-7-sm p-0'><LotteryList lotteryState={this.state.lotteryState}
                                                                   updateComponent={this.updateComponent}/></div>
                </div>
            </div>
        );
    }


}