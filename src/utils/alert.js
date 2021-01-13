import { Alert } from 'react-native';

/**
 * BASIC ALERT RELATED HELPERS
 */

export const showAlertWithButtons = (title, msz, buttons, fnc) => {
	Alert.alert(
		title,
		msz,
		[
			...buttons.map(btn => { return {...btn.text, onPress: () => {if(fnc && (btn.style !== 'cancel' || btn.clickable)){fnc(btn)}}} }),
		],
		{ cancelable: false }
	);
};

export const confirmAlert = (title, msz, fnc) => {
	showAlertWithButtons(title,msz, [{'text':'Confirm'}, {'text':'Cancel', style:'cancel'}], fnc);
};

export const showAlert = (msz, fnc) => {
	showAlertWithButtons('',msz, [{'text':'OK', style:'cancel', clickable: true}], fnc);
};
