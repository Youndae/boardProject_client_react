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