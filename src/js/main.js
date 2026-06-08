const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const year = document.getElementById('year');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const themeToggle = document.getElementById('theme-toggle');
const languageToggle = document.getElementById('language-toggle');
const translatableElements = document.querySelectorAll('[data-i18n]');
const regionFilter = document.getElementById('region-filter');
const locationSearch = document.getElementById('location-search');
const locationFilter = document.getElementById('location-filter');
const propertyCards = document.querySelectorAll('.property-card');
const breadcrumbRegion = document.getElementById('breadcrumb-region');
const breadcrumbLocation = document.getElementById('breadcrumb-location');
const noProperties = document.getElementById('no-properties');

const locationGroups = {
  'Jounieh District': [
    { name: 'Kaslik', count: 12 },
    { name: 'Kfarhbab', count: 8 },
    { name: 'Ghadir', count: 6 },
    { name: 'Haret Sakher', count: 4 },
    { name: 'Sarba', count: 3 }
  ],
  Keserwan: [
    { name: 'Ghosta', count: 7 },
    { name: 'Adma', count: 5 },
    { name: 'Ballouneh', count: 4 },
    { name: 'Kleiat', count: 1 }
  ],
  Metn: [
    { name: 'Dbayeh', count: 9 },
    { name: 'Antelias', count: 6 },
    { name: 'Rabieh', count: 10 }
  ],
  Beirut: [
    { name: 'Beirut', count: 14 }
  ],
  Jbeil: [
    { name: 'Jbeil', count: 6 }
  ],
  Batroun: [
    { name: 'Batroun', count: 5 }
  ]
};

const translations = {
  en: {
    'nav.properties': 'Properties',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'hero.label': 'EID Properties & Construction',
    'hero.title': 'Where Trust Meets Value',
    'hero.text': 'A luxury real estate and construction company crafting premium residences, investment properties, and timeless developments across Lebanon.',
    'hero.propertiesCta': 'Explore Signature Properties',
    'hero.contactCta': 'Private Consultation',
    'hero.established': 'Established',
    'hero.establishedText': 'Three decades of trusted real estate expertise, premium construction quality, and client-focused property guidance.',
    'properties.label': 'Featured Properties',
    'properties.title': 'Signature properties crafted for prestige, comfort, and long-term value.',
    'properties.text': 'Explore elegant homes and investment-ready spaces shaped by location, craftsmanship, and a sharp eye for detail.',
    'properties.whatsapp': 'Contact on WhatsApp',
    'about.label': 'About Us',
    'about.title': 'Built on confidence, delivered with precision.',
    'about.textOne': 'Since 1996, EID Properties & Construction has connected clients with exceptional real estate opportunities while managing construction standards with clarity, accountability, and refined taste.',
    'about.textTwo': 'Our work is guided by trust, transparent advisory, and a commitment to properties that hold practical and emotional value over time.',
    'services.label': 'Services',
    'services.title': 'Real estate expertise from vision to handover.',
    'services.salesTitle': 'Luxury Property Sales',
    'services.salesText': 'Curated residential and investment listings matched to client goals.',
    'services.constructionTitle': 'Premium Construction',
    'services.constructionText': 'Project execution focused on quality, timelines, and enduring finishes.',
    'services.investmentTitle': 'Investment Advisory',
    'services.investmentText': 'Clear market guidance for buyers, sellers, developers, and investors.',
    'services.developmentTitle': 'Real Estate Development',
    'services.developmentText': 'Planning and delivery support for refined residential environments.',
    'office.label': 'Visit Our Office',
    'office.title': 'Private consultations in the heart of Kaslik.',
    'office.locationLabel': 'Location',
    'office.address': 'Kaslik, Altavista Center<br />Lebanon',
    'office.openNow': 'Open Now',
    'office.text': 'Located in the heart of Kaslik at Altavista Center, our office welcomes clients for private real estate consultations, construction inquiries, and investment guidance.',
    'office.hoursLabel': 'Opening Hours',
    'office.weekdays': 'Monday - Saturday:',
    'office.sunday': 'Sunday:',
    'office.closed': 'Closed',
    'office.mapsCta': 'Open in Maps',
    'contact.label': 'Contact',
    'contact.title': 'Start your next property conversation.',
    'contact.text': 'Share your vision with us, and our team will guide you toward the right property, project, or investment opportunity.',
    'form.name': 'Name',
    'form.email': 'Email',
    'form.interest': 'Interest',
    'form.buying': 'Buying a property',
    'form.selling': 'Selling a property',
    'form.construction': 'Construction project',
    'form.investment': 'Investment consultation',
    'form.message': 'Message',
    'form.submit': 'Send Message',
    'footer.tagline': 'Premium real estate, construction, and investment guidance since 1996.',
    'footer.rights': 'EID Properties & Construction. All rights reserved.',
    'form.status': 'Thank you. Your message has been prepared for our team.'
  },
  ar: {
    'nav.properties': 'العقارات',
    'nav.about': 'من نحن',
    'nav.services': 'الخدمات',
    'nav.contact': 'تواصل معنا',
    'hero.label': 'عيد للعقارات والمقاولات',
    'hero.title': 'حيث تلتقي الثقة بالقيمة',
    'hero.text': 'شركة عقارية وإنشائية فاخرة تقدم مساكن راقية، وفرصا استثمارية، ومشاريع خالدة في مختلف أنحاء لبنان.',
    'hero.propertiesCta': 'استكشف العقارات المميزة',
    'hero.contactCta': 'استشارة خاصة',
    'hero.established': 'تأسست',
    'hero.establishedText': 'ثلاثة عقود من الخبرة العقارية الموثوقة، وجودة البناء الراقية، والإرشاد العقاري الذي يركز على العميل.',
    'properties.label': 'العقارات المميزة',
    'properties.title': 'عقارات استثنائية مصممة للفخامة والراحة والقيمة طويلة الأمد.',
    'properties.text': 'اكتشف منازل أنيقة ومساحات جاهزة للاستثمار تجمع بين الموقع والحرفية والنظرة الدقيقة للتفاصيل.',
    'properties.whatsapp': 'تواصل عبر واتساب',
    'about.label': 'من نحن',
    'about.title': 'نبني على الثقة ونسلم بدقة.',
    'about.textOne': 'منذ عام 1996، تربط عيد للعقارات والمقاولات عملاءها بفرص عقارية استثنائية مع إدارة معايير البناء بوضوح ومسؤولية وذوق رفيع.',
    'about.textTwo': 'يقوم عملنا على الثقة والاستشارة الشفافة والالتزام بعقارات تحمل قيمة عملية وإنسانية مع مرور الوقت.',
    'services.label': 'الخدمات',
    'services.title': 'خبرة عقارية من الرؤية حتى التسليم.',
    'services.salesTitle': 'بيع العقارات الفاخرة',
    'services.salesText': 'قوائم سكنية واستثمارية منتقاة بعناية لتناسب أهداف العملاء.',
    'services.constructionTitle': 'مقاولات فاخرة',
    'services.constructionText': 'تنفيذ مشاريع يركز على الجودة والمواعيد والتشطيبات الدائمة.',
    'services.investmentTitle': 'استشارات استثمارية',
    'services.investmentText': 'إرشاد سوقي واضح للمشترين والبائعين والمطورين والمستثمرين.',
    'services.developmentTitle': 'تطوير عقاري',
    'services.developmentText': 'دعم في التخطيط والتنفيذ لبيئات سكنية راقية.',
    'office.label': 'زوروا مكتبنا',
    'office.title': 'استشارات خاصة في قلب كسليك.',
    'office.locationLabel': 'الموقع',
    'office.address': 'كسليك، مركز ألتافيستا<br />لبنان',
    'office.openNow': 'مفتوح الآن',
    'office.text': 'يقع مكتبنا في قلب كسليك داخل مركز ألتافيستا، ونرحب بالعملاء للاستشارات العقارية الخاصة، واستفسارات البناء، والإرشاد الاستثماري.',
    'office.hoursLabel': 'ساعات العمل',
    'office.weekdays': 'الإثنين - السبت:',
    'office.sunday': 'الأحد:',
    'office.closed': 'مغلق',
    'office.mapsCta': 'افتح في الخرائط',
    'contact.label': 'تواصل معنا',
    'contact.title': 'ابدأ حديثك العقاري التالي.',
    'contact.text': 'شاركنا رؤيتك، وسيرشدك فريقنا نحو العقار أو المشروع أو فرصة الاستثمار المناسبة.',
    'form.name': 'الاسم',
    'form.email': 'البريد الإلكتروني',
    'form.interest': 'الاهتمام',
    'form.buying': 'شراء عقار',
    'form.selling': 'بيع عقار',
    'form.construction': 'مشروع بناء',
    'form.investment': 'استشارة استثمارية',
    'form.message': 'الرسالة',
    'form.submit': 'إرسال الرسالة',
    'footer.tagline': 'إرشاد عقاري وإنشائي واستثماري فاخر منذ عام 1996.',
    'footer.rights': 'عيد للعقارات والمقاولات. جميع الحقوق محفوظة.',
    'form.status': 'شكرا لك. تم تحضير رسالتك لفريقنا.'
  }
};

let currentLanguage = localStorage.getItem('eidLanguage') || 'en';

const getLocationCount = (locationName) => {
  const locations = Object.values(locationGroups).flat();
  const location = locations.find((item) => item.name === locationName);

  return location ? location.count : 0;
};

const renderLocationOptions = () => {
  if (!regionFilter || !locationFilter) {
    return;
  }

  const selectedRegion = regionFilter.value;
  const selectedLocation = locationFilter.value;
  const searchTerm = locationSearch ? locationSearch.value.trim().toLowerCase() : '';
  const groups = selectedRegion === 'all' ? Object.entries(locationGroups) : [[selectedRegion, locationGroups[selectedRegion] || []]];

  locationFilter.innerHTML = '';

  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = 'All Locations';
  locationFilter.appendChild(allOption);

  groups.forEach(([regionName, locations]) => {
    const matchingLocations = locations.filter((location) => location.name.toLowerCase().includes(searchTerm));

    if (!matchingLocations.length) {
      return;
    }

    const optionGroup = document.createElement('optgroup');
    optionGroup.label = regionName.toUpperCase();

    matchingLocations.forEach((location) => {
      const option = document.createElement('option');
      option.value = location.name;
      option.textContent = `${location.name} (${location.count})`;
      optionGroup.appendChild(option);
    });

    locationFilter.appendChild(optionGroup);
  });

  const hasSelectedLocation = Array.from(locationFilter.options).some((option) => option.value === selectedLocation);
  locationFilter.value = hasSelectedLocation ? selectedLocation : 'all';
};

const updatePropertyFilters = () => {
  if (!regionFilter || !locationFilter) {
    return;
  }

  const selectedRegion = regionFilter.value;
  const selectedLocation = locationFilter.value;
  let visibleCount = 0;

  propertyCards.forEach((card) => {
    const regionMatches = selectedRegion === 'all' || card.dataset.region === selectedRegion;
    const locationMatches = selectedLocation === 'all' || card.dataset.location === selectedLocation;
    const isVisible = regionMatches && locationMatches;

    card.classList.toggle('hidden', !isVisible);

    if (isVisible) {
      visibleCount += 1;
    }
  });

  if (breadcrumbRegion) {
    breadcrumbRegion.textContent = selectedRegion === 'all' ? 'All Regions' : selectedRegion;
  }

  if (breadcrumbLocation) {
    const count = selectedLocation === 'all' ? '' : ` (${getLocationCount(selectedLocation)})`;
    breadcrumbLocation.textContent = selectedLocation === 'all' ? 'All Locations' : `${selectedLocation}${count}`;
  }

  if (noProperties) {
    noProperties.classList.toggle('hidden', visibleCount > 0);
  }
};

const syncPropertyFilters = () => {
  renderLocationOptions();
  updatePropertyFilters();
};

const applyTheme = (theme) => {
  const isLight = theme === 'light';
  document.body.classList.toggle('light-mode', isLight);
  localStorage.setItem('eidTheme', isLight ? 'light' : 'dark');
};

const applyLanguage = (language) => {
  currentLanguage = language;
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

  translatableElements.forEach((element) => {
    const key = element.dataset.i18n;
    const translation = translations[language][key];

    if (translation) {
      element.innerHTML = translation;
    }
  });

  localStorage.setItem('eidLanguage', language);
};

if (year) {
  year.textContent = new Date().getFullYear();
}

applyTheme(localStorage.getItem('eidTheme') || 'dark');
applyLanguage(currentLanguage);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(nextTheme);
  });
}

if (languageToggle) {
  languageToggle.addEventListener('click', () => {
    applyLanguage(currentLanguage === 'en' ? 'ar' : 'en');
  });
}

if (regionFilter && locationSearch && locationFilter) {
  syncPropertyFilters();

  regionFilter.addEventListener('change', () => {
    locationSearch.value = '';
    syncPropertyFilters();
  });

  locationSearch.addEventListener('input', syncPropertyFilters);
  locationFilter.addEventListener('change', updatePropertyFilters);
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';

    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.classList.toggle('hidden');
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.add('hidden');
    });
  });
}

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    contactForm.reset();
    formStatus.textContent = translations[currentLanguage]['form.status'];
    formStatus.classList.remove('hidden');
  });
}
