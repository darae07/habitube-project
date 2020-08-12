

# Habitube (하비튜브)

### 팀원 소개
  
|이름|포지션|역할|
|----|----|-------|
|강준혁|team-member|back-end|
|심다슬|team-member|back-end|
|이다래|team-leader|front-end|
|최성규|team-member|front-end|

---
### 서비스 설명

  * 의미 : 영단어 Habit과 Youtube의 합성어로 유튜브를 통해 취미생활을 한다는 의미를 가지고 있음.
  * 대상 : 가벼운 취미를 일정을 관리하면서 꾸준히 하고싶은 사용자
  * 서비스 요약 : 
    - 빈도수가 적은 취미라는 일정을 관리할수 있도록 사용자에게 맞춤 달력을 제공하고, 이에 대한 성취도를 표시하여 행동을 장려하는 서비스.
    - 유튜브라는 동영상 플랫폼을 이용해 유저의 다양한 취미를 포괄할수 있도록 서비스함.
  * 사용 예시 :
    - 홈트레이닝 : 유튜브에 있는 다양한 홈트 영상으로 홈트를 계획해서 운동 일정을 관리할수 있다.
    - 영어 듣기 : 영어로 된 영상(영화 클립, 미드, 팝 등등)을 보며 따라해 본다.
    - 레시피 따라해보기 : 집에서 편하게 고든램지의 레시피도 소환할수있다! 레시피를 따라 요리해보고 메모도 남겨본다. 
   
---
### 기술 스택
   * front-end : React(hooks), Redux, Redux-thunk, Reactstrap, CSS, React-router
   * back-end : express, sequelize, nodejs, mysql, etc.. Youtube API, Calendar API, 구글 OAuth Api

---
### 와이어 프레임
![Veiwing 001](https://user-images.githubusercontent.com/61297852/86470796-205dd680-bd77-11ea-88c2-51cf5a67b481.jpeg)
![Veiwing 002](https://user-images.githubusercontent.com/61297852/86470805-23f15d80-bd77-11ea-9ecf-11192efcde3b.jpeg)
![Veiwing 003](https://user-images.githubusercontent.com/61297852/86470809-25228a80-bd77-11ea-916b-a6bd01a8f04d.jpeg)

---
### 데이터 베이스 스키마  
![doe](https://user-images.githubusercontent.com/59544288/86110879-0fa42b00-bb01-11ea-8b1e-6de5ed54fe46.png)

```js
// Creating tables
Table users as U {
  id int [pk, increment] // auto-increment
  email varchar
  username varchar
  password varchar
  keyword varchar
  
}

Table toDoBox as T {
  id int [pk, increment]
  memoTitle varchar
  memoContent varchar
  youtubeUrl varchar
  isComplete boolean
  date varchar
  usersId int
}

Ref: "users"."id" < "toDoBox"."usersId" 
```

---  
### 스크린샷 & 데모

  1. 소개페이지
    ![1 소개 로그인-2](https://user-images.githubusercontent.com/48423344/87116661-576d4400-c2b1-11ea-8b50-85cc46e8449b.gif)
  2. 회원가입 
    ![2 회원가입](https://user-images.githubusercontent.com/48423344/87116770-a31fed80-c2b1-11ea-9118-1d8e790b51b4.gif)
  3. 로그인
    ![3 ????????  목표페이지까지](https://user-images.githubusercontent.com/48423344/87116858-e2e6d500-c2b1-11ea-89b8-e9cdd85f3bf0.gif)
  4. 목표 설정하기
    ![4 목표설정하기](https://user-images.githubusercontent.com/48423344/87116862-e5492f00-c2b1-11ea-8ff0-6b91222ec16c.gif)
  5. 영상 설정하기
    ![5 영상설정하기](https://user-images.githubusercontent.com/48423344/87116867-e7ab8900-c2b1-11ea-9821-91ad7f863aff.gif)
  6. 다른 날짜 영상 설정하기
    ![6 영상 다른날짜 안되는기능](https://user-images.githubusercontent.com/48423344/87116871-ec703d00-c2b1-11ea-8844-1f3597eb10b9.gif)
  7. 영상 자동 재생
    ![크기변환 7 썸네일클릭영상재생](https://user-images.githubusercontent.com/48423344/87117644-0448c080-c2b4-11ea-939c-c3d63605e5ae.gif)   
  8. 메모 입력하기
    ![8 메모기능](https://user-images.githubusercontent.com/48423344/87116882-f2661e00-c2b1-11ea-9658-deacf558b251.gif)
  9. 달성률 보여주기
    ![9 달성률](https://user-images.githubusercontent.com/48423344/87117117-a7003f80-c2b2-11ea-8809-12328199d5f1.gif)
  10. 이전달/다음달 탐색
    ![10 이전달다음달](https://user-images.githubusercontent.com/48423344/87117240-02323200-c2b3-11ea-8f8c-1ea22e47e907.gif)
  11. 완료 페이지
    ![11 컴플리트](https://user-images.githubusercontent.com/48423344/87117248-065e4f80-c2b3-11ea-9292-305a8caac297.gif)
  12. 재로그인 
  ![12 ????? ?? 된데이터보여주기](https://user-images.githubusercontent.com/48423344/87117252-08c0a980-c2b3-11ea-97a2-b8606f3844cf.gif)
---  
### 주요 기능에 대한 안내  
  1. 소개페이지
      - 소개페이지에 하비튜브 서비스가 설명되어 있다.
      - 로그인 버튼으로 로그인 페이지로 이동한다.
  2. 회원가입 
      - 로그인 페이지에서 최초유저는 회원가입 페이지로 이동하여 회원가입 할수있다.
  3. 로그인
      - 로그인 페이지에서 이메일 기억이 가능
      - 로그인 => 유저는 유저 정보에따라 마이페이지에서 분기
      - 최초 유저 => 목표설정페이지로 이동할수 있는 버튼
      - 기존 유저 => 마이페이지 내부 달력 데이터 출력
  4. 목표 설정하기
      - 유저가 주제를 설정하고 목표로 잡은 기간을 설정하면 주 몇회로 표현된 빈도를 설정할수 있다.
      - 이 설정을 제출하면 서버에서는 맞춤형 달력을 생성하여 보내준다.
  5. 영상 설정하기
      - 유저는 생성된 달력의 목표설정하기 버튼으로 설정한 키워드의 유튜브 영상 목록을 받아볼수 있다.
      - 목록에서 영상을 선택하면 달력에 영상 프리뷰와 영상을 보고 체크할수있는 버튼과 작성한 메모 제목 미리보기가 생성된다.
  6. 다른 날짜 영상 설정하기
      - 일정관리 기능으로 영상은 해당 날짜에만 볼수 있도록 했다. 
      - 영상을 미리 설정해두는것은 가능하며 이경우 프리뷰창에 ‘00일에 만나요’라는 텍스트를 표시해준다. 
      - 재생은 목표한 날짜에만 할수있다.
  7. 영상 자동 재생
      - 달력에 표시된 썸네일을 클릭하면 영상을 볼수 있는 모달 페이지가 생성되며 유튜브 영상이 자동재생된다.
  8. 메모 입력하기
      - 영상 재생 페이지에서는 유저가 영상을 보고 느낀점을 기록할수 있도록 메모 입력 버튼을 제공한다.
      - 메모는 DB에 저장되어 재생화면에도 표시되고 달력에서도 메모 제목을 확인할수있다.
  9. 달성률 보여주기
      - 영상을 본 후에는 check 버튼으로 표시를 남길수 있다. 
      - 이 데이터는 DB에 저장되어 서버에서는 달성률을 계산해 보내주고, 화면에도 바를 통해서 실시간으로 변하는 달성률을 확인할수 있다.
  10. 이전달/다음달 탐색
      - 이전달/다음달 버튼으로 다른 달로 이동할수 있다.
      - 이동할 때에도 데이터는 그대로 보존되며 데이터가 없는 달(목표설정에 해당되지 않는 달)에는 데이터가 없다는 화면을 출력한다.
  11. 목표 완료
      - 유저가 목표를 달성하면 완료페이지에서 결과를 보여주고 새로운 목표를 설정하는 페이지로 이동시킨다.
  12. 재로그인 경우
      - 유저가 다시 로그인을 하면 저장된 데이터가 불러와진다.
  
---  

### Clone & Setup

> 이 리포지토리를 사용하여 로컬 컴퓨터에 클론하세요. 

```shell
$ git clone `https://github.com/codestates/Habitube.git`
```
> 업데이트와 첫 페키지를 설치를 하셔야 합니다,

```shell
$ brew update
$ brew install fvcproductions
```

> 이제 npm 및 bower 패키지를 설치하고 실행시키십시오.

```shell
$ npm install
$ npm run start
```

### AWS 배포 링크
http://deploy-habitube.s3-website.ap-northeast-2.amazonaws.com/ 

<br/>
<br/>

