![image](https://github.com/rlawlsdn263/education-system/assets/79128016/cbae18a4-754b-4113-89de-4bad9d9a6567)

<h2>👨‍🏫 티쓰리큐 교육시스템 프로젝트</h2>
<p>티쓰리큐 교육시스템은 인공지능에서 다루는 데이터 7종, 인공지능이 하는 태스크 4가지를 조합한 28가지 우수케이스를 통합 플랫폼에 탑재한 사례집으로 'AI훈민정음'이라 불린다.</p>
<p><strong>프로젝트 기간</strong>: 2023.07.10 ~ 2023.09.15</p>

<strong>결과물</strong>: <http://hunmin.demo.t3q.ai/>

## 👊 팀원 소개 및 역할 분담

### 김진우(팀장)

- 프로젝트 리뉴얼 디자인 담당
- Home, School 페이지 컴포넌트 담당
- Keycloak API를 활용한 로그인/로그아웃 기능 개발
- 수행 페이지 레이어 애니메이션 및 모달창 기능 개발
- 로그인 유무에 따른 제한된 접근 기능 개발
- CRUD를 활용한 커스텀 레이어 생성 기능 개발

### 김도현(부팀장)

- Intro, Detail 페이지 컴포넌트 담당
- Link, Title, Button, Spinner 등의 공통 컴포넌트 개발
- Detail 페이지 내부 슬라이드 이동 기능 개발
- DetailForm 컴포넌트에서 수행되는 API 통신 코드 개발 및 함수 모듈화

### 채하은(팀원)

- Detail 페이지 컴포넌트 담당
- DetailForm 컴포넌트 AI예제 파트 담당해 API 서버에서 받아온 추론 결과 데이터를 클라이언트단에서 조건부 가공 후 화면 렌더링을 구현하는 작업 담당
- Detail 페이지 컴포넌트의 전반적인 웹접근성 보완작업 수행
- 클라이언트를 활용한 음성 녹음 기능 개발
- DropDownMenu 컴포넌트 제작 및 확장 작업 수행
- AI예제 수행 시에 화면에 렌더링되는 Result 컴포넌트 개발
- API 서버에서 받아온 예제 데이터를 클라이언트단에서 모든 케이스에 대응하도록 조건부 가공 후 화면에 렌더링하는 역할을 맡음


### 현지수(팀원)

- Home, School 페이지 컴포넌트 개발
- AI예제 수행 시에 화면에 렌더링되는 카드 UI 디자인 담당 및 Result 컴포넌트 개발
- AI훈민정음-VISION 예제에서 사용되는 API 통신 기능 개발
- React-Helmet-Async를 활용해 SPA의 SEO 단점 보완
- 페이지 컴포넌트 렌더링 시에 화면이 상단으로 이동되는 ScrollTop 기능 개발

## 🥇 프로젝트 목표
- 보다 나은 UI/UX로 사용자 편의성 향상
- 유지보수 및 프로젝트 확장가능성 확보

## 🛠 기술스택
| 도구/언어 | 설명 |
| --- | --- |
| Vite | 프론트엔드 빌드 도구로, 빠른 핫 모듈 교체와 개발 환경을 제공 |
| React | UI를 구성하기 위한 JavaScript 라이브러리 |
| TypeScript | 자바스크립트에 정적 타이핑 기능을 추가한 언어 |
| Recoil | React의 상태 관리 라이브러리 |
| React Router | React 애플리케이션의 라우팅을 담당하는 라이브러리 |
| Module CSS | CSS를 모듈화하여 컴포넌트 별로 스타일링을 할 수 있게 함 |

## 🥇 주요 기능

### 인트로 페이지 캐러셀

자동으로 슬라이드가 넘어가며 사용자가 좌우로 페이지를 드래그 할 수 있다. 또한, 하단의 점을 클릭해 원하는 페이지로 넘어갈 수도 있다. 

![ezgif com-gif-maker (1)](https://github.com/sosin-t3q/education-system/assets/79128016/bbf47e47-d9fb-49a8-844c-ece393f69076)

### 제한된 접근 기능

로그인된 사용자가 상세 페이지에 접근하려고 할 경우 키클락 로그인 페이지로 이동이 된다. 로그인이 성공하면 원래 접근하려던 페이지로 리디렉션이 된다.

![제한된 접근 기능](https://github.com/sosin-t3q/education-system/assets/79128016/61635b55-b687-479c-9d91-71eba0012011)

### 원하는 슬라이드 이동 기능

상세 페이지 안에서 드랍다운메뉴를 클릭하면 슬라이드의 제목들이 담겨있는 리스트가 펼쳐진다. 사용자가 아이템을 클릭하면 해당 슬라이드로 이동한다.

![슬라이드](https://github.com/sosin-t3q/education-system/assets/79128016/63527a42-b216-40d1-9a4f-8d6e2ee1cf23)

### 페이지 내부 빠른 이동 기능

상세 내부 페이지 안에서 그리드 아이콘을 클릭하면 모달창, 아코디언창이 화면에 렌더링되고 사용자는 빠르게 다른 페이지로 이동이 가능해진다.

![빠른 이동](https://github.com/sosin-t3q/education-system/assets/79128016/226f1975-1f60-4c8a-9c2d-5f037bf2a71c)

### 장바구니 기능

사용자가 예제를 담으면 개인AI 모달에 예제가 추가되어 커스텀 레이어를 만들 수 있다. 이미 추가된 예제를 한 번 더 누르면 삭제가 된다. 

![장바구니](https://github.com/sosin-t3q/education-system/assets/79128016/93d48316-bb6d-4f0b-8d1e-792bbac4e9bd)

### 필터 기능

서당 페이지에서 사용자가 드랍다운메뉴에서 원하는 대학교를 선택하면 해당 대학 예제들이 필터링되면서 화면에 렌더링된다.

![필터기능](https://github.com/sosin-t3q/education-system/assets/79128016/182ecc9c-e4c3-4ef1-9dcc-0eef047d6675)

### 결과값 추론 기능

상세 페이지 하단의 드랍다운메뉴에서 샘플 예제를 선택하고 추론하기 버튼을 클릭하면 예제 샘플이 자동으로 생성된다.

![결과값 추론기능](https://github.com/sosin-t3q/education-system/assets/79128016/46b78282-2ae7-4fd1-bf39-5116dbb63354)
