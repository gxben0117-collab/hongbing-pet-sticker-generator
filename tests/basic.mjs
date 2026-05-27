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

  it('has main UI sections (1-9)', () => {
    for (let i = 1; i <= 9; i++) {
      assert.ok(html.includes(`<div class="section-num">${i}</div>`), `Missing section ${i}`);
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

  it('has 上架準備 section', () => {
    assert.ok(html.includes('LINE 貼圖上架準備清單'), 'Missing 上架準備 section');
    assert.ok(html.includes('function toggleSubmitGuide'), 'Missing toggleSubmitGuide function');
  });

  it('has preset search', () => {
    assert.ok(html.includes('id="preset-search"'), 'Missing preset search input');
    assert.ok(html.includes('function onPresetSearch'), 'Missing onPresetSearch function');
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
    assert.ok(html.includes("name:'v1.32 新增'"), 'Missing v1.32 group');
  });

  it('has responsive script toolbar and empty state', () => {
    assert.ok(html.includes('class="script-toolbar"'), 'Missing script toolbar class');
    assert.ok(html.includes('.script-toolbar{grid-template-columns:1fr 1fr'), 'Missing mobile script toolbar style');
    assert.ok(html.includes('class="script-empty"'), 'Missing empty script search state');
  });

  it('has Huihui dedicated lines and preset scripts', () => {
    assert.ok(html.includes("'灰灰日常'"), 'Missing 灰灰日常 category');
    assert.ok(html.includes("'灰灰出門'"), 'Missing 灰灰出門 category');
    assert.ok(html.includes("'灰灰吃飯'"), 'Missing 灰灰吃飯 category');
    assert.ok(html.includes("'灰灰撒嬌'"), 'Missing 灰灰撒嬌 category');
    assert.ok(html.includes("'灰灰吐槽'"), 'Missing 灰灰吐槽 category');
    assert.ok(html.includes("name:'灰灰專屬'"), 'Missing 灰灰專屬 group');
    assert.ok(html.includes("id:'huihui'"), 'Missing Huihui preset');
    assert.ok(html.includes('灰灰出門巡邏'), 'Missing Huihui preset custom line');
  });

  it('has named pet dedicated lines', () => {
    for (const category of ['甜心日常', '可樂日常', 'QQ日常', '糖糖日常', '湯圓日常', '卡哇日常']) {
      assert.ok(html.includes(`'${category}'`), `Missing ${category} category`);
    }
    for (const group of ['甜心專屬', '可樂專屬', 'QQ專屬', '糖糖專屬', '湯圓專屬', '卡哇專屬', '指定寵物專屬']) {
      assert.ok(html.includes(`name:'${group}'`), `Missing ${group} group`);
    }
    for (const line of ['甜心抱抱', 'QQ慢慢來', '糖糖起床啦', '湯圓大小姐到', '卡哇探頭']) {
      assert.ok(html.includes(line), `Missing preset line ${line}`);
    }
  });
});
