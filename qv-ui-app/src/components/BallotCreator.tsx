import React from 'react';
import './bootstrap.min.css';
import './global.css';
import './ballot-creator.css';

import TextInput from './TextInput';
import { faPlusCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
                                             optionAdded?: (orderId:number, qId: number) => void
                                             optionChanged?: (questionId: number, optionId: number, txt: string) => void
                                             deleteOption?: (optionId: number, questionId: number)=> void}> {


    constructor(props: any) {
        super(props);
        this.RenderExistingBox = this.RenderExistingBox.bind(this);
        this.RenderOption = this.RenderOption.bind(this);
    }


    public organizeComponents(rangeArr: Array<undefined>, optionsCopy: Array<option>) {
        let res = [];
        for (let idx = 0; idx < rangeArr.length; idx+=2){
            res.push(
                
                <div className = 'row light-padding'>
                
                    <this.RenderOption 
                        option = { idx < optionsCopy.length?
                                    optionsCopy[idx]: undefined}
                        orderId = {idx}/>
                    
                
                    <this.RenderOption 
                        option = {(idx+1) < optionsCopy.length?
                                    optionsCopy[(idx+1)]: undefined}
                        orderId = {idx+1}/>
                </div>
                
            )
        }
        return res;
    }


    public RenderOption(props: {option?: option, orderId: number}){

        let handleChange = (event: any) => {
            // @ts-ignore
            this.props.optionChanged(this.props.question.questionId, props.option.optionId, event.target.value);
        }


        return (
            <div className = 'col'>
                <div className = 'option-box'>
                {
                    props.option? 
                        <div className = 'row'>
                            <div className = 'col-11 input-height-sm'>
                                <TextInput id = {props.option.optionId.toString()}
                                value={props.option.text}
                                onChange= {handleChange} 
                                //@ts-ignore
                                label = {"Option Text"} />
                            </div>
                            <div className = 'col-1 option-close'
                                //@ts-ignore
                                onClick = {() => this.props.deleteOption(props.option.optionId, this.props.question.questionId)}>
                                <FontAwesomeIcon icon={faTimesCircle}/>
                            </div>
                        </div>
                    : <div className = 'ballot-text-style-md left-text input-height-sm'
                        //@ts-ignore
                        onClick = {() => this.props.optionAdded(props.orderId,this.props.question.questionId)}>
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
        let rangeArr = (numOptions % 2 === 0)? [...Array(numOptions + 2)]:
                    [...Array(numOptions + 1)]

        let optionColumns = this.organizeComponents(rangeArr, optionsCopy);

        return (
            <div className = 'ballot-text-style-md'>
                <div className = 'row'>
                    <div className = 'col'>
                    {
                        <div className = 'input-height-lg'>
                            {
                            //@ts-ignore
                            <TextInput id = {this.props.question.questionId.toString()}
                                        value={this.props.question? this.props.question.text.toString(): ''}
                                        onChange= {handleChange} 
                                        //@ts-ignore
                                        label = {"Topic Text"} />
                            }
                        </div>
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
            questions: [], 
            options: {}, 
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

    public optionAdded(orderId: number, qId: number) {
        let newIdx = this.state.options[qId].length + 1;
        let temp_options = this.state.options;
        temp_options[qId][orderId] = {optionId: newIdx, text: ''}
        this.setState({options: temp_options});
    }

    public deleteOption(oId: number, qId: number){
        let optionsCopy = this.state.options;
        for (let i = 0; i < optionsCopy[qId].length; i++) {

            if (optionsCopy[qId][i] && optionsCopy[qId][i].optionId === oId) {
                // @ts-ignore
                optionsCopy[qId][i] = undefined ;
                break;
            }
        }
        this.setState({options: optionsCopy});
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
    
    public setOption(txt: string, oId: number, qId: number ) {
        let optionsCopy = this.state.options;
        for (let i = 0; i < optionsCopy[qId].length; i++) {

            if (optionsCopy[qId][i] && optionsCopy[qId][i].optionId === oId) {
                optionsCopy[qId][i].text = txt;
                break;
            }
        }
        this.setState({options: optionsCopy});
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
                                optionAdded = { (orderId: number, qId: number) => {this.optionAdded(orderId, qId)} }
                                optionChanged = { (qId: number, oId: number, txt: string) => this.setOption(txt, oId, qId) } 
                                deleteOption = {(oId: number, qId: number) => this.deleteOption(oId, qId)}/> 
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