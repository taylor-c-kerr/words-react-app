import React from 'react';
import WordsApi from '../../services/WordsApi/index';
import Tile from '../../components/Tile/index';

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
      return <div>LOADING...</div>
    }
    if (error) {
      return <div>{error}</div>
    }
    return (
      <div>
        {words.map(word => {
          return <Tile name={word.name} definition={word.definition} key={word.id}/>
        })}
      </div>
    );

  }
}

export default Home;
