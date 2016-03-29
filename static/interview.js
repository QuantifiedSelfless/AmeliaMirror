var user_data;

function preload() {
    //imgDC = loadImage('static/Yellow-Tree-logo.png');
    bg_image = loadImage('static/paper2.jpg');
    folder = loadImage('static/manilla.png');
    card = loadImage('static/timecard.png');
    coffee_notes = loadImage('static/cofnotes.png');
    //Eventually this should use the URL param to make an AJAX call
    user_data = {
        name: "Duggy McSwisher",
        cons: ["said they disliked work 87 times", 
                "used the word 'late' 150 times",
                "shares articles about communism",
                "said drunk 265 times"],
        pros: ["talked about biking 31 times",
                "mentioned coffee 129 times",
                "said they love technology",
                "shared an article about career achievement"]
    };
    handy = loadFont('static/type2.ttf');

}

function setup() {
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('processing');
    textFont(handy);
	fill('rgba(0,0,0,0.75)');
	noStroke();
    image(folder, .15*windowWidth, .01*windowHeight);
    image(bg_image, .2*windowWidth, .2*windowHeight, .5*windowWidth, .8*windowHeight);
	cardWidth = windowWidth/4.6;
	cardHeight = card.height/(card.width/(cardWidth));
	image(card, .02*windowWidth, .25*windowHeight, cardWidth, cardHeight);
	coffeeWidth = windowWidth/4.85;
	coffeeHeight = coffee_notes.height/(coffee_notes.width/(coffeeWidth));
    image(coffee_notes, .7*windowWidth, .09*windowHeight, coffeeWidth, coffeeHeight);
    textStyle(BOLD);
    textSize(42);
    text(user_data.name,.25*windowWidth, .27*windowHeight );
    textStyle(ITALIC);
    textSize(36);
    text("Concerns:", .25*windowWidth, .35*windowHeight);
    textSize(26);
    textStyle(NORMAL);
	var consList = "";
    for (var i = 0; i < user_data.cons.length; i++){
        //text("..." + user_data.cons[i], windowWidth*.3, windowHeight*.37 + (windowHeight*.05*i));
		consList = consList + "..." + user_data.cons[i] + "\n";
    }
	text(consList, windowWidth*.3, windowHeight*.37, windowWidth*.5, windowHeight - windowHeight*.37)
	
    textSize(32);
    text("Positive:", .25*windowWidth, .65*windowHeight);
    textSize(26);
	var prosList = "";
    for (var i = 0; i < user_data.pros.length; i++){
		prosList = prosList + "..." + user_data.pros[i] + "\n";
    }
	text(prosList, windowWidth*.3, windowHeight*.67, windowWidth*.5, windowHeight - windowHeight*.65)
}

function draw() {
}    
