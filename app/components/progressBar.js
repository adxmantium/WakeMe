// /components/progressBar.js

import React, { Component } from 'react'
import * as Progress from 'react-native-progress'

// styles
import { darkTheme } from './../styles/_global'

export default class ProgressBar extends Component{
	constructor(props){
		super(props);

		this.state = {
			progress: 0,
			counter: 1,
			duration: props.duration,
		};
	}

	componentWillMount(){
		this._startTimer();
	}

	componentWillReceiveProps(np){
		const { item: _i } = this.props;
		const { item: _ni, duration: _nd } = np;

		if( _i !== _ni ){
			this._clearTimer();
			this.setState({
				counter: 1,
				progress: 0,
				duration: _nd,
			});
			this._startTimer();
		}
	}

	componentWillUnmount(){
		this._clearTimer();
	}

	_startTimer = () => {
		// every 1/2 second, update progress
		const { duration } = this.state;
		const repeat = 100; // 1000

		this._timer = setInterval(x => {
			const { duration, counter } = this.state;
			const rate = duration / 1000; // duration / 1 sec
			const progress = (((repeat * counter) * 1.2) / duration);

			if( progress >= 1 ) this._clearTimer();

			this.setState({
				progress,
				counter: counter + 1,
			});

		}, repeat);
	}

	_clearTimer = () => clearInterval(this._timer);

	render(){
		return (
			<Progress.Bar 
				progress={this.state.progress}
				width={null}
				color={darkTheme.shade2}
				borderWidth={0}
				borderRadius={0} />
		);
	}
}