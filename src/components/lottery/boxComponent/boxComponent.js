import React, {Component} from "react";
export default class BoxComponent extends Component {
    state = {
        isIs : false
    }

    checkIsOpen = () => {
        if (!this.props.isTokenUsed){
            if (!this.props.isOpen) {
                if(window.confirm("Are you sure?")){
                    this.props.check(this.props.id)
                    this.setState({
                        isIs:true
                    })
                }
            }
        } else {
            alert('Данный токен уже был использован!')
        }
    }

    render() {
        return (
            <div className='col-1 p-1 box' onClick={this.checkIsOpen}>
                {this.state.isIs||this.props.isOpen?<img src='safeunlock.png' alt='open'/>:<img src='safelock.png' alt='close'/> }
            </div>
        );
    }
}