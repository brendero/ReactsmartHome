import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import firebase from 'react-native-firebase';
let WebRTC = require('react-native-webrtc');
let {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    getUserMedia,
  } = WebRTC;

let newArray = [];  
let pc2;
const servers = {"iceServers": [{"urls": "stun:stun3.l.google.com:19302"}]};

  
export default class Livestream extends React.Component {
    constructor(props){
        super(props);
        this.rtcRef = firebase.database().ref('/rtc');
        this.state = {
            videoURL: null,
            msg: null
        }
        this._gotRemoteStream = this._gotRemoteStream.bind(this);
    }     
    
    componentDidMount() {
        let database = this.rtcRef.once('value');
        database.then(items => {
            rtcData = items._value;
            newArray = rtcData;
            this.setState({
                msg: newArray
            })
            this._setupconnection();
        });
    }
    
    _setupconnection() {
        pc2 = new RTCPeerConnection(servers);
        pc2.setRemoteDescription(new RTCSessionDescription(this.state.msg['localRTC'])).then(console.log("succesfully set remote description"))
        pc2.createAnswer()
        .then(this._onCreateAnswerSuccess)
        pc2.onaddstream = this._gotRemoteStream;
    }
            

    _onCreateAnswerSuccess(desc) {
        pc2.setLocalDescription(desc).then(console.log("succes localdescription"));
        firebase.database().ref('/rtc').child('/remoteRTC').set({
            sdp: desc.sdp,
            type: desc.type
        })
    }    

    _gotRemoteStream(e) {
        console.log(e.stream);
        this.setState({
            videoURL: e.stream.toURL()
        })
    }

    render() {
        return (
            <View>
              <RTCView streamURL={this.state.videoURL} style={styles.videoView}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    videoView: {
        width: 200,
        height: 150
    }
})