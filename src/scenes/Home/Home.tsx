import React from 'react';
import { Redirect } from 'react-router-dom';
import WordsApi from '../../services/api/WordsApi/index';
import Tile from '../../components/Tile/Tile';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import Error from '../../components/Error/Error';
import './styles.scss';
import { connect } from 'react-redux';
import _ from 'lodash';
import Button from '../../components/Button/Button';
import PropTypes from 'prop-types';

const HomePropTypes = {
  pending: PropTypes.bool,
  error: PropTypes.any,
  setPending: PropTypes.func.isRequired,
  addWords: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  words: PropTypes.any
}

type Props = PropTypes.InferProps<typeof HomePropTypes>
type State = {
  addWordClicked: boolean
}

class Home extends React.Component<Props, State> {
  static propTypes: {};
  constructor(props: Props) {
    super(props);
    this.state = {
      addWordClicked: false
    };

    this.sendToAddPage = this.sendToAddPage.bind(this)
  }

  async componentDidMount() {
    if (_.isEmpty(this.props.words)) {
      this.props.setPending();
      try {
        const words = await WordsApi.getWords();
        const wordsToAdd: any = {};
        words.data.forEach((word: any) => wordsToAdd[word.id] = word);
        this.props.addWords(wordsToAdd);
      } catch (error) {
        this.props.setError(error);
      }
    }
  }

  sendToAddPage() {
    this.setState({addWordClicked: true});
  }

  render() {
    const { addWordClicked } = this.state;
    const { words, pending, error } = this.props;

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
      <div className="home-container">
        <div className="home-buttons-container">
          <Button icon="add" hoverText="Add a new word" clickHandler={this.sendToAddPage.bind(this)} />
        </div>
        <div className="words-container">
        {!words ? null : Object.keys(words).map((id, i) => <Tile name={words[id].name} definition={words[id].definition} id={words[id].id} key={`tile-${i}`} />)}
        </div>
      </div>
    );

  }
}

const mapStateToProps = (state: any) => {
  const { words, pending, error } = state.allWordsReducer;
  return { 
    words,
    pending,
    error,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setPending: () => dispatch({ type: 'FETCH_WORDS_PENDING' }),
    addWords: (words: any) => dispatch({ type: 'FETCH_WORDS_SUCCESS', words }),
    setError: (error: any) => dispatch({ type: 'FETCH_WORDS_ERROR', error })
  }
}

Home.propTypes = HomePropTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
