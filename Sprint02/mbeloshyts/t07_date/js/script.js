function format(date) {
    return (String(date).length === 1) ? String('0' + date) : date;
}

function getFormattedDate(date) {
    let arr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return `${format(date.getDate())}.${format(date.getMonth() + 1)}.${date.getFullYear()} ${format(date.getHours())}:${format(date.getMinutes())} ${arr[date.getDay()]}`;
}
