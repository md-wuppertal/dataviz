// shapefile.open("https://cdn.rawgit.com/mbostock/shapefile/master/test/points.shp")
// shapefile.open("data/Stadtgebiet_EPSG25832_SHAPE.shp")
//   .then(source => source.read()
//     .then(function log(result) {
//       if (result.done) {
//         return source; 
//       }
//       // console.log(result.value);
//       peter = "waht"
//       return source.read().then(log);
//     }))
//   .catch(error => console.error(error.stack));

var peter;

function preload() {
  console.log('id be first')
}
  shapefile.open("data/Stadtgebiet_EPSG25832_SHAPE.shp")
    .then(function(source) {
      console.log(source);
      source.read().then(function next(result) {
        if(result.done) return; //end if file was run through
        console.log(result.value.geometry.coordinates);
        peter = result.value.geometry.coordinates;
        return source.read().then(next);
      });
    })
    .catch(error => console.error(error.stack));

function setup() {
  noLoop();
  console.log("test");
  createCanvas(displayWidth, displayHeight);
  background(255, 204, 0);
  fill(255);
  peter[0].forEach(function(element) {
    // xPos = element[0]/40 - 9000
    // yPos = element[1]/40 - 141500
    xPos = element[0]/10 - 37000
    yPos = element[1]/10 - 568000
    console.log(xPos, yPos);
    ellipse(xPos, yPos, 1, 1);
  }, this);
}

function draw() {
  
}