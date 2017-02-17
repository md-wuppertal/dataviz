var myCanvas;
var shiftSlider;
var shift = 0;
var myScale = 40;
var scaleSlider;
var mapData;

var xShift = 37000;
var yShift = 568000;

function preload() {
  console.log('id be first')
}
  shapefile.open("data/Stadtgebiet_EPSG25832_SHAPE.shp")
    .then(function(source) {
      console.log(source);
      source.read().then(function next(result) {
        if(result.done) return; //end if file was run through
        console.log(result.value.geometry.coordinates);
        mapData = result.value.geometry.coordinates;
        return source.read().then(next);
      });
    })
    .catch(error => console.error(error.stack));

function setup() {
  // noLoop();
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
  mapData[0].forEach(function(element) {
    xPos = element[0]/myScale - (xShift + shift)
    yPos = element[1]/myScale - (yShift + shift)
    ellipse(xPos, yPos, 1, 1);
  }, this);
  shift = shiftSlider.value();
  myScale = scaleSlider.value();
  text(shift, 1000, 300);
  text(myScale, 1000, 400);
}