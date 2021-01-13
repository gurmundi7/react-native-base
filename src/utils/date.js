import Moment from 'moment';

/**
 * DATE 
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

/**
 * UTC to Local 
 */

 export const UtcToLocalString = (d, f, t) => {
	let localDate = Moment.utc(d).local().format(t);
	return localDate;
};

export const UtcToLocalDate = (d, f, t) => {
	let localDate = Moment.utc(d).local();
	return localDate;
};

/**
 * TIME 
 */

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
