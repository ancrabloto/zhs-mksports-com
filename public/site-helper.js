// site-helper.js — 页面提示卡片、关键词徽章与访问说明
(function() {
  'use strict';

  // 配置数据（可替换，仅用于示例展示）
  const SITE_CONFIG = {
    siteUrl: 'https://zhs-mksports.com',
    keywords: ['mk体育', '体育赛事', '运动平台'],
    badgeColors: ['#2c3e50', '#e74c3c', '#27ae60', '#8e44ad', '#f39c12']
  };

  // 工具函数：生成一个唯一的 DOM id（基于时间戳+随机数）
  function generateId(prefix) {
    return prefix + '-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
  }

  // 创建样式（只注入一次）
  function injectStyles() {
    if (document.getElementById('site-helper-styles')) return;
    var style = document.createElement('style');
    style.id = 'site-helper-styles';
    style.textContent = `
      .site-helper-card {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 320px;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        padding: 16px 20px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #333;
        line-height: 1.5;
        transition: opacity 0.3s ease, transform 0.3s ease;
        opacity: 0;
        transform: translateY(20px);
      }
      .site-helper-card.show {
        opacity: 1;
        transform: translateY(0);
      }
      .site-helper-badge {
        display: inline-block;
        margin: 4px 6px 4px 0;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
        color: #fff;
        background: #3498db;
      }
      .site-helper-close {
        float: right;
        background: transparent;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: #aaa;
        padding: 0 4px;
        line-height: 1;
      }
      .site-helper-close:hover {
        color: #555;
      }
      .site-helper-link {
        color: #3498db;
        text-decoration: none;
        border-bottom: 1px dashed #3498db;
      }
      .site-helper-link:hover {
        color: #1a6fa0;
      }
    `;
    document.head.appendChild(style);
  }

  // 创建提示卡片 DOM
  function createTipCard(config) {
    var card = document.createElement('div');
    card.className = 'site-helper-card';
    card.id = generateId('helperCard');

    // 关闭按钮
    var closeBtn = document.createElement('button');
    closeBtn.className = 'site-helper-close';
    closeBtn.setAttribute('aria-label', '关闭提示');
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', function() {
      card.classList.remove('show');
      setTimeout(function() { card.remove(); }, 400);
    });
    card.appendChild(closeBtn);

    // 标题
    var title = document.createElement('div');
    title.style.fontWeight = '700';
    title.style.marginBottom = '8px';
    title.style.fontSize = '1rem';
    title.textContent = '💡 访问提示';
    card.appendChild(title);

    // 说明文本
    var desc = document.createElement('div');
    desc.style.marginBottom = '10px';
    desc.style.fontSize = '0.9rem';
    desc.innerHTML = '欢迎访问 <a class="site-helper-link" href="' + escapeHtml(config.siteUrl) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(config.siteUrl) + '</a>，探索 ' + escapeHtml(config.keywords[0]) + ' 相关内容。';
    card.appendChild(desc);

    // 关键词徽章容器
    var badgeContainer = document.createElement('div');
    badgeContainer.style.marginTop = '8px';
    config.keywords.forEach(function(kw, index) {
      var badge = document.createElement('span');
      badge.className = 'site-helper-badge';
      var colorIdx = index % config.badgeColors.length;
      badge.style.backgroundColor = config.badgeColors[colorIdx];
      badge.textContent = kw;
      badgeContainer.appendChild(badge);
    });
    card.appendChild(badgeContainer);

    return card;
  }

  // 简单的 HTML 转义
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // 显示卡片（延迟出现，增加自然感）
  function showCard(card) {
    document.body.appendChild(card);
    // 强制回流后显示
    requestAnimationFrame(function() {
      card.classList.add('show');
    });
  }

  // 初始化入口
  function init() {
    // 避免重复执行
    if (window.__siteHelperInited) return;
    window.__siteHelperInited = true;

    injectStyles();
    var card = createTipCard(SITE_CONFIG);
    // 延迟 1.5 秒后显示卡片
    setTimeout(function() {
      showCard(card);
    }, 1500);
  }

  // 在 DOM 加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();