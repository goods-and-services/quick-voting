import React from 'react';
import './bootstrap.min.css';
import './global.css';
import './ballot-creator.css';
import { Component } from 'react';





function VoteTemplate(props?: {children: Component}) {
    return (
        <div className = 'row'>
            <div className = 'col-lg-2'></div>
            <div className = 'col-lg-8'> 
                <div className = 'menu-style'> hello </div>
            </div>
            <div className = 'col-lg-2'></div>
        </div>
    );

}

export default VoteTemplate;
