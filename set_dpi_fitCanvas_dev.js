(function () {

    // Script variables
    var abort;
    var title = "Gwill Script";
    var feedback;
    // Reusable UI variables
    var g; // group
    var p; // panel
    var w; // window

    // Permanent UI variables
    var btnCancel;
    var btnFolderInput;
    var btnFolderOutput;
    var btnOk;
    var txtFolderInput;
    var txtFolderOutput;

    // SETUP

    // CREATE USER INTERFACE

    w = new Window("dialog", title);
    w.alignChildren = "fill";


    // p = w.add("panel", undefined, "Input");
    // g = p.add("group");
    // btnFolderInput = g.add("button", undefined, "Folder...");
    // txtFolderInput = g.add("statictext", undefined, "", {
    //     truncate: "middle"
    // });
    // txtFolderInput.preferredSize = [200, -1];
    p = w.add("panel", undefined, "Output");
    g = p.add("group");
    btnFolderOutput = g.add("button", undefined, "Folder...");
    txtFolderOutput = g.add("statictext", undefined, "", {
        truncate: "middle"
    });
    txtFolderOutput.preferredSize = [200, -1];

    p = w.add("panel", undefined,"Image Name");
    g = p.add("group");
    //  g.add('panel', undefined, "Panel title");
    txtInput = g.add("edittext", undefined, "",);
    g.alignment = "left";
    txtInput.preferredSize = [200, -1];
   
    g = w.add("group");
    g.alignment = "center";
    btnOk = g.add("button", undefined, "OK");
    btnCancel = g.add("button", undefined, "Cancel");


    // UI EVENT HANDLERS



    btnFolderOutput.onClick = function () {
        var f = Folder.selectDialog();
        if (f) {
            txtFolderOutput.text = f.fullName;
        }
    };
  
    btnOk.onClick = function () {
        // if (!txtFolderInput.text) {
        //     alert("Select input folder", " ", false);
        //     return;
        // }
        if (!txtFolderOutput.text) {
            alert("Select output folder", " ", false);
            return;
        }
        w.close(1);
    };

    btnCancel.onClick = function () {
        w.close(0);
    };


    // SHOW THE WINDOW

    if (w.show() == 1) {
        try {
       
            progress("Reading folder...");
            doc = app.activeDocument
            var layers = doc.layers.length
            progress.set(layers.length);
            try {
            // Loop through files array.
            fit_image()
            } finally {
            progress.close();
            }

            alert(abort || feedback, title, false);
        } catch (e) {
            alert("An error has occurred.\nLine " + e.line + ": " + e.message, title, true);
        }
    }




    function progress(message) {
        var b;
        var t;
        var w;
        w = new Window("palette", "Progress", undefined, {
            closeButton: false
        });
        t = w.add("statictext", undefined, message);
        t.preferredSize = [450, -1];
        b = w.add("progressbar");
        b.preferredSize = [450, -1];
        progress.close = function () {
            w.close();
        };
        progress.increment = function () {
            b.value++;
        };
        progress.message = function (message) {
            t.text = message;
            app.refresh();
        };
        progress.set = function (steps) {
            b.value = 0;
            b.minvalue = 0;
            b.maxvalue = steps;
        };
        w.show();
        app.refresh();
    }
    function fit_image(){
        doc = app.activeDocument
var items = doc.layers.length - 1
var layers = doc.layers.length
var count = doc.layers.length - 2

while (layers > 1) {

           
    var layer = doc.layers[count--]; 
// var layer = app.activeDocument.activeLayer

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

  set_size()
  feedback = 'Successful! Processed  ' + items + " items"
    }





function set_size(){

var doc = app.activeDocument
app.displayDialogs = DialogModes.NO;
var layer = activeDocument.activeLayer; //Grab the currently selected layer

var layers = doc.layers.length
var progress_count = 1
var count = 1;
while (layers > 1) {

var layer = activeDocument.activeLayer; //Grab the currently selected layer
// Calculate height and width based on the rectangular bounds of the selected layer
var height = layer.bounds[2]-layer.bounds[0]; //Grab the height
var width = layer.bounds[3]-layer.bounds[1]; //Grab the width

// Remove pixels from the height/width "200 px" => "200"
height = height.toString().replace(' px', '');
width = width.toString().replace(' px', '');


var d = new Date()
var file_name = d.getTime()+ '-' + d.getMinutes()+ '-'+ d.getSeconds()+ '-'+ d.getHours()+'-'+ d.getDate() + '-' + d.getMonth() + '- ' + d.getFullYear()
layer.copy()

app.documents.add(UnitValue(height, 'PX'), UnitValue(width, 'PX'), doc.resolution, file_name  + '-', NewDocumentMode.RGB);
var doc = app.activeDocument


doc.paste()

saveJpg(doc);
function saveJpg(doc) {
  
    var fileName = txtInput.text || 'untitled'
  var  fileJpg = new File(txtFolderOutput.text + "/" +  fileName+ '-' + count++ + ".jpg");

    progress.message(File.decode(fileName)+ ' - ' + progress_count++ + ': ' +' '  + 'width:' + doc.width+ ' ' + 'height:'+ doc.height);
 
    // Do something with image here
    saveOptions = new JPEGSaveOptions();
    saveOptions.embedColorProfile = true;
    saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    saveOptions.quality = 12;
    doc.saveAs(fileJpg, saveOptions)
    progress.increment();
}

app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

var doc = app.activeDocument

var layer = activeDocument.activeLayer; //Grab the currently selected layer
layer.remove()


    layers--;
  }
    }
})();