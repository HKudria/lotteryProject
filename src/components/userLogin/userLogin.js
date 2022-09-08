import React, {Component} from "react";
export default class UserLogin extends Component {
    state = {
        token: '',
        isWrongToken: false
    }

    onPasswordChange = (e) => {
        this.setState({
            token: e.target.value
        })
    }

    checkToken = () => {
        fetch('http://localhost/mrBlackLotery/api/user.php', {
            crossDomain: true,
            method: 'POST',
            body: JSON.stringify({
                'route':'checkToken',
                'token': this.state.token
            })
        }).then(response => response.json())
            .then(res => {
                console.log(res)
                if(res.token){
                    this.props.updateToken(res.token);
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
                    <h2 className="uk-modal-title uk-text-center">Login In</h2>
                    {this.state.isWrongToken?<h2 className="uk-modal-title uk-text-center">Wrong token!</h2>:''}
                    <div className="uk-margin-top uk-text-lead">Enter your token:</div>
                    <input
                        type="password"
                        name=""
                        id=""
                        className="uk-input uk-margin-top"
                        placeholder="Password"
                        value={this.state.token}
                        onChange={this.onPasswordChange}
                    />
                    {/*{renderShort}*/}
                    {/*{renderError}*/}
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