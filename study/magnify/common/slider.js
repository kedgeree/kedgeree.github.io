var READING = READING || {};

READING.Slider = function (strokeStyle, fillStyle, knobPercent, hpercent, vpercent) {
    //knobPercent: slider的百分比数值
    this.trough = new READING.RoundedRect(strokeStyle, fillStyle, hpercent || 95, vpercent || 95);

    this.knobPercent = knobPercent || 0;
    this.strokeStyle = strokeStyle ? strokeStyle : 'gray';
    this.fillStyle = fillStyle ? fillStyle : 'skyblue';

    this.SHADOW_COLOR = 'rgba(100, 100, 100, 0.8)';
    this.SHADOW_OFFSET_X = 3;
    this.SHADOW_OFFSET_Y = 3;
    //限制了滑块移动范围
    this.HORIZENTAL_MARGIN = 2 * this.SHADOW_OFFSET_X;
    this.VERTICAL_MARGIN = 2 * this.SHADOW_OFFSET_Y;

    this.KNOB_SHADOW_COLOR = 'yellow';
    this.KNOB_SHADOW_OFFSET_X = 1;
    this.KNOB_SHADOW_OFFSET_Y = 1;
    this.KNOB_SHADOW_BLUR = 0;

    this.KNOB_FILL_STYLE = 'rgba(255, 255, 255, 0.45)';
    this.KNOB_STROKE_STYLE = 'rgba(0, 0, 150, 0.45)';

    this.context = document.createElement('canvas').getContext('2d');
    this.changeEventListeners = [];
    this.createDOMElement();
    this.addMouseHandler();
    return this;
}

READING.Slider.prototype = {
    createDOMElement: function () {
        this.domElement = document.createElement('div');
        this.domElement.appendChild(this.context.canvas);
    },
    appendTo: function (elementName) {
        document.getElementById(elementName).appendChild(this.domElement);
        this.setCanvasSize();
        this.resize();
    },
    setCanvasSize: function () {
        var domElementParent = this.domElement.parentNode;
        this.context.canvas.width = domElementParent.offsetWidth;
        this.context.canvas.height = domElementParent.offsetHeight;
    },
    windowToCanvas: function (x, y) {
        var bbox = this.context.canvas.getBoundingClientRect();
        return {
            x: x - bbox.left * (this.context.canvas.width / bbox.width),
            y: y - bbox.top * (this.context.canvas.height / bbox.height)
        }
    },
    resize: function () {
        this.cornerRadius = (this.context.canvas.height /2  - 2 * this.VERTICAL_MARGIN) / 2;
        this.left = this.HORIZENTAL_MARGIN;
        this.top = this.VERTICAL_MARGIN;
        this.right = this.left + this.context.canvas.width - 2 * this.HORIZENTAL_MARGIN;
        this.bottom = this.top + this.context.canvas.height - 2 * this.VERTICAL_MARGIN;


        this.trough.resize(this.context.canvas.width, this.context.canvas.height);
        this.knobRadius = this.context.canvas.height / 2 - this.context.lineWidth * 2;
    },
    mouseInTrough: function (mouse) {
        this.context.beginPath();
        this.context.rect(this.left, 0, this.right - this.left, this.bottom);
        return this.context.isPointInPath(mouse.x, mouse.y);
    },
    mouseInKnob: function (mouse) {
        var position = this.knobPercentToPosition(this.knobPercent);
        this.context.beginPath();
        this.context.arc(position, this.context.canvas.height / 2, this.knobRadius, 0, Math.PI * 2);

        return this.context.isPointInPath(mouse.x, mouse.y);
    },
    knobPositionToPercent: function (position) {
        var troughWidth = this.right - this.left - 2 * this.knobRadius;
        return (position - this.left - this.knobRadius) / troughWidth;
    },
    knobPercentToPosition: function (percent) {
        if(percent > 1) percent = 1;
        if(percent < 0) percent = 0;

        var troughWidth = this.right - this.left - 2 * this.knobRadius;
        return percent * troughWidth + this.left + this.knobRadius;
    },
    erase: function () {
        this.context.clearRect(this.left - this.knobRadius,
            0 - this.knobRadius,
            this.context.canvas.width + 4 * this.knobRadius,
            this.context.canvas.height + 3 * this.knobRadius);
    },
    drawTrough: function () {
        this.context.save();
        this.trough.fillStyle = this.fillStyle;
        this.trough.strokeStyle = this.strokeStyle;
        this.trough.draw(this.context);
        this.context.restore();
    },
    fillKnob: function (position) {
        this.context.save();

        this.context.shadowColor = this.KNOB_SHADOW_COLOR;
        this.context.shadowOffsetY = this.KNOB_SHADOW_OFFSET_Y;
        this.context.shadowOffsetX = this.KNOB_SHADOW_OFFSET_X;
        this.context.shadowBlur = this.KNOB_SHADOW_BLUR;

        this.context.beginPath();

        this.context.arc(position, this.top + (this.bottom - this.top) / 2, this.knobRadius, 0, Math.PI * 2, false);
        this.context.clip();
        this.context.fillStyle = this.KNOB_FILL_STYLE;
        this.context.fill();
        this.context.restore();
    },
    strokeKnob: function () {
        this.context.save();
        this.context.lineWidth = 1;
        this.context.strokeStyle = this.KNOB_STROKE_STYLE;
        this.context.stroke();
        this.context.restore();
    },
    drawKonb: function (percent) {
        if(percent < 0) percent = 0;
        if(percent > 1) percent = 1;

        this.knobPercent = percent;
        this.fillKnob(this.knobPercentToPosition(percent));
        this.strokeKnob();
    },
    draw: function (percent) {
        this.context.globalAlpha = this.opacity;
        if(percent === undefined){
            percent = this.knobPercent;
        }
        this.drawTrough();
        this.drawKonb(percent);

    },
    addMouseHandler: function () {
        var slider = this;

        this.domElement.onmouseover = function (e) {
            slider.context.canvas.style.cursor = 'crosshair';
        }

        this.domElement.onmousedown = function (e) {
            var mouse = slider.windowToCanvas(e.clientX, e.clientY);
            e.preventDefault();
            if(slider.mouseInTrough(mouse) || slider.mouseInKnob(mouse)){

                slider.knobPercent = slider.knobPositionToPercent(mouse.x);
                slider.fireChageEvent(e);
                slider.erase();
                slider.draw();
                slider.dragging = true;
            }
        }
        window.addEventListener('mousemove', function (e) {
            var mouse = null,
                percent = null;
            e.preventDefault();

            if(slider.dragging){
                mouse =slider.windowToCanvas(e.clientX, e.clientY);
                percent = slider.knobPositionToPercent(mouse.x);

                if(percent >= 0 && percent <= 1.0){
                    slider.fireChageEvent(e);
                    slider.erase();
                    slider.draw(percent);
                }
            }
        }, false);

        window.addEventListener('mouseup', function (e) {
           var mouse = null;
           e.preventDefault();

           if(slider.dragging){
               slider.fireChageEvent(e);
               slider.dragging = false;
           }
        }, false);
    },
    fireChageEvent: function (e) {
        for(var i = 0; i < this.changeEventListeners.length; ++i){
            this.changeEventListeners[i](e);
        }
    },
    addChangeEvent: function (listenerFunction) {
        this.changeEventListeners.push(listenerFunction);
    }
}