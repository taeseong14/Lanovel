# Lanovel

소설올리는사이트


[깃헙](http://bgh.kro.kr/Lanovel)

# TODO
- [todo](todo.md)

# 구조

### 백엔드

- GET /api/novels
    - 모든 소설들
    - ResponseType: JSON

- POST /api/novel/:id
    - 소설 정보
    - ResponseType: JSON

- POST /api/write
    - 받은 글을 DB에 저장 및 등록
    - ResponseType: JSON

- POST 요청시마다 AccessToken 재발급

- Novel Database 구조 바꾸기

### 프론트엔드

- GET /
    - 소설누르면 /novel/:id

- GET /novel/:id
    - 소설정보 및 편들

- GET /viewer/:id/:epId
    - 해당 소설의 해당 편 뷰어

- GET /write
    - 소설 쓰는 에디터 페이지

- GET /edit
    - 소설 수정 에디터 페이지
