import React, {Component} from "react";
import CreateLotteryItem from "../createLotteryItem";
import GenerateToken from "../generateToken";
import {NavLink} from "react-router-dom";
import {getCookie} from "../../../helper/cookie";

export default class CreateLottery extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        lotteryDescription: '',
        countOfLots: '',
        countOfBox: 100,
        lotteryId: '',
        lotteryInputDate: '',
        isLotteryCreated: false,
        isModalToken: false,
    }
    onSubmitCreateLottery = () => {
        fetch('http://localhost/mrBlackLotery/api/admin.php', {
            crossDomain: true,
            method: 'POST',
            body: JSON.stringify({
                'route': 'createLottery',
                'session_id': getCookie('sessionId'),
                'description': this.state.lotteryDescription,
                'present_count': this.state.countOfLots,
                'box_count': (this.state.countOfBox ? this.state.countOfBox : 100)
            })
        }).then(response => response.json())
            .then(res => {
                this.setState({
                    lotteryDescription: res.description,
                    countOfLots: res.item_count,
                    lotteryId: res.id,
                    lotteryInputDate: res.date,
                    isLotteryCreated: true
                })
            })
    }

    onSubmitLotteryPresent = (state) => {
        fetch('http://localhost/mrBlackLotery/api/admin.php', {
            crossDomain: true,
            method: 'POST',
            body: JSON.stringify({
                'route': 'createPresent',
                'session_id': getCookie('sessionId'),
                'lottery_id': this.state.lotteryId,
                'presents': state
            })
        }).then(response => response.json())
            .then((res) => {
                this.setState({
                    isLotteryCreated: false,
                    lotteryDescription: '',
                    countOfLots: '',
                    countOfBox: '',
                    lotteryId: '',
                })
                alert(res.message)
                this.props.updateComponent();
            })
    }

    disLottery = () => {
        fetch('http://localhost/mrBlackLotery/api/admin.php', {
            crossDomain: true,
            method: 'POST',
            body: JSON.stringify({
                'route': 'disActivateLottery',
                'session_id': getCookie('sessionId'),
            })
        }).then(response => response.json())
            .then((res) => {
                alert(res.message)
                this.props.updateComponent();
            })
    }

    showTokenModal = () => {
        this.setState(prevState => ({
            isModalToken: !prevState.isModalToken
        }))
    }

    onChangeCount = (event) => {
        if (event.target.value.replace(/[^0-9]/g, "") > this.state.countOfBox) {
            alert('Present count coudn\'t be more than count of box. Actual box count: ' + this.state.countOfBox)
        } else {
            this.setState({
                countOfLots: event.target.value.replace(/[^0-9]/g, "")
            })
        }
    }


    onChangeCountBox = (event) => {
        if (event.target.value.replace(/[^0-9]/g, "") > 100) {
            alert('max box element 100')
        } else {
            this.setState({
                countOfBox: event.target.value.replace(/[^0-9]/g, "")
            })
        }

    }

    onChangeDescription = (event) => {
        this.setState({
            lotteryDescription: event.target.value
        })
    }


    render() {
        return (
            <>
                <div className='p-2'>
                    <h2>Create new lottery</h2>
                    <form>
                        <div className="form-group mb-1">
                            <label htmlFor="exampleFormControlTextarea1 ml-3">Lottery description</label>
                            <textarea className="form-control"
                                      placeholder='Description'
                                      onChange={this.onChangeDescription}
                                      value={this.state.lotteryDescription}
                                      rows="3"/>
                        </div>
                        <div className="form-group mb-1">
                            <label htmlFor="exampleFormControlInput1 ml-3" pattern="[0-9]*">Count of present</label>
                            <input type="text"
                                   className="form-control"
                                   onChange={this.onChangeCount}
                                   value={this.state.countOfLots}
                                   placeholder="0"/>
                        </div>
                        <div className="form-group mb-1">
                            <label htmlFor="exampleFormControlInput1 ml-3">Count of box</label>
                            <input type="text"
                                   className="form-control"
                                   onChange={this.onChangeCountBox}
                                   value={this.state.countOfBox}
                                   placeholder="100"/>
                        </div>
                    </form>

                    {this.state.isLotteryCreated ?
                        <CreateLotteryItem count={this.state.countOfLots} submit={this.onSubmitLotteryPresent}/> : ''}
                    {!this.state.isLotteryCreated ?
                        <button className="btn btn-primary uk-align-right mr-2"
                                onClick={this.onSubmitCreateLottery}> ADD PRESENTS
                        </button> : ''}
                    <button className="btn btn-primary uk-align-right mr-2"
                            onClick={this.showTokenModal}> GENERATE TOKEN
                    </button>
                    <button className="btn btn-primary uk-align-right mr-2"
                            onClick={this.disLottery}> Disactivate lottery
                    </button>
                    <NavLink to="/admin/userList">
                        <button className="btn btn-primary uk-align-right mr-2"> User list
                        </button>
                    </NavLink>
                    <button className="btn btn-primary uk-align-right mr-2"
                            onClick={this.props.logout}> Logout
                    </button>
                </div>
                {this.state.isModalToken ? <GenerateToken closeButton={this.showTokenModal}/> : ''}
            </>
        );
    }

}