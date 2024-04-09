
let previewNo = 0;

export const setFormData = (values, files) => {
    let formData = new FormData();

    formData.append('imageTitle', values.title);
    formData.append('imageContent', values.content);
    files.forEach(file => formData.append('files', file.file));

    return formData;
}

export const setZeroToPreviewNo = () => {
    previewNo = 0;
};

export const imageInputChange = (e, files) => {
    const validationResult = imageValidation(e);

    if(validationResult){
        const fileList = e.target.files;
        let fileArr = [...files];

        for(let i = 0; i < fileList.length; i++){
            fileArr.push({
                fileNo: ++previewNo,
                file: fileList[i],
            })
        }

        return fileArr;
    }else {
        return null;
    }
}

export const deleteNewImagePreview = (e, files) => {
    const deleteNo = e.target.getAttribute('value');
    let arr = [...files];
    const delObject = arr.find(function (item) {
        return item.fileNo === Number(deleteNo);
    });

    const delIndex = arr.indexOf(delObject);

    arr.splice(delIndex, 1);

    return arr;
}

export const imageValidation = (e) => {
    const uploadFiles = e.target.files;
    const previewBoxLen = document.getElementsByClassName('preview-box').length;

    if(uploadFiles.length <= (5 - previewBoxLen)){
        for(let idx = 0; idx < uploadFiles.length; idx++){
            const fileName = uploadFiles[idx].name;
            const fileNameExtensionIndex = fileName.lastIndexOf('.') + 1;
            const fileNameExtension = fileName.toLowerCase().substring(fileNameExtensionIndex, fileName.length);

            if((fileNameExtension === 'jpg') || (fileNameExtension === 'gif')
                || (fileNameExtension === 'png') || (fileNameExtension === 'jpeg')){

            }else{
                alert('jpg, gif, png 확장자 파일만 업로드가 가능합니다.');
                return false;
            }
        }

        return true;
    }else {
        alert('사진은 5장까지만 업로드가 가능합니다.');
        return false;
    }
}
