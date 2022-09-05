import React, {Component} from "react";
import CreateLotteryItem from "../createLotteryItem";

export default class CreateLottery extends Component {
    state = {
        lotteryDescription: '',
        countOfLots: '0',
        lotteryId: '',
        lotteryInputDate: '',
        isLotteryCreated: false,
    }
    onSubmitCreateLottery = () => {
        fetch('http://localhost/mrBlackLotery/api/controller.php?fn=createLottery', {
            crossDomain: true,
            method: 'POST',
            body: JSON.stringify({
                'desc': this.state.lotteryDescription,
                'count': this.state.countOfLots
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
            .then(res => {
                // this.setState({
                //     lotteryDescription: res.description,
                //     countOfLots: res.item_count,
                //     lotteryId: res.id,
                //     lotteryInputDate: res.date,
                //     isLotteryCreated: true
                // })
            })
        this.setState({
            isLotteryCreated: false
        })
    }



    onChangeCount = (event) => {
        this.setState({
            countOfLots: event.target.value
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
                <div>
                    Create new lottery
                    <textarea className="uk-textarea"
                              placeholder='Description'
                              onChange={this.onChangeDescription}
                              value={this.state.lotteryDescription}
                    />
                    <input className="uk-input"
                           type="text"
                           placeholder='Count of lottery item'
                           onChange={this.onChangeCount}
                           value={this.state.countOfLots}
                    />
                    <button className="uk-button uk-button-default" onClick={this.onSubmitCreateLottery}>Create new
                        lottery
                    </button>
                </div>
                {this.state.isLotteryCreated? <CreateLotteryItem count={this.state.countOfLots} submit={this.onSubmitLotteryPresent}/>:''}

            </>
        );
    }

}