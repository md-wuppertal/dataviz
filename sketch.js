var myCanvas;
var shiftSlider;
var shift = 0;
var myScale = 40;
var scaleSlider;
var mapData;
var ecoData = [];

var map_x_offset;
var map_y_offset;
var pg;

var rotZ = rotX = 0;
var mX = mY = oX = oY = deltaX = deltaY = 0;


shapefile.open("data/Stadtgebiet_EPSG25832_SHAPE.shp")
  .then(function(source) {
    console.log(source);
    source.read().then(function next(result) {
      if(result.done) return; //end if file was run through
      mapData = result.value.geometry.coordinates;
      return source.read().then(next);
    });
  })
  .catch(error => console.error(error.stack));
  shapefile.open("data/Umweltzonen_EPSG25832_SHAPE.shp")
  .then(function(source) {
    console.log(source);
    source.read().then(function next(result) {
      if(result.done) return; //end if file was run through
      ecoData.push(result.value.geometry.coordinates);
      return source.read().then(next);
    });
  })
  .catch(error => console.error(error.stack));


function setup() {
  createCanvas(displayWidth, displayHeight, WEBGL); //
  pg = createGraphics(displayWidth, displayHeight); // create separate graphics object

  frameRate(30) //slow a little to save graphicscard
  background(255, 204, 0); //nice yellow background
  fill(255); 
  scaleSlider = select('#scaleSlider');
  shiftSlider = select('#shiftSlider');
}

function draw() {
  background(255, 204, 0);
 
  pg.background(255, 204, 0);
  pg.push();
  pg.beginShape();
  pg.fill(255);
  pg.stroke(255);
  map_x_offset = mapData[0][0][0];
  map_y_offset = mapData[0][0][1];
  mapData[0].forEach(function(element) {
    xPos = (element[0] - map_x_offset)/myScale + shift + width/1.4
    yPos = (element[1] - map_y_offset)/myScale + shift + height/1.1
    pg.vertex(xPos, yPos);
  }, this);
  pg.endShape();
  pg.pop();
  drawEcoZone();


  pg.fill(0);
  pg.noStroke();
  pg.text(shift, 1000, 300);
  pg.text(myScale, 1000, 400);
  
  // push();
  shift = shiftSlider.value();
  myScale = scaleSlider.value();
  // fill(255);
  // stroke(255);
  // box(30);
  // rotate(PI/-3, [1,0,0]);

  rotateX(radians(mY + deltaY));
  rotateZ(radians(mX + deltaX))
  translate(0,-200,30);
  texture(pg);
  plane(displayWidth, displayHeight); //thats the map canvas
  // box(30);
}


//braainfuck :P
function mousePressed() {
  oX = mouseX;
  oY = mouseY;
}

function mouseDragged() {
  deltaY = mouseY - oY;
  deltaX = mouseX - oX;
  // console.log(mX + deltaX);
}
function mouseReleased() {
  mX += deltaX;
  mY += deltaY;
  deltaX = deltaY = 0;
}

function drawEcoZone() {
  pg.push();
  pg.beginShape();
  pg.fill(255,20,0);
  pg.stroke(255);
  map_x_offset = ecoData[0][0][0][0];
  map_y_offset = ecoData[0][0][0][1];
  ecoData[0][0].forEach(function(element) {
    xPos = (element[0] - map_x_offset)/myScale + shift + width/1.4 + random(10)
    yPos = (element[1] - map_y_offset)/myScale + shift + height/1.1 + random(10)
    pg.vertex(xPos, yPos);
  }, this);
  pg.endShape();
  pg.beginShape();
  pg.fill(255,20,0);
  pg.stroke(255);
  // map_x_offset = ecoData[0][0][0][0];
  // map_y_offset = ecoData[0][0][0][1];
  ecoData[1][0].forEach(function(element) {
    xPos = (element[0] - map_x_offset)/myScale + shift + width/1.4
    yPos = (element[1] - map_y_offset)/myScale + shift + height/1.1
    pg.vertex(xPos, yPos);
  }, this);
  pg.endShape();
  pg.pop();
}