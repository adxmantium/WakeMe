// /components/progressBar.js

import React, { Component } from 'react'
import * as Progress from 'react-native-progress'

// styles
import { darkTheme } from './../styles/_global'

export default class ProgressBar extends Component{
	constructor(props){
		super(props);

		console.log('total duration: ', props.duration);
		this.state = {
			progress: 0,
			counter: 1,
			duration: props.duration,
		};
	}

	componentWillMount(){
		// every 1/2 second, update progress
		const { duration } = this.state;
		const repeat = 50; // 

		this._timer = setInterval(x => {
			const { duration, counter } = this.state;
			const progress = ((repeat * counter) / duration);

			if( progress >= 1 ) clearInterval(this._timer);

			this.setState({
				progress,
				counter: counter + 1,
			});

		}, repeat);
	}

	componentWillUnmount(){
		clearInterval(this._timer);
	}

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