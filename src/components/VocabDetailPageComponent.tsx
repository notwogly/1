import * as React from 'react';
import { Component} from 'react';
import { Link } from 'dva/router';
import {WrappedDetailForm} from './VocabDetailForm';
import {VocabDetailFormProps} from './VocabDetailForm';

export  default class VocabDetailComponent extends Component<VocabDetailFormProps> {
    render() {
        return (
            <div>
                <WrappedDetailForm dispatch={this.props.dispatch} location = {this.props.location} vocabDetail = {this.props.vocabDetail}/>
            </div>
        );
    }
}
