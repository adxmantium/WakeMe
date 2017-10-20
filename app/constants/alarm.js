// /constants/user.js

// r = reducer name
const r = '_ALARM:';

export const SAVE = r+'SAVE'
export const UPDATE = r+'UPDATE'
export const EMPTY_REPEAT_LABEL = 'Never'
export const EMPTY_NEXT_ALARM_DAY_LABEL = 'Alarm days not selected'

export const SAVED_ALARM_DATA = 'SAVED_ALARM_DATA'
export const SAVING_ALARM_DATA = 'SAVING_ALARM_DATA'
export const SAVED_ALARM_DATA_TYPE = r+'SAVED_ALARM_DATA'
export const SAVING_ALARM_DATA_TYPE = r+'SAVING_ALARM_DATA'

export const DAYS_OF_WEEK = [
	{name: 'Sunday', abbr: 'Sun', type: 'weekend'},
	{name: 'Monday', abbr: 'Mon', type: 'weekday'},
	{name: 'Tuesday', abbr: 'Tue', type: 'weekday'},
	{name: 'Wednesday', abbr: 'Wed', type: 'weekday'},
	{name: 'Thursday', abbr: 'Thu', type: 'weekday'},
	{name: 'Friday', abbr: 'Fri', type: 'weekday'},
	{name: 'Saturday', abbr: 'Sat', type: 'weekend'},
]

const doSelectedDaysMatchType = ({ selectedDays, daysOfType }) => {
	let matchesType = true;

	// check if selected day is a weekend - if not, break out
	for(let i = 0; i < selectedDays.length; i++){

		if( !daysOfType.includes(selectedDays[i]) ){
			matchesType = false;
			break;
		}

	}

	return matchesType && selectedDays.length === daysOfType.length;
}

const isWeekend = selectedDays => {
	// get only weekends
	const weekends = [...DAYS_OF_WEEK].reduce((all, day) => day.type === 'weekend' ? [...all, day.name] : all, []);

	return doSelectedDaysMatchType({ selectedDays, daysOfType: weekends });
}

const isWeekday = selectedDays => {
	// get only weekdays
	const weekdays = [...DAYS_OF_WEEK].reduce((all, day) => day.type === 'weekday' ? [...all, day.name] : all, []);

	return doSelectedDaysMatchType({ selectedDays, daysOfType: weekdays });
}

export const determineDaysSelectedType = selectedDays => {
	// return if param is empty
	if( !selectedDays || selectedDays.length === 0 ) return EMPTY_REPEAT_LABEL;

	if( isWeekend( selectedDays ) ) return 'Weekends Only';
	else if( isWeekday( selectedDays ) ) return 'Weekdays Only';

	const days = [];
	const copy = [...DAYS_OF_WEEK];
	let dayFound = null;

	[...DAYS_OF_WEEK].forEach(day => {
		// find selected day in DAYS_OF_WEEK
		dayFound = selectedDays.find(selectedDay => day.name === selectedDay);
		// if found (should always be found), add to days arr
		if( dayFound ) days.push( day );
	});

	const daysList = days.map(day => day.abbr);

	if( daysList.length === DAYS_OF_WEEK.length ) return 'Everyday';

	return 'Every '+daysList.join(', ');
}

export const buildAlarmData = ({ _user, _alarm }) => {
	const { ampm, enabled, hour, minute, next_alarm_day, repeat, repeat_label } = _alarm;

	// only want these props of _alarm being saved to db
	const alarm = { ampm, enabled, hour, minute, next_alarm_day, repeat, repeat_label };

	return {
		fb_user_id: _user.userID,
		email: _user.email,
		name: _user.name,
		device_token: _user.device_token || '',
		alarm,
	}	
};
