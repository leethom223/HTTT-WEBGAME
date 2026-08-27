@echo off
chcp 65001 >nul
title 36GameS - Public Web Server (Cloudflare Tunnel)
color 0b

echo ================================================================
echo           🎮 36GameS - PHÁT SÓNG WEB TRỰC TUYẾN 24/7
echo ================================================================
echo.
echo [1/3] Đang kiểm tra máy chủ Backend & Frontend...
echo.
echo [2/3] Đang thiết lập đường hầm bảo mật Cloudflare Tunnel...
echo.
echo [3/3] ĐƯỜNG LINK CÔNG KHAI CỦA BẠN SẼ XUẤT HIỆN BÊN DƯỚI:
echo ----------------------------------------------------------------
echo 👉 Hãy tìm dòng có chứa: https://...trycloudflare.com
echo 👉 Bạn có thể copy link đó gửi cho bạn bè / thầy cô truy cập!
echo ----------------------------------------------------------------
echo.

cloudflared.exe tunnel --url http://localhost:5173

pause
