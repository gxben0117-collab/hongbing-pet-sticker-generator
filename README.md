# 紅兵寵物 LINE 貼圖生成器

靜態單頁版的寵物 LINE 貼圖 Prompt 生成工具。主要入口是 `index.html`，Node.js 只負責本機預覽、建置、測試與 lint。

## 🌐 線上使用

**網址**: [https://gxben0117-collab.github.io/hongbing-pet-sticker-generator/](https://gxben0117-collab.github.io/hongbing-pet-sticker-generator/)

無需安裝，直接在瀏覽器中使用！

## 專案狀態

- **版本**：v1.35
- **類型**：Static HTML app
- **主要入口**：`index.html`
- **建置產物**：`output/index.html`
- **部署目標**：GitHub Pages

## ✨ v1.35 更新重點

### 新增角色（39個）
- 🐺 **野狼系列**：1個角色 + 3組專屬台詞
- 🐭🐂🐯🐰🐉🐍🐴🐐🐵🐔🐕🐷 **12生肖系列**：12個角色 + 36組台詞
- 🦁🐘🦒🦓🐼🐨🦘🐧🐻‍❄️🦛🦏🦍🦩🦚🦥 **動物園系列**：15個角色 + 45組台詞
- 🦈🐬🐋🐙🪼🐢🦭🦀⭐🐴🐠 **海洋動物系列**：11個角色 + 33組台詞

### 新增台詞腳本
- **117組動物專屬台詞**（每個角色3組：日常、個性、短句）
- **16個日常生活熱門貼圖文字分類**（256句）
  - 超實用日常、網路流行語、心情狀態、日常抱怨
  - 讚美鼓勵、日常確認、拒絕婉拒、等待回覆
  - 日常邀約、網購日常、追劇追星、美食吃貨
  - 運動健身、學習進修、居家生活等

### 新增功能群組
- **46個腳本群組**，方便快速選擇不同主題的貼圖文字
- 包含生肖專屬、動物園系列、海洋動物系列等整合群組

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
npm run build   # 建置專案
npm run dev     # 啟動開發伺服器
npm run lint    # 檢查程式碼
npm test        # 執行測試
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
| `assets/` | 圖片、圖示、匯入素材 | 是，僅正式素材 |
| `versions/` | 版本快照與歷史 HTML 留存 | 是，若作為釋出紀錄 |
| `output/` | 建置產物與部署輸出 | 否，CI/部署可重建 |
| `temp/` | 暫存、實驗、一次性檔案 | 否 |
| `node_modules/` | npm 安裝依賴 | 否 |

## 部署

### GitHub Pages（推薦）

專案已設定 GitHub Actions 自動部署。推送到 `main` 分支後會自動：

1. 觸發 `.github/workflows/deploy.yml`
2. 部署到 GitHub Pages
3. 線上網址：https://gxben0117-collab.github.io/hongbing-pet-sticker-generator/

詳細部署說明請參考 `docs/deployment/` 資料夾。

## 維護原則

- `index.html` 是目前產品入口，調整 UI 或 Prompt 邏輯前先補測試。
- `output/` 只放 build 結果，不手動維護。
- `temp/` 只放可丟棄資料，不作為來源依據。
- 新增正式素材放 `assets/`，新增文件放 `docs/`。
- 大版本或可回溯快照放 `versions/`，避免散落在根目錄。

## 文檔

- [維護文檔](docs/MAINTENANCE.md) - 版本封版、檢查指令與腳本擴充規則
- [專案審計](docs/PROJECT_AUDIT.md) - 專案結構與代碼審計
- [部署指南](docs/deployment/) - 完整的部署相關文檔
- [整理計畫](docs/PROJECT_CLEANUP_PLAN.md) - 專案整理與架構規劃

## 版本歷史

### v1.35 (2026-05-28)
- 新增 39 個動物角色（野狼、12生肖、15動物園、11海洋）
- 新增 117 組動物專屬台詞
- 新增 16 個日常生活熱門貼圖文字分類
- 新增 46 個腳本群組
- 專案結構整理與優化

### v1.34 (2026-05-26)
- 補齊其他指定寵物專屬台詞：甜心、可樂、QQ、糖糖、湯圓、卡哇
- 每隻指定寵物新增 3 組分類：日常/個性情境/短句
- 新增「指定寵物專屬」整合群組

### v1.33 (2026-05-26)
- 幫灰灰新增 9 組專屬生活台詞
- 新增灰灰專屬、灰灰生活應用、灰灰情緒陪伴三個群組

### v1.32 (2026-05-26)
- 新增 10 組文字腳本分類：平台客服、直播互動、社團公告等
- 新增營運商用、多語擴充、照護關心等腳本群組

### v1.31 (2026-05-26)
- 新增 9 組貼圖文字腳本分類
- 腳本區新增「補滿空格、重排已選、複製腳本、清空腳本」快速操作

## 貢獻

歡迎提交 Issue 或 Pull Request！

## 授權

本專案為私有專案，版權所有。

## 聯絡

- GitHub: https://github.com/gxben0117-collab/hongbing-pet-sticker-generator
- 線上網站: https://gxben0117-collab.github.io/hongbing-pet-sticker-generator/
