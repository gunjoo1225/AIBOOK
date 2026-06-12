@echo off
chcp 65001 > nul
echo ========================================
echo   워크샵 차량 등록 시스템 시작 중...
echo ========================================
cd /d "%~dp0"
start "" "http://localhost:3000"
node server.js
pause
