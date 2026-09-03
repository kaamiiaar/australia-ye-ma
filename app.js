const categories = [
  { id: 'community', icon: './assets/icons/community.png', fa: 'گروه‌ها' },
  { id: 'jobs', icon: './assets/icons/jobs.png', fa: 'کار و اسپانسر' },
  { id: 'events', icon: './assets/icons/events.png', fa: 'رویدادها' },
  { id: 'business', icon: './assets/icons/business.png', fa: 'کسب‌وکار' },
  { id: 'activities', icon: './assets/icons/activities.png', fa: 'تفریح' },
  { id: 'news', icon: './assets/icons/news.png', fa: 'خبر' },
  { id: 'visas', icon: './assets/icons/visas.png', fa: 'ویزاها' },
  { id: 'market', icon: './assets/icons/market.png', fa: 'دست‌دوم' },
];

const listings = [
  { id: 1, type: 'business', logo: 'ع', fa: 'رستوران ایرانی علی‌قاپو', en: 'Ali Qapu Persian Restaurant', placeFa: 'ملبورن · غذای ایرانی و سالن مراسم', placeEn: 'Melbourne · Persian dining and functions', verified: false, sourceName: 'وب‌سایت رسمی علی‌قاپو', sourceUrl: 'https://thealiqapu.com/', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'رستوران ایرانی با منوی غذاهای سنتی و فضای برگزاری مهمانی و مراسم. جزئیات نشانی و رزرو را پیش از مراجعه در وب‌سایت خود مجموعه بررسی کنید.' },
  { id: 2, type: 'business', logo: 'پ', fa: 'پرشین فلیورز', en: 'Persian Flavours', placeFa: '۳۳۸ اسپرینگ‌ویل رود، فارست هیل', placeEn: '338 Springvale Road, Forest Hill', verified: false, sourceName: 'وب‌سایت رسمی Persian Flavours', sourceUrl: 'https://persian-flavours.com.au/', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'رستوران و غذای بیرون‌بر ایرانی در فارست هیل. منو و اطلاعات تماس را در سایت رسمی مجموعه ببینید.' },
  { id: 3, type: 'business', logo: 'ح', fa: 'قصابی و سوپرمارکت حلال ایرانی', en: 'Persian Halal Butchery & Grocery', placeFa: 'دانکستر ایست و باکس هیل نورث', placeEn: 'Doncaster East and Box Hill North', verified: false, sourceName: 'وب‌سایت رسمی Persian Halal', sourceUrl: 'https://persianhalal.com.au/', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'گوشت حلال و مواد غذایی ایرانی با دو شعبه در شرق ملبورن؛ نشانی‌های اعلام‌شده در سایت رسمی: Jackson Court دانکستر ایست و Station Street باکس هیل نورث.' },
  { id: 4, type: 'business', logo: 'ز', fa: 'سوپرمارکت زمزم', en: 'ZamZam Supermarket', placeFa: 'نورث‌کوت پلازا، نورث‌کوت', placeEn: 'Northcote Plaza, Northcote', verified: false, sourceName: 'وب‌سایت رسمی زمزم', sourceUrl: 'https://www.zamzam-supermarket-herbals.com.au/', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'سوپرمارکت مواد غذایی ایرانی و خاورمیانه‌ای در نورث‌کوت پلازا. موجودی و ساعت کار ممکن است تغییر کند.' },
  { id: 5, type: 'business', logo: 'هـ', fa: 'هایپر پاندا', en: 'Hyper Panda', placeFa: 'فروشگاه آنلاین · تحویل در ملبورن', placeEn: 'Online store · Melbourne delivery', verified: false, sourceName: 'وب‌سایت رسمی Hyper Panda', sourceUrl: 'https://www.hyperpanda.com.au/', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'فروشگاه آنلاین مواد غذایی خاورمیانه‌ای با گزینه‌های تحویل و دریافت حضوری در ملبورن.' },
  { id: 6, type: 'business', logo: 'پ', fa: 'فروشگاه پوزی', en: 'Pozy Persian Grocery', placeFa: 'آنلاین · ارسال در استرالیا', placeEn: 'Online · Australia-wide delivery', verified: false, sourceName: 'وب‌سایت رسمی Pozy', sourceUrl: 'https://www.pozy.com.au/about', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'فروشگاه آنلاین خانوادگی ایرانی-استرالیایی برای مواد غذایی ایرانی با ارسال در سراسر استرالیا.' },
  { id: 20, type: 'events', logo: 'ش', image: './assets/events/royal-show.webp', imageAlt: 'نمایشگاه سلطنتی ملبورن', fa: 'نمایشگاه سلطنتی ملبورن ۲۰۲۶', en: 'Melbourne Royal Show 2026', placeFa: '۲۴ سپتامبر تا ۴ اکتبر · Melbourne Showgrounds', placeEn: '24 September–4 October · Melbourne Showgrounds', verified: false, sourceName: 'Melbourne Royal', sourceUrl: 'https://royalshow.com.au/', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'نمایش سالانه ملبورن با حیوانات، خوراکی‌ها، سرگرمی و برنامه‌های خانوادگی. زمان‌بندی و بلیت را از برگزارکننده رسمی بررسی کنید.' },
  { id: 21, type: 'events', logo: 'ف', image: './assets/events/melbourne-fringe.webp', imageAlt: 'اجرای زنده در فستیوال فرینج ملبورن', fa: 'فستیوال فرینج ملبورن ۲۰۲۶', en: 'Melbourne Fringe Festival 2026', placeFa: '۲۹ سپتامبر تا ۱۸ اکتبر · نقاط مختلف ملبورن', placeEn: '29 September–18 October · Across Melbourne', verified: false, sourceName: 'Melbourne Fringe', sourceUrl: 'https://www.melbournefringe.com.au/festival-info/festival-faqs', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'فستیوال هنرهای مستقل ملبورن با اجراها و برنامه‌ها در نقاط مختلف شهر. برنامه کامل و دسترسی هر اجرا را در سایت رسمی ببینید.' },
  { id: 22, type: 'events', logo: 'ب', image: './assets/events/winter-night-market.webp', imageAlt: 'بازار شبانه زمستانی کویین ویکتوریا', fa: 'بازار شبانه زمستانی', en: 'Winter Night Market', placeFa: 'تا ۹ سپتامبر · Queen Victoria Market', placeEn: 'Until 9 September · Queen Victoria Market', verified: false, sourceName: 'Queen Victoria Market', sourceUrl: 'https://qvm.com.au/whats-on/winter-night-market-2/', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'بازار شبانه زمستانی با غذا، نوشیدنی و سرگرمی در بازار کویین ویکتوریا. جزئیات روز و ساعت را در صفحه رسمی بازار چک کنید.' },
  { id: 23, type: 'events', logo: 'ن', image: './assets/events/ngv-friday-nights.webp', imageAlt: 'پوستر رسمی شب‌های جمعه NGV و نمایشگاه کارتیه', fa: 'شب‌های جمعه NGV: کارتیه', en: 'NGV Friday Nights: Cartier', placeFa: 'تا ۲ اکتبر، جمعه‌ها ۶ تا ۱۰ شب · NGV', placeEn: 'Until 2 October, Fridays 6–10pm · NGV', verified: false, sourceName: 'NGV', sourceUrl: 'https://www.ngv.vic.gov.au/friday-nights/', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'برنامه شبانه جمعه‌های گالری ملی ویکتوریا همراه با نمایشگاه کارتیه و اجراهای زنده. این برنامه بلیت‌دار است.' },
  { id: 24, type: 'events', logo: 'ح', image: './assets/events/chocolate-family.webp', imageAlt: 'پنکیک شکلاتی رویداد خانوادگی ملبورن', fa: 'روز ماجراجویی شکلاتی خانواده', en: 'Chocolate Family Adventure Day', placeFa: 'تا ۲۷ سپتامبر · داکلندز', placeEn: 'Until 27 September · Docklands', verified: false, sourceName: 'What’s On Melbourne', sourceUrl: 'https://whatson.melbourne.vic.gov.au/things-to-do/chocolate-family-adventure-day', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'یک تجربه خانوادگی شکلات‌محور در داکلندز. تاریخ‌ها، ظرفیت و هزینه را در فهرست رسمی شهر بررسی کنید.' },
  { id: 30, type: 'activities', logo: 'م', fa: 'شبانه: موزه بعد از تاریکی', en: 'Nocturnal: Museum After Dark', placeFa: 'تا ۵ نوامبر · Melbourne Museum', placeEn: 'Until 5 November · Melbourne Museum', verified: false, sourceName: 'What’s On Melbourne', sourceUrl: 'https://whatson.melbourne.vic.gov.au/things-to-do/whats-on-september', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'بازدید شبانه از موزه ملبورن با برنامه‌های ویژه بزرگسالان. جزئیات هر نوبت و بلیت را در منبع رسمی ببینید.' },
  { id: 31, type: 'activities', logo: 'ط', fa: 'تور شبانه طعم‌های ملبورن', en: 'Flavours of Melbourne Night Trail', placeFa: 'تا ۲۹ اکتبر · مرکز ملبورن', placeEn: 'Until 29 October · Melbourne CBD', verified: false, sourceName: 'What’s On Melbourne', sourceUrl: 'https://whatson.melbourne.vic.gov.au/things-to-do/whats-on-september', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'تور پیاده‌روی شبانه برای آشنایی با غذاها و محله‌های مرکز ملبورن. زمان و نقطه شروع را هنگام رزرو تأیید کنید.' },
  { id: 32, type: 'activities', logo: 'ر', fa: 'کلاس‌های هنر رزین', en: 'Resin Art Classes', placeFa: 'تا ۳۱ دسامبر · ملبورن', placeEn: 'Until 31 December · Melbourne', verified: false, sourceName: 'What’s On Melbourne', sourceUrl: 'https://whatson.melbourne.vic.gov.au/things-to-do/whats-on-september', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'کلاس‌های ساخت آثار رزینی برای تجربه‌ای خلاقانه. سطح دوره، محل و هزینه به سانس انتخابی بستگی دارد.' },
  { id: 33, type: 'activities', logo: 'س', fa: 'داستان تصویر متحرک', en: 'The Story of the Moving Image', placeFa: 'تا ۳۱ دسامبر · ACMI، فدریشن اسکوئر', placeEn: 'Until 31 December · ACMI, Federation Square', verified: false, sourceName: 'What’s On Melbourne', sourceUrl: 'https://whatson.melbourne.vic.gov.au/things-to-do/whats-on-september', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'نمایش دائمی ACMI درباره تاریخ و فرهنگ فیلم، تلویزیون، بازی و هنر دیجیتال در فدریشن اسکوئر.' },
  { id: 40, type: 'news', logo: 'م', fa: 'درخواست عضویت کمیته مشورتی چندفرهنگی', en: 'Multicultural Advisory Committee applications', placeFa: 'مهلت: ۴ سپتامبر ۲۰۲۶ · City of Melbourne', placeEn: 'Closes 4 September 2026 · City of Melbourne', verified: false, sourceName: 'Participate Melbourne', sourceUrl: 'https://participate.melbourne.vic.gov.au/', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'شهر ملبورن برای کمیته مشورتی چندفرهنگی درخواست عضویت می‌پذیرد. طبق صفحه رسمی، مهلت تا ساعت ۱۱:۴۵ شب جمعه ۴ سپتامبر است.' },
  { id: 41, type: 'news', logo: 'هـ', fa: 'نظرخواهی درباره مراکز داده و زیرساخت هوش مصنوعی', en: 'Data centres and AI infrastructure consultation', placeFa: 'تا ۳۰ سپتامبر · City of Melbourne', placeEn: 'Until 30 September · City of Melbourne', verified: false, sourceName: 'Participate Melbourne', sourceUrl: 'https://participate.melbourne.vic.gov.au/', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'شهر ملبورن درباره پیش‌نویس موضع‌نامه مراکز داده و زیرساخت هوش مصنوعی نظر عمومی دریافت می‌کند.' },
  { id: 42, type: 'news', logo: 'ا', fa: 'برنامه نمایشگاه سلطنتی ملبورن اعلام شد', en: 'Melbourne Royal Show program announced', placeFa: 'خبر برگزارکننده · ۳۰ اوت ۲۰۲۶', placeEn: 'Organiser update · 30 August 2026', verified: false, sourceName: 'Melbourne Royal', sourceUrl: 'https://royalshow.com.au/its-show-time-new-experiences-exclusive-entertainment-and-thousands-of-animals-at-the-2026-melbourne-royal-show/', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'Melbourne Royal جزئیات تجربه‌ها، سرگرمی‌ها و بخش حیوانات نمایشگاه ۲۰۲۶ را منتشر کرده است.' },
  { id: 43, type: 'news', logo: 'آ', fa: 'پاپ‌آپ‌های اقلیم و محیط‌زیست ملبورن', en: 'Melbourne climate and environment pop-ups', placeFa: '۱۲ سپتامبر تا ۳ اکتبر · چند نقطه شهر', placeEn: '12 September–3 October · Multiple locations', verified: false, sourceName: 'Participate Melbourne', sourceUrl: 'https://participate.melbourne.vic.gov.au/climate-and-environment-strategy/pop-ups', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'چند جلسه حضوری برای گفت‌وگو درباره راهبرد اقلیم و محیط‌زیست، از بازار کویین ویکتوریا تا پارک‌ویل و City Square، اعلام شده است.' },
  { id: 50, type: 'jobs', logo: 'ک', fa: 'دستیار فروش دوزبانه', en: 'Bilingual Sales Assistant', placeFa: 'نمونه نمایشی · پاره‌وقت · ساوت‌بنک', placeEn: 'Prototype example · Part-time · Southbank', verified: false, prototype: true, sourceName: 'نمونه نمایشی', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'نمونه رابط کاربری برای یک آگهی کار دوزبانه. این موقعیت واقعی نیست و امکان اسپانسرشیپ را نشان یا تضمین نمی‌کند.' },
  { id: 51, type: 'jobs', logo: 'ر', fa: 'هماهنگ‌کننده رویداد', en: 'Events Coordinator', placeFa: 'نمونه نمایشی · قراردادی · مرکز ملبورن', placeEn: 'Prototype example · Contract · Melbourne CBD', verified: false, prototype: true, sourceName: 'نمونه نمایشی', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'نمونه رابط کاربری برای موقعیت هماهنگی رویداد. برای انتشار واقعی، هویت کارفرما و جزئیات موقعیت باید بررسی شود.' },
  { id: 52, type: 'jobs', logo: 'پ', fa: 'پشتیبانی مشتری فارسی‌زبان', en: 'Persian-speaking Customer Support', placeFa: 'نمونه نمایشی · دورکاری ترکیبی', placeEn: 'Prototype example · Hybrid', verified: false, prototype: true, sourceName: 'نمونه نمایشی', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'نمونه رابط کاربری برای یک موقعیت پشتیبانی مشتری؛ این آگهی واقعی نیست.' },
  { id: 60, type: 'market', logo: 'م', fa: 'میز مطالعه دست‌دوم', en: 'Second-hand Study Desk', placeFa: 'نمونه نمایشی · ۶۰ دلار · فیتزروی', placeEn: 'Prototype example · $60 · Fitzroy', verified: false, prototype: true, sourceName: 'نمونه نمایشی', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'آگهی نمایشی برای آزمودن صفحه خرید و فروش محلی. این کالا واقعاً برای فروش عرضه نشده است.' },
  { id: 61, type: 'market', logo: 'ص', fa: 'دو صندلی ناهارخوری', en: 'Pair of Dining Chairs', placeFa: 'نمونه نمایشی · ۴۵ دلار · برانزویک', placeEn: 'Prototype example · $45 · Brunswick', verified: false, prototype: true, sourceName: 'نمونه نمایشی', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'آگهی نمایشی برای سنجش چیدمان و فیلترهای دست‌دوم؛ کالای واقعی نیست.' },
  { id: 62, type: 'market', logo: 'د', fa: 'دوچرخه شهری', en: 'City Bicycle', placeFa: 'نمونه نمایشی · ۱۲۰ دلار · کارلتون', placeEn: 'Prototype example · $120 · Carlton', verified: false, prototype: true, sourceName: 'نمونه نمایشی', checked: '۳ سپتامبر ۲۰۲۶', descriptionFa: 'آگهی نمایشی خرید و فروش محلی. پیش از فعال شدن این بخش، سازوکار ایمنی و گزارش تخلف اضافه می‌شود.' },
];

const communitySources = [
  { id: 'melbourne_ir', icon: 'M', fa: 'ملبورن استرالیا', en: 'Melbourne Persian Community', topic: 'city', scope: 'melbourne', members: '≈ 7.4K', url: 'https://t.me/melbourne_ir', descriptionFa: 'گفت‌وگوی عمومی ایرانیان ملبورن و ویکتوریا', descriptionEn: 'Public discussion for Iranians in Melbourne and Victoria' },
  { id: 'jobaustralia', icon: 'ک', fa: 'کاریابی استرالیا', en: 'Jobs Australia', topic: 'jobs', scope: 'australia', members: '≈ 12.2K', url: 'https://t.me/jobaustralia', descriptionFa: 'فرصت شغلی، رزومه، مصاحبه و تجربه کار', descriptionEn: 'Jobs, CVs, interviews and Australian work experience' },
  { id: 'rent_australia', icon: 'خ', fa: 'اجاره خانه استرالیا', en: 'Rent Australia', topic: 'housing', scope: 'australia', members: '≈ 9.1K', url: 'https://t.me/rent_australia', descriptionFa: 'گفت‌وگو و آگهی‌های مرتبط با اجاره و هم‌خانه', descriptionEn: 'Discussion and posts about rentals and share houses' },
  { id: 'studentsaustralia', icon: 'د', fa: 'دانشجویان استرالیا', en: 'Students Australia', topic: 'students', scope: 'australia', members: '≈ 5.7K', url: 'https://t.me/studentsaustralia', descriptionFa: 'جامعه دانشجویان و تجربه تحصیل در استرالیا', descriptionEn: 'Student community and studying in Australia' },
  { id: 'travel_in_au', icon: 'گ', fa: 'استرالیا را باهم بگردیم', en: 'Explore Australia Together', topic: 'activities', scope: 'australia', members: '≈ 7.3K', url: 'https://t.me/travel_in_au', descriptionFa: 'سفر، طبیعت‌گردی و فعالیت‌های گروهی', descriptionEn: 'Travel, outdoors and group activities' },
];

const visaCategories = [
  { id: 'sponsorship', title: 'اسپانسرشیپ کارفرما', description: 'ویزای کاری با حمایت کارفرما', icon: './assets/visa-icons/sponsorship.png' },
  { id: 'work', title: 'کاری و مهارتی', description: 'مسیرهای مهارتی و کاری', icon: './assets/visa-icons/skilled-work.png' },
  { id: 'study', title: 'تحصیلی', description: 'تحصیل و همراه دانشجو', icon: './assets/visa-icons/study.png' },
  { id: 'visit', title: 'توریستی و بازدید', description: 'سفر، دیدار و اقامت کوتاه', icon: './assets/visa-icons/visit.png' },
  { id: 'permanent', title: 'اقامت دائم', description: 'مسیرهای اقامت دائم استرالیا', icon: './assets/visa-icons/permanent.png' },
  { id: 'family', title: 'پارتنر و خانواده', description: 'پیوستن به همسر یا خانواده', icon: './assets/visa-icons/family.png' },
  { id: 'stay-longer', title: 'ماندن بیشتر', description: 'بررسی گزینه‌ها پیش از پایان ویزا', icon: './assets/visa-icons/stay-longer.png' },
  { id: 'other', title: 'سایر ویزاها', description: 'گزینه‌های دیگر در فهرست رسمی', icon: './assets/visa-icons/other.png' },
];

const visaExamples = [
  { id: '482', groups: ['sponsorship', 'work'], title: 'ویزای مهارت مورد نیاز', english: 'Skills in Demand', subclass: '۴۸۲', relevance: 'بالا', tone: 'high', summary: 'ویزای موقت برای نیروی ماهری که یک کارفرمای تأییدشده برای موقعیت شغلی معرفی می‌کند.', stay: 'تا ۴ سال', sponsor: 'لازم است', permanent: 'ممکن است مسیر جداگانه داشته باشد', url: 'https://immi.homeaffairs.gov.au/Visa-subsite/Pages/work/skills-in-demand-482-landing.aspx' },
  { id: '186', groups: ['sponsorship', 'work', 'permanent'], title: 'ویزای نامزدی کارفرما', english: 'Employer Nomination Scheme', subclass: '۱۸۶', relevance: 'متوسط', tone: 'medium', summary: 'اقامت دائم برای نیروی ماهری که کارفرمای استرالیایی واجد شرایط او را معرفی می‌کند.', stay: 'دائم', sponsor: 'لازم است', permanent: 'اقامت دائم', url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/employer-nomination-scheme-186' },
  { id: '190', groups: ['work', 'permanent'], title: 'ویزای مهارتی ایالتی', english: 'Skilled Nominated', subclass: '۱۹۰', relevance: 'متوسط', tone: 'medium', summary: 'اقامت دائم برای نیروی ماهری که از سوی یک ایالت یا قلمرو استرالیا نامزد شده باشد.', stay: 'دائم', sponsor: 'نامزدی ایالتی', permanent: 'اقامت دائم', url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-nominated-190' },
  { id: '500', groups: ['study'], title: 'ویزای دانشجویی', english: 'Student visa', subclass: '۵۰۰', relevance: 'بررسی', tone: 'high', summary: 'ویزای موقت برای شرکت در دوره تحصیلی واجد شرایط؛ مدت آن به ثبت‌نام و شرایط دوره بستگی دارد.', stay: 'تا ۶ سال، بسته به دوره', sponsor: 'پذیرش و CoE', permanent: 'موقت', url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500' },
  { id: '600', groups: ['visit'], title: 'ویزای بازدیدکننده', english: 'Visitor visa — Tourist stream', subclass: '۶۰۰', relevance: 'بررسی', tone: 'high', summary: 'برای گردش، سفر دریایی یا دیدار خانواده و دوستان؛ این مسیر اجازه کار در استرالیا نمی‌دهد.', stay: 'تا ۱۲ ماه', sponsor: 'برای توریستی لازم نیست', permanent: 'موقت', url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600/tourist-stream-overseas' },
  { id: '820-801', groups: ['family'], title: 'ویزای پارتنر داخل استرالیا', english: 'Partner visas — onshore', subclass: '۸۲۰ و ۸۰۱', relevance: 'بررسی', tone: 'high', summary: 'برای همسر یا پارتنر واجد شرایطِ شهروند، مقیم دائم استرالیا یا شهروند واجد شرایط نیوزیلند.', stay: 'موقت، سپس بررسی دائم', sponsor: 'پارتنر واجد شرایط', permanent: 'مسیر دو مرحله‌ای', url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/partner-onshore' },
];

const copy = {
  fa: {
    greeting: 'سلام ملبورن 👋', hero: 'هر چیزی که برای زندگی اینجا نیاز داری', heroSub: 'کسب‌وکار، رویداد، کار و آدم‌های خودت را پیدا کن.', search: 'مثلاً دندانپزشک در ریچموند…', categories: 'دنبال چی می‌گردی؟', all: 'همه', seeAll: 'دیدن همه', featured: 'این هفته در ملبورن', nearby: 'پیشنهادهای نزدیک تو', fresh: 'تازه و منتخب', explore: 'جستجو', exploreSub: 'در میان خدمات، فرصت‌ها و جامعه فارسی‌زبان', saved: 'ذخیره‌ها', savedSub: 'چیزهایی که می‌خواهی دوباره ببینی', noSaved: 'هنوز چیزی ذخیره نکردی', noSavedText: 'قلب کنار هر مورد را بزن تا بعداً راحت پیدایش کنی.', submit: 'چی می‌خواهی اضافه کنی؟', submitSub: 'به کامل‌تر شدن جامعه کمک کن', profile: 'پروفایل من', profileSub: 'تنظیمات، فعالیت‌ها و اعتماد', prototype: 'محتوای محصول نمایشی است؛ لینک‌های کامیونیتی از صفحات عمومی آمده‌اند.', unverified: 'تأییدنشده', verified: 'تأییدشده', source: 'منبع عمومی', savedToast: 'به ذخیره‌ها اضافه شد', removedToast: 'از ذخیره‌ها حذف شد'
  },
  en: {
    greeting: 'Hello Melbourne 👋', hero: 'Everything you need for life here', heroSub: 'Find local businesses, events, work and your people.', search: 'Try “dentist in Richmond”…', categories: 'What are you looking for?', all: 'All', seeAll: 'See all', featured: 'This week in Melbourne', nearby: 'Recommended near you', fresh: 'Fresh and hand-picked', explore: 'Explore', exploreSub: 'Search Persian-friendly services, opportunities and communities', saved: 'Saved', savedSub: 'Things you want to find again', noSaved: 'Nothing saved yet', noSavedText: 'Tap the heart beside an item to keep it here.', submit: 'What would you like to add?', submitSub: 'Help make the community more useful', profile: 'My profile', profileSub: 'Settings, activity and trust', prototype: 'Product content is fictional; community links come from public pages.', unverified: 'Unverified', verified: 'Verified', source: 'Public source', savedToast: 'Added to saved', removedToast: 'Removed from saved'
  }
};

const storedSaved = JSON.parse(localStorage.getItem('australia-ye-ma-saved') || localStorage.getItem('melbourne-e-ma-saved') || localStorage.getItem('persian-connect-saved') || '[]');
const hasEntered = sessionStorage.getItem('australia-ye-ma-entered') === 'true';
const forceWelcome = new URLSearchParams(window.location.search).has('welcome');
const forceVisa = new URLSearchParams(window.location.search).has('visa');
const initialRoute = forceWelcome ? 'welcome' : forceVisa ? 'visas' : hasEntered ? 'home' : 'welcome';
const state = { route: initialRoute, previousRoute: 'home', language: 'fa', filter: 'all', communityFilter: 'all', query: '', saved: new Set(storedSaved), selectedItem: 1, visaStep: 1, visaAnswers: [], selectedVisaCategory: 'all' };
const app = document.querySelector('#app');
const t = key => copy[state.language][key];
const local = item => item[state.language];

function listingCard(item) {
  const place = state.language === 'fa' ? item.placeFa : item.placeEn;
  const saved = state.saved.has(item.id);
  return `<article class="listing-card ${item.image ? 'with-photo' : ''}" data-listing="${item.id}" tabindex="0" role="button" aria-label="${local(item)}">
    ${item.image ? `<img class="listing-photo" src="${item.image}" alt="${item.imageAlt || ''}" loading="lazy" />` : `<div class="listing-logo">${item.logo}</div>`}
    <div class="listing-copy"><h3>${local(item)}</h3><p>${place}</p><div class="meta"><span class="${item.prototype ? 'prototype-label' : item.verified ? 'verified' : ''}">${item.prototype ? 'نمونه نمایشی' : item.verified ? '✓ ' + t('verified') : t('unverified')}</span><span>${item.sourceName || t('source')}</span></div></div>
    <button class="save ${saved ? 'saved' : ''}" data-save="${item.id}" aria-label="Save">${saved ? '♥' : '♡'}</button>
  </article>`;
}

function filteredListings() {
  const query = state.query.trim().toLowerCase();
  return listings.filter(item => (state.filter === 'all' || item.type === state.filter) && (!query || item.fa.includes(query) || item.en.toLowerCase().includes(query) || item.placeFa.includes(query) || item.placeEn.toLowerCase().includes(query)));
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
      <button class="brand" data-route="home" aria-label="خانه"><span class="brand-mark" aria-hidden="true">ما</span><span><b>Australia-ye Ma</b><small>استرالیای ما</small></span></button>
      <button class="location-chip" aria-label="انتخاب شهر"><span>●</span> ملبورن <b>⌄</b></button>
    </header>
    <div class="hero-copy"><h1>${t('hero')}</h1><p>${t('heroSub')}</p>
      <label class="search"><span>⌕</span><input id="homeSearch" type="search" placeholder="${t('search')}" value="${state.query}" aria-label="جستجو" /></label>
    </div>
  </section>
  <div class="home-sheet">
    <section class="section categories-section"><div class="section-head"><div><h2><span class="heading-icon">▣</span>${t('categories')}</h2></div><button class="text-button" data-route="explore">همه دسته‌بندی‌ها ‹</button></div>${categoryGrid()}</section>
    <section class="section"><div class="section-head"><div><h2><span class="heading-icon">★</span>${t('featured')}</h2></div><button class="text-button" data-category="events">مشاهده همه ‹</button></div><div class="horizontal-list">
      <article class="feature-card event-card" data-listing="20" tabindex="0" role="button"><img class="feature-photo" src="./assets/events/royal-show.webp" alt="" /><span class="pill">رویداد</span><div><h3>نمایشگاه سلطنتی ملبورن</h3><p>۲۴ سپتامبر تا ۴ اکتبر · Showgrounds</p></div></article>
      <article class="feature-card sport-card" data-listing="21" tabindex="0" role="button"><img class="feature-photo" src="./assets/events/melbourne-fringe.webp" alt="" /><span class="pill">هنر</span><div><h3>فستیوال فرینج ملبورن</h3><p>۲۹ سپتامبر تا ۱۸ اکتبر · سراسر شهر</p></div></article>
      <article class="feature-card culture-card" data-listing="23" tabindex="0" role="button"><img class="feature-photo" src="./assets/events/ngv-friday-nights.webp" alt="" /><span class="pill">فرهنگی</span><div><h3>شب‌های جمعه NGV</h3><p>تا ۲ اکتبر · گالری ملی ویکتوریا</p></div></article>
    </div></section>
    <section class="section nearby-section"><div class="section-head"><div><h2>${t('nearby')}</h2><p>مرکز ملبورن و اطراف</p></div></div><div class="listing-stack">${[1, 22, 40].map(id => listings.find(item => item.id === id)).map(listingCard).join('')}</div></section><p class="prototype-note">رویدادها و کسب‌وکارها از منابع رسمی یا وب‌سایت خود مجموعه گردآوری شده‌اند و هنوز تأیید همکاری نشده‌اند. موارد دارای برچسب «نمونه نمایشی» واقعی نیستند.</p>
  </div>`;
}

function welcome() {
  return `<section class="welcome-screen">
    <div class="welcome-shade"></div>
    <div class="welcome-brand" aria-label="استرالیای ما">
      <span class="welcome-mark">ما</span>
      <h1>Australia-ye Ma</h1>
      <p>استرالیای ما، خانه‌ی فارسی‌زبان‌های ملبورن</p>
    </div>
    <div class="welcome-sheet">
      <span class="sheet-handle" aria-hidden="true"></span>
      <h2>برای ادامه، یکی را انتخاب کنید</h2>
      <div class="entry-options">
        <button class="entry-card" data-sign-in>
          <span class="entry-icon user-entry-icon" aria-hidden="true"><i></i></span>
          <b>ورود / ثبت‌نام</b>
          <small>حساب کاربری داشته باشید</small>
          <strong aria-hidden="true">←</strong>
        </button>
        <button class="entry-card" data-enter-app>
          <span class="entry-icon guest-entry-icon" aria-hidden="true">ما</span>
          <b>ادامه به عنوان مهمان</b>
          <small>بدون ثبت‌نام وارد شوید</small>
          <strong aria-hidden="true">←</strong>
        </button>
      </div>
      <p class="welcome-legal">با ورود، <button data-demo>قوانین</button> و <button data-demo>حریم خصوصی</button> را می‌پذیرید.</p>
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
  return `<section class="explore-hero"><span class="explore-symbol" aria-hidden="true">⌕</span><div class="page-title"><h1>${t('explore')}</h1><p>${t('exploreSub')}</p></div><label class="search"><span>⌕</span><input id="exploreSearch" type="search" placeholder="${t('search')}" value="${state.query}" aria-label="جستجو" /></label></section><div class="filter-row"><button class="filter-chip ${state.filter === 'all' ? 'active' : ''}" data-filter="all">${t('all')}</button>${categories.map(c => `<button class="filter-chip ${state.filter === c.id ? 'active' : ''}" data-filter="${c.id}">${local(c)}</button>`).join('')}</div><div class="results-summary"><b>${activeCategory ? activeCategory.fa : 'همه پیشنهادها'}</b><span>${results.length.toLocaleString('fa-IR')} نتیجه</span></div><div class="listing-stack">${results.length ? results.map(listingCard).join('') : `<div class="empty-state"><div class="big-icon">⌕</div><h2>${state.language === 'fa' ? 'نتیجه‌ای پیدا نشد' : 'No results found'}</h2><p>${state.language === 'fa' ? 'عبارت یا دسته‌بندی دیگری را امتحان کن.' : 'Try another search or category.'}</p></div>`}</div>`;
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
    visas: isFa ? 'اطلاعات عمومی برای شناخت مسیرهای ویزا؛ این محتوا مشاوره مهاجرتی نیست و هیچ نتیجه‌ای را تضمین نمی‌کند.' : 'General visa-pathway information; this is not migration advice and does not guarantee an outcome.',
    events: isFa ? 'یک دورهمی محلی برای آشنایی و وقت‌گذرانی در محیطی دوستانه.' : 'A local gathering for meeting people in a friendly environment.',
    market: 'یک آگهی نمایشی برای خرید و فروش محلی کالای دست‌دوم.',
    activities: 'یک فعالیت اجتماعی نمایشی برای آشنایی با آدم‌های محلی.',
    news: 'یک خبر نمونه برای نمایش ساختار بخش خبر؛ هنوز محتوای زنده منتشر نمی‌شود.'
  };
  const statusText = item.prototype ? 'نمونه نمایشی' : item.verified ? '✓ ' + t('verified') : t('unverified');
  const primaryAction = item.sourceUrl ? `<a class="primary-button detail-link" href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer">مشاهده منبع رسمی ↗</a>` : `<button class="primary-button" data-demo>جزئیات بیشتر</button>`;
  return `<button class="back-button" data-route="${state.previousRoute}">‹ ${isFa ? 'بازگشت' : 'Back'}</button>
    ${item.image ? `<img class="detail-cover" src="${item.image}" alt="${item.imageAlt || ''}" />` : ''}
    <section class="detail-hero"><div class="detail-logo">${item.logo}</div><div class="detail-title"><span class="status ${item.prototype ? 'prototype-label' : item.verified ? 'verified' : ''}">${statusText}</span><h1>${local(item)}</h1><p>${place}</p></div><button class="save ${state.saved.has(item.id) ? 'saved' : ''}" data-save="${item.id}" aria-label="Save">${state.saved.has(item.id) ? '♥' : '♡'}</button></section>
    <div class="detail-actions">${primaryAction}<button class="secondary-button" data-save="${item.id}">${state.saved.has(item.id) ? (isFa ? 'ذخیره شد' : 'Saved') : (isFa ? 'ذخیره کن' : 'Save')}</button></div>
    <section class="detail-section"><h2>${isFa ? 'درباره' : 'About'}</h2><p>${item.descriptionFa || descriptions[item.type]}</p></section>
    <section class="trust-card"><div class="trust-icon">${item.prototype ? '!' : item.verified ? '✓' : 'i'}</div><div><h2>${item.prototype ? 'این مورد فقط برای پیش‌نمایش است' : item.verified ? 'هویت این صفحه بررسی شده' : 'این صفحه هنوز تأیید نشده'}</h2><p>${item.prototype ? 'این مورد واقعی نیست و برای کامل دیدن رابط کاربری ساخته شده است.' : item.verified ? 'اطلاعات اصلی با صاحب یا برگزارکننده تطبیق داده شده است.' : 'اطلاعات از منبع رسمی برگزارکننده یا وب‌سایت خود مجموعه خلاصه شده، اما همکاری یا مالکیت تأیید نشده است.'}</p><small>آخرین بررسی: ${item.checked || '۳ سپتامبر ۲۰۲۶'} · ${item.sourceName || 'نمونه نمایشی'}</small></div></section>
    <section class="detail-section"><h2>${isFa ? 'اطلاعات اشتباه است؟' : 'Is something incorrect?'}</h2><p>${isFa ? 'صاحب این کسب‌وکار یا برگزارکننده هستید؟ صفحه را تأیید کنید؛ یا تغییر و حذف اطلاعات را گزارش دهید.' : 'Are you the owner or organiser? Claim this page, or request a correction or removal.'}</p><div class="inline-actions"><button class="secondary-button" data-demo>${isFa ? 'تأیید مالکیت' : 'Claim listing'}</button><button class="text-danger" data-demo>${isFa ? 'گزارش یا حذف' : 'Report or remove'}</button></div></section>`;
}

function submit() {
  return `<div class="page-title"><h1>${t('submit')}</h1><p>${t('submitSub')}</p></div><div class="form-card"><div class="submission-types">${categories.slice(0,6).map(c => `<button class="submission-type" data-demo><img src="${c.icon}" alt="" />${local(c)}</button>`).join('')}</div><div class="notice">هر مورد قبل از انتشار بررسی می‌شود. با ثبت اطلاعات تأیید می‌کنی که اجازه اشتراک آن را داری.</div></div>`;
}

function profile() {
  return `<div class="page-title"><h1>${t('profile')}</h1><p>${t('profileSub')}</p></div><div class="profile-card"><div class="avatar" style="display:grid;place-items:center;margin:auto;width:64px;height:64px;font-size:24px">ک</div><h2>${state.language === 'fa' ? 'کاربر مهمان' : 'Guest user'}</h2><p style="color:var(--muted);font-size:13px">${state.language === 'fa' ? 'برای ذخیره دائمی و ثبت محتوا بعداً وارد شو.' : 'Sign-in will later enable persistent saves and submissions.'}</p><button class="primary-button" data-demo>${state.language === 'fa' ? 'ورود یا ساخت حساب' : 'Sign in or create account'}</button></div><div class="stat-row"><div class="stat"><b>${state.saved.size}</b><small>${t('saved')}</small></div><div class="stat"><b>0</b><small>${state.language === 'fa' ? 'ثبت‌ها' : 'Submissions'}</small></div><div class="stat"><b>Mel</b><small>${state.language === 'fa' ? 'شهر' : 'City'}</small></div></div>`;
}

function render() {
  const views = { welcome, home, visas, 'visa-category': visaCategoryPage, 'visa-assistant': visaAssistant, 'visa-results': visaResults, explore, communities, saved, submit, profile, detail };
  app.dataset.view = state.route;
  document.querySelector('.app-shell').classList.toggle('welcome-mode', state.route === 'welcome');
  document.querySelector('.app-shell').classList.toggle('focus-mode', state.route === 'visa-category' || state.route === 'visa-assistant' || state.route === 'visa-results');
  app.innerHTML = (views[state.route] || home)();
  document.querySelectorAll('.nav-item').forEach(button => button.classList.toggle('active', button.dataset.route === state.route || (state.route === 'communities' && button.dataset.route === 'explore') || (state.route === 'visas' && button.dataset.route === 'home')));
  document.documentElement.lang = 'fa';
  document.documentElement.dir = 'rtl';
}

function navigate(route, { replace = false, smooth = true } = {}) {
  const update = () => { state.route = route; render(); };
  if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) document.startViewTransition(update);
  else update();
  const method = replace ? 'replaceState' : 'pushState';
  history[method]({ route }, '', `${location.pathname}${location.search}#${route}`);
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
  if (event.target.closest('[data-enter-app]')) { sessionStorage.setItem('australia-ye-ma-entered', 'true'); navigate('home', { smooth: false }); return; }
  if (event.target.closest('[data-sign-in]')) { showToast('ورود و ثبت‌نام در مرحله بعدی فعال می‌شود.'); return; }
  if (event.target.closest('[data-history-back]')) { if (state.route === 'visa-assistant' && state.visaStep > 1) { state.visaStep -= 1; state.visaAnswers.pop(); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); } else history.back(); return; }
  const route = event.target.closest('[data-route]');
  if (route) { navigate(route.dataset.route); return; }
  const category = event.target.closest('[data-category]');
  if (category) { state.filter = category.dataset.category; navigate(category.dataset.category === 'community' ? 'communities' : category.dataset.category === 'visas' ? 'visas' : 'explore'); return; }
  if (event.target.closest('[data-start-visa-guide]')) { state.visaStep = 1; state.visaAnswers = []; state.selectedVisaCategory = 'all'; navigate('visa-assistant'); return; }
  const visaCategory = event.target.closest('[data-visa-category]');
  if (visaCategory) { state.selectedVisaCategory = visaCategory.dataset.visaCategory; navigate('visa-category'); return; }
  const visaAnswer = event.target.closest('[data-visa-answer]');
  if (visaAnswer) { state.visaAnswers.push(visaAnswer.dataset.visaAnswer); if (state.visaStep < 3) { state.visaStep += 1; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); } else { state.selectedVisaCategory = state.visaAnswers[0] === 'کار و مهارت' ? 'work' : state.visaAnswers[0] === 'تحصیل' ? 'study' : state.visaAnswers[0] === 'دیدار و سفر' ? 'visit' : 'family'; navigate('visa-results'); } return; }
  const filter = event.target.closest('[data-filter]');
  if (filter) { state.filter = filter.dataset.filter; render(); return; }
  const communityFilter = event.target.closest('[data-community-filter]');
  if (communityFilter) { state.communityFilter = communityFilter.dataset.communityFilter; render(); return; }
  const save = event.target.closest('[data-save]');
  if (save) { const id = Number(save.dataset.save); const adding = !state.saved.has(id); adding ? state.saved.add(id) : state.saved.delete(id); localStorage.setItem('australia-ye-ma-saved', JSON.stringify([...state.saved])); render(); showToast(adding ? t('savedToast') : t('removedToast')); return; }
  const listing = event.target.closest('[data-listing]');
  if (listing) { state.selectedItem = Number(listing.dataset.listing); state.previousRoute = state.route; navigate('detail'); return; }
  if (event.target.closest('[data-demo]')) showToast(state.language === 'fa' ? 'این بخش در نسخه بعدی فعال می‌شود.' : 'This flow comes in the next prototype.');
});

document.addEventListener('keydown', event => {
  const listing = event.target.closest?.('[data-listing]');
  if (listing && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); listing.click(); }
});

document.addEventListener('input', event => {
  if (event.target.matches('#homeSearch')) { state.query = event.target.value; if (state.query.length > 1) { state.filter = 'all'; navigate('explore', { smooth: false }); document.querySelector('#exploreSearch')?.focus(); } }
  if (event.target.matches('#exploreSearch')) { state.query = event.target.value; const cursor = event.target.selectionStart; render(); const input = document.querySelector('#exploreSearch'); input.focus(); input.setSelectionRange(cursor, cursor); }
});

render();
history.scrollRestoration = 'manual';
history.replaceState({ route: state.route }, '', location.href);
window.addEventListener('popstate', event => {
  const route = event.state?.route;
  if (!route) return;
  state.route = route;
  render();
  requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }));
});
