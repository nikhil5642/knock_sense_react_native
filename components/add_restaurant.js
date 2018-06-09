import React, { Component } from 'react';
import { Container, Header, Content,Text, Form, Item, Input ,Button,Spinner,Picker} from 'native-base';
import {BackHandler,Alert,Dimensions}from 'react-native'
import * as firebase from 'firebase'
import {StyleSheet} from 'react-native'
import MapView , {PROVIDER_GOOGLE, Marker}from 'react-native-maps'


export default class add_restaurant extends Component{
    constructor(props){
        super(props);
        this.state={image:"sdf",
        name:"",
        tag_line:"",
        description:"",
        offers:"",
        menu:"",
        location_head:"",
        location_description:"",
        location_lat:0,
        location_lon:0,
        key:"",
        review:0,
        review_count:0,
        owner_id: firebase.auth().currentUser.uid,
        location_head_list:[],
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
         
          firebase.database().ref().child("locations").on('value',(snapshot)=> {
            this.setState({location_head_list:("Choose Region,"+snapshot.val()).split(",")})
        });
     }
     
     add_restaurant_firebase(){
if( parseInt(this.state.location_head)==0){
  alert("Region must be selected");
return;
}
      
     firebase.database().ref().child("restaurants").child(this.state.location_head_list[parseInt(this.state.location_head)]).push().then((object)=>   
    
    {
      this.setState({key: object.key})
  
      object.child("info").set({
        "name":this.state.name,
        "tag_line":this.state.tag_line,
        "description":this.state.description,
        "offers":this.state.offers,
        "menu":this.state.menu,
        "location_head":this.state.location_head_list[parseInt(this.state.location_head)],
        "location_description":this.state.location_description,
        "location_lat":this.state.location_lat,
        "location_lon":this.state.location_lon,
        "key":this.state.key,
        "review":this.state.review,
        "review_count":this.state.review_count,
        "owner_id":this.state.owner_id
      })

      firebase.database().ref().child("managers").child(this.state.owner_id).child("restaurant").set(this.state.key)
      firebase.database().ref().child("managers").child(this.state.owner_id).child("region").set(this.state.location_head_list[parseInt(this.state.location_head)])
  
    });
      
      
     }


    render(){
        
       
        return(
            <Container>
            <Form >
            <Item   >
              <Input 
              autoFocus
              placeholder="Title" onChangeText={(email)=>this.setState({"name" :email})}
              onSubmitEditing={(event) => { 
                this.refs.tag._root.focus(); 
              }}  
              />
            </Item>
            <Item >
              <Input
              ref='tag' 
              onSubmitEditing={(event) => { 
                this.refs.description._root.focus(); 
              }}  
              placeholder="Tag Line" onChangeText={(password)=>this.setState({"tag_line":password})}/>
            </Item>
            <Item >
              <Input
              ref="description"
              placeholder="Description" 
              onChangeText={(password)=>this.setState({"description":password})}/>
            </Item>
   
   
   
            <Picker 
            style={styles.picker}
            itemStyle={styles.items}
            selectedValue={ parseInt(this.state.location_head)}
            onValueChange={(cli) => this.setState({"location_head":""+cli})}
            >
            {this.state.location_head_list.map((l, i) => {return <Picker.Item value={i} label={l} key={i}  /> })}
    </Picker>
   
   
   
   
   
     <Item >
              <Input 
              ref="complete_address"
              placeholder="Complete Address" onChangeText={(password)=>this.setState({"location_description":password})}/>
            </Item>
       
            <MapView
            ref="map"
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
            <Text >Add Restaurant</Text>
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