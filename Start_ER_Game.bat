@echo off
echo ==========================================
echo      STARTING ER GAME: CODE BLUE
echo ==========================================
echo.
echo Phase 1: Launching Browser...
start "" "http://localhost:3000/"

echo Phase 2: Starting Game Server...
echo (This window will stay open to run the server)
echo.
cd code-blue
npm run dev
pause
