// /screens/waker/index.js

// /screens/camera/index.js

import { connect } from 'react-redux'
import Video from 'react-native-video'
import React, { Component } from 'react'
import Fab from 'react-native-action-button'
import { NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'

// styles
import { wake } from './../../styles/waker'

// constants
const TIMEMOUT = 5000;

class Waker extends Component{
	constructor(props){
		super(props);

		this.state = {
			index: 0,
			playableItem: props._waker.queue[0],
		};
	}

	componentDidMount(){
		this._playNextItem();
	}

	_playNextItem = () => {
		const { playableItem } = this.state;
		const delay = playableItem.duration ? (playableItem.duration * 1000) : TIMEMOUT;

		setTimeout(() => {
			const { navigation, _waker } = this.props;
			const { queue } = this.props._waker;
			const { index } = this.state;

			if( queue.length - 1 === index ){
				navigation.dispatch( 
					NavigationActions.reset({
				        index: 0,
				        actions: [NavigationActions.navigate({routeName: 'Alarm'})]
			        }) 
				);

			}else{
				const nextIndex = index + 1;

				this.setState({
					index: nextIndex,
					playableItem: queue[nextIndex] || null,
				});

				this._playNextItem();
			}

		}, delay);	
	}

	render(){
		const { queue } = this.props._waker;
		const { index, playableItem } = this.state;

		return (
			<View style={wake.container}>

				<View style={wake.header}>
					<Text style={wake.pagination}>{`${index + 1} / ${queue.length}`}</Text>
				</View>

				{
					playableItem.duration ?
					<Video
						ref={ p => { this._player = p; } }
						source={{uri: playableItem.path}}
						resizeMode="cover"
						repeat={true}
				    	playInBackground={false}
				    	playWhenInactive={false}
				    	onProgress={ this._onProgress }
				    	style={wake.player} />
				    :
				    <Image source={{uri: playableItem.path}} style={wake.file} />
				}

			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		_waker: state._waker,
	}
}

export default connect(mapStateToProps)(Waker);