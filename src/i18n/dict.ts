/**
 * Landing copy dictionary (EN + RU). Single source for all display strings.
 * Language-invariant tokens (wordmark, social labels, hrefs, raw metric numbers)
 * live in the components, not here.
 */

export type Lang = 'en' | 'ru';

export interface NavLink {
  href: string;
  label: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Pillar {
  title: string;
  body: string;
}

export interface TrackRow {
  label: string;
  value: string;
}

/** Kill-feature line split so the emphasized figure keeps its own <b> in both languages. */
export interface Kill {
  pre: string;
  bold: string;
  post: string;
}

export interface ContactCopy {
  title: string;
  copy: string;
  copied: string;
  gmail: string;
  mail: string;
}

export interface Copy {
  nav: NavLink[];
  cta: string;
  contact: ContactCopy;
  /** Browser-tab <title>, per language. */
  docTitle: string;
  heroEyebrow: string;
  heroline: string;
  lede: string;
  heroMetrics: Metric[];
  founderKicker: string;
  founderName: string;
  founderBio: string;
  flagshipKicker: string;
  flagshipTitle: string;
  flagshipIntro: string;
  pillars: Pillar[];
  kill: Kill;
  upcomingKicker: string;
  upcomingTitle: string;
  upcomingIntro: string;
  upcomingPillars: Pillar[];
  /** Status line under the tiles; reuses the Kill shape for the accented ending. */
  upcomingStatus: Kill;
  trackKicker: string;
  trackTitle: string;
  trackBody: string;
  trackRecord: TrackRow[];
  joinKicker: string;
  joinTitle: string;
  joinBody: string;
  joinNote: string;
  footerTagline: string;
  footerRights: string;
}

const en: Copy = {
  nav: [
    { href: '#founder', label: 'Founder' },
    { href: '#flagship', label: 'Flagship' },
    { href: '#upcoming', label: 'In the works' },
    { href: '#track', label: 'Track record' },
    { href: '#join', label: 'Join' }
  ],
  cta: 'Get in touch',
  contact: {
    title: 'Get in touch',
    copy: 'Copy',
    copied: 'Copied ✓',
    gmail: 'Open in Gmail',
    mail: 'Mail client'
  },
  docTitle: '84softworks · Reliable B2B software',
  heroEyebrow: 'Reliable B2B software · Building since 2023',
  heroline: 'I turn business problems into production software',
  lede: 'Andrei Baranov, Founder & CEO of 84softworks. Reliable B2B AI – architected end to end',
  heroMetrics: [
    { value: '250K+', label: 'calls' },
    { value: '500K+', label: 'users' },
    { value: '14M+', label: 'payments' },
    { value: '11', label: 'products shipped' }
  ],
  founderKicker: 'Founder & CEO',
  founderName: 'Andrei Baranov · beiroun',
  founderBio:
    "A builder-leader who's been through every layer of the stack – backend, mobile, AI, infrastructure. I don't just write code; I turn business goals into products through architecture, team and process. As Head of Development I led a team of six and shipped eleven production products at scale: AI call analytics, high-load mobile apps, bare-metal Kubernetes. Now I'm building 84softworks – reliable B2B software that holds up in production.",
  flagshipKicker: 'Flagship – case study',
  flagshipTitle: 'FusionDynamics',
  flagshipIntro:
    'An AI analytics and communications system I architected and built with my team – running in production, not in slides.',
  pillars: [
    {
      title: 'SenseFlow – AI analytics core',
      body: 'Transcription, diarization, 24 marketing signals, a RAG assistant and automatic ticketing – a task router that parallelizes AI work, a computing environment for heavy analysis on cheap hardware, and a chat/voice environment.'
    },
    {
      title: 'TLDR Messenger – in-house messaging',
      body: 'A fully in-house messaging platform – operator and client apps, attachments, surveys, real-time delivery.'
    }
  ],
  kill: {
    pre: 'The entire AI stack squeezed onto two consumer GPUs – ',
    bold: 'under $2,700',
    post: ' of hardware. Enterprise-grade insight without enterprise hardware'
  },
  upcomingKicker: 'In development',
  upcomingTitle: 'ThunderVox',
  upcomingIntro:
    'A SIP platform for devices at physical endpoints – intercom panels, elevators, panic buttons, SOS points. An 84softworks own product, in active development.',
  upcomingPillars: [
    {
      title: 'Push-wait at the core',
      body: "A call from the panel must reach a phone that's asleep. That pain comes from real large-scale production, and it sits at the core rather than in a bolted-on module: a push wakes the app, the call is parked and resumed the moment it registers. Bring any push provider – integration is a thin contract – we never store your keys on our server."
    },
    {
      title: 'Scale of a different class',
      body: 'The solution grew out of a live deployment: 5,000 active registrations on top of a directory of 500,000 internal numbers – and the core is designed for far more, toward 100K active connections and millions of numbers. A different class of problem than contact-center PBXes: here an offline subscriber is a row in the directory, not load.'
    },
    {
      title: 'Media behind NAT + video',
      body: 'Panel behind a router, phone on mobile data – two-way audio and panel video, no one-way silence. Kamailio signaling with an independently scalable media layer.'
    },
    {
      title: 'Vendor quirks, built in',
      body: 'Every panel vendor speaks its own dialect of SIP. Hardware-specific adapters ship in the box – not as «finish it yourself».'
    }
  ],
  upcomingStatus: {
    pre: 'The core is written and tested against a real production setup. ',
    bold: 'Screenshots and demo on the way',
    post: '.'
  },
  trackKicker: 'Track record',
  trackTitle: 'The numbers',
  trackBody:
    'There are years behind these numbers, not one lucky launch. A small team under my lead scaled these products in production, and most of it still carries real load today.',
  trackRecord: [
    { label: 'Calls analyzed', value: '250K+' },
    { label: 'Users · MAU', value: '500K+ · 200K' },
    { label: 'Client requests', value: '1.5M+' },
    { label: 'Payments processed', value: '14M+' },
    { label: 'Intercoms & cameras managed', value: '5,000 · 20,000' },
    { label: 'Engineers on the team', value: '6' }
  ],
  joinKicker: 'Join',
  joinTitle: 'Always open to exceptional people',
  joinBody:
    "Not actively hiring right now – but if you build software that holds and want to work with someone who's been through every layer, reach out.",
  joinNote: 'I reply personally – usually within a day',
  footerTagline: 'Building since 2023 · 84softworks.com',
  footerRights: '© 2026 84softworks'
};

const ru: Copy = {
  nav: [
    { href: '#founder', label: 'Фаундер' },
    { href: '#flagship', label: 'Флагман' },
    { href: '#upcoming', label: 'В разработке' },
    { href: '#track', label: 'Опыт' },
    { href: '#join', label: 'Команда' }
  ],
  cta: 'Связаться',
  contact: {
    title: 'Связаться',
    copy: 'Копировать',
    copied: 'Скопировано ✓',
    gmail: 'Открыть в Gmail',
    mail: 'Почтовый клиент'
  },
  docTitle: '84softworks · Надёжный B2B-софт',
  heroEyebrow: 'Надёжный B2B-софт · строим с 2023',
  heroline: 'Превращаю бизнес-задачи в продакшн-софт',
  lede: 'Андрей Баранов, Founder & CEO 84softworks. Надёжный B2B AI – продуман до последнего слоя',
  heroMetrics: [
    { value: '250K+', label: 'звонков' },
    { value: '500K+', label: 'пользователей' },
    { value: '14M+', label: 'платежей' },
    { value: '11', label: 'продуктов в продакшене' }
  ],
  founderKicker: 'Основатель и CEO',
  founderName: 'Андрей Баранов · beiroun',
  founderBio:
    'Руководитель, прошедший каждый слой стека – бэкенд, мобилки, AI, инфраструктуру. Не просто пишу код: превращаю бизнес-цели в продукты через архитектуру, команду и процессы. Как Head of Development вёл команду из шести и вывел в прод одиннадцать продуктов под нагрузкой: AI-аналитику звонков, хайлоуд-мобилки, bare-metal Kubernetes. Сейчас строю 84softworks – надёжный B2B-софт, который держит продакшн.',
  flagshipKicker: 'Флагман – кейс',
  flagshipTitle: 'FusionDynamics',
  flagshipIntro:
    'AI-система аналитики и коммуникаций, которую я спроектировал и построил с командой – работает в проде, а не в слайдах.',
  pillars: [
    {
      title: 'SenseFlow – ядро AI-аналитики',
      body: 'Транскрибация, диаризация, 24 маркетинговых сигнала, RAG-ассистент и автосоздание заявок – роутер, что параллелит AI-задачи, вычислительное окружение для тяжёлого анализа на дешёвом железе и чат-голосовое окружение.'
    },
    {
      title: 'TLDR Messenger – свой мессенджер',
      body: 'Полностью собственный мессенджер – операторские и клиентские приложения, вложения, опросы, доставка в реальном времени.'
    }
  ],
  kill: {
    pre: 'Весь AI-стек уместился в две потребительские GPU – ',
    bold: 'меньше $2 700',
    post: ' железа. Корпоративная аналитика без корпоративного железа'
  },
  upcomingKicker: 'В разработке',
  upcomingTitle: 'ThunderVox',
  upcomingIntro:
    'SIP-платформа для устройств на физических точках – домофоны, лифты, тревожные кнопки, SOS-колонны. Собственный продукт 84softworks, в активной разработке.',
  upcomingPillars: [
    {
      title: 'Push-wait – в основе',
      body: 'Вызов с панели должен дойти до телефона, который спит. Это боль реального большого продакшена, и она лежит в основе ядра, а не в модуле сверху: пуш будит приложение, вызов паркуется и возобновляется в момент регистрации. Провайдер пушей – любой ваш: интеграция по тонкому контракту, мы не храним ключи на нашем сервере.'
    },
    {
      title: 'Масштаб другого класса',
      body: 'Решение выросло из живого контура: 5 000 активных регистраций поверх базы в 500 000 внутренних номеров – и ядро проектируется под кратно большее, к 100K активных подключений и миллионам номеров. Это другой класс задачи, чем АТС контакт-центров: оффлайн-абонент здесь – строка в справочнике, а не нагрузка.'
    },
    {
      title: 'Медиа за NAT + видео',
      body: 'Панель за роутером, телефон в мобильной сети – звук в обе стороны и видео с панели, без «тишины в одну сторону». Kamailio-сигнализация и отдельно масштабируемый медиа-слой.'
    },
    {
      title: 'Вендорская специфика из коробки',
      body: 'У каждого производителя панелей свои кривости в SIP. Адаптеры под конкретное железо – встроены, а не «допилите сами».'
    }
  ],
  upcomingStatus: {
    pre: 'Ядро написано и протестировано на реальном контуре. ',
    bold: 'Ожидайте скриншоты и демо',
    post: '.'
  },
  trackKicker: 'Опыт',
  trackTitle: 'Цифры',
  trackBody:
    'За этими числами – годы работы, а не один удачный запуск. Небольшая команда под моим руководством довела продукты до такого масштаба в проде, и большинство контуров держит нагрузку до сих пор.',
  trackRecord: [
    { label: 'Проанализировано звонков', value: '250K+' },
    { label: 'Пользователи · MAU', value: '500K+ · 200K' },
    { label: 'Обращений от клиентов', value: '1.5M+' },
    { label: 'Проведено платежей', value: '14M+' },
    { label: 'Домофонов и камер под управлением', value: '5,000 · 20,000' },
    { label: 'Инженеров в команде', value: '6' }
  ],
  joinKicker: 'Команда',
  joinTitle: 'Всегда открыт для сильных',
  joinBody:
    'Прямо сейчас активного найма нет – но если ты делаешь софт, который держит, и хочешь работать с тем, кто прошёл каждый слой стека, напиши.',
  joinNote: 'Отвечаю лично – обычно в течение дня',
  footerTagline: 'Строим с 2023 · 84softworks.com',
  footerRights: '© 2026 84softworks'
};

export const dict: Record<Lang, Copy> = { en, ru };
