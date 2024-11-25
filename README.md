# 기업과제

## 1. 기술 스택
- **프론트엔드**: React, Chakra UI, React Hook Form, Axios
- **상태 관리**: Context API
- **라우팅**: React Router
- **유효성 검사**: React Hook Form
---

## 2. 실행 방법

1. **프로젝트 설치**
```bash
npm i
```  
  
2. **프로젝트 실행**
```bash
npm run dev
```

## 3. 트러블 슈팅

### **타입스크립트를 활용한 도메인별 타입 정리 및 재사용성 강화**

도메인별로 타입스크립트의 유틸리티 타입을 활용하여 타입 정리와 재사용성을 극대화했습니다. 기존 프로젝트에서는 타입 정의가 여러 위치에 산발적으로 흩어져 있었고, 중복된 정의가 많아 유지보수가 어려웠습니다. 이를 해결하기 위해 `/types` 폴더를 생성하고, `auth.ts`, `post.ts`, `categories.ts` 등 도메인별로 타입을 분리하여 체계적으로 관리했습니다.

이 과정에서 타입스크립트의 `Pick`, `Omit`, `Partial` 등을 적극적으로 활용해 불필요한 중복을 제거하고, 공통 타입을 유연하게 확장하거나 축소할 수 있도록 설계했습니다. 예를 들어,게시글 관련 타입에서는 `Omit`을 활용해 불필요한 속성을 제외하고 API 요청 및 응답 형태에 맞춘 타입을 생성했습니다.

정리된 타입들은 프로젝트 전반에서 일관되게 사용되며, 유지보수성과 확장성이 크게 향상되었습니다. 이를 통해 새로운 기능 개발 시 중복된 타입 정의 없이 빠르게 개발이 가능했고, 타입스크립트의 정적 분석 기능을 최대한 활용하여 안정성과 코드 품질도 함께 높였습니다.

### **REST API 요청 형식 문제 해결 및 트러블슈팅**

API를 이용한 게시글 수정 기능을 구현하던 중, 서버로부터 '400 Bad Request' 오류가 발생하는 문제를 겪었습니다. 이로 인해 게시글 수정이 불가능해졌고, 기능의 핵심이 막히는 상황이었습니다.

문제가 발생한 지점을 파악하기 위해 서버 문서와 코드를 면밀히 분석했습니다. 서버는 FormData의 request 필드에 MIME 타입이 application/json인 JSON 데이터를 요구했지만, 저는 File 객체를 전송하면서 이미 올바른 타입이라고 생각했습니다. 그러나 File 객체 내부에 MIME 타입이 명시되지 않아 기본값인 text/plain으로 전송되고 있었고, 이로 인해 서버는 요청을 제대로 처리하지 못했습니다.

이슈의 근본 원인을 이해한 후, JSON 데이터를 Blob 객체로 생성하고 MIME 타입을 명시적으로 application/json으로 설정하여 FormData에 추가했습니다. 이를 통해 서버는 요청 데이터를 올바르게 인식하게 되었고, 게시글 수정 기능이 정상적으로 작동했습니다.

이 경험을 통해 File 객체의 상세한 설정에 대한 이해가 부족했음을 깨달았습니다.

```tsx
const blob = new Blob([JSON.stringify({
  title: "123",
  category: "NOTICE",
  content: "내용"
})], { type: "application/json" });

formData.append("request", blob);
```


## **4. 주요 기능**

### **4.1 로그인 유지**

![로그인 유지](https://github.com/user-attachments/assets/7d10633c-339a-43b3-b208-5960aa9b4301)

### **4.2 카테고리 필터**


![카테고리](https://github.com/user-attachments/assets/4c6caca1-8bb5-414b-8dac-ba68852690cd)

### **4.3 글 삭제**

![글 삭제](https://github.com/user-attachments/assets/d4777aca-b378-413f-92fb-34ffb2f2d34d)

### **4.4 글 작성**
![글작성](https://github.com/user-attachments/assets/462f25a3-5154-4652-a556-af606299d6ae)

### **4.5 회원가입**
![스크린샷 2024-11-25 213449](https://github.com/user-attachments/assets/13a8e01d-e09f-48f8-9f87-bc7fcaa50f17)

### **4.6 로그인**
![스크린샷 2024-11-25 213453](https://github.com/user-attachments/assets/c3fefccf-f357-4cf1-848a-08c1b204d26f)
