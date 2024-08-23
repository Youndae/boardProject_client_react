# BoardProject_React

## 프로젝트 목적
> React의 이해.   
> 1차 목표는 'React는 이렇게 데이터를 받아서 이렇게 처리하는구나'를 이해하는 것이 목표.   
> 어떻게 컴포넌트를 구성하고 어떻게 페이지를 전환하는지는 학습을 통해 이해가 되었지만   
> 이벤트 관리에 대한 처리 및 그 과정에서 발생하는 변수에 대한 경험을 쌓는 것이 목표.   
> REST-API Server가 완성되어있는 BoardProject의 서버를 통해 처리.   
> 최종적으로는 완벽한 이해가 목표지만 우선적인 목표는 협업에서 커뮤니케이션이 가능할 정도의 경험과 지식을 쌓는것이 목표.

## 사용 패키지
> 1. bootStrap
> 2. eslint
> 3. styled-components
> 4. axios
> 5. Redux
> 6. dayjs

## 프로젝트 설명
> React로 구현되는 FrontEnd는 어떻게 구성되고, 요청과 응답을 어떻게 주고 받아야 할지 이해하기 위해 학습하고 프로젝트를 진행하게 되었습니다.   
> 기획에서부터 없었지만 복잡한 이벤트 부분은 따로 고려하지 않았고 기존 있는 기능들에 대한 이벤트 관리는 기존 Spring Project를 진행하며 Template Engine을 사용할때와 같이 여러가지를 고려해 구현하고자 했습니다.   
> 프론트엔드에서는 복잡한 기능을 구현한 것이 없어 기능 정리에는 컴포넌트 분리 혹은 진행하면서 고민을 많이 했던 부분들 위주로 정리했습니다.


## 기능 정리

---

### 컴포넌트 구조 설계
React를 학습하면서 컴포넌트 구조를 잘 설계하면 개발 시간을 줄일 수 있고 재사용성을 높일 수 있겠다는 생각을 많이 했습니다.   
기존 진행했던 html 파일들을 보며 컴포넌트를 어떻게 나눌지 고민을 많이 했고 크게 list, page, ui 이렇게 세가지로 분류하게 되었습니다.   
list는 2개의 게시판을 갖고 각 게시판의 상세 페이지 내부에서는 댓글 리스트가 필요하기 때문에 해당 리스트들에 대한 컴포넌트들을 생성하고 담아두었습니다.   
page는 내부에서 다시한번 기능별로 분리를 해두었고, Router를 통해 실제 접근하는 최상위 컴포넌트가 대부분입니다.   

각 컴포넌트는 중복될 수 있는 부분들은 컴포넌트를 분리해 해당 컴포넌트를 호출하도록 처리했습니다.   
한 예시로 게시글 작성 페이지에 나오는 화면 중 제목과 게시글 작성 부분은 BoardWriteForm.jsx라는 컴포넌트로 분리해 각 게시판 작성, 수정 컴포넌트에서 호출해 사용하도록 처리했습니다.   

ui 디렉토리는 버튼, 이미지 출력 폼, 상단 바, 페이징, 페이징 버튼 등의 UI 관련 컴포넌트가 존재합니다.   
대부분의 페이지에서는 버튼이나 페이지네이션 디자인이 비슷하다는 생각을 했기 때문에 UI 관련된 컴포넌트를 분리하면 더 수월하게 처리할 수 있을 것이라고 생각했습니다.

### 중복 기능 분리
BoardProject에서는 여러 컴포넌트에서 동일하게 사용되는 기능 혹은 코드들이 존재합니다.   
대표적인 예로 Axios가 있고 이미지 파일 선택 및 삭제 처리와 업로드를 위한 FormData 생성 처리가 있습니다.   
이런 기능들은 src.modules 하위에 분리해서 작성해 처리했습니다.   

```javascript

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
    const deleteNo = Number(e.target.getAttribute('value'));
    let arr = [...files];
    const delObject = arr.find(function (item) {
        return item.fileNo === deleteNo;
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

```

이미지 파일에 대한 처리는 사용자 프로필 수정, 회원가입, 이미지 게시판의 등록 및 수정 페이지에서 사용되기 때문에 분리해서 처리했습니다.   
추가되는 파일 혹은 삭제되는 파일에 대한 처리를 담당하고 추가 시 파일 확장자명과 개수 제한에 대한 체크를 할 수 있도록 처리했습니다.

## 이미지 출력 처리
이미지 출력 처리에서는 고민이 많았습니다. 기존 프로젝트에서는 기존 이미지의 경우 img 태그의 src에 파일 요청 경로와 이미지명을 넣어주는 것으로 간단하게 처리할 수 있었습니다.   
하지만 리액트에서 그렇게 처리했더니 요청 경로와 이미지명을 보여주는 형태가 아닌 base64 형태의 URL로 나오는 것을 확인할 수 있었습니다.   
그래서 몇몇 사이트를 방문해 확인해보니 이런 값을 갖도록 처리하는 곳이 없었기에 다른 방법을 찾고자 했습니다.   

그렇게 찾아낸 방법은 window.URL.createObjectURL()을 활용하는 방법이었습니다.

```javascript
const getImageDisplayData = async (imageName) => {
        await imageDisplayAxios.get(`display/${imageName}`)
            .then(res => {
                const url = window
                    .URL
                    .createObjectURL(
                        new Blob([res.data], { type: res.headers['content-type']})
                    );
                setImageSrc(url);
            })
            .catch(err => {
                axiosErrorHandling(err);
            })
    };
```

이렇게 createObjectURL을 사용해 처리했을 때 원하던대로 blob:http://localhost:~ 의 형태로 출력되도록 처리할 수 있었습니다.
이 문제 해결에 대한 정리는 아래 링크의 블로그에 정리해뒀습니다.   
https://myyoun.tistory.com/227


---

## History
### 2024/03/08
> 각 게시판 리스트 페이지 컴포넌트 생성 완료.   
> 필요한 데이터는 아직 Api-Server와 연결하지 않았기 때문에 data.json을 통해 소량의 더미데이터로 테스트정도만 수행.   
> 계층형 게시판은 상세 페이지까지 컴포넌트 생성 완료.   
> 이미지 게시판은 리스트만 구현한 상태. 리스트에서 이미지 출력은 구현하지 않았고 틀만 만들어둔 상태.   

### 2024/03/12
> board component 전체 작성 완료.
> ImageBoard component 작성 중.
> 두 게시판이 게시글 등록, 수정에서 같은 form을 사용하는데 ImageBoard에서는 file input이 필요하기도 하고
> 컴포넌트 구성을 고려해봐야함.
> 현재는 제목 label, 제목 input, 내용 label, 내용 input, 등록 Button component가 묶여있는 상태.
> 모두 공통적으로 들어가는 부분이지만 내용 div와 등록 버튼 사이에 file input이 들어가야 하기 때문에 이걸 어떻게 처리할지 고민이 필요.

### 2024/03/13
> 이미지 게시판 상세 페이지, 수정 페이지, 작성 페이지 컴포넌트 작성 완료.   
> 게시글 작성의 경우 제목, 내용 작성하는 부분만 BoardWriteForm 컴포넌트에 두고 작성 버튼은 각 페이지 컴포넌트에서 Button 컴포넌트를 통해 작성하도록 수정.   
> 댓글 컴포넌트 작성 완료.   
> 댓글 컴포넌트의 경우 고려해야할 사항이 많기 때문에 다른 게시판 컴포넌트 기능을 전체 구현 후 가장 마지막에 처리 할 예정.

### 2024/03/14
> 계층형 게시판 리스트와 상세 페이지 axios로 API-Server와 통신 확인.   
> 나머지 기능에 대해서는 권한이 필요한 기능이 많아 로그인과 JWT 처리 이후 마무리.   
> 로그인 상태 관리를 위해 Redux를 사용할 예정.   

### 2024/03/19
> 로그인 구현중.
> BoardProject-rest를 통해 처리하기 위해 기존 클라이언트 서버와 동일한 구조로 두개의 토큰과 ino를 사용.
> 저장 역시 cookie에 저장하도록 처리한다.
> 로그인한 사용자의 아이디를 관리하기 위해 Redux를 사용.
> 사용자 아이디는 localStorage에 보관.
> 아이디가 localStorage에 보관되는 것 확인.
> 로그인 요청 후 각 토큰값 제대로 반환되는 것 확인.
> 반환받은 토큰 쿠키 저장 확인.
> redux, react-redux, redux-persist, react-cookie 패키지를 추가 설치.

### 2024/03/20
> 로그인, 로그아웃 구현 완료.
> JWT, ino 쿠키 생성과 삭제 및 localStorage에 사용자 아이디 저장 및 삭제 테스트 완료.
> api 서버에서 쿠키 생성 후 response header에 담아 응답하는 방식으로 처리하게 되면서 react-cookie를 사용하지 않음.
> 하지만 문제점으로 토큰 재발급 처리에 대한 문제가 발생.
> HttpOnly 설정때문에 React에서 접근을 할 수 없는 것으로 보이는데 그럼 토큰 만료에 대한 처리를 여기서 할 수 없다는 의미가 됨.
> react만 사용한다면 xss 공격에 대한 대응책을 세우고 localStorage에 AccessToken만 저장하거나 혹은 private 변수로 처리하는 방법이 있겠으나,
> 만약 지금 상태처럼 Spring 클라이언트 서버가 하나 더 존재하고 둘다 서비스 해야 하는 상황이라면 어떻게 처리해야 할지 고민이 필요.


### 2024/04/03
> 요청 기본 경로 .env에 작성 후 git ignore에 올림.
> axios 기본 설정을 위해 modules/customAxios.js 파일 생성 후 해당 파일을 통해 axios 사용하는 방법으로 수정
> 계층형 게시판 모든 기능 구현 및 테스트 완료.
> Api-Server와 Spring Client-Server를 먼저 수정하게 되면서 사용자 아이디는 필요한 기능에 대해서만 응답으로 받아 사용하도록 수정.
> 그로 인해 localStorage에 사용자 아이디를 저장하지 않도록 처리.
> 로그인 여부는 사용자 아이디로 확인하는 것이 아닌 Redux에서 true, false의 값으로 갖고 있도록 처리.
> 새로고침 하는 경우를 대비해 Navbar.js에서 useEffect로 서버에 요청을 보내 로그인 체크를 수행하도록 처리.
> 결과는 간단하게 boolean 타입으로 받아 결과에 따라 dispatch 수행으로 처리하도록 처리.
> 댓글 구현 완료.
> 댓글 작성, 답글 작성, 삭제 모두 테스트 완료.
> 문제점으로는 답글 작성을 위해 버튼을 눌렀을 때 답글 폼의 출력과 다른 답글 버튼을 눌렀을때의 다른 위치의 폼 제거에 대한 문제가 있음.
> 문제 해결로는 답글 작성 버튼을 눌렀을 때 닫기 버튼을 출력시켜 답글 폼을 제거할 수 있도록 처리.
> 아쉬운 점은 다른 답글 작성 버튼을 눌렀을 때 알아서 제거되도록 하는 것을 원했으나 해결하지 못함.
> 한가지 그래도 가능했던 방법으로는 document.createElement()를 통해 폼을 생성해 준 뒤 appendChild()로 넣어주는 방법이 있었으나
> 가독성도 떨어지고 해서 닫기 버튼을 만드는 방법으로 선택.
> 만약 꼭 알아서 제거되도록 해야 한다면 useRef와 appendChild()로 처리하는 방법이 현재로서는 문제 해결에 가장 유력한 방법이라고 생각이 듦.


### 2024/04/05
> 이미지 게시판 등록 및 수정 구현 완료.
> previewForm은 별개의 컴포넌트로 처리하도록 구현.
> 수정에서 사용할 기존 이미지 미리보기 컴포넌트인 ImageOldPreview와 새로 등록하는 이미지 미리보기 컴포넌트인 ImageNewPreviewForm 두개로 생성.
> 이미지 게시글 상세보기 페이지에서 이미지 출력을 처리하다보니 ImageDetailForm 컴포넌트를 새로 생성해서 이미지 파일 요청 및 처리를 담당하도록 처리.
> 이미지 등록과 미리보기 삭제 테스트 및 게시글 등록, 수정 테스트 완료.
> 고려해야할 사항
>> 이미지 게시판 수정과 등록에서는 중복되는 코드가 많이 발생할 수 밖에 없는데 해당 부분들을 어떻게 모듈화 할지 고민이 필요.
>> 처음 모듈화를 해놓고 바로 구현하고자 했으나 데이터 반환이 마음처럼 되지 않아 현재 구조로 처리.
>> 제일 먼저 시도했던 방법인 모듈에서 모든 처리를 마무리 후 createElement를 통해 element 생성 후 appendChild()로 처리하는 방법은
>> 모듈로 처리하기 수월한 방법이었지만 state를 통한 관리가 어렵기 때문에 현재 구조로 변경.
>> 하지만 JQuery로 했던 방법처럼 처리한다면 충분히 가능한 방법이긴 함.
>> 이 부분에 대해서는 당장 답을 얻기에는 어려울 것 같아서 React에 대해 좀 더 학습하고 고려해보기로.
>> React에서 useState의 중요성 및 필요성, 활용도에 대해 좀 더 깊은 이해가 필요하고 모듈로 분리했을 때 어떻게 하는 것이 좋을지 이해가 필요.


### 2024/04/06
> 각 게시판 페이징 구현 완료.
> Search, Paging Component를 생성하고 이 두 Component를 담는 SearchPaging Component를 생성해 각 게시판에서 SearchPaging Component 하나만 갖도록 처리.
> 페이징과 검색 기능에 대한 핸들링은 pagingModule로 분리해서 처리하도록 구현.
> 기존 Spring 프로젝트와 다르게 페이지 버튼을 a 태그에서 button으로 수정.
> 페이징과 검색 처리에 있어서 useState로 처리하는 방법으로 구현했다가 뒤로가기 버튼을 눌렀을 때 이전 페이지 번호를 출력하는 것이 아닌 아예 이전 페이지를 호출하는 문제로 인해
> useState를 통한 재 랜더링이 아닌 쿼리 파라미터를 통한 페이지 이동 형태로 처리.
> 이전 데이터에 대한 히스토리를 저장해두었다가 뒤로가기 버튼 클릭 시 이벤트 감지로 처리하는 방법이 있는 것 같은데 아직 이해가 안돼서 추후 학습 후 리펙토링 진행 할 계획.
> 페이지 이동 형태로 처리하기 위해 App.js에 Route를 추가.
> Route 추가에 대해서도 좀 더 깔끔하고 다르게 표현할 수 있는 방법이 있을 지 알아보고 좋은 방법이 있다면 수정 할 계획.
> 댓글 페이징 기능 적용 완료.
> 댓글은 게시판 리스트와 다르게 검색 기능도 없고, 해당 부분만 재 랜더링 되면 되기 때문에 Paging Component를 갖도록 하고 onClick 핸들링은 useState를 통한 set으로 처리.
> 주석 처리 해두었던 코드 및 불필요한 로그 삭제.


### 2024/04/08
> Redux 사용을 위한 modules/index.js와 user/js 수정.
> 로그인, 회원가입 페이지 접근 시 useSelector 체크 제거.
> useSelector 값으로 판단하던 각 게시판 게시글 작성 페이지 API-Server에 로그인 여부 요청해 결과에 따라 대응하도록 수정.
> Axios 각 기능별 공통되는 세팅끼리 구분해서 모듈화
> Axios 요청 시 발생하는 오류에 대한 핸들링 customAxios.js에 작성해 요청마다 호출하도록 처리.
> 오류 발생시 보여줄 페이지인 ErrorPage 컴포넌트 생성.
> 각 기능 리스트에서 발생하는 Key 경고문 제거를 위해 { } 만으로 처리했던 부분들 컴포넌트화.
> 회원가입 기능 누락이었어서 구현. 사용자 이름 입력 체크 추가.
> 모든 페이지 접근에 있어서 콘솔 경고문 발생하지 않는 것 확인.


### 2024/04/09
> 각 게시판 게시글 작성 페이지 접근 제어 완료.
>> 기존 useSelector 값을 통한 체크에서 Api-Server에 판단을 요청하는 방법으로 변경했었는데
>> 그래도 페이지가 렌더링 된 후에 체크하고 이동하는 것에는 변함이 없었기 때문에 해당 문제를 해결하고자 함.
>> 이 문제를 해결하는 방법으로 Api-Server 요청 결과에 따라 userStatus 라는 state 값을 수정하도록 하고
>> userStatus의 기본값은 null로 설정. return의 조건을 userStatus가 true 인 경우에만 처리되도록 함으로써
>> 비로그인 상태인 false 상태에서는 렌더링을 하지 않고 결과를 기다렸다가 이후 처리를 수행할 수 있게 됨.
>> 해당 요청에 대해서는 별다른 변수가 필요하지 않기 때문에 customAxios 모듈에서 호출해 사용하는 것으로 처리.
>> Navbar 에서도 해당 모듈을 통해 상태 관리를 하도록 수정.
> 이미지 게시판 이미지 파일 처리 모듈화
>> post, patch 수행 시 필요한 formData에 데이터를 담는 처리, file 추가, 새로 등록한 이미지 미리보기 삭제를 모듈화.
>> formData에 데이터를 담는 것은 patch에서는 deleteFiles가 필요한데 이건 수정 컴포넌트에서 따로 처리하도록 하고 제목, 내용, 새로 추가하는 파일만 담도록 처리.
>> file 추가로 인한 데이터 관리는 그 안에서 파일 체크를 한 뒤 배열에 기존 데이터와 새로운 파일 데이터를 담아 반환하도록 처리.
> 이미지 게시판 기존 이미지 파일 display src에 바이너리 코드 노출되는 문제 해결.
>> blob으로 응답 받은 데이터를 window.URL.createObjectURL()로 처리하는 방법을 찾아 문제 해결.
>> 하지만 처리하는 코드만 있었을뿐 설명은 따로 없었어서 찾아보고 제대로 정리한 뒤 블로그 포스팅 예정.
>> src에 바이너리 코드가 출력되는 대신 'localhost:3000/{imageName}' 형태로 처리되는 것 확인.
>> 기존 이미지의 경우만 이렇게 처리하고 작성이나 수정 페이지에서 새로 등록하는 파일은 그대로 바이너리 코드로 처리.
>> 코드 중복을 줄이기 위해 ImageDisplayElem이라는 컴포넌트를 생성하고 display 요청과 그에 대한 처리 수행 후 img 태그만 반환하도록 처리.
> axios 처리 전 컴포넌트 생성을 위한 더미 데이터였던 data.json, imageData.json 삭제.


### 2024/04/11
> 글 작성 페이지 접근 처리 수정.
>> useSelector 값에 따른 처리를 하도록 수정.
>> useEffect에서 useSelector 값을 담은 변수가 변할 때 수행하도록 해두면 Navbar에서 요청을 보낸 뒤 dispatch를 하게 되면
>> useSelector 값이 수정되고 useEffect가 다시 동작하는 것을 확인.
>> 기존 수정 코드의 경우 Navbar와 작성 페이지에서 두번의 요청이 발생할 수 있기 때문에 아예 동일한 요청이 두번 발생하므로 해결 방안이 아니었다.
>> 그래서 재수정.


### 2024/05/17
> OAuth2를 추가
>> OAuth2로 연결은 window.location.href로 처리.   
>> 로그인 페이지 접근 시 useLocation을 통해 이전 페이지를 담아두게 되고 로그인 페이지에서는 OAuth2 로그인 버튼이 클릭되면 SessionStorage에 이 값을 담아두도록 처리.
>> 처리는 모듈로 분리.
>> OAuth2를 통한 최초 로그인 시 닉네임과 프로필 등록 페이지로 API 서버에서 Redirect 하도록 처리.   
>> 최초 로그인이 아닌 경우 비어있는 OAuth2Success Component로 접근하게 되고 여기서 SessionStorage에 있는 이전 페이지 주소로 이동하도록 처리.
>> 프로필 이미지를 주고받는데 필요한 Member 관련 Axios 모듈 추가.
> 사용자 정보 기능 추가
>> OAuth2를 추가하면서 닉네임과 프로필 사진을 받도록 수정했기 때문에 회원가입에서도 닉네임과 프로필 사진을 처리할 수 있도록 추가.   
>> 정보 수정 페이지를 통해 닉네임과 프로필 사진을 수정할 수 있도록 추가.
> 게시글 또는 댓글에 출력하는 사용자 정보로 닉네임을 택했기 때문에 userId가 아닌 nickname을 받고 해당 값을 출력하도록 수정.


### 2024/05/18
> Spring Application-server 수정하면서 같이 처리되도록 URL 수정.
>> OAuth2 로그인 성공 시 접근하는 URL와 profile 수정 및 최초 로그인 시 profile 등록 페이지 URL에 대해서만 수정.


### 2024/08/23
> 게시글 post 요청으로 인한 Long 응답을 제외한 나머지 응답 중 Long 타입 반환되던 부분들 String으로 수정.