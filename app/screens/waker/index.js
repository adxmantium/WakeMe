// /screens/waker/index.js

import { connect } from 'react-redux'
import Video from 'react-native-video'
import React, { Component } from 'react'
import Fab from 'react-native-action-button'
import { NavigationActions } from 'react-navigation'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  Text,
  Image,
  ProgressViewIOS,
  TouchableOpacity,
} from 'react-native'

// components
import ProgressBar from './../../components/progressBar'

// styles
import { wake } from './../../styles/waker'

// constants
import { MIMETYPES } from './../../constants/waker'
const TIMEMOUT = 5000;

/*
	steps:
	- intro
	- wakers
	- closing
*/

class Waker extends Component{
	constructor(props){
		super(props);

		this.state = {
			index: 0,
			playableItem: null,
			isStart: true,
			isEnd: false,
		};
	}

	componentDidMount(){
		// this._playNextItem();
	}

	// _playNextItem = () => {
	// 	const { playableItem } = this.state;
	// 	const delay = playableItem.duration ? (playableItem.duration * 1000) : TIMEMOUT;

	// 	setTimeout(() => {
	// 		const { navigation, _waker } = this.props;
	// 		const { queue } = this.props._waker;
	// 		const { index } = this.state;

	// 		if( queue.length - 1 === index ){
	// 			navigation.dispatch( 
	// 				NavigationActions.reset({
	// 			        index: 0,
	// 			        actions: [NavigationActions.navigate({routeName: 'Alarm'})]
	// 		        }) 
	// 			);

	// 		}else{
	// 			const nextIndex = index + 1;

	// 			this.setState({
	// 				index: nextIndex,
	// 				playableItem: queue[nextIndex] || null,
	// 			});

	// 			this._playNextItem();
	// 		}

	// 	}, delay);	
	// }

	_isVideo = () => {
		const { playableItem } = this.state;

		if( !playableItem ) return false;

		const ext = playableItem.file_path.split('__')[1].split('.')[1];
		const mime = MIMETYPES[ext];
		const isVideo = mime.includes('video'); // is video if mimetype contains video

		return isVideo;
	}

	_onProgress = e => {
		console.log('onProgress: ', e);
	}

	_onLoadStart = e => {
		console.log('onLoadStart: ', e);
	}

	_onLoad = e => {
		console.log('onLoad: ', e);
	}

	_onEnd = e => {
		console.log('onEnd: ', e);
	}

	_onError = e => {
		console.log('onError: ', e);
	}

	_onBuffer = e => {
		console.log('onBuffer: ', e);
	}

	_onTimedMetaData = e => {
		console.log('_onTimedMetaData: ', e);
	}	

	_start = () => {
		const { queue } = this.props._waker;

		this.setState({
			isStart: false,
			playableItem: queue[this.state.index]
		});
	}

	_nextItem = () => {
		const { playableItem, index } = this.state;
		const { queue } = this.props._waker;
		const nextIndex = index + 1;

		if( queue[nextIndex] ){
			this.setState({
				index: nextIndex,
				playableItem: queue[nextIndex]
			});
		}else{
			this.setState({
				playableItem: null,
				isEnd: true,
			});
		}
	}

	_finished = () => {
		this.props.navigation.dispatch( 
			NavigationActions.reset({
		        index: 0,
		        actions: [NavigationActions.navigate({routeName: 'Alarm'})]
	        }) 
		);
	}

	render(){
		const { queue } = this.props._waker;
		const { hour, minute, ampm } = this.props._alarm;
		const { index, playableItem, isStart, isEnd } = this.state;
		const isVideo = this._isVideo();

		return (
			<View style={wake.container}>

				{ playableItem && 
					<View style={wake.header}>
						<Text style={wake.pagination}>{`${index + 1} / ${queue.length}`}</Text>
					</View> 
				}

				{ (!playableItem && isStart) && 
					<View style={wake.start}>
						<Animatable.Text animation="fadeInRight" delay={0} style={wake.startText}>
							This is your
						</Animatable.Text>
						<Animatable.Text animation="fadeInLeft" delay={2000} style={[wake.startText, wake.timeText]}>
							{hour}:{minute}<Text style={wake.ampm}>{ampm}</Text>
						</Animatable.Text>
						<Animatable.Text animation="fadeInRight" delay={3000} style={wake.startText}>
							Wake up call!
						</Animatable.Text>
					</View> 
				}

				{ (!isStart && playableItem && isVideo) && 
					<Video
						ref={ p => { this._player = p; } }
						source={{uri: playableItem.file_path || ''}}
						resizeMode="cover"
						repeat={true}
				    	playInBackground={false}
				    	playWhenInactive={false}
				    	onProgress={ this._onProgress }
				    	onLoadStart={ this._onLoadStart }
				    	onLoad={ this._onLoad }
				    	onEnd={ this._onEnd }
				    	onError={ this._onError }
				    	onBuffer={ this._onBuffer }
				    	onTimedMetaData={ this._onTimedMetaData }
				    	style={wake.player} /> 
				}

				{ (!isStart && playableItem && !isVideo) && 
					<Image source={{uri: playableItem.file_path || ''}} style={wake.file} /> 
				}

				{ (!playableItem && isEnd) && 
					<View style={wake.start}>
						<Animatable.Text animation="fadeInRight" delay={0} style={wake.startText}>
							Rise Up!
						</Animatable.Text>
						<Animatable.Text animation="fadeInLeft" delay={2000} style={[wake.startText, wake.timeText]}>
							Today is yours!
						</Animatable.Text>
						<Animatable.Text animation="fadeInRight" delay={3000} style={wake.startText}>
							Make it great :)
						</Animatable.Text>
					</View> 
				}

				{ !!isStart && <NavButton title="Start" onPress={ this._start } /> }
				{ !!(!isStart && playableItem) && <NavButton title="Next" onPress={ this._nextItem } /> }
				{ !!(!isStart && isEnd) && <NavButton title="Done" onPress={ this._finished } /> }

				{/*
					this._isVideo() ?
					<Video
						ref={ p => { this._player = p; } }
						source={{uri: playableItem.file_path || ''}}
						resizeMode="cover"
						repeat={true}
				    	playInBackground={false}
				    	playWhenInactive={false}
				    	onProgress={ this._onProgress }
				    	onLoadStart={ this._onLoadStart }
				    	onLoad={ this._onLoad }
				    	onEnd={ this._onEnd }
				    	onError={ this._onError }
				    	onBuffer={ this._onBuffer }
				    	onTimedMetaData={ this._onTimedMetaData }
				    	style={wake.player} />
				    :
				    <Image source={{uri: playableItem.file_path || ''}} style={wake.file} />
				*/}

				{/*<View style={wake.progessWrapper}>
					<ProgressBar duration={duration} item={index} />
				</View>*/}

			</View>
		);
	}
}

const NavButton = ({ title, onPress }) => (
	<Animatable.View animation="fadeInLeft" delay={5000}>
		<TouchableOpacity style={[wake.nav, wake.pos1]} onPress={ onPress }>
			<Text style={wake.navTitle}>{ title || 'Next' }</Text>
			<Icon name="chevron-right" size={16} style={wake.navIcon} />
		</TouchableOpacity>
	</Animatable.View>
)

const mapStateToProps = (state, props) => {
	return {
		_alarm: state._alarm,
		_waker: state._waker,
	}
}

export default connect(mapStateToProps)(Waker);