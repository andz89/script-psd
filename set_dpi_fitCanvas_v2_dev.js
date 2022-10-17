(function () {

    // Script variables
    var abort;
    var title = "Gwill Script";
    var feedback;
    // Reusable UI variables
    var g; // group
    var p; // panel
    var w; // window
    var progress_count = 1
    var count = 1;
    var items;
    var files_count
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


    p = w.add("panel", undefined, "Input");
    g = p.add("group");
    btnFolderInput = g.add("button", undefined, "Folder...");
    txtFolderInput = g.add("statictext", undefined, "", {
        truncate: "middle"
    });
    txtFolderInput.preferredSize = [200, -1];
  
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

    btnFolderInput.onClick = function () {
        var f = Folder.selectDialog();
        if (f) {
            txtFolderInput.text = f.fullName;
        }
    };

    btnFolderOutput.onClick = function () {
        var f = Folder.selectDialog();
        if (f) {
            txtFolderOutput.text = f.fullName;
        }
    };
  
    btnOk.onClick = function () {
        if (!txtFolderInput.text) {
            alert("Select input folder", " ", false);
            return;
        }
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
             // Get files in folder.
             files = new Folder(txtFolderInput.text).getFiles(function (f) {
                if (f.hidden || f instanceof Folder) {
                return false;
                }
                return true;
                });
            // progress.set(files.length);
            try {
                items = files.length
                var file = files.length - 1
                files_count = files.length
                // alert(files[0])
                while(files_count > 0){
              
                    fit_image(files[file])
                    files_count--
                    file--
                }
              
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
    function fit_image(file){
// =======================================================
var idPlc = charIDToTypeID( "Plc " );
    var desc11 = new ActionDescriptor();
    var idIdnt = charIDToTypeID( "Idnt" );
    desc11.putInteger( idIdnt, 4 );
    var idnull = charIDToTypeID( "null" );
    desc11.putPath( idnull, file );
    var idFTcs = charIDToTypeID( "FTcs" );
    var idQCSt = charIDToTypeID( "QCSt" );
    var idQcsa = charIDToTypeID( "Qcsa" );
    desc11.putEnumerated( idFTcs, idQCSt, idQcsa );
    var idOfst = charIDToTypeID( "Ofst" );
        var desc12 = new ActionDescriptor();
        var idHrzn = charIDToTypeID( "Hrzn" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc12.putUnitDouble( idHrzn, idPxl, 0.000000 );
        var idVrtc = charIDToTypeID( "Vrtc" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc12.putUnitDouble( idVrtc, idPxl, 0.000000 );
    var idOfst = charIDToTypeID( "Ofst" );
    desc11.putObject( idOfst, idOfst, desc12 );
executeAction( idPlc, desc11, DialogModes.NO );

doc = app.activeDocument





           
    var layer = doc.activeLayer 
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

   
set_size()

  }








function set_size(){

var doc = app.activeDocument
app.displayDialogs = DialogModes.NO;
var layer = doc.activeLayer; //Grab the currently selected layer





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

    feedback = 'Successful! Processed  ' + items + " items"

   


    }
})();