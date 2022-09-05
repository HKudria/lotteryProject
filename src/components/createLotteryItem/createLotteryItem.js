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
            itemComponent.push(<div >
                Create new lottery {this.props.id}
                <textarea className="uk-textarea"
                          placeholder='Description'
                          onChange={(event)=>this.updateValueFromItem(event, i)}
                          value={this.state.itemValue[i]}
                          key={this.props.id}
                />
            </div>)
        }
        return (
            <div>
                {itemComponent.map(element => element)}
                <button className="uk-button uk-button-default" onClick={this.onSubmitLotteryPresent}> ADD PRESENTS </button>
            </div>
        )
    }

    render() {
        return (
            <>
                {this.createLotteryItem()}
            </>
        );
    }

}