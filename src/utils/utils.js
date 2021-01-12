import Moment from 'moment';
import { Alert } from 'react-native';

/**
 * VALIDATIONS
 */
export const validateEmail = (email) => {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

export const validateMobile = (number) => {
	//let numbers = '+-0123456789() ';
	let numbers = '0123456789';
	for (var i = 0; i < number.length; i++) {
		if (numbers.indexOf(number[i]) < 0) {
			return false;
		}
	}
	return true;
};

export const isNumbersOnly = (number) => {
	let numbers = '0123456789';
	for (var i = 0; i < number.length; i++) {
		if (numbers.indexOf(number[i]) < 0) {
			return false;
		}
	}
	return true;
};

/**
 * DATE & TIME RELATED HELPERS
 */

export const dateToday = () => {
	return Moment();
};

export const dateToString = (d, f) => {
	return Moment(d).format(f).toString();
};

export const dateStringToDate = (d, f) => {
	return Moment(d, [f]).toDate();
};

export const dateSringToString = (d, f, t) => {
	let date = dateStringToDate(d, f);
	return dateToString(date, t);
};

export const UtcToLocalString = (d, f, t) => {
	let localDate = Moment.utc(d).local().format(t);
	return localDate;
};
export const UtcToLocalDate = (d, f, t) => {
	let localDate = Moment.utc(d).local();
	return localDate;
};
export const convertTime = (t, fr, to) => {
	let time = Moment(t, [fr]).format(to);
	return time;
};
export const convertTo12Hr = (time) => {
	if (time == null) return 'Not Set';
	return convertTime(time, 'HH:mm:ss', 'hh:mm a');
};
export const convertToDisplayDate = (date) => {
	if (date == null) return '-';
	return convertTime(date, 'YYYY-MM-DD HH:mm:ss', 'MMM DD, YYYY');
};
export const convertToDisplayTime = (date) => {
	if (date == null) return '-';
	return convertTime(date, 'YYYY-MM-DD HH:mm:ss', 'hh:mm a');
};

export function formatCellNumber(phoneNumberString) {
	var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
	var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
	if (match) {
		var intlCode = match[1] ? '+1 ' : '';
		return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
	}
	return phoneNumberString;
}
/**
 * BASIC ALERT RELATED HELPERS
 */
export const confirmAlert = (title, msz, fnc) => {
	Alert.alert(
		title,
		msz,
		[
			{
				text: 'Confirm',
				onPress: () => fnc()
			},
			{
				text: 'Cancel',
				onPress: () => {},
				style: 'cancel'
			}
		],
		{ cancelable: false }
	);
};

export const showAlert = (msz, fnc) => {
	Alert.alert(
		'',
		msz,
		[
			{
				text: 'OK',
				onPress: () => {
					if (fnc) {
						fnc();
					}
				},
				style: 'cancel'
			}
		],
		{ cancelable: false }
	);
};
