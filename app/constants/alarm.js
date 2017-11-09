// /constants/user.js

import moment from 'moment'
import { sendNotificationPromise, deleteNotificationPromise } from './../actions/user'

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

export const SENT_NOTIFICATION = 'SENT_NOTIFICATION'
export const SENDING_NOTIFICATION = 'SENDING_NOTIFICATION'
export const SENT_NOTIFICATION_TYPE = r+SENT_NOTIFICATION
export const SENDING_NOTIFICATION_TYPE = r+SENDING_NOTIFICATION

export const DAYS_OF_WEEK = [
	{name: 'Sunday', abbr: 'Sun', type: 'weekend'},
	{name: 'Monday', abbr: 'Mon', type: 'weekday'},
	{name: 'Tuesday', abbr: 'Tue', type: 'weekday'},
	{name: 'Wednesday', abbr: 'Wed', type: 'weekday'},
	{name: 'Thursday', abbr: 'Thu', type: 'weekday'},
	{name: 'Friday', abbr: 'Fri', type: 'weekday'},
	{name: 'Saturday', abbr: 'Sat', type: 'weekend'},
]

export const DAYS_MAP = {
	Sunday: 0,
	Monday: 1,
	Tuesday: 2,
	Wednesday: 3,
	Thursday: 4,
	Friday: 5,
	Saturday: 6
}

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

export const determineNextAlarmDay = ({ selected_days, _alarm }) => {
	const { hour, minute } = _alarm;
	const repeat = {};
	const todayVal = moment().day();
	const today = moment().day( todayVal );

	let selected_day = null;
	let smallest_diff = null;
	let dayVal = 0;
	let diff_in_min = 0;
	let temp_diff_in_min = 0;
	let next_alarm_day = EMPTY_NEXT_ALARM_DAY_LABEL;
	let next_alarm_day_moment = null;

	// get only the days that are true
	for( const day in selected_days ){
		// if day is selected
		if( selected_days[day] ){

			repeat[day] = selected_days[day]; // cache this day
			dayVal = DAYS_MAP[day]; // get day value from days map

			selected_day = moment({ hour, minute }).day(day); // convert this day into moment object

			// if same day as today, and diff in min is negative, add one week
			// else if this day occured prior to today, add one week to this day
			// else day comes after today, no need to manipulate day
			if( todayVal === dayVal ){
				temp_diff_in_min = selected_day.diff(today, 'minutes');
				// if diff is negative value, that means set alarm time has already passed, so add one week
				if( temp_diff_in_min < 0 ) selected_day.add(1, 'w');

			}else if( todayVal > dayVal ){
				selected_day.add(1, 'w'); // since this day already occured this week, this day next week is the day we want
			}

			diff_in_min = selected_day.diff(today, 'minutes');

			// if this days diff in minutes is less than the prev diff in min (this day is closer to today), then set as closest day and update smallest_diff
			if( diff_in_min < smallest_diff || smallest_diff === null ){
				smallest_diff = diff_in_min;
				next_alarm_day = day;
				next_alarm_day_moment = selected_day;
			}
		}
	}

	// if next_alarm_day_moment is set, format for display
	if( next_alarm_day_moment ) next_alarm_day = next_alarm_day_moment.format('dddd, MMM D, YYYY');

	return {
		repeat,
		next_alarm_day,
		next_alarm_day_moment
	}
}

export const deleteAlarmNotifications = ({ notifications, index, ...rest }) => {
	// if new index of notifications arr exists, delete notification from onesignal and call this function again until !notifcations[index]
	if( notifications[index] ){
		const promise = deleteNotificationPromise( notifications[index] );

		promise.then(res => deleteAlarmNotifications({ notifications, index: index + 1, ...rest }));

		// if err, just continue to next notification
		promise.catch(err => deleteAlarmNotifications({ notifications, index: index + 1, ...rest }));

	}else rest.onDone();
}

export const sendAlarmNotifications = ({ alarmNotifications, index, ...rest }) => {
	// if this index of alarmNotifications exists, post to onesignal
	if( alarmNotifications[index] ){
		const promise = sendNotificationPromise( alarmNotifications[index] );

		promise.then(res => {
			if( rest.callback ) rest.callback(res.data.id);
			sendAlarmNotifications({ alarmNotifications, index: index + 1, ...rest }); // recurse
		});

		promise.catch(err => console.log('send alarm err: ', err));

	}else rest.onDone();
}