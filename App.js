import  * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { Header } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import db from "./localdb.js";
import PhonicSoundButton from "./components/PhonicSoundButton.js"

export default class App extends React.Component{
  constructor(){
    super();
    this.state ={
      text: '',
      chunks: [],
      phonicSounds: []
    }
  }



  render(){
    return(
    
      <SafeAreaProvider>
        <View style={styles.container}> 
          <Header
          backgroundColor={"#0098DB"}
          centerComponent={{
            text: "Monkey-Chunkey",
            style: {color: 'white', fontSize: 25}
          }}
          />
          
          <Image style={styles.image} source={{uri: "https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png"}}/>

          <TextInput style={styles.input} onaChangeText={text => this.setState({text:text})} />

          <TouchableOpacity style={styles.button}
            onPress={()=>{
              var word = this.state.text.toLowerCase().trim()
              db[word] ? (
          this.setState({chunks: db[word].chunks}),
          this.setState({phonicSounds: db[word].phones})
              ) : alert("Não existe seu burro!!")
        }}
          >
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
            <View> 
              {
                this.state.chunks.map((item, index)=>{
                  return(
                    <PhonicSoundButton 
                      wordChunk={this.state.chunks[index]}
                      soundChunk={this.state.phonicSounds[index]}
                    />
                  )
                })
              }
            </View>
        </View>
      </SafeAreaProvider>
    )
  }

}

const styles  = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
  input: {
    marginTop: 150,
    width: "80%",
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4
  },
  button:{
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#0098DB',
    borderRadius: 20,
    margin: 10
  },
  buttonText:{
    textAlign: 'center',
    fontSize: 20
  },
  image:{
    width: 150,
    height: 150,
    alignSelf: 'center'
  },
  chunkButton:{
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '0098DB',
    borderRadius: 20,
    margin: 10
  }
})