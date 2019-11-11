import React from 'react';
import './bootstrap.min.css';
import { Component } from 'react';
import './global.css';
import './BallotSettingsApp.css';
import {Link} from 'react-router-dom';
import {Settings} from './Settings';



interface VotePickerProps {
    chosen?: String,
    buttonIds: Array<String>,
    buttonTexts:  Array<String>,
    onClick: any, //idk what the type of this method should be.
    outerHeight: number
}

interface BallotPickerState {
    chosenVote?: string,
    numberCredits?: number,
    chosenEnd?: string,
    returnMail?: string
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
        let buttonTopMargin = {marginTop: this.props.outerHeight*.40} as React.CSSProperties;
        return(
            <div className="col button-buffer" style = {buttonTopMargin}>
                <div className = "row">
                    {
                        [...Array(this.props.buttonIds.length).keys()].map((idx: number) => {
                            return (
                                this.getButton(idx)
                            )
                        })  
                    }
                </div>
            </div>
        )
    }
}

export default class BallotSettingsApp extends React.Component<any,BallotPickerState> {
    constructor(props: any) {
        super(props);
        this.state={
            chosenVote: undefined,
            returnMail: "",
            chosenEnd: "",
            numberCredits: 100
        }
        this.Submit = this.Submit.bind(this);
    }

    public Submit() {

        const locationDescriptor = {
            pathname: `/${this.state.chosenVote}`,
            search: `?email=${this.state.returnMail}&numberCredits=${this.state.numberCredits}&enddate=${this.state.chosenEnd}`
        }

        return (
            <div className = 'col'>
                    <button className = 'menu-button'>
                        <Link to={locationDescriptor} >
                            Submit
                        </Link>
                    </button>
            </div>
        );

    }

    render() {

        let menu_background_size = window.innerHeight*.60; 
        let content = undefined
        if (!this.state.chosenVote){
            content = <VoteTypePicker 
                buttonIds = {['qv','p']}
                buttonTexts = {["Quadratic Voting","Plurality"]}
                chosen = {this.state.chosenVote}
                onClick = {(voteId:string) => {this.setState({chosenVote: voteId})}}
                outerHeight= {menu_background_size}
            />
        } else {
            content = 
                <div className='container-fluid'>
                    <div className='row'>
                        <Settings 
                            voteType={this.state.chosenVote}
                            goBack={() => this.setState({chosenVote: undefined})}
                            labels={["Number of Credits: ", "Email Callback:", "End Date:"]}
                            callbacks={[(val)=>{this.setState({numberCredits: val})}, 
                                (val)=>{this.setState({returnMail: val})},
                                (val)=>{this.setState({chosenEnd: val})}]}
                            inputType={["slider", "input", "input"]}
                            initialValues={[100, this.state.returnMail,this.state.chosenEnd]}
                            />
                    </div>
                    <div className='row' style={{marginTop: 10}}>
                        <div className = 'col'/>
                        <div className = 'col'><this.Submit/></div>
                        <div className = 'col'/>
                    </div>
                </div>
        } 
        
        return (
            <div className = 'row'>
                <div className = 'col-lg-3'></div>
                <div className = 'col-lg-6'>
                    <div className = 'menu-style' style = {{height: menu_background_size} as React.CSSProperties}>
                        {content} 
                    </div>
                </div>
                <div className = 'col-lg-3'></div>
            </div>
        );
    }
}