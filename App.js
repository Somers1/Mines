import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View ,TextInput, TouchableOpacity} from 'react-native';
import Cell from './Cell';

export default class App extends Component {
    constructor(props){
      super(props)
      this.state = {
          balance: 100,
          mineAmount: 2,
          betAmount: 5,
          multi: 1.00,
          profit: 0.00,
          revCount: 1,
          betting: false
      }
      this.grid = Array.apply(null, Array(5)).map((el,idx) => {
        return Array.apply(null, Array(5)).map((el,idx) => {
          return null;
        });
      });
    }

    render(){
      return (
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}> 
            <Text style={styles.balanceText}>Balance: ${parseFloat(this.state.balance).toFixed(2)} </Text>
            <TouchableOpacity style={{
              marginTop: 30,
              marginBottom: 10,
              marginLeft: 10,
              borderWidth: 2,
              borderColor: 'green',
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center'
            }} onPress={this.plusBalance}><Text style={styles.balancePlus}>+</Text></TouchableOpacity>
          </View>
            
            {this.renderControls()}
            {this.renderBoard()}
          <StatusBar style="auto" />
        </View>
      );
    }
    plusBalance = () => {
      if (this.state.balance <= 0.2){
        this.setState({balance: 20})
        alert("$20 Added to balance")
      }else {
        alert("You still have money.")
      }
    }
    onDie = () => {
      for(let i=0; i<5; i++){
        for(let j=0; j<5; j++){
            this.grid[i][j].revealAll();
        }
    }
      this.setState({
        betting: false,
        multi: 1.0,
        revCount: 1,
        profit: 0.00
      })
    }

    onReveal = () =>{
      let winOdds = (this.rFact(25)*this.rFact(25-this.state.revCount-this.state.mineAmount))/
                    (this.rFact(25-this.state.mineAmount)*this.rFact(25-this.state.revCount));
      let multiplier = winOdds*0.97;
      this.setState({
        multi: multiplier,
        revCount: this.state.revCount + 1,
        profit: this.state.betAmount*multiplier
        })

    }
   rFact(num)
    {
      var rval=1;
      for (var i = 2; i <= num; i++)
          rval = rval * i;
      return rval;
    }
    placeMines = () => {
      if (this.state.balance-this.state.betAmount < 0)
      {
        alert("Insuficient Funds")
        return
      }
      if (this.state.betting) {
        this.betbtn.
        alert("Already in a game")
        return
      }
      this.resetGame();
      this.setState({multi: 1.00, balance: this.state.balance - this.state.betAmount, betting: true, profit:this.state.betAmount, revCount: 1})
      // console.log("Game:")

      var arr = [];
      while(arr.length < this.state.mineAmount){
          var m = Math.floor(Math.random() * 25);
          if(arr.indexOf(m) === -1) arr.push(m);
      }
      // console.log(arr);
      var col = 0;
      var row = 0;
      for(let i = 0; i < arr.length; i++){
        if (arr[i] < 5){
          row = 0;
          col = arr[i]
        }
        if (arr[i] < 10 && arr[i] > 4){
          row = 1;
          col = arr[i]-5;
        }
        if (arr[i] < 15 && arr[i] > 9){
          row = 2;
          col = arr[i]-10;
        }
        if (arr[i] < 20 && arr[i] > 14){
          row = 3;
          col = arr[i]-15;
        }
        if (arr[i] < 25 && arr[i] > 19){
          row = 4;
          col = arr[i]-20;
        }
        this.grid[col][row].setMine();
        // console.log(row + " " + col);
      }
    }

    resetGame = () => {
      for(let i=0; i<5; i++){
          for(let j=0; j<5; j++){
              while(!this.grid[i][j].reset());
          }
      }
  }
  cashout = () => {
    this.setState({
      balance: this.state.balance + this.state.profit,
      betting: false,
      revCount: 1,
      multi: 1.0,
      profit: 0.00
    })
    for(let i=0; i<5; i++){
      for(let j=0; j<5; j++){
          this.grid[i][j].revealAll();
      }
  }
  }
    renderBoard(){
        return Array.apply(null, Array(5)).map((el,rowidx) => {
          let cellList = Array.apply(null, Array(5)).map((el,colidx) => {
              return <Cell 
              onReveal={this.onReveal}
              onDie = {this.onDie}
              key={colidx} 
              ref={(ref) => {this.grid[colidx][rowidx] = ref}}
              />
          });
          

          return(
            <View key = {rowidx} style = {{flexDirection: 'row'}}>
              {cellList}
            </View>
          )
        });
    }

    buttonStyle(betn){
      if (betn)
      {
        return {      
          width: 320,
          height: 50,
          backgroundColor: "#808080",
          padding: 0,
          marginBottom:10,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
      }
      }else{
        return {      
          width: 320,
          height: 50,
          backgroundColor: "green",
          padding: 0,
          marginBottom:10,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
      }
      }
      
    }

    renderControls(){
      return(
        <View style = {{backgroundColor: '#484848', marginBottom:20}}>
          <View style={{flexDirection: 'row'}}>
            <View style = {{margin: 10}}>
              <Text style={styles.textControls}>Bet Amount</Text>
              <TextInput style={styles.inputControls}
              onChangeText={(betAmount) => this.setState({betAmount})}
              keyboardType = {'number-pad'}
              clearTextOnFocus = {true}
              defaultValue = {"5"}
              editable = {!this.state.betting}
              />
            </View>
            <View style = {{margin:10}}>
              <Text style={styles.textControls}>Number of Mines</Text>
              <TextInput style={styles.inputControls}
              onChangeText={(mineAmount) => this.setState({mineAmount})}
              keyboardType = {'number-pad'}
              defaultValue = {"2"}
              />
            </View>
          </View>
          <View style={{alignItems: 'center',justifyContent:'center'}}>
            <TouchableOpacity 
            style={this.buttonStyle(this.state.betting)} disabled = {this.state.betting}
            onPress={this.placeMines}>
              <Text style={{
                    fontSize: 15,
                    color: "#303030",
                    fontWeight: 'bold'
              }}>
                Bet
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.buttonStyle(!this.state.betting)} disabled = {!this.state.betting}
            onPress={this.cashout}>
              <Text style={{
                    fontSize: 15,
                    color: "#303030", 
                    fontWeight: 'bold'
              }}>
                Cashout
              </Text>
            </TouchableOpacity>
          </View>
          <View>
              <Text style= {{fontSize: 15,color: 'white', marginBottom: 10,marginLeft:10}}> 
              Total ({parseFloat(this.state.multi).toFixed(2)}x):   ${parseFloat(this.state.profit).toFixed(2)}
              </Text>
            </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceText: {
    fontSize: 20,
    color: 'white',
    marginTop: 30,
    marginBottom: 10
  },
  balancePlus: {
    fontSize: 20,
    color: 'white',
  },
  inputControls: {
    width: 150,
    height: 40,
    backgroundColor: '#303030',
    color: 'white',
    textAlign: 'center',
  },
  textControls: {
    fontSize: 15,
    color: 'white',
    marginBottom: 2
  },
});
