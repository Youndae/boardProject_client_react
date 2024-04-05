import React from "react";
import {customImageAxios} from "./customAxios";

export let imageStep = 0;
export let files = [];

/*
    React 특성상 수정사항이 없다면 재 랜더링을 하지 않으므로
    이 모듈을 사용하는 곳에서 useEffect를 통해 변수값을 초기화 하도록 한다.
    이렇게 하지 않는다면 파일이나 imageStep이 계속 중첩된다.
    다른 방법이 있다면 추후 개선.
 */
export const filesArrayReset = () => {
    // files = {};
    imageStep = 0;
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



export const imageInputOnChange = ({e, imageData, setImageData}) => {
    const uploadFiles = e.target.files;

    const previewBoxLen = document.getElementsByClassName('preview-box').length;

    let returnObject = [];
    if(uploadFiles.length <= (5 - previewBoxLen)){
        for(let fileIndex = 0; fileIndex < uploadFiles.length; fileIndex++){
            const file = uploadFiles[fileIndex];
            const previewNo = ++imageStep;
            if(imageValidation(file.name)) {
                console.log('validation true');
                const reader = new FileReader();
                reader.onload = image => {
                    // const previewNo = ++imageStep;

                    // src = String(image.target.result);
                    /*name = file.name;
                    src = String(image.target.result);
                    no = previewNo;*/
                    /*setImageData(
                        [...imageData,
                        image.target.result,]
                    )*/

                    setImageData(image.target.result);

                }


                /*reader.onload = function(img) {
                    const previewNo = ++imageStep;

                    name = file.name
                    src = img.target.result
                    no = previewNo

                }*/

                console.log('ob : ', returnObject);
                reader.readAsDataURL(file);

                /*const fileObject = setPreviewForm(file);
                returnObject.push(fileObject);*/

            }else
                break;

        }
        console.log('returnobject : ', returnObject);
        return returnObject;
    }else {
        alert('사진은 5장까지만 업로드가 가능합니다.');
    }
}
/*
export const imageInputOnChange = (e) => {
    const uploadFiles = e.target.files;

    const previewBoxLen = document.getElementsByClassName('preview-box').length;

    if(uploadFiles.length <= (5 - previewBoxLen)){
        for(let fileIndex = 0; fileIndex < uploadFiles.length; fileIndex++){
            const file = uploadFiles[fileIndex];

            if(imageValidation(file.name))
                setPreviewForm(file);
            else
                break;

        }
        return files;
    }else {
        alert('사진은 5장까지만 업로드가 가능합니다.');
    }
}*/

/*const imageValidation = (fileName) => {
    const fileNameExtensionIndex = fileName.lastIndexOf('.') + 1;
    const fileNameExtension = fileName.toLowerCase().substring(fileNameExtensionIndex, fileName.length);

    if((fileNameExtension === 'jpg') || (fileNameExtension === 'gif')
        || (fileNameExtension === 'png') || (fileNameExtension === 'jpeg')){
        return true;
    }else {
        alert('jpg, gif, png 확장자 파일만 업로드가 가능합니다.');
        return false;
    }
}*/

const setPreviewForm = (file) => {
    let fileData;
    const reader = new FileReader();
    reader.onload = function(img) {
        console.log('onload');
        const previewNo = ++imageStep;
        /*const previewNo = ++imageStep;

        /!*<p> file name </p>*!/
        const fileNameElem = document.createElement('p');
        fileNameElem.textContent = file.name;

        /!*<a href='#' value=0 onClick=deletePreview />삭제</a>*!/
        const deleteTag = document.createElement('a');
        deleteTag.href = '#';
        deleteTag.value = previewNo;
        deleteTag.onclick = deletePreview;
        deleteTag.textContent = '삭제';

        /!*<img className='thumbnail' src='imageName'/>*!/
        const imgTag = document.createElement('img');
        imgTag.className = 'thumbnail';
        imgTag.src = img.target.result;
        imgTag.style = 'width:300px; height:300px;';

        /!*<div className='preview-box' value=previewNo>
        *   <img />
        *   <p></p>
        *   <a></a>
        * </div>*!/
        const previewDiv = document.createElement('div');
        previewDiv.className = 'preview-box';
        previewDiv.appendChild(imgTag);
        previewDiv.appendChild(fileNameElem);
        previewDiv.appendChild(deleteTag);

        const previewParentDiv = document.getElementById('preview');
        previewParentDiv.appendChild(previewDiv);

        files[previewNo] = file;*/

        /*files[previewNo] = {
            originalFileName: file.name,
            src: img.target.result,
            previewNo: previewNo,
        };*/


        /*files.push({
            originalFileName: file.name,
            src: img.target.result,
            previewNo: previewNo,
        });*/

        /*files[previewNo] = {
            originalFileName: file.name,
            src: img.target.result,
            previewNo: previewNo,
        };*/

        /*files[previewNo] = {
            originalFileName: file.name,
            src: img.target.result,
            previewNo: previewNo,
        };*/

        // files[previewNo] = file;
        fileData = {
            originalFileName: file.name,
            src: img.target.result,
            previewNo: previewNo,
        }
        console.log('fileData 1 : ', fileData);
    }
    reader.readAsDataURL(file);

    console.log('fileData 2 : ', fileData);
    return fileData;

}

/*export const deleteArrayObject = (arr, deleteNo) => {
    // const previewParent = e.target.parentElement;
    // const previewValue = e.target.value;
    // previewParent.remove();
    // delete files[previewValue];

    const delObject = arr.find(function(item) {
        return item.fileNo === deleteNo;
    })

    const delIndex = arr.indexOf(delObject);
    arr.splice(delIndex, 1);

    return arr;
}*/

export const deleteOldPreview = (e) => {
    const previewParent = e.target.parentElement;
    const previewSibling = e.target.getAttribute('value');
    const nextSlibling = e.target.nextSibling.value;
    console.log('preview sibling : ', previewSibling);
    console.log('next sibling : ', nextSlibling);

    const imgTagSrc = e.target.previousElementSibling.previousElementSibling.getAttribute('src');
    console.log('imgTagSrc : ', imgTagSrc);

}

export const modifyFiles = (dataList) => {
    console.log('modify Files dataList : ', dataList);


    for(let idx = 0; idx < dataList.length; idx++){
        const previewNo = ++imageStep;
        customImageAxios.get(`display/${dataList[idx].imageName}`)
            .then(res => {
                console.log('display res : ', res);
                const myFile = new File([res.data], 'imageName');
                const reader = new FileReader();
                reader.onload = ev => {
                    const previewImage = String(ev.target?.result)

                    previewParentDivAppend(dataList[idx].oldName, previewNo, deleteOldPreview, previewImage);


                    /*const fileNameElem = document.createElement('p');
                    fileNameElem.textContent = dataList[idx].oldName;

                    const deleteTag = document.createElement('a');
                    deleteTag.href = '#';
                    deleteTag.value = previewNo;
                    deleteTag.onclick = deleteOldPreview;
                    deleteTag.textContent = '삭제';

                    const imgTag = document.createElement('img');
                    imgTag.className = 'thumbnail';
                    imgTag.src = previewImage;
                    imgTag.style = 'width:300px; height:300px;';

                    const previewDiv = document.createElement('div');
                    previewDiv.className = 'preview-box';
                    previewDiv.appendChild(imgTag);
                    previewDiv.appendChild(fileNameElem);
                    previewDiv.appendChild(deleteTag);

                    const previewParentDiv = document.getElementById('preview');
                    previewParentDiv.appendChild(previewDiv);*/
                }
                reader.readAsDataURL(myFile);
            })
            .catch(err => {
                console.error('display error : ', err);
            })
    }
}


/*createElement*/
function createFileNameElement (fileName) {
    const fileNameElem = document.createElement('p');
    fileNameElem.textContent = fileName;

    return fileNameElem;
}

function createDeleteATag (previewNo, onClickFunction) {
    const deleteTag = document.createElement('a');
    deleteTag.href = '#';
    deleteTag.value = previewNo;
    deleteTag.onclick = onClickFunction;
    deleteTag.textContent = '삭제';

    return deleteTag;
}

function createImgTag (imageSrc) {
    const imgTag = document.createElement('img');
    imgTag.className = 'thumbnail';
    imgTag.src = imageSrc;
    imgTag.style = 'width:300px; height:300px;';

    return imgTag;
}


function createPreviewDiv (imgTag, fileNameElem, deleteATag) {
    const previewDiv = document.createElement('div');
    previewDiv.className = 'preview-box';
    previewDiv.appendChild(imgTag);
    previewDiv.appendChild(fileNameElem);
    previewDiv.appendChild(deleteATag);

    return previewDiv;
}

const previewParentDivAppend = (fileName, previewNo, onClickFunction, imageSrc) => {
    const imgTag = createImgTag(imageSrc);
    const fileNameElem = createFileNameElement(fileName);
    const deleteATag = createDeleteATag(previewNo, onClickFunction);
    const previewDiv = createPreviewDiv(imgTag, fileNameElem, deleteATag);

    const previewParentDiv = document.getElementById('preview');
    previewParentDiv.appendChild(previewDiv);
}