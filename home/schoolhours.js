function updateSchoolHours() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // Sunday - 0, Monday - 1, ..., Saturday - 6
    const hour = now.getHours();
    const minute = now.getMinutes();

    const hoursElement = document.getElementById('hours');

    // Define opening hours for each day
    const schedule = [
        { open: null, close: null }, // Sunday
        { open: '7:30', close: '17:00' }, // Monday
        { open: '7:30', close: '17:00' }, // Tuesday
        { open: '7:30', close: '13:30' }, // Wednesday
        { open: '7:30', close: '17:00' }, // Thursday
        { open: '7:30', close: '13:30' }, // Friday
        { open: null, close: null }  // Saturday
    ];

    const todayHours = schedule[dayOfWeek];

    if (todayHours.open === null) {
        hoursElement.textContent = 'Closed';
    } else {
        const [openHour, openMinute] = todayHours.open.split(':').map(Number);
        const [closeHour, closeMinute] = todayHours.close.split(':').map(Number);

        const isOpen = hour > openHour || (hour === openHour && minute >= openMinute);
        const isClosed = hour > closeHour || (hour === closeHour && minute >= closeMinute);

        if (isOpen && !isClosed) {
            hoursElement.textContent = `Open, closes at ${todayHours.close}`;
        } else if (!isOpen) {
            hoursElement.textContent = `Closed, opens at ${todayHours.open}`;
        } else {
            hoursElement.textContent = 'Closed';
        }
    }
}

// Update hours on page load
document.addEventListener('DOMContentLoaded', updateSchoolHours);

// Optional: update hours every minute to ensure accuracy
setInterval(updateSchoolHours, 60000);
