import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Modal
} from 'react-native';
import firebase from 'react-native-firebase';

export default class AlertButton extends React.Component {
    constructor(props) {
        super(props);
        this.alertRef = firebase.database().ref('/Alert');
    }

    state = {
        modalVisible: false,
    };

    setAlert() {
        this.alertRef.child('on').set("True");
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    }

    toggleModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

    render() {
        return(
            <View>
                <View style={styles.alertContainer}>
                    <TouchableHighlight style={styles.alertButton} onPress={() => {this.toggleModalVisible(!this.state.modalVisible)}}>
                        <Text style={styles.alertText}>Alert</Text>
                    </TouchableHighlight>
                </View>

                <View>
                    <Modal
                    animationType="slide"
                    transparent
                    visible={this.state.modalVisible}
                    onRequestClose={() => {}}
                    style={styles.Modal}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Are you sure you want to set of the alarm?</Text>
                            <View style={styles.buttonWrapper}>
                                <TouchableHighlight style={styles.modalButton} onPress={() => {this.setAlert()}}>
                                    <Text style={styles.modalButtonText}>Yes</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.modalButton} onPress={() => {this.toggleModalVisible(!this.state.modalVisible)}}>
                                    <Text style={styles.modalButtonText}>No</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    alertContainer: {
        alignItems: "center"
    },
    alertButton: {
        backgroundColor: "#FF0000",
        elevation: 0,
        width: "80%",
        height: 70,
        justifyContent: "center",
        alignItems: "center"
    },
    alertText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontFamily: "Roboto",
        fontStyle: "italic"
    },
    modalView: {
        width: "90%",
        alignItems: "center",
        backgroundColor: "#FFD230",
        height: 200,
        alignSelf: "center",
        position: "absolute",
        top: 200  
    },
    modalText: {
        color: "#FFFFFF",
        fontSize: 20,
        width: "90%",
        padding: 20,
        fontFamily: "Roboto",
        fontStyle: "italic"
    },
    modalButton: {
        width: "40%",
        alignItems: "center",
        backgroundColor: "#00AAD2",
        padding: 10,
        borderRadius: 20
    },
    modalButtonText: {
        color: "#FFFFFF",
        fontSize: 20
    },
    buttonWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        width: "90%"
    }
});