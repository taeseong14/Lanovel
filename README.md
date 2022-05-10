# Lanovel

소설올리는사이트?

# TODO

[깃헙](http://bgh.kro.kr/Lanovel)

### 백엔드

- [ ] 로그인 / 회원가입 (jwt)
- [ ] 유저 / 소설 정보 DB에 저장 (sqlite3)
- [ ] 로그인하면 쿠키주기 (하루뒤에 만료)
- [ ] 로그인시 만료안된 쿠키있으면 자동로그인
- [ ] 리캡챠
- [ ] 소설 저장 (zlib)

### 프론트엔드

- [ ] 메인페이지
- [ ] 로그인 / 회원가입 페이지
- [ ] 글 에디터
- [ ] 유저 정보페이지
- [ ] 리캡챠

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

### 프론트엔드

- GET /
    - 소설누르면 /info/:id

- GET /info/:id
    - 소설정보 및 편들

- GET /viewer/:id/:epId
    - 해당 소설의 해당 편 뷰어

- GET /write
    - 소설 쓰는 에디터 페이지

- GET /edit
    - 소설 수정 에디터 페이지
