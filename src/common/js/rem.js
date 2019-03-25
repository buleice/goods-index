(function (baseFontSize) {
    const _baseFontSize = baseFontSize || 75;
    const ua = navigator.userAgent;
    const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
    const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
    const dpr = window.devicePixelRatio || 1;
    if (!isIos && !(matches && matches[1] > 534)) {
        // 如果非iOS, 非Android4.3以上, dpr设为1;
        dpr = 1;
    }
    const scale = 1 / dpr;
    const metaEl = document.querySelector('meta[name="viewport"]');
    if (!metaEl) {
        metaEl = document.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        window.document.head.appendChild(metaEl);
    }
    metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);

    document.documentElement.style.fontSize = document.documentElement.clientWidth / (750 / _baseFontSize) + 'px';

})(32);

window.onresize = window.onorientationchange=function () {
    (function (baseFontSize) {
        const _baseFontSize = baseFontSize || 75;
        const ua = navigator.userAgent;
        const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
        const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
        const dpr = window.devicePixelRatio || 1;
        if (!isIos && !(matches && matches[1] > 534)) {
            // 如果非iOS, 非Android4.3以上, dpr设为1;
            dpr = 1;
        }
        const scale = 1 / dpr;
        const metaEl = document.querySelector('meta[name="viewport"]');
        if (!metaEl) {
            metaEl = document.createElement('meta');
            metaEl.setAttribute('name', 'viewport');
            window.document.head.appendChild(metaEl);
        }
        metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);

        document.documentElement.style.fontSize = document.documentElement.clientWidth / (750 / _baseFontSize) + 'px';

    })(32);
}

// (function (c, d) {
//     var e = document.documentElement || document.body,
//         a = "orientationchange" in window ? "orientationchange" : "resize", b = function () {
//             var f = e.clientWidth;
//             e.style.fontSize = (f >= 1600) ? "100px" : 100 * (f / 1600) + "px"
//         };
//     b();
//     c.addEventListener(a, b, false)
// })(window);




// function resize() {
//     if(window.orientation == 90 || window.orientation == -90) {
//         //ipad、iphone竖屏；Andriod横屏
//         // resetHtmlFontAndViewPort()
//         resetHtmlFont()
//         orientation = 'landscape';
//         return false;
//     } else if(window.orientation == 0 || window.orientation == 180) {
//         //ipad、iphone横屏；Andriod竖屏
//         // resetHtmlFontAndViewPort()
//         resetHtmlFont()
//         orientation = 'portrait';
//         return false;
//     }
// }
