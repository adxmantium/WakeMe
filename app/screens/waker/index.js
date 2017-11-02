// /screens/waker/index.js

import { connect } from 'react-redux'
import { Spinner } from 'native-base'
import Video from 'react-native-video'
import React, { Component } from 'react'
import Fab from 'react-native-action-button'
import * as Progress from 'react-native-progress'
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

// styles
import { wake } from './../../styles/waker'
import { darkTheme } from './../../styles/_global'

// constants
import { MIMETYPES } from './../../constants/waker'

/*
	sections:
	- intro
	- wakers
	- closing
*/

class Waker extends Component{
	constructor(props){
		super(props);

		this.state = {
			index: 0,
			progress: 0,
			isEnd: false,
			isStart: true,
			isLoading: false,
			playableItem: null,
		};
	}

	_isVideo = () => {
		const { playableItem } = this.state;

		if( !playableItem ) return false;

		const ext = playableItem.file_path.split('__')[1].split('.')[1];
		const mime = MIMETYPES[ext];
		const isVideo = mime.includes('video'); // is video if mimetype contains video

		return isVideo;
	}

	_onProgress = e => {
		// console.log('onProgress: ', e);
		if( this.state.isLoading ) this._onLoadEnd();
		this.setState({progress: e.currentTime});
	}

	_onLoadStart = e => this.setState({isLoading: true});

	_onLoadEnd = e => this.setState({isLoading: false});

	_onLoad = e => {
		console.log('onLoad: ', e);
	}

	_onEnd = e => {
		// console.log('onEnd: ', e);
		// triggered when video is done playing
		this.setState({progress: 0});
	}

	_onError = e => {
		// console.log('onError: ', e);
	}

	_onBuffer = e => {
		// console.log('onBuffer: ', e);
	}

	_onTimedMetaData = e => {
		// console.log('_onTimedMetaData: ', e);
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
		const { index, playableItem, isStart, isEnd, isLoading, progress } = this.state;
		const isVideo = playableItem && this._isVideo();

		return (
			<View style={wake.container}>

				{ (playableItem && !isLoading) && 
					<View style={wake.header}>
						<View>
							<Animatable.Text animation="fadeInLeft" delay={0} style={[wake.from, wake.txtShadow]}>
								Wake up call from
							</Animatable.Text>
							<Animatable.Text animation="fadeInLeft" delay={1000} style={wake.fromWho}>
								{ playableItem.from_name }
							</Animatable.Text>
						</View>
						<Animatable.Text animation="fadeInRight" delay={0} style={[wake.pagination, wake.txtShadow]}>
							{`${index + 1} / ${queue.length}`}
						</Animatable.Text>
					</View> 
				}

				{ (!playableItem && isStart) && 
					<ThreeLineMessage 
						row1="This is your" 
						row2={`${hour}:${minute}`}
						row2component={<Text style={wake.ampm}>{ampm}</Text>}
						row3="Wake up call!" /> 
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
					<Image 
						source={{uri: playableItem.file_path || ''}} 
						onLoadStart={ this._onLoadStart }
						onLoadEnd={ this._onLoadEnd }
						style={wake.file} /> 
				}

				{ (!playableItem && isEnd) && 
					<ThreeLineMessage 
						row1="Rise Up!" 
						row2="Today is yours!" 
						row3="Make it great :)" /> 
				}

				{ isLoading && 
					<View style={wake.loader}>
						<Spinner color={darkTheme.shade2} style={wake.spinner} />
					</View> }

				{ !!isStart && <NavButton title="Start" onPress={ this._start } /> }
				{ !!(!isStart && playableItem && !isLoading) && <NavButton title="Next" onPress={ this._nextItem } /> }
				{ !!(!isStart && isEnd) && <NavButton title="Done" onPress={ this._finished } /> }

				{ (!isStart && playableItem && isVideo) && 
					<View style={wake.progessWrapper}>
						<Progress.Bar 
							progress={ progress }
							width={null}
							color={ darkTheme.shade1 }
							borderWidth={0}
							borderRadius={0} />
					</View>
				}

			</View>
		);
	}
}

const ThreeLineMessage = ({ row1, row2, row2component, row3 }) => (
	<View style={wake.start}>
		<Animatable.Text animation="fadeInRight" delay={0} style={wake.startText}>
			{ row1 }
		</Animatable.Text>
		<Animatable.Text animation="fadeInLeft" delay={1200} style={[wake.startText, wake.timeText]}>
			{ row2 }{ row2component || null }
		</Animatable.Text>
		<Animatable.Text animation="fadeInRight" delay={2400} style={wake.startText}>
			{ row3 }
		</Animatable.Text>
	</View>
)

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