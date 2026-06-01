const { TALKS_DATA, EVENT_CONFIG } = require('./data');

function parseTime(timeStr) {
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  return { hours, minutes };
}

function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutes} ${period}`;
}

function generateSchedule() {
  const schedule = [];
  let { hours, minutes } = parseTime(EVENT_CONFIG.eventStartTime);
  let currentTime = new Date(2000, 0, 1, hours, minutes); // Use a dummy date for time calculations

  TALKS_DATA.forEach((talk, index) => {
    // Add talk to schedule
    const talkStartTime = new Date(currentTime);
    const talkEndTime = new Date(currentTime.getTime() + talk.duration * 60 * 1000);
    schedule.push({
      type: 'talk',
      ...talk,
      startTime: formatTime(talkStartTime),
      endTime: formatTime(talkEndTime)
    });
    currentTime = talkEndTime;

    // Check for lunch break
    if (currentTime.getHours() === EVENT_CONFIG.lunchBreakStartHour && currentTime.getMinutes() === EVENT_CONFIG.lunchBreakStartMinute) {
      const lunchStartTime = new Date(currentTime);
      currentTime = new Date(currentTime.getTime() + EVENT_CONFIG.lunchBreakDuration * 60 * 1000);
      const lunchEndTime = new Date(currentTime);
      schedule.push({
        type: 'break',
        title: 'Lunch Break',
        startTime: formatTime(lunchStartTime),
        endTime: formatTime(lunchEndTime),
        duration: EVENT_CONFIG.lunchBreakDuration
      });
    }

    // Add transition time, unless it's the last talk
    if (index < TALKS_DATA.length - 1) {
      const transitionStartTime = new Date(currentTime);
      currentTime = new Date(currentTime.getTime() + EVENT_CONFIG.transitionTime * 60 * 1000);
      const transitionEndTime = new Date(currentTime);
      schedule.push({
        type: 'transition',
        startTime: formatTime(transitionStartTime),
        endTime: formatTime(transitionEndTime),
        duration: EVENT_CONFIG.transitionTime
      });
    }
  });

  return schedule;
}

module.exports = generateSchedule;
