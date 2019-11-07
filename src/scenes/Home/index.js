import React from 'react';
import {Redirect} from 'react-router-dom';
import WordsApi from '../../services/api/WordsApi/index';
import Tile from '../../components/Tile/index';
import Button from '../../components/Button/index';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import _ from 'lodash';
import './styles.css';
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

  createTable(data) {
    if (data[0] ==='') {
      return null;
    }
    const newData = data.map((d, i) => {
      return <Col key={`tile-${i}`}>
        <Tile name={d.name} definition={d.definition} id={d.id} />
      </Col>
    })

    return _.chunk(newData, 2);
  }

  render() {
    const { words, isLoaded, error, addWordClicked } = this.state;
    let formattedWords = this.createTable(words);

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
        <Container >
          {formattedWords.map((word, i) => <Row key={`row-${i}`}>{word}</Row>)}
          </Container>
      </div>
    );

  }
}

export default Home;
