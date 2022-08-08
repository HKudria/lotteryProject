import React, {Component} from "react";
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pass: ""
        }
    }

    onPasswordChange(e){
        this.setState({
            pass: e.target.value
        })
    }

    render() {
        const {pass} = this.state;
        const {login, loginShort, loginError} = this.props;
        let renderError, renderShort;

        loginShort ? renderShort = <span className="login-error">Password must be more than 5 symbols</span> : null;
        loginError ? renderError = <span className="login-error">Password isn't correct</span> : null;


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
                        value={pass}
                        onChange={(e) => this.onPasswordChange(e)}
                    />
                    {renderShort}
                    {renderError}
                    <button
                        className="uk-button uk-button-primary uk-margin-top"
                        type="button"
                        onClick={() => login(pass)}
                    >Enter</button>
                </div>
            </div>
        );
    }
}