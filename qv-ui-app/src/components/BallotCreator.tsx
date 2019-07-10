import React from 'react';
import './bootstrap.min.css';
import './global.css';
import './ballot-creator.css';

import { faPlusCircle, faChevronRight, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


//TODO make this page not work if all query parameters aren't set correctly

interface question {
    questionId: number,
    text: String,
}

interface option {
    optionId: number,
    text: String
}



class QuestionBox extends React.Component<{question?: question, questionOptions?: Array<option>,
                                             questionAdded?: () => void
                                             questionTextChanged?: (txt: string) => void}, {hovered: boolean}> {

    constructor(props: any) {
        super(props);
        this.state = {
            hovered: false   
        }  
        this.RenderExistingBox = this.RenderExistingBox.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    public handleChange(event: any) {
        //@ts-ignore
        this.props.questionTextChanged(event.target.value);
    }

    public RenderExistingBox() {
        return (
            <div className = 'ballot-text-style-md'>
                <div className = 'row'>
                    <div className = 'col'>
                        <input className = 'question-text-box' type="text" value={this.props.question? this.props.question.text.toString(): ''} 
                                            onChange={this.handleChange} />
                    </div>
                </div>
            </div>
        ) 
    }

    public render() {
        return (
            <div className = 'row'> 
                <div className = 'col-12'>
                    <div className = 'ballot-elem'> 
                        <div className = 'col'>
                            {
                            (this.props.question === undefined) ? 
                                <div className = 'ballot-text-style-xl center-text'
                                    // @ts-ignore
                                    onClick = {() => this.props.questionAdded()}>
                                    <FontAwesomeIcon icon={faPlusCircle}/>
                                </div> : <this.RenderExistingBox/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )   
    }
}


interface BallotTemplateState {
    questions: Array<question>,
    options: {[questionId: number]: Array<option>},
}

export default class BallotTemplate extends React.Component<any,BallotTemplateState> {

    constructor(props: any) {
        super(props);
        this.state = {
            questions: [],//[{questionId: 1, text:"Are you gay"}],
            options: {},//{1: [{optionId: 1, text: "potato"}, {optionId: 2, text: "tomato"}]},
        }

        this.RecordedQuestions = this.RecordedQuestions.bind(this);   
        this.questionAdded = this.questionAdded.bind(this);   
    }

    public questionAdded() {
        let newIdx = this.state.questions.length + 1;
        let temp = this.state.questions;
        temp.push({questionId: newIdx, text: ''});
        this.setState({questions: temp});
    }

    public setQuestion(txt: string, qId: number ) {
        let questionsCopy = this.state.questions;
        for (let i = 0; i < questionsCopy.length; i++) {
            if (questionsCopy[i].questionId === qId) {
                questionsCopy[i].text = txt;
                break;
            }
        }
        this.setState({questions: questionsCopy});
    }
    
    public RecordedQuestions(){
        return (
            <div className = 'col-12'>
                {
                    this.state.questions.map((elem: question, idx:number) => {
                        return (
                            <QuestionBox
                                key = {idx} 
                                question = {elem} 
                                questionOptions= {this.state.options[elem.questionId]}
                                questionAdded = {() => this.questionAdded()}
                                questionTextChanged = { (txt: string) => this.setQuestion(txt, elem.questionId) }/>
                                
                        );
                    })
                }
                <QuestionBox 
                    questionAdded = {() => this.questionAdded()}/>
            </div>
        );
    }

    public render(){
        return (
            <div className = 'row'>
                <div className = 'col-lg-2'></div>
                <div className = 'col-lg-8'> 
                    <div className = 'row menu-style all-height'> 
                        <this.RecordedQuestions/>
                    </div>
                </div>
                <div className = 'col-lg-2'></div>
            </div>
        );
    }

}





/*
public RenderOptions(props: {qId: number}){

        let deleteOption = (id: number) => {
            let newOptions = this.state.options;
            delete newOptions[id];
            this.setState({options: newOptions});
        }

        return (
            <div>
            {
                this.state.options[props.qId].map((questionOption: option, idx:number) => {
                    if (idx != this.state.options[props.qId].length-1) {
                        return (
                            <div className = 'row'> 
                                <div className = 'col-2'>
                                    <div style = {{textAlign: 'right'}}><FontAwesomeIcon icon={faChevronRight} /></div>
                                </div>
                                <div className = 'col-10'>
                                    <div className = 'row'>
                                        <div className = 'col'>
                                            <p className = 'ballot-text-style-md'>{`${questionOption.text}`}</p>
                                        </div>
                                        <div className = 'col-1 ballot-text-style-md'
                                            onClick = {() => deleteOption(questionOption.optionId)}>
                                            <FontAwesomeIcon icon={faTimesCircle}/>
                                        </div>     
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className = 'row'> 
                                <div className = 'col-2'><div style = {{textAlign: 'right'}}><FontAwesomeIcon icon={faPlusCircle} /></div></div>
                                <p className = 'col-10 ballot-text-style-sm'/>
                            </div>
                        )
                    }
                })
            }
            </div>
        )
    }

                    <this.RenderQuestion q = {elem}/>
                    {
                        elem.questionId in this.state.options ? <this.RenderOptions qId = {elem.questionId}/>: <div/>
                                            
                    }
*/