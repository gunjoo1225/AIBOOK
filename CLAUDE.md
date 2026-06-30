# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 범위
- **한 줄 설명:** 교회 목사님·스태프 대상 AI 업무 자동화 교육 웹 교재
- **완성된 모습:** 새 강의 섹션을 루트 `index.html`에 계속 추가·수정 가능한 상태
- **성공 기준:** 새 강의 섹션을 index.html에 추가할 수 있다
- **안 하는 것:** 버전 폴더(1~4) 수정 없음, 백엔드·DB 추가 없음 (5/workshop 제외)
- **벤치마크:** 없음

## 폴더 구조

| 경로 | 역할 | 상태 |
|------|------|------|
| `index.html` | 메인 교재 — 활성, 계속 업데이트 | **핵심** |
| `master/index.html` | 강의안 생성기 도구 | 보조 |
| `Ilsan/index.html` | 일산 지역 맞춤 버전 | 별도 |
| `5/` | 5회차 교육자료 + 비전캠프 | 진행 중 |
| `5/workshop/` | Node.js 워크숍 관리 앱 | 별도 서버 |
| `1/`, `2/`, `3/`, `4/` | 과거 버전 (vercel.json이 1~3을 404로 숨김) | 보존만 |

## 기술 스택
- 순수 HTML/CSS/JS (빌드 없음, 단일 파일 구조)
- Vercel 정적 배포 (`vercel.json`으로 구버전 라우팅 차단)
- `5/workshop/`: Node.js 서버 (`server.js`, `public/` 하위)

## index.html 구조 패턴
- CSS 변수: `--bg`, `--sidebar-bg`, `--accent`, `--primary`, `--border` 등
- 레이아웃: 좌측 사이드바(260px) + 우측 메인 콘텐츠 구조
- 페이지 전환: `.page` div에 `.active` 클래스 토글
- 네비게이션: `#sidebar nav` `.nav-item` 클릭 → 해당 페이지 표시

## 언어 설정
- 대화 및 설명: 한국어
- 코드, 변수명: 영어
- 에러 로그: 원문 그대로

## 행동 원칙
- 섹션 텍스트·내용 수정: 바로 실행
- 새 페이지(섹션) 추가: 계획 먼저 제시 후 진행
- 구버전 폴더(1~4) 수정 요청: 반드시 사전 확인
- 파괴적 작업 (섹션 삭제, 폴더 삭제): 반드시 사전 확인

## 작업 사이클
명확화 → 계획 → 구현 → 검증 → 정리(`/wrap`)

## 하지 않는 것
- 버전 폴더 1~4 수정 (명시적 요청 없이)
- 빌드 시스템·패키지 매니저 도입 (루트 및 일반 페이지)
- `5/workshop/` 외 백엔드·API 추가
- TODO 주석 남기기 — 지금 하거나 CHANGELOG.md에 기록

## 파일 맵
- `CHANGELOG.md` — 현재 상태 + 세션 기록
- `Retros/LESSONS.md` — 교훈 기록

## 명령어
- `/wrap` — 세션 마무리, CHANGELOG 업데이트, 교훈 기록
