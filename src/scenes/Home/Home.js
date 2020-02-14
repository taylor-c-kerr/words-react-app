import React from 'react';
import {Redirect} from 'react-router-dom';
import WordsApi from '../../services/api/WordsApi/index';
import Tile from '../../components/Tile/Tile';
import Button from '../../components/Button/Button';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
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
      return <LoadingIcon />
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
        <div className="words-container">
          {words.map((word, i) => <Tile name={word.name} definition={word.definition} id={word.id} key={`tile-${i}`} />)}
        </div>
      </div>
    );

  }
}

export default Home;
