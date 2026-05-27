# 紅兵寵物 LINE 貼圖生成器

靜態單頁版的寵物 LINE 貼圖 Prompt 生成工具。主要入口是 `index.html`，Node.js 只負責本機預覽、建置、測試與 lint。

## 🌐 線上使用

**網址**: [https://gxben0117-collab.github.io/hongbing-pet-sticker-generator/](https://gxben0117-collab.github.io/hongbing-pet-sticker-generator/)

無需安裝，直接在瀏覽器中使用！

## 專案狀態

- 版本：v1.34
- 類型：Static HTML app
- 主要入口：`index.html`
- 建置產物：`output/index.html`
- 部署目標：Netlify 或 GitHub Pages

## 快速開始

```bash
npm install
npm run dev
```

本機預覽預設網址：

```text
http://localhost:3000
```

Windows PowerShell 若遇到 `npm.ps1` 執行政策限制，可改用：

```powershell
npm.cmd run dev
```

## 常用指令

```bash
npm run build
npm run lint
npm test
```

指令用途：

- `npm run build`：從 `index.html` 產生 `output/index.html`
- `npm run dev` / `npm start`：啟動本機靜態伺服器
- `npm run lint`：檢查 `scripts/` 和 `tests/`
- `npm test`：執行 Node test runner 測試

## 資料夾分工

| 路徑 | 用途 | 是否應提交 |
| --- | --- | --- |
| `index.html` | 正式單頁工具入口與目前主要原始碼 | 是 |
| `scripts/` | 建置與本機伺服 Node 腳本 | 是 |
| `tests/` | 專案結構與回歸測試 | 是 |
| `docs/` | 專案文件、盤點報告、維護規範 | 是 |
| `assets/` | 未來可放圖片、圖示、匯入素材 | 是，僅正式素材 |
| `versions/` | 版本快照與歷史 HTML 留存 | 是，若作為釋出紀錄 |
| `output/` | 建置產物與部署輸出 | 否，CI/部署可重建 |
| `temp/` | 暫存、實驗、一次性檔案 | 否 |
| `node_modules/` | npm 安裝依賴 | 否 |

## 部署

### Netlify

`netlify.toml` 已指定：

```toml
[build]
  publish = "output"
  command = "npm run build"
```

### GitHub Pages

`.github/workflows/deploy.yml` 會在 `main` 或 `master` 推送後：

1. 安裝 Node 20
2. 執行 `npm ci`
3. 執行 `npm run build`
4. 發布 `output/`

## 維護原則

- `index.html` 是目前產品入口，調整 UI 或 Prompt 邏輯前先補測試。
- `output/` 只放 build 結果，不手動維護。
- `temp/` 只放可丟棄資料，不作為來源依據。
- 新增正式素材放 `assets/`，新增文件放 `docs/`。
- 大版本或可回溯快照放 `versions/`，避免散落在根目錄。

## v1.31 更新重點

- 新增 9 組貼圖文字腳本分類：早晚問候、已讀回覆、情侶放閃、飼主語錄、貓咪專用、狗狗專用、兔鳥鼠龜、急用短句、貼圖標語。
- 腳本區新增「補滿空格、重排已選、複製腳本、清空腳本」快速操作，方便整理 4 / 9 / 16 格貼圖組。
- 新增 v1.31 腳本群組入口，並把物種專用與短句快用腳本獨立整理。

## v1.32 更新重點

- 新增 10 組文字腳本分類：平台客服、直播互動、社團公告、買賣交易、醫療照護、毛孩照護、節氣季節、台語口吻、日本語貼圖、韓語貼圖。
- 新增營運商用、多語擴充、照護關心等腳本群組，方便快速做商用客服、社群經營與照護提醒貼圖。
- 腳本工具列改為可響應式排列，手機窄螢幕不會硬擠四顆按鈕。
- 腳本搜尋無結果時顯示空狀態提示，避免使用者誤以為介面壞掉。
- 補齊 `docs/MAINTENANCE.md` 維護文件，記錄版本封版、檢查指令與腳本擴充規則。

## v1.33 更新重點

- 幫灰灰新增 9 組專屬生活台詞：灰灰日常、灰灰出門、灰灰吃飯、灰灰撒嬌、灰灰吐槽、灰灰工作、灰灰安慰、灰灰節日、灰灰短句。
- 新增灰灰專屬、灰灰生活應用、灰灰情緒陪伴三個群組，方便直接抽出不同情境的 LINE 貼圖腳本。
- 更新灰灰內建套餐的 16 格預設台詞，改成更貼合灰灰灰虎斑、愛出去玩、調皮又黏人的角色語氣。

## v1.34 更新重點

- 補齊其他指定寵物專屬台詞：甜心、可樂、QQ、糖糖、湯圓、卡哇。
- 每隻指定寵物新增 3 組分類：日常/個性情境/短句，方便快速抽 16 格貼圖。
- 更新甜心、QQ、糖糖、湯圓、卡哇的內建套餐 16 格預設台詞，保留各自角色語氣。
- 新增「指定寵物專屬」整合群組，可快速瀏覽已命名寵物的日常台詞。
