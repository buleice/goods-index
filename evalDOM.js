module.exports = function evalDOM() {
    const blocks = [];
    const win_w = window.innerWidth;
    const win_h = window.innerHeight;

    let agrs = arguments;
    if(!agrs.length) agrs = {length: 1, 0: {}};
    let agrs0 = agrs[0];

    let option = [];
    let backgroundColor;
    let animation;

    if(agrs.length === 1 && getArgtype(agrs0) === 'object') {
        // from config
        option = [
            getArgtype(agrs0.init) === 'function'? agrs0.init: noop,
            getArgtype(agrs0.includeElement) === 'function'? agrs0.includeElement: noop,
            agrs0.background || '#ecf0f2',
            agrs0.animation,
            agrs0.rootNode
        ];
    }else{
        // from page.evaluate
        option = parseParams(arguments);
    }
    backgroundColor = option[2];
    animation = option[3];

    function drawBlock({width, height, top, left, zIndex = 9999999, background, radius} = {}) {
        const styles = [
            'position: fixed',
            'z-index: '+zIndex,
            'top: '+top+'%',
            'left: '+left+'%',
            'width: '+width+'%',
            'height: '+height+'%',
            'background: '+(background || backgroundColor)
        ];
        radius && radius != '0px' && styles.push('border-radius: '+radius);
        animation && styles.push('animation: '+animation);
        blocks.push(`<div style="${styles.join(';')}"></div>`);
    }

    function wPercent(x) {
        return parseFloat(x/win_w*100).toFixed(3);
    }

    function hPercent(x) {
        return parseFloat(x/win_h*100).toFixed(3);
    }

    function noop() {}

    function getArgtype(arg){
        return Object.prototype.toString.call(arg).toLowerCase().match(/\s(\w+)/)[1];
    }

    function getStyle(node, attr) {
        return (node.nodeType === 1? getComputedStyle(node)[attr]: '') || '';
    }

    function getRootNode(el) {
        if(el && getArgtype(el) === 'string') {
            return document.querySelector(el);
        }
    }

    function includeElement(elements, node) {
        return ~elements.indexOf((node.tagName || '').toLowerCase());
    }

    function isHideStyle(node) {
        return getStyle(node, 'display') === 'none' ||
            getStyle(node, 'visibility') === 'hidden' ||
            getStyle(node, 'opacity') == 0 ||
            node.hidden;
    }

    function isCustomCardBlock(node) {
        const bgStyle = getStyle(node, 'background');
        const bgColorReg = /rgba\([\s\S]+?0\)/ig;
        const bdReg = /(0px)|(none)/;
        const hasBgColor = !bgColorReg.test(bgStyle) || ~bgStyle.indexOf('gradient');
        const hasNoBorder = ['top', 'left', 'right', 'bottom'].some(item => {
            return bdReg.test(getStyle(node, 'border-'+item));
        });
        const {w, h} = getRect(node);
        const customCardBlock = !!(hasBgColor && (!hasNoBorder || getStyle(node, 'box-shadow') != 'none') && w > 0 && h > 0 && w < 0.95*win_w && h < 0.3*win_h);
        return customCardBlock;
    }

    function calcTextWidth(text, {fontSize, fontWeight} = {}) {
        if(!text) return 0;

        const div = document.createElement('div');
        div.innerHTML = text;
        div.style.cssText = [
            'position:absolute',
            'left:-99999px',
            `height:${fontSize}`,
            `font-size:${fontSize}`,
            `font-weight:${fontWeight}`,
            'opacity:0'
        ].join(';');
        document.body.appendChild(div);
        const w = getStyle(div, 'width');
        const h = getStyle(div, 'height');
        document.body.removeChild(div);
        return {
            w: parseInt(w),
            h: parseInt(h)
        };
    }

    function getRect(node) {
        if(!node) return {};
        const { top: t, left: l, width: w, height: h } = node.getBoundingClientRect();
        return {t, l, w, h};
    }

    function drawTextBlock(node) {
        const {t, l, w, h} = getRect(node);
        const text = node.innerHTML.replace(/<[^>]+>/g, '');
        const fontSize = getStyle(node, 'font-size');
        const fontWeight = getStyle(node, 'font-weight');
        const isCenter = getStyle(node, 'text-align');
        const {w: textWidth, h: textHeight} = calcTextWidth(text, {fontSize, fontWeight});
        const {
            paddingTop,
            paddingLeft,
            paddingBottom,
            paddingRight
        } = getPadding(node);
        const blockWidth = w - paddingLeft - paddingRight;
        const lines_1 = Math.ceil(textWidth / blockWidth);

        if(lines_1 <= 1) {
            drawBlock({
                width: wPercent(textWidth),
                height: hPercent(textHeight),
                top: hPercent(t + (h - textHeight) / 2),
                left: isCenter? (w - textWidth) / 2: l + paddingLeft,
                radius: getStyle(node, 'border-radius')
            });
        }else{
            const iTop = t + paddingTop;
            for(const i=0;i<lines_1;i++) {
                drawBlock({
                        width: wPercent(w - paddingLeft - paddingRight),
                        height: hPercent(textHeight),
                        top: hPercent(t + (h - textHeight) / 2), textHeight * i +
                    left: isCenter? (w - textWidth) / 2: l + paddingLeft,
                    radius: getStyle(node, 'border-radius')
            });
            }
        }

    }

    function getPadding(node) {
        return {
            paddingTop: parseInt(getStyle(node, 'paddingTop')),
            paddingLeft: parseInt(getStyle(node, 'paddingLeft')),
            paddingBottom: parseInt(getStyle(node, 'paddingBottom')),
            paddingRight: parseInt(getStyle(node, 'paddingRight'))
        }
    }

    function parseParams(params) {
        let options = [];
        if(params.length) {
            for(let i in [0, 1]) {
                let fn = eval('(' + params[i] + ')');
                if(fn) {
                    options[i] = fn;
                }
            }
            options[2] = params[2];
            options[3] = params[3];
            options[4] = params[4];
        }
        return options;
    }

    function DrawPageframe(opts) {
        this.rootNode = getRootNode(opts.rootNode) || document.body;
        this.offsetTop = opts.offsetTop || 0;
        this.includeElement = opts.includeElement;
        this.init = opts.init;
        this.originStyle = {};

        return this instanceof DrawPageframe? this: new DrawPageframe(opts);
    }

    DrawPageframe.prototype = {
        resetDOM: function() {
            this.init && this.init();
            this.originStyle = {
                scrollTop: window.scrollY,
                bodyOverflow: getStyle(document.body, 'overflow')
            };
            window.scrollTo(0, this.offsetTop);
            document.body.style.cssText += 'overflow:hidden!important;';
            drawBlock({
                width: 100,
                height: 100,
                top: 0,
                left: 0,
                zIndex: 9999990,
                background: '#fff'
            });
        },
        showBlocks: function() {
            if(blocks.length) {
                // const { body } = document;
                // const blocksHTML = blocks.join('');
                // const div = document.createElement('div');
                // div.innerHTML = blocksHTML;
                // body.appendChild(div);
                // return blocksHTML;
                window.scrollTo(0, this.originStyle.scrollTop);
                document.body.style.overflow = this.originStyle.bodyOverflow;
            }
        },

        startDraw: function() {
            let $this = this;
            this.resetDOM();
            const nodes = this.rootNode.childNodes;

            function deepFindNode(nodes) {
                if(nodes.length) {
                    for(let i = 0; i < nodes.length; i++) {

                        let node = nodes[i];
                        if(isHideStyle(node) || (getArgtype($this.includeElement) === 'function' && $this.includeElement(node, drawBlock) == false)) continue;
                        let childNodes = node.childNodes;
                        let hasChildText = false;
                        let background = getStyle(node, 'backgroundImage');
                        let backgroundHasurl = background.match(/url\(.+?\)/);

                        backgroundHasurl = backgroundHasurl && backgroundHasurl.length;

                        for(let j = 0; j < childNodes.length; j++) {
                            if(childNodes[j].nodeType === 3 && childNodes[j].textContent.trim().length) {
                                hasChildText = true;
                                break;
                            }
                        }

                        if(includeElement(['img', 'input', 'button', 'textarea', 'svg', 'canvas', 'video', 'audio'], node) ||
                            backgroundHasurl ||
                            isCustomCardBlock(node)) {
                            const {t, l, w, h} = getRect(node);

                            if(w > 0 && h > 0 && l >= 0 && l < win_w && t < win_h - 100 && t >= 0 && h < win_h/2) {
                                const {
                                    paddingTop,
                                    paddingLeft,
                                    paddingBottom,
                                    paddingRight
                                } = getPadding(node);
                                drawBlock({
                                    width: wPercent(w - paddingLeft - paddingRight),
                                    height: hPercent(h - paddingTop - paddingBottom),
                                    top: hPercent(t + paddingTop),
                                    left: wPercent(l + paddingLeft),
                                    radius: getStyle(node, 'border-radius')
                                });
                            }
                        } else if((node.nodeType === 3 && node.textContent.trim().length) || hasChildText) {
                            drawTextBlock(node);
                        } else if(childNodes && childNodes.length) {
                            if(!hasChildText) {
                                deepFindNode(childNodes);
                            }
                        }
                    }
                }
            }

            deepFindNode(nodes);
            return this.showBlocks();
        }
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try{
                const html = new DrawPageframe({
                    init: option[0],
                    rootNode: option[4],
                    includeElement: option[1]
                }).startDraw();
                resolve(html);
            }catch(e) {
                reject(e);
            }
        }, 1000);
    });

}

// 待优化：
// 1. table
// 2. 文字
