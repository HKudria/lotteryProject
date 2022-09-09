import React, {Component} from "react";
import BoxComponent from "../boxComponent";

export default class MainLotteryPage extends Component {
    state = {
        availablePresentCount: '',
        boxCount: '',
        lotteryToken: '',
        boxes: [],
        isReady: false,
        isTokenUsed: false
    }

    componentDidMount() {
        this.getActiveLottery()
    }

    getActiveLottery() {
        fetch('http://localhost/mrBlackLotery/api/user.php', {
            crossDomain: true,
            method: 'POST',
            body: JSON.stringify({
                'route': 'getActiveLottery',
            })
        }).then(response => response.json())
            .then(res => {
                if (res.token) {
                    this.setState({
                        availablePresentCount: res.availablePresentCount,
                        boxCount: res.boxCount,
                        lotteryToken: res.token
                    })
                    this.selectListOfOpened()
                } else {
                    alert('We are so sorry, but actual all prize was won! But you can use this token again when we make new one :) Good luck!')
                    this.props.updateToken('');
                }
            })
    }

    selectListOfOpened = () => {
        fetch('http://localhost/mrBlackLotery/api/user.php', {
            crossDomain: true,
            method: 'POST',
            body: JSON.stringify({
                "route": "getOpenedBox",
                "token": this.state.lotteryToken
            })
        }).then(response => response.json())
            .then(res => {
                this.makePresentBox(res)
            })

    }

    checkPrize = (id) => {
        if (!this.state.isTokenUsed) {
            fetch('http://localhost/mrBlackLotery/api/user.php', {
                crossDomain: true,
                method: 'POST',
                body: JSON.stringify({
                    "route": "checkPrize",
                    "lottery_token": this.state.lotteryToken,
                    "user_token": this.props.userToken,
                    "id": id
                })
            }).then(response => response.json())
                .then(res => {
                    this.selectListOfOpened()
                    this.setState({
                        isTokenUsed: true
                    })
                    alert(res.message)
                })
        }

    }

    makePresentBox = (array) => {
        this.setState({
            boxes: []
        })
        for (let i = 0; i < this.state.boxCount; i++) {
            let element = (<BoxComponent
                key={i}
                id={i}
                isTokenUsed={this.state.isTokenUsed}
                isOpen={array.includes(i)}
                check={this.checkPrize}
            />)

            this.setState(prevState => ({
                boxes: [...prevState.boxes, element]
            }))

        }
    }


    render() {
        return (
            <div className='bg'>
                <div className='container'>
                    <h2 className='text-center'>Welcome to BlackCommunity Lottery</h2>
                    <h2 className='text-center'>Available prize to won: {this.state.availablePresentCount}</h2>
                    <div className='row justify-content-around'>
                        {this.state.boxes}
                    </div>
                </div>
            </div>
        )
    }
}