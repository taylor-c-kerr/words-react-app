import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { cloneDeep } from 'lodash';

const PartOfSpeechPropTypes = {
  availablePartsOfSpeech: PropTypes.array.isRequired,
  addAvailablePos: PropTypes.func.isRequired,
  removeAvailablePos: PropTypes.func.isRequired,
  currentWord: PropTypes.any.isRequired,
  value: PropTypes.string.isRequired,
  onOptionChange: PropTypes.func.isRequired,
}
type Props = PropTypes.InferProps<typeof PartOfSpeechPropTypes>

class PartOfSpeech extends React.Component<Props> {
  static propTypes: {};
  private currentDefinition: any;
  constructor(props: Props) {
    super(props);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  componentDidMount() {
    const usedPos = this.getUsedPos();
    this.props.removeAvailablePos(usedPos);
    this.setCurrentDefinition();
  }

  setCurrentDefinition() {
    this.currentDefinition = cloneDeep(this.props.currentWord.definition.find((def: any) => def.partOfSpeech === this.props.value));
    console.log(this.currentDefinition);
  }

  getUsedPos() {
    return this.props.currentWord.definition.map((def: any) => def.partOfSpeech);
  }

  handleOptionChange(e: any) {
    this.props.onOptionChange({partOfSpeech: e.target.value});
  }

  render() {
    let { availablePartsOfSpeech, value } = this.props;
    availablePartsOfSpeech = [...availablePartsOfSpeech]
    availablePartsOfSpeech.push(value);
    return (
      <div>
        <div>Choose a part of speech</div>
        <div>{value}</div>
        <select onChange={this.handleOptionChange} value={value}>
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
