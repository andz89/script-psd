
  var canvas = new fabric.Canvas("canvas");

canvas.backgroundColor = '#fbebeb'
canvas.renderAll()



 document.querySelector('#upload').addEventListener('click',  async ()=>{
  let count = document.querySelector('#start_number').value
  let fileName =  document.querySelector('#fileName').value
  if(!count || fileName == ''){
    let alert = document.querySelector('.alert')
    alert.classList.add('alert-danger')
    alert.innerHTML = 'Empty Input';
    return false;
  }
    const fileHandle = await window.showOpenFilePicker({
    multiple: true, 
    types: [{
    description: 'Images',
    accept: {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/svg+xml": [".svg"],
  
    },

    }],
    })

 await fileHandle.map( async (file) => {
        let urlCreator = window.URL || window.webkitURL;
      let url =  urlCreator.createObjectURL(await file.getFile())
 
  const a = document.createElement("a");
  document.body.appendChild(a)
  a.href = url
  a.download = `${fileName}-${count++}.jpg`;
  a.click();
  document.body.removeChild(a)

  });
   
    })