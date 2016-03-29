var user_data;
var static_phrases = {
    compliments: ["You look beautiful today",
        "Everyone at work is waiting for you",
        "You're going to be a star today",
        "No one is more important than you are",
        "Love yourself",
        "Be diligent",
        "Hard work is good work"],
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
var weather_day_lookup = {
    "Drizzle" : "static/Rain-100.png",
    "Rain" : "static/Rain-100.png",
    "Thunderstorm" : "static/Storm-100.png",
    "Snow" : "static/Snow-100.png",
    "Atmosphere" : "static/Fog Day-100.png",
    "Clear" : "static/Sun-100.png",
    "Clouds" : "static/Partly Cloudy Day-100.png"
};
var weather_night_lookup = {
    "Drizzle" : "static/Rain-100.png",
    "Rain" : "static/Rain-100.png",
    "Thunderstorm" : "static/Storm-100.png",
    "Snow" : "static/Snow-100.png",
    "Atmosphere" : "static/Fog Night-100.png",
    "Clear" : "static/Bright Moon-100.png",
    "Clouds" : "static/Partly Cloudy Night-100.png"
};

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
var showName = true;

function preload() {
    replay = loadFont('static/BPreplay/BPreplay.otf');
    skyline = loadFont('static/Small Town Skyline.ttf');
    dancing = loadFont('static/dancing-script-ot/DancingScript-Regular.otf');
    lekton = loadFont('static/lekton/Lekton-Regular.ttf');
    user_data = {
        name: "Michael Skirpan",
        friends: ["Jackie Cameron",
        "Julie Cafarella",
        "Simone Hyater-Adams",
        "Patrick Cooper"],
        work: "CU-Boulder",

    }
    weather = loadJSON('http://api.openweathermap.org/data/2.5/weather?zip=80305&appid=4efeb242f4b0a7c03742769c5a5755e5');
    rando = floor(random(0, static_phrases.hellos.length));
    hello_text = static_phrases.hellos[rando];
}

function setup() {
    myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('processing');
    textFont(replay);
    console.log(weather.weather[0].main);
    if (hour() >= 20){
       weather_icon = loadImage(weather_night_lookup[weather.weather[0].main]) 
    } else {
        weather_icon = loadImage(weather_day_lookup[weather.weather[0].main])
    }
    frameRate(10);
    reBox();
    setTimeout(killName, 10000);
}

function draw() {
    if (live == false) {
        return
    }
    background('black');
    image(weather_icon, windowWidth*.9, 10);
    if (showName == true) {
        push();
            fill(255, 255, 255);
            textFont(replay);
            textSize(36);
            textAlign(CENTER);
            text(hello_text + " " + user_data.name, windowWidth*.5, windowHeight * .2 );
        pop();
    } else {
        push();
            fill(255, 255, 255);
            textFont(lekton);
            textSize(32);
            textAlign(LEFT);
            text("TO-DO LIST:", windowWidth*.7, windowHeight*.4);
            textSize(26);
            text("1. Prep for meeting", windowWidth*.75, windowHeight*.45);
        pop();
    }
    msgBox.update();
    compBox.update();
}

function killName () {
    showName = false;
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
    this.phrases = shuffle(static_phrases.messages);
    this.holdoff = pausing;

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

var SlideBox = function ( size, y_pos, speed, stay, pausing ) {
    //orient == left -> textAlign(RIGHT)
    this.x = -300;
    this.y = y_pos;
    this.text_size = size;
    this.on = false;
    this.going = false;
    this.speed = speed;
    this.stay = stay;
    this.holdoff = pausing;
    this.phrases = shuffle(static_phrases.compliments);
    this.fade = 'up';
    this.curr_text = '';
    shuffle(this.phrases);

    this.update = function () {
        if (this.on == false) {
            this.pause();
            return;
        }

        push();
            textFont(dancing);
            fill(255, 255, 255);
            textAlign(CENTER);
            textSize(this.text_size);
            text(this.curr_text, this.x, this.y);
        pop();
        if (this.going == false) {
            return;
        }
        if (this.fade == 'up') {
            this.x += this.speed;
        } else {
            this.x -= this.speed;
        }
        if (this.x >= windowWidth*.3) {
            this.going = false;
            this.fade = 'down';
            this.ontime();
            return;
        } else if (this.x <= -301) {
            this.on = false;
            this.going = false;
        }

    }

    this.ontime = function () {
        mine = this;
        this.going = false;
        setTimeout(function () {
            mine.activate();
        }, mine.stay);
    }

    this.activate = function () {
        if (this.going == false) {
            this.going = true;
        }
    }

    this.pause = function () {
        this.on = true;
        mine = this;
        setTimeout(function () {
            mine.nextText();
        }, this.holdoff);
    }

    this.nextText = function () {
        if (this.phrases.length > 0) {
            phrase = this.phrases.pop();
        } else {
            stopIt();
        }
        this.curr_text = phrase;
        this.on = true;
        this.going = true;
        this.fade = 'up';
    }

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
    msgBox = new FadeBox(48, windowWidth*.5, windowHeight*.9, 3000, 2000);
    compBox = new SlideBox(40, windowHeight*.1, 50, 1000, 2000);

}

function stopIt() {
    //Call when user scans again
    myCanvas.clear();
    background(0, 0 ,0);
    live = false;
}

function startIt() {
    //Call after a new scanner call
    reBox();
    loop();
    live = true;
}

function mouseClicked() {
    if (live == true) {
        stopIt();
    } else {
        startIt();
    }
}