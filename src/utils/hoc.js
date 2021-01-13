import React from 'react';
import { connect } from 'react-redux';
import { dispatchActionsUser } from '../actions/index';

export function withRedux(WrappedComponent, additionalProps = () => {}, actions = () => {}) {
	function NewComponenet(props) {
		return <WrappedComponent {...props} />;
	}

	const mapStateToProps = (state) => ({
		...state,
		...additionalProps(state)
	});

	function bindAction(dispatch) {
		return {
			...dispatchActionsUser(dispatch),
			...actions(dispatch),
			dispatch: (action) => dispatch(action())
		};
	}

	let FinalComponent = connect(mapStateToProps, bindAction)(NewComponenet);
	return FinalComponent;
}
