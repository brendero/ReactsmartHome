import React, { Component } from 'react';
import {StyleSheet, 
        Text, 
        View,
        Dimensions, 
        TouchableOpacity,
        TextInput, 
        Image,
        AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import * as Animatable from 'react-native-animatable';
import validate from '../../components/Forms/ValidateWrapper';

export default class LogInScreen extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            error: '',
        }
    }

    loggedIn(){
        this.props.navigation.navigate('Home');
    }

    onLogin() {

        const emailError = validate('email', this.state.email)
        const passwordError = validate('password', this.state.password)
    
        this.setState({
          emailError: emailError,
          passwordError: passwordError
        })
        if (emailError == null && passwordError == null) { 
            firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
            .then(async (user) => {
                this.itemsRef = firebase.database().ref('Users/' + user.user._user.uid);
                let database = this.itemsRef.once('value');
                database.then(items => {
                    AsyncStorage.setItem('@MySuperStore:user', JSON.stringify(items));
                });
                this.loggedIn();
            })
            .catch((error) => {
            const { code, message } = error;
            this.setState({
                error: error.toString()
            })
            console.log(this.state.error)
            });
        }
    }

    render(){
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <Image source={require('../../assets/Logo.png')} style={{alignSelf:'center', resizeMode:'contain', width:"60%", marginBottom:50}}/>
                    <View>
                        <View style={styles.inputContainer}>
                            <FontAwesome>{Icons.chevronLeft}</FontAwesome>
                            <TextInput 
                                style={styles.TextField}
                                placeholder="E-mail"
                                placeholderTextColor="#FFFFFF"
                                selectionColor={"#FFFFFF"}
                                underlineColorAndroid={"transparent"}
                                onChangeText={value => {
                                    this.setState({
                                        email: value.trim()
                                    })
                                }}
                                onBlur={() => {
                                    this.setState({
                                        emailError: validate('email', this.state.email)
                                    })
                                }}
                                error={this.state.emailError}/>
                        </View>
                        <Text style={styles.validation}>{this.state.emailError}</Text>
                    </View>
                    <View>
                        <View style={styles.inputContainer}>
                            <FontAwesome style={{fontFamily:"FontAwesome"}}>{Icons.chevronLeft}</FontAwesome>
                            <TextInput 
                                style={styles.TextField}
                                placeholder="Password"
                                placeholderTextColor="#FFFFFF"
                                selectionColor={"#FFFFFF"}
                                underlineColorAndroid={"transparent"}
                                secureTextEntry={true}
                                onChangeText={value => {
                                    this.setState({
                                        password: value.trim(),
                                        passwordError: validate('password', this.state.password)
                                    })
                                }}
                                onBlur={() => {
                                    this.setState({
                                        passwordError: validate('password', this.state.password)
                                    })
                                }}
                                error={this.state.passwordError}/>
                        </View>
                        <Text style={styles.validation}>{this.state.passwordError}</Text>
                    </View>
                    <Animatable.View animation="pulse" delay={5000} durarion={10000} iterationCount="infinite">
                        <Animatable.View animation="zoomIn">
                            <TouchableOpacity onPress={() => {this.onLogin()}} style={styles.loginButton}>
                                <Text style={{color:'#FFFFFF'}}>Login</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    </Animatable.View>

                        <Animatable.View animation="bounceIn">
                            <Text style={styles.warning}>{this.state.error}</Text>
                        </Animatable.View>
                        <View>
                            <TouchableOpacity onPress={() => navigate("Home")}>
                                <Text style={styles.register}>Don't have an account? Register.</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30, 
        backgroundColor: '#00AAD2',
        width: Dimensions.get('window').width,
    },
    labels: {
        color: 'white',
        fontSize: 18
    },
    inputContainer: {
        borderWidth: 1,
        borderRadius: 30,
        width:'80%',
        alignSelf: 'center',
        borderColor: '#FFFFFF',
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    TextField: {
        flex:3,
        padding: 2,
        color: 'white',
        fontSize: 15
    },
    loginButton: {
        backgroundColor: '#FFD230',
        width: '80%',
        borderRadius: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height:50
    },
    validation: {
        color: 'white',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 25,
        fontWeight: '700',
    },
    register: {
        textAlign: 'center',
        color: 'white',
        paddingTop: 10,
    },
    warning: {
        textAlign: 'center',
        color:  '#F06449',
        paddingBottom: 15
    }
});