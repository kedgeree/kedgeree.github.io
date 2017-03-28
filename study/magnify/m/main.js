//====global
var scaleOutput = 1.5;
var glassSize = 1 + 14 * 0.5;


var glassSlider = new READING.Slider('rgb(72, 92,55)', 'rgb(246,201,204)', 0.5, 90, 55);
glassSlider.appendTo('glassSizeSliderDiv');
glassSlider.draw();
glassSlider.addChangeEvent(function () {


    var maxR = glassSizeCanvas.width / 2 - 5,
        percent = parseFloat(glassSlider.knobPercent),
        value = 25 + new Number((percent * 175).toFixed(0));

    magnifyingRadius =  value;

    drawGlassIcon(glassSizeCtx, maxR * percent);
    eraseMagnifyGlass();
    var x = magnifyingGlassX ? magnifyingGlassX : canvas.width /2 ;
    var y = magnifyingGlassY ? magnifyingGlassY : canvas.height /2 ;
    drawMagnifyingGlass({x: x, y: y});
});


var magnifySlider = new READING.Slider('rgb(72, 92,55)', 'rgb(246,201,204)', 0.5, 90, 55);
magnifySlider.appendTo('magnifySlider');
magnifySlider.draw();
magnifySlider.addChangeEvent(function () {
    scaleOutput = 1 + 2 * magnifySlider.knobPercent;
    document.getElementById('scaleOutput').innerText = scaleOutput.toFixed(2);
    eraseMagnifyGlass();
    drawMagnifyingGlass({x: magnifyingGlassX, y: magnifyingGlassY});
});


var glassSizeCanvas = document.getElementById('glassSizeCanvas');
var glassSizeCtx = glassSizeCanvas.getContext('2d');

var drawGlassIcon = function(context, radius){
    context.save();
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.shadowColor = 'rgba(52, 72, 35, 0.5)';
    context.shadowOffsetX = 1;
    context.shadowOffsetY = 1;
    context.shadowBlur = 2;

    context.beginPath();
    context.arc(context.canvas.width / 2, context.canvas.height /2, radius + 3, 0, 2 * Math.PI);
    context.lineWidth = 1.5;
    context.strokeStyle = 'rgb(52, 72, 35)';
    context.stroke();

    context.beginPath();
    context.lineWidth = 0.5;
    context.strokeStyle = 'rgba(255,255,255,0.6)';
    context.arc(context.canvas.width /2 , context.canvas.height / 2, radius + 6, 0, 2 * Math.PI);
    context.stroke();

    context.restore();
}

drawGlassIcon(glassSizeCtx, glassSize);

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    image = new Image(),
    magnifyingGlassX = 0,
    magnifyingGlassY = 0,
    magnifyRect = {},
    magnifyingRadius = 120,
    imageData;

var calculateMagnifyRect = function (mouse) {
    var left, top, right, bottom;
    magnifyRect.x = mouse.x - magnifyingRadius;
    magnifyRect.y = mouse.y - magnifyingRadius;
    magnifyRect.width = 2 * magnifyingRadius + 2 * ctx.lineWidth;
    magnifyRect.height = 2 * magnifyingRadius + 2 * ctx.lineWidth;

    top = magnifyRect.y;
    left = magnifyRect.x;
    right = magnifyRect.x + magnifyRect.width;
    bottom = magnifyRect.y + magnifyRect.height;

    if(left < 0){
        magnifyRect.width += left;
        magnifyRect.x = 0;
    }else if(right > ctx.canvas.width){
        magnifyRect.width -= right - ctx.canvas.width;
    }
    if(top < 0){
        magnifyRect.height += top;
        magnifyRect.y = 0;
    } else if(bottom > ctx.canvas.height) {
        magnifyRect.height -= bottom - ctx.canvas.height;
    }
}

var setClip = function () {
    ctx.beginPath();
    ctx.arc(magnifyingGlassX, magnifyingGlassY, magnifyingRadius, 0, Math.PI * 2, false);
    ctx.clip();
}
var eraseMagnifyGlass = function(){
    if(imageData){
        ctx.putImageData(imageData, magnifyRect.x, magnifyRect.y);
    }
}
var drawMagnifyGlassCircle = function (mouse) {
    // var gradientThickness = magnifyingRadius / 7;
    // gradientThickness = gradientThickness < 10 ? 10 : gradientThickness;
    // gradientThickness = gradientThickness > 40 ? 40 : gradientThickness;

    var gradientThickness = 10;
    ctx.save();
    ctx.lineWidth = gradientThickness;
    ctx.strokeStyle = 'rgb(0, 0, 255, 0.3)';

    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, magnifyingRadius, 0, 2 * Math.PI, false);
    ctx.clip();

    var gradient = ctx.createRadialGradient(mouse.x,
        mouse.y,
        magnifyingRadius - gradientThickness,
        mouse.x,
        mouse.y,
        magnifyingRadius);
    gradient.addColorStop(0, 'rgba(0,0,0,.2)');
    gradient.addColorStop(0.80, 'rgb(235, 237,255)');
    gradient.addColorStop(0.90, 'rgb(235, 237,255)');
    gradient.addColorStop(1.0, 'rgba(150, 150, 150, 0.9)');

    ctx.shadowColor = 'rgba(52, 72, 35, 1.0)';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 20;

    ctx.strokeStyle = gradient;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, magnifyingRadius - gradientThickness / 2, 0, Math.PI * 2, false);
    ctx.clip();

    ctx.lineWidth = gradientThickness;
    ctx.strokeStyle = 'rgba(0, 0,0,0.06)';
    ctx.stroke();
    ctx.restore();
}

var drawMagnifyingGlass= function(mouse){
    var scaledMagnifyRect;
    magnifyingGlassX = mouse.x;
    magnifyingGlassY = mouse.y;

    calculateMagnifyRect(mouse);
    imageData = ctx.getImageData(magnifyRect.x, magnifyRect.y, magnifyRect.width, magnifyRect.height);
    ctx.save();

    scaledMagnifyRect = {
        width: magnifyRect.width * scaleOutput,
        height: magnifyRect.height * scaleOutput
    };

    setClip();
    ctx.drawImage(canvas,
        magnifyRect.x,
        magnifyRect.y,
        magnifyRect.width,
        magnifyRect.height,
        magnifyRect.x + magnifyRect.width /2 - scaledMagnifyRect.width / 2,
        magnifyRect.y + magnifyRect.height /2 - scaledMagnifyRect.height /2,
        scaledMagnifyRect.width,
        scaledMagnifyRect.height
    );
    ctx.restore();
    drawMagnifyGlassCircle(mouse);
}

var draw = function () {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    drawMagnifyingGlass({x: canvas.width / 2, y: canvas.height / 2});
}

image.src = '../images/canyon.png';
image.onload = function () {
    draw();
}

var mousedown = {},
    mouseup = {},
    dragging = false,
    velocityX = 0,
    velocityY  = 0,
    playing = true,
    pinchRatio;

var windowToCanvas = function (x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    }
};

var didThrow = function () {
    var elapsedTime = mouseup.time - mousedown.time;
    var elapasedMotion = Math.abs(mouseup.x - mousedown.x) + Math.abs(mouseup.y - mousedown.y);
    return (elapasedMotion / elapsedTime * 10) > 3;
}

var animate = function () {
    eraseMagnifyGlass();
    if(playing){
        if(magnifyingGlassX + magnifyingRadius > ctx.canvas.width || magnifyingGlassX - magnifyingRadius < 0){
            velocityX = -velocityX;
        }
        if(magnifyingGlassY + magnifyingRadius > ctx.canvas.height || magnifyingGlassY - magnifyingRadius  < 0){
            velocityY = -velocityY;
        }
        var x = magnifyingGlassX + velocityX;
        var y = magnifyingGlassY + velocityY;
        drawMagnifyingGlass({x: x, y:y});
        window.requestNextAnimationFrame(animate);
    }
}
var mouseDownOrTouchStart = function(mouse){
    mousedown = mouse
    mousedown.time = +new Date;
    if(playing){
        playing = false;
    }
    dragging = true;
    ctx.save();
}
var mouseUpOrTouchEnd = function (mouse) {
    mouseup = mouse;
    mouseup.time = +new Date;
    if(dragging && didThrow()){
        // console.log(mouseup.x - mousedown.x, mouseup.time - mousedown.time);
        velocityX = (mouseup.x - mousedown.x) / (mouseup.time - mousedown.time) * 10;
        velocityY = (mouseup.y - mousedown.y) / (mouseup.time - mousedown.time) * 10
        playing = true;
        window.requestNextAnimationFrame(animate);
    }
    dragging = false;
}
var isDragging = function (e) {
    var changed = e.changedTouches.length,
        touching = e.touches.length;

    return changed === 1 && touching === 1;
}

var isPinching = function (e) {
    var changed = e.changedTouches.length,
        touching = e.touches.length;

    return changed === 1 || changed == 2 && touching === 2;
}

canvas.ontouchstart = function (e) {
    e.preventDefault();

    if(isDragging(e)){
        mouseDownOrTouchStart(windowToCanvas(e.pageX, e.pageY));
    }
    else if(isPinching(e)){
        //两指, 放大缩小
        var touch1 = e.touches.item(0),
            touch2 = e.touches.item(1),
            point1 = windowToCanvas(touch1.pageX, touch1.pageY),
            point2 = windowToCanvas(touch2.pageX, touch2.pageY),
            distance = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
        pinchRatio = scaleOutput / distance;
    }
}
canvas.ontouchmove = function (e) {
    e.preventDefault();
    if(isDragging(e)){
        eraseMagnifyGlass();
        drawMagnifyingGlass(windowToCanvas(e.pageX, e.pageY));
    }else if(isPinching(e)){
        var touch1 = e.touches.item(0),
            touch2 = e.touches.item(1),
            point1 = windowToCanvas(touch1.pageX, touch1.pageY),
            point2 = windowToCanvas(touch2.pageX, touch2.pageY),
            distance = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
        var scale = pinchRatio * distance;
        if(scale > 1 && scale < 3){
            scaleOutput = parseFloat(scale).toFixed(2);

            eraseMagnifyGlass();
            drawMagnifyingGlass(windowToCanvas(magnifyingGlassX, magnifyingGlassY));
        }
    }
}
canvas.ontouchend = function (e) {
    e.preventDefault();
    mouseUpOrTouchEnd(windowToCanvas(e.pageX, e.pageY));
}
canvas.onmousedown = function (e) {
    e.preventDefault();
    mouseDownOrTouchStart(windowToCanvas(e.clientX, e.clientY))
}
canvas.onmousemove = function (e) {
    e.preventDefault();
    if(dragging){
        eraseMagnifyGlass();
        drawMagnifyingGlass(windowToCanvas(e.clientX, e.clientY));
    }
}

canvas.onmouseup = function (e) {
    e.preventDefault();
    mouseUpOrTouchEnd(windowToCanvas(e.clientX, e.clientY));
}

if(window.matchMedia && screen.width <= 1024){
    var m = window.matchMedia('orientation:portrait'),
        lw = 0, lh = 0, lr = 0;

    function listener(mql) {
        var cr = canvas.getBoundingClientRect();

        if(mql.matches){
            lw = canvas.width;
            lh = canvas.height;
            lr = magnifyingRadius;
            var ratio = canvas.height / canvas.width;
            canvas.width = screen.width - 2 * cr.left;
            canvas.height = canvas.width * ratio;

            magnifyingRadius *= (canvas.width + canvas.height) / (lw + lh);
        }else if(lw !== 0 && lh !== 0){
            canvas.width = lw;
            canvas.height = lh;

            magnifyingRadius = lr;
        }

        draw();
    }
    m.addListener(listener);
}