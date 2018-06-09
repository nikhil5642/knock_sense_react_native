import React, { Component } from 'react';
import { Container, Header, Content,Text, Form, Item, Input ,Button} from 'native-base';
import * as firebase from 'firebase';
import {StyleSheet} from 'react-native'
import { NavigationActions } from 'react-navigation';

export default class login extends Component{
    constructor(props){
        super(props);
        this.state={email: "",
                    password: ""}
    }   
   
   
    create_user(user){
      firebase.database().ref().child("managers").child(firebase.auth().currentUser.uid).set({
        "email":this.state.email,
        "restaurant":"norestaurant"
      });
      this.props.navigation.navigate("home");
    }
    signup_firebase(){
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((user)=>{user ?this.create_user() : null})
    .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode == 'auth/weak-password') {
    alert('The password is too weak.');
  } else {
    alert(errorMessage);
  }
  console.log(error);
});
    }

    login_firebase(){
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user)=>{user ? this.props.navigation.navigate("home"): null})
         .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
    
  }
  componentWillMount(){
      firebase.auth().onAuthStateChanged((user)=> {
        user ? this.props.navigation.navigate("home"):null
      });
      
  }
    render(){  
        return(
            <Container>
          <Form >
            <Item>
              <Input placeholder="Email" onChangeText={(email)=>this.setState({"email" :email})}/>
            </Item>
            <Item >
              <Input 
               secureTextEntry
              placeholder="Password" onChangeText={(password)=>this.setState({"password":password})}/>
            </Item>
           <Button full
           style={styles.SubmitButtonStyle}
            onPress={()=>this.login_firebase()}>
            <Text >Log In</Text>
            </Button>
            <Button full
            style={styles.SubmitButtonStyle}
            onPress={()=>this.signup_firebase()}>
            <Text >Sign Up</Text>
            </Button>
          </Form>
      </Container>
     
        );    }       
}
const styles = StyleSheet.create({

    SubmitButtonStyle: {
   
      marginTop:10,
      paddingTop:15,
      paddingBottom:15,
      marginLeft:30,
      marginRight:30,
      backgroundColor:'#00BCD4',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#00BCD4'
    }   
  });