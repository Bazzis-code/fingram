import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const PAMPHLETS = [
  {
    id:1, title:"Карманные деньги по возрасту", sub:"Когда начинать, сколько давать и как превратить это в обучение", icon:"wallet", accent:"#0EA5E9",
    sections:[
      { h:"Зачем давать карманные деньги?", t:"Карманные деньги — первый финансовый тренажёр. Через них ребёнок учится делать выбор, считать и нести ответственность. По данным ВЦИОМ, 41% российских родителей называют карманные деньги главным инструментом обучения финграмотности." },
      { h:"Рекомендуемые суммы (SuperJob, 2025)", items:[
        {l:"5–6 лет",t:"100–300 ₽/нед. 23% родителей начинают выдавать с этого возраста (ЮMoney, 2025)."},
        {l:"7–10 лет",t:"300–620 ₽/нед. Средняя сумма — 620 ₽, 71% родителей дают до 500 ₽."},
        {l:"11–14 лет",t:"500–1 000 ₽/нед. Средняя — 930 ₽. 39% дают 500–1 000 ₽."},
        {l:"15–17 лет",t:"1 000–2 000 ₽/нед. Средняя — 1 320 ₽. Переход к месячному бюджету."},
      ]},
      { h:"Главные правила", items:[
        {l:"Регулярность",t:"Выдавайте в один и тот же день."},
        {l:"Не за оценки",t:"Карманные деньги — не зарплата за учёбу."},
        {l:"Без авансов",t:"Потратил всё — ждёт следующей выдачи."},
        {l:"Обсуждайте",t:"Раз в неделю: «На что потратил? Доволен?»"},
      ]},
      { h:"Источники", links:[
        {n:"РБК: карманные деньги детям в 2025",u:"https://www.rbc.ru/society/22/04/2025/6806eeb29a7947bb9b58cea7"},
        {n:"Т-Банк: сколько давать ребёнку",u:"https://www.tbank.ru/finance/blog/pocket-money/"},
        {n:"Банк России: финграмотность 2024",u:"https://cbr.ru/analytics/szpp/fin_literacy/"},
      ]}
    ]
  },
  {
    id:2, title:"Детская банковская карта", sub:"Какой банк выбрать, как настроить, на что обратить внимание", icon:"card", accent:"#6366F1",
    sections:[
      { h:"Зачем ребёнку карта?", t:"Карта даёт три вещи, которых нет у купюр: историю трат, лимиты и цифровую грамотность. Рекомендуемый возраст оформления — с 6–7 лет." },
      { h:"Сравнение карт (2026)", items:[
        {l:"СберКарта (Детская)",t:"6–13 лет. Бесплатно. Приложение СберKids, копилка до 11% годовых, кэшбэк 1%."},
        {l:"Т-Банк Джуниор",t:"С рождения до 14 лет. Бесплатно, доставка на дом. Копилка до 10%, кэшбэк до 30%."},
        {l:"Альфа-Банк Kids",t:"7–14 лет. Бесплатно. Финансовые уроки в приложении, кэшбэк до 5%."},
      ]},
      { h:"Настройка за 5 шагов", items:[
        {l:"1. Лимиты",t:"Установите дневной лимит, равный дневным карманным деньгам."},
        {l:"2. Уведомления",t:"Включите SMS/push о каждой операции на свой телефон."},
        {l:"3. Онлайн-покупки",t:"Отключите или включите подтверждение через ваш номер."},
        {l:"4. Приложение",t:"Покажите ребёнку баланс, историю, категории трат."},
        {l:"5. Доверие",t:"Если потратил лишнее — обсуждаете без ругани."},
      ]},
      { h:"Ссылки", links:[
        {n:"СберБанк: Детская СберКарта",u:"https://www.sberbank.com/ru/person/bank_cards/debit/sberkids"},
        {n:"Т-Банк: карта Джуниор",u:"https://www.tbank.ru/cards/debit-cards/tinkoff-black/junior/"},
        {n:"Banki.ru: обзор Джуниор",u:"https://www.banki.ru/products/debitcards/card/8075/overview/"},
      ]}
    ]
  },
  {
    id:3, title:"5 разговоров о деньгах", sub:"Конкретные сценарии: что сказать, в каком возрасте начинать", icon:"chat", accent:"#F59E0B",
    sections:[
      { h:"Почему это важно?", t:"По данным НАФИ, молодёжь 14–24 лет показывает более низкий уровень финграмотности, чем старшие поколения — из-за отсутствия раннего обучения в семье." },
      { h:"5 разговоров", items:[
        {l:"«Откуда деньги?» (5–7)",t:"Расскажите про работу: «Я помогаю людям, и мне за это платят». Связь: труд → польза → деньги."},
        {l:"«Почему не покупаем?» (6–8)",t:"«Мы выбираем: игрушка сейчас или аквапарк в выходные. Что выберешь?»"},
        {l:"«Что такое реклама?» (8–10)",t:"Посмотрите ролик вместе. «Тебе правда это нужно или просто хочется после рекламы?»"},
        {l:"«Зачем копить?» (7–10)",t:"Поставьте цель, визуализируйте прогресс. Самостоятельно накопить — мощнейший урок."},
        {l:"«Деньги в интернете» (9–12)",t:"Покупка в Roblox за 299 ₽ = 3 мороженых. Правило: онлайн-покупки — после обсуждения."},
      ]},
      { h:"Источники", links:[
        {n:"«Вклад в будущее»: разговоры с детьми о деньгах",u:"https://vbudushee.ru/library/kak-i-kto-dolzhen-govorit-s-detmi-o-finansovoy-gramotnosti/"},
        {n:"НАФИ: финграмотность молодёжи",u:"https://nafi.ru/analytics/naskolko-finansovo-gramotny-rossiyskie-podrostki-i-molodezh-do-24-let/"},
      ]}
    ]
  },
  {
    id:4, title:"Онлайн-безопасность", sub:"Чек-лист цифровой финансовой защиты для родителей", icon:"shield", accent:"#EF4444",
    sections:[
      { h:"Проблема", t:"Встроенные покупки в играх, подписки, донаты — всё это реальные деньги. Бесконтактная оплата делает траты «невидимыми»: нажал кнопку — 500 ₽ списались." },
      { h:"Чек-лист", items:[
        {l:"Не сохраняйте карту",t:"Каждая покупка должна требовать ручного ввода данных."},
        {l:"Подтверждение",t:"SMS-код на ваш номер для каждой онлайн-покупки."},
        {l:"Объясните free-to-play",t:"«Игра бесплатна, но зарабатывает на покупках внутри.»"},
        {l:"Мошенники",t:"«Бесплатные робуксы» = обман. Если что-то бесплатно — это подвох."},
        {l:"Без наказаний",t:"Потратил случайно — обсудите спокойно: «Как не повторить?»"},
      ]},
      { h:"Ссылки", links:[
        {n:"Банк России: защита от мошенников",u:"https://cbr.ru/protection_rights/finlit/"},
        {n:"Т-Банк: безопасность Джуниор",u:"https://www.tbank.ru/cards/debit-cards/tinkoff-black/junior/"},
      ]}
    ]
  },
  {
    id:5, title:"Привычки, которые стоит пересмотреть", sub:"5 подходов к деньгам, которые можно улучшить", icon:"lightbulb", accent:"#8B5CF6",
    sections:[
      { h:"О чём эта памятка?", t:"Многие родители опираются на собственный опыт, который не всегда включал системное финансовое воспитание. Вот пять привычек, которые можно пересмотреть." },
      { h:"5 привычек", items:[
        {l:"«Не лезь во взрослые дела»",t:"Попробуйте: обсуждайте с ребёнком ту часть бюджета, которая касается его."},
        {l:"Отказывать без причин",t:"Попробуйте: «Сейчас копим на поездку, покупаем только нужное.»"},
        {l:"Платить за оценки",t:"Попробуйте: «Ты серьёзно подготовился — это здорово» вместо «500 ₽ за пятёрку»."},
        {l:"Покупать сразу",t:"Попробуйте: «Запишем, и если через неделю хочешь — обсудим»."},
        {l:"Не делиться опытом",t:"Расскажите, как сами поторопились с покупкой. Это создаёт доверие."},
      ]},
      { h:"Источники", links:[
        {n:"ВЦИОМ: финграмотность россиян 2025",u:"https://adpass.ru/finansovaya-gramotnost-v-rossii-2025/"},
        {n:"НАФИ: индекс финграмотности 2024",u:"https://nafi.ru/analytics/indeks-finansovoy-gramotnosti-rossiyan-2024/"},
      ]}
    ]
  },
];

const QUESTIONS = [
  {q:"Обсуждаете ли вы семейный бюджет при ребёнке?",o:[{t:"Да, регулярно",s:3},{t:"Иногда",s:2},{t:"Нет",s:0}]},
  {q:"Есть ли у ребёнка карманные деньги?",o:[{t:"Да, фиксированно и регулярно",s:3},{t:"Даю по просьбе",s:1},{t:"Нет",s:0}]},
  {q:"Потратил всё за день — ваши действия?",o:[{t:"Обсуждаем, не даю до следующей выдачи",s:3},{t:"Даю ещё",s:1},{t:"Ругаю",s:0}]},
  {q:"Объясняли, откуда деньги в семье?",o:[{t:"Да, подробно",s:3},{t:"В общих чертах",s:1},{t:"Нет",s:0}]},
  {q:"Есть ли у ребёнка банковская карта?",o:[{t:"Да, с лимитами",s:3},{t:"Да, без настроек",s:1},{t:"Нет",s:0}]},
  {q:"Хочет дорогую игрушку — что делаете?",o:[{t:"Предлагаю копить",s:3},{t:"На праздник",s:2},{t:"Покупаю сразу",s:0}]},
  {q:"Обсуждаете рекламу и маркетинг?",o:[{t:"Да, разбираем",s:3},{t:"Иногда",s:1},{t:"Нет",s:0}]},
  {q:"Знает ли ребёнок, что покупки в играх — реальные деньги?",o:[{t:"Да, показывали списания",s:3},{t:"Скорее всего",s:1},{t:"Нет",s:0}]},
  {q:"Ваша финансовая грамотность?",o:[{t:"Хорошая, веду бюджет",s:3},{t:"Средняя",s:2},{t:"Слабая",s:1}]},
  {q:"Главное в финансовом воспитании?",o:[{t:"Осознанные решения",s:3},{t:"Ценность труда",s:2},{t:"Жизнь научит",s:0}]},
];

const RESULTS = [
  {min:0,max:10,title:"Начинающий",emoji:"🌱",color:"#EF4444",text:"Вы в начале пути — начните с малого: заведите карманные деньги и обсудите одну тему из памяток."},
  {min:11,max:20,title:"Практик",emoji:"📈",color:"#F59E0B",text:"Хорошая база! Обратите внимание на цифровую безопасность и разговоры о рекламе."},
  {min:21,max:30,title:"Эксперт",emoji:"⭐",color:"#10B981",text:"Впечатляющий результат. Поделитесь опытом с другими родителями!"},
];

const CALC = [
  {age:"5–6",min:100,max:300,per:"нед.",note:"Мелкие покупки. 23% начинают выдавать с этого возраста (ЮMoney, 2025)."},
  {age:"7–10",min:300,max:620,per:"нед.",note:"Средняя — 620 ₽/нед. 71% дают до 500 ₽ (SuperJob, 2025)."},
  {age:"11–14",min:500,max:1000,per:"нед.",note:"Средняя — 930 ₽/нед. Пора подключать карту (SuperJob, 2025)."},
  {age:"15–17",min:1000,max:2000,per:"нед.",note:"Средняя — 1 320 ₽/нед. Переход к месячному бюджету (SuperJob, 2025)."},
];

const STATS = [
  {v:"89%",l:"родителей хотят учить детей финграмотности",s:"РБК"},
  {v:"21%",l:"не знают, как начать разговор о деньгах",s:"Ведомости"},
  {v:"3.4/5",l:"средняя самооценка финграмотности",s:"ВЦИОМ, 2025"},
  {v:"55/100",l:"индекс финграмотности России",s:"ЦБ РФ, 2024"},
];

/* ═══════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════ */
const I = {
  wallet:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/><circle cx="18" cy="14" r="1.5" fill="currentColor" stroke="none"/><path d="M6 6V4a2 2 0 012-2h8a2 2 0 012 2v2"/></svg>,
  card:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 9h20M2 13h20"/><rect x="5" y="15" width="6" height="2" rx="0.5" fill="currentColor" stroke="none" opacity="0.4"/></svg>,
  chat:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16a2 2 0 012 2v10a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2z"/><circle cx="8" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="11" r="1" fill="currentColor" stroke="none"/></svg>,
  shield:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/><path d="M8 12l3 3 5-6" strokeWidth="2.2"/></svg>,
  lightbulb:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z"/></svg>,
  home:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l9-9 9 9"/><path d="M5 10v8a2 2 0 002 2h10a2 2 0 002-2v-8"/></svg>,
  test:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 6h6M9 10h6M9 14h4"/></svg>,
  calc:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><rect x="7" y="5" width="10" height="4" rx="1"/><circle cx="8.5" cy="13" r="0.8" fill="currentColor"/><circle cx="12" cy="13" r="0.8" fill="currentColor"/><circle cx="15.5" cy="13" r="0.8" fill="currentColor"/><circle cx="8.5" cy="17" r="0.8" fill="currentColor"/><circle cx="12" cy="17" r="0.8" fill="currentColor"/><circle cx="15.5" cy="17" r="0.8" fill="currentColor"/></svg>,
  info:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v0M12 11v5" strokeWidth="2.5"/></svg>,
  arrow:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>,
  ext:<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4h7v7M14 4L4 14"/></svg>,
  back:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>,
};

/* ═══════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800&display=swap');

:root {
  --bg: #F0F4FA;
  --card: #FFFFFF;
  --card-hover: #FAFBFF;
  --navy: #0B1B3A;
  --blue: #0D4CD3;
  --blue-l: #3B7DFF;
  --blue-xl: #EBF2FF;
  --blue-bg: #F5F8FF;
  --text: #1A2742;
  --text-2: #4A5C7B;
  --text-3: #8896AB;
  --border: #E1E8F0;
  --green: #059669;
  --red: #DC2626;
  --amber: #D97706;
  --font-d: 'Onest', 'Golos Text', system-ui, sans-serif;
  --font-b: 'Golos Text', 'Onest', system-ui, sans-serif;
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth;overflow-x:hidden}
body{font-family:var(--font-b);color:var(--text);background:var(--bg);-webkit-font-smoothing:antialiased;overflow-x:hidden}
::selection{background:var(--blue);color:white}

@keyframes up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes scale{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
@keyframes slideIn{from{transform:translateX(-100%)}to{transform:translateX(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.au{animation:up .5s ease-out both}.d1{animation-delay:.06s}.d2{animation-delay:.12s}.d3{animation-delay:.18s}.d4{animation-delay:.24s}.d5{animation-delay:.3s}

.glass{background:rgba(255,255,255,.72);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.5)}
.card{background:var(--card);border:1px solid var(--border);border-radius:16px;transition:all .2s ease}
.card:hover{box-shadow:0 8px 32px rgba(13,76,211,.08);border-color:rgba(13,76,211,.15);transform:translateY(-2px)}
.btn-p{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border-radius:12px;border:none;font-family:var(--font-d);font-size:15px;font-weight:600;cursor:pointer;transition:all .2s}
.btn-p:active{transform:scale(.97)}
.pattern{background-image:radial-gradient(circle,rgba(13,76,211,.04) 1px,transparent 1px);background-size:24px 24px}
`;

/* ═══════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════ */
const Nav = ({page,setPage}) => {
  const [open,setOpen] = useState(false);
  const [sc,setSc] = useState(false);
  useEffect(()=>{const h=()=>setSc(window.scrollY>20);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h)},[]);
  const go = id => {setPage(id);setOpen(false);window.scrollTo(0,0)};
  const links=[{id:"home",label:"Главная",icon:I.home},{id:"test",label:"Тест",icon:I.test},{id:"pamphlets",label:"Памятки",icon:I.wallet},{id:"calc",label:"Калькулятор",icon:I.calc},{id:"about",label:"О проекте",icon:I.info}];

  return <>
    <header className="glass" style={{position:"fixed",top:0,left:0,right:0,zIndex:100,borderBottom:"1px solid "+(sc?"var(--border)":"transparent"),transition:"all .3s"}}>
      <div style={{maxWidth:960,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",height:56,gap:12}}>
        <button onClick={()=>setOpen(!open)} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",gap:5,padding:4,width:24}} aria-label="Меню">
          <span style={{height:2,width:20,background:"var(--navy)",borderRadius:2,transition:"all .3s",transform:open?"rotate(45deg) translate(2.5px,2.5px)":"none"}}/>
          <span style={{height:2,width:20,background:"var(--navy)",borderRadius:2,transition:"all .3s",opacity:open?0:1}}/>
          <span style={{height:2,width:20,background:"var(--navy)",borderRadius:2,transition:"all .3s",transform:open?"rotate(-45deg) translate(2.5px,-2.5px)":"none"}}/>
        </button>
        <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}} onClick={()=>go("home")}>
          <div style={{width:32,height:32,borderRadius:10,background:"linear-gradient(135deg,#0D4CD3,#3B7DFF)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontFamily:"var(--font-d)",fontWeight:800,fontSize:16}}>Ф</div>
          <span style={{fontFamily:"var(--font-d)",fontWeight:700,fontSize:17,color:"var(--navy)"}}>ФинГрам</span>
        </div>
      </div>
    </header>
    {/* Overlay */}
    <div onClick={()=>setOpen(false)} style={{position:"fixed",inset:0,zIndex:101,background:"rgba(11,27,58,.25)",backdropFilter:"blur(4px)",opacity:open?1:0,pointerEvents:open?"auto":"none",transition:"opacity .3s"}}/>
    {/* Drawer */}
    <aside style={{position:"fixed",top:0,left:0,bottom:0,width:280,zIndex:102,background:"white",boxShadow:open?"8px 0 40px rgba(0,0,0,.1)":"none",transform:open?"translateX(0)":"translateX(-100%)",transition:"transform .3s cubic-bezier(.4,0,.2,1)",display:"flex",flexDirection:"column"}}>
      <div style={{padding:"24px 20px 16px",borderBottom:"1px solid var(--border)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:40,height:40,borderRadius:12,background:"linear-gradient(135deg,#0D4CD3,#3B7DFF)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontFamily:"var(--font-d)",fontWeight:800,fontSize:20}}>Ф</div>
          <div><div style={{fontFamily:"var(--font-d)",fontWeight:700,fontSize:17,color:"var(--navy)"}}>ФинГрам</div><div style={{fontSize:12,color:"var(--text-3)"}}>для родителей</div></div>
        </div>
      </div>
      <nav style={{flex:1,padding:"8px 8px",overflowY:"auto"}}>
        {links.map(lnk=>(
          <button key={lnk.id} onClick={()=>go(lnk.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:14,padding:"13px 16px",border:"none",borderRadius:12,background:page===lnk.id?"var(--blue-xl)":"transparent",color:page===lnk.id?"var(--blue)":"var(--text-2)",fontFamily:"var(--font-b)",fontSize:15,fontWeight:page===lnk.id?600:500,cursor:"pointer",transition:"all .15s",marginBottom:2,textAlign:"left"}}>
            <span style={{width:22,height:22,display:"flex",flexShrink:0,color:page===lnk.id?"var(--blue)":"var(--text-3)"}}>{lnk.icon}</span>{lnk.label}
          </button>
        ))}
      </nav>
      <div style={{padding:"16px 20px",borderTop:"1px solid var(--border)",fontSize:12,color:"var(--text-3)"}}>Образовательный проект · 2026</div>
    </aside>
  </>;
};

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */
const Hero = ({setPage}) => (
  <section className="pattern" style={{paddingTop:80,paddingBottom:48,background:"linear-gradient(180deg,#E8F0FE 0%,var(--bg) 100%)",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:-80,right:-80,width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(13,76,211,.06),transparent 70%)",pointerEvents:"none"}}/>
    <div style={{maxWidth:640,margin:"0 auto",padding:"0 20px",textAlign:"center",position:"relative"}}>
      <span className="au" style={{display:"inline-block",padding:"6px 16px",borderRadius:100,background:"rgba(13,76,211,.08)",fontSize:13,fontWeight:600,color:"var(--blue)",fontFamily:"var(--font-d)",marginBottom:20,border:"1px solid rgba(13,76,211,.12)"}}>Образовательный проект</span>
      <h1 className="au d1" style={{fontFamily:"var(--font-d)",fontSize:"clamp(28px,7vw,44px)",fontWeight:800,color:"var(--navy)",lineHeight:1.15,marginBottom:14,letterSpacing:"-0.3px"}}>
        ФинГрам <span style={{color:"var(--blue)"}}>для&nbsp;родителей</span>
      </h1>
      <p className="au d2" style={{fontSize:"clamp(15px,2.5vw,17px)",color:"var(--text-2)",lineHeight:1.7,maxWidth:500,margin:"0 auto 28px"}}>
        Тест, памятки со ссылками на банки и калькулятор карманных денег — всё для осознанного финансового воспитания детей
      </p>
      <div className="au d3" style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
        <button className="btn-p" onClick={()=>{setPage("test");window.scrollTo(0,0)}} style={{background:"linear-gradient(135deg,#0D4CD3,#2563EB)",color:"white",boxShadow:"0 4px 16px rgba(13,76,211,.25)"}}>Пройти тест</button>
        <button className="btn-p" onClick={()=>{setPage("pamphlets");window.scrollTo(0,0)}} style={{background:"white",color:"var(--text)",border:"1.5px solid var(--border)",boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>Читать памятки</button>
      </div>
    </div>
    <div style={{maxWidth:640,margin:"36px auto 0",padding:"0 20px"}}>
      <div className="au d4" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {STATS.map((s,i)=>(
          <div key={i} className="card" style={{padding:"18px 16px",borderRadius:14}}>
            <div style={{fontFamily:"var(--font-d)",fontSize:24,fontWeight:800,color:"var(--blue)",lineHeight:1}}>{s.v}</div>
            <div style={{fontSize:12,color:"var(--text-2)",lineHeight:1.4,marginTop:6}}>{s.l}</div>
            <div style={{fontSize:10,color:"var(--text-3)",marginTop:3,fontWeight:500}}>{s.s}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════
   TEST
   ═══════════════════════════════════════════ */
const Test = ({setPage}) => {
  const [cur,setCur]=useState(0);const [ans,setAns]=useState([]);const [done,setDone]=useState(false);const [sel,setSel]=useState(null);
  const pick=sc=>{setSel(sc);setTimeout(()=>{const na=[...ans,sc];setAns(na);setSel(null);cur<QUESTIONS.length-1?setCur(cur+1):setDone(true)},200)};
  const total=ans.reduce((a,b)=>a+b,0);const res=RESULTS.find(r=>total>=r.min&&total<=r.max)||RESULTS[0];
  if(done) return <section style={{minHeight:"100vh",paddingTop:80,paddingBottom:60,background:"var(--bg)"}}>
    <div style={{maxWidth:520,margin:"0 auto",padding:"20px"}}>
      <div className="card" style={{padding:"40px 28px",textAlign:"center",animation:"scale .4s ease-out"}}>
        <div style={{fontSize:52,marginBottom:8}}>{res.emoji}</div>
        <div style={{fontSize:12,fontWeight:600,color:"var(--text-3)",textTransform:"uppercase",letterSpacing:1}}>Результат</div>
        <div style={{fontFamily:"var(--font-d)",fontSize:40,fontWeight:800,color:res.color,margin:"4px 0"}}>{total}<span style={{fontSize:20,color:"var(--text-3)"}}>/30</span></div>
        <div style={{fontFamily:"var(--font-d)",fontSize:22,fontWeight:700,color:"var(--navy)",marginBottom:16}}>{res.title}</div>
        <p style={{fontSize:15,color:"var(--text-2)",lineHeight:1.7,marginBottom:28}}>{res.text}</p>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <button className="btn-p" onClick={()=>{setCur(0);setAns([]);setDone(false);setSel(null)}} style={{background:"var(--navy)",color:"white"}}>Ещё раз</button>
          <button className="btn-p" onClick={()=>{setPage("pamphlets");window.scrollTo(0,0)}} style={{background:"white",border:"1.5px solid var(--border)",color:"var(--text)"}}>Памятки →</button>
        </div>
      </div>
    </div>
  </section>;
  const q=QUESTIONS[cur];const pct=cur/QUESTIONS.length*100;
  return <section style={{minHeight:"100vh",paddingTop:80,paddingBottom:60,background:"var(--bg)"}}>
    <div style={{maxWidth:560,margin:"0 auto",padding:"20px"}}>
      <div style={{textAlign:"center",marginBottom:32}}><h2 style={{fontFamily:"var(--font-d)",fontSize:24,fontWeight:800,color:"var(--navy)",marginBottom:6}}>Тест для родителей</h2><p style={{fontSize:14,color:"var(--text-3)"}}>10 вопросов · 2 минуты</p></div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:12,fontWeight:600,color:"var(--text-3)"}}><span>Вопрос {cur+1}/{QUESTIONS.length}</span><span>{Math.round(pct)}%</span></div>
      <div style={{height:4,background:"var(--border)",borderRadius:100,marginBottom:24,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:"linear-gradient(90deg,#0D4CD3,#3B7DFF)",borderRadius:100,transition:"width .4s ease"}}/></div>
      <div key={cur} className="card" style={{padding:"28px 24px",animation:"up .35s ease-out"}}>
        <h3 style={{fontFamily:"var(--font-d)",fontSize:18,fontWeight:700,color:"var(--navy)",marginBottom:20,lineHeight:1.4}}>{q.q}</h3>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {q.o.map((o,i)=><button key={i} onClick={()=>pick(o.s)} style={{padding:"15px 18px",borderRadius:12,textAlign:"left",background:sel===o.s?"var(--navy)":"var(--bg)",border:sel===o.s?"none":"1.5px solid var(--border)",fontSize:15,fontWeight:500,color:sel===o.s?"white":"var(--text)",cursor:"pointer",transition:"all .15s",fontFamily:"var(--font-b)",lineHeight:1.4}}>{o.t}</button>)}
        </div>
      </div>
    </div>
  </section>;
};

/* ═══════════════════════════════════════════
   PAMPHLETS
   ═══════════════════════════════════════════ */
const PDetail = ({p,onBack}) => (
  <section style={{minHeight:"100vh",paddingTop:72,paddingBottom:60,background:"var(--bg)"}}>
    <div style={{maxWidth:680,margin:"0 auto",padding:"20px"}}>
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:4,background:"none",border:"none",fontSize:14,fontWeight:600,color:"var(--text-3)",cursor:"pointer",fontFamily:"var(--font-b)",marginBottom:24}}>
        <span style={{width:20,height:20}}>{I.back}</span>Все памятки
      </button>
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:28}}>
        <div style={{width:48,height:48,borderRadius:14,background:p.accent+"18",display:"flex",alignItems:"center",justifyContent:"center",color:p.accent,flexShrink:0}}><span style={{width:26,height:26}}>{I[p.icon]}</span></div>
        <div><h2 style={{fontFamily:"var(--font-d)",fontSize:22,fontWeight:800,color:"var(--navy)",lineHeight:1.2}}>{p.title}</h2><p style={{fontSize:13,color:"var(--text-3)",marginTop:2}}>{p.sub}</p></div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {p.sections.map((sec,si)=>(
          <div key={si} className="card" style={{padding:"24px 20px",animation:`up .4s ease-out ${si*.06}s both`}}>
            <h3 style={{fontFamily:"var(--font-d)",fontSize:16,fontWeight:700,color:"var(--navy)",marginBottom:14}}>{sec.h}</h3>
            {sec.t&&<p style={{fontSize:14,color:"var(--text-2)",lineHeight:1.75}}>{sec.t}</p>}
            {sec.items&&<div style={{display:"flex",flexDirection:"column",gap:12}}>{sec.items.map((it,ii)=>(
              <div key={ii} style={{paddingLeft:14,borderLeft:`3px solid ${p.accent}22`}}>
                <span style={{fontFamily:"var(--font-d)",fontWeight:700,color:"var(--navy)",fontSize:13}}>{it.l}</span>
                <span style={{fontSize:13,color:"var(--text-2)",lineHeight:1.6}}> — {it.t}</span>
              </div>
            ))}</div>}
            {sec.links&&<div style={{display:"flex",flexDirection:"column",gap:8}}>{sec.links.map((lnk,li)=>(
              <a key={li} href={lnk.u} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",borderRadius:10,background:"var(--blue-xl)",textDecoration:"none",transition:"all .15s",border:"1px solid transparent"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(13,76,211,.2)"}
                onMouseLeave={e=>e.currentTarget.style.borderColor="transparent"}>
                <span style={{width:16,height:16,color:"var(--blue)",flexShrink:0}}>{I.ext}</span>
                <span style={{fontSize:13,fontWeight:500,color:"var(--blue)",lineHeight:1.4}}>{lnk.n}</span>
              </a>
            ))}</div>}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Pamphlets = () => {
  const [active,setActive]=useState(null);
  if(active) return <PDetail p={active} onBack={()=>setActive(null)}/>;
  return <section style={{minHeight:"100vh",paddingTop:80,paddingBottom:60,background:"var(--bg)"}}>
    <div style={{maxWidth:640,margin:"0 auto",padding:"20px"}}>
      <div style={{textAlign:"center",marginBottom:36}}><h2 style={{fontFamily:"var(--font-d)",fontSize:26,fontWeight:800,color:"var(--navy)",marginBottom:8}}>Памятки для родителей</h2><p style={{fontSize:14,color:"var(--text-3)"}}>Подробные руководства со ссылками на банки</p></div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {PAMPHLETS.map((p,i)=>(
          <div key={p.id} className="card au" style={{animationDelay:i*.05+"s",padding:"20px",display:"flex",alignItems:"center",gap:16,cursor:"pointer"}} onClick={()=>{setActive(p);window.scrollTo(0,0)}}>
            <div style={{width:44,height:44,borderRadius:12,background:p.accent+"15",display:"flex",alignItems:"center",justifyContent:"center",color:p.accent,flexShrink:0}}><span style={{width:24,height:24}}>{I[p.icon]}</span></div>
            <div style={{flex:1,minWidth:0}}><h3 style={{fontFamily:"var(--font-d)",fontSize:16,fontWeight:700,color:"var(--navy)",marginBottom:2}}>{p.title}</h3><p style={{fontSize:12,color:"var(--text-3)",lineHeight:1.4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.sub}</p></div>
            <span style={{width:20,height:20,color:p.accent,flexShrink:0}}>{I.arrow}</span>
          </div>
        ))}
      </div>
    </div>
  </section>;
};

/* ═══════════════════════════════════════════
   CALCULATOR
   ═══════════════════════════════════════════ */
const Calc = () => {
  const [idx,setIdx]=useState(1);const d=CALC[idx];
  return <section style={{minHeight:"100vh",paddingTop:80,paddingBottom:60,background:"var(--bg)"}}>
    <div style={{maxWidth:520,margin:"0 auto",padding:"20px"}}>
      <div style={{textAlign:"center",marginBottom:28}}><h2 style={{fontFamily:"var(--font-d)",fontSize:26,fontWeight:800,color:"var(--navy)",marginBottom:8}}>Калькулятор</h2><p style={{fontSize:14,color:"var(--text-3)"}}>Рекомендуемые суммы по возрасту ребёнка</p></div>
      <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:24,overflowX:"auto",paddingBottom:4}}>
        {CALC.map((c,i)=><button key={i} onClick={()=>setIdx(i)} className="btn-p" style={{padding:"10px 18px",fontSize:14,background:idx===i?"var(--navy)":"white",color:idx===i?"white":"var(--text-2)",border:idx===i?"none":"1.5px solid var(--border)",whiteSpace:"nowrap",flexShrink:0,boxShadow:idx===i?"0 4px 12px rgba(11,27,58,.15)":"none"}}>{c.age} лет</button>)}
      </div>
      <div key={idx} className="card" style={{padding:"36px 24px",textAlign:"center",animation:"scale .3s ease-out"}}>
        <div style={{fontSize:12,fontWeight:600,color:"var(--text-3)",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Рекомендуемая сумма</div>
        <div style={{fontFamily:"var(--font-d)",fontSize:42,fontWeight:800,color:"var(--navy)"}}>{d.min}–{d.max} ₽</div>
        <div style={{fontSize:16,fontWeight:600,color:"var(--blue)",marginBottom:20}}>в {d.per}</div>
        <div style={{background:"var(--blue-xl)",borderRadius:12,padding:"14px 18px",textAlign:"left",fontSize:14,color:"var(--text-2)",lineHeight:1.6}}>💡 {d.note}</div>
        <div style={{marginTop:14,background:"var(--bg)",borderRadius:12,padding:"14px 18px",textAlign:"left"}}><p style={{fontSize:12,fontWeight:600,color:"var(--text-3)",marginBottom:4}}>ВАЖНО</p><p style={{fontSize:12,color:"var(--text-3)",lineHeight:1.5}}>Суммы ориентировочные. Главное — регулярность и предсказуемость.</p></div>
      </div>
    </div>
  </section>;
};

/* ═══════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════ */
const About = () => (
  <section style={{minHeight:"100vh",paddingTop:80,paddingBottom:60,background:"var(--bg)"}}>
    <div style={{maxWidth:600,margin:"0 auto",padding:"20px",display:"flex",flexDirection:"column",gap:14}}>
      <div style={{textAlign:"center",marginBottom:12}}><h2 style={{fontFamily:"var(--font-d)",fontSize:26,fontWeight:800,color:"var(--navy)"}}>О проекте</h2></div>
      {[
        {h:"Зачем?",t:"89% родителей хотят научить детей обращаться с деньгами, но 21% не знают, как начать. «ФинГрам» даёт конкретные инструменты: что сказать, как настроить карту, сколько дать карманных."},
        {h:"Что внутри?",t:"Интерактивный тест (10 вопросов) · 5 подробных памяток со ссылками на банки · Калькулятор карманных денег по возрасту · Серия выступлений на родительских собраниях."},
        {h:"Источники данных",t:"Банк России (cbr.ru, 2024) · ВЦИОМ (wciom.ru, 2025) · НАФИ (nafi.ru, 2024) · SuperJob (superjob.ru, 2025) · Ведомости · РБК · Учи.ру (олимпиада 2026)."},
      ].map((b,i)=><div key={i} className="card" style={{padding:"24px 20px"}}><h3 style={{fontFamily:"var(--font-d)",fontSize:17,fontWeight:700,color:"var(--navy)",marginBottom:10}}>{b.h}</h3><p style={{fontSize:14,color:"var(--text-2)",lineHeight:1.75}}>{b.t}</p></div>)}
      <div style={{background:"linear-gradient(135deg,#0B1B3A,#1E3A6E)",borderRadius:16,padding:"24px 20px"}}>
        <h3 style={{fontFamily:"var(--font-d)",fontSize:17,fontWeight:700,color:"white",marginBottom:8}}>Контакты</h3>
        <p style={{fontSize:14,color:"rgba(255,255,255,.55)",lineHeight:1.7}}>Проект создан учеником МБОУ гимназии имени академика Н.Г.Басова.<br/>Номинация «Развитие финансовой грамотности».</p>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
const Footer = ({setPage}) => {
  const go=id=>{setPage(id);window.scrollTo(0,0)};
  return <footer style={{background:"var(--navy)",padding:"32px 20px 24px"}}>
    <div style={{maxWidth:640,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
      <div><div style={{fontFamily:"var(--font-d)",fontWeight:700,fontSize:16,color:"white"}}>ФинГрам для родителей</div><div style={{fontSize:12,color:"rgba(255,255,255,.3)",marginTop:2}}>Образовательный проект · 2026</div></div>
      <div style={{display:"flex",gap:16}}>{["test","pamphlets","calc","about"].map(id=><button key={id} onClick={()=>go(id)} style={{background:"none",border:"none",fontSize:13,color:"rgba(255,255,255,.4)",cursor:"pointer",fontFamily:"var(--font-b)"}}>{({test:"Тест",pamphlets:"Памятки",calc:"Калькулятор",about:"О проекте"})[id]}</button>)}</div>
    </div>
  </footer>;
};

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */
export default function App(){
  const [page,setPage]=useState("home");
  return <div style={{overflowX:"hidden",width:"100%",maxWidth:"100vw",minHeight:"100vh"}}>
    <style>{CSS}</style>
    <Nav page={page} setPage={setPage}/>
    {page==="home"&&<Hero setPage={setPage}/>}
    {page==="test"&&<Test setPage={setPage}/>}
    {page==="pamphlets"&&<Pamphlets/>}
    {page==="calc"&&<Calc/>}
    {page==="about"&&<About/>}
    <Footer setPage={setPage}/>
  </div>;
}
