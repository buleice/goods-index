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

const Calculation=(type, num1, num2)=> {

    var temp1, temp2, a;
    try {
        // 获取temp1小数点后的长度
        temp1 = num1.toString().split(".")[1].length;
    }
    catch (e) {
        temp1 = 0;
    }
    try {
        // 获取temp2小数点后的长度
        temp2 = num2.toString().split(".")[1].length;
    }
    catch (e) {
        temp2 = 0;
    }
    // Math.max(temp1, temp2) 为了获取temp1和temp2两个值中较大的一个
    // Math.pow(a,b) 表示 a 的 b 次方
    a = Math.pow(10, Math.max(temp1, temp2));

    // 计算的方式是先将所有的小数乘为整数，待加减运算执行完之后再除去对应的 a 的值，将其变为小数输出
    // 先判断执行的方式是否是加法，不是的话则执行减法运算
    return type === "add" ? (num1 * a + num2 * a) / a : (num1 * a - num2 * a) / a;
}

export {
    backTimeString,
    Calculation
}
