import React from 'react';
import {Redirect} from 'react-router-dom';
import WordsApi from '../../services/api/WordsApi/index';
import Tile from '../../components/Tile/index';
import Button from '../../components/Button/index';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      words: ['']
    };

    this.sendToAddPage = this.sendToAddPage.bind(this)
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

  sendToAddPage() {
    this.setState({addWordClicked: true})
  }

  render() {
    const { words, isLoaded, error, addWordClicked } = this.state;

    if (!isLoaded) {
      return <div>LOADING...</div>
    }
    if (error) {
      return <div>{error}</div>
    }
    if (addWordClicked) {
      return <Redirect push to='/add' />
    }

    return (
      <div>
        <div onClick={this.sendToAddPage}><Button variant='primary' value='Add a new word' /></div>
        {/*<Container >
          {formattedWords.map((word, i) => <Row key={`row-${i}`}>{word}</Row>)}
          </Container>*/}
        <div className="words-container">
          {words.map((word, i) => <Tile name={word.name} definition={word.definition} id={word.id} />)}
        </div>
      </div>
    );

  }
}

export default Home;
