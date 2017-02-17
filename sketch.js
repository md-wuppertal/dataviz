var myCanvas;
var shiftSlider;
var shift = 0;
var myScale = 40;
var scaleSlider;
var mapData;

var map_x_offset;
var map_y_offset;

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

function setup() {
  frameRate(30)
  shiftSlider = select('#shiftSlider');
  scaleSlider = select('#scaleSlider');
  createCanvas(displayWidth, displayHeight);
  background(255, 204, 0);
  fill(255);
}

function draw() {
  background(255, 204, 0);
  fill(255);
  stroke(255);
  map_x_offset = mapData[0][0][0];
  map_y_offset = mapData[0][0][1];
  mapData[0].forEach(function(element) {
    xPos = (element[0] - map_x_offset)/myScale + displayWidth/2 + shift
    yPos = (element[1] - map_y_offset)/myScale + displayHeight/2 + shift
    ellipse(xPos, yPos, 5, 5);
  }, this);
  shift = shiftSlider.value();
  myScale = scaleSlider.value();
  text(shift, 1000, 300);
  text(myScale, 1000, 400);
}