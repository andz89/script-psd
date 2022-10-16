var doc = app.activeDocument



var layer = activeDocument.activeLayer; //Grab the currently selected layer

var layers = doc.layers.length

var count = 1;
while (layers > 1) {

var layer = activeDocument.activeLayer; //Grab the currently selected layer
// Calculate height and width based on the rectangular bounds of the selected layer
var height = layer.bounds[2]-layer.bounds[0]; //Grab the height
var width = layer.bounds[3]-layer.bounds[1]; //Grab the width

// Remove pixels from the height/width "200 px" => "200"
height = height.toString().replace(' px', '');
width = width.toString().replace(' px', '');

var response = confirm( 'height: ' +' ' + height + '  -------  ' + 'width: ' +' ' + width + ' ' )

if(response == false){
break;
}
var d = new Date()
var file_name = d.getTime()+ '-' + d.getMinutes()+ '-'+ d.getSeconds()+ '-'+ d.getHours()+'-'+ d.getDate() + '-' + d.getMonth() + '- ' + d.getFullYear()
layer.copy()

app.documents.add(UnitValue(height, 'PX'), UnitValue(width, 'PX'), 100, file_name + '-'+ count++, NewDocumentMode.RGB);
var doc = app.activeDocument


doc.paste()

saveJpg(doc);
function saveJpg(d) {
    var file;
    var saveOptions;
    file = File();
    saveOptions = new JPEGSaveOptions();
    saveOptions.embedColorProfile = true;
    saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    saveOptions.quality = 12; 
    saveOptions.name = 'sdfs'
    d.saveAs(file, saveOptions);
}

app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

var doc = app.activeDocument

var layer = activeDocument.activeLayer; //Grab the currently selected layer
layer.remove()


    layers--;
  }

