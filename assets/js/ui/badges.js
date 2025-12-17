/**
 * Render social / skill badges
 * Uses shields.io (image-based, safe)
 */
export function renderBadges(container) {
  if (!container) return;

  container.innerHTML = `
    <div class="badges-grid">
      ${badge("GitHub", "alsopranab", "black", "github", "https://github.com/alsopranab")}
      ${badge("LeetCode", "alsopranab", "black", "leetcode", "https://leetcode.com/alsopranab")}
      ${badge("HackerRank", "alsopranab", "black", "hackerrank", "https://www.hackerrank.com/alsopranab")}
      ${badge("Kaggle", "pranabdn", "black", "kaggle", "https://kaggle.com/pranabdn")}
      ${badge("Instagram", "the.queryguy", "black", "instagram", "https://instagram.com/the.queryguy")}
    </div>
  `;
}

function badge(label, value, color, logo, link) {
  const src = `https://img.shields.io/badge/${label}-${value}-${color}?logo=${logo}&logoColor=white`;
  return `
    <a href="${link}" target="_blank" rel="noopener">
      <img src="${src}" alt="${label} badge" loading="lazy" />
    </a>
  `;
}
