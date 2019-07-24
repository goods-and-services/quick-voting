import React from 'react';
import './bootstrap.min.css';
import './global.css';
import './ballot-creator.css';

import TextInput from './TextInput';
import { faPlusCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { element } from 'prop-types';


//TODO make this page not work if all query parameters aren't set correctly

interface question {
    questionId: number,
    text: string,
}

interface option {
    optionId: number,
    text: string
}



class QuestionBox extends React.Component<{question?: question, questionOptions?: Array<option>,
                                             questionAdded?: () => void
                                             questionTextChanged?: (txt: string) => void
                                             optionAdded?: (qId: number) => void
                                             optionChanged?: (optionId: number, txt: string) => void}> {


    constructor(props: any) {
        super(props);
        this.RenderExistingBox = this.RenderExistingBox.bind(this);
        this.RenderOption = this.RenderOption.bind(this);
    }


    public organizeComponents(rangeArr: Array<undefined>, optionsCopy: Array<option>) {
        let res = [];
        for (let idx = 0; idx < rangeArr.length; idx+=2){
            res.push(
                
                <div className = 'row'>
                
                    <this.RenderOption option = {
                        idx < optionsCopy.length?
                        optionsCopy[idx]: undefined
                        }/>
                    
                
                    <this.RenderOption option = {
                        (idx+1) < optionsCopy.length?
                        optionsCopy[(idx+1)]: undefined
                        }/>
                </div>
                
            )
        }
        return res;
    }


    public RenderOption(props: {option?: option}){

        let handleChange = (event: any) => {
            // @ts-ignore
            this.props.optionTextChanged(this.option.optionId, event.target.value);
        }


        return (
            <div className = 'col'>
                <div className = 'option-box'>
                {
                    props.option? 
                        <TextInput id = {props.option.optionId.toString()}
                        value={props.option.text}
                        onChange= {handleChange} 
                        //@ts-ignore
                        label = {"Option Text"} />
                    : <div className = 'ballot-text-style-md left-text'
                        //@ts-ignore
                        onClick = {() => this.props.optionAdded(this.props.question.questionId)}>
                        <FontAwesomeIcon icon={faPlusCircle}/>
                </div>
                }
                </div>
            </div>
        )
    }

    public RenderExistingBox() {

        let handleChange = (event: any) => {
            //@ts-ignore
            this.props.questionTextChanged(event.target.value);
        }

        //@ts-ignore
        let optionsCopy = [...this.props.questionOptions];
        let numOptions = optionsCopy.length;
        let rangeArr = (numOptions % 2 == 0)? [...Array(numOptions + 2)]:
                    [...Array(numOptions + 1)]

        let optionColumns = this.organizeComponents(rangeArr, optionsCopy);

        return (
            <div className = 'ballot-text-style-md'>
                <div className = 'row'>
                    <div className = 'col'>
                    {
                        //@ts-ignore
                        <TextInput id = {this.props.question.questionId.toString()}
                                    value={this.props.question? this.props.question.text.toString(): ''}
                                    onChange= {handleChange} 
                                    //@ts-ignore
                                    label = {"Topic Text"} />
                    }
                    </div>
                </div>
                {
                    optionColumns.map((elem) => {
                        return elem;
                    })
                }
                
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
            questions: [], //[{questionId: 1, text:"Are you gay"}],
            options: {}, //{1: [{optionId: 1, text: "potato"}, {optionId: 2, text: "tomato"}]},
        }

        this.RecordedQuestions = this.RecordedQuestions.bind(this);   
        this.questionAdded = this.questionAdded.bind(this);   
    }

    public questionAdded() {
        let newIdx = this.state.questions.length + 1;
        let temp_options = this.state.options;
        temp_options[newIdx] = []; 
        this.setState({questions: [...this.state.questions, {questionId: newIdx, text: ''} ],
                        options: temp_options});
    }

    public optionAdded(qId: number) {
        let newIdx = this.state.options[qId].length + 1;
        let temp_options = this.state.options;
        temp_options[qId] = [...temp_options[qId], {optionId: newIdx, text: ''}]
        this.setState({options: temp_options});
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
    
    //TODO: CHANGE EXISITNG OPTION
    public setOption(txt: string, oId: number ) {


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
                                questionTextChanged = { (txt: string) => this.setQuestion(txt, elem.questionId) }
                                optionAdded = { (qId: number) => {this.optionAdded(qId)} }
                                optionChanged = { (optionId: number, txt: string) => this.setOption(txt, optionId) } />
                                
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
