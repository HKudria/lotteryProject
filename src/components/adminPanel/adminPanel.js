import React, {Component} from "react";
import Login from "../login";
import CreateLottery from "../createLottery";
import LotteryList from "../lotteryList";

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
        fetch('http://localhost/mrBlackLotery/api/login.php', {
            crossDomain: true,
            method: 'GET',
            withCredentials: true
        }).then(response => response.json())
            .then(res => {
                this.setState({
                    auth: res.auth
                })
                if(res.auth){
                    this.updateComponent()
                }
            })
    }

    login = (pass) => {
        if (pass.length > 5) {
            fetch('http://localhost/mrBlackLotery/api/admin.php', {
                crossDomain: true,
                method: 'POST',
                withCredentials: true,
                body: JSON.stringify({
                    'route': 'authorize',
                    'password': pass
                })
            }).then(response => response.json())
                .then(res => {
                    this.setState({
                        auth: res.auth
                    })
                }).then(response => response.json())
                .then(res => {
                    this.setState({
                        auth: res.auth,
                        loginError: !res.auth,
                        loginShort: false,
                    })
                })
        } else {
            this.setState({
                loginError: false,
                loginShort: true
            })
        }
    }

    updateComponent = () => {
        fetch('http://localhost/mrBlackLotery/api/admin.php', {
            crossDomain: true,
            method: 'POST',
            body: JSON.stringify({
               'route': 'getAllList'
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
                <div className='col col-5-sm mw-300'><CreateLottery updateComponent={this.updateComponent}/></div>
                <div className='col col-7-sm p-0'><LotteryList lotteryState={this.state.lotteryState} updateComponent={this.updateComponent}/></div>
            </div>
            </div>
        );
    }


}