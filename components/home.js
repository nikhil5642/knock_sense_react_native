import React, { Component } from 'react';
import { Container, Header, Content,Text, Form, Item, Input ,Button} from 'native-base';
import {BackHandler,Alert,StyleSheet}from 'react-native'
import * as firebase from 'firebase'
export default class home extends Component{
    constructor(props){
        super(props);
        this.state={uid: firebase.auth().currentUser.uid,
                    restaurant:"norestaurant",
                    region:"",         
        }
    } 
    
  componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', function() {
            Alert.alert(
                'Exit App',
                'Exiting the application?',
                [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => BackHandler.exitApp() },
                ],
                { cancelable: false }
                )
                return true;
          });
        
          firebase.database().ref().child("managers").child(this.state.uid).on('value',(snapshot)=> {
                this.props.navigation.navigate((""+snapshot.val().restaurant).includes("norestaurant") ? "add_restaurant":"home")
                this.setState({"restaurant":(""+snapshot.val().restaurant),
                "region":(""+snapshot.val().region)
            })
            });
        }

    render(){
        return(
            <Container>
                <Form>
           <Button full
            style={styles.SubmitButtonStyle}
            onPress={()=>this.props.navigation.navigate("restaurant",{
                "uid":this.state.uid,
                "restaurant_id":this.state.restaurant,
                "region":this.state.region
            })}
            >
            <Text >Edit Restaurant</Text>
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
    }   ,
    map: {
      height:150,
      marginTop:30,
      paddingTop:15,
      paddingBottom:15,
      marginLeft:30,
      marginRight:30,
    },
  });