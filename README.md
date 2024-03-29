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
