import React, { Component } from 'react';
import './text-input.css';


interface TextInputProps {
    id: string,
    locked?: boolean,
    focussed?: boolean,
    value?: string,
    error?: string,
    label?: string,
    onChange?: (event:any) => void,
}


export default class TextInput extends Component<TextInputProps,any> {
    static defaultProps = {
        locked: false,
        focussed: false,
        value: '',
        error: '',
        label: '',
        onChange: () => '',
     };

     constructor(props: TextInputProps) {
        super(props);
        this.state = {
            focussed: (props.locked && props.focussed) || false,
            value: props.value || '',
            error: props.error || '',
            label: props.label || '',
        };
        this.onChange = this.onChange.bind(this);
      }

    onChange = (event: any) => {
        const value = event.target.value;
        this.setState({ value, error: '' });

        //@ts-ignore
        return this.props.onChange(event);
    }


    public render() {
        const { focussed, value, error, label } = this.state;
        const { id, locked } = this.props;

        const fieldClassName = `field ${(locked ? focussed : focussed || value) && 'focussed'} ${locked && !focussed && 'locked'}`;

        return (
            <div className={fieldClassName}>
                <input
                id={id}
                type="text"
                value={value}
                placeholder={label}
                onChange={this.onChange}
                onFocus={() => !locked && this.setState({ focussed: true })}
                onBlur={() => !locked && this.setState({ focussed: false })}
                />
                <label htmlFor={id} className={error && 'error'}>
                    {error || label}
                </label>
            </div>
        );
    }
}