const currentDate = new Date().toDateString().split(' ');

const todayData = {
	"weekday": currentDate[0],
	"month": currentDate[1],
	"day": parseInt(currentDate[2]),
	"year": parseInt(currentDate[3])
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const sessionData = JSON.parse(JSON.stringify(todayData));

for (let i = 0; i < months.length; i += 1) {
	if (months[i] == todayData.month) {
		sessionData['monthIndex'] = i;
	}
}

const yearDisplay = document.querySelector('.yearDisplay'); 
const monthDisplay = document.querySelector('.monthDisplay'); 

const dayContainer = document.querySelector('.dayContainer');

const getNumberOfDays = () => {
	return sessionData.month == 'Feb' ? sessionData.year % 4 == 0 && sessionData.year % 10 != 0 ? 29 : 28 : (sessionData.monthIndex + 1) % 2 == 0 ? sessionData.monthIndex + 1 > 7 ? 31 : 30 : sessionData.monthIndex + 1 > 7 ? 30 : 31;
}

const displayDays = () => {
	dayContainer.innerHTML = '';
	for (let i = 0; i < getNumberOfDays(); i += 1) {
		const element = document.createElement('div');
		element.classList.add('day');
		element.innerHTML = String(i + 1);
		dayContainer.appendChild(element);
	}
}

const displayCurrentDateInfo = () => {
	sessionData.month = months[sessionData.monthIndex];
	yearDisplay.innerHTML = sessionData.year
	monthDisplay.innerHTML = sessionData.month
	displayDays();
}

displayCurrentDateInfo();
displayDays();

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => { 
	button.addEventListener('click', () => { 
		button.dataset.type == 'month' ? button.dataset.inc == "-1" && sessionData.monthIndex == 0 ? (() => {sessionData.year -= 1; sessionData.monthIndex = 11; displayCurrentDateInfo();})() : button.dataset.inc == "1" && sessionData.monthIndex == 11 ? (() => {sessionData.year += 1; sessionData.monthIndex = 0; displayCurrentDateInfo();})() : (() => {sessionData.monthIndex += parseInt(button.dataset.inc); displayCurrentDateInfo();})() : sessionData.year != 0 ? (() => {sessionData.year += parseInt(button.dataset.inc); displayCurrentDateInfo();})() : 0; 
	}) 
})
