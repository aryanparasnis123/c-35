var ball;
var database,ballPosition;

function setup(){
    createCanvas(500,500);
    database=firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //Refer to the node
    //.ref() is used to create reference to the location of database value
    var ballP=database.ref("Ball/position");
    //create a listener
    //.on() creates listener which keeps listening to the changes in the database
    ballP.on("value",readPosition)


}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

//write back to database
function writePosition(x,y){
   //Refer to the node
   //.set() sets value in the database
    database.ref("Ball/position").set({
        x:ballPosition.x+x,
        y:ballPosition.y+y
    })
}

//reading value from DB
function readPosition(data){
    //.val() is used to retrieve the data from the database
   ballPosition=data.val();
   ball.x=ballPosition.x;
   ball.y=ballPosition.y;
}
