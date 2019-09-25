import React from 'react';
import logo from './logo.svg';
import './App.css';
import WordsApi from './services/WordsApi/index';
import Tile from './components/Tile/index'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      words: []
    };
  }

  async componentDidMount() {
    try {
      const words = await WordsApi.getWords();
      this.setState({
        isLoaded: true,
        error: null,
        words: words.data
      })
    }
    catch (error) {
      this.setState({
        error: error
      })
    }
  }

  
  render() {
    const { words, isLoaded, error } = this.state;
    if (!isLoaded) {
      return <div className="App">LOADING...</div>
    }
    if (error) {
      return <div className="App">{error}</div>
    }
    return (
      <div className="App">
        <img src={logo} className='App-logo' alt='logo' />
        <div>Thoughtful Moose</div>
        <br />
        {words.map(word => {
          return <Tile name={word.name} definition={word.definition}/>
        })}
      </div>
    );

  }
}

export default App;
