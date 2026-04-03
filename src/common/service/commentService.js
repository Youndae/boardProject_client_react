import { commonApi } from "../api/commonApi";

export const getImageData = async (type, imageName) => {

    let res;

    if(type === 'profile')
        res = await commonApi.getProfileImageData(imageName);
    else if(type === 'board')
        res = await commonApi.getBoardImageData(imageName);
    else
        return;

    return window.URL.createObjectURL(res.data)
}