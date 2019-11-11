import React from 'react';
import './bootstrap.min.css';
import { Component } from 'react';
import './global.css';
import './BallotSettingsApp.css';
import {Link} from 'react-router-dom';
import { faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      width: 500,
    },
    margin: {
      height: theme.spacing(3),
    },
  }));

interface SettingsProps {
    goBack(): void,
    voteType: string,
    labels: Array<string>,
    callbacks:Array<(changedVal: any) => void>,
    inputType:Array<string>,
    initialValues: Array<any>,
}

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






class Settings extends Component<SettingsProps> {
    constructor(props: any) {
        super(props);
    }

    CreditSlider(label: string, value: number, onChange:(event: object, val:any) => void ){
        return(
            <div>
                <div>
                    {label}}
                </div>
                <div className={useStyles().margin}>
                    <Slider
                        defaultValue={value}
                        aria-labelledby="discrete-slider-small-steps"
                        step={10}
                        onChange={onChange}
                        marks
                        min={1}
                        max={400}
                        valueLabelDisplay="auto"
                    />
                </div>
            </div>
        )
    }


    getNextElement(inputType: string, label: string, initialValue: any, callback: (val:any)=>void) {
        let content = undefined

        if (inputType == 'slider'){
            content = this.CreditSlider(label, initialValue, (obj: object, val: number)=>{callback(val)})
        } //TODO: add else block

        return (
            <div className='row'>
                <div className='col'/>
                <div className='col'>
                    {content}
                </div>
                <div className='col'/>
            </div>

        )
    }

    render() {
        return (
            <div className = 'col'>
                <div className='row'>
                    <div className="col-2">
                        <div className="global-text-style-lg">
                            <span className='back-choose'
                                onClick={this.props.goBack}>
                                <FontAwesomeIcon icon={faArrowAltCircleLeft}/>
                            </span>
                        </div>
                    </div>
                    <div className="col-10"/>
                </div>
                {
                    this.props.inputType.map((elem: string, i: number) => {
                        return this.getNextElement(elem, this.props.labels[i], 
                            this.props.initialValues[i], this.props.callbacks[i]);
                    })
                }
            </div>
        )
    }

}



export default class BallotSettingsApp extends React.Component<any,BallotPickerState> {
    constructor(props: any) {
        super(props);
        this.state={
            chosenVote: undefined,
            returnMail: undefined,
            chosenEnd: undefined,
            numberCredits: undefined
        }
        this.Submit = this.Submit.bind(this);
    }

    public Submit() {
        return (
            <div className = 'col'>
                    <button className = 'menu-button'><Link to= {`/${this.state.chosenVote}`}>Submit</Link></button>
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
                            labels={["Number of Credits: "]}
                            callbacks={[(val)=>{this.setState({numberCredits: val})}]}
                            inputType={["slider"]}
                            initialValues={[100]}
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