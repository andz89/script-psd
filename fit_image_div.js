
var doc = app.activeDocument

var layer = activeDocument.activeLayer; //Grab the currently selected layer

var layers = doc.layers.length
var count = doc.layers.length -2

while (layers > 1) {

var layer = doc.layers[count--]; 

// Calculate height and width based on the rectangular bounds of the selected layer
var height = layer.bounds[2]-layer.bounds[0]; //Grab the height
var width = layer.bounds[3]-layer.bounds[1]; //Grab the width

// Remove pixels from the height/width "200 px" => "200"
height = height.toString().replace(' px', '');
width = width.toString().replace(' px', '');
var defaultRulerUnits = app.preferences.rulerUnits;  
app.preferences.rulerUnits = Units.PIXELS;  
var bounds = layer.bounds;  
var layerWidth = bounds[2].as('px')-bounds[0].as('px');  
var layerHeight = bounds[3].as('px')-bounds[1].as('px');  

var document_width = doc.width.as('px');  
var document_height = doc.height.as('px');  

if(width < height){
	var layerRatio = layerWidth / layerHeight;
            var newHeight =  document_height;
            var newWidth = document_height;  
            var resizePercent = newHeight/layerHeight*100;  
            layer.resize(resizePercent,resizePercent,AnchorPosition.MIDDLECENTER);  

}else{
    var newHeight = document_height;
    var newWidth = document_width;  
    if (newHeight >= document_height) {  
        newWidth = document_width;  
        newHeight = document_height;  
    } 
    var resizePercent = newWidth/layerWidth*100;  
            layer.resize(resizePercent,resizePercent,AnchorPosition.MIDDLECENTER);  
 
  
}

app.preferences.rulerUnits = defaultRulerUnits; 
    layers--;
 
  }

