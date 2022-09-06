import React, {Component} from "react";
import CreateLotteryItem from "../createLotteryItem";
import GenerateToken from "../generateToken";

export default class CreateLottery extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        lotteryDescription: '',
        countOfLots: '',
        countOfBox: '',
        lotteryId: '',
        lotteryInputDate: '',
        isLotteryCreated: false,
        isModalToken: false,
    }
    onSubmitCreateLottery = () => {
        fetch('http://localhost/mrBlackLotery/api/controller.php?fn=createLottery', {
            crossDomain: true,
            method: 'POST',
            body: JSON.stringify({
                'desc': this.state.lotteryDescription,
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
        fetch('http://localhost/mrBlackLotery/api/controller.php?fn=createPresent', {
            crossDomain: true,
            method: 'POST',
            body: JSON.stringify({
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

    showTokenModal = () => {
        this.setState(prevState => ({
            isModalToken: !prevState.isModalToken
        }))
    }

    onChangeCount = (event) => {
        this.setState({
            countOfLots: event.target.value
        })
    }

    onChangeCountBox = (event) => {
        this.setState({
            countOfBox: event.target.value
        })
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
                            <label htmlFor="exampleFormControlInput1 ml-3">Count of present</label>
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
                </div>
                {this.state.isModalToken?<GenerateToken closeButton={this.showTokenModal}/>:''}
            </>
        );
    }

}