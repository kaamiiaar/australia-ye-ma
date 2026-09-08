const copy = {
  fa: {
    greeting: 'سلام ملبورن 👋', hero: 'هر چیزی که برای زندگی اینجا نیاز داری', heroSub: 'کسب‌وکار، رویداد، کار و آدم‌های خودت را پیدا کن.', search: 'مثلاً دندانپزشک در ریچموند…', categories: 'دنبال چی می‌گردی؟', all: 'همه', seeAll: 'دیدن همه', featured: 'این هفته در ملبورن', nearby: 'پیشنهادهای نزدیک تو', fresh: 'تازه و منتخب', explore: 'جستجو', exploreSub: 'در میان خدمات، فرصت‌ها و جامعه فارسی‌زبان', saved: 'ذخیره‌ها', savedSub: 'چیزهایی که می‌خواهی دوباره ببینی', noSaved: 'هنوز چیزی ذخیره نکردی', noSavedText: 'قلب کنار هر مورد را بزن تا بعداً راحت پیدایش کنی.', submit: 'چی می‌خواهی اضافه کنی؟', submitSub: 'به کامل‌تر شدن جامعه کمک کن', profile: 'پروفایل من', profileSub: 'تنظیمات، فعالیت‌ها و اعتماد', prototype: 'محتوای محصول نمایشی است؛ لینک‌های کامیونیتی از صفحات عمومی آمده‌اند.', unverified: 'تأییدنشده', verified: 'تأییدشده', source: 'منبع عمومی', savedToast: 'به ذخیره‌ها اضافه شد', removedToast: 'از ذخیره‌ها حذف شد'
  },
  en: {
    greeting: 'Hello Melbourne 👋', hero: 'Everything you need for life here', heroSub: 'Find local businesses, events, work and your people.', search: 'Try “dentist in Richmond”…', categories: 'What are you looking for?', all: 'All', seeAll: 'See all', featured: 'This week in Melbourne', nearby: 'Recommended near you', fresh: 'Fresh and hand-picked', explore: 'Explore', exploreSub: 'Search Persian-friendly services, opportunities and communities', saved: 'Saved', savedSub: 'Things you want to find again', noSaved: 'Nothing saved yet', noSavedText: 'Tap the heart beside an item to keep it here.', submit: 'What would you like to add?', submitSub: 'Help make the community more useful', profile: 'My profile', profileSub: 'Settings, activity and trust', prototype: 'Product content is fictional; community links come from public pages.', unverified: 'Unverified', verified: 'Verified', source: 'Public source', savedToast: 'Added to saved', removedToast: 'Removed from saved'
  }
};

function readStorage(storage,key,fallback) { try { return window[storage].getItem(key)??fallback; } catch { return fallback; } }
function writeStorage(storage,key,value) { try { window[storage].setItem(key,value); } catch { /* In-memory state remains usable. */ } }
let storedSaved=[]; try { const value=JSON.parse(readStorage('localStorage','australia-ye-ma-saved','[]')); if(Array.isArray(value)) storedSaved=value.filter(Number.isFinite); } catch {}
const routeNames=['welcome','home','explore','communities','saved','submit','profile','detail','visas','visa-category','visa-assistant','visa-results','exchange','converter','remittance','exchange-sources','news','story','news-feed','news-sources'];
const routeHash=location.hash.slice(1).split('/');
const initialRoute=new URLSearchParams(location.search).has('welcome')?'welcome':new URLSearchParams(location.search).has('visa')?'visas':routeNames.includes(routeHash[0])?routeHash[0]:readStorage('sessionStorage','australia-ye-ma-entered','false')==='true'?'home':'welcome';
const state={route:initialRoute,previousRoute:'home',language:'fa',filter:'all',communityFilter:'all',query:'',saved:new Set(storedSaved),selectedItem:initialRoute==='detail'?(Number(routeHash[1])||1):1,visaStep:1,visaAnswers:[],selectedVisaCategory:'all',currencyFrom:'AUD',currencyTo:'USD',currencyAmount:'1',currencyQuery:'',remitAmount:'5000',remitDirection:'out',remitUnit:'toman',trend:'7D',newsQuery:'',newsFilter:'all',storyId:Number(routeHash[1])||101,cityPickerOpen:false};
const app = document.querySelector('#app');
const t = key => copy[state.language][key];
const local = item => item[state.language] || item.fa || item.en;

function brandLogo(className='brand-mark') {
  return `<span class="${className}" aria-hidden="true"><svg viewBox="0 0 64 64"><path class="opera-line" d="M8 41c6-14 13-20 21-22-2 8-1 15 3 22M31 41c4-11 10-16 18-18-1 7 1 13 7 18M8 42h48"/><text x="32" y="55">ما</text></svg><span class="australia-flag">🇦🇺</span></span>`;
}

function listingCard(item) {
  if(editorial.some(n=>n.id===item.id)) return newsCard(editorial.find(n=>n.id===item.id));
  const place = state.language === 'fa' ? item.placeFa : item.placeEn;
  const saved = state.saved.has(item.id);
  return `<article class="listing-card ${item.image ? 'with-photo' : ''}" aria-label="${escapeHTML(local(item))}">
    ${item.image ? `<img class="listing-photo" src="${item.image}" alt="${item.imageAlt || ''}" loading="lazy" />` : `<div class="listing-logo">${item.logo}</div>`}
    <div class="listing-copy"><h3><button class="listing-title-button" data-listing="${item.id}">${local(item)}</button></h3><p>${place}</p><div class="meta"><span class="${item.prototype ? 'prototype-label' : item.verified ? 'verified' : ''}">${item.prototype ? words('نمونه نمایشی','Prototype example') : item.verified ? '✓ ' + t('verified') : t('unverified')}</span><span>${item.sourceName || t('source')}</span></div></div>
    <button class="save ${saved ? 'saved' : ''}" data-save="${item.id}" aria-label="ذخیره">${saved ? '♥' : '♡'}</button>
  </article>`;
}

function filteredListings() {
  const query = state.query.trim().toLowerCase();
  const candidates=[...listings.filter(item=>item.type!=='news'),...editorial.map(n=>({...n,type:'news',placeFa:n.summaryFa,placeEn:n.summaryEn}))];
  return candidates.filter(item => (state.filter === 'all' || item.type === state.filter) && (!query || [item.fa,item.en,item.placeFa,item.placeEn].join(' ').toLowerCase().includes(query)));
}

function categoryGrid() {
  return `<div class="category-grid">${categories.map(c => `<button class="category" data-category="${c.id}"><img class="category-icon" src="${c.icon}" alt="" /><small>${local(c)}</small></button>`).join('')}</div>`;
}

function communityCard(item) {
  const isFa = state.language === 'fa';
  return `<article class="community-card">
    <div class="community-top"><div class="community-logo">${item.icon}</div><div><span class="status">${isFa ? 'فقط پیوند عمومی' : 'Public link only'}</span><h2>${local(item)}</h2><p>${isFa ? item.descriptionFa : item.descriptionEn}</p></div></div>
    <div class="community-facts"><span>${item.members} ${isFa ? 'عضو تقریبی' : 'approx. members'}</span><span>${item.scope === 'melbourne' ? (isFa ? 'ملبورن · ویکتوریا' : 'Melbourne · Victoria') : (isFa ? 'سراسر استرالیا' : 'Australia-wide')}</span><span>${isFa ? 'بررسی: ۱۱ شهریور ۱۴۰۵' : 'Checked: 2 Sep 2026'}</span></div>
    <div class="community-footer"><small>${isFa ? 'تأییدنشده · بدون همکاری رسمی' : 'Unverified · no official partnership'}</small><a class="telegram-button" href="${item.url}" target="_blank" rel="noopener noreferrer">${isFa ? 'باز کردن در تلگرام' : 'Open in Telegram'} ↗</a></div>
  </article>`;
}

function communities() {
  const isFa = state.language === 'fa';
  const filters = [
    { id: 'all', fa: 'همه', en: 'All' }, { id: 'city', fa: 'ملبورن', en: 'Melbourne' },
    { id: 'jobs', fa: 'کار', en: 'Jobs' }, { id: 'housing', fa: 'خانه', en: 'Housing' },
    { id: 'students', fa: 'دانشجو', en: 'Students' }, { id: 'activities', fa: 'تفریح', en: 'Activities' }
  ];
  const results = communitySources.filter(item => state.communityFilter === 'all' || item.topic === state.communityFilter);
  return `<div class="page-title"><h1>${isFa ? 'کامیونیتی‌ها' : 'Communities'}</h1><p>${isFa ? 'گروه مناسب را پیدا کن؛ گفت‌وگو همچنان در تلگرام ادامه دارد.' : 'Find the right group; conversation continues in Telegram.'}</p></div>
    <div class="community-notice"><b>${isFa ? 'لینک، نه تأیید' : 'Linked, not endorsed'}</b><span>${isFa ? 'این گروه‌ها از صفحات عمومی پیدا شده‌اند و هنوز با استرالیای ما همکاری رسمی ندارند.' : 'These groups were found through public pages and are not yet official Australia-ye Ma partners.'}</span></div>
    <div class="filter-row">${filters.map(filter => `<button class="filter-chip ${state.communityFilter === filter.id ? 'active' : ''}" data-community-filter="${filter.id}">${local(filter)}</button>`).join('')}</div>
    <div class="community-stack">${results.map(communityCard).join('')}</div>
    <button class="suggest-community" data-route="submit">＋ ${isFa ? 'معرفی یا مدیریت یک گروه' : 'Suggest or manage a community'}</button>`;
}

function home() {
  return `<section class="hero">
    <div class="hero-shade"></div>
    <header class="hero-header">
      <button class="brand" data-route="home" aria-label="خانه">${brandLogo()}<span><b>استرالیای ما</b><small>ملبورنِ ما</small></span></button>
      <button class="location-chip" data-city-picker aria-haspopup="dialog" aria-expanded="${state.cityPickerOpen}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z"/><circle cx="12" cy="10" r="2"/></svg><b>ملبورن</b><span>⌄</span></button>
    </header>
    <div class="hero-copy"><h1>${t('hero')}</h1><p>${t('heroSub')}</p>
      <label class="search"><span>⌕</span><input id="homeSearch" type="search" placeholder="${t('search')}" value="${escapeHTML(state.query)}" aria-label="${t('explore')}" /></label>
    </div>
  </section>
  <div class="home-sheet">
    <section class="section categories-section"><div class="section-head"><div><h2>${t('categories')}</h2></div><button class="text-button" data-route="explore">همه دسته‌بندی‌ها ‹</button></div>${categoryGrid()}</section>
    ${homeNews()}
    <section class="section"><div class="section-head"><div><h2><span class="heading-icon">★</span>${t('featured')}</h2></div><button class="text-button" data-category="events">${words('مشاهده همه ‹','See all ›')}</button></div><div class="horizontal-list">
      ${[20,21,23].map(id=>{const n=listings.find(n=>n.id===id);return `<article class="feature-card" data-listing="${id}" tabindex="0" role="button"><img class="feature-photo" src="${n.image}" alt=""/><span class="pill">${words('رویداد','Event')}</span><div><h3>${local(n)}</h3><p>${words(n.placeFa,n.placeEn)}</p></div></article>`;}).join('')}
    </div></section>
    ${homeExchange()}
    <section class="section nearby-section"><div class="section-head"><div><h2>کسب‌وکارهای ایرانی نزدیک تو</h2><p>ملبورن و اطراف</p></div></div><p class="business-priority">کسب‌وکارهای ایرانی و فارسی‌زبان اولویت دارند؛ گزینه‌های مرتبط دیگر هم با منبع روشن نمایش داده می‌شوند.</p><div class="listing-stack">${[1,2,3].map(id => listings.find(item => item.id === id)).map(listingCard).join('')}</div></section><p class="prototype-note">رویدادها و کسب‌وکارها از منابع رسمی یا وب‌سایت خود مجموعه گردآوری شده‌اند و هنوز تأیید همکاری نشده‌اند. موارد دارای برچسب «نمونه نمایشی» واقعی نیستند.</p>
  </div>${cityPicker()}`;
}

function cityPicker() {
  if (!state.cityPickerOpen) return '';
  return `<div class="city-backdrop" data-city-close><section class="city-sheet" role="dialog" aria-modal="true" aria-labelledby="cityTitle"><span class="sheet-handle" aria-hidden="true"></span><div class="city-sheet-head"><div><h2 id="cityTitle">انتخاب شهر</h2><p>فعلاً ملبورن فعال است</p></div><button data-city-close aria-label="بستن">×</button></div><button class="city-option active" data-city-close><span><b>ملبورن</b><small>شهر فعال</small></span><strong>✓</strong></button><button class="city-option" disabled><span><b>سیدنی</b><small>به‌زودی</small></span><em>به‌زودی</em></button><button class="city-option" disabled><span><b>بریزبن</b><small>به‌زودی</small></span><em>به‌زودی</em></button></section></div>`;
}

function welcome() {
  return `<section class="welcome-screen">
    <div class="welcome-shade"></div>
    <div class="welcome-brand" aria-label="استرالیای ما">
      ${brandLogo('welcome-mark')}
      <h1>استرالیای ما</h1>
      <p>${words('استرالیای ما، خانه‌ی فارسی‌زبان‌های ملبورن','A local home for Persian speakers in Melbourne')}</p>
    </div>
    <div class="welcome-sheet">
      <span class="sheet-handle" aria-hidden="true"></span>
      <h2>${words('برای ادامه، یکی را انتخاب کنید','Choose how to continue')}</h2>
      <div class="entry-options">
        <button class="entry-card" data-sign-in>
          <span class="entry-icon user-entry-icon" aria-hidden="true"><i></i></span>
          <b>${words('ورود / ثبت‌نام','Sign in / register')}</b>
          <small>${words('حساب کاربری داشته باشید','Account access')}</small>
          <strong aria-hidden="true">←</strong>
        </button>
        <button class="entry-card" data-enter-app>
          <span class="entry-icon guest-entry-icon" aria-hidden="true">ما</span>
          <b>${words('ادامه به عنوان مهمان','Continue as guest')}</b>
          <small>${words('بدون ثبت‌نام وارد شوید','Browse without an account')}</small>
          <strong aria-hidden="true">←</strong>
        </button>
      </div>
      <p class="welcome-legal">${words('پیش‌نمایش محصول؛ مرور بدون حساب کاربری آزاد است.','Product preview. Browsing is available without an account.')}</p>
      <span class="home-indicator" aria-hidden="true"></span>
    </div>
  </section>`;
}

function visaHeader(title, subtitle = '') {
  const backAction = state.route === 'visas' ? 'data-route="home"' : 'data-history-back';
  return `<header class="visa-page-header"><button class="visa-back" ${backAction} aria-label="بازگشت">‹</button><div><h1>${title}</h1>${subtitle ? `<p>${subtitle}</p>` : ''}</div><button class="visa-bookmark" data-demo aria-label="ذخیره">♡</button></header>`;
}

function visas() {
  return `<div class="visa-landing">
    <section class="visa-hero"><div class="visa-hero-shade"></div>${visaHeader('انواع ویزای استرالیا', 'ویزایی که متناسب با شرایطت است را پیدا کن')}<img src="./assets/icons/visas.png" alt="" /></section>
    <div class="visa-body">
      <section class="visa-guide-card"><div class="guide-bot" aria-hidden="true">●ᴗ●</div><div><h2>بررسی شرایط من با راهنمای هوشمند</h2><p>شرایط کلی‌ات را مرحله‌به‌مرحله بگو تا در پایان گزینه‌های مرتبط را ببینی.</p></div><button class="visa-guide-button" data-start-visa-guide>شروع بررسی شرایط من <span>✦</span></button></section>
      <section class="visa-section"><h2>دسته‌بندی انواع ویزاها</h2><div class="visa-category-grid">${visaCategories.map(item => `<button class="visa-category-card" data-visa-category="${item.id}"><img src="${item.icon}" alt="" /><b>${item.title}</b><small>${item.description}</small></button>`).join('')}</div></section>
      <aside class="visa-disclaimer"><span>♢</span><p>این اطلاعات عمومی است و جایگزین مشاوره رسمی مهاجرتی نیست. قوانین و شرایط ممکن است تغییر کنند؛ همیشه منبع رسمی را بررسی کنید.</p></aside>
      <section class="visa-resources"><h2>منابع رسمی</h2><a href="https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-finder" target="_blank" rel="noopener noreferrer"><span>↗</span><b>راهنمای انتخاب ویزای وزارت کشور استرالیا</b><small>immi.homeaffairs.gov.au</small></a><a href="https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing" target="_blank" rel="noopener noreferrer"><span>↗</span><b>فهرست رسمی ویزاهای استرالیا</b><small>آخرین بررسی ما: ۳ سپتامبر ۲۰۲۶</small></a></section>
    </div>
  </div>`;
}

function visaAssistant() {
  const steps = [
    { question: 'هدف اصلی تو از بررسی ویزا چیه؟', options: ['کار و مهارت', 'تحصیل', 'دیدار و سفر', 'پیوستن به خانواده'] },
    { question: 'در حال حاضر کجا زندگی می‌کنی؟', options: ['داخل استرالیا', 'خارج از استرالیا'] },
    { question: 'برای مسیر کاری، حمایت کارفرما داری؟', options: ['بله، کارفرما دارم', 'هنوز ندارم', 'مسیر کاری مدنظرم نیست'] },
  ];
  const step = steps[state.visaStep - 1];
  return `<div class="visa-flow">${visaHeader('ویزای مناسب من', 'راهنمای عمومی و غیرشخصی')}
    <div class="visa-progress" aria-label="مرحله ${state.visaStep} از ۳">${[1,2,3].map(number => `<span class="${number <= state.visaStep ? 'active' : ''}"><b>${number}</b><small>${number === 1 ? 'اطلاعات شما' : number === 2 ? 'شرایط' : 'نتیجه'}</small></span>`).join('')}</div>
    <section class="assistant-card"><div class="guide-bot" aria-hidden="true">●ᴗ●</div><div><small>راهنمای ویزا</small><h2>${step.question}</h2><p>پاسخی را انتخاب کن که به شرایط کلی تو نزدیک‌تر است.</p></div></section>
    ${state.visaAnswers.length ? `<div class="answer-history">${state.visaAnswers.map(answer => `<span>${answer}</span>`).join('')}</div>` : ''}
    <div class="visa-answer-list">${step.options.map(option => `<button data-visa-answer="${option}">${option}<span>‹</span></button>`).join('')}</div>
    <aside class="visa-disclaimer compact"><span>♢</span><p>این ابزار صلاحیت مهاجرتی را تعیین نمی‌کند و فقط برای آشنایی اولیه با گزینه‌های رسمی است.</p></aside>
  </div>`;
}

function visaResultCard(item) {
  return `<article class="visa-result-card"><div class="relevance-ring ${item.tone}"><b>${item.relevance}</b><small>ارتباط اولیه</small></div><button class="result-save" data-demo aria-label="ذخیره">♡</button><div class="result-title"><h2>${item.title} — ${item.subclass}</h2><b>(${item.english})</b></div><span class="prototype-badge">نمونه‌ی اطلاعاتی</span><p>${item.summary}</p><div class="visa-facts"><span><small>مدت اقامت</small><b>${item.stay}</b></span><span><small>حمایت یا نامزدی</small><b>${item.sponsor}</b></span><span><small>وضعیت اقامت</small><b>${item.permanent}</b></span></div><a href="${item.url}" target="_blank" rel="noopener noreferrer">جزئیات در منبع رسمی ↗</a></article>`;
}

function basicVisaOptionCard(item) {
  return `<article class="basic-visa-card"><div><span>ساب‌کلاس ${item.subclass}</span><h2>${item.title}</h2><b>(${item.english})</b></div><p>${item.summary}</p><div class="basic-visa-facts"><span><small>مدت کلی</small><b>${item.stay}</b></span><span><small>نیاز اصلی</small><b>${item.sponsor}</b></span><span><small>نوع اقامت</small><b>${item.permanent}</b></span></div><a href="${item.url}" target="_blank" rel="noopener noreferrer">مطالعه اطلاعات رسمی ↗</a></article>`;
}

function visaCategoryPage() {
  const category = visaCategories.find(item => item.id === state.selectedVisaCategory) || visaCategories[0];
  const options = visaExamples.filter(item => item.groups.includes(category.id));
  return `<div class="visa-category-page">${visaHeader(category.title, category.description)}<div class="category-page-intro"><img src="${category.icon}" alt="" /><div><h2>گزینه‌های این دسته</h2><p>اطلاعات پایه برای آشنایی اولیه؛ این صفحه وضعیت شخصی تو را بررسی نمی‌کند.</p></div></div>${options.length ? `<div class="basic-visa-list">${options.map(basicVisaOptionCard).join('')}</div>` : `<div class="visa-empty"><img src="${category.icon}" alt="" /><h2>${category.title}</h2><p>گزینه مناسب در این دسته به نوع ویزای فعلی، محل درخواست و شرایط فردی بستگی دارد. برای دیدن فهرست جاری از Visa Finder رسمی استفاده کن.</p><a href="https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-finder" target="_blank" rel="noopener noreferrer">باز کردن Visa Finder رسمی ↗</a></div>`}<aside class="visa-disclaimer"><span>♢</span><p>برای بررسی شرایط خودت، به صفحه انواع ویزاها برگرد و workflow جداگانه «بررسی شرایط من» را شروع کن.</p></aside></div>`;
}

function visaResults() {
  const category = visaCategories.find(item => item.id === state.selectedVisaCategory);
  const results = state.selectedVisaCategory === 'all' ? visaExamples : visaExamples.filter(item => item.groups.includes(state.selectedVisaCategory));
  return `<div class="visa-results">${visaHeader('نتیجه بررسی', category ? category.title : 'بر اساس پاسخ‌های عمومی شما')}<div class="results-intro"><b>${results.length ? `${results.length} گزینه برای بررسی بیشتر` : 'ادامه بررسی در منبع رسمی'}</b><p>این موارد نتیجه حقوقی یا تضمین واجد شرایط بودن نیستند.</p></div>${results.length ? `<div class="visa-result-list">${results.map(visaResultCard).join('')}</div>` : `<div class="visa-empty"><img src="${category?.icon || './assets/visa-icons/other.png'}" alt="" /><h2>${category?.title || 'سایر ویزاها'}</h2><p>برای این دسته، شرایط فردی اهمیت زیادی دارد. گزینه‌های جاری را مستقیماً در راهنمای رسمی بررسی کنید.</p><a href="https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-finder" target="_blank" rel="noopener noreferrer">باز کردن Visa Finder رسمی ↗</a></div>`}<aside class="visa-disclaimer"><span>♢</span><p>اطلاعات از منابع رسمی وزارت کشور استرالیا خلاصه شده و در ۳ سپتامبر ۲۰۲۶ بررسی شده است. پیش از تصمیم‌گیری، صفحه رسمی هر ویزا را بخوانید.</p></aside></div>`;
}

function explore() {
  const results = filteredListings();
  const activeCategory = categories.find(category => category.id === state.filter);
  return `<section class="explore-hero"><span class="explore-symbol" aria-hidden="true">⌕</span><div class="page-title"><h1>${t('explore')}</h1><p>${t('exploreSub')}</p></div><label class="search"><span>⌕</span><input id="exploreSearch" type="search" placeholder="${t('search')}" value="${escapeHTML(state.query)}" aria-label="${t('explore')}" /></label></section><div class="filter-row"><button class="filter-chip ${state.filter === 'all' ? 'active' : ''}" data-filter="all">${t('all')}</button>${categories.map(c => `<button class="filter-chip ${state.filter === c.id ? 'active' : ''}" data-filter="${c.id}">${local(c)}</button>`).join('')}</div><div class="results-summary"><b>${activeCategory ? local(activeCategory) : words('همه پیشنهادها','All suggestions')}</b><span>${number(results.length,0)} ${words('نتیجه','results')}</span></div><div class="listing-stack">${results.length ? results.map(listingCard).join('') : `<div class="empty-state"><div class="big-icon">⌕</div><h2>${state.language === 'fa' ? 'نتیجه‌ای پیدا نشد' : 'No results found'}</h2><p>${state.language === 'fa' ? 'عبارت یا دسته‌بندی دیگری را امتحان کن.' : 'Try another search or category.'}</p></div>`}</div>`;
}

function saved() {
  const items = listings.filter(item => state.saved.has(item.id)); const stories=editorial.filter(item=>state.saved.has(item.id));
  return `<div class="page-title"><h1>${t('saved')}</h1><p>${t('savedSub')}</p></div>${items.length || stories.length ? `<div class="listing-stack">${items.map(listingCard).join('')}${stories.map(newsCard).join('')}</div>` : `<div class="empty-state"><div class="big-icon">♡</div><h2>${t('noSaved')}</h2><p>${t('noSavedText')}</p><button class="primary-button" data-route="explore">${t('explore')}</button></div>`}`;
}

function detail() {
  const item = listings.find(entry => entry.id === state.selectedItem) || listings[0];
  const place = state.language === 'fa' ? item.placeFa : item.placeEn;
  const isFa = state.language === 'fa';
  const descriptions = {
    business: isFa ? 'یک کسب‌وکار محلی فارسی‌زبان در ملبورن. اطلاعات این صفحه برای نمونه‌سازی تجربه محصول تهیه شده است.' : 'An imported Melbourne business record. Confirm the address, opening hours and services on the owner’s website before visiting.',
    community: isFa ? 'فضایی برای آشنایی، تبادل تجربه و ارتباط با اعضای جامعه محلی.' : 'A place to meet people, exchange experience and connect with the local community.',
    jobs: isFa ? 'یک فرصت شغلی نمونه. امکان اسپانسرشیپ باید مستقیماً با کارفرما بررسی شود و تضمین‌شده نیست.' : 'A sample opportunity. Sponsorship must be confirmed directly with the employer and is not guaranteed.',
    visas: isFa ? 'اطلاعات عمومی برای شناخت مسیرهای ویزا؛ این محتوا مشاوره مهاجرتی نیست و هیچ نتیجه‌ای را تضمین نمی‌کند.' : 'General visa-pathway information; this is not migration advice and does not guarantee an outcome.',
    events: isFa ? 'یک دورهمی محلی برای آشنایی و وقت‌گذرانی در محیطی دوستانه.' : 'A local gathering for meeting people in a friendly environment.',
    market: 'یک آگهی نمایشی برای خرید و فروش محلی کالای دست‌دوم.',
    activities: 'یک فعالیت اجتماعی نمایشی برای آشنایی با آدم‌های محلی.',
    news: 'یک خبر نمونه برای نمایش ساختار بخش خبر؛ هنوز محتوای زنده منتشر نمی‌شود.'
  };
  const statusText = item.prototype ? 'نمونه نمایشی' : item.verified ? '✓ ' + t('verified') : t('unverified');
  const primaryAction = item.sourceUrl ? `<a class="primary-button detail-link" href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer">${words('مشاهده منبع رسمی ↗','View official source ↗')}</a>` : `<button class="primary-button" data-demo>جزئیات بیشتر</button>`;
  return `<button class="back-button" data-route="${state.previousRoute}">‹ ${isFa ? 'بازگشت' : 'Back'}</button>
    ${item.image ? `<img class="detail-cover" src="${item.image}" alt="${item.imageAlt || ''}" />` : ''}
    <section class="detail-hero"><div class="detail-logo">${item.logo}</div><div class="detail-title"><span class="status ${item.prototype ? 'prototype-label' : item.verified ? 'verified' : ''}">${statusText}</span><h1>${local(item)}</h1><p>${place}</p></div><button class="save ${state.saved.has(item.id) ? 'saved' : ''}" data-save="${item.id}" aria-label="ذخیره">${state.saved.has(item.id) ? '♥' : '♡'}</button></section>
    <div class="detail-actions">${primaryAction}<button class="secondary-button" data-save="${item.id}">${state.saved.has(item.id) ? (isFa ? 'ذخیره شد' : 'Saved') : (isFa ? 'ذخیره کن' : 'Save')}</button></div>
    <section class="detail-section"><h2>${isFa ? 'درباره' : 'About'}</h2><p>${isFa ? item.descriptionFa || descriptions[item.type] : item.descriptionEn || descriptions[item.type] || item.placeEn}</p></section>
    <section class="trust-card"><div class="trust-icon">${item.prototype ? '!' : item.verified ? '✓' : 'i'}</div><div><h2>${item.prototype ? words('این مورد فقط برای پیش‌نمایش است','Prototype example only') : item.verified ? words('هویت این صفحه بررسی شده','Identity checked') : words('این صفحه هنوز تأیید نشده','This record is unverified')}</h2><p>${item.prototype ? words('این مورد واقعی نیست و برای کامل دیدن رابط کاربری ساخته شده است.','This is an invented example for interface testing.') : item.verified ? words('اطلاعات اصلی با صاحب یا برگزارکننده تطبیق داده شده است.','Details were checked with the owner or organiser.') : words('اطلاعات از منبع رسمی برگزارکننده یا وب‌سایت خود مجموعه خلاصه شده، اما همکاری یا مالکیت تأیید نشده است.','Details were summarised from the organiser or owner’s site. Ownership and partnership are not verified.')}</p><small>${words('آخرین بررسی:','Last checked:')} ${item.checked || '۳ سپتامبر ۲۰۲۶'} · ${item.sourceName || 'نمونه نمایشی'}</small></div></section>
    <section class="detail-section"><h2>${isFa ? 'اطلاعات اشتباه است؟' : 'Is something incorrect?'}</h2><p>${isFa ? 'صاحب این کسب‌وکار یا برگزارکننده هستید؟ صفحه را تأیید کنید؛ یا تغییر و حذف اطلاعات را گزارش دهید.' : 'Are you the owner or organiser? Claim this page, or request a correction or removal.'}</p><div class="inline-actions"><button class="secondary-button" data-demo>${isFa ? 'تأیید مالکیت' : 'Claim listing'}</button><button class="text-danger" data-demo>${isFa ? 'گزارش یا حذف' : 'Report or remove'}</button></div></section>`;
}

function submit() {
  return `<div class="page-title"><h1>${t('submit')}</h1><p>${t('submitSub')}</p></div><div class="form-card"><div class="submission-types">${categories.slice(0,6).map(c => `<button class="submission-type" data-demo><img src="${c.icon}" alt="" />${local(c)}</button>`).join('')}</div><div class="notice">هر مورد قبل از انتشار بررسی می‌شود. با ثبت اطلاعات تأیید می‌کنی که اجازه اشتراک آن را داری.</div></div>`;
}

function profile() {
  const items = listings.filter(item => state.saved.has(item.id));
  const stories = editorial.filter(item => state.saved.has(item.id));
  const savedContent = items.length || stories.length ? `<div class="listing-stack">${items.map(listingCard).join('')}${stories.map(newsCard).join('')}</div>` : `<div class="profile-saved-empty"><span>♡</span><p>هنوز چیزی ذخیره نکردی. قلب کنار هر مورد را بزن تا اینجا نگهش داری.</p><button class="secondary-button" data-route="explore">شروع جستجو</button></div>`;
  return `<div class="page-title"><h1>${t('profile')}</h1><p>${t('profileSub')}</p></div><div class="profile-card"><div class="avatar" style="display:grid;place-items:center;margin:auto;width:64px;height:64px;font-size:24px">ک</div><h2>کاربر مهمان</h2><p style="color:var(--muted);font-size:13px">برای همگام‌سازی ذخیره‌ها و ثبت محتوا بعداً وارد شو.</p><button class="primary-button" data-demo>ورود یا ساخت حساب</button></div><div class="stat-row"><div class="stat"><b>${state.saved.size}</b><small>ذخیره‌ها</small></div><div class="stat"><b>۰</b><small>ثبت‌ها</small></div><div class="stat"><b>ملبورن</b><small>شهر</small></div></div><section class="profile-saved"><div class="section-head"><h2>ذخیره‌های من</h2><small>${number(state.saved.size,0)} مورد</small></div>${savedContent}</section>`;
}

function render() {
  const views = { exchange, converter, remittance, 'exchange-sources':exchangeSources, news, story, 'news-feed':newsFeed, 'news-sources':newsSources, welcome, home, visas, 'visa-category': visaCategoryPage, 'visa-assistant': visaAssistant, 'visa-results': visaResults, explore, communities, saved, submit, profile, detail };
  app.dataset.view = state.route;
  document.querySelector('.app-shell').classList.toggle('welcome-mode', state.route === 'welcome');
  document.querySelector('.app-shell').classList.toggle('focus-mode', state.route === 'visa-category' || state.route === 'visa-assistant' || state.route === 'visa-results');
  document.querySelector('.app-shell').classList.toggle('feed-mode', state.route === 'news-feed');
  app.innerHTML = (views[state.route] || home)();
  document.querySelectorAll('.nav-item').forEach(button => button.classList.toggle('active', button.dataset.route === state.route || (['news','story','news-sources'].includes(state.route) && button.dataset.route === 'news-feed') || (state.route === 'communities' && button.dataset.route === 'explore') || (state.route === 'visas' && button.dataset.route === 'home')));
  document.documentElement.lang = 'fa';
  document.documentElement.dir = 'rtl';
  app.querySelectorAll('video').forEach(video=>{video.addEventListener('play',()=>app.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause();}));});
  if ('IntersectionObserver' in window) { render.mediaObserver?.disconnect(); render.mediaObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)e.target.pause();}),{threshold:0.3}); app.querySelectorAll('video').forEach(v=>render.mediaObserver.observe(v)); }

}

function navigate(route, { replace = false, smooth = true } = {}) {
  const update = () => { state.route = route; render(); };
  update();
  const method = replace ? 'replaceState' : 'pushState';
  history[method]({ route, storyId:state.storyId, selectedItem:state.selectedItem, filter:state.filter }, '', `${location.pathname}${location.search}#${route}${route==='story'?'/'+state.storyId:route==='detail'?'/'+state.selectedItem:''}`);
  app.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
}

document.addEventListener('click', event => {
  if (event.target.closest('[data-city-picker]')) { state.cityPickerOpen = true; render(); return; }
  if (event.target === event.target.closest('.city-backdrop') || event.target.closest('.city-sheet [data-city-close]')) { state.cityPickerOpen = false; render(); return; }
  if (event.target.closest('[data-enter-app]')) { writeStorage('sessionStorage','australia-ye-ma-entered', 'true'); navigate('home', { smooth: false }); return; }
  if (event.target.closest('[data-sign-in]')) { showToast('ورود و ثبت‌نام در مرحله بعدی فعال می‌شود.'); return; }
  if (event.target.closest('[data-history-back]')) { if (state.route === 'visa-assistant' && state.visaStep > 1) { state.visaStep -= 1; state.visaAnswers.pop(); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); } else history.back(); return; }
  const route = event.target.closest('[data-route]');
  if (route) { event.preventDefault(); navigate(route.dataset.route); return; }
  const category = event.target.closest('[data-category]');
  if (category) { state.filter = category.dataset.category; navigate(category.dataset.category === 'community' ? 'communities' : category.dataset.category === 'visas' ? 'visas' : ['news','exchange'].includes(category.dataset.category)?category.dataset.category:'explore'); return; }
  if (event.target.closest('[data-start-visa-guide]')) { state.visaStep = 1; state.visaAnswers = []; state.selectedVisaCategory = 'all'; navigate('visa-assistant'); return; }
  const visaCategory = event.target.closest('[data-visa-category]');
  if (visaCategory) { state.selectedVisaCategory = visaCategory.dataset.visaCategory; navigate('visa-category'); return; }
  const visaAnswer = event.target.closest('[data-visa-answer]');
  if (visaAnswer) { state.visaAnswers.push(visaAnswer.dataset.visaAnswer); if (state.visaStep < 3) { state.visaStep += 1; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); } else { state.selectedVisaCategory = state.visaAnswers[0] === 'کار و مهارت' ? 'work' : state.visaAnswers[0] === 'تحصیل' ? 'study' : state.visaAnswers[0] === 'دیدار و سفر' ? 'visit' : 'family'; navigate('visa-results'); } return; }
  const filter = event.target.closest('[data-filter]');
  if (filter) { state.filter = filter.dataset.filter; if(['news','exchange','community','visas'].includes(state.filter)) navigate(state.filter==='community'?'communities':state.filter); else render(); return; }
  const communityFilter = event.target.closest('[data-community-filter]');
  if (communityFilter) { state.communityFilter = communityFilter.dataset.communityFilter; render(); return; }
  const save = event.target.closest('[data-save]');
  if (save) { const id = Number(save.dataset.save); const adding = !state.saved.has(id); adding ? state.saved.add(id) : state.saved.delete(id); writeStorage('localStorage','australia-ye-ma-saved', JSON.stringify([...state.saved])); const feedScroll=document.querySelector('.story-feed')?.scrollTop; render(); if(feedScroll!==undefined)document.querySelector('.story-feed').scrollTop=feedScroll; showToast(adding ? t('savedToast') : t('removedToast')); return; }
  const listing = event.target.closest('[data-listing]');
  if (listing) { state.selectedItem = Number(listing.dataset.listing); state.previousRoute = state.route; navigate('detail'); return; }
  if (event.target.closest('[data-demo]')) showToast(state.language === 'fa' ? 'این بخش در نسخه بعدی فعال می‌شود.' : 'This flow comes in the next prototype.');
});

document.addEventListener('keydown', event => {
  const listing = event.target.closest?.('[data-listing]');
  if (listing && event.target.tagName!=='BUTTON' && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); listing.click(); }
});

document.addEventListener('input', event => {
  if (event.target.matches('#homeSearch')) { state.query = event.target.value; if (state.query.length > 1) { state.filter = 'all'; navigate('explore', { smooth: false }); document.querySelector('#exploreSearch')?.focus(); } }
  if (event.target.matches('#exploreSearch')) { state.query = event.target.value; const cursor = event.target.selectionStart; render(); const input = document.querySelector('#exploreSearch'); input.focus(); if(input.type!=='search') input.setSelectionRange(cursor, cursor); }
});

render();
history.scrollRestoration = 'manual';
history.replaceState({ route: state.route }, '', location.href);
window.addEventListener('popstate', event => {
  const route = event.state?.route;
  if (!route) return;
  state.route = route;
  Object.assign(state, {storyId:event.state.storyId||state.storyId, selectedItem:event.state.selectedItem||state.selectedItem,filter:event.state.filter||state.filter});
  render();
  requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }));
});

// New feature controls are independent of legacy listing actions.
document.addEventListener('click',event=>{
 const button=event.target.closest('button'); if(!button)return;
 if(button.dataset.currency){state.currencyTo=button.dataset.currency;navigate('converter');}
 if(button.hasAttribute('data-swap-currency')){[state.currencyFrom,state.currencyTo]=[state.currencyTo,state.currencyFrom];render();}
 if(button.dataset.remitDirection){state.remitDirection=button.dataset.remitDirection;render();}
 if(button.hasAttribute('data-remit-swap')){state.remitDirection=state.remitDirection==='out'?'in':'out';render();}
 if(button.dataset.remitAmount){state.remitAmount=button.dataset.remitAmount;render();}
 if(button.hasAttribute('data-remit-clear')){state.remitAmount='';render();document.querySelector('#remitAmount').focus();}
 if(button.dataset.trend){state.trend=button.dataset.trend;render();}
 if(button.dataset.newsFilter){state.newsFilter=button.dataset.newsFilter;render();}
 if(button.dataset.story){state.storyId=Number(button.dataset.story);navigate('story');}
 if(button.dataset.shareStory){const link=new URL(location.href);link.hash='story/'+button.dataset.shareStory;if(navigator.clipboard?.writeText)navigator.clipboard.writeText(link.href).then(()=>showToast(words('پیوند کپی شد','Link copied'))).catch(()=>showToast(words('پیوند را از نوار آدرس کپی کنید.','Copy the link from the address bar.')));else showToast(words('پیوند را از نوار آدرس کپی کنید.','Copy the link from the address bar.'));}
 if(button.dataset.feedMove){const feed=document.querySelector('.story-feed');feed?.scrollBy({top:Number(button.dataset.feedMove)*feed.clientHeight,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
});
document.addEventListener('input',event=>{
 const e=event.target;
 if(e.id==='currencyAmount'){state.currencyAmount=e.value;document.querySelector('#conversionResult').innerHTML=conversionResult();}
 if(e.id==='remitAmount'){state.remitAmount=e.value;document.querySelector('#remitResult').innerHTML=remitResult();}
 if(e.id==='currencySearch'){state.currencyQuery=e.value;document.querySelector('#currencyRows').innerHTML=currencyRows();}
 if(e.id==='newsSearch'){state.newsQuery=e.value;document.querySelector('#newsResults').innerHTML=newsResults();}
});
document.addEventListener('change',event=>{
 const e=event.target;
 if(e.id==='currencyFrom'){state.currencyFrom=e.value;render();}
 if(e.id==='currencyTo'){state.currencyTo=e.value;render();}
 if(e.id==='remitUnit'){state.remitUnit=e.value;render();}
});
document.addEventListener('visibilitychange',()=>{if(document.hidden)document.querySelectorAll('video').forEach(v=>v.pause());});
