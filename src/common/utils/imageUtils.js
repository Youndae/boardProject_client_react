let previewNo = 0;

export const setZeroToPreviewNo = () => {
    previewNo = 0;
}

export const setFormData = (values, files) => {
    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('content', values.content);
    files.forEach(file => formData.append('files', file.file));

    return formData;
}

export const parsingImageInput = (e, files) => {
    const validationResult = imageValidation(e);

    if(validationResult) {
        const fileList = e.target.files;
        let fileArr = [...files];

        for(let i = 0; i < fileList.length; i++) {
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

export const imageValidation = (e) => {
    const uploadFiles = e.target.files;
    const previewBoxLen = document.getElementsByClassName('preview-box').length;

    if(uploadFiles.length <= (5 - previewBoxLen)) {
        for(let idx = 0; idx < uploadFiles.length; idx++) {
            const fileName = uploadFiles[idx].name;
            const fileNameExtensionIdx = fileName.lastIndexOf('.') + 1;
            const fileNameExtension = fileName.toLowerCase().substring(fileNameExtensionIdx, fileName.length);

            if(
                !(fileNameExtension === 'jpg') &&
                !(fileNameExtension === 'gif') &&
                !(fileNameExtension === 'png') &&
                !(fileNameExtension === 'jpeg')
            ) {
                alert('jpg, gif, png, jpeg 확장자 파일만 업로드가 가능합니다.');
                return false;
            }
        }

        return true;
    }else {
        alert('이미지는 5장까지만 업로드가 가능합니다.');
        return false;
    }
}

export const deleteNewImagePreview = (e, files) => {
    const deleteIdx = Number(e.currentTarget.value) - 1;
    const arr = [...files];
    arr.splice(deleteIdx, 1);

    return arr;
}