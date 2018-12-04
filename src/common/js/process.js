function processDate(time) {
    var year = parseInt(time.slice(0, 4));
    var month = parseInt(time.slice(5, 7))-1;
    var day = parseInt(time.slice(8, 10));
    var hour = parseInt(time.slice(11, 13));
    var min = parseInt(time.slice(14, 16));
    var sec = parseInt(time.substr(17, 2));
    return new Date(year, month, day, hour, min, sec);
};
const backTimeString=(endTimestr,nowTime)=>{
    var curTime = new Date(nowTime*1000);
    var endTime=processDate(endTimestr);
    var remainTime = Math.round((endTime.getTime() - curTime.getTime()) / 1000);
    // console.log(curTime,endTime)
    var nextShowTime = remainTime > 0 ?
        remainTime :
        0;
    if (remainTime > 0) {
        var nextHours = parseInt(nextShowTime / 3600);
        var nextMintes = parseInt((nextShowTime % 3600) / 60);
        var nextSeconds = parseInt(nextShowTime % 60);
        if (nextHours.toString().length < 2) {
            nextHours = "0" + nextHours;
        }
        if (nextMintes.toString().length < 2) {
            nextMintes = "0" + nextMintes;
        }
        if (nextSeconds.toString().length < 2) {
            nextSeconds = "0" + nextSeconds;
        }
        return nextHours+":"+nextMintes+":"+nextSeconds;
    } else {
     return 0;
    }
}

export {
    backTimeString
}
