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
        fetch('/api/user.php', {
            crossDomain: true,
            method: 'POST',
            body: JSON.stringify({
                'route': 'getActiveLottery',
            })
        }).then(response => response.json())
            .then(res => {
                if (!res.error && res.availablePresentCount!=="0") {
                    this.setState({
                        availablePresentCount: res.availablePresentCount,
                        boxCount: res.boxCount,
                        lotteryToken: res.token
                    })
                    this.selectListOfOpened(res.token)
                } else {
                    alert('Приносим свои извиненния, в данный момент все призы розыгранны. Ожидайте обновления!')
                    this.props.updateToken('');
                }
            })
    }

    selectListOfOpened = (token) => {
        fetch('/api/user.php', {
            crossDomain: true,
            method: 'POST',
            body: JSON.stringify({
                "route": "getOpenedBox",
                "token": token
            })
        }).then(response => response.json())
            .then(res => {
                this.makePresentBox(res)
            })

    }

    checkPrize = (id) => {
        if (!this.state.isTokenUsed) {
            this.setState({
                isTokenUsed: true
            })
            fetch('/api/user.php', {
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
                    this.selectListOfOpened(this.state.lotteryToken)
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
        console.log(array)
        for (let i = 0; i < this.state.boxCount; i++) {
            let element = (<BoxComponent
                key={i}
                id={i}
                isTokenUsed={this.state.isTokenUsed}
                isOpen={array.includes(i.toString())}
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
                    <div className='col-12 d-flex justify-content-center'>
                        <div className='col-4'>
                            <img src='black.png' alt='Black shop'/>
                        </div>
                        <div className='col-4'>
                            <img src='wizard.png' alt='Black shop'/>
                        </div>
                    </div>
                    <div className='welcome'>
                        <h2 className='text-center'>Welcome to <b>BlackCommunity&WizardShop</b> Lottery</h2>
                        <h2 className='text-center'>Доступные призы к выиграшу: {this.state.availablePresentCount}</h2>
                    </div>
                    <div className='row justify-content-around'>
                        {this.state.boxes}
                    </div>
                </div>
            </div>
        )
    }
}