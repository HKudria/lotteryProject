import React, {Component} from "react";
export default class BoxComponent extends Component {

    checkIsOpen = () => {
        if (!this.props.isTokenUsed){
            if (!this.props.isOpen) {
                if(window.confirm("Are you sure?")){
                    this.props.check(this.props.id)
                }
            }
        } else {
            alert('Woo... you had only one chance! See you next time!')
        }
    }

    render() {
        return (
            <div className='col-2 p-1 box' onClick={this.checkIsOpen}>
                {this.props.isOpen?<img src='safeunlock.png' alt='open'/>:<img src='safelock.png' alt='close'/> }
            </div>
        );
    }
}