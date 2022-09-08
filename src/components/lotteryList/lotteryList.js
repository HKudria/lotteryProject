import React, {Component} from "react";
import {toBoolean} from "uikit/src/js/util";

export default class LotteryList extends Component {
    constructor(props) {
        super(props);
    }

    onSelectLottery = (id) => {
        fetch('http://localhost/mrBlackLotery/api/admin.php', {
            crossDomain: true,
            method: 'POST',
            body: JSON.stringify({
                'route':'activateLottery',
                'lottery_id': id
            })
        }).then(response => response.json())
            .then((res) => {
                alert(res.message)
                this.props.updateComponent();
            })
    }

    renderLotteryList = () => {
        const arrayOfList = Object.values(this.props.lotteryState)

        return (
            <div className='d-flex flex-wrap flex-column-reverse'>
                {arrayOfList.map((key) => {
                    const isActive = toBoolean(key[0].active)
                    return (
                        <>
                            <div className='small'>
                                <table className="table table-responsive-sm tb">
                                    <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Present Description</th>
                                        <th scope="col">Lucky Number</th>
                                        <th scope="col">Is win</th>
                                        <th scope="col">Token</th>
                                        <th scope="col">Nickname</th>
                                        <th scope="col">Date</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {key.map((present, index) => {
                                        return (
                                            <tr key={`${present.name}${present.token}`}>
                                                <th scope="row">{index}</th>
                                                <td><strong>{present.name}</strong></td>
                                                <td>{present.number}</td>
                                                <td>{present.token ? 'Yes' : 'No'}</td>
                                                <td>{present.token ? present.token : 'empty'}</td>
                                                <td>{present.nick ? present.nick : 'empty'}</td>
                                                <td>{present.updated_at ? present.updated_at : 'empty'}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                            <table className="table" key={`tableHead${Math.random()}`}>
                                <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Lottery Id</th>
                                    <th scope="col">Count of present</th>
                                    <th scope="col">Count of box</th>
                                    <th scope="col">Is active</th>
                                    <th scope="col">Activate</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">{key[0].lotId}</th>
                                    <td>{key[0].presents}</td>
                                    <td>{key[0].boxes}</td>
                                    <td>{isActive?'YES':'NO'}</td>
                                    <td>
                                        <button className="btn btn-primary"
                                                disabled={isActive}
                                                onClick={() => this.onSelectLottery(key[0].lotId)}
                                                key={`button${Math.random()}`}> Activate
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                        </>
                    )
                })}
            </div>
        );
    }


    render() {
        return (
            <>
                {this.props.lotteryState ? this.renderLotteryList() :
                    <p className="text-center">You don't have any lottery!</p>}
            </>
        )
    }

}