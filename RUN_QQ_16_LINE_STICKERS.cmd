@echo off
chcp 65001 >nul
set "PY=C:\Users\User\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
set "SCRIPT=C:\Users\User\Documents\Codex\紅兵寵物 LINE 貼圖生成器\scripts\generate_qq_line_stickers.py"
"%PY%" "%SCRIPT%"
pause
