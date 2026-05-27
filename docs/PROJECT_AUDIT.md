# 專案整理報告

盤點日期：2026-05-26
最近更新：v1.32

## 專案定位

本專案是靜態單頁 HTML 工具，核心功能集中在根目錄 `index.html`。Node.js 專案層負責：

- 本機靜態伺服：`scripts/serve.mjs`
- 建置輸出：`scripts/build.mjs`
- 結構與回歸測試：`tests/basic.mjs`
- ESLint 檢查：`eslint.config.mjs`

目前未發現 Python 專案設定檔或 Python 原始碼，因此此專案現階段應視為 Node 輔助的 static HTML app。

## 目前資料夾用途

| 路徑 | 現況 | 建議定位 |
| --- | --- | --- |
| `.github/workflows/` | GitHub Pages 部署流程 | 保留為 CI/CD 設定 |
| `assets/` | 目前空資料夾 | 正式圖片、圖示、參考素材 |
| `docs/` | 文件資料夾 | 專案文件、盤點報告、規範 |
| `node_modules/` | npm 依賴 | 可重建，不納入版本控制 |
| `output/` | `npm run build` 產物 | 部署輸出，不納入版本控制 |
| `scripts/` | build/dev server 腳本 | Node 工具腳本 |
| `src/` | 目前空資料夾 | 未來拆分 JS/CSS/data 的來源層 |
| `temp/` | 目前空資料夾 | 暫存與一次性實驗，不納入版本控制 |
| `tests/` | Node test runner 測試 | 回歸測試 |
| `versions/` | 目前空資料夾 | 版本快照、歷史封版 HTML |

## 發現的整理問題

- `README.md` 原本內容出現編碼亂碼，已改為可維護的繁體中文說明。
- `.gitignore` 原本只忽略 `node_modules/` 和 OS metadata，已補上 `output/`、`temp/`、環境檔、cache 與 editor metadata。
- `package.json` 的 `description` 原本不可讀，已改為可解析、可讀的英文描述，並補上 Node engine。
- 根目錄同時有正式入口 `index.html` 與建置產物 `output/index.html`，這是合理分離；後續應避免手動修改 `output/index.html`。
- `assets/`、`src/`、`temp/`、`versions/` 目前為空資料夾，應用 README 明確約束用途，避免未來混放。

## 建議正式資料夾架構

```text
.
├── index.html
├── package.json
├── package-lock.json
├── eslint.config.mjs
├── netlify.toml
├── README.md
├── ai-task.md
├── assets/
├── docs/
│   └── PROJECT_AUDIT.md
├── scripts/
│   ├── build.mjs
│   └── serve.mjs
├── tests/
│   └── basic.mjs
├── versions/
├── output/
└── temp/
```

## 建議搬移清單

本次未實際搬移任何檔案。建議後續分階段處理：

| 現在位置 | 建議位置 | 理由 |
| --- | --- | --- |
| `RUN_QQ_16_LINE_STICKERS.cmd` | `scripts/RUN_QQ_16_LINE_STICKERS.cmd` 或 `docs/legacy/` | 若仍是可執行工作流，歸入 `scripts/`；若只是舊紀錄，歸入文件 |
| `ai-task.md` | `docs/ai-task.md` | 若作為長期任務文件，建議歸入文件層 |
| 未來測試輸出 | `temp/` | 避免散落根目錄 |
| 未來封版 HTML | `versions/index_vX.YY.html` | 保留可回溯版本 |
| 未來正式素材 | `assets/` | 與暫存/輸出分離 |

## 建議保留清單

- `index.html`：目前正式入口。
- `package.json` / `package-lock.json`：Node 專案與可重現依賴。
- `scripts/`：建置與本機預覽工具。
- `tests/`：目前 32 個回歸測試。
- `.github/workflows/deploy.yml`：GitHub Pages 部署設定。
- `netlify.toml`：Netlify 部署設定。
- `docs/`：正式文件。
- `assets/`：正式素材預留。
- `versions/`：版本快照預留。

## 建議忽略清單

已寫入 `.gitignore`：

- `node_modules/`
- `output/`
- `temp/`
- `tmp/`
- `*.tmp`
- `*.log`
- `.env`
- `.env.*`
- `.DS_Store`
- `Thumbs.db`
- `.vscode/`
- `.idea/`
- `.eslintcache`
- `coverage/`

## 檢查結果

使用 Windows PowerShell 時，直接執行 `npm` 會因 `npm.ps1` 執行政策失敗；改用 `npm.cmd` 後檢查通過。

```text
npm.cmd run lint  -> pass
npm.cmd run build -> pass
npm.cmd test      -> pass, 32 tests passed
```

## 後續改善建議

1. 將 `index.html` 中的資料、樣式、互動邏輯逐步拆到 `src/`，再由 build 腳本組回單檔輸出。
2. 為 `ai-task.md` 確認正確編碼，若是正式任務文件，移入 `docs/` 並修復亂碼。
3. 若 `RUN_QQ_16_LINE_STICKERS.cmd` 仍需使用，補一份 `docs/qq-workflow.md` 說明輸入、輸出與安全注意事項。
4. 補上版本封版流程：每次正式發布時複製 `index.html` 到 `versions/index_vX.YY.html`。
5. 擴充測試，加入 build output 一致性、必要 UI id、Prompt 防漂移關鍵字等檢查。

## v1.32 補充盤點

- `index.html` 維持單檔入口，腳本資料仍集中於 `scriptData` 與 `scriptGroups`，未新增平行資料來源。
- 腳本分類從 v1.31 的生活/物種擴充，延伸到客服、直播、社團、交易、多語與照護場景。
- 腳本工具列新增 `.script-toolbar` 樣式，手機版改為 2 欄，極窄版改為 1 欄。
- `filterScripts()` 已補空狀態顯示，搜尋不到文字時會提示使用者切換關鍵字或分類。
- `docs/MAINTENANCE.md` 已補齊維護規則，後續每次正式更新應同步版本、README、tests、versions 快照與 build output。
