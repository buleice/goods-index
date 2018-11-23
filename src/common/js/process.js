const backTimeString=(endTime,nowTime)=>{
    var curTime = new Date(nowTime*1000);
    var endTime=new Date(endTime);
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
