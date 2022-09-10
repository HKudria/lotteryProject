import React, {Component} from "react";
export default class GenerateToken extends Component {
    state = {
        nick: '',
        tokenGenerated: ''
    }

    onNickChange = (e) => {
        this.setState({
            nick: e.target.value
        })
    }

    generateToken = () => {
        fetch('http://localhost/mrBlackLotery/api/admin.php', {
            crossDomain: true,
            method: 'POST',
            body: JSON.stringify({
                'route':'generateToken',
                'session_id': localStorage.getItem('sessionId')?localStorage.getItem('sessionId'):null,
                'nick': this.state.nick
            })
        }).then(response => response.json())
            .then(res => {
                this.setState({
                    tokenGenerated: res.token
                })
            })
    }

    render() {
        return (
            <div className="login-container">
                <div className="login">
                    <h2 className="uk-modal-title uk-text-center">Generate token</h2>
                    {this.state.tokenGenerated? <h2 className='text-center'>{this.state.tokenGenerated}</h2>:''}
                    <div className="uk-margin-top uk-text-lead">NickName:</div>
                    <input
                        type="text"
                        className="uk-input uk-margin-top"
                        placeholder="NickName in TG"
                        value={this.state.nick}
                        onChange={this.onNickChange}
                    />
                    <button
                        className="uk-button uk-button-primary uk-align-right uk-margin-top"
                        type="button"
                        onClick={this.generateToken}
                    >Generate</button>
                    <button
                        className="uk-button uk-button-secondary uk-align-right uk-margin-top"
                        type="button"
                        onClick={this.props.closeButton}
                    >Close window</button>
                </div>
            </div>
        );
    }
}