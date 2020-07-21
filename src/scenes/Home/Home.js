import React from 'react';
import {Redirect} from 'react-router-dom';
import WordsApi from '../../services/api/WordsApi/index';
import Tile from '../../components/Tile/Tile';
import Button from '../../components/Button/Button';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import Error from '../../components/Error/Error';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import _ from 'lodash';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };

    this.sendToAddPage = this.sendToAddPage.bind(this)
  }

  async componentDidMount() {
    if (_.isEmpty(this.props.state.words)) {
      // this.props.dispatch(fetchWordsPending());  // TODO: does not work, find out why
      this.props.dispatch({
        type: 'FETCH_WORDS_PENDING'
      });
      try {
        const words = await WordsApi.getWords();
        // this.props.dispatch(fetchWordsSuccess(words.data));  // TODO: does not work, find out why
        this.props.dispatch({
          type: 'FETCH_WORDS_SUCCESS',
          payload: words.data
        })
      } catch (error) {
        // this.props.dispatch(fetchWordsError(error));  // TODO: does not work, find out why
        this.props.dispatch({
          type: 'FETCH_WORDS_ERROR',
          error
        })
      }
    }
  }

  sendToAddPage() {
    this.setState({addWordClicked: true});
  }

  render() {
    const { addWordClicked } = this.state;
    const { words, pending, error } = this.props.state;

    if (pending) {
      return <LoadingIcon />
    }
    if (error) {
      console.error(error);
      return <Error />
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

const mapStateToProps = (state) => {
  return { state }
 }
export default connect(mapStateToProps)(Home);
