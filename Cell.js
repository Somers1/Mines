import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View,SafeAreaView,TextInput} from 'react-native';

export default class Cell extends Component{
    constructor(props){
    super(props);
        this.state = {
            revealed: 0,
            isMine: props.inMine,
        }
    }

    onReveal = () => {
        this.setState({
            revealed: 1
        });

        if(this.state.isMine){
            this.props.onDie();
        }else{
            this.props.onReveal();
        }
    }
    reset = () => {
        this.setState({
            revealed: 0,
            isMine: false,
        });
        return true
    }
    revealAll = () => {
        if (this.state.revealed == 0)
        this.setState({
            revealed: 2,
        })
    }
    setMine = () => {
        this.setState({isMine: true});
        return true
    }
    render() {
        if (this.state.revealed == 0){
                return(
                    <TouchableOpacity style={styles.square}
                    onPress={this.onReveal}>
                    </TouchableOpacity>
                )
        } 
        else if (this.state.revealed == 1){
            if(this.state.isMine){
                return (
                    <View style={styles.mineSquare}></View>
                )
            }
            else{
                return (
                    <View style={styles.clearSquare}></View>
                )
            }
        }
        else {
            if(this.state.isMine){
                return (
                    <View style={styles.mineSquare2}></View>
                )
            }
            else{
                return (
                    <View style={styles.clearSquare2}></View>
                )
            }
        }
    }
}



const styles = StyleSheet.create({
square:{
    width: 70,
    height: 70,
    backgroundColor: "#484848",
    padding: 0,
    margin: 3,
    borderRadius: 5
  },
clearSquare:{
    width: 70,
    height: 70,
    backgroundColor: 'green',
    padding: 0,
    margin: 3,
    borderRadius: 5
},
mineSquare:{
    width: 70,
    height: 70,
    backgroundColor: 'red',
    padding: 0,
    margin: 3,
    borderRadius: 5
},
clearSquare2:{
    width: 70,
    height: 70,
    backgroundColor: '#085708',
    padding: 0,
    margin: 3,
    borderRadius: 5
},
mineSquare2:{
    width: 70,
    height: 70,
    backgroundColor: '#a80000',
    padding: 0,
    margin: 3,
    borderRadius: 5
}
});