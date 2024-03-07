export function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    let time = ''
    if (hours > 0) {
        time += `${padZero(hours)}h `
    }
    if (minutes > 0) {
        time += `${padZero(minutes)}m `
    }
    time += `${padZero(remainingSeconds)}s`
    return time;
}

function padZero(num:number) {
    return (num < 10 ? '0' : '') + num;
}