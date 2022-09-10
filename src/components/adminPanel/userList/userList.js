import React, {Component} from "react";
import {NavLink} from "react-router-dom";


export default class UserList extends Component {
    state = {
        userList: [],
        dayLimit: 30
    }

    componentDidMount() {
        this.GetUserList()
    }


    GetUserList = () => {
        fetch('http://localhost/mrBlackLotery/api/admin.php', {
            crossDomain: true,
            method: 'POST',
            body: JSON.stringify({
                'route': 'userList',
                'dayLimit': this.state.dayLimit
            })
        }).then(response => response.json())
            .then((res) => {
                this.setState({
                    userList: res
                })
            })
    }

    onChangeDayLimit = (event) => {
        this.setState({
            dayLimit: event.target.value
        })
    }


    render() {
        return (
            <>
                <div className='container'>

                    <div className='col-6'>
                        <p>Enter day limit for select user</p>
                        <input type="text"
                               className="form-control"
                               onChange={this.onChangeDayLimit}
                               value={this.state.dayLimit}
                        />
                        <NavLink to="/admin">
                            <button className="btn btn-primary uk-align-right mr-2"
                            > Go back to admin panel
                            </button>
                        </NavLink>
                        <button className="btn btn-primary uk-align-right mr-2"
                                onClick={this.GetUserList}> Get userList
                        </button>
                    </div>

                    <div>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Token</th>
                                <th scope="col">NickName</th>
                                <th scope="col">Created</th>
                                <th scope="col">Used</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.userList.map((element, index) => {
                                return (
                                    <tr key={element.token}>
                                        <th scope="row">{index}</th>
                                        <td>{element.token}</td>
                                        <td>{element.nick}</td>
                                        <td>{element.created_at}</td>
                                        <td>{element.updated_at}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}