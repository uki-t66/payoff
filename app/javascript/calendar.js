// app/javascript/calendar.js

// ── ポップアップ ──────────────────────────────────────────

function openCalendarPopup(day, dateStr, weekday) {
  const script = document.getElementById('calendar-events-data');
  if (!script) return;

  let calendarEvents;
  try {
    calendarEvents = JSON.parse(script.textContent);
  } catch (e) {
    return;
  }

  const events = calendarEvents[String(day)] || [];
  if (events.length === 0) return;

  document.getElementById('popup-date').textContent = dateStr;
  document.getElementById('popup-weekday').textContent = weekday;

  const sum = events.reduce((a, e) => a + e.amount, 0);
  document.getElementById('popup-total').textContent = '¥' + sum.toLocaleString('ja-JP');

  const list = document.getElementById('popup-list');
  list.innerHTML = '';
  events.forEach(fe => {
    list.insertAdjacentHTML('beforeend', `
      <div class="flex items-center justify-between gap-3 bg-gray-50 dark:bg-[#161b22] rounded-xl px-4 py-3">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
               style="background-color: ${fe.category_color}20;">
            <div class="w-2.5 h-2.5 rounded-full" style="background-color: ${fe.category_color};"></div>
          </div>
          <div class="min-w-0">
            <p class="text-sm font-bold text-[#111718] dark:text-[#e6edf3] truncate">${fe.name}</p>
            <p class="text-xs text-[#618689] dark:text-[#7d8590]">${fe.category_name}</p>
          </div>
        </div>
        <p class="text-sm font-black text-[#111718] dark:text-[#e6edf3] shrink-0">¥${fe.amount_formatted}</p>
      </div>
    `);
  });

  const popup = document.getElementById('calendar-popup');
  popup.style.display = 'flex';
}

function closeCalendarPopup() {
  const popup = document.getElementById('calendar-popup');
  if (popup) popup.style.display = 'none';
}

// ── 月ナビ ────────────────────────────────────────────────

function navigateCalendar(url) {
  fetch(url)
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const incoming = doc.getElementById('calendar-page');
      const current  = document.getElementById('calendar-page');
      if (incoming && current) {
        current.innerHTML = incoming.innerHTML;
        history.pushState({}, '', url);
      } else {
        window.location.href = url;
      }
    })
    .catch(() => { window.location.href = url; });
}

// ── クリックイベント（一元管理） ──────────────────────────

document.addEventListener('click', e => {
  // ① 日付セルのクリック → ポップアップを開く
  const cell = e.target.closest('[data-calendar-day]');
  if (cell) {
    openCalendarPopup(
      cell.dataset.calendarDay,
      cell.dataset.calendarDate,
      cell.dataset.calendarWeekday
    );
    return;
  }

  // ② 閉じるボタン
  if (e.target.closest('[data-action="calendar-popup#close"]')) {
    closeCalendarPopup();
    return;
  }

  // ③ モーダル外部クリックで閉じる
  const popup = document.getElementById('calendar-popup');
  if (popup && popup.style.display === 'flex') {
    const modal = popup.querySelector('.relative');
    if (modal && !modal.contains(e.target)) {
      closeCalendarPopup();
      return;
    }
  }

  // ④ 月ナビボタン
  const navBtn = e.target.closest('[data-action^="calendar-nav"]');
  if (navBtn) {
    const navData = document.getElementById('calendar-nav-data');
    if (navData) {
      const actionMap = {
        'calendar-nav#prev':  navData.dataset.prevUrl,
        'calendar-nav#next':  navData.dataset.nextUrl,
        'calendar-nav#today': navData.dataset.todayUrl,
      };
      const url = actionMap[navBtn.dataset.action];
      if (url) {
        e.preventDefault();
        navigateCalendar(url);
      }
    }
  }
});

// ブラウザの戻る/進むに対応
window.addEventListener('popstate', () => {
  navigateCalendar(location.href);
});