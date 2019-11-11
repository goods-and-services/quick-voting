import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import TextInput from './TextInput';
import React from 'react';
import './bootstrap.min.css';
import './global.css';
import './BallotSettingsApp.css';
import { faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




interface SettingsProps {
    goBack(): void,
    voteType: string,
    labels: Array<string>,
    callbacks:Array<(changedVal: any) => void>,
    inputType:Array<string>,
    initialValues: Array<any>,
}

const useStyles = makeStyles(theme => ({
    root: {
      width: 500,
    },
    margin: {
      height: theme.spacing(4),
    },
}));



function CreditSlider(label: string, value: number, onChange:(event: object, val:any) => void ){
    const styles = useStyles()
    return(
        <div>
            <div>
                {label}
            </div>
            <div className={styles.margin}>
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



function TextInputWrapper(label: string, value: string, onChange:(event: any) => void ){
    return (
        <div>
            <div>
                {label}
            </div>
            <TextInput id = {"potato"}
                    value={value}
                    onChange= {onChange} 
                    //@ts-ignore
                    label = {label} />
        </div>
    )
}


function getNextElement(inputType: string, label: string, initialValue: any, callback: (val:any)=>void) {
    let content = undefined

    if (inputType === 'slider'){
        content = CreditSlider(label, initialValue, (obj: object, val: number)=>{callback(val)})
    } else if (inputType === 'input'){
        content = TextInputWrapper(label, initialValue,(obj: any)=>{callback(obj.target.value)})
    }

    return (
        <div className='row'>
            <div className='col-2'/>
            <div className='col-8'>
                {content}
            </div>
            <div className='col-2'/>
        </div>

    )
}

export function Settings(props: SettingsProps ) {
    return (
        <div className = 'col'>
            <div className='row'>
                <div className="col-2">
                    <div className="global-text-style-lg">
                        <span className='back-choose'
                            onClick={props.goBack}>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft}/>
                        </span>
                    </div>
                </div>
                <div className="col-10"/>
            </div>
            {
                props.inputType.map((elem: string, i: number) => {
                    return getNextElement(elem, props.labels[i], 
                        props.initialValues[i], props.callbacks[i]);
                })
            }
        </div>
    )
}