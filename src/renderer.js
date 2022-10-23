// Add an event listener to our button.
document.getElementById('myButton').addEventListener('click', () => {
    console.log('Hello Nurse')

    const dialogConfig = {
        title: "Select a file",
        buttonLabel: "This one will do",
        properties: ["openFile"],
    };
    electron.openDialog("showOpenDialog", dialogConfig).then(result => {
        console.log(result)
// Since we only allow one file, just use the first one
//        const filePath = result.filePaths[0];

        const viewerEle = document.getElementById('viewer');
        viewerEle.innerHTML = ''; // destroy the old instance of PDF.js (if it exists)

// Create an iframe that points to our PDF.js viewer, and tell PDF.js to open the file that was selected from the file picker.
        const iframe = document.createElement('iframe');
        iframe.src = result;

// Add the iframe to our UI.
        viewerEle.appendChild(iframe);
    });

//    electron.openDialog("showOpenDialog", dialogConfig), (filepaths) =>{
//       console.log('Hello Nurse!')
})

