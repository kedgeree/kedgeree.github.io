var READING = READING || {};

READING.RoundedRect  = function (strokeStyle, fillStyle, horizentalSizePercent, verticalSizePercent) {
    //horizentalSizePercent 占canvaswidth的比例
    //verticalSizePercent：占canvas height的比例
    this.strokeStyle = strokeStyle ? strokeStyle : 'gray';
    this.fillStyle = fillStyle ? fillStyle : 'skyblue';

    horizentalSizePercent = horizentalSizePercent || 100;
    verticalSizePercent = verticalSizePercent || 100;

    this.SHADOW_COLOR = 'rgba(100, 100, 100, 0.8)';
    this.SHADOW_OFFSET_X = 3;
    this.SHADOW_OFFSET_Y = 3;
    this.SHADOW_BLUR = 3;
    //如果>1，则认为是百分制，转为小数; 如果小于1,则不转换;
    this.setSizePercent(horizentalSizePercent, verticalSizePercent);
    //创建canvas
    this.creatCanvas();

    return this;
}

READING.RoundedRect.prototype = {
    createDomElement: function () {
        this.domElement = document.createElement('div');
        this.domElement.appendChild(this.context.canvas);
    },
    creatCanvas: function () {
        var canvas = document.createElement('canvas');
        this.context = canvas.getContext('2d');
        return canvas;
    },
    setSizePercent: function (h, v) {
        this.horizentalPercent = h > 1 ? h / 100 : h;
        this.verticalPercent = v > 1 ? v / 100 : v;
    },
    resize: function (width, height) {
        this.HORIZENTAL_MARGIN = (width - width * this.horizentalPercent) / 2;
        this.VERTICAL_MARGIN = (height - height * this.verticalPercent) / 2;

        this.cornerRadius = (this.context.canvas.height / 2 - 2 * this.VERTICAL_MARGIN) /2 ;

        this.top = this.VERTICAL_MARGIN;
        this.left = this.HORIZENTAL_MARGIN;
        this.right = this.left + width - 2 * this.HORIZENTAL_MARGIN;
        this.bottom = this.top + height - 2 * this.VERTICAL_MARGIN;

        this.context.canvas.width = width;
        this.context.canvas.height = height;
    },
    fill: function () {
        var radius = (this.bottom - this.top) / 2;
        this.context.save();
        this.context.shadowColor = this.SHADOW_COLOR;
        this.context.showOffsetX = this.SHADOW_OFFSET_X;
        this.context.shadowOffsetY = this.SHADOW_OFFSET_Y;
        this.context.shadowBlur = 6;

        this.context.beginPath();

        this.context.moveTo(this.left + radius, this.top);
        this.context.arcTo(this.right, this.top, this.right, this.bottom, radius);
        this.context.arcTo(this.right, this.bottom, this.left, this.bottom, radius);
        this.context.arcTo(this.left, this.bottom, this.left, this.top, radius);
        this.context.arcTo(this.left, this.top, this.right, this.top, radius);

        this.context.closePath();
        this.context.fillStyle = this.fillStyle;
        this.context.fill();
        this.context.shadowColor = undefined;
    },
    overlayGradient: function () {
        var gradient = this.context.createLinearGradient(this.left, this.top, this.left, this.bottom);

        gradient.addColorStop(0, 'rgba(255,255,255,0.4)');
        gradient.addColorStop(0, 'rgba(255,255,255,0.6)');
        gradient.addColorStop(0, 'rgba(255,255,255,0.7)');
        gradient.addColorStop(0, 'rgba(255,255,255,0.9)');
        gradient.addColorStop(0, 'rgba(255,255,255,0.7)');
        gradient.addColorStop(0, 'rgba(255,255,255,0.6)');
        gradient.addColorStop(0, 'rgba(255,255,255,0.4)');
        gradient.addColorStop(0, 'rgba(255,255,255,0.1)');

        this.context.fillStyle = gradient;
        this.context.fill();

        this.context.lineWidth = 0.4;
        this.context.strokeStyle = this.strokeStyle;
        this.context.stroke();

        this.context.restore();
    },
    draw: function (context) {
        var originalCtx;
        if(context){
            originalCtx = this.context;
            this.context = context;
        }

        this.fill();
        this.overlayGradient();

        if(context){
            this.context = originalCtx;
        }
    }
}