# Spring-Boot-MongoDB-Chatting

메타 코딩님의 강의를 보고 따라해본 내용입니다.

사용 기술 : WebFlux, SSE, MongoDB Tailable Cursors

<br>


+ WebFlux를 사용해서 서버의 요청을 비동기적으로 처리함
+ HTTP 응답 미디어 타입을 text/event-stream로 설정해서 SSE를 사용함
+ MongoDB Tailable Cursors를 통해 고정 크기 컬렉션에 데이터가 추가되면 지속적으로 데이터를 가져오게 만듦

<br>

강의 링크 : https://www.youtube.com/playlist?list=PL93mKxaRDidHRYNYYFr1x3mLKIx1wFeFc
