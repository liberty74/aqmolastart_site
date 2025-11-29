
import React, { useState, useEffect } from 'react';
import { Home, Search, Calendar, User, Bell, ArrowLeft, PlusCircle, X, MessageCircle, Briefcase, BookOpen, ChevronRight, CheckSquare, Hammer, CheckCircle2 } from 'lucide-react';
import { Startup, Event, Category, UserProfile, JobOpportunity, WikiArticle, RoadmapPhase } from './types';
import { StartupCard } from './components/StartupCard';
import { EventCard } from './components/EventCard';
import { AIChatModal } from './components/AIChatModal';

// --- ДАННЫЕ (MOCK DATA) ---

const MOCK_STARTUPS: Startup[] = [
  {
    id: '1',
    name: 'EcoField KZ',
    description: 'Система умного полива для полей Акмолинской области. Экономия воды до 40% за счет датчиков влажности.',
    category: Category.AGRITECH,
    logoUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=200', 
    founders: ['Азамат К.'],
    stage: 'MVP',
    location: 'Степногорск'
  },
  {
    id: '2',
    name: 'Burabay Travel',
    description: 'Единый туристический портал Борового. Бронирование домиков, гидов и конных прогулок в один клик.',
    category: Category.TOURISM,
    logoUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=200', 
    founders: ['Анастасия С.'],
    stage: 'Growth',
    location: 'Бурабай'
  },
  {
    id: '3',
    name: 'Smart School',
    description: 'Онлайн-платформа для обучения программированию детей из сельских школ региона.',
    category: Category.EDUCATION,
    logoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=200', 
    founders: ['Арман К.'],
    stage: 'Idea',
    location: 'Кокшетау'
  },
   {
    id: '4',
    name: 'Green Recycling',
    description: 'Переработка пластика в уличную мебель для парков. Экологический проект чистого города.',
    category: Category.ECOLOGY, 
    logoUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=200',
    founders: ['Команда SET CHE_TAM'],
    stage: 'MVP',
    location: 'Кокшетау'
  }
];

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Хакатон: Code masters',
    date: '15 Дек',
    location: 'Aqmola Hub Кокшетау',
    type: 'Hackathon',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Встреча стартаперов',
    date: '22 Дек',
    location: 'Astana hub',
    type: 'Meetup',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800'
  }
];

const MOCK_NOTIFICATIONS = [
  { id: 1, title: "Регистрация открыта", text: "Началась регистрация на хакатон Code mas!", time: "2 ч. назад" },
  { id: 2, title: "Новый стартап", text: "Проект EcoField KZ ищет инвестора.", time: "5 ч. назад" },
  { id: 3, title: "Обновление профиля", text: "Не забудьте заполнить навыки.", time: "1 д. назад" },
];

const MOCK_JOBS: JobOpportunity[] = [
  {
    id: '1',
    role: 'Frontend Разработчик',
    startupName: 'EcoField KZ',
    salary: '150 000 ₸',
    type: 'Project',
    description: 'Ищем студента для верстки админ-панели на React. Опыт работы с API обязателен.'
  },
  {
    id: '2',
    role: 'SMM Менеджер',
    startupName: 'Burabay Travel',
    salary: 'Волонтерство',
    type: 'Volunteer',
    description: 'Нужна помощь с ведением Instagram. Отличная возможность пополнить портфолио.'
  },
  {
    id: '3',
    role: 'Sales Менеджер',
    startupName: 'Green Recycling',
    salary: '% от продаж',
    type: 'Part-time',
    description: 'Продажа уличной мебели госучреждениям и частным лицам. Свободный график.'
  }
];

const MOCK_WIKI: WikiArticle[] = [
  {
    id: '1',
    title: 'Как открыть ТОО в Казахстане?',
    category: 'Юридические вопросы',
    readTime: '5 мин',
    content: 'Для открытия ТОО вам необходимо: 1. Выбрать название и проверить его уникальность. 2. Определиться с юридическим адресом. 3. Подготовить Устав и Учредительный договор. 4. Подать заявку через eGov.kz. Это занимает около 30 минут при наличии ЭЦП.'
  },
  {
    id: '2',
    title: 'Гранты до 5 млн тенге',
    category: 'Финансы',
    readTime: '3 мин',
    content: 'Государственная программа поддержки молодых предпринимателей предоставляет гранты до 5 млн тенге на безвозмездной основе. Основные требования: возраст до 35 лет, наличие сертификата "Бастау Бизнес" и инновационная составляющая проекта.'
  },
  {
    id: '3',
    title: 'Как составить Pitch Deck',
    category: 'Обучение',
    readTime: '7 мин',
    content: 'Идеальная презентация для инвестора должна содержать 10-12 слайдов: Проблема, Решение, Рынок, Бизнес-модель, Конкуренты, Команда, Финансы. Главное правило: один слайд — одна мысль. Используйте больше графики и меньше текста.'
  }
];

const INITIAL_ROADMAP: RoadmapPhase[] = [
  {
    id: 'phase1',
    title: '1. Идея (Начало)',
    description: 'Придумываем, что будем делать.',
    steps: [
      { id: '1-1', title: 'Придумать идею и название', isCompleted: true },
      { id: '1-2', title: 'Глянуть конкурентов (кто уже это делает)', isCompleted: true },
      { id: '1-3', title: 'Спросить 5 друзей, нужна ли им такая штука', isCompleted: false },
    ]
  },
  {
    id: 'phase2',
    title: '2. Делаем MVP (Прототип)',
    description: 'Самая главная часть работы.',
    steps: [
      { id: '2-1', title: 'Нарисовать на листочке, как это выглядит', isCompleted: false },
      { id: '2-2', title: 'Сделать первую рабочую версию', isCompleted: false },
      { id: '2-3', title: 'Проверить, что все кнопки нажимаются', isCompleted: false },
      { id: '2-4', title: 'Исправить ошибки (баги)', isCompleted: false },
    ]
  },
  {
    id: 'phase3',
    title: '3. Первый запуск',
    description: 'Показываем людям.',
    steps: [
      { id: '3-1', title: 'Показать проект другим людям', isCompleted: false },
      { id: '3-2', title: 'Получить первые отзывы', isCompleted: false },
    ]
  }
];

// Серый человечек для всех
const GENERIC_AVATAR = "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";

const USER: UserProfile = {
  name: "Арман К",
  role: "Student",
  avatarUrl: GENERIC_AVATAR,
  skills: ["Python"],
  bio: "Учусь программировать и делать проекты"
};

// --- APP COMPONENT ---

enum Tab {
  HOME = 'home',
  STARTUPS = 'startups',
  CREATE = 'create',
  EVENTS = 'events',
  PROFILE = 'profile'
}

type ViewState = 'main' | 'search' | 'notifications' | 'jobs' | 'wiki' | 'builder';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<WikiArticle | null>(null);
  const [viewState, setViewState] = useState<ViewState>('main');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('Все');
  
  // Состояние для RoadMap
  const [roadmap, setRoadmap] = useState<RoadmapPhase[]>(INITIAL_ROADMAP);

  // --- Helpers ---

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleRoadmapStep = (phaseId: string, stepId: string) => {
    setRoadmap(prev => prev.map(phase => {
      if (phase.id !== phaseId) return phase;
      return {
        ...phase,
        steps: phase.steps.map(step => {
          if (step.id !== stepId) return step;
          return { ...step, isCompleted: !step.isCompleted };
        })
      };
    }));
  };

  const calculateProgress = () => {
    let total = 0;
    let completed = 0;
    roadmap.forEach(phase => {
      phase.steps.forEach(step => {
        total++;
        if (step.isCompleted) completed++;
      });
    });
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const filteredStartups = MOCK_STARTUPS.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- Views ---

  const renderHome = () => (
    <div className="space-y-6 pb-24 pt-2">
      {/* Hero Banner */}
      <div className="mx-4 bg-blue-600 rounded-lg p-6 text-white shadow-sm relative overflow-hidden">
        <div className="relative z-10">
            <h2 className="text-xl font-bold mb-2">Aqmola Start</h2>
            <p className="text-blue-100 text-sm mb-4">Платформа развития региона.</p>
            <button 
                onClick={() => setActiveTab(Tab.CREATE)}
                className="bg-white text-blue-600 px-4 py-2 rounded text-sm font-bold shadow-sm"
            >
                Добавить проект
            </button>
        </div>
        {/* Декоративный фон */}
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-blue-500 to-transparent opacity-50"></div>
      </div>

      {/* Services Grid (New Features) */}
      <div className="px-4">
        <h3 className="font-bold text-gray-900 text-lg mb-3">Сервисы</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
            {/* Конструктор - на всю ширину для акцента на мобилке, обычный на десктопе */}
            <button 
                onClick={() => setViewState('builder')}
                className="col-span-2 bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-sm flex items-center space-x-4 active:bg-blue-100"
            >
                <div className="bg-blue-600 p-2.5 rounded-lg text-white">
                    <Hammer size={24} />
                </div>
                <div className="text-left">
                    <span className="font-bold text-gray-900 text-sm block">Конструктор проекта</span>
                    <span className="text-xs text-blue-600 mt-0.5 block">Создай проект по шагам</span>
                </div>
            </button>

            <button 
                onClick={() => setViewState('jobs')}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-start active:bg-gray-50"
            >
                <div className="bg-blue-100 p-2 rounded-lg mb-3">
                    <Briefcase className="text-blue-600" size={20} />
                </div>
                <span className="font-bold text-gray-900 text-sm">Вакансии</span>
                <span className="text-xs text-gray-500 mt-1">Найти команду</span>
            </button>
            <button 
                onClick={() => setViewState('wiki')}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-start active:bg-gray-50"
            >
                <div className="bg-blue-100 p-2 rounded-lg mb-3">
                    <BookOpen className="text-blue-600" size={20} />
                </div>
                <span className="font-bold text-gray-900 text-sm">База знаний</span>
                <span className="text-xs text-gray-500 mt-1">Статьи и гайды</span>
            </button>
        </div>
      </div>

      {/* Блок Хакатонов (переход на афишу) */}
      <div className="mx-4 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between active:bg-blue-100 transition-colors" onClick={() => setActiveTab(Tab.EVENTS)}>
        <div>
            <h3 className="font-bold text-blue-700 text-sm">Идут хакатоны!</h3>
            <p className="text-xs text-blue-600">Успей подать заявку на участие.</p>
        </div>
        <ArrowLeft className="rotate-180 text-blue-500" size={20} />
      </div>

      {/* Startups List Preview */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-3">
             <h3 className="font-bold text-gray-900 text-lg">Новые проекты</h3>
             <button onClick={() => setActiveTab(Tab.STARTUPS)} className="text-blue-600 text-sm font-medium">Все</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {MOCK_STARTUPS.slice(0, 3).map(s => (
             <StartupCard key={s.id} startup={s} onClick={() => setSelectedStartup(s)} />
          ))}
        </div>
      </div>

      {/* Telegram Bot Button */}
      <div className="px-4 mt-2">
        <a 
            href="https://t.me/AqmolaStartBot"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3.5 rounded-lg font-bold shadow-sm flex items-center justify-center space-x-2 active:bg-sky-700 transition-colors"
        >
            <MessageCircle size={20} />
            <span>Наш Telegram Бот</span>
        </a>
      </div>
    </div>
  );

  const renderStartups = () => {
    // Названия кнопок
    const categories = ['Все', 'Экология', 'Туризм', 'Обучение'];
    
    const displayStartups = MOCK_STARTUPS.filter(s => {
        if (currentCategory === 'Все') return true;
        if (currentCategory === 'Экология') return s.category === Category.ECOLOGY || s.category === Category.AGRITECH; // Включаем Агро в Экологию для простоты
        if (currentCategory === 'Туризм') return s.category === Category.TOURISM;
        if (currentCategory === 'Обучение') return s.category === Category.EDUCATION;
        return false;
    });

    return (
        <div className="px-4 pb-24 pt-4">
        <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Каталог</h2>
        </div>
        
        {/* Кнопки категорий */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6 max-w-2xl">
            {categories.map(cat => (
                <button 
                    key={cat}
                    onClick={() => setCurrentCategory(cat)}
                    className={`py-3 px-2 rounded text-center text-sm font-bold border transition-colors ${
                        currentCategory === cat 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {displayStartups.length > 0 ? (
                displayStartups.map(s => <StartupCard key={s.id} startup={s} onClick={() => setSelectedStartup(s)} />)
            ) : (
                <div className="col-span-full text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500 text-sm">В этой категории пока нет проектов.</p>
                </div>
            )}
        </div>
        </div>
    );
  };

  const renderEvents = () => (
    <div className="px-4 pb-24 pt-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Афиша событий</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {MOCK_EVENTS.map(e => <EventCard key={e.id} event={e} />)}
      </div>
    </div>
  );

  const renderCreate = () => (
    <div className="px-4 pb-24 pt-4 h-full flex flex-col justify-center items-center text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <PlusCircle size={40} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Создать заявку</h2>
        <p className="text-gray-500 text-sm max-w-xs mb-8">
            Здесь вы можете подать заявку на регистрацию стартапа или добавить мероприятие в афишу региона.
        </p>
        <button className="w-full max-w-xs bg-blue-600 text-white py-3 rounded font-bold shadow-sm active:scale-95 transition-transform">
            Заполнить форму
        </button>
    </div>
  );

  const renderProfile = () => (
    <div className="px-4 pb-24 pt-8 max-w-2xl mx-auto">
      <div className="flex flex-col items-center mb-8">
        <div className="w-28 h-28 bg-gray-200 rounded-full mb-4 overflow-hidden border-2 border-white shadow-md">
            <img src={GENERIC_AVATAR} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">{USER.name}</h2>
        <span className="text-blue-600 text-sm font-medium mb-2 bg-blue-50 px-3 py-1 rounded-full">{USER.role}</span>
        <p className="text-gray-600 text-sm text-center px-6 mt-2">{USER.bio}</p>
      </div>

      <div className="space-y-3">
        <button className="w-full p-4 bg-white border border-gray-200 rounded flex justify-between items-center text-gray-700 font-medium active:bg-gray-50">
            <span>Мои проекты</span>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">2</span>
        </button>
        <button className="w-full p-4 bg-white border border-gray-200 rounded text-left font-medium text-gray-700 active:bg-gray-50">
            Настройки аккаунта
        </button>
        <button className="w-full p-4 bg-white border border-gray-200 rounded text-left font-medium text-red-600 active:bg-red-50 mt-4">
            Выйти
        </button>
      </div>
    </div>
  );

  // --- Overlay Views (Search, Notifications, Jobs, Wiki, Builder) ---

  const renderJobsView = () => (
    <div className="fixed top-0 bottom-0 left-0 right-0 mx-auto max-w-7xl bg-gray-50 z-50 flex flex-col animate-in slide-in-from-right duration-200 shadow-xl border-x border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center space-x-3 bg-white shadow-sm sticky top-0">
            <button onClick={() => setViewState('main')} className="p-2 -ml-2 rounded-full hover:bg-gray-100"><ArrowLeft size={24} className="text-gray-600" /></button>
            <h2 className="font-bold text-lg text-gray-900">Биржа вакансий</h2>
        </div>
        <div className="p-4 overflow-y-auto pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_JOBS.map(job => (
                    <div key={job.id} className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm h-full flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-gray-900">{job.role}</h3>
                                    <p className="text-blue-600 text-sm font-medium">{job.startupName}</p>
                                </div>
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-bold border border-green-200 whitespace-nowrap ml-2">{job.salary}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3 leading-snug">{job.description}</p>
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                            <span className="text-xs text-gray-400 font-medium uppercase">{job.type}</span>
                            <button className="text-blue-600 text-sm font-bold active:text-blue-800">Откликнуться</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );

  const renderWikiView = () => (
    <div className="fixed top-0 bottom-0 left-0 right-0 mx-auto max-w-7xl bg-gray-50 z-50 flex flex-col animate-in slide-in-from-right duration-200 shadow-xl border-x border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center space-x-3 bg-white shadow-sm sticky top-0">
            <button onClick={() => setViewState('main')} className="p-2 -ml-2 rounded-full hover:bg-gray-100"><ArrowLeft size={24} className="text-gray-600" /></button>
            <h2 className="font-bold text-lg text-gray-900">База знаний</h2>
        </div>
        <div className="p-4 overflow-y-auto pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {MOCK_WIKI.map(article => (
                    <button 
                        key={article.id} 
                        onClick={() => setSelectedArticle(article)}
                        className="w-full bg-white p-4 rounded-lg border border-gray-300 shadow-sm flex flex-col justify-between text-left active:bg-gray-50 h-full"
                    >
                        <div>
                            <span className="text-xs text-blue-600 font-bold uppercase mb-1 block">{article.category}</span>
                            <h3 className="font-bold text-gray-900 text-base mb-2">{article.title}</h3>
                        </div>
                        <div className="flex justify-between items-center w-full mt-2">
                             <span className="text-xs text-gray-400">{article.readTime} чтения</span>
                             <ChevronRight className="text-gray-400" size={20} />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    </div>
  );

  const renderBuilderView = () => (
    <div className="fixed top-0 bottom-0 left-0 right-0 mx-auto max-w-7xl bg-gray-50 z-50 flex flex-col animate-in slide-in-from-right duration-200 shadow-xl border-x border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center space-x-3 bg-white shadow-sm sticky top-0 z-10">
            <button onClick={() => setViewState('main')} className="p-2 -ml-2 rounded-full hover:bg-gray-100"><ArrowLeft size={24} className="text-gray-600" /></button>
            <div className="flex-1">
                <h2 className="font-bold text-lg text-gray-900">Мой проект</h2>
                <div className="flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${calculateProgress()}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-blue-600">{calculateProgress()}%</span>
                </div>
            </div>
        </div>
        
        <div className="p-4 overflow-y-auto pb-24">
            <div className="space-y-6 max-w-3xl mx-auto">
                {roadmap.map(phase => (
                    <div key={phase.id} className="bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-200">
                            <h3 className="font-bold text-gray-900">{phase.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">{phase.description}</p>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {phase.steps.map(step => (
                                <div 
                                    key={step.id} 
                                    className="p-4 flex items-start space-x-3 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => toggleRoadmapStep(phase.id, step.id)}
                                >
                                    <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${step.isCompleted ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}>
                                        {step.isCompleted && <CheckSquare size={14} className="text-white" />}
                                    </div>
                                    <span className={`text-sm ${step.isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                                        {step.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {calculateProgress() === 100 && (
                 <div className="mt-8 p-6 bg-green-100 rounded-lg text-center border border-green-200 max-w-3xl mx-auto">
                    <CheckCircle2 size={48} className="text-green-600 mx-auto mb-3" />
                    <h3 className="font-bold text-green-900 text-lg">Поздравляем!</h3>
                    <p className="text-green-800 text-sm mt-2">Вы прошли все этапы запуска проекта.</p>
                 </div>
            )}
        </div>
    </div>
  );

  const renderSearchView = () => (
    <div className="fixed top-0 bottom-0 left-0 right-0 mx-auto max-w-7xl bg-white z-50 flex flex-col animate-in fade-in duration-200 shadow-xl border-x border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center space-x-3 bg-white shadow-sm">
            <button onClick={() => setViewState('main')} className="p-2 -ml-2 rounded-full hover:bg-gray-100"><ArrowLeft size={24} className="text-gray-600" /></button>
            <input 
                autoFocus
                type="text" 
                placeholder="Поиск стартапов..." 
                className="flex-1 bg-gray-100 px-4 py-2 rounded text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={handleSearch}
            />
        </div>
        <div className="p-4 overflow-y-auto bg-gray-50 flex-1">
            {searchQuery.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredStartups.length > 0 ? (
                        filteredStartups.map(s => <StartupCard key={s.id} startup={s} onClick={() => { setSelectedStartup(s); setViewState('main'); }} />)
                    ) : (
                        <div className="col-span-full text-center text-gray-500 mt-10">Ничего не найдено</div>
                    )}
                </div>
            ) : (
                <div className="text-gray-400 text-sm text-center mt-10">Введите название проекта</div>
            )}
        </div>
    </div>
  );

  const renderNotificationsView = () => (
    <div className="fixed top-0 bottom-0 left-0 right-0 mx-auto max-w-7xl bg-white z-50 flex flex-col animate-in slide-in-from-right duration-300 shadow-xl border-x border-gray-200">
         <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white shadow-sm">
            <h2 className="font-bold text-lg">Уведомления</h2>
            <button onClick={() => setViewState('main')} className="p-2 -mr-2 rounded-full hover:bg-gray-100"><X size={24} className="text-gray-600" /></button>
        </div>
        <div className="divide-y divide-gray-100 overflow-y-auto">
            {MOCK_NOTIFICATIONS.map(n => (
                <div key={n.id} className="p-4 hover:bg-blue-50 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-sm text-gray-900">{n.title}</span>
                        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{n.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-snug">{n.text}</p>
                </div>
            ))}
            <div className="p-4 text-center">
                <button className="text-blue-600 text-xs font-bold uppercase">Очистить все</button>
            </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans w-full max-w-7xl mx-auto shadow-2xl overflow-hidden relative border-x border-gray-200">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 max-w-7xl mx-auto z-30 px-4 h-14 flex justify-between items-center bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="font-bold text-lg text-blue-900 tracking-tight">
            Aqmola Start
        </div>
        <div className="flex items-center space-x-2">
             <button className="p-2 text-gray-500 active:text-blue-600 rounded-full hover:bg-gray-100" onClick={() => setViewState('search')}>
                <Search size={22} />
            </button>
             <button className="p-2 text-gray-500 relative active:text-blue-600 rounded-full hover:bg-gray-100" onClick={() => setViewState('notifications')}>
                <Bell size={22} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen pt-14 relative z-10 bg-gray-50">
        {activeTab === Tab.HOME && renderHome()}
        {activeTab === Tab.STARTUPS && renderStartups()}
        {activeTab === Tab.CREATE && renderCreate()}
        {activeTab === Tab.EVENTS && renderEvents()}
        {activeTab === Tab.PROFILE && renderProfile()}
      </main>

      {/* AI Assistant */}
      <AIChatModal />

      {/* Bottom Nav - With Center Button */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-7xl mx-auto z-40 bg-white border-t border-gray-200 pb-safe shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center h-14 px-4 sm:px-8">
            <NavBtn icon={Home} label="Главная" active={activeTab === Tab.HOME} onClick={() => setActiveTab(Tab.HOME)} />
            <NavBtn icon={Search} label="Каталог" active={activeTab === Tab.STARTUPS} onClick={() => setActiveTab(Tab.STARTUPS)} />
            
            {/* Center Plus Button */}
            <div className="relative -top-5">
                <button 
                    onClick={() => setActiveTab(Tab.CREATE)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-gray-50 transition-colors ${activeTab === Tab.CREATE ? 'bg-blue-800' : 'bg-blue-600'} text-white`}
                >
                    <PlusCircle size={28} />
                </button>
            </div>

            <NavBtn icon={Calendar} label="Афиша" active={activeTab === Tab.EVENTS} onClick={() => setActiveTab(Tab.EVENTS)} />
            <NavBtn icon={User} label="Профиль" active={activeTab === Tab.PROFILE} onClick={() => setActiveTab(Tab.PROFILE)} />
        </div>
      </nav>

      {/* Overlays */}
      {viewState === 'search' && renderSearchView()}
      {viewState === 'notifications' && renderNotificationsView()}
      {viewState === 'jobs' && renderJobsView()}
      {viewState === 'wiki' && renderWikiView()}
      {viewState === 'builder' && renderBuilderView()}

      {/* Fullscreen Startup Detail */}
      {selectedStartup && (
        <div className="fixed top-0 bottom-0 left-0 right-0 mx-auto max-w-7xl z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom-10 duration-200 border-x border-gray-200 shadow-2xl">
             <div className="bg-white/95 backdrop-blur-sm p-3 border-b border-gray-200 flex items-center space-x-3 sticky top-0 z-20">
                <button onClick={() => setSelectedStartup(null)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft size={24} className="text-gray-700" />
                </button>
                <h2 className="font-bold text-gray-900 truncate text-sm uppercase tracking-wide">Информация о проекте</h2>
             </div>

            <div className="p-0 pb-24">
                {/* Hero Image for Startup */}
                <div className="h-48 w-full bg-gray-200 relative">
                     <img src={selectedStartup.logoUrl} className="w-full h-full object-cover" alt="" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                     <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block bg-blue-600 text-white text-xs px-2 py-0.5 rounded mb-2 border border-blue-500">
                            {selectedStartup.category}
                        </span>
                        <h1 className="text-2xl font-bold text-white leading-tight shadow-black drop-shadow-md">{selectedStartup.name}</h1>
                     </div>
                </div>

                <div className="p-5 max-w-3xl mx-auto">
                    <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
                        <span>Локация: {selectedStartup.location}</span>
                        <span>Основателей: {selectedStartup.founders.length}</span>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-gray-900 font-bold mb-2">О проекте</h3>
                        <p className="text-gray-700 text-base leading-relaxed">
                            {selectedStartup.description}
                        </p>
                    </div>

                    <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <span className="text-gray-600 font-medium text-sm">Стадия проекта</span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-bold border border-green-200">{selectedStartup.stage}</span>
                    </div>

                    <h3 className="text-gray-900 font-bold mb-3">Команда</h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {selectedStartup.founders.map((f, i) => (
                            <div key={i} className="bg-white border border-gray-300 px-3 py-2 rounded-lg text-sm text-gray-700 font-medium">
                                {f}
                            </div>
                        ))}
                    </div>

                    <button className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm">
                        Связаться с основателем
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Fullscreen Article Detail */}
      {selectedArticle && (
         <div className="fixed top-0 bottom-0 left-0 right-0 mx-auto max-w-7xl z-50 bg-white overflow-y-auto animate-in slide-in-from-right duration-200 border-x border-gray-200 shadow-2xl">
             <div className="bg-white/95 backdrop-blur-sm p-3 border-b border-gray-200 flex items-center space-x-3 sticky top-0 z-20">
                <button onClick={() => setSelectedArticle(null)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft size={24} className="text-gray-700" />
                </button>
                <h2 className="font-bold text-gray-900 truncate text-sm uppercase tracking-wide">База знаний</h2>
             </div>
             <div className="p-5 pb-24 max-w-3xl mx-auto">
                <span className="text-purple-600 font-bold text-xs uppercase mb-2 block">{selectedArticle.category}</span>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{selectedArticle.title}</h1>
                <div className="flex items-center text-gray-500 text-sm mb-6 border-b border-gray-100 pb-4">
                    <BookOpen size={16} className="mr-2" />
                    <span>Время чтения: {selectedArticle.readTime}</span>
                </div>
                <div className="prose prose-sm text-gray-800 max-w-none">
                    <p className="leading-relaxed whitespace-pre-line">{selectedArticle.content}</p>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <button className="w-full bg-gray-100 text-gray-700 font-bold py-3 rounded hover:bg-gray-200 transition-colors">
                        Сохранить в закладки
                    </button>
                </div>
             </div>
         </div>
      )}
    </div>
  );
}

const NavBtn = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
    <button 
        onClick={onClick}
        className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${active ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
    >
        <Icon size={22} strokeWidth={active ? 2.5 : 2} />
        <span className="text-[10px] font-medium">{label}</span>
    </button>
);
