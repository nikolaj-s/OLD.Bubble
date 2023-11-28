export const getTimeDif = (dateToCalculate) => {

    const dt1 = new Date(dateToCalculate);

    const today = new Date();

    let diff = (today.getTime() - dt1.getTime()) / 1000;

    diff /= 60;

    
    let minutes = Math.abs(Math.round(diff));

    if (minutes === 0) {

        return 'less than a minute ago';
        
    } else if (minutes <= 59) {

        return minutes + ` ${minutes > 1 ? "minutes" : "minute"} ago`;
     
    } else if (minutes > 60 && minutes < 1439) {

        minutes /= 60;

        let hours = Math.abs(Math.round(minutes));

        return hours + ` ${hours > 1 ? "hours" : "hour"} ago`;

    } else if (minutes >= 1440) {

        minutes /= 1440;

        let days = Math.abs(Math.round(minutes));

        return days + ` ${days > 1 ? "days" : "day"} ago`

    }
}