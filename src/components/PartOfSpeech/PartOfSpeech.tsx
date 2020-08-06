import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PartOfSpeechPropTypes = {
  availablePartsOfSpeech: PropTypes.array.isRequired,
  addAvailablePos: PropTypes.func.isRequired,
  removeAvailablePos: PropTypes.func.isRequired,
  currentWord: PropTypes.any.isRequired,
  currentValue: PropTypes.string,
}
type Props = PropTypes.InferProps<typeof PartOfSpeechPropTypes>

class PartOfSpeech extends React.Component<Props> {
  static propTypes: {};
  constructor(props: Props) {
    super(props);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  componentDidMount() {
    const usedPos = this.getUsedPos();
    this.props.removeAvailablePos(usedPos);
  }

  getUsedPos() {
    return this.props.currentWord.definition.map((def: any) => def.partOfSpeech);
  }

  handleOptionChange(e: any) {
    console.log('click!', e.target.value)
    this.props.removeAvailablePos([e.target.value])
  }

  render() {
    const { availablePartsOfSpeech } = this.props;
    return (
      <div>
        <div>Choose a part of speech</div>
        <select onChange={this.handleOptionChange}>
          <option value="">--</option>
          {!availablePartsOfSpeech.length ? '' : availablePartsOfSpeech.map((pos, i) => <option value={pos} key={`pos-${i + 1}`}>{pos}</option>)}
        </select>
      </div>
    )
  }

}

PartOfSpeech.propTypes = PartOfSpeechPropTypes;

const mapStateToProps = (state: any) => {
  return {
    currentWord: state.currentWordReducer.currentWord,
    availablePartsOfSpeech: state.currentWordReducer.availablePartsOfSpeech,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addAvailablePos: (pos: string) => dispatch({ type: 'ADD_AVAILABLE_POS', pos}),
    removeAvailablePos: (pos: string) => dispatch({ type: 'REMOVE_AVAILABLE_POS', pos}),
		// deleteWordError: (error: any) => dispatch({ type: 'DELETE_WORD', error }),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PartOfSpeech);
