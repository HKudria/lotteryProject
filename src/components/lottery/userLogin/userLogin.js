import React, {Component} from "react";
export default class UserLogin extends Component {
    state = {
        token: '',
        isWrongToken: false,
        isUsed: false
    }

    onPasswordChange = (e) => {
        this.setState({
            token: e.target.value
        })
    }

    checkToken = () => {
        this.setState({
            isUsed: false,
            isWrongToken: false
        })
        fetch('/api/user.php', {
            crossDomain: true,
            method: 'POST',
            body: JSON.stringify({
                'route':'checkToken',
                'token': this.state.token
            })
        }).then(response => response.json())
            .then(res => {
                if(res.token){
                    this.props.updateToken(res.token);
                } else if(res.used){
                    this.setState({
                        isUsed: true
                    })
                } else {
                    this.setState({
                        isWrongToken: true
                    })
                }
            })
    }

    render() {
        return (
            <div className="login-container">
                <div className="login">
                    <h2 className="uk-modal-title uk-text-center">Welcome to BlackCommunity lottery!</h2>
                    {this.state.isWrongToken?<h2 className="uk-modal-title uk-text-center">Wrong token!</h2>:''}
                    {this.state.isUsed?<h2 className="uk-modal-title uk-text-center">Token was used!</h2>:''}
                    <div className="uk-margin-top uk-text-lead">Enter your token:</div>
                    <input
                        type="text"
                        name=""
                        id=""
                        className="uk-input uk-margin-top"
                        placeholder="write token here"
                        value={this.state.token}
                        onChange={this.onPasswordChange}
                    />
                    <button
                        className="uk-button uk-button-primary uk-margin-top"
                        type="button"
                        onClick={this.checkToken}
                    >Enter</button>
                </div>
            </div>
        );
    }
}