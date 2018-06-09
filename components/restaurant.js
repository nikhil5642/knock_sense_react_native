import React, { Component } from 'react';
import { Container, Header, Content,Text, Form, Item, Input ,Button,Spinner,Picker} from 'native-base';
import {BackHandler,Alert,Dimensions}from 'react-native'
import * as firebase from 'firebase'
import {StyleSheet} from 'react-native'
import MapView , {PROVIDER_GOOGLE, Marker}from 'react-native-maps'


export default class restaurant extends Component{
    constructor(props){
        super(props);
        this.state={image:"sdf",
        name:"",
        tag_line:"",
        description:"",
        offers:"",
        menu:"",
        location_head:"-1",
        location_description:"",
        location_lat:0,
        location_lon:0,
        key:"",
        review:0,
        review_count:0,
        owner_id: "",
        location_head_list:[],
        region:""
        }
    } 
    
    onRegionChange(region, lastLat, lastLong) {
      this.setState({
        mapRegion: region,
        // If there are no new values set the current ones
        lastLat: lastLat || this.state.lastLat,
        lastLong: lastLong || this.state.lastLong
      });
    }
  componentWillMount(){
          var uid = this.props.navigation.getParam("uid", 'NO-ID');
          var restaurant_id = this.props.navigation.getParam("restaurant_id", 'some default value');
          var region = this.props.navigation.getParam("region", 'some default value');
          this.setState({
              "owner_id":""+uid,
              "key":""+restaurant_id,
              "location_head":region
          })
          firebase.database().ref().child("locations").on('value',(snapshot)=> {
            this.setState({location_head_list:("Choose Region,"+snapshot.val()).split(",")})
        });
              
        firebase.database().ref().child("restaurants").child(region).child(restaurant_id).child("info").on('value',(snapshot)=> {
             this.setState(snapshot.val())


       });  
   }
     
     add_restaurant_firebase(){
         firebase.database().ref().child("restaurants").child(this.state.region).child(this.state.key).child("info").set({
            "name":this.state.name,
            "tag_line":this.state.tag_line,
            "description":this.state.description,
            "offers":this.state.offers,
            "menu":this.state.menu,
            "location_head":this.state.location_head,
            "location_description":this.state.location_description,
            "location_lat":this.state.location_lat,
            "location_lon":this.state.location_lon,
            "key":this.state.key,
            "review":this.state.review,
            "review_count":this.state.review_count,
            "owner_id":this.state.owner_id
          })
      }
    render(){       
        return(
            <Container>
            <Form >
            <Item   >
              <Input 
              autoFocus
              placeholder="Title" 
              value={this.state.name}
              onChangeText={(email)=>this.setState({"name" :email})}
              />
            </Item>
            <Item >
              <Input
               placeholder="Tag Line"
              value={this.state.tag_line}
              onChangeText={(password)=>this.setState({"tag_line":password})}/>
            </Item>
            <Item >
              <Input
              value={this.state.description}
             placeholder="Description" 
              onChangeText={(password)=>this.setState({"description":password})}/>
            </Item>
             <Item >
            <Input 
              value={this.state.location_description}
              placeholder="Complete Address" onChangeText={(password)=>this.setState({"location_description":password})}/>
            </Item>
       
            <MapView
          showsUserLocation={true}
          followUserLocation={true}
          style={styles.map} 
          onPress={(e)=>{this.setState({"location_lat":e.nativeEvent.coordinate.latitude,
                                         "location_lon":e.nativeEvent.coordinate.longitude})}}>
         <MapView.Marker
            coordinate={{latitude: this.state.location_lat,longitude: this.state.location_lon}}
            title={this.state.name}
            description={this.state.location_head}
         />
  </MapView>
            <Button full
            style={styles.SubmitButtonStyle}
            onPress={()=>this.add_restaurant_firebase()}>
            <Text >Save Changes</Text>
            </Button>
           </Form>
       
       
          </Container>
    );  
        }
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