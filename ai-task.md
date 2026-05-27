# AI 旅拍咒語修正意見

## 核心問題診斷

你的 prompt 最大問題不是「沒寫鎖臉」，而是：
**同時塞了大量「高權重美化攝影語言」，正在偷偷覆蓋 identity lock。**

AI 會遵守你寫的「不要改臉」，但它也同時看到 magazine cover、cinematic glow makeup、premium、8K HDR 這些詞——在模型裡全部都跟商業人像、AI 美女模板、臉部精緻化高度綁定。

所以它不是「故意換人」，而是在「高級旅拍攝影」權重下，自動啟動 beauty reconstruction。

---

## 高危詞對照表（必須替換）

| 原本（危險） | 替換為（安全） |
|---|---|
| `outdoor cinematic glow makeup` | `minimal real travel makeup, real skin texture, no beauty retouching` |
| `softly defined brows and lashes` | `natural untouched eyebrows and eyelashes` |
| `camera-ready but realistic travel-photo finish` | 刪除，不替換 |
| `Camera language: 雜誌封面` | `Camera language: 旅遊紀錄快照` |
| `ultra realistic premium world travel natural cinematic realism` | `documentary real-person travel photo` |
| `8K HDR` | `natural dynamic range` |
| `crisp clean air, vivid colors` | `honest environmental light, natural color rendering` |
| `healthy peach or rose lip` | `natural lip color without reshaping` |

---

## 六個最危險的具體位置

### 1️⃣ `outdoor cinematic glow makeup`
`cinematic` + `glow` + `makeup` 三個詞一起出現，幾乎一定觸發：柔皮、眼睛提亮、臉型精修、鼻梁修飾、臉部立體化。即使後面寫了 "Makeup affects color only" 也壓不住，因為前面已觸發美女模板。

### 2️⃣ `Camera language: 雜誌封面`
magazine cover 在模型裡等於商業修圖 + beauty photography + editorial face optimization，是 AI 最容易啟動「換成美女模板」的詞之一。

### 3️⃣ `ultra realistic premium world travel cinematic realism`
`premium` + `cinematic` + `realism` 一起時，模型自動提升臉部精緻度、統一五官、美肌、商業攝影化。

### 4️⃣ `softly defined brows and lashes`
模型會重建眉型、改眼型、提升睫毛濃度、眼神模板化。

### 5️⃣ `camera-ready but realistic`
`camera-ready` 本身是商業攝影詞，容易觸發 AI 商業攝影 + beauty retouch。

### 6️⃣ `8K HDR`
HDR 在女性人像上會加重臉部光滑、皮膚細化、AI 銳化。

---

## 必須全部刪除的高危詞列表

```
cinematic
glow
magazine cover
premium
editorial
fashion
camera-ready
HDR
luxury
beauty
hero shot
ultra detailed skin
perfect lighting
photogenic
elegant facial lighting
defined lashes
defined brows
```

---

## 重寫後的安全段落

### Makeup & skin（替換原版）
```
Makeup & skin: minimal real travel makeup,
real skin texture preserved,
natural untouched eyebrows and eyelashes,
no beauty retouching, no glamour filter,
no contouring, no eye-shape enhancement,
no lip reshaping, no jaw reconstruction,
natural lip color without reshaping,
documentary skin detail — pores, natural asymmetry,
real travel-photo finish only.
Makeup affects surface color and texture only.
```

### Quality（替換原版）
```
Quality: documentary real-person travel photo,
natural dynamic range, authentic skin texture,
real tourist snapshot realism,
no premium render, no cinematic beautification,
honest environmental light, natural color rendering,
unretouched facial detail.
```

### Camera language（替換原版）
```
Camera language: 旅遊紀錄快照
(real tourist snapshot, not magazine cover,
not editorial portrait, not fashion photography)
```

---

## 根本解法（最重要）

問題根源不是缺少 anti-beauty clause，而是整體 prompt 的 **prestige register（聲望語域）太高**。

**方向：把整體語言從「高端商業」降到「真實紀錄」，anti-drift clause 才能真正起作用。**

穩定鎖臉的正確風格詞：
```
real travel snapshot
documentary photography
tourist photo
natural daylight
casual candid realism
real skin texture
unretouched facial detail
authentic travel moment
```

---

---

# AI 幻想場景咒語修正意見（場景：森林鹿女）

## 核心問題診斷

這份 prompt 最大問題是：**「多個段落互相衝突」，不是單一一句錯。**

一邊在「鎖真人臉」，一邊又大量輸入「幻想美學模板詞」。
模型最後做「折衷」：不敢完全換臉，但會偷偷「優化」成 fantasy 漂亮版。

典型微改症狀：眼睛被放大、眼白變乾淨、鼻樑變細、法令紋消失、下巴變順、皮膚磨皮、臉型更對稱。

---

## 五個最致命元兇

### 1️⃣ `ultra realistic premium cinematic travel photoshoot`（最大元兇）
`premium cinematic` + `photoshoot` 是超級高危詞組合。在所有主流模型裡，這幾個詞幾乎都會自動磨皮、自動修五官、自動漂亮化、自動做商業人像。即使上面寫了 300 行 identity lock 也難以壓制，因為這些 token 權重非常高。

### 2️⃣ `high-end real-person photographic polish`（第二元兇）
`photographic polish` 等於「請幫我做高級商業修圖」。直接抵消 `authentic skin texture`——模型會「保留一點真皮膚，但還是偷偷修美」。

### 3️⃣ `romantic fantasy freshness`（第三元兇）
`romantic` + `fantasy` + `freshness` 三個合在一起觸發：年輕化、清透感、柔焦感、fantasy 女主臉。這就是「像本人，但更仙、更乾淨」的原因。

### 4️⃣ `luminous pastel eye shimmer`（第四元兇）
`luminous` + `eye shimmer` 容易觸發：偷偷放大眼睛、加亮眼白、調整眼型、做 fantasy eye。因為 fantasy makeup dataset 幾乎都帶大眼、漂亮眼型、韓系眼妝。

### 5️⃣ `Camera language: 雜誌封面` / `magazine cover`（第五元兇）
「封面照」在模型資料集裡 = 商業修圖 = 明星級美化 = 五官優化 = 完美皮膚。模型會做「自然一點的封面臉」而非完全不修。

---

## 結構錯誤分析

```
IDENTITY LOCK
↓
ANTI BEAUTY
↓
大量 fantasy 美學詞（cinematic / premium / magazine / photoshoot / fantasy freshness / luminous / polish）
```

後面的風格詞數量太大，模型注意力被覆蓋。
AI 不是真的「理解邏輯」——哪些 token 最強，往哪裡偏。

---

## 花仙子 Archetype 污染問題

```
Makeup & skin: flower fairy makeup
```

`flower fairy` 本身就是一整個 fantasy 女性模板。
模型直接聯想：精靈女主角 / 大眼 / 小臉 / 白皮膚 / 年輕化。

**你不是被「妝容」影響，你是被 flower fairy 整個 archetype 污染。**

---

## 高危詞對照表（森林鹿女版）

| 原本（危險） | 替換為（安全） |
|---|---|
| `ultra realistic premium cinematic travel photoshoot` | `documentary real-person natural photography` |
| `high-end real-person photographic polish` | 刪除，不替換 |
| `8K HDR` | `natural dynamic range` |
| `romantic fantasy freshness` | 刪除，不替換 |
| `flower fairy makeup` | `minimal botanical surface tint, no fantasy archetype` |
| `luminous pastel eye shimmer` | `natural eye color, no shimmer enlargement` |
| `Camera language: 雜誌封面` | `Camera language: 旅遊紀錄快照` |
| `premium cinematic` | `ordinary optical realism` |
| `photographic polish` | `unretouched skin texture` |

---

## 必須全部刪除的高危詞（幻想場景版）

```
premium
cinematic
photoshoot
magazine cover / 雜誌封面
photographic polish
fantasy freshness
luminous
editorial
high-end
flower fairy（整個 archetype）
romantic
fantasy
```

---

## 重寫後的安全段落（森林鹿女版）

### Makeup & skin（替換原版）
```
Makeup & skin: minimal botanical surface cosmetic tint only,
no fantasy archetype makeup,
no flower fairy template,
no eye enlargement effect,
no beauty editorial styling,
no romantic fantasy freshness effect,
natural untouched skin texture,
real pores and natural asymmetry preserved,
surface color only — no structural change to eyes, brows, lips, or jaw.
```

### Quality（替換原版）
```
Quality: documentary real-person natural photography,
ordinary optical realism,
natural dynamic range,
unretouched skin texture,
non-commercial face rendering,
identity-faithful photography,
real camera skin response,
natural facial asymmetry preserved.
No premium render, no cinematic beautification, no photographic polish.
```

---

## 正確的思維框架

**不要用：** `fantasy cinematic portrait`

**要用：** `a real person accidentally photographed inside a fantasy environment`

這兩者對模型的激活方向差距極大。

---

## 通用高危詞黑名單（所有場景適用）

```
cinematic / premium / editorial / fashion / magazine / photoshoot
cover / beauty / glamour / luxury / goddess / queen / epic
high-end / polish / glow / luminous / radiant
fantasy archetype 詞（flower fairy / forest spirit / xianxia heroine 等）
HDR（女性人像尤其危險）
```

**替換方向：**
```
real person / documentary / natural / unretouched
ordinary optical / candid / snapshot / identity-faithful
non-commercial / real camera response
```

---

*記錄日期：2026-05-24*

---

---

# AI 補充分析（場景：森林鹿女 — 第二輪審查）

## 新發現：場景內部矛盾

這份 prompt 存在一個前兩輪分析未提到的問題：**哥德黑暗語境 vs 明亮森林場景，兩者在同一份 prompt 裡共存，造成模型定向混亂。**

```
Character behavior context: gothic atmosphere comes from composure
in dark environments — lighting a candle, reading by low light, standing in shadow...
```
↓ 但同一份 prompt 的場景卻是：
```
Scene: enchanted ancient forest clearing, mossy green ground,
soft twilight sunbeams cutting fog.
Lighting style: 自然日光. Atmosphere: 晴空清透.
```

**哥德暗室行為** ＋ **陽光森林場景** ＝ 模型做模糊折衷，兩邊都做到一半，環境感和人物行為都失真。

---

## 新發現：`enchanted` 是隱形 archetype 觸發詞

```
Scene: enchanted ancient forest clearing
```

`enchanted` 在模型資料集裡大量對應：

- 精靈女主角
- 奇幻美女
- 仙氣臉孔
- fantasy heroine

這個詞雖然放在「場景」段落，但模型不分段落讀取，它仍然會影響人物臉型。

**修正：** 改成 `old-growth forest clearing` 或 `ancient woodland clearing`，去掉 enchanted。

---

## 新發現：`vivid colors` + `high-clarity` 在人像場景的副作用

```
Atmosphere: crisp clean air, vivid colors, strong defined details, high-clarity visual rendering.
```

這組詞對「場景」是中性的，但對「臉部」的副作用是：

- 提高面部對比度
- 銳化五官輪廓
- 讓眼睛看起來更亮、更大
- 整體讓臉「更精緻」

**修正：** 改成 `honest environmental light, natural color depth, real-world detail level`。

---

## 新發現：`delicate botanical glow` 是複合型危險詞

```
Makeup & skin: flower fairy makeup: soft petal blush,
luminous pastel eye shimmer, floral pink or peach lip,
delicate botanical glow, romantic fantasy freshness.
```

`delicate botanical glow` 拆解：

| 詞 | 在模型裡的激活方向 |
|---|---|
| `delicate` | 精緻化臉型、縮小五官 |
| `botanical` | 植物仙女 archetype、年輕化 |
| `glow` | 皮膚發光、磨皮、膚質統一 |

三個詞加在一起 = 標準的「仙女臉補丁」，即使只放在 makeup 段落。

**修正：** 全句刪除，改成 `no glow effect, no skin luminosity enhancement`。

---

## 整份 prompt 的高危詞密度統計

| 類型 | 危險詞數量 |
|---|---|
| 商業攝影 | premium / cinematic / photoshoot / polish / high-end / magazine → **6個** |
| 美化特效 | luminous / glow / HDR / vivid / high-clarity → **5個** |
| Fantasy archetype | flower fairy / enchanted / romantic fantasy / botanical / freshness → **5個** |
| **合計** | **16個高危詞** |

Anti-beauty clause 裡的否定詞約 **12–15個**。

**高危詞數量 > 否定詞數量 → identity lock 失效是數學結果，不是邏輯失敗。**

---

## 完整修正清單（可直接對照貼入）

### 刪除不替換（6條）
```
high-end real-person photographic polish
romantic fantasy freshness
delicate botanical glow
8K HDR
camera-ready
high-end
```

### 直接替換（8條）

| 原文 | 替換 |
|---|---|
| `ultra realistic premium cinematic travel photoshoot` | `documentary real-person natural photography` |
| `flower fairy makeup` | `minimal real-person surface cosmetic tint, no archetype` |
| `luminous pastel eye shimmer` | `natural eye color, no eye-shape modification` |
| `Camera language: 雜誌封面` | `Camera language: 環境紀錄快照` |
| `enchanted ancient forest` | `old-growth ancient forest` |
| `vivid colors, strong defined details, high-clarity visual rendering` | `honest environmental light, natural color depth, real-world detail level` |
| `crisp clean air` | 刪除 |
| `Gothic atmosphere` 行為描述 | 若場景為明亮森林，刪除 gothic 行為段落，或改成符合森林的靜態行為 |

---

## 場景內部矛盾修正建議

**方案 A：保留明亮森林，移除哥德行為描述**
```
Character behavior: sitting on a mossy log, relaxed candid posture,
looking naturally at camera, face open and clearly lit.
```

**方案 B：保留哥德行為，改換場景為暗色環境**
```
Scene: ancient stone chapel ruin in deep forest,
dark moss-covered walls, dim shaft of light from broken ceiling,
single candle or lantern light source.
```

兩個選一個。不能同時要「陽光森林」和「哥德暗室行為」。

---

*記錄日期：2026-05-24*

---

---

# LINE 貼圖生成器 UI 介面高危詞分析

## 分析範圍

掃描 `index.html` 中所有嵌入 prompt 的資料陣列：`styleData`、`fontData`、`outfitData`、`layoutData`、`bgData`、`scriptData`，以及所有常數字串（`PET_IDENTITY_LOCK_V115`、`LINE_OUTPUT_RULES_V115`、`PET_SET_CONSISTENCY_V121`、`STICKER_EMOTION_MATRIX_V121`、`LINE_SAFE_OUTPUT_SPEC_V121`）。

---

## 風險等級總表

| 等級 | 資料項目 | 高危詞 | 問題說明 |
|---|---|---|---|
| 🔴 最高風險 | `styleData.3d_cartoon` | `smooth subsurface skin/fur shading` + `expressive large eyes` + `clean volumetric rendering` | 三詞同時出現，觸發臉部精修 + 眼睛放大 |
| 🔴 最高風險 | `styleData.chibi` | `large expressive eyes` | 直接放大眼型，改變五官比例 |
| 🟡 中等風險 | `styleData.dreamy` | `soft-focus` | 觸發柔焦磨皮效果 |
| 🟡 中等風險 | `styleData.korean` | `delicate facial expressions` | `delicate` 觸發五官精緻化、縮小臉型 |
| 🟡 中等風險 | `outfitData.舞會晚禮服` | `glamorous` | 商業攝影 archetype 詞，觸發整體美化 |
| 🟡 中等風險 | `fontData.TOP海報體` | `cinematic layout` | `cinematic` 在字型描述裡外溢到人像渲染 |
| 🟢 安全 | 所有 LOCK 常數 | — | 無高危詞，語言已正確使用否定式 |
| 🟢 安全 | `layoutData`、`bgData` | — | 純構圖/背景詞，不影響人物 |
| 🟢 安全 | `scriptData` | — | 純文字台詞，不含攝影渲染詞 |

---

## 六個高危位置逐條說明

### 1️⃣ `styleData` → `3d_cartoon`（最高風險）

```
smooth subsurface skin/fur shading, expressive large eyes,
clean volumetric rendering
```

- `smooth subsurface skin/fur shading`：等於「請做高級皮膚/毛髮渲染」，模型自動啟動磨皮、毛髮柔化、皮膚光滑化
- `expressive large eyes`：直接命令放大眼睛，改變眼型比例
- `clean volumetric rendering`：`clean` + `volumetric` 組合在 3D 動物人像上，觸發「商業 CGI 精修」路徑

**三詞合力效果：** 即使是寵物場景，也會讓動物五官往「皮克斯精修動物角色」方向走，失去真實寵物特徵。

### 2️⃣ `styleData` → `chibi`（最高風險）

```
large expressive eyes
```

- 直接改變眼型比例（放大）
- 在 chibi 風格中，模型的「大眼」基準非常誇張，容易覆蓋寵物原本的眼形特徵

### 3️⃣ `styleData` → `dreamy`（中等風險）

```
soft-focus
```

- `soft-focus` 在人像/動物像中觸發：柔化輪廓、磨皮、毛髮柔順化、整體「夢幻感」美化
- 對寵物貼圖而言，soft-focus 會讓毛色和臉型細節失真

### 4️⃣ `styleData` → `korean`（中等風險）

```
delicate facial expressions
```

- `delicate` 在人像語境中 = 精緻五官、縮小輪廓、柔化骨架
- 即使放在「表情」段落，模型仍整體激活 Korean 美妝 archetype

### 5️⃣ `outfitData` → `舞會晚禮服`（中等風險）

```
glamorous
```

- `glamorous` = 商業攝影美化 archetype
- 在服裝描述裡出現，會讓整體渲染往「雜誌封面人像」方向偏移
- 即使對象是寵物，glamorous 也會觸發整體精修感

### 6️⃣ `fontData` → `TOP海報體`（中等風險）

```
cinematic layout
```

- `cinematic` 是通用高危詞，放在字型描述裡理論上只影響版面，但模型不分段落讀取 token
- 整份 prompt 裡出現 `cinematic` 就會提升整體「商業攝影」權重

---

## 安全確認（無需修改）

### PET_IDENTITY_LOCK_V115 ✅
所有語言使用正確的否定式（`do NOT alter`、`Reject ALL`、`strictly forbidden`），無高危美化詞。

### LINE_OUTPUT_RULES_V115 ✅
純輸出規格（尺寸、格式），無渲染語言。

### PET_SET_CONSISTENCY_V121 ✅
強調一致性、識別度保持，語言方向正確。

### layoutData、bgData ✅
純構圖（居中、邊框）和背景（白底、粉底）描述，不影響人物渲染。

### scriptData ✅
全部為中文台詞文字，無任何攝影渲染詞。

---

## 修正建議

### 直接替換（4 條）

| 原文 | 替換 |
|---|---|
| `smooth subsurface skin/fur shading` | `natural fur texture, real coat detail` |
| `expressive large eyes`（3d_cartoon） | `faithful eye shape, no enlargement` |
| `expressive large eyes`（chibi） | `stylized proportions, pet-faithful eye shape` |
| `soft-focus` | `natural depth of field, no blur filter` |

### 刪除不替換（3 條）

```
clean volumetric rendering → 刪除（改成 natural render）
glamorous → 刪除（服裝風格不需要此詞）
cinematic layout → 刪除（改成 poster layout 或 bold typographic layout）
```

### 輕度調整（1 條）

| 原文 | 替換 |
|---|---|
| `delicate facial expressions` | `clear readable expressions, no facial refinement` |

---

## 整體評估

**高危詞總數：6 個**（3 個最高風險，3 個中等風險）

對比旅拍/幻想場景的 16 個高危詞，LINE 貼圖生成器的 prompt 資料相對乾淨。最需要優先修正的是 `styleData.3d_cartoon`，因為它同時包含三個互相強化的高危詞，最容易造成寵物身份漂移。

---

*記錄日期：2026-05-24*
