import React, {Component} from "react";

export default class CreateLotteryItem extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        itemValue: ''
    }

    updateValueFromItem = (event, id) => {
        this.setState({
            itemValue: {
                ...this.state.itemValue,
                [id]: event.target.value
            }
        });
    }

    onSubmitLotteryPresent = () => {
        this.props.submit(this.state.itemValue)
    }
    createLotteryItem = () => {
        const itemComponent = []
        for (let i = 0; i < this.props.count; i++) {
            let number = i + 1;
            itemComponent.push(
                <div className="form-group mb-1" key={`divItem${number}`}>
                    <label htmlFor="exampleFormControlTextarea1 ml-3">Present #{number}</label>
                    <textarea className="form-control"
                              placeholder='Present description'
                              onChange={(event)=>this.updateValueFromItem(event, i)}
                              value={this.state.itemValue[i]}
                              key={`textAreaItem${number}`}
                              rows="2"/>
                </div>)
        }
        return (
            <div className="p-2">
                {itemComponent.map(element => element)}
                <button className="btn btn-primary uk-align-right mt-2" onClick={this.onSubmitLotteryPresent}> CREATE LOTTERY </button>
            </div>
        )
    }

    render() {
        return (
            <div>
                <hr className='uk-hr m-2'/>
                {this.createLotteryItem()}
            </div>
        );
    }

}