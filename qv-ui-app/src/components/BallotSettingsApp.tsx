import React from 'react';
import './bootstrap.min.css';
import { Component } from 'react';
import './global.css';
import {Link, Router} from 'react-router-dom';
import { createBrowserHistory } from 'history';


interface VotePickerProps {
    chosen?: String,
    buttonIds: Array<String>,
    buttonTexts:  Array<String>,
    onClick: any,

}

class VoteTypePicker extends Component<VotePickerProps> {

    public getButton = ( idx: number) => {    
        return (
            <div className="col" key = {idx}>
            {
                <button className = 'menu-button global-text-style-sm' 
                        style = {{backgroundColor: this.props.buttonIds[idx] === this.props.chosen? '#C8C8C8': 'white'}}
                        onClick={ () => {this.props.onClick(this.props.buttonIds[idx])}}>{this.props.buttonTexts[idx]}</button>
            }
            </div>
        );
    }

    public render() {
        return(
            <div className = "row">
                {
                    [...Array(this.props.buttonIds.length).keys()].map((idx: number) => {
                        return (
                            this.getButton(idx)
                        )
                    })  
                }
            </div>
        )
    }
}





interface BallotPickerState {
    chosenVote?: String,
    chosenAudience?: String,
    chosenAnonymity?: String,
    chosenEnd?: String,
}

export default class BallotSettingsApp extends React.Component<any,BallotPickerState> {
    constructor(props: any) {
        super(props);
        this.state={
            chosenVote: undefined,
            chosenAudience: undefined,
            chosenAnonymity: undefined,
            chosenEnd: undefined
        }
        this.Submit = this.Submit.bind(this);
    }

    public Submit() {
        const history = createBrowserHistory();
        return (
            <div className = 'row'>
                <div className = 'col'/>
                <div className = 'col'>
                    <button className = 'menu-button'><Link to= {`/${this.state.chosenVote}`}>Submit</Link></button>
                </div>
                <div className = 'col'/>
            </div>
        );

    }

    render() {
        return (
            <div className = 'row'>
                <div className = 'col-lg-3'></div>
                <div className = 'col-lg-6'>
                    <div className = 'menu-style'>
                        <VoteTypePicker 
                            buttonIds = {['qv','rc','p']}
                            buttonTexts = {["Quadratic Voting","Ranked Choice","Plurality"]}
                            chosen = {this.state.chosenVote}
                            onClick = {(voteId:String) => {this.setState({chosenVote: voteId})}}
                        />
                        <div className = 'col'/>
                        <div className = 'col'><this.Submit/></div>
                        <div className = 'col'/>
                    </div>
                </div>
                <div className = 'col-lg-3'></div>
            </div>
        );
    }
}