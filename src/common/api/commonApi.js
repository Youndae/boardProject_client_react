import { axiosEnhanced } from "../utils/axios/axiosEnhanced";

export const commonApi = {
        getBoardImageData: (imageName) =>
                axiosEnhanced.get(
                    `image-board/display/${imageName}`,
                    { responseType: 'blob' }
                ),
        getProfileImageData: (imageName) =>
            axiosEnhanced.get(
                `member/display/${imageName}`,
                { responseType: 'blob' }
            ),
}