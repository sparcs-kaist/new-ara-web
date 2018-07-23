# Url 구조
## 게시판
```
/board (모아보기)
/board/:boardId (개별 게시판)
```
- [x] 라우팅 구현
- [ ] boardId 대신 boardName을 사용하도록 업데이트

## 사용자 작성글
```
/user/:username (사용자)
/user/:username?board=:boardName (그 사용자가 해당 게시판에 쓴 글)
/user/:username?query=:query (그 사용자가 쓴 글에서 검색)
/user/:username?board=:boardName&query=:query (위의 조합)
```
- [ ] 라우팅 구현

## 담아두기
```
/archive (담아두기)
```
- [ ] 라우팅 구현

## 게시물
```
/post/:postId (모아보기)
/post/:postId?board=:boardName (게시판)
/post/:postId?query=:query (모아보기 검색)
/post/:postId?board=:boardName&query=:query (게시판 검색)
```
- [x] 라우팅 구현

## 글 작성
```
/write (모아보기에서 새 글 작성)
/write?board=:boardName (게시판에서 새 글 작성)
/write/:postId (글 수정)
```
- [ ] 라우팅 구현

## 설정
```
/settings
```
- [x] 라우팅 구현
