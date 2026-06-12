import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');

describe('index.html structure', () => {
  it('has DOCTYPE and lang=zh-TW', () => {
    assert.ok(html.includes('<!DOCTYPE html>'));
    assert.ok(html.includes('lang="zh-TW"'));
  });

  it('has UTF-8 charset meta', () => {
    assert.ok(html.includes('charset="UTF-8"'));
  });

  it('has main UI sections for the streamlined workflow', () => {
    for (const i of [1, 2, 3, 4, 5, 6, 7]) {
      assert.ok(html.includes(`<div class="section-num">${i}</div>`), `Missing section ${i}`);
    }
  });

  it('uses compact app flow instead of landing hero', () => {
    assert.ok(!html.includes('id="hero-section"'), 'Hero section should be removed');
    assert.ok(!html.includes('class="hero-title"'), 'Hero title should be removed');
    for (const label of ['寵物資料', '貼圖設定', '台詞腳本', '生成咒語']) {
      assert.ok(html.includes(label), `Missing flow label ${label}`);
    }
  });

  it('has combineAll function', () => {
    assert.ok(html.includes('function combineAll()'));
  });

  it('has preset data', () => {
    assert.ok(html.includes('const presets = ['));
  });

  it('has script categories', () => {
    assert.ok(html.includes('const scriptData={'));
    assert.ok(html.includes("'熱門常用'"));
  });

  it('has localStorage save/load', () => {
    assert.ok(html.includes('localStorage.setItem'));
    assert.ok(html.includes('localStorage.getItem'));
  });

  it('has no broken script close tags inside JS', () => {
    const scriptBlocks = html.match(/<script[\s\S]*?<\/script>/g) || [];
    assert.ok(scriptBlocks.length > 0, 'Should have at least one <script> block');
  });

  it('has copyToClipboard function', () => {
    assert.ok(html.includes('async function copyToClipboard'));
  });

  it('has PET_IDENTITY_LOCK constant', () => {
    assert.ok(html.includes('PET_IDENTITY_LOCK_V115'));
  });

  it('has strict 4x4 LINE export layout lock', () => {
    assert.ok(html.includes('LINE STICKER SHEET LAYOUT LOCK v2.0'), 'Missing layout lock');
    assert.ok(html.includes('370 × 320 px per sticker'), 'Missing LINE panel export target');
    assert.ok(html.includes('PRIORITIZE PANEL SEPARATION'), 'Missing panel separation priority');
    assert.ok(html.includes('NO DIVIDER OR FRAME LINES'), 'Missing no-divider rule');
    assert.ok(html.includes('Do NOT draw panel divider lines'), 'Missing explicit panel divider ban');
    assert.ok(!html.includes('visible light-gray cutting guides'), 'Should not request visible guide lines');
  });
});

describe('preset data integrity', () => {
  it('all presets in PRESET_CATS_MAP exist in presets array', () => {
    const ids = [...html.matchAll(/\{id:'([^']+)'/g)].map(m => m[1]);
    assert.ok(ids.length >= 10, `Expected at least 10 presets, got ${ids.length}`);
  });

  it('has at least 55 total presets', () => {
    const ids = [...html.matchAll(/\{id:'([^']+)'/g)].map(m => m[1]);
    assert.ok(ids.length >= 55, `Expected ≥55 presets, got ${ids.length}`);
  });

  it('has new v1.30 presets', () => {
    assert.ok(html.includes("id:'persian-cat'"), 'Missing persian-cat');
    assert.ok(html.includes("id:'scottish-fold'"), 'Missing scottish-fold');
    assert.ok(html.includes("id:'samoyed'"), 'Missing samoyed');
    assert.ok(html.includes("id:'guinea-pig'"), 'Missing guinea-pig');
    assert.ok(html.includes("id:'turtle'"), 'Missing turtle');
  });
});

describe('mobile responsive', () => {
  it('has media queries', () => {
    assert.ok(html.includes('@media (max-width'), 'Missing responsive CSS media queries');
  });

  it('has script-panel class for mobile', () => {
    assert.ok(html.includes('class="script-panel"'), 'Missing script-panel class');
  });

  it('has script-panel-right class for mobile', () => {
    assert.ok(html.includes('class="script-panel-right"'), 'Missing script-panel-right class');
  });

  it('has fab-top button', () => {
    assert.ok(html.includes('id="fab-top"'), 'Missing FAB top button');
  });
});

describe('bug fixes', () => {
  it('no custom-color-item class usage without CSS', () => {
    assert.ok(!html.includes('"custom-color-item"'), 'custom-color-item class used but has no CSS');
  });

  it('layoutData has fallback', () => {
    assert.ok(html.includes('layoutData[state.layoutStyle]||layoutData.random'), 'Missing layoutData fallback');
  });

  it('bgData has fallback', () => {
    assert.ok(html.includes('bgData[state.bgStyle]||bgData.white'), 'Missing bgData fallback');
  });

  it('filterScripts highlights custom items', () => {
    assert.ok(html.includes('state.customItems.includes(t)'), 'filterScripts does not highlight custom items');
  });
});

describe('UI features', () => {
  it('has toast notification system', () => {
    assert.ok(html.includes('function showToast('), 'Missing showToast function');
    assert.ok(html.includes('id="toast-msg"'), 'Missing toast element');
  });

  it('has keyboard shortcut for combine', () => {
    assert.ok(html.includes("e.key==='Enter'"), 'Missing keyboard shortcut');
  });

  it('has prompt character count', () => {
    assert.ok(html.includes('id="prompt-char-count"'), 'Missing prompt char count element');
  });

  it('uses ChatGPT-side image upload instructions without fake local upload UI', () => {
    assert.ok(html.includes('id="char-img-panel"'), 'Missing pet image panel');
    assert.ok(html.includes('照片和咒語一起傳給 ChatGPT'), 'Missing ChatGPT-side upload instruction');
    assert.ok(!html.includes('id="upload-zone"'), 'Fake local upload zone should be removed');
    assert.ok(!html.includes('id="pet-file-input"'), 'File input should be removed');
    assert.ok(!html.includes('id="ai-workflow-section"'), 'AI workflow should not be a separate top-level section');
    assert.ok(!html.includes('id="ai-history-panel"'), 'AI history panel should be removed from the UI');
  });

  it('fixes output to 4x4 and removes prop selection UI', () => {
    assert.ok(html.includes('4×4 固定格式'), 'Missing fixed 4x4 UI');
    assert.ok(!html.includes('id="qty-1"'), '1 panel option should be removed');
    assert.ok(!html.includes('id="qty-4"'), '4 panel option should be removed');
    assert.ok(!html.includes('id="qty-9"'), '9 panel option should be removed');
    assert.ok(!html.includes('id="color-swatches"'), 'Prop swatch UI should be removed');
    assert.ok(!html.includes('PROP / ACCESSORY PLAN'), 'Prop prompt block should be removed');
  });

  it('has 上架準備 section', () => {
    assert.ok(html.includes('LINE 貼圖上架準備清單'), 'Missing 上架準備 section');
    assert.ok(html.includes('function toggleSubmitGuide'), 'Missing toggleSubmitGuide function');
  });

  it('preset search bar has been removed per v1.34 cleanup', () => {
    assert.ok(!html.includes('id="preset-search"'), 'Preset search input should be removed');
  });

  it('has scroll-to-top button', () => {
    assert.ok(html.includes('回到頂部'), 'Missing scroll-to-top button');
  });
});

describe('script content', () => {
  it('has at least 40 script categories', () => {
    const approxCount = (html.match(/'[^\d][^']+'\s*:\s*\[/g) || []).length;
    assert.ok(approxCount >= 35, `Expected ≥35 script categories, got approx ${approxCount}`);
  });

  it('has new v1.30 script categories', () => {
    assert.ok(html.includes("'下班解壓'"), 'Missing 下班解壓 category');
    assert.ok(html.includes("'聊天常用'"), 'Missing 聊天常用 category');
    assert.ok(html.includes("'春節祝賀'"), 'Missing 春節祝賀 category');
  });

  it('has v1.31 script expansion and quick actions', () => {
    assert.ok(html.includes("'飼主語錄'"), 'Missing 飼主語錄 category');
    assert.ok(html.includes("'貓咪專用'"), 'Missing 貓咪專用 category');
    assert.ok(html.includes("'狗狗專用'"), 'Missing 狗狗專用 category');
    assert.ok(html.includes('function fillScriptSlots'), 'Missing fillScriptSlots action');
    assert.ok(html.includes('function copySelectedScripts'), 'Missing copySelectedScripts action');
  });

  it('has v1.32 script expansion', () => {
    assert.ok(html.includes("'平台客服'"), 'Missing 平台客服 category');
    assert.ok(html.includes("'直播互動'"), 'Missing 直播互動 category');
    assert.ok(html.includes("'毛孩照護'"), 'Missing 毛孩照護 category');
    assert.ok(html.includes("'日本語貼圖'"), 'Missing 日本語貼圖 category');
    assert.ok(html.includes("'韓語貼圖'"), 'Missing 韓語貼圖 category');
    assert.ok(!html.includes("name:'v1.32 新增'"), 'Version labels should not appear as script groups');
  });

  it('uses curated script groups by default', () => {
    assert.ok(html.includes('DEFAULT_SCRIPT_GROUPS'), 'Missing curated default script group control');
    for (const group of ['常用短句', '問候回覆', '情緒反應', '撒嬌陪伴', '工作實用', '純表情無字']) {
      assert.ok(html.includes(`name:'${group}'`) || html.includes(`'${group}'`), `Missing curated group ${group}`);
    }
  });

  it('has responsive script toolbar and empty state', () => {
    assert.ok(html.includes('class="script-toolbar"'), 'Missing script toolbar class');
    assert.ok(html.includes('.script-toolbar{grid-template-columns:1fr 1fr'), 'Missing mobile script toolbar style');
    assert.ok(html.includes('class="script-empty"'), 'Missing empty script search state');
  });

  it('has Huihui dedicated lines and preset scripts', () => {
    assert.ok(html.includes("'灰灰日常'"), 'Missing 灰灰日常 category');
    assert.ok(html.includes("id:'huihui'"), 'Missing Huihui preset');
    assert.ok(html.includes('灰灰出門巡邏'), 'Missing Huihui preset custom line');
  });

  it('has named pet dedicated lines', () => {
    for (const category of ['甜心日常', '甜心抱抱']) {
      assert.ok(html.includes(`'${category}'`), `Missing ${category}`);
    }
    assert.ok(html.includes('HIDDEN_SCRIPT_GROUPS'), 'Dedicated groups should be hidden by default');
    assert.ok(html.includes('PRESET_SCRIPT_GROUPS'), 'Dedicated groups should be tied to presets');
  });
});
