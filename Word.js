import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { styles } from './App.js';

const style = {
  slidingWords: {
    color: '#000000',
    fontWeight: 'bold',
  }
}

export default class Word extends React.Component {
  constructor(){
    super();

    this.state = {
      words: []
    }
  }

  componentDidMount(){
    this.fetchWords()
  }

  // fetching words from NEWS API...
    fetchWords = () => {
      let url = 'https://newsapi.org/v2/top-headlines?' +
            'country=us&' +
            'apiKey=277ca875809f4f6484e5d830b2158bef'
      fetch(url)
      .then(r => r.json())
      .then(response => {
        response.articles.forEach(article => {
        if (article.description != null) {
            article.description.split(" ").forEach(word => {
                word = word.replace(/[^a-zA-Z0-9 -]/g,"")
                if( word == "" || word == " " || word == "--" ){

                } else {
                  this.setState({words: [...this.state.words, word]})
                }
                // fetch works properly
           })
          }
        })
      })
    }

    renderWord = () => {
      return(<Text style={style.slidingWords}>-- {this.state.words[1]} --</Text>)
    }

    render(){
      return(this.renderWord())
    }
}
