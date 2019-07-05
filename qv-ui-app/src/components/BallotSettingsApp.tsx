import React from 'react';
import './bootstrap.min.css';
import { Component } from 'react';
import { whileStatement } from '@babel/types';


interface VotePickerProps {
    chosen?: String,
    buttonIds: Array<String>,
    buttonTexts:  Array<String>,
    onClick: any,

}

class VoteTypePicker extends Component<VotePickerProps> {

    constructor(props: VotePickerProps ){
        super(props)
        
    }

    public getButton = ( idx: number) => {

        let buttonQualities = {
            borderRadius: 10,
            borderWidth: 1,
            borderStyle: "solid",
            backgroundColor: 'white',
        }

        if (this.props.buttonIds[idx] === this.props.chosen ) {
            buttonQualities.backgroundColor = 'grey';
            return (
                <div className="col">
                {
                    <button className = {String(this.props.buttonIds[idx])} 
                            style = {buttonQualities}
                            onClick={ () => { this.props.onClick(this.props.buttonIds[idx])}}>{this.props.buttonTexts[idx]}</button>
                }
                </div>
            );
        } else {
            return (
                <div className="col">
                {
                    <button className = {String(this.props.buttonIds[idx])} 
                            style = {buttonQualities}
                            onClick={ () => {this.props.onClick(this.props.buttonIds[idx])}}>{this.props.buttonTexts[idx]}</button>
                }
                </div>
            );
        }
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
    }

    render() {

        let menuStyle = {
            backgroundColor: 'white',
            opacity: .9,
            textAlign: 'center',
            height: 100,
            marginTop: 10,
            borderStyle: "solid",
            borderRadius: 10,
            borderWidth: 1,
        } as React.CSSProperties;
        return (
            <div className = 'row'>
                <div className = 'col-lg-3'></div>
                <div className = 'col-lg-6'>
                    <div style = {menuStyle}>
                        
                        <VoteTypePicker 
                            buttonIds = {['qv','rc','p']}
                            buttonTexts = {["Quadratic Voting","Ranked Choice","Plurality"]}
                            chosen = {this.state.chosenVote}
                            onClick = {(voteId:String) => {this.setState({chosenVote: voteId})}}/>
                        
                    </div>
                </div>
                <div className = 'col-lg-3'></div>
            </div>
        );

    }

}