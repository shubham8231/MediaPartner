const fileInput = document.getElementById("fileInput");
const fileName = document.querySelector(".fileName");
const maleSpeech = document.querySelector(".sub-voice.male");
const femaleSpeech = document.querySelector(".sub-voice.female");

fileInput.addEventListener('change',()=>{
    let name = fileInput.files[0].name;
    fileName.textContent = name;
})


maleSpeech.addEventListener('click',()=>{
    if(fileInput.files.length===0){
        alert("Please select a file first!")
        return
    }

    let file = fileInput.files[0]

    let formData = new FormData()
    formData.set('file', file)

    axios.post("/uploadFile", formData, {
        headers: {
            'speech-type':'male'
        },
        onUploadProgress: ProgressEvent => {
            const percentCompleted = Math.round(
                (ProgressEvent.loaded * 100)/(ProgressEvent.total)
            );
            console.log(`Uploading: ${percentCompleted}%`);
        }
    })
    .then(res => {
        console.log(res.data)
        window.open("/downloadFile/maleSpeech")
    })
})

femaleSpeech.addEventListener('click',()=>{
    if(fileInput.files.length===0){
        alert("Please select a file first!")
        return
    }

    let file = fileInput.files[0]

    let formData = new FormData()
    formData.set('file', file)

    axios.post("/uploadFile", formData, {
        headers: {
            'speech-type':'female'
        },
        onUploadProgress: ProgressEvent => {
            const percentCompleted = Math.round(
                (ProgressEvent.loaded * 100)/(ProgressEvent.total)
            );
            console.log(`Uploading: ${percentCompleted}%`);
        }
    })
    .then(res => {
        console.log(res.data)
        window.open("/downloadFile/femaleSpeech")
    })
})
