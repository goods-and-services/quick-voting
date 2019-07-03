import React from 'react';
import './bootstrap.min.css';
import { Component } from 'react';

export default class BallotSettingsApp extends React.Component {
    constructor(props: React.Props<any>) {
        super(props);
        this.state={
        }
    }
    
    render() {

        const menuOffset = .3;
        let menuStyle = {
            backgroundColor: 'white',
            opacity: .9,
            marginLeft: window.innerWidth * menuOffset,
            marginRight: window.innerWidth * menuOffset,
            textAlign: 'center',
            height: 50,
            marginTop: 10,
            borderStyle: "solid",
            borderRadius: 10,
            borderWidth: 3,
        } as React.CSSProperties;

        return (
            <div className = 'col-lg-12'>
                <div style = {menuStyle}>
                    {
                        'potato'
                    }
                </div>
            </div>
        );

    }

}