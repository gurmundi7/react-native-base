
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

export function formatCellNumber(phoneNumberString) {
	var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
	var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
	if (match) {
		var intlCode = match[1] ? '+1 ' : '';
		return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
	}
	return phoneNumberString;
}