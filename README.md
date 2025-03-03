![1 신규서비스_표지_1](https://github.com/user-attachments/assets/6397d4d4-6edf-4b69-ba64-44755f4eecd6)

<br>

# 📝목차

1. [프로젝트 소개](#-프로젝트-소개)
2. [팀원 소개](#-team-members)
3. [시스템 아키텍쳐](#-시스템-아키텍쳐)
4. [프로젝트 기능 및 페이지 구성](#️-프로젝트-기능)
5. [기능 구현 영상](#-기능-구현-영상)
6. [기술 스택](#️-기술-스택)
7. [트러플 슈팅](#-트러블-슈팅)

<br>

# 📑 프로젝트 소개

https://github.com/user-attachments/assets/3f91078b-3812-4c40-9d68-244093e007be

모닥모닥은 프라이빗 모임 관리 및 추억 공유 플랫폼으로 "모으다"라는 의미를 담은 방언에서 영감을 받아 탄생했습니다. <br>
공개적인 SNS의 피로감에서 벗어나, 우리만의 소중한 공간에서 모임을 기록하고 추억을 나누고 싶으신가요? <br>
모닥모닥으로 친구, 가족, 동료 등 소중한 사람들과의 특별한 순간을 간직하고 공유해보세요!

<br>

- **우리만의 공간**: 링크를 통해 초대된 멤버만 참여할 수 있는 프라이빗한 공간을 만들어보세요.

- **추억 기록**: 사진, 메모, 날짜 등 모임의 소중한 순간을 간편하게 기록하고 저장할 수 있습니다.

- **추억 공유**: 함께한 사람들과만 추억을 나누며, 오랜 시간이 지나도 다시 돌아볼 수 있는 공간을 제공합니다.

<br><br>

-> [모바일 어플리케이션도 있어요!](https://github.com/adorable-otter/modak-native)

<br><br>

# 👨‍👩‍👧‍👦 Team Members

| 박상기                         | 박산하                            | 김민후                         | 박은영                                   | 원윤선                                     |
| ----------------------------- | -------------------------------- | ----------------------------- | --------------------------------------- | ------------------------------------------ |
| [@adorable-otter](https://github.com/adorable-otter) | [@heftyCornerstone](https://github.com/heftyCornerstone) | [@minhoo](https://github.com/Kminhoo) | [@euncloud](https://github.com/euncloud) | [@WonYunSun](https://github.com/WonYunSun) |
| 팀장                             | 부팀장                                         | 팀원                            | 팀원                          | 팀원                              |
|인증/인가, 일정 캘린더, <br> react native app|홈, 모임 관리, 멤버 목록, <br>모임 가입 신청, 알림|        댓글, 채팅           | 모임방, 게시글CRUD, 사진첩, <br> 공용 컴포넌트, 게시글 검색 |모임 생성, 모임 일정, <br> 공용 컴포넌트  |

<br><br>

# 🚧 시스템 아키텍쳐

![Image](https://github.com/user-attachments/assets/a04f3b1c-7bb1-4452-858d-289f1d2e2e14)

<br>

# 🕹️ 프로젝트 기능

### 1. **페이지 구성**

#### 모임 가입 신청  [`/join/[id]`]
- 모임 가입 신청 링크 클릭 시 진입

#### 로그인/회원가입  [`/login`, `/signup`]
- 소셜 로그인 기능, 소셜 로그인 간편 회원가입

<br>

#### 홈  [`/`]
- 가입/대기중 모임 목록

#### 알림  [`/notifiactions`]
- 신규/읽은 알림 확인

#### 마이페이지  [`/mypage`]
- 프로필 표시, 일정 표시

<br>

#### 채팅  [`/chat`]
- 채팅방 리스트 업데이트, 채팅 메세지 읽음 처리기능
  #### 채팅 상세  [`/chat/[id]`]
    - 채팅 내용 실시간 업데이트, 읽음 처리, AI요약 기능

<br>

#### 모임방  [`/groups/[id]`]
-  모임방 게시글 업데이트

    #### 모임 관리  [`/groups/[id]/management`]
    - 모임 프로필 변경, 모임방 알림 on / off, 모임 탈퇴, 모임 삭제, 모임 초대 링크 복사

    #### 멤버 목록  [`/groups/[id]/management/members`]
    - 모임 가입 신청 수락 및 거절, 대표 양도

<br>

### 2. **상세 기능**

#### 모임 가입 신청 페이지
 - 사용자의 다양한 상태에 따른 분기처리

#### 사용자 프로필 관리

- **Swiper**를 사용한 사용자 모임 일정, 캘린더 확인

#### 일정

- 모임별 일정 CRUD 기능
- **Funnel** 패턴을 사용한 깔끔한 UX 경험 제공
- **react-day-picker** 라이브러리와 커스텀 timePicker를 사용한 UI 제공
- 일정 검색 기능

#### 게시글

- 일정 연동 게시글 CRUD 기능
- **react-modal-sheet**를 활용한 댓글 CRUD 기능 제공
- **swiper, canvas**를 활용한 이미지 업로드 최적화 및 유연한 UX 제공
- **useInfiniteQuery**를 활용한 빠른 페이지 로딩 제공
- 일정별 게시글 검색 기능
- 사진 모아보기 기능

#### 채팅

- **Supabase Realtime**을 활용한 실시간 채팅 기능 제공
- **OpenAI API**를 활용한 **대화 요약 AI 기능** 지원
- **Browser WebSocket API**를 사용해 양방향 데이터 통신 구현
- **Supabase 메시지 구독**을 통해 읽음 처리 기능 추가

<br>
<br>

# 📱 기능 구현 영상

|                                    로그인 및 로그아웃                                     |                                         모임 생성                                         |                                         모임 삭제                                         |                                        게시글 작성                                        |
| :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: |
| ![Image](https://github.com/user-attachments/assets/bed2fb4a-c333-4dac-b2f8-4bada8eab43b) | ![Image](https://github.com/user-attachments/assets/d63184c3-4179-4443-b380-935086fb7163) | ![Image](https://github.com/user-attachments/assets/4525cad5-b3b0-40a0-9b4e-46e5ee842a99) | ![Image](https://github.com/user-attachments/assets/321eb252-20df-41f0-9090-7c4408447ff5) |

|                                        게시글 수정                                        |                                         일정 생성                                         |                                           알림                                            |                                      채팅 및 AI요약                                       |
| :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: |
| ![Image](https://github.com/user-attachments/assets/3a299c7a-6723-45ef-9636-776a189370f0) | ![Image](https://github.com/user-attachments/assets/7f0b0289-251d-41a0-a973-d4f9ba081bf4) | ![Image](https://github.com/user-attachments/assets/acb0238b-6042-4f73-a417-db8da55a721d) | ![Image](https://github.com/user-attachments/assets/84f4a9d9-98d1-4875-87d0-64beb493f8ee) |

|                                        마이 페이지                                        |                                        모임방 참여                                        |                                         멤버 관리                                         |                                         댓글 CRUD                                         |
| :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: |
| ![Image](https://github.com/user-attachments/assets/5344cb36-23a3-4b4f-ae86-63b83f0c7b8e) | ![Image](https://github.com/user-attachments/assets/673ce466-9deb-480e-aff2-153fb40ae15d) | ![Image](https://github.com/user-attachments/assets/9deceef3-6b82-4f5c-b7a8-7b9a20d58777) | ![Image](https://github.com/user-attachments/assets/fd4c2eea-ebad-4bd3-9ab3-220b923c8d11) |

<br><br>

# ⚙️ 기술 스택

### **프레임워크 및 라이브러리 코어**

- Next.js
- React
- TypeScript

### **상태 관리 및 데이터 페칭**

- Tanstack Query
- supabase
- zustand

### **UI/UX**

- Tailwind css
- Swiper
- React Modal Sheet
- React intersection obsever
- React Day Picker
- React Dropzone
- motion

### **유틸리티 및 기타 개발 도구**

- day.js
- eslint
- prettier

### **기타 도구 및 설정**

- ESLint 및 Prettier로 코드 스타일 관리
- vercel을 통한 배포
- sentry를 통한 에러 추적 및 모니터링

<br><br>

# 💣 트러블 슈팅

<details>
  <summary>📌 푸시 알림을 보내기 위해 Expo 프로젝트와 APNs, FCM 연결하기</summary>

![Image](https://github.com/user-attachments/assets/3417ef3d-cae1-4bfd-a183-d21dd7a7e2d0)

- **문제 상황**

  - Expo에서는 푸시 알림을 보내기 위해 FCM(Firebase Cloud Messaging) 또는 APNs(Apple Push Notification service) 와 연결이 필요함.
  - iOS(APNs) 는 Expo가 자동으로 설정해주지만, Android(FCM) 은 개발자가 직접 설정해야 함.

- **원인 파악**

  - **APNs(애플)**
    - 애플 개발자 계정에는 APNs 인증 키(APNS authentication key) 가 존재함.
    - Expo는 개발자 계정이 등록되어 있으면 이를 이용해 자동으로 APNs와 연결 가능.
  - **FCM(구글 & 파이어베이스)**
    - 구글은 FCM의 Sender ID 및 Server Key 를 프로젝트 단위로 발급함.
    - 보안 정책상 이 키들은 외부에서 자동으로 가져올 수 없으며, 직접 설정해야 함.

- **해결 방법**
  - **iOS(APNs)** : Expo가 자동으로 APNs와 연결해 주므로 별도 설정이 필요 없음.
  - **Android(FCM)** :
    - Firebase Console에서 Sender ID 및 Server Key 를 수동으로 가져와 Expo 프로젝트에 설정해야 함.
    - Firebase 프로젝트와 Expo를 직접 연결하여 푸시 알림을 정상적으로 사용할 수 있도록 구성.

</details>

<br>

<details>
  <summary>📌 IOS 입력 필드 확대 및 가상 키보드 가림 문제 (크로스 브라우징)</summary>

### 문제 상황

- 입력 필드(focus) 시 화면 확대 문제
- 가상 키보드가 입력 필드를 가리는 문제

### 원인 파악

- **화면 확대 문제의 원인**
  - iOS 환경에서 `input`, `textarea` 등의 글꼴 크기가 16px 미만이면 화면이 자동 확대됨.
  - 프로젝트 디자인 시안은 14px로 설정되어 있어, 화면이 확대되는 문제가 발생함.
- **키보드 가림 문제의 원인**
  - **Android**: 키보드가 올라올 때 Viewport의 높이를 자동 조절하여 입력 필드가 보이도록 함.
  - **iOS**: 키보드가 올라와도 Viewport 크기를 변경하지 않고 document를 밀어 올리는 방식을 사용하여, 키보드 뒤로 가려지는 문제가 발생함.

### 해결 방법

| 해결 방법                          | 설명                                                                                                           | 단점                                                                                      |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **① `transform: scale()` 활용**    | 글꼴 크기를 16px로 변경한 후, `transform: scale()`을 사용해 14px처럼 보이도록 조정                             | `border`, `line-height`, `padding` 등의 스타일을 추가로 조정해야 하므로 유지보수가 어려움 |
| **② `viewport meta 태그` 적용 ✅** | `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">` 추가 | 모바일 확대 기능이 사라짐 (하지만 모바일 우선 UX에서는 큰 문제 없음)                      |

- **입력 필드 확대 문제 해결**

  - 최종적으로 `viewport meta 태그`를 적용하여 화면 확대 방지

- **가상 키보드 가림 문제 해결**

  - `visualViewport API` 활용하여 키보드 높이 감지 및 조정
  - `window.visualViewport.height` 값을 활용해 전체 화면 높이와 실제 보이는 영역을 비교하여 키보드 높이를 계산
  - Safari 브라우저에서만 동작하도록 `userAgent` 체크 추가

  <br>

  <p align="center">
    <img src="https://github.com/user-attachments/assets/e0f3961f-2694-41ae-bc15-ef18d5565359" width="300" />
  </p>

</details>

<br><br>
