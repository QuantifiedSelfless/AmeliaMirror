var user_data;
var static_phrases = {
    compliments: ["You look beautiful today",
        "Everyone at work is waiting for you",
        "You're going to be a star today",
        "No one is more important than you are",
        "Love yourself"],
    subliminal : [
        "Work harder"],
    messages : [
        "wants you to have a great day!",
        "reminds you to enjoy work!",
        "hopes you remember they care about you",
        "winks at your cute self!"],
    hellos: ["Welcome Back",
        "Nice to see you",
        "Happy you're here"]

}
var live = true;
//slider
var compBox;
//static
var nameBox;
//fade
var msgBox;
//fade
var infoBox;
//slider
var subBox;
var hello_text;
var myCanvas;

function preload() {
    replay = loadFont('static/BPreplay/BPreplay.otf');
    skyline = loadFont('static/Small Town Skyline.ttf');
    user_data = {
        name: "Michael Skirpan",
        friends: ["Jackie Cameron",
        "Julie Cafarella",
        "Simone Hyater-Adams",
        "Patrick Cooper"],
        work: "CU-Boulder",

    }
    rando = floor(random(0, static_phrases.hellos.length));
    hello_text = static_phrases.hellos[rando];
}

function setup() {
    myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('processing');
    textFont(replay);
    frameRate(10);
    reBox();
    console.log('setup called');
}

function draw() {
    if (live == false) {
        return
    }
    background('black');
    push();
        fill(255, 255, 255);
        textFont(replay);
        textSize(36);
        textAlign(CENTER);
        text(hello_text + " " + user_data.name, windowWidth*.5, windowHeight * .2 );
    pop();
    msgBox.update();
}

var FadeBox = function ( size, x_pos, y_pos, stay, pausing) {
    this.text_size = size;
    this.x = x_pos;
    this.y = y_pos;
    this.on = false;
    this.opacity = 0;
    this.curr_text = '';
    this.stay = stay;
    this.going = false;
    this.fade = 'up';
    this.phrases = static_phrases['messages'];
    this.holdoff = pausing;
    shuffle(this.phrases);

    //Change opacity
    this.update = function () {
        if (this.on == false) {
            this.pause();
            return;
        }

        push();
            textFont(skyline);
            fill('rgba(255, 255, 255,'+ this.opacity +')');
            textAlign(CENTER);
            textSize(this.text_size);
            text(this.curr_text, this.x, this.y);
        pop();
        if (this.going == false) {
            return;
        }
        if (this.fade == 'up') {
            this.opacity += .05;
        } else {
            this.opacity -= .05;
        }
        if (this.opacity >= 1) {
            this.going = false;
            this.fade = 'down';
            this.ontime();
            return;
        } else if (this.opacity <= 0) {
            this.on = false;
            this.going = false;
            this.opacity = 0;
        }

    }

    this.ontime = function () {
        me = this;
        this.going = false;
        setTimeout(function () {
            me.activate();
        }, me.stay);
    }

    this.activate = function () {
        if (this.going == false) {
            this.going = true;
        }
    }

    this.pause = function () {
        this.on = true;
        me = this;
        setTimeout(function () {
            me.nextText();
        }, this.holdoff);
    }

    this.nextText = function () {
        console.log('next text');
        rando1 = floor(random(0, user_data['friends'].length));
        name = user_data['friends'][rando1];
        if (this.phrases.length > 0) {
            phrase = this.phrases.pop();
        } else {
            stopIt();
        }
        this.curr_text = name + " " + phrase;
        this.on = true;
        this.going = true;
        this.opacity = 0;
        this.fade = 'up';
    }
}

var SlideBox = function ( size, y_pos, orient, font, speed ) {
    //orient == left -> textAlign(RIGHT)
    this.orient = orient;
    this.font = font;
    this.y_pos = y_pos;
    this.text_size = size;
    this.on = false;
    this.speed = speed;

}

//slider
// var compBox;
// //static
// var nameBox;
// //fade
// var msgBox;
// //fade
// var infoBox;
// //slider
// var subBox;

function reBox() {
    //Take new user data and fill boxes
    msgBox = new FadeBox(48, windowWidth*.5, windowHeight*.8, 3000, 2000);

}

function stopIt() {
    //Call when user scans again
    myCanvas.clear();
    background(0, 0 ,0);
    console.log('reset background');
    live = false;
}

function startIt() {
    //Call after a new scanner call
    console.log("starting up");
    reBox();
    loop();
    live = true;
}

function mouseClicked() {
    console.log(live);
    if (live == true) {
        stopIt();
    } else {
        startIt();
    }
}