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