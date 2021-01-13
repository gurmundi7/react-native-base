import React from 'react';
import {connect} from 'react-redux';
import {dispatchActionsUser} from '../actions/index';

/**
 * This HOC function will add all the actions & redux state keys to WrappedComponent as props.
 * passed actions depends on the all dispatchActions functions defined under this path src/actions/__Actions &
 * on dispatchActions used in bind Action function. rxp: dispatchActionsUser from src/actions/userActions
 * --------
 * @param {*} WrappedComponent Component: Your Component
 * @param {*} additionalProps function:(state)=>{} any appotional props you want to app. returned keys will be available as props.something
 * @param {*} actions function:(dispatch)=>{} any appotional actions you want to app. returned actions will be available as props.passedAction
 */

export function withRedux(
  WrappedComponent,
  additionalProps = () => {},
  actions = () => {},
) {
  function NewComponenet(props) {
    return <WrappedComponent {...props} />;
  }

  const mapStateToProps = (state) => ({
    ...state,
    ...additionalProps(state),
  });

  function bindAction(dispatch) {
    return {
      ...dispatchActionsUser(dispatch),
      ...actions(dispatch),
      dispatch: (action) => dispatch(action()),
    };
  }

  let FinalComponent = connect(mapStateToProps, bindAction)(NewComponenet);
  return FinalComponent;
}
