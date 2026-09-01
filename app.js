const categories = [
  { id: 'business', icon: '⌂', fa: 'کسب‌وکار', en: 'Businesses' },
  { id: 'events', icon: '✦', fa: 'رویدادها', en: 'Events' },
  { id: 'jobs', icon: '◫', fa: 'کار و اسپانسر', en: 'Jobs' },
  { id: 'community', icon: '◎', fa: 'گروه‌ها', en: 'Communities' },
  { id: 'market', icon: '♢', fa: 'دست‌دوم', en: 'Marketplace' },
  { id: 'translator', icon: 'آ', fa: 'مترجم', en: 'Translators' },
  { id: 'guides', icon: '☷', fa: 'راهنماها', en: 'Guides' },
  { id: 'activities', icon: '△', fa: 'تفریح', en: 'Activities' },
];

const listings = [
  { id: 1, type: 'business', logo: 'ن', fa: 'نانوایی تهران', en: 'Tehran Bakery', placeFa: 'ریچموند · نانوایی', placeEn: 'Richmond · Bakery', verified: true },
  { id: 2, type: 'community', logo: 'M', fa: 'گروه دانشجویان ملبورن', en: 'Melbourne Student Circle', placeFa: 'دانشجویی · ۲۴۰ عضو', placeEn: 'Students · 240 members', verified: true },
  { id: 3, type: 'jobs', logo: 'د', fa: 'دستیار فروش دو‌زبانه', en: 'Bilingual Sales Assistant', placeFa: 'ساوت‌بنک · پاره‌وقت', placeEn: 'Southbank · Part time', verified: false },
  { id: 4, type: 'translator', logo: 'س', fa: 'سارا احمدی، مترجم ناتی', en: 'Sara Ahmadi, NAATI translator', placeFa: 'آنلاین و کارلتون', placeEn: 'Online & Carlton', verified: true },
  { id: 5, type: 'events', logo: 'ش', fa: 'شب بازی و آشنایی', en: 'Games & Meetup Night', placeFa: 'پنجشنبه · برانزویک', placeEn: 'Thursday · Brunswick', verified: false },
];

const copy = {
  fa: {
    greeting: 'سلام ملبورن 👋', hero: 'هر چیزی که برای زندگی اینجا نیاز داری', heroSub: 'کسب‌وکار، رویداد، کار و آدم‌های خودت را پیدا کن.', search: 'مثلاً دندانپزشک در ریچموند…', categories: 'دنبال چی می‌گردی؟', all: 'همه', seeAll: 'دیدن همه', featured: 'این هفته در ملبورن', nearby: 'پیشنهادهای نزدیک تو', fresh: 'تازه و منتخب', explore: 'جستجو', exploreSub: 'در میان خدمات، فرصت‌ها و جامعه فارسی‌زبان', saved: 'ذخیره‌ها', savedSub: 'چیزهایی که می‌خواهی دوباره ببینی', noSaved: 'هنوز چیزی ذخیره نکردی', noSavedText: 'قلب کنار هر مورد را بزن تا بعداً راحت پیدایش کنی.', submit: 'چی می‌خواهی اضافه کنی؟', submitSub: 'به کامل‌تر شدن جامعه کمک کن', profile: 'پروفایل من', profileSub: 'تنظیمات، فعالیت‌ها و اعتماد', prototype: 'محتوای این نسخه نمایشی و غیرواقعی است.', unverified: 'تأییدنشده', verified: 'تأییدشده', source: 'منبع عمومی', savedToast: 'به ذخیره‌ها اضافه شد', removedToast: 'از ذخیره‌ها حذف شد'
  },
  en: {
    greeting: 'Hello Melbourne 👋', hero: 'Everything you need for life here', heroSub: 'Find local businesses, events, work and your people.', search: 'Try “dentist in Richmond”…', categories: 'What are you looking for?', all: 'All', seeAll: 'See all', featured: 'This week in Melbourne', nearby: 'Recommended near you', fresh: 'Fresh and hand-picked', explore: 'Explore', exploreSub: 'Search Persian-friendly services, opportunities and communities', saved: 'Saved', savedSub: 'Things you want to find again', noSaved: 'Nothing saved yet', noSavedText: 'Tap the heart beside an item to keep it here.', submit: 'What would you like to add?', submitSub: 'Help make the community more useful', profile: 'My profile', profileSub: 'Settings, activity and trust', prototype: 'All prototype content is fictional.', unverified: 'Unverified', verified: 'Verified', source: 'Public source', savedToast: 'Added to saved', removedToast: 'Removed from saved'
  }
};

const storedSaved = JSON.parse(localStorage.getItem('australia-ye-ma-saved') || localStorage.getItem('melbourne-e-ma-saved') || localStorage.getItem('persian-connect-saved') || '[]');
const state = { route: 'home', previousRoute: 'home', language: 'fa', filter: 'all', query: '', saved: new Set(storedSaved), selectedItem: 1 };
const app = document.querySelector('#app');
const t = key => copy[state.language][key];
const local = item => item[state.language];

function listingCard(item) {
  const place = state.language === 'fa' ? item.placeFa : item.placeEn;
  const saved = state.saved.has(item.id);
  return `<article class="listing-card" data-listing="${item.id}" tabindex="0" role="button" aria-label="${local(item)}">
    <div class="listing-logo">${item.logo}</div>
    <div><h3>${local(item)}</h3><p>${place}</p><div class="meta"><span class="${item.verified ? 'verified' : ''}">${item.verified ? '✓ ' + t('verified') : t('unverified')}</span><span>${t('source')}</span></div></div>
    <button class="save ${saved ? 'saved' : ''}" data-save="${item.id}" aria-label="Save">${saved ? '♥' : '♡'}</button>
  </article>`;
}

function filteredListings() {
  const query = state.query.trim().toLowerCase();
  return listings.filter(item => (state.filter === 'all' || item.type === state.filter) && (!query || item.fa.includes(query) || item.en.toLowerCase().includes(query) || item.placeFa.includes(query) || item.placeEn.toLowerCase().includes(query)));
}

function categoryGrid() {
  return `<div class="category-grid">${categories.map(c => `<button class="category" data-category="${c.id}"><span class="category-icon">${c.icon}</span><small>${local(c)}</small></button>`).join('')}</div>`;
}

function home() {
  return `<section class="hero"><p class="eyebrow">${t('greeting')}</p><h1>${t('hero')}</h1><p>${t('heroSub')}</p><label class="search"><span>⌕</span><input id="homeSearch" type="search" placeholder="${t('search')}" value="${state.query}" aria-label="Search" /></label></section>
  <section class="section"><div class="section-head"><div><h2>${t('categories')}</h2></div><button class="text-button" data-route="explore">${t('seeAll')}</button></div>${categoryGrid()}</section>
  <section class="section"><div class="section-head"><div><h2>${t('featured')}</h2><p>${t('fresh')}</p></div></div><div class="horizontal-list">
    <article class="feature-card" data-art="✦"><span class="pill">رویداد پیشنهادی</span><div><h3>${state.language === 'fa' ? 'جشن مهرگان در فد اسکوئر' : 'Mehregan at Fed Square'}</h3><p>${state.language === 'fa' ? 'شنبه ۲۴ مهر · ساعت ۵ عصر' : 'Saturday · 5 PM'}</p></div></article>
    <article class="feature-card" data-art="☕"><span class="pill">Community pick</span><div><h3>${state.language === 'fa' ? 'کافه‌گردی تازه‌واردها' : 'Newcomers café walk'}</h3><p>${state.language === 'fa' ? 'یکشنبه · کارلتون' : 'Sunday · Carlton'}</p></div></article>
    <article class="feature-card" data-art="◉"><span class="pill">راهنمای تازه</span><div><h3>${state.language === 'fa' ? 'شروع دانشگاه در ملبورن' : 'Starting uni in Melbourne'}</h3><p>${state.language === 'fa' ? 'راهنمای ۶ دقیقه‌ای' : '6 minute guide'}</p></div></article>
  </div></section>
  <section class="section"><div class="section-head"><div><h2>${t('nearby')}</h2><p>Melbourne CBD + 10km</p></div></div><div class="listing-stack">${listings.slice(0,3).map(listingCard).join('')}</div></section><p class="prototype-note">${t('prototype')}</p>`;
}

function explore() {
  const results = filteredListings();
  return `<div class="page-title"><h1>${t('explore')}</h1><p>${t('exploreSub')}</p></div><label class="search"><span>⌕</span><input id="exploreSearch" type="search" placeholder="${t('search')}" value="${state.query}" aria-label="Search" /></label><div class="filter-row"><button class="filter-chip ${state.filter === 'all' ? 'active' : ''}" data-filter="all">${t('all')}</button>${categories.map(c => `<button class="filter-chip ${state.filter === c.id ? 'active' : ''}" data-filter="${c.id}">${local(c)}</button>`).join('')}</div><div class="listing-stack">${results.length ? results.map(listingCard).join('') : `<div class="empty-state"><div class="big-icon">⌕</div><h2>${state.language === 'fa' ? 'نتیجه‌ای پیدا نشد' : 'No results found'}</h2><p>${state.language === 'fa' ? 'عبارت یا دسته‌بندی دیگری را امتحان کن.' : 'Try another search or category.'}</p></div>`}</div>`;
}

function saved() {
  const items = listings.filter(item => state.saved.has(item.id));
  return `<div class="page-title"><h1>${t('saved')}</h1><p>${t('savedSub')}</p></div>${items.length ? `<div class="listing-stack">${items.map(listingCard).join('')}</div>` : `<div class="empty-state"><div class="big-icon">♡</div><h2>${t('noSaved')}</h2><p>${t('noSavedText')}</p><button class="primary-button" data-route="explore">${t('explore')}</button></div>`}`;
}

function detail() {
  const item = listings.find(entry => entry.id === state.selectedItem) || listings[0];
  const place = state.language === 'fa' ? item.placeFa : item.placeEn;
  const isFa = state.language === 'fa';
  const descriptions = {
    business: isFa ? 'یک کسب‌وکار محلی فارسی‌زبان در ملبورن. اطلاعات این صفحه برای نمونه‌سازی تجربه محصول تهیه شده است.' : 'A Persian-friendly local business in Melbourne. This page contains representative prototype information.',
    community: isFa ? 'فضایی برای آشنایی، تبادل تجربه و ارتباط با اعضای جامعه محلی.' : 'A place to meet people, exchange experience and connect with the local community.',
    jobs: isFa ? 'یک فرصت شغلی نمونه. امکان اسپانسرشیپ باید مستقیماً با کارفرما بررسی شود و تضمین‌شده نیست.' : 'A sample opportunity. Sponsorship must be confirmed directly with the employer and is not guaranteed.',
    translator: isFa ? 'خدمات ترجمه فارسی و انگلیسی به‌صورت آنلاین و حضوری.' : 'Persian and English translation services, online and in person.',
    events: isFa ? 'یک دورهمی محلی برای آشنایی و وقت‌گذرانی در محیطی دوستانه.' : 'A local gathering for meeting people in a friendly environment.'
  };
  return `<button class="back-button" data-route="${state.previousRoute}">‹ ${isFa ? 'بازگشت' : 'Back'}</button>
    <section class="detail-hero"><div class="detail-logo">${item.logo}</div><div class="detail-title"><span class="status ${item.verified ? 'verified' : ''}">${item.verified ? '✓ ' + t('verified') : t('unverified')}</span><h1>${local(item)}</h1><p>${place}</p></div><button class="save ${state.saved.has(item.id) ? 'saved' : ''}" data-save="${item.id}" aria-label="Save">${state.saved.has(item.id) ? '♥' : '♡'}</button></section>
    <div class="detail-actions"><button class="primary-button" data-demo>${isFa ? 'تماس یا مشاهده لینک' : 'Contact or open link'}</button><button class="secondary-button" data-save="${item.id}">${state.saved.has(item.id) ? (isFa ? 'ذخیره شد' : 'Saved') : (isFa ? 'ذخیره کن' : 'Save')}</button></div>
    <section class="detail-section"><h2>${isFa ? 'درباره' : 'About'}</h2><p>${descriptions[item.type]}</p></section>
    <section class="trust-card"><div class="trust-icon">${item.verified ? '✓' : 'i'}</div><div><h2>${item.verified ? (isFa ? 'هویت این صفحه بررسی شده' : 'This profile has been checked') : (isFa ? 'این صفحه هنوز تأیید نشده' : 'This profile is not verified yet')}</h2><p>${item.verified ? (isFa ? 'اطلاعات اصلی با صاحب یا برگزارکننده تطبیق داده شده است.' : 'Core information was matched with the owner or organiser.') : (isFa ? 'اطلاعات از یک منبع عمومی آمده و ممکن است تغییر کرده باشد.' : 'Information came from a public source and may have changed.')}</p><small>${isFa ? 'آخرین بررسی: امروز · منبع عمومی نمایشی' : 'Last checked: today · fictional public source'}</small></div></section>
    <section class="detail-section"><h2>${isFa ? 'اطلاعات اشتباه است؟' : 'Is something incorrect?'}</h2><p>${isFa ? 'صاحب این کسب‌وکار یا برگزارکننده هستید؟ صفحه را تأیید کنید؛ یا تغییر و حذف اطلاعات را گزارش دهید.' : 'Are you the owner or organiser? Claim this page, or request a correction or removal.'}</p><div class="inline-actions"><button class="secondary-button" data-demo>${isFa ? 'تأیید مالکیت' : 'Claim listing'}</button><button class="text-danger" data-demo>${isFa ? 'گزارش یا حذف' : 'Report or remove'}</button></div></section>`;
}

function submit() {
  return `<div class="page-title"><h1>${t('submit')}</h1><p>${t('submitSub')}</p></div><div class="form-card"><div class="submission-types">${categories.slice(0,6).map(c => `<button class="submission-type" data-demo><span>${c.icon}</span>${local(c)}</button>`).join('')}</div><div class="notice">${state.language === 'fa' ? 'هر مورد قبل از انتشار بررسی می‌شود. با ثبت اطلاعات تأیید می‌کنی که اجازه اشتراک آن را داری.' : 'Every submission is reviewed before publishing. By submitting, you confirm you have permission to share it.'}</div></div>`;
}

function profile() {
  return `<div class="page-title"><h1>${t('profile')}</h1><p>${t('profileSub')}</p></div><div class="profile-card"><div class="avatar" style="display:grid;place-items:center;margin:auto;width:64px;height:64px;font-size:24px">ک</div><h2>${state.language === 'fa' ? 'کاربر مهمان' : 'Guest user'}</h2><p style="color:var(--muted);font-size:13px">${state.language === 'fa' ? 'برای ذخیره دائمی و ثبت محتوا بعداً وارد شو.' : 'Sign-in will later enable persistent saves and submissions.'}</p><button class="primary-button" data-demo>${state.language === 'fa' ? 'ورود یا ساخت حساب' : 'Sign in or create account'}</button></div><div class="stat-row"><div class="stat"><b>${state.saved.size}</b><small>${t('saved')}</small></div><div class="stat"><b>0</b><small>${state.language === 'fa' ? 'ثبت‌ها' : 'Submissions'}</small></div><div class="stat"><b>Mel</b><small>${state.language === 'fa' ? 'شهر' : 'City'}</small></div></div>`;
}

function render() {
  const views = { home, explore, saved, submit, profile, detail };
  app.innerHTML = (views[state.route] || home)();
  document.querySelectorAll('.nav-item').forEach(button => button.classList.toggle('active', button.dataset.route === state.route));
  document.documentElement.lang = state.language;
  document.documentElement.dir = state.language === 'fa' ? 'rtl' : 'ltr';
  document.querySelector('#languageButton').textContent = state.language === 'fa' ? 'EN' : 'فا';
  document.querySelector('.brand small').textContent = state.language === 'fa' ? 'ملبورنِ ما' : 'Melbourne-e Ma';
  document.querySelectorAll('[data-fa]').forEach(el => el.textContent = el.dataset[state.language]);
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
}

document.addEventListener('click', event => {
  const route = event.target.closest('[data-route]');
  if (route) { if (route.dataset.route !== 'detail') state.previousRoute = route.dataset.route; state.route = route.dataset.route; render(); app.focus(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  const category = event.target.closest('[data-category]');
  if (category) { state.filter = category.dataset.category; state.route = 'explore'; render(); return; }
  const filter = event.target.closest('[data-filter]');
  if (filter) { state.filter = filter.dataset.filter; render(); return; }
  const save = event.target.closest('[data-save]');
  if (save) { const id = Number(save.dataset.save); const adding = !state.saved.has(id); adding ? state.saved.add(id) : state.saved.delete(id); localStorage.setItem('australia-ye-ma-saved', JSON.stringify([...state.saved])); render(); showToast(adding ? t('savedToast') : t('removedToast')); return; }
  const listing = event.target.closest('[data-listing]');
  if (listing) { state.selectedItem = Number(listing.dataset.listing); state.previousRoute = state.route; state.route = 'detail'; render(); app.focus(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  if (event.target.closest('[data-demo]')) showToast(state.language === 'fa' ? 'این بخش در نسخه بعدی فعال می‌شود.' : 'This flow comes in the next prototype.');
});

document.addEventListener('keydown', event => {
  const listing = event.target.closest?.('[data-listing]');
  if (listing && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); listing.click(); }
});

document.querySelector('#languageButton').addEventListener('click', () => { state.language = state.language === 'fa' ? 'en' : 'fa'; render(); });
document.addEventListener('input', event => {
  if (event.target.matches('#homeSearch')) { state.query = event.target.value; if (state.query.length > 1) { state.route = 'explore'; render(); document.querySelector('#exploreSearch')?.focus(); } }
  if (event.target.matches('#exploreSearch')) { state.query = event.target.value; const cursor = event.target.selectionStart; render(); const input = document.querySelector('#exploreSearch'); input.focus(); input.setSelectionRange(cursor, cursor); }
});

render();
