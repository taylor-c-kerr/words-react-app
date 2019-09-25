import React from 'react';
import './styles.css';
import WordsApi from '../../services/WordsApi/index';
import Tile from '../../components/Tile/index';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';

class Home extends React.Component {
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
        <Header />
        {words.map(word => {
          return <Tile name={word.name} definition={word.definition}/>
        })}
        <Footer />
      </div>
    );

  }
}

export default Home;
