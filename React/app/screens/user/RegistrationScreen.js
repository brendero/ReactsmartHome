import React, { Component } from 'react';
import {StyleSheet, 
        Text, 
        View,
        Image, 
        Dimensions, 
        TouchableOpacity, 
        TextInput,
        AsyncStorage
      } from 'react-native';
import firebase from 'react-native-firebase';
import validate from '../../components/Forms/ValidateWrapper';
import * as Animatable from 'react-native-animatable';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Menu from '../Menu';
import LogInScreen from './LogInScreen';
import { createStackNavigator } from 'react-navigation'; 

const Navigation = createStackNavigator(
    {
        Home: {
            screen: Menu,
            navigationOptions({ navigation }) {
                return {
                    title: 'Menu',
                }
            }
        },
        LogInScreen: {
            screen: LogInScreen,
            navigationOptions({ navigation }) {
                return {
                    title: 'Login',
                }
            }
        }
    }
);

export default class RegistrationScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            username: '',
            usernameError: '',
        }
    }

    register() {

        const emailError = validate('email', this.state.email)
        const passwordError = validate('password', this.state.password)
        const usernameError = validate('username', this.state.username)
    
        this.setState({
          emailError: emailError,
          passwordError: passwordError,
          usernameError: usernameError
        })

    
        if (emailError == null && passwordError== null && usernameError == null) {
            let date = new Date();
            day = date.getDate();
            month = date.getMonth();
            year = date.getFullYear();
            hours = date.getUTCHours() + 2;
            minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();

            firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password, this.state.username)
            .then(async (user) => {
                firebase.database().ref('Users/' + user.user._user.uid).set({
                    createdAt: day + month + year,
                    email: user.user._user.email,
                    username: this.state.username,
                  });
                  this.props.navigation.navigate('Home');
            })
            .catch((error) => {
                const { code, message } = error;
            });
        }
    }


    render(){
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                <Animatable.Image animation="slideInDown" direction="alternate" source={require('../../assets/Logo.png')} style={{alignSelf:'center', resizeMode:'contain', width:"60%", marginBottom:50}}/>
                    <View>
                        <View style={styles.inputContainer}>
                            <FontAwesome style={styles.inputIcon}>{Icons.userCircle}</FontAwesome>
                            <TextInput 
                                style={styles.TextField}
                                placeholder="gebruikersnaam"
                                placeholderTextColor="#FFFFFF"
                                selectionColor={"#FFFFFF"}
                                underlineColorAndroid={"transparent"}
                                onChangeText={value => {
                                    this.setState({
                                        username: value.trim()
                                    })
                                }}
                                onBlur={() => {
                                    this.setState({
                                        usernameError: validate('username', this.state.username)
                                    })
                                }}
                                error={this.state.usernameError}/>
                        </View>
                        <Text style={styles.validation}>{this.state.usernameError}</Text>
                    </View>
                    <View>
                        <View style={styles.inputContainer}>
                            <FontAwesome style={styles.inputIcon}>{Icons.envelopeSquare}</FontAwesome>
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
                            <FontAwesome style={styles.inputIcon}>{Icons.lock}</FontAwesome>
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
                            <TouchableOpacity onPress={() => {this.register()}} style={styles.loginButton}>
                                <Text style={{color:'#FFFFFF'}}>Register</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    </Animatable.View>


                        <Animatable.View animation="bounceIn">
                            <Text style={styles.warning}>{this.state.error}</Text>
                        </Animatable.View>
                        <View>
                            <TouchableOpacity onPress={() => navigate('LogInScreen')}>
                                <Text style={styles.register}>Back to login</Text>
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
    },
    inputIcon: {
        alignSelf:'center', 
        marginLeft: 7, 
        marginRight: 7, 
        color: '#FFFFFF'
    }
});