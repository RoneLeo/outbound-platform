const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const formateSecond = s => {
    const hour = Math.floor(s / 3600)
    const minute = Math.floor((s - hour * 3600) / 60);
    const second = s - hour * 3600 - minute * 60;
    let res = ''
    if (hour) {
        res += hour + 'h';
    }
    if (minute) {
        res += minute + 'm';
    }
    if (second) {
        res += second + 's'
    } else {
        res += '0s'
    }
    return res;
}

const formateSecondDigital = s => {
    const hour = Math.floor(s / 3600)
    const minute = Math.floor((s - hour * 3600) / 60);
    const second = s - hour * 3600 - minute * 60;
    let res = ''
    if (hour) {
        res += formatNumber(hour) + ':';
    } else {
        res += '00:'
    }
    if (minute) {
        res += formatNumber(minute) + ':';
    } else {
        res += '00:'
    }
    if (second) {
        res += formatNumber(second);
    } else {
        res += '00'
    }
    return res;
}

module.exports = {
    formatTime: formatTime,
    formateSecond: formateSecond,
    formateSecondDigital: formateSecondDigital
}