import React, {Component} from "react";
export default class Login extends Component {
    state = {
        pass: ''
    }

    onPasswordChange = (e) => {
        this.setState({
            pass: e.target.value
        })
    }

    render() {

        // loginShort ? renderShort = <span className="login-error">Password must be more than 5 symbols</span> : null;
        // loginError ? renderError = <span className="login-error">Password isn't correct</span> : null;


        return (
            <div className="login-container">
                <div className="login">
                    <h2 className="uk-modal-title uk-text-center">Login In</h2>
                    <div className="uk-margin-top uk-text-lead">Password:</div>
                    <input
                        type="password"
                        name=""
                        id=""
                        className="uk-input uk-margin-top"
                        placeholder="Password"
                        value={this.state.pass}
                        onChange={this.onPasswordChange}
                    />
                    {/*{renderShort}*/}
                    {/*{renderError}*/}
                    <button
                        className="uk-button uk-button-primary uk-margin-top"
                        type="button"
                        onClick={() => this.props.login(this.state.pass)}
                    >Enter</button>
                </div>
            </div>
        );
    }
}