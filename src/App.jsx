
import sfondoVigneto from '/public/sfondo_vigneto.jpg'
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ArrowLeft, Wine, MapPin, FlaskConical, Home, Calendar as CalendarIcon, History, Coffee, Wifi, Car, Sun, X, Image as ImageIcon, ChevronLeft, Users, Check, Dog, Clock, Map } from 'lucide-react';

// --- DATI VINI E SOMMELIER ---
const wineDatabase = {
  'alba': {
      name: 'ALBA',
      type: 'Trento DOC',
      price: '25 €',
      color: '#a38f60',
      quote: '"L\'energia verticale del mattino. Freschezza e purezza nel calice."',
      description: `
          <p>È lo spumante più fresco e immediato della casa. Nasce sempre dallo Chardonnay di Pressano, ma esprime il lato più luminoso e dinamico del territorio.</p>
          <p>Brut teso e fragrante, richiama agrumi, fiori bianchi e crosta di pane delicata. La bollicina è fine, il sorso slanciato, pensato per accompagnare aperitivi e momenti conviviali con eleganza e leggerezza.</p>
          <p>È la luce dell'inizio, la promessa della giornata.</p>
      `,
      icon: `
          <svg width="80" height="80" viewBox="0 0 100 100">
              <circle cx="50" cy="65" r="20" fill="none" stroke="currentColor" stroke-width="1.5"/>
              <path d="M10 65 H90" stroke="currentColor" stroke-width="1.5"/>
              <path d="M50 35 V20 M30 45 L20 35 M70 45 L80 35" stroke="currentColor" stroke-width="1.5"/>
          </svg>`,
      specs: [
          { label: 'Uvaggio', value: 'Chardonnay' },
          { label: 'Zona', value: 'Pressano' },
          { label: 'Affinamento', value: 'Sui lieviti' },
          { label: 'Temp. Servizio', value: '6 - 8° C' }
      ]
  },
  'zenit': {
      name: 'ZENIT',
      type: 'Müller Thurgau',
      price: '15 €',
      color: '#64748b',
      quote: '"La precisione aromatica assoluta della montagna a mezzogiorno."',
      description: `
          <p>Prodotto a Ville di Giovo, in Val di Cembra, da vigneti ad alta quota, ZENIT è vinificato <strong>esclusivamente in acciaio</strong> per preservare integrità e verticalità.</p>
          <p>Profumi netti di erbe alpine, agrumi, fiori di campo. In bocca è diretto, minerale, vibrante. L'acciaio esalta la purezza varietale e racconta senza filtri la montagna, con una beva agile e precisa.</p>
          <p>Un bianco d'annata essenziale e autentico.</p>
      `,
      icon: `
          <svg width="80" height="80" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" stroke-width="1.5"/>
              <path d="M50 24 V12 M50 76 V88 M24 50 H12 M88 50 H76 M32 32 L22 22 M68 68 L78 78 M32 68 L22 78 M68 32 L78 22" stroke="currentColor" stroke-width="1.5"/>
          </svg>`,
      specs: [
          { label: 'Uvaggio', value: 'Müller Thurgau' },
          { label: 'Zona', value: 'Ville di Giovo (Cembra)' },
          { label: 'Vinificazione', value: '100% Acciaio' },
          { label: 'Temp. Servizio', value: '8 - 10° C' }
      ]
  },
  'vespro': {
      name: 'VESPRO',
      type: 'Nosiola',
      price: '22 €',
      color: '#b45309',
      quote: '"L\'ora d\'oro. La morbidezza della tradizione che accoglie la sera."',
      description: `
          <p>Da un ettaro di Nosiola a Pressano nasce un bianco identitario, che unisce rispetto per la storia e sensibilità contemporanea.</p>
          <p>La vinificazione prevede un <strong>breve passaggio in legno</strong>, sufficiente ad arrotondare il sorso senza coprire la delicatezza varietale. Emergono note di frutta a polpa bianca, mandorla e leggere sfumature speziate.</p>
          <p>È un vino di equilibrio: fresco ma avvolgente, tradizionale ma attuale. La Nosiola qui non è nostalgia, ma scelta consapevole.</p>
      `,
      icon: `
          <svg width="80" height="80" viewBox="0 0 100 100">
              <path d="M30 65 A 20 20 0 0 1 70 65" fill="none" stroke="currentColor" stroke-width="1.5"/>
              <path d="M10 65 H90" stroke="currentColor" stroke-width="1.5"/>
              <path d="M50 45 V30 M35 50 L22 38 M65 50 L78 38" stroke="currentColor" stroke-width="1.5"/>
          </svg>`,
      specs: [
          { label: 'Uvaggio', value: 'Nosiola 100%' },
          { label: 'Zona', value: 'Pressano (1 Ettaro)' },
          { label: 'Affinamento', value: 'Breve in legno' },
          { label: 'Temp. Servizio', value: '10 - 12° C' }
      ]
  },
  'crepuscolo': {
      name: 'CREPUSCOLO',
      type: 'Pinot Nero Riserva',
      price: '35 €',
      color: '#8a3324',
      quote: '"L\'eleganza del Pinot Nero nel mistero delle prime ombre."',
      description: `
          <p>Dalle vigne di Ville di Giovo nasce un Pinot Nero di montagna, affinato <strong>3 anni in barriques</strong>.</p>
          <p>Le escursioni termiche della Val di Cembra donano tensione e finezza aromatica; l'affinamento in legno scolpisce struttura e profondità. Profumi di piccoli frutti rossi, spezie dolci e leggere note tostate. Il sorso è elegante, progressivo, con tannino setoso e lunga persistenza.</p>
          <p>È il vino della sera, della riflessione, della conversazione lenta.</p>
      `,
      icon: `
          <svg width="80" height="80" viewBox="0 0 100 100">
              <path d="M45 30 A 22 22 0 1 0 72 55 A 26 26 0 0 1 45 30 Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="25" cy="40" r="1.5" fill="currentColor"/>
              <circle cx="80" cy="30" r="1" fill="currentColor"/>
              <circle cx="55" cy="75" r="1.5" fill="currentColor"/>
          </svg>`,
      specs: [
          { label: 'Uvaggio', value: 'Pinot Nero' },
          { label: 'Zona', value: 'Ville di Giovo' },
          { label: 'Affinamento', value: '3 anni in Barriques' },
          { label: 'Temp. Servizio', value: '16 - 18° C' }
      ]
  },
  'prytaneum': {
      name: 'PRYTANEUM',
      type: 'Trento DOC Riserva Extra Brut',
      price: '80 €',
      color: '#c5a059',
      quote: '"Il centro pulsante, il focolare che non si spegne mai."',
      description: `
          <p>PRYTANEUM è la sintesi di tutto il ciclo. Base Chardonnay proveniente dai filari di Pressano allevati a pergola trentina, è il vino di punta dell'azienda: una <strong>Trento DOC Riserva Extra Brut</strong> che custodisce la luce per anni prima di svelarsi.</p>
          <p>È struttura e tensione, profondità e precisione.<br>È oro puro, tempo e saggezza.<br>Uno spumante che nasce per durare, capace di unire freschezza verticale e complessità evolutiva in un sorso pieno, vibrante, persistente.</p>
      `,
      icon: `
          <svg width="80" height="80" viewBox="0 0 100 100">
              <path d="M50 20 Q 75 55 50 85 Q 25 55 50 20 Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="50" cy="65" r="3.5" fill="currentColor"/>
              <path d="M50 35 V55" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 4"/>
          </svg>`,
      specs: [
          { label: 'Uvaggio', value: 'Chardonnay (Pergola)' },
          { label: 'Zona', value: 'Pressano' },
          { label: 'Tipologia', value: 'Riserva Extra Brut' },
          { label: 'Longevità', value: 'Oltre 10 anni' }
      ]
  }
};

const sommelierRules = {
  'alba': { 
      keywords: ['aperitivo', 'crudo', 'sushi', 'sashimi', 'fritto', 'frittura', 'antipasto', 'salumi', 'affettati', 'leggero', 'iniziare', 'fresco', 'pizza', 'pesce', 'stuzzichini', 'tartine', 'snack', 'tramonto', 'compagnia', 'amici', 'mozzarella', 'burrata', 'prosciutto'], 
      reason: "Per iniziare al meglio, per un aperitivo o per accompagnare piatti leggeri e crudi, la freschezza e la bollicina tesa di ALBA sono l'abbinamento ideale che pulisce il palato." 
  },
  'zenit': { 
      keywords: ['verdure', 'verdura', 'asparagi', 'speziato', 'asiatico', 'erbe', 'caprino', 'lago', 'aromatico', 'insalata', 'vegetariano', 'vegano', 'delicato', 'zucchine', 'minestrone', 'vellutata', 'trota', 'salmerino', 'curry', 'piccante', 'fusion', 'orientale'], 
      reason: "I profumi di erbe alpine di ZENIT esaltano perfettamente piatti aromatici, verdure, pesce delicato e formaggi freschi. Un sorso agile e purissimo." 
  },
  'vespro': { 
      keywords: ['pasta', 'spaghetti', 'maccheroni', 'carne bianca', 'pollo', 'tacchino', 'forno', 'funghi', 'porcini', 'canederli', 'primo', 'tradizione', 'risotto', 'zuppa', 'maiale', 'vitello', 'baccalà', 'formaggio dolce', 'pranzo', 'pesce al forno'], 
      reason: "La morbidezza e la leggera speziatura della Nosiola VESPRO abbracciano a meraviglia primi piatti, carni bianche e sapori legati alla terra e alla tradizione." 
  },
  'crepuscolo': { 
      keywords: ['carne', 'rossa', 'bistecca', 'fiorentina', 'arrosto', 'selvaggina', 'cinghiale', 'tartufo', 'stagionato', 'grigliata', 'tagliata', 'barbecue', 'bbq', 'ragù', 'brasato', 'cervo', 'capriolo', 'hamburger', 'costata', 'formaggio forte', 'meditazione', 'sera', 'caminetto', 'inverno', 'autunno', 'patate al forno'], 
      reason: "Per carni rosse, arrosti o piatti dal sapore intenso come la fiorentina, l'eleganza, la profondità e il tannino setoso del Pinot Nero CREPUSCOLO sono imprescindibili." 
  },
  'prytaneum': { 
      keywords: ['crostacei', 'aragosta', 'ostriche', 'caviale', 'speciale', 'anniversario', 'festa', 'tutto pasto', 'complesso', 'importante', 'regalo', 'celebrare', 'astice', 'scampi', 'capesante', 'brindisi', 'crudité', 'gran crudo', 'ricorrenza', 'matrimonio'], 
      reason: "Di fronte ad ingredienti nobili o a un momento davvero speciale, la struttura maestosa e l'oro di PRYTANEUM dominano la scena con un'eleganza assoluta." 
  }
};

// --- DATI APPARTAMENTI E GALLERIE ---
const apartments = [
    {
        id: 'gelso',
        name: 'Stanza del Gelso',
        beds: '2 Posti Letto',
        size: '35 mq',
        price: '120 €',
        description: 'Intima e luminosa, questa stanza affaccia sul vecchio gelso secolare del cortile interno. Un richiamo alle antiche tradizioni contadine, con pavimenti in legno di larice spazzolato e tessuti in lino naturale.',
        image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80',
        gallery: []
    },
    {
        id: 'pietra',
        name: 'Rifugio in Pietra',
        beds: '4 Posti Letto',
        size: '55 mq',
        price: '160 €',
        description: 'Le pareti in siltite rossa originale a vista raccontano la storia del maso e del terroir di Pressano. Uno spazio generoso, dotato di zona living separata, ideale per chi cerca respiro e frescura naturale.',
        image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80',
        gallery: []
    },
    {
        id: 'vento',
        name: 'Loggia del Vento',
        beds: '2 Posti Letto',
        size: '40 mq',
        price: '140 €',
        description: 'Prende il nome dall\'Ora del Garda, la brezza che accarezza i nostri vigneti nel pomeriggio. Dispone di un intimo balcone privato in legno, perfetto per degustare un calice di Vespro al tramonto.',
        image: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&q=80',
        gallery: []
    },
    {
        id: 'stelle',
        name: 'Soffitta delle Stelle',
        beds: '2 Posti Letto (Suite)',
        size: '45 mq',
        price: '180 €',
        description: 'Il nido più romantico. Sotto il tetto spiovente restaurato con travi a vista, piccoli lucernari si aprono sul cielo notturno. Completa di vasca classica in camera per momenti di puro relax dopo la vigna.',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80',
        gallery: []
    }
];

const activitiesDB = {
    'luce': {
        id: 'luce', title: 'Il Ciclo della Luce', subtitle: 'Cantina & Vigneto', price: 30, 
        description: 'Il percorso include la visita al vigneto, alla barriccaia e la degustazione guidata dei 4 calici (Alba, Zenit, Vespro, Crepuscolo) con accompagnamento di prodotti tipici locali.',
        duration: 'Circa 2 ore', type: 'persona', minGuests: 1
    },
    'adozione': {
        id: 'adozione', title: 'Adotta un Filare', subtitle: 'Progetto Vigna', price: 150, 
        description: 'Adozione di un filare di Müller Thurgau per una stagione (Disponibilità: 5 filari). Include targhetta col nome, 6 bottiglie personalizzate a fine stagione e aggiornamenti mensili sullo stato della vigna.',
        duration: 'Annuale', type: 'totale', isFixed: true, minGuests: 1
    },
    'trekking1': {
        id: 'trekking1', title: 'Trekking: Territorio', subtitle: 'Passeggiata & Degustazione', price: 35, 
        description: 'Camminata guidata al tramonto e degustazione dei vini più legati al terroir: la Nosiola e lo spumante Alba.',
        duration: '60/90 min', type: 'persona', minGuests: 2
    },
    'trekking2': {
        id: 'trekking2', title: 'Trekking: Premium', subtitle: 'Passeggiata & Degustazione', price: 55, 
        description: 'Camminata guidata al tramonto e degustazione di vini premium a scelta o la nostra migliore selezione.',
        duration: '60/90 min', type: 'persona', minGuests: 4
    },
    'cieca': {
        id: 'cieca', title: 'Degustazione Cieca', subtitle: 'Esperienza Sensoriale', price: 25, 
        description: 'Lasciati guidare dai sensi. Degustazione bendati per scoprire i profumi del territorio in modo inedito.',
        duration: '60 min', type: 'persona', minGuests: 1
    }
};

const App = () => {
  const [view, setView] = useState('landing');
  const [activeSection, setActiveSection] = useState(null);
  
  // Stati per la Collezione
  const [selectedWine, setSelectedWine] = useState(null);
  const [sommelierInput, setSommelierInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [sommelierResult, setSommelierResult] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Azione temporaneamente disabilitata.');
  const sommelierResultRef = useRef(null);

  // Stati per Gallerie Agriturismo
  const [openGalleryId, setOpenGalleryId] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  // --- STATI PER LA PRENOTAZIONE ---
  const [bookingApt, setBookingApt] = useState(null);
  const [bookingMonth, setBookingMonth] = useState(new Date());
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState({ adults: 1, teens: 0, children: 0 });

  // --- STATI PER PRENOTAZIONE ATTIVITÀ ---
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activityDate, setActivityDate] = useState(null);
  const [activityTime, setActivityTime] = useState(null);
  const [activityGuests, setActivityGuests] = useState({ adults: 1, children: 0 });

  // Blocco scroll body quando ci sono modali aperte
  useEffect(() => {
      if (selectedWine || lightboxImage || bookingApt || selectedActivity) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = 'unset';
      }
      return () => {
          document.body.style.overflow = 'unset';
      };
  }, [selectedWine, lightboxImage, bookingApt, selectedActivity]);

  const openActivity = (id) => {
      const act = activitiesDB[id];
      setSelectedActivity(act);
      setActivityDate(null);
      setActivityTime(null);
      setActivityGuests({ adults: act.minGuests || 1, children: 0 });
      setBookingMonth(new Date());
  };

  // Logo Maso SPARC
  const MasoSparcLogo = ({ className = "w-16 h-16", color = "currentColor" }) => (
    <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 50L60 30L100 50" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M35 50H85" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5"/>
      <circle cx="60" cy="15" r="2" fill={color} />
      <circle cx="48" cy="22" r="1.5" fill={color} opacity="0.8" />
      <circle cx="72" cy="22" r="1.5" fill={color} opacity="0.8" />
      <circle cx="40" cy="35" r="1" fill={color} opacity="0.6" />
      <circle cx="80" cy="35" r="1" fill={color} opacity="0.6" />
      <circle cx="54" cy="28" r="1" fill={color} opacity="0.4" />
      <circle cx="66" cy="28" r="1" fill={color} opacity="0.4" />
    </svg>
  );

  const mosaicTiles = [
    { id: 'collezione', title: 'Collezione', subtitle: 'Le linee dei vini', size: 'md:col-span-2 md:row-span-2', bgColor: 'bg-[#181515]', watermark: 'C', icon: <Wine className="mb-4 text-[#BFA872]" size={32} />, image: 'https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?auto=format&fit=crop&q=80' },
    { id: 'agriturismo', title: 'Agriturismo', subtitle: 'Le nostre camere', size: 'md:col-span-1 md:row-span-2 lg:col-span-2 lg:row-span-1', bgColor: 'bg-[#161715]', watermark: 'A', icon: <Home className="mb-4 text-[#BFA872]" size={32} />, image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80' },
    { id: 'visite', title: 'Visite e Attività', subtitle: 'Esperienze e territorio', size: 'md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1', bgColor: 'bg-[#151618]', watermark: 'V', icon: <CalendarIcon className="mb-4 text-[#BFA872]" size={24} />, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80' },
    { id: 'storia_territorio', title: 'Storia e Territorio', subtitle: 'Le nostre radici, Pressano e il clima', size: 'md:col-span-2 md:row-span-1 lg:col-span-1 lg:row-span-1', bgColor: 'bg-[#181614]', watermark: 'S', icon: <History className="mb-4 text-[#BFA872]" size={24} />, image: 'https://www.ilmulo.it/wp-content/uploads/2021/06/pressano_179_copy.jpg' }
  ];

  const handleAskSommelier = () => {
    if (!sommelierInput.trim()) return;
    setSommelierResult(null);
    setIsThinking(true);

    setTimeout(() => {
        let bestMatch = 'alba';
        let maxScore = 0;
        const inputLower = sommelierInput.toLowerCase();

        for (const [wineId, data] of Object.entries(sommelierRules)) {
            let currentScore = 0;
            data.keywords.forEach(keyword => {
                if (inputLower.includes(keyword)) {
                    currentScore += keyword.length;
                }
            });
            if (currentScore > maxScore) {
                maxScore = currentScore;
                bestMatch = wineId;
            }
        }

        let reason = sommelierRules[bestMatch].reason;
        if (maxScore === 0) {
            bestMatch = 'prytaneum';
            reason = "Per una richiesta così particolare e libera, andiamo sul sicuro: l'eccellenza e la longevità di PRYTANEUM sapranno accompagnare il tuo momento con maestria ineguagliabile.";
        }

        setSommelierResult({ wineId: bestMatch, reason });
        setIsThinking(false);
        setTimeout(() => sommelierResultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
        setSommelierInput('');
    }, 1500);
  };

  const triggerToast = (msg = 'Azione temporaneamente disabilitata.') => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  const toggleGallery = (id) => {
    if (openGalleryId === id) {
        setOpenGalleryId(null);
    } else {
        setOpenGalleryId(id);
    }
  };

  // --- LOGICA PRENOTAZIONE E CALENDARIO ---
  const openBooking = (apt) => {
      setBookingApt(apt);
      setCheckIn(null);
      setCheckOut(null);
      setGuests({ adults: 1, teens: 0, children: 0 });
      setBookingMonth(new Date());
  };

  const closeBooking = () => {
      setBookingApt(null);
  };

  const getMaxGuests = (bedsString) => {
      return parseInt(bedsString.match(/\d+/)[0]) || 2;
  };

  const updateGuests = (type, delta) => {
      if (!bookingApt) return;
      const max = getMaxGuests(bookingApt.beds);
      const currentTotal = guests.adults + guests.teens + guests.children;
      
      if (delta > 0 && currentTotal >= max) {
          triggerToast(`Questo appartamento ospita al massimo ${max} persone.`);
          return;
      }
      
      setGuests(prev => {
          const newValue = prev[type] + delta;
          if (newValue < 0) return prev;
          if (type === 'adults' && newValue < 1) return prev; // Almeno 1 adulto
          return { ...prev, [type]: newValue };
      });
  };

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => {
      const day = new Date(year, month, 1).getDay();
      return day === 0 ? 6 : day - 1; // Lunedì come primo giorno (0-6)
  };

  const handleDayClick = (dayNumber) => {
      const selectedDate = new Date(bookingMonth.getFullYear(), bookingMonth.getMonth(), dayNumber);
      selectedDate.setHours(0,0,0,0);
      const today = new Date();
      today.setHours(0,0,0,0);

      if (selectedDate < today) return; // Disabilita giorni passati

      if (!checkIn || (checkIn && checkOut)) {
          setCheckIn(selectedDate);
          setCheckOut(null);
      } else if (selectedDate > checkIn) {
          setCheckOut(selectedDate);
      } else {
          setCheckIn(selectedDate);
          setCheckOut(null);
      }
  };

  const calculateNights = () => {
      if (!checkIn || !checkOut) return 0;
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return diffDays;
  };

  // --- LOGICA CALENDARIO ATTIVITÀ ---
  const handleActivityDayClick = (dayNumber) => {
      const selectedDate = new Date(bookingMonth.getFullYear(), bookingMonth.getMonth(), dayNumber);
      selectedDate.setHours(0,0,0,0);
      const today = new Date();
      today.setHours(0,0,0,0);

      if (selectedDate < today) return; 
      
      // Controllo date Adozione (1 Giugno - 1 Agosto dell'anno corrente)
      if (selectedActivity?.id === 'adozione') {
          const year = selectedDate.getFullYear();
          const startAdozione = new Date(year, 5, 1); // 1 Giugno (mese 5)
          const endAdozione = new Date(year, 7, 1);   // 1 Agosto (mese 7)
          if (selectedDate < startAdozione || selectedDate > endAdozione) {
              return; // Ignora click se fuori range
          }
      }

      setActivityDate(selectedDate);
  };

  const updateActivityGuests = (type, delta) => {
      if (!selectedActivity) return;
      
      const currentTotal = activityGuests.adults + activityGuests.children;
      if (delta > 0 && currentTotal >= 12) {
          triggerToast("Massimo 12 persone per gruppo.");
          return;
      }
      
      setActivityGuests(prev => {
          const newValue = prev[type] + delta;
          if (newValue < 0) return prev;
          
          if (type === 'adults') {
              const min = selectedActivity.minGuests || 1;
              if (newValue < min) return prev;
          }
          return { ...prev, [type]: newValue };
      });
  };

  const renderCalendar = () => {
      const year = bookingMonth.getFullYear();
      const month = bookingMonth.getMonth();
      const daysInMonth = getDaysInMonth(year, month);
      const firstDayOffset = getFirstDayOfMonth(year, month);
      const today = new Date();
      today.setHours(0,0,0,0);

      const days = [];
      for (let i = 0; i < firstDayOffset; i++) {
          days.push(<div key={`blank-${i}`} className="h-10"></div>);
      }

      for (let d = 1; d <= daysInMonth; d++) {
          const date = new Date(year, month, d);
          date.setHours(0,0,0,0);
          const isPast = date < today;
          
          let isSelected = false;
          let isBetween = false;

          if (checkIn && date.getTime() === checkIn.getTime()) isSelected = true;
          if (checkOut && date.getTime() === checkOut.getTime()) isSelected = true;
          if (checkIn && checkOut && date > checkIn && date < checkOut) isBetween = true;

          let baseClass = "h-10 w-full flex items-center justify-center text-sm font-['Montserrat'] transition-colors ";
          
          if (isPast) {
              baseClass += "text-gray-300 cursor-not-allowed";
          } else if (isSelected) {
              baseClass += "bg-[#1A1A1A] text-white font-bold rounded-sm shadow-md";
          } else if (isBetween) {
              baseClass += "bg-stone-200 text-[#1A1A1A]";
          } else {
              baseClass += "text-gray-700 hover:bg-stone-100 cursor-pointer rounded-sm";
          }

          days.push(
              <div 
                  key={d} 
                  className={baseClass}
                  onClick={() => !isPast && handleDayClick(d)}
              >
                  {d}
              </div>
          );
      }
      return days;
  };

  const renderActivityCalendar = () => {
      const year = bookingMonth.getFullYear();
      const month = bookingMonth.getMonth();
      const daysInMonth = getDaysInMonth(year, month);
      const firstDayOffset = getFirstDayOfMonth(year, month);
      const today = new Date();
      today.setHours(0,0,0,0);

      const days = [];
      for (let i = 0; i < firstDayOffset; i++) {
          days.push(<div key={`blank-${i}`} className="h-10"></div>);
      }

      for (let d = 1; d <= daysInMonth; d++) {
          const date = new Date(year, month, d);
          date.setHours(0,0,0,0);
          let isPast = date < today;

          // Regola per Adozione: prenotabile solo tra l'1 Giugno e l'1 Agosto
          if (selectedActivity?.id === 'adozione') {
              const startAdozione = new Date(year, 5, 1); // 1 Giugno
              const endAdozione = new Date(year, 7, 1);   // 1 Agosto
              if (date < startAdozione || date > endAdozione) {
                  isPast = true; 
              }
          }
          
          let isSelected = activityDate && date.getTime() === activityDate.getTime();
          let baseClass = "h-10 w-full flex items-center justify-center text-sm font-['Montserrat'] transition-colors ";
          
          if (isPast) {
              baseClass += "text-gray-300 cursor-not-allowed";
          } else if (isSelected) {
              baseClass += "bg-[#1A1A1A] text-white font-bold rounded-sm shadow-md";
          } else {
              baseClass += "text-gray-700 hover:bg-stone-100 cursor-pointer rounded-sm";
          }

          days.push(
              <div 
                  key={d} 
                  className={baseClass}
                  onClick={() => !isPast && handleActivityDayClick(d)}
              >
                  {d}
              </div>
          );
      }
      return days;
  };

  // 1. LANDING PAGE
  if (view === 'landing') {
    return (
      <div className="relative h-screen w-full overflow-hidden bg-[#1A1A1A] flex flex-col items-center justify-center selection:bg-[#BFA872]">
        {/* Sfondo aggiornato con immagine definitiva Unsplash */}
        <div className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay transform scale-105 animate-[pulse_20s_ease-in-out_infinite]" style={{ backgroundImage: "url('/masosparc.github.io/sfondo_vigneto.jpg')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-[#1A1A1A]/80"></div>
        <div className="relative z-10 flex flex-col items-center text-center animate-[fadeIn_2s_ease-out]">
          <MasoSparcLogo className="w-24 h-24 text-[#BFA872] mb-8 drop-shadow-2xl" color="#BFA872" />
          <h1 className="text-7xl md:text-9xl font-serif text-white tracking-tighter drop-shadow-2xl mb-2">Maso <span className="italic font-light text-[#BFA872]">SPARC</span></h1>
          <div className="mb-20">
            <p className="text-[#BFA872] text-[10px] uppercase tracking-[0.8em] font-bold drop-shadow-md mb-2">PRESSANO - TRENTO DOC & MORE...</p>
            <p className="text-white/80 font-['Cormorant_Garamond'] text-lg md:text-xl italic tracking-[0.1em]">Cinque storie, una scintilla: le bollicine di Pressano</p>
          </div>
          <button onClick={() => setView('mosaic')} className="group flex flex-col items-center gap-4 cursor-pointer">
            <span className="text-white text-xs uppercase tracking-[0.4em] font-light group-hover:text-[#BFA872] transition-colors">Entra</span>
            <div className="w-px h-12 bg-white/30 group-hover:bg-[#BFA872] group-hover:h-16 transition-all duration-300"></div>
          </button>
        </div>
      </div>
    );
  }

  // 2. VISTA SEZIONI
  if (view === 'section' && activeSection) {
    return (
      <div className={`min-h-screen bg-[#FDFCFB] text-[#1A1A1A] animate-[fadeIn_0.5s_ease-out] ${(selectedWine || lightboxImage || bookingApt || selectedActivity) ? 'overflow-hidden' : ''}`}>
        
        {/* Navbar standard - Nascosta se la pagina prodotto o modali sono aperti */}
        {(!selectedWine && !bookingApt && !selectedActivity) && (
            <nav className="fixed w-full z-40 bg-white/90 backdrop-blur-md border-b border-stone-100 h-20 flex items-center px-6 transition-all shadow-sm">
            <button onClick={() => { setView('mosaic'); setActiveSection(null); }} className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-[#BFA872] transition-colors">
                <ArrowLeft size={16} /> Torna al Maso
            </button>
            <div className="mx-auto flex items-center gap-3 pr-16">
                <MasoSparcLogo className="w-8 h-8 text-[#BFA872]" color="#BFA872" />
                <span className="font-serif tracking-[0.2em] uppercase text-sm">Maso SPARC</span>
            </div>
            </nav>
        )}

        <style dangerouslySetInnerHTML={{__html: `
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Pinyon+Script&family=Montserrat:wght@200;300;400;600&family=Cinzel:wght@400;500;700&display=swap');
        `}} />

        {/* --- SEZIONE COLLEZIONE --- */}
        {activeSection.id === 'collezione' ? (
          <div className="bg-gray-100 text-gray-800 font-sans p-4 md:p-12 min-h-screen pt-32 pb-20 transition-opacity duration-500" style={{ opacity: selectedWine ? 0 : 1 }}>
             <style dangerouslySetInnerHTML={{__html: `
              .label-shadow { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0,0,0,0.1); }
              .paper-ivory { background-color: #fdfbf7; background-image: url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23d4c5b0' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E"); }
              .paper-ice { background-color: #f8fafc; background-image: url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h4v4H0V0zm2 2h2v2H2V2z' fill='%23e2e8f0' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E"); }
              .paper-sand { background-color: #f0e6d2; background-image: url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23c2b090' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E"); }
              .stone-dark { background-color: #1a1a1a; background-image: url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23333' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E"); }
              .prytaneum-black { background-color: #0a0a0a; background-image: url("data:image/svg+xml,%3Csvg width='2' height='2' viewBox='0 0 2 2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0V0zm1 1h1v1H1V1z' fill='%23111' fill-opacity='1'/%3E%3C/svg%3E"); }
              
              .perspective { perspective: 1000px; }
              .preserve-3d { transform-style: preserve-3d; -webkit-transform-style: preserve-3d; }
              .front-face { -webkit-backface-visibility: hidden; backface-visibility: hidden; transform: rotateY(0deg) translateZ(1px); -webkit-transform: rotateY(0deg) translateZ(1px); z-index: 2; }
              .back-face { -webkit-backface-visibility: hidden; backface-visibility: hidden; transform: rotateY(180deg) translateZ(1px); -webkit-transform: rotateY(180deg) translateZ(1px); z-index: 1; }
              .flip-container.is-flipped .preserve-3d { transform: rotateY(180deg); -webkit-transform: rotateY(180deg); }
              
              .thinking-dot { animation: thinking 1.4s infinite ease-in-out both; }
              .thinking-dot:nth-child(1) { animation-delay: -0.32s; }
              .thinking-dot:nth-child(2) { animation-delay: -0.16s; }
              @keyframes thinking { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
            `}} />
            <div className="max-w-[1600px] mx-auto">
                <header className="text-center mb-16">
                    <h1 className="text-6xl font-serif text-gray-900 mb-3 italic font-bold">Maso Sparc</h1>
                    <p className="text-gray-500 uppercase tracking-[0.2em] text-sm font-serif">Il Ritmo della Luce: Collezione Completa</p>
                    <p className="text-gray-400 text-xs mt-3 italic animate-pulse">(Clicca sulle etichette per scoprirne l'anima)</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-end justify-center mb-32">
                    
                    {/* 1. ALBA */}
                    <div className="flex flex-col items-center group">
                        <div className="mb-4 text-center">
                            <span className="text-[#a38f60] text-[10px] uppercase tracking-widest font-bold">Mattino</span>
                        </div>
                        <div className="relative w-[240px] h-[400px] perspective cursor-pointer flip-container transform transition duration-500 group-hover:-translate-y-2" onClick={(e) => { if(e.target.tagName !== 'BUTTON') e.currentTarget.classList.toggle('is-flipped'); }}>
                            <div className="w-full h-full transition-transform duration-700 preserve-3d">
                                <div className="absolute inset-0 front-face paper-ivory label-shadow border border-gray-200">
                                    <div className="absolute inset-2 border border-[#a38f60] opacity-40"></div>
                                    <div className="relative z-10 h-full flex flex-col justify-between py-8 px-4 text-center">
                                        <div className="flex flex-col items-center">
                                            <svg width="60" height="40" viewBox="0 0 100 60" className="mb-1">
                                                <g fill="#a38f60"><circle cx="50" cy="15" r="3" /> <circle cx="50" cy="5" r="2" opacity="0.6"/><circle cx="35" cy="20" r="2.5" /> <circle cx="28" cy="12" r="1.5" opacity="0.6"/><circle cx="65" cy="20" r="2.5" /> <circle cx="72" cy="12" r="1.5" opacity="0.6"/></g>
                                                <path d="M10 50 L50 25 L90 50" stroke="#a38f60" strokeWidth="2" fill="none" />
                                            </svg>
                                            <p className="font-['Pinyon_Script'] text-xl text-gray-500 -mb-1 transform -rotate-2">Maso</p>
                                            <h1 className="font-['Playfair_Display'] font-bold text-2xl text-[#a38f60] uppercase tracking-wider">SPARC</h1>
                                            <h2 className="font-['Cinzel'] text-lg text-gray-400 tracking-[0.4em] font-light mt-2 uppercase">Alba</h2>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="font-['Montserrat'] text-[9px] tracking-[0.25em] text-gray-800 font-bold uppercase">Trento Doc</h3>
                                        </div>
                                        <p className="font-['Montserrat'] text-[7px] uppercase tracking-[0.2em] text-gray-400 leading-tight">Vendemmia 2024<br/>Sboccatura Maggio 2026</p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 back-face paper-ivory label-shadow border border-gray-200">
                                    <div className="absolute inset-2 border border-[#a38f60] opacity-40"></div>
                                    <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                                        <h4 className="font-bold text-gray-800 uppercase tracking-widest mb-3 text-sm font-['Cinzel']">Alba</h4>
                                        <p className="text-gray-700 text-[15px] leading-relaxed font-light font-['Cormorant_Garamond'] italic">
                                            L'energia verticale del mattino. Freschezza e purezza nel calice.
                                        </p>
                                        <button onClick={(e) => { e.stopPropagation(); setSelectedWine('alba'); }} className="mt-6 px-6 py-2 border border-[#a38f60] text-[#a38f60] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#a38f60] hover:text-[#fdfbf7] transition-colors duration-300">Acquista</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. ZENIT */}
                    <div className="flex flex-col items-center group">
                         <div className="mb-4 text-center">
                            <span className="text-[#64748b] text-[10px] uppercase tracking-widest font-bold">Mezzogiorno</span>
                        </div>
                        <div className="relative w-[240px] h-[400px] perspective cursor-pointer flip-container transform transition duration-500 group-hover:-translate-y-2" onClick={(e) => { if(e.target.tagName !== 'BUTTON') e.currentTarget.classList.toggle('is-flipped'); }}>
                            <div className="w-full h-full transition-transform duration-700 preserve-3d">
                                <div className="absolute inset-0 front-face paper-ice label-shadow border border-gray-200">
                                    <div className="absolute inset-2 border border-[#94a3b8] opacity-30"></div>
                                    <div className="relative z-10 h-full flex flex-col justify-between py-8 px-4 text-center">
                                        <div className="flex flex-col items-center">
                                            <svg width="50" height="30" viewBox="0 0 100 60" className="mb-1">
                                                <g fill="#64748b"><circle cx="50" cy="10" r="4" /><circle cx="50" cy="20" r="2" opacity="0.5"/></g>
                                                <path d="M10 50 L50 25 L90 50" stroke="#64748b" strokeWidth="2" fill="none" />
                                            </svg>
                                            <p className="font-['Pinyon_Script'] text-xl text-slate-400 -mb-1 transform -rotate-2">Maso</p>
                                            <h1 className="font-['Playfair_Display'] font-bold text-2xl text-[#475569] uppercase tracking-wider">SPARC</h1>
                                            <h2 className="font-['Montserrat'] text-lg text-[#64748b] tracking-[0.5em] font-light mt-2 uppercase">Zenit</h2>
                                        </div>
                                        <div className="space-y-2">
                                             <div className="w-6 h-px bg-[#94a3b8] mx-auto"></div>
                                            <h3 className="font-['Cinzel'] text-xs text-gray-800 font-bold uppercase tracking-widest">Müller Thurgau</h3>
                                        </div>
                                        <p className="font-['Montserrat'] text-[8px] uppercase tracking-[0.2em] text-gray-400">2025</p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 back-face paper-ice label-shadow border border-gray-200">
                                    <div className="absolute inset-2 border border-[#94a3b8] opacity-30"></div>
                                    <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                                        <h4 className="font-bold text-gray-800 uppercase tracking-widest mb-3 text-sm font-['Montserrat']">Zenit</h4>
                                        <p className="text-gray-700 text-[15px] leading-relaxed font-light font-['Cormorant_Garamond'] italic">
                                            La precisione aromatica assoluta della montagna a mezzogiorno.
                                        </p>
                                        <button onClick={(e) => { e.stopPropagation(); setSelectedWine('zenit'); }} className="mt-6 px-6 py-2 border border-[#64748b] text-[#64748b] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#64748b] hover:text-[#f8fafc] transition-colors duration-300">Acquista</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. VESPRO */}
                    <div className="flex flex-col items-center group">
                         <div className="mb-4 text-center">
                            <span className="text-[#b45309] text-[10px] uppercase tracking-widest font-bold">Pomeriggio</span>
                        </div>
                        <div className="relative w-[240px] h-[400px] perspective cursor-pointer flip-container transform transition duration-500 group-hover:-translate-y-2" onClick={(e) => { if(e.target.tagName !== 'BUTTON') e.currentTarget.classList.toggle('is-flipped'); }}>
                            <div className="w-full h-full transition-transform duration-700 preserve-3d">
                                <div className="absolute inset-0 front-face paper-sand label-shadow border border-[#d6d3d1]">
                                    <div className="absolute inset-2 border-2 border-[#b45309] opacity-20 border-double"></div>
                                    <div className="relative z-10 h-full flex flex-col justify-between py-8 px-4 text-center">
                                        <div className="flex flex-col items-center">
                                            <svg width="50" height="30" viewBox="0 0 100 60" className="mb-1">
                                                <g fill="#b45309"><circle cx="50" cy="15" r="3" /><circle cx="20" cy="30" r="2" opacity="0.7"/><circle cx="80" cy="30" r="2" opacity="0.7"/></g>
                                                <path d="M10 50 L50 25 L90 50" stroke="#b45309" strokeWidth="2" fill="none" />
                                            </svg>
                                            <p className="font-['Pinyon_Script'] text-xl text-[#b45309] -mb-1 transform -rotate-2 opacity-80">Maso</p>
                                            <h1 className="font-['Playfair_Display'] font-bold text-2xl text-[#78350f] uppercase tracking-wider">SPARC</h1>
                                            <h2 className="font-['Cormorant_Garamond'] text-xl text-[#b45309] tracking-[0.2em] font-normal mt-2 uppercase italic">Vespro</h2>
                                        </div>
                                        <div className="space-y-2">
                                             <div className="w-6 h-px bg-[#b45309] mx-auto opacity-50"></div>
                                            <h3 className="font-['Playfair_Display'] text-xs text-[#78350f] font-semibold uppercase tracking-widest">Nosiola</h3>
                                        </div>
                                        <p className="font-['Montserrat'] text-[8px] uppercase tracking-[0.2em] text-[#a16207] opacity-80">2022</p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 back-face paper-sand label-shadow border border-[#d6d3d1]">
                                    <div className="absolute inset-2 border-2 border-[#b45309] opacity-20 border-double"></div>
                                    <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                                        <h4 className="font-bold text-[#78350f] uppercase tracking-widest mb-3 text-sm font-['Playfair_Display']">Vespro</h4>
                                        <p className="text-[#78350f] text-[15px] leading-relaxed font-light font-['Cormorant_Garamond'] italic opacity-90">
                                            L'ora d'oro. La morbidezza della tradizione che accoglie la sera.
                                        </p>
                                        <button onClick={(e) => { e.stopPropagation(); setSelectedWine('vespro'); }} className="mt-6 px-6 py-2 border border-[#78350f] text-[#78350f] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#78350f] hover:text-[#f0e6d2] transition-colors duration-300">Acquista</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. CREPUSCOLO */}
                    <div className="flex flex-col items-center group">
                        <div className="mb-4 text-center">
                            <span className="text-[#8a3324] text-[10px] uppercase tracking-widest font-bold">Sera</span>
                        </div>
                        <div className="relative w-[240px] h-[400px] perspective cursor-pointer flip-container transform transition duration-500 group-hover:-translate-y-2" onClick={(e) => { if(e.target.tagName !== 'BUTTON') e.currentTarget.classList.toggle('is-flipped'); }}>
                            <div className="w-full h-full transition-transform duration-700 preserve-3d">
                                <div className="absolute inset-0 front-face stone-dark label-shadow border border-gray-800">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
                                    <div className="absolute inset-3 border border-[#cfaa92] opacity-30"></div>
                                    <div className="relative z-10 h-full flex flex-col justify-between py-8 px-4 text-center">
                                        <div className="flex flex-col items-center">
                                            <svg width="50" height="30" viewBox="0 0 100 60" className="mb-1">
                                                <g fill="#cfaa92"><circle cx="50" cy="15" r="3" /><circle cx="35" cy="20" r="3" /><circle cx="65" cy="20" r="3" /></g>
                                                <path d="M10 50 L50 25 L90 50" stroke="#e5e7eb" strokeWidth="1.5" fill="none" opacity="0.8"/>
                                            </svg>
                                            <p className="font-['Pinyon_Script'] text-xl text-gray-400 -mb-1 transform -rotate-2">Maso</p>
                                            <h1 className="font-['Playfair_Display'] font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-br from-[#eaddcf] to-[#cfaa92] uppercase tracking-wider">SPARC</h1>
                                            <h2 className="font-['Cormorant_Garamond'] italic text-xl text-[#eaddcf] tracking-wide font-light mt-2">Crepuscolo</h2>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="font-['Cormorant_Garamond'] text-md text-gray-400 font-normal">Pinot Nero</h3>
                                        </div>
                                        <p className="font-['Montserrat'] text-[8px] uppercase tracking-[0.2em] text-gray-600">Riserva 2018</p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 back-face stone-dark label-shadow border border-gray-800">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
                                    <div className="absolute inset-3 border border-[#cfaa92] opacity-30"></div>
                                    <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                                        <h4 className="font-bold text-[#eaddcf] uppercase tracking-widest mb-3 text-sm font-['Cormorant_Garamond'] italic">Crepuscolo</h4>
                                        <p className="text-gray-400 text-[15px] leading-relaxed font-light font-['Cormorant_Garamond'] italic">
                                            L'eleganza del Pinot Nero nel mistero delle prime ombre.
                                        </p>
                                        <button onClick={(e) => { e.stopPropagation(); setSelectedWine('crepuscolo'); }} className="mt-6 px-6 py-2 border border-[#cfaa92] text-[#cfaa92] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#cfaa92] hover:text-[#1a1a1a] transition-colors duration-300">Acquista</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. PRYTANEUM */}
                    <div className="flex flex-col items-center group">
                        <div className="mb-4 text-center">
                            <span className="text-[#d4af37] text-[10px] uppercase tracking-widest font-bold">Luce Perenne</span>
                        </div>
                        <div className="relative w-[240px] h-[400px] perspective cursor-pointer flip-container transform transition duration-500 group-hover:-translate-y-2" onClick={(e) => { if(e.target.tagName !== 'BUTTON') e.currentTarget.classList.toggle('is-flipped'); }}>
                            <div className="w-full h-full transition-transform duration-700 preserve-3d">
                                <div className="absolute inset-0 front-face prytaneum-black label-shadow border border-[#d4af37]/30">
                                    <div className="absolute inset-2 border border-[#d4af37] opacity-60"></div>
                                    <div className="absolute inset-[10px] border-[0.5px] border-[#d4af37] opacity-20"></div>
                                    <div className="relative z-10 h-full flex flex-col justify-between py-8 px-4 text-center">
                                        <div className="flex flex-col items-center">
                                            <svg width="60" height="40" viewBox="0 0 100 60" className="mb-1">
                                                <circle cx="50" cy="20" r="6" fill="none" stroke="#d4af37" strokeWidth="1" />
                                                <circle cx="50" cy="20" r="2" fill="#d4af37" />
                                                <g fill="#d4af37"><path d="M50 5 L52 12 L48 12 Z" /><path d="M50 35 L52 28 L48 28 Z" /><path d="M65 20 L58 18 L58 22 Z" /><path d="M35 20 L42 18 L42 22 Z" /></g>
                                                <path d="M10 50 L50 25 L90 50" stroke="#d4af37" strokeWidth="2" fill="none" />
                                            </svg>
                                            <p className="font-['Pinyon_Script'] text-xl text-[#d4af37] -mb-1 transform -rotate-2 opacity-90">Maso</p>
                                            <h1 className="font-['Playfair_Display'] font-bold text-2xl text-[#d4af37] uppercase tracking-wider">SPARC</h1>
                                            <div className="mt-4 py-2 border-y border-[#d4af37]/40 w-full">
                                                <h2 className="font-['Cinzel'] text-xl text-[#fef3c7] tracking-[0.25em] font-bold uppercase">Prytaneum</h2>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="font-['Montserrat'] text-[9px] tracking-[0.3em] text-[#d4af37] font-semibold uppercase">Trento Doc Riserva</h3>
                                            <p className="font-['Cormorant_Garamond'] text-xs italic text-gray-400">Extra Brut</p>
                                        </div>
                                        <p className="font-['Montserrat'] text-[8px] uppercase tracking-[0.3em] text-[#d4af37]">2016</p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 back-face prytaneum-black label-shadow border border-[#d4af37]/30">
                                    <div className="absolute inset-2 border border-[#d4af37] opacity-60"></div>
                                    <div className="absolute inset-[10px] border-[0.5px] border-[#d4af37] opacity-20"></div>
                                    <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                                        <h4 className="font-bold text-[#fef3c7] uppercase tracking-widest mb-3 text-sm font-['Cinzel']">Prytaneum</h4>
                                        <p className="text-gray-400 text-[14px] leading-relaxed font-light font-['Cormorant_Garamond'] italic">
                                            Il centro pulsante, il focolare che non si spegne mai.
                                        </p>
                                        <button onClick={(e) => { e.stopPropagation(); setSelectedWine('prytaneum'); }} className="mt-5 px-6 py-2 border border-[#d4af37] text-[#d4af37] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-colors duration-300">Acquista</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SOMMELIER VIRTUALE */}
                <div className="max-w-4xl mx-auto border-t border-gray-200 pt-20 px-4 mb-20">
                    <div className="text-center">
                        <svg className="w-10 h-10 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"></path></svg>
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 italic font-bold">Il Sommelier Virtuale</h2>
                        <p className="text-gray-500 font-['Cormorant_Garamond'] text-xl mb-10 md:px-20">Raccontaci cosa mangerai stasera, oppure l'atmosfera che desideri vivere. Ti consiglieremo il compagno di calice ideale.</p>
                        
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 relative z-10">
                            <input 
                                type="text" 
                                value={sommelierInput}
                                onChange={(e) => setSommelierInput(e.target.value)}
                                onKeyDown={(e) => { if(e.key === 'Enter') handleAskSommelier(); }}
                                placeholder="Es. risotto ai funghi, oppure 'aperitivo al tramonto'..." 
                                className="w-full md:w-2/3 px-6 py-4 border border-gray-300 bg-white/50 focus:bg-white focus:outline-none focus:border-gray-500 font-['Cormorant_Garamond'] text-xl italic transition-colors placeholder-gray-400 shadow-sm" 
                            />
                            <button onClick={handleAskSommelier} className="w-full md:w-auto px-10 py-5 bg-gray-900 text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-gray-800 transition-colors shadow-md whitespace-nowrap">Chiedi Consiglio</button>
                        </div>
                    </div>

                    {isThinking && (
                        <div className="mt-12 flex justify-center items-center space-x-2 h-24">
                            <div className="w-3 h-3 bg-gray-400 rounded-full thinking-dot"></div>
                            <div className="w-3 h-3 bg-gray-400 rounded-full thinking-dot"></div>
                            <div className="w-3 h-3 bg-gray-400 rounded-full thinking-dot"></div>
                        </div>
                    )}

                    {sommelierResult && (
                        <div ref={sommelierResultRef} className="mt-12 transition-all duration-700 bg-white border border-gray-200 shadow-lg p-8 md:p-12 text-center relative overflow-hidden group animate-[fadeIn_0.5s_ease-out]">
                            <div className="absolute inset-0 opacity-[0.03] transition-colors duration-1000" style={{ backgroundColor: wineDatabase[sommelierResult.wineId].color }}></div>
                            <div className="relative z-10">
                                <h3 className="font-['Cinzel'] text-xs tracking-[0.3em] uppercase text-gray-400 mb-2">Il nostro consiglio</h3>
                                <h4 className="text-4xl font-serif font-bold italic mb-6" style={{ color: wineDatabase[sommelierResult.wineId].color }}>
                                    {wineDatabase[sommelierResult.wineId].name}
                                </h4>
                                <p className="font-['Cormorant_Garamond'] text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                                    {sommelierResult.reason}
                                </p>
                                <button 
                                    onClick={() => setSelectedWine(sommelierResult.wineId)}
                                    className="px-8 py-3 border text-xs font-bold uppercase tracking-widest transition-colors duration-300 hover:text-white"
                                    style={{ borderColor: wineDatabase[sommelierResult.wineId].color, color: wineDatabase[sommelierResult.wineId].color }}
                                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = wineDatabase[sommelierResult.wineId].color; e.currentTarget.style.color = '#fff'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = wineDatabase[sommelierResult.wineId].color; }}
                                >
                                    Scopri la Bottiglia
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
          </div>
        ) : activeSection.id === 'agriturismo' ? (
          /* --- SEZIONE AGRITURISMO CON GALLERIE --- */
          <div className="bg-[#FDFCFB] text-[#1A1A1A] font-sans pb-20">
              
              {/* Hero Agriturismo (Senza Immagine) */}
              <div className="w-full flex flex-col items-center justify-center pt-40 pb-10">
                  <div className="text-center px-6 animate-[fadeIn_1s_ease-out]">
                      <Home className="mx-auto text-[#BFA872] mb-6" size={40} />
                      <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] text-stone-900 mb-4 italic font-bold">Dormire al Maso</h1>
                      <p className="text-[#BFA872] uppercase tracking-[0.4em] text-xs font-bold">Le nostre stanze tra i vigneti</p>
                  </div>
              </div>

              {/* Intro Text */}
              <div className="max-w-3xl mx-auto text-center py-10 px-6">
                  <p className="font-['Cormorant_Garamond'] text-2xl text-gray-700 italic leading-relaxed">
                      Svegliarsi con la luce che filtra dalle colline di Pressano. Il silenzio della campagna rotto solo dai ritmi lenti del maso. Abbiamo restaurato con cura quattro piccoli spazi per accogliere chi cerca l'autenticità del Trentino.
                  </p>
                  <div className="w-16 h-px bg-[#BFA872] mx-auto mt-10 opacity-50"></div>
              </div>

              {/* Gli Appartamenti (Layout proporzionato) */}
              <div className="max-w-[1100px] mx-auto px-6 space-y-24 md:space-y-32 mt-10">
                  {apartments.map((apt, index) => (
                      <div key={apt.id} className="flex flex-col gap-8 border-b border-gray-100 pb-20 last:border-0 last:pb-0">
                          {/* Layout principale Appartamento - Immagine più piccola, testo più arioso */}
                          <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 md:gap-14 items-center group`}>
                              
                              {/* Immagine Principale (Dimensioni contenute, aspect ratio fotografico 3:2) */}
                              <div className="w-full md:w-5/12 overflow-hidden relative shadow-lg bg-gray-100">
                                  <div className="aspect-[3/2] w-full h-full">
                                      <img src={apt.image} alt={apt.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                  </div>
                                  <div className="absolute inset-0 border border-black/5 mix-blend-overlay pointer-events-none"></div>
                              </div>
                              
                              {/* Testo e Controlli */}
                              <div className="w-full md:w-7/12 flex flex-col justify-center text-center md:text-left py-4">
                                  <h4 className="font-['Cinzel'] text-[10px] tracking-[0.3em] uppercase text-[#BFA872] mb-3">Alloggio {index + 1}</h4>
                                  <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-gray-900 mb-5 font-bold">{apt.name}</h2>
                                  
                                  <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-5">
                                      <span className="px-3 py-1 bg-stone-50 border border-stone-200 text-[10px] font-['Montserrat'] uppercase tracking-widest text-gray-600">{apt.beds}</span>
                                      <span className="px-3 py-1 bg-stone-50 border border-stone-200 text-[10px] font-['Montserrat'] uppercase tracking-widest text-gray-600">{apt.size}</span>
                                  </div>
                                  
                                  <p className="font-['Cormorant_Garamond'] text-lg md:text-xl text-gray-600 leading-relaxed mb-6 flex-grow">
                                      {apt.description}
                                  </p>
                                  
                                  <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
                                      <div className="text-center md:text-left min-w-[120px]">
                                          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">A partire da</p>
                                          <p className="text-2xl font-serif text-gray-900 font-bold">{apt.price} <span className="text-xs text-gray-400 font-normal italic">/ notte</span></p>
                                      </div>
                                      
                                      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                          <button onClick={() => openBooking(apt)} className="w-full sm:w-auto px-6 py-3 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest font-bold hover:bg-[#BFA872] transition-colors duration-300">
                                              Prenota Date
                                          </button>
                                          <button 
                                            onClick={() => apt.gallery.length > 0 && toggleGallery(apt.id)} 
                                            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border text-[10px] uppercase tracking-widest font-bold transition-colors duration-300 ${apt.gallery.length > 0 ? 'border-stone-300 text-[#1A1A1A] hover:bg-stone-50' : 'border-stone-200 text-stone-400 cursor-not-allowed'}`}
                                            disabled={apt.gallery.length === 0}
                                          >
                                              <ImageIcon size={14} />
                                              {openGalleryId === apt.id ? 'Chiudi' : (apt.gallery.length > 0 ? `Galleria (${apt.gallery.length})` : 'Galleria (In arrivo)')}
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          {/* Sezione Galleria Espandibile */}
                          <div className={`transition-all duration-700 ease-in-out overflow-hidden ${openGalleryId === apt.id ? 'max-h-[2000px] opacity-100 mt-2' : 'max-h-0 opacity-0 m-0'}`}>
                              <div className="pt-6 border-t border-gray-100">
                                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                      {apt.gallery.map((imgUrl, i) => (
                                          <div 
                                            key={i} 
                                            className="aspect-[4/3] bg-stone-100 cursor-pointer overflow-hidden group rounded-sm shadow-sm"
                                            onClick={() => setLightboxImage(imgUrl)}
                                          >
                                              <img 
                                                src={imgUrl} 
                                                alt={`${apt.name} dettaglio ${i+1}`} 
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                                              />
                                          </div>
                                      ))}
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>

              {/* Servizi Inclusi */}
              <div className="bg-stone-100 py-20 mt-32 border-y border-stone-200">
                  <div className="max-w-5xl mx-auto px-6">
                      <h3 className="text-center font-['Playfair_Display'] text-3xl text-gray-900 mb-16 italic font-bold">L'Ospitalità del Maso</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 text-center">
                          <div className="flex flex-col items-center">
                              <Coffee className="text-[#BFA872] mb-4" size={32} strokeWidth={1.5} />
                              <h4 className="font-['Cinzel'] text-sm uppercase tracking-widest font-bold mb-2">Colazione</h4>
                              <p className="text-xs text-gray-500 font-['Montserrat']">Prodotti a km zero</p>
                          </div>
                          <div className="flex flex-col items-center">
                              <Wine className="text-[#BFA872] mb-4" size={32} strokeWidth={1.5} />
                              <h4 className="font-['Cinzel'] text-sm uppercase tracking-widest font-bold mb-2">Degustazione</h4>
                              <p className="text-xs text-gray-500 font-['Montserrat']">Visita in cantina inclusa</p>
                          </div>
                          <div className="flex flex-col items-center">
                              <Wifi className="text-[#BFA872] mb-4" size={32} strokeWidth={1.5} />
                              <h4 className="font-['Cinzel'] text-sm uppercase tracking-widest font-bold mb-2">Wi-Fi Gratuito</h4>
                              <p className="text-xs text-gray-500 font-['Montserrat']">Connessione nell'intero maso</p>
                          </div>
                          <div className="flex flex-col items-center">
                              <Car className="text-[#BFA872] mb-4" size={32} strokeWidth={1.5} />
                              <h4 className="font-['Cinzel'] text-sm uppercase tracking-widest font-bold mb-2">Parcheggio</h4>
                              <p className="text-xs text-gray-500 font-['Montserrat']">Posto auto riservato</p>
                          </div>
                          <div className="flex flex-col items-center col-span-2 md:col-span-1">
                              <Dog className="text-[#BFA872] mb-4" size={32} strokeWidth={1.5} />
                              <h4 className="font-['Cinzel'] text-sm uppercase tracking-widest font-bold mb-2">Pet Friendly</h4>
                              <p className="text-xs text-gray-500 font-['Montserrat']">Amici a 4 zampe ammessi</p>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Lightbox per visualizzare le immagini a schermo intero */}
              {lightboxImage && (
                  <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 animate-[fadeIn_0.3s_ease-out]">
                      <button 
                        onClick={() => setLightboxImage(null)}
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
                      >
                          <X size={40} strokeWidth={1} />
                      </button>
                      <img 
                        src={lightboxImage} 
                        alt="Vista in dettaglio" 
                        className="max-w-full max-h-full object-contain shadow-2xl"
                      />
                  </div>
              )}

          </div>
        ) : activeSection.id === 'storia_territorio' ? (
          /* --- SEZIONE STORIA E TERRITORIO (UNIFICATA) --- */
          <div className="bg-[#FDFCFB] text-[#1A1A1A] font-sans pb-20">
              
              {/* Hero Storia e Territorio (Senza Immagine) */}
              <div className="w-full flex flex-col items-center justify-center pt-40 pb-10">
                  <div className="text-center px-6 animate-[fadeIn_1s_ease-out]">
                      <History className="mx-auto text-[#BFA872] mb-6" size={40} />
                      <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] text-stone-900 mb-4 italic font-bold">{activeSection.title}</h1>
                      <p className="text-[#BFA872] uppercase tracking-[0.4em] text-xs font-bold">{activeSection.subtitle}</p>
                  </div>
              </div>

              <div className="max-w-4xl mx-auto px-6 py-10 space-y-24">
                  
                  {/* Intro Quote */}
                  <div className="text-center">
                      <p className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-gray-800 italic leading-relaxed">
                          "Si sono conosciuti tra i banchi dell’università a San Michele. Quattro arrivavano dal Veneto, il quinto dalla Val di Cembra. Si sono incontrati quasi per caso. Sono diventati amici per scelta."
                      </p>
                      <div className="w-16 h-px bg-[#BFA872] mx-auto mt-10"></div>
                  </div>

                  {/* L'Incontro e la Scelta */}
                  <div>
                      <h2 className="font-['Cinzel'] text-2xl text-stone-900 mb-6 uppercase tracking-widest text-center">Un luogo, non solo una cantina</h2>
                      <div className="prose prose-stone max-w-none text-stone-600 font-['Cormorant_Garamond'] text-xl leading-relaxed text-justify">
                          <p>Le giornate in laboratorio, le degustazioni, le discussioni infinite sul terroir e sulle fermentazioni li hanno uniti. Ma più delle lezioni, erano i sogni a tenerli insieme: non volevano solo lavorare nel vino. Volevano creare qualcosa che parlasse di loro.</p>
                          <p>Hanno guardato la mappa e si sono resi conto che esisteva un posto simbolico: <strong>Pressano</strong>. A metà strada tra Nave San Rocco — dove i quattro si erano trasferiti per studiare — e Giovo, la casa del quinto amico. Un territorio vocato alla viticoltura, ma anche crocevia naturale tra persone, culture e storie.</p>
                          <p>Non poteva essere altrove. Così è nato il sogno di Maso Sparc. Il nome richiama il maso, la tradizione, la terra. Un luogo dove il vino non è solo prodotto, ma raccontato. Dove chi arriva non è un cliente, ma un ospite. Accanto alla cantina nasceranno un agriturismo immerso nei vigneti e visite guidate per far vivere il percorso dalla vite al calice.</p>
                          <p>Maso Sparc sarà il simbolo di un legame. Cinque ragazzi che hanno scelto di restare uniti. Cinque percorsi che si incontrano in un punto preciso della mappa — e della vita.</p>
                      </div>
                  </div>

                  {/* Il significato di S.P.A.R.C. */}
                  <div className="bg-stone-50 p-10 md:p-16 text-center border border-stone-200 relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-[#BFA872]"></div>
                      <h2 className="font-['Playfair_Display'] text-4xl text-stone-900 mb-6 font-bold">S.P.A.R.C.</h2>
                      <p className="font-['Montserrat'] text-xs uppercase tracking-[0.3em] text-stone-500 mb-8 border-b border-stone-200 inline-block pb-4">Scaramellini • Pajola • Alessandro • Ramon • Caneva</p>
                      <p className="font-['Cormorant_Garamond'] text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto">
                          Ci sono nomi che nascono da strategie di marketing. E poi ci sono nomi che nascono da un legame. Quando è arrivato il momento di scegliere, si sono messi allo stesso livello. Nessun cognome per esteso, nessuna gerarchia. Solo iniziali.
                      </p>
                      <p className="font-['Cormorant_Garamond'] text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto mt-4">
                          Un nome che suona deciso, diretto. Che ricorda una scintilla — uno <em>“spark”</em> — qualcosa che si accende e dà inizio a tutto. E richiama anche la <em>“sparkling”</em>, la bollicina. Il nome è l’unione tra radici e futuro. Tra territorio e persone. Ogni bottiglia porterà dentro quelle cinque lettere. E dentro quelle lettere, cinque storie diventate una sola.
                      </p>
                  </div>

                  {/* Prytaneum e le Radici */}
                  <div>
                      <h2 className="font-['Cinzel'] text-2xl text-stone-900 mb-6 uppercase tracking-widest text-center">Le Radici: Pressano e la "Prima Scelta"</h2>
                      <div className="prose prose-stone max-w-none text-stone-600 font-['Cormorant_Garamond'] text-xl leading-relaxed text-justify">
                          <p>Furono i Romani a fondare questo piccolo paese, chiamandolo <em>Prytaneum</em>. In latino significa "prima scelta". Avevano individuato un luogo straordinario: una collina con esposizione perfetta a sud-ovest, baciata dal sole fino a sera, protetta e ventilata al punto giusto.</p>
                          <p>Questa zona è caratterizzata da un terreno di origine morenica, il <strong>Werfen</strong>: una matrice antica, complessa, capace di dare ai vini struttura e tensione. È una terra che non regala nulla facilmente, ma quando viene rispettata restituisce vini di potenza, eleganza, sapidità e freschezza.</p>
                          <p>I possedimenti di Maso Sparc si estendono per 3,5 ettari, scelti con cura per unire altitudini e caratteri diversi:</p>
                          <ul className="list-disc pl-6 space-y-4 mt-6 marker:text-[#BFA872] italic">
                              <li><strong>2,5 ettari a Pressano:</strong> Il cuore del progetto. Di questi, 1,5 ettari sono coltivati a Chardonnay a pergola trentina, formando la base spumante per i nostri Trento DOC (Alba e Prytaneum). Il restante ettaro è dedicato alla Nosiola, l’unica varietà bianca autoctona del Trentino, custodendo l'identità storica del territorio.</li>
                              <li><strong>1 ettaro a Ville di Giovo (Val di Cembra):</strong> Le radici. Un territorio diverso, con più altitudine ed escursioni termiche. Qui si coltivano Müller Thurgau e Pinot Nero per ottenere un bianco aromatico e un rosso elegante e tagliente.</li>
                          </ul>
                      </div>
                  </div>

              </div>
          </div>
        ) : activeSection.id === 'visite' ? (
          /* --- SEZIONE VISITE E ATTIVITÀ --- */
          <div className="bg-[#FDFCFB] text-[#1A1A1A] font-sans pb-20">
              
              {/* Hero Visite (Senza Immagine) */}
              <div className="w-full flex flex-col items-center justify-center pt-40 pb-10">
                  <div className="text-center px-6 animate-[fadeIn_1s_ease-out]">
                      <CalendarIcon className="mx-auto text-[#BFA872] mb-6" size={40} />
                      <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] text-stone-900 mb-4 italic font-bold">Vivi il Maso</h1>
                      <p className="text-[#BFA872] uppercase tracking-[0.4em] text-xs font-bold">Esperienze, trekking e adozioni</p>
                  </div>
              </div>

              <div className="max-w-[1100px] mx-auto px-6 py-10">
                  
                  {/* 1. Il Ciclo della Luce (Esperienza Principale) */}
                  <div className="mb-32">
                      <div className="text-center mb-16">
                          <h2 className="font-['Playfair_Display'] text-4xl mb-4 font-bold text-stone-900">Il Ciclo della Luce</h2>
                          <p className="font-['Cormorant_Garamond'] text-xl text-stone-600 italic max-w-2xl mx-auto">
                              Non crediamo nelle degustazioni frettolose. Abbiamo scelto di offrire un unico percorso narrativo, lento e immersivo. Dalla radice della vite al riposo nel buio della cantina, fino all'esplosione di luce nei calici.
                          </p>
                      </div>
                      <div className="flex flex-col lg:flex-row gap-16">
                          {/* Timeline delle Tappe */}
                          <div className="w-full lg:w-2/3">
                              <div className="relative border-l border-[#BFA872]/40 ml-4 space-y-16 pb-8">
                                  {/* Tappa 1 */}
                                  <div className="relative pl-10">
                                      <div className="absolute w-8 h-8 bg-[#FDFCFB] border-2 border-[#BFA872] rounded-full -left-4 top-0 flex items-center justify-center">
                                          <MapPin size={14} className="text-[#BFA872]" />
                                      </div>
                                      <h3 className="font-['Cinzel'] text-xl uppercase tracking-widest text-stone-900 mb-2">1. Il Vigneto</h3>
                                      <p className="font-['Cormorant_Garamond'] text-lg text-stone-600 leading-relaxed">
                                          Passeggiata tra i filari storici di Pressano. Toccheremo con mano le antiche rocce di siltite rossa, capendo come il terroir e le correnti d'aria della Valle dell'Adige creino un microclima unico per i nostri vitigni.
                                      </p>
                                  </div>
                                  {/* Tappa 2 */}
                                  <div className="relative pl-10">
                                      <div className="absolute w-8 h-8 bg-[#FDFCFB] border-2 border-[#BFA872] rounded-full -left-4 top-0 flex items-center justify-center">
                                          <FlaskConical size={14} className="text-[#BFA872]" />
                                      </div>
                                      <h3 className="font-['Cinzel'] text-xl uppercase tracking-widest text-stone-900 mb-2">2. La Cantina</h3>
                                      <p className="font-['Cormorant_Garamond'] text-lg text-stone-600 leading-relaxed">
                                          Discesa nella barriccaia e nelle zone di affinamento. Qui vi racconteremo le scelte di vinificazione, il tempo trascorso sui lieviti e il rispetto sacro per i ritmi lenti che trasformano il mosto in emozione.
                                      </p>
                                  </div>
                                  {/* Tappa 3 */}
                                  <div className="relative pl-10">
                                      <div className="absolute w-8 h-8 bg-[#BFA872] rounded-full -left-4 top-0 flex items-center justify-center shadow-md">
                                          <Wine size={14} className="text-white" />
                                      </div>
                                      <h3 className="font-['Cinzel'] text-xl uppercase tracking-widest text-stone-900 mb-2">3. La Degustazione</h3>
                                      <p className="font-['Cormorant_Garamond'] text-lg text-stone-600 leading-relaxed">
                                          Il culmine dell'esperienza nella sala degustazione panoramica. Assaggeremo i 4 vini fondamentali della nostra collezione, guidati dal produttore, accompagnati da una selezione di prodotti tipici trentini a km zero.
                                      </p>
                                  </div>
                              </div>
                          </div>
                          {/* Info Box */}
                          <div className="w-full lg:w-1/3">
                              <div className="bg-white border border-stone-200 p-8 shadow-sm sticky top-28">
                                  <h3 className="font-['Cinzel'] text-sm tracking-[0.3em] uppercase text-stone-800 font-bold mb-8 text-center">Info Pratiche</h3>
                                  <div className="space-y-6 mb-10">
                                      <div className="flex items-center gap-4">
                                          <Clock className="text-[#BFA872]" size={20} />
                                          <div>
                                              <p className="font-['Montserrat'] text-[10px] uppercase tracking-widest text-stone-400">Durata</p>
                                              <p className="font-serif text-lg text-stone-800">Circa 2 ore</p>
                                          </div>
                                      </div>
                                      <div className="flex items-center gap-4">
                                          <Users className="text-[#BFA872]" size={20} />
                                          <div>
                                              <p className="font-['Montserrat'] text-[10px] uppercase tracking-widest text-stone-400">Gruppi</p>
                                              <p className="font-serif text-lg text-stone-800">Da 2 a 12 persone</p>
                                          </div>
                                      </div>
                                      <div className="flex items-center gap-4">
                                          <Sun className="text-[#BFA872]" size={20} />
                                          <div>
                                              <p className="font-['Montserrat'] text-[10px] uppercase tracking-widest text-stone-400">Disponibilità</p>
                                              <p className="font-serif text-lg text-stone-800">Su prenotazione</p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="border-t border-stone-100 pt-6 mb-8 text-center">
                                      <p className="font-['Montserrat'] text-[10px] uppercase tracking-widest text-stone-400 mb-1">Costo a persona</p>
                                      <p className="text-4xl font-serif text-stone-900 font-bold">30 €</p>
                                  </div>
                                  <button onClick={() => openActivity('luce')} className="w-full py-4 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-widest font-bold hover:bg-[#BFA872] transition-colors duration-300">
                                      Prenota l'Esperienza
                                  </button>
                              </div>
                          </div>
                      </div>

                      {/* I 4 Calici Inclusi */}
                      <div className="mt-16 bg-[#1A1A1A] text-white py-16 px-8 rounded-sm shadow-xl">
                          <div className="text-center mb-12">
                              <h2 className="font-['Playfair_Display'] text-3xl mb-3 italic">I 4 Calici in Degustazione</h2>
                              <p className="font-['Montserrat'] text-[10px] uppercase tracking-[0.3em] text-[#BFA872]">Dalla freschezza del mattino alla profondità della sera</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                              {['alba', 'zenit', 'vespro', 'crepuscolo'].map((wineId, index) => {
                                  const wine = wineDatabase[wineId];
                                  return (
                                      <div key={wineId} className="flex flex-col items-center text-center p-4 border border-stone-800 bg-stone-900/50">
                                          <div className="mb-4 transform scale-75" style={{ color: wine.color }} dangerouslySetInnerHTML={{ __html: wine.icon }}></div>
                                          <h3 className="font-['Playfair_Display'] text-xl font-bold uppercase tracking-wider mb-1" style={{ color: wine.color }}>{wine.name}</h3>
                                          <p className="font-['Cinzel'] text-[9px] tracking-widest uppercase text-stone-300 mb-3">{wine.type}</p>
                                          <p className="font-['Cormorant_Garamond'] text-xs italic text-stone-400 leading-relaxed px-2">
                                              {wine.quote}
                                          </p>
                                      </div>
                                  );
                              })}
                          </div>
                      </div>
                  </div>

                  {/* 2. Adotta un filare */}
                  <div className="mb-24 flex flex-col md:flex-row gap-10 items-center bg-white border border-stone-200 p-8 shadow-sm">
                      <div className="md:w-1/3 flex justify-center">
                          <div className="w-32 h-32 rounded-full border-4 border-[#BFA872] flex items-center justify-center bg-stone-50">
                              <MapPin size={40} className="text-[#BFA872]" />
                          </div>
                      </div>
                      <div className="md:w-2/3">
                          <p className="font-['Montserrat'] text-[10px] uppercase tracking-widest text-[#BFA872] mb-2 font-bold flex items-center gap-2">
                            <Clock size={12} /> Prenotabile 1 Giu - 1 Ago
                          </p>
                          <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-4">Adotta un Filare</h2>
                          <p className="font-['Cormorant_Garamond'] text-xl text-stone-600 mb-4">Un classico che crea un legame diretto con la nostra terra. Adottando una porzione di vigna, seguirai il ciclo della natura e riceverai il frutto di quel filare.</p>
                          <p className="font-['Montserrat'] text-xs text-stone-500 mb-6 bg-stone-50 p-2 inline-block border border-stone-100 rounded-sm">
                              Disponibilità limitata: <strong className="text-stone-800">solo 5 filari</strong> (max 1 a persona).
                          </p>
                          <ul className="font-['Montserrat'] text-sm text-stone-500 space-y-2 mb-8">
                              <li>• Filare di Müller Thurgau con targhetta recante il tuo nome</li>
                              <li>• 6 bottiglie personalizzate a fine stagione</li>
                              <li>• Aggiornamenti mensili sullo stato della vigna</li>
                          </ul>
                          <div className="flex items-center gap-6">
                              <span className="font-serif text-4xl font-bold text-stone-900">150 €</span>
                              <button onClick={() => openActivity('adozione')} className="px-8 py-3 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest font-bold hover:bg-[#BFA872] transition-colors">Richiedi Adozione</button>
                          </div>
                      </div>
                  </div>

                  {/* 3. Vigna Trekking */}
                  <div className="mb-24">
                      <h2 className="font-['Playfair_Display'] text-4xl font-bold mb-6 text-center">Vigna-Trekking al Tramonto</h2>
                      <p className="font-['Cormorant_Garamond'] text-xl text-stone-600 text-center max-w-3xl mx-auto mb-12">Una camminata di 60/90 minuti guidata da uno di noi vi porterà a scoprire le magnifiche colline di Pressano e i suoi paesaggi. Un piccolo gioiello nel panorama viticolo locale, racconteremo la geologia del terreno e la cura delle piante, terminando con una degustazione proprio dove nasce l'uva.</p>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                          {/* Pacchetto 1 */}
                          <div className="bg-stone-50 border border-stone-200 p-8 relative overflow-hidden flex flex-col h-full">
                              <div className="absolute top-0 left-0 w-full h-1 bg-[#BFA872]"></div>
                              <h3 className="font-['Cinzel'] text-xl font-bold mb-4 uppercase tracking-widest">Pacchetto 1: Territorio</h3>
                              <p className="font-['Montserrat'] text-sm text-stone-500 mb-6 flex-grow">Camminata completa e degustazione dei vini più legati al terroir: la Nosiola e lo spumante Alba.</p>
                              <div>
                                  <p className="font-serif text-3xl font-bold text-stone-900 mb-1">35 € <span className="text-sm font-normal text-stone-500 italic">/ persona (min. 2)</span></p>
                                  <button onClick={() => openActivity('trekking1')} className="mt-4 w-full py-3 border border-[#1A1A1A] text-[#1A1A1A] text-[10px] uppercase tracking-widest font-bold hover:bg-[#1A1A1A] hover:text-white transition-colors">Prenota ora</button>
                              </div>
                          </div>

                          {/* Pacchetto 2 */}
                          <div className="bg-[#1A1A1A] text-white p-8 relative overflow-hidden flex flex-col h-full shadow-lg">
                              <div className="absolute top-0 left-0 w-full h-1 bg-[#BFA872]"></div>
                              <h3 className="font-['Cinzel'] text-xl font-bold mb-4 uppercase tracking-widest text-[#BFA872]">Pacchetto 2: Premium</h3>
                              <p className="font-['Montserrat'] text-sm text-stone-400 mb-6 flex-grow">Camminata completa e degustazione di vini premium a scelta o la nostra migliore selezione.</p>
                              <div>
                                  <p className="font-serif text-3xl font-bold text-white mb-1">55 € <span className="text-sm font-normal text-stone-400 italic">/ persona (min. 4)</span></p>
                                  <button onClick={() => openActivity('trekking2')} className="mt-4 w-full py-3 bg-[#BFA872] text-[#1A1A1A] text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-colors">Prenota ora</button>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* 4. Esperienze Extra */}
                  <div>
                      <h2 className="font-['Playfair_Display'] text-4xl font-bold mb-10 text-center border-t border-stone-200 pt-16">L'Essenza dei Sensi</h2>
                      <div className="max-w-2xl mx-auto">
                          {/* Degustazione Cieca */}
                          <div className="flex items-start gap-5 p-6 border border-stone-200 bg-white hover:shadow-md transition-shadow">
                              <FlaskConical className="text-[#BFA872] flex-shrink-0 mt-1" size={32} />
                              <div className="w-full">
                                  <h4 className="font-['Cinzel'] font-bold text-xl mb-2">Degustazione alla Cieca</h4>
                                  <p className="font-['Montserrat'] text-sm text-stone-500 mb-4">Lasciati guidare dai sensi. Degustazione bendati per scoprire i profumi del territorio in modo inedito.</p>
                                  <div className="flex justify-between items-center border-t border-stone-100 pt-4">
                                      <span className="font-serif font-bold text-2xl text-stone-900">25 €</span>
                                      <button onClick={() => openActivity('cieca')} className="px-6 py-2 bg-stone-100 text-[10px] uppercase tracking-widest font-bold text-stone-900 hover:bg-[#BFA872] hover:text-white transition-colors">Prenota</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
        ) : (
          /* CONTENUTO GENERICO PER LE ALTRE SEZIONI */
          <>
            <header className="pt-40 pb-16 px-6 text-center">
              {activeSection.icon}
              <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] text-stone-900 mb-4 italic font-bold">{activeSection.title}</h1>
              <p className="text-xs uppercase tracking-[0.4em] text-[#BFA872] font-bold">{activeSection.subtitle}</p>
            </header>
            <div className="max-w-4xl mx-auto px-6 pb-32">
              <div className="prose prose-stone max-w-none text-stone-600 font-light leading-relaxed">
                <p className="text-xl font-['Cormorant_Garamond'] italic mb-8 text-center">
                  Benvenuti nella sezione {activeSection.title}. Questa area del sito è in fase di sviluppo.
                </p>
              </div>
            </div>
          </>
        )}

        {/* --- MODALE PRENOTAZIONE AGRITURISMO --- */}
        {bookingApt && (
            <div className="fixed inset-0 z-[70] bg-[#FDFCFB] overflow-y-auto animate-[fadeIn_0.4s_ease-out]">
                {/* Header Modale */}
                <div className="sticky top-0 w-full px-6 py-4 flex justify-between items-center bg-[#FDFCFB]/95 backdrop-blur-md border-b border-stone-200 z-10 shadow-sm">
                    <button onClick={closeBooking} className="flex items-center space-x-2 text-stone-500 hover:text-stone-900 transition-colors group">
                        <X size={20} className="transform group-hover:-rotate-90 transition-transform duration-300" />
                        <span className="font-['Montserrat'] text-[10px] tracking-widest uppercase font-bold">Annulla</span>
                    </button>
                    <div className="font-['Cinzel'] text-sm tracking-[0.3em] uppercase text-stone-800 font-bold">Richiesta Soggiorno</div>
                    <div className="w-20"></div>
                </div>

                <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-12 lg:gap-20">
                    
                    {/* Lato Sinistro: Riepilogo Appartamento */}
                    <div className="w-full lg:w-5/12">
                        <div className="aspect-[4/3] w-full mb-6 relative shadow-md">
                            <img src={bookingApt.image} alt={bookingApt.name} className="w-full h-full object-cover rounded-sm" />
                            <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[9px] uppercase tracking-widest font-bold font-['Montserrat'] shadow-sm text-stone-800">
                                {bookingApt.beds}
                            </div>
                        </div>
                        <h2 className="font-['Playfair_Display'] text-4xl text-stone-900 mb-2 font-bold">{bookingApt.name}</h2>
                        <p className="font-['Cormorant_Garamond'] text-lg text-stone-600 italic mb-6">Un rifugio d'eleganza contadina.</p>
                        
                        <div className="space-y-4 pt-6 border-t border-stone-200">
                            <div className="flex justify-between items-center">
                                <span className="font-['Montserrat'] text-[10px] uppercase tracking-widest text-stone-500">Tariffa base per notte</span>
                                <span className="font-serif text-xl font-bold">{bookingApt.price}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-['Montserrat'] text-[10px] uppercase tracking-widest text-stone-500">Capacità Massima</span>
                                <span className="font-serif text-lg">{getMaxGuests(bookingApt.beds)} Persone</span>
                            </div>
                            <div className="bg-stone-50 p-4 border-l-2 border-[#BFA872] mt-4">
                                <p className="font-['Montserrat'] text-[10px] leading-relaxed text-stone-600">
                                    La colazione artigianale con prodotti a Km0 e la visita guidata alla cantina sono sempre incluse per tutti gli ospiti.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Lato Destro: Form Prenotazione */}
                    <div className="w-full lg:w-7/12 flex flex-col">
                        
                        {/* 1. Calendario */}
                        <div className="mb-10">
                            <h3 className="font-['Cinzel'] text-lg text-stone-800 mb-6 flex items-center gap-2 border-b border-stone-200 pb-2">
                                <CalendarIcon size={20} className="text-[#BFA872]" /> Seleziona le Date
                            </h3>
                            
                            <div className="bg-white border border-stone-200 p-6 shadow-sm rounded-sm">
                                {/* Mese Navigation */}
                                <div className="flex justify-between items-center mb-6">
                                    <button onClick={() => setBookingMonth(new Date(bookingMonth.getFullYear(), bookingMonth.getMonth() - 1, 1))} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-600"><ChevronLeft size={20} /></button>
                                    <span className="font-serif text-xl capitalize font-bold text-stone-800">
                                        {bookingMonth.toLocaleString('it-IT', { month: 'long', year: 'numeric' })}
                                    </span>
                                    <button onClick={() => setBookingMonth(new Date(bookingMonth.getFullYear(), bookingMonth.getMonth() + 1, 1))} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-600"><ChevronRight size={20} /></button>
                                </div>

                                {/* Giorni Settimana */}
                                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                    {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map(d => (
                                        <div key={d} className="font-['Montserrat'] text-[9px] uppercase tracking-widest text-stone-400 font-bold">{d}</div>
                                    ))}
                                </div>

                                {/* Griglia Giorni */}
                                <div className="grid grid-cols-7 gap-1 gap-y-2">
                                    {renderCalendar()}
                                </div>

                                {/* Recap Date Selezionate */}
                                <div className="mt-6 flex flex-col sm:flex-row gap-4 border-t border-stone-100 pt-4">
                                    <div className="flex-1">
                                        <span className="block font-['Montserrat'] text-[9px] uppercase tracking-widest text-stone-400 mb-1">Check-in</span>
                                        <div className="font-serif text-lg text-stone-800 bg-stone-50 py-2 px-3 border border-stone-100 min-h-[44px]">
                                            {checkIn ? checkIn.toLocaleDateString('it-IT') : <span className="text-stone-300 italic">Seleziona data</span>}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <span className="block font-['Montserrat'] text-[9px] uppercase tracking-widest text-stone-400 mb-1">Check-out</span>
                                        <div className="font-serif text-lg text-stone-800 bg-stone-50 py-2 px-3 border border-stone-100 min-h-[44px]">
                                            {checkOut ? checkOut.toLocaleDateString('it-IT') : <span className="text-stone-300 italic">Seleziona data</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Ospiti */}
                        <div className="mb-10">
                            <h3 className="font-['Cinzel'] text-lg text-stone-800 mb-6 flex items-center gap-2 border-b border-stone-200 pb-2">
                                <Users size={20} className="text-[#BFA872]" /> Ospiti
                            </h3>
                            <div className="bg-white border border-stone-200 p-6 shadow-sm rounded-sm space-y-6">
                                
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-serif text-lg text-stone-800">Adulti</div>
                                        <div className="font-['Montserrat'] text-[10px] text-stone-500">Oltre i 18 anni</div>
                                    </div>
                                    <div className="flex items-center gap-4 border border-stone-200 rounded-sm">
                                        <button onClick={() => updateGuests('adults', -1)} className="px-4 py-2 hover:bg-stone-50 text-stone-600">-</button>
                                        <span className="font-['Montserrat'] font-bold text-sm w-4 text-center">{guests.adults}</span>
                                        <button onClick={() => updateGuests('adults', 1)} className="px-4 py-2 hover:bg-stone-50 text-stone-600">+</button>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-serif text-lg text-stone-800">Ragazzi</div>
                                        <div className="font-['Montserrat'] text-[10px] text-stone-500">Da 12 a 17 anni</div>
                                    </div>
                                    <div className="flex items-center gap-4 border border-stone-200 rounded-sm">
                                        <button onClick={() => updateGuests('teens', -1)} className="px-4 py-2 hover:bg-stone-50 text-stone-600">-</button>
                                        <span className="font-['Montserrat'] font-bold text-sm w-4 text-center">{guests.teens}</span>
                                        <button onClick={() => updateGuests('teens', 1)} className="px-4 py-2 hover:bg-stone-50 text-stone-600">+</button>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-serif text-lg text-stone-800">Bambini</div>
                                        <div className="font-['Montserrat'] text-[10px] text-stone-500">Da 0 a 11 anni</div>
                                    </div>
                                    <div className="flex items-center gap-4 border border-stone-200 rounded-sm">
                                        <button onClick={() => updateGuests('children', -1)} className="px-4 py-2 hover:bg-stone-50 text-stone-600">-</button>
                                        <span className="font-['Montserrat'] font-bold text-sm w-4 text-center">{guests.children}</span>
                                        <button onClick={() => updateGuests('children', 1)} className="px-4 py-2 hover:bg-stone-50 text-stone-600">+</button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* 3. Riepilogo e Checkout */}
                        <div className="mt-auto bg-[#1A1A1A] text-white p-8 shadow-2xl rounded-sm">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <p className="font-['Montserrat'] text-[10px] uppercase tracking-widest text-[#BFA872] mb-1 font-bold">Totale Soggiorno</p>
                                    <p className="font-['Cormorant_Garamond'] text-lg opacity-80 italic">
                                        {calculateNights()} notti x {guests.adults + guests.teens + guests.children} ospiti
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-serif text-4xl font-bold">
                                        {calculateNights() > 0 ? (calculateNights() * parseInt(bookingApt.price.replace(/\D/g, ''))) + ' €' : '-- €'}
                                    </p>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => {
                                    if(!checkIn || !checkOut) {
                                        triggerToast('Seleziona prima le date di arrivo e partenza sul calendario.');
                                    } else {
                                        triggerToast('Richiesta inviata con successo. Ti contatteremo a breve.');
                                        setTimeout(closeBooking, 2000);
                                    }
                                }}
                                className={`w-full py-4 text-[11px] uppercase tracking-widest font-bold flex justify-center items-center gap-2 transition-colors duration-300 ${(!checkIn || !checkOut) ? 'bg-stone-800 text-stone-500 cursor-not-allowed' : 'bg-[#BFA872] text-[#1A1A1A] hover:bg-white'}`}
                            >
                                <Check size={16} /> Conferma Richiesta
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        )}

        {/* --- MODALE PRENOTAZIONE ATTIVITA' --- */}
        {selectedActivity && (
            <div className="fixed inset-0 z-[70] bg-[#FDFCFB] overflow-y-auto animate-[fadeIn_0.4s_ease-out]">
                {/* Header Modale */}
                <div className="sticky top-0 w-full px-6 py-4 flex justify-between items-center bg-[#FDFCFB]/95 backdrop-blur-md border-b border-stone-200 z-10 shadow-sm">
                    <button onClick={() => setSelectedActivity(null)} className="flex items-center space-x-2 text-stone-500 hover:text-stone-900 transition-colors group">
                        <X size={20} className="transform group-hover:-rotate-90 transition-transform duration-300" />
                        <span className="font-['Montserrat'] text-[10px] tracking-widest uppercase font-bold">Annulla</span>
                    </button>
                    <div className="font-['Cinzel'] text-sm tracking-[0.3em] uppercase text-stone-800 font-bold">Prenota Esperienza</div>
                    <div className="w-20"></div>
                </div>

                <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-12 lg:gap-20">
                    
                    {/* Lato Sinistro: Riepilogo Esperienza (Senza Immagine) */}
                    <div className="w-full lg:w-5/12">
                        <h4 className="font-['Cinzel'] text-[10px] tracking-[0.3em] uppercase text-[#BFA872] mb-3">{selectedActivity.subtitle}</h4>
                        <h2 className="font-['Playfair_Display'] text-4xl text-stone-900 mb-4 font-bold">{selectedActivity.title}</h2>
                        <p className="font-['Cormorant_Garamond'] text-lg text-stone-600 italic mb-8">{selectedActivity.description}</p>
                        
                        <div className="space-y-4 pt-6 border-t border-stone-200">
                            <div className="flex justify-between items-center">
                                <span className="font-['Montserrat'] text-[10px] uppercase tracking-widest text-stone-500">Tariffa {selectedActivity.type === 'persona' ? 'a persona' : 'totale'}</span>
                                <span className="font-serif text-xl font-bold">{selectedActivity.price} €</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-['Montserrat'] text-[10px] uppercase tracking-widest text-stone-500">Durata</span>
                                <span className="font-serif text-lg">{selectedActivity.duration}</span>
                            </div>
                            {selectedActivity.id === 'adozione' && (
                                <div className="bg-stone-50 p-4 border-l-2 border-[#BFA872] mt-4">
                                    <p className="font-['Montserrat'] text-[10px] leading-relaxed text-stone-600">
                                        Per garantire la cura massima, mettiamo a disposizione un numero di <strong>5 filari</strong> all'anno.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Lato Destro: Form Prenotazione */}
                    <div className="w-full lg:w-7/12 flex flex-col">
                        
                        {/* 1. Calendario */}
                        <div className="mb-10">
                            <h3 className="font-['Cinzel'] text-lg text-stone-800 mb-6 flex items-center gap-2 border-b border-stone-200 pb-2">
                                <CalendarIcon size={20} className="text-[#BFA872]" /> Seleziona la Data
                            </h3>
                            
                            <div className="bg-white border border-stone-200 p-6 shadow-sm rounded-sm">
                                {/* Mese Navigation */}
                                <div className="flex justify-between items-center mb-6">
                                    <button onClick={() => setBookingMonth(new Date(bookingMonth.getFullYear(), bookingMonth.getMonth() - 1, 1))} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-600"><ChevronLeft size={20} /></button>
                                    <span className="font-serif text-xl capitalize font-bold text-stone-800">
                                        {bookingMonth.toLocaleString('it-IT', { month: 'long', year: 'numeric' })}
                                    </span>
                                    <button onClick={() => setBookingMonth(new Date(bookingMonth.getFullYear(), bookingMonth.getMonth() + 1, 1))} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-600"><ChevronRight size={20} /></button>
                                </div>

                                {/* Giorni Settimana */}
                                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                    {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map(d => (
                                        <div key={d} className="font-['Montserrat'] text-[9px] uppercase tracking-widest text-stone-400 font-bold">{d}</div>
                                    ))}
                                </div>

                                {/* Griglia Giorni */}
                                <div className="grid grid-cols-7 gap-1 gap-y-2">
                                    {renderActivityCalendar()}
                                </div>

                                {/* Recap Data Selezionata */}
                                <div className="mt-6 border-t border-stone-100 pt-4">
                                    <span className="block font-['Montserrat'] text-[9px] uppercase tracking-widest text-stone-400 mb-1">Data scelta</span>
                                    <div className="font-serif text-lg text-stone-800 bg-stone-50 py-2 px-3 border border-stone-100 min-h-[44px]">
                                        {activityDate ? activityDate.toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : <span className="text-stone-300 italic">Seleziona data sul calendario</span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Orario (Nascosto se è prezzo fisso come Adozione) */}
                        {!selectedActivity.isFixed && (
                            <div className="mb-10">
                                <h3 className="font-['Cinzel'] text-lg text-stone-800 mb-6 flex items-center gap-2 border-b border-stone-200 pb-2">
                                    <Clock size={20} className="text-[#BFA872]" /> Seleziona l'Orario
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    {(selectedActivity.id.includes('trekking') ? ['17:30', '18:30', '19:00'] : ['10:00', '14:30', '16:00']).map(time => (
                                        <button
                                            key={time}
                                            onClick={() => setActivityTime(time)}
                                            className={`px-6 py-3 border font-['Montserrat'] text-sm tracking-widest font-bold transition-colors duration-300 rounded-sm shadow-sm ${activityTime === time ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-stone-600 border-stone-200 hover:border-[#BFA872] hover:text-stone-900'}`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 2. Ospiti (Nascosto se è prezzo fisso come Adozione) */}
                        {!selectedActivity.isFixed && (
                            <div className="mb-10">
                                <h3 className="font-['Cinzel'] text-lg text-stone-800 mb-6 flex items-center gap-2 border-b border-stone-200 pb-2">
                                    <Users size={20} className="text-[#BFA872]" /> Ospiti (Max 12)
                                </h3>
                                <div className="bg-white border border-stone-200 p-6 shadow-sm rounded-sm space-y-6">
                                    
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-serif text-lg text-stone-800">Adulti {selectedActivity.minGuests > 1 && <span className="text-sm italic text-stone-500">(Minimo {selectedActivity.minGuests})</span>}</div>
                                            <div className="font-['Montserrat'] text-[10px] text-stone-500">Percorso completo</div>
                                        </div>
                                        <div className="flex items-center gap-4 border border-stone-200 rounded-sm">
                                            <button onClick={() => updateActivityGuests('adults', -1)} className="px-4 py-2 hover:bg-stone-50 text-stone-600">-</button>
                                            <span className="font-['Montserrat'] font-bold text-sm w-4 text-center">{activityGuests.adults}</span>
                                            <button onClick={() => updateActivityGuests('adults', 1)} className="px-4 py-2 hover:bg-stone-50 text-stone-600">+</button>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-serif text-lg text-stone-800">Ragazzi / Bambini</div>
                                            <div className="font-['Montserrat'] text-[10px] text-stone-500">Solo visita (analcolico e snack inclusi)</div>
                                        </div>
                                        <div className="flex items-center gap-4 border border-stone-200 rounded-sm">
                                            <button onClick={() => updateActivityGuests('children', -1)} className="px-4 py-2 hover:bg-stone-50 text-stone-600">-</button>
                                            <span className="font-['Montserrat'] font-bold text-sm w-4 text-center">{activityGuests.children}</span>
                                            <button onClick={() => updateActivityGuests('children', 1)} className="px-4 py-2 hover:bg-stone-50 text-stone-600">+</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                        {/* 3. Riepilogo e Checkout */}
                        <div className="mt-auto bg-[#1A1A1A] text-white p-8 shadow-2xl rounded-sm">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <p className="font-['Montserrat'] text-[10px] uppercase tracking-widest text-[#BFA872] mb-1 font-bold">Totale {selectedActivity.isFixed ? 'Adozione' : 'Esperienza'}</p>
                                    {!selectedActivity.isFixed && (
                                        <p className="font-['Cormorant_Garamond'] text-lg opacity-80 italic">
                                            {activityGuests.adults} Adulti {activityGuests.children > 0 ? `, ${activityGuests.children} Bambini` : ''}
                                        </p>
                                    )}
                                </div>
                                <div className="text-right">
                                    <p className="font-serif text-4xl font-bold">
                                        {selectedActivity.isFixed ? selectedActivity.price : (activityGuests.adults * selectedActivity.price)} €
                                    </p>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => {
                                    if(!activityDate) {
                                        triggerToast('Seleziona prima la data sul calendario.');
                                    } else if (!selectedActivity.isFixed && !activityTime) {
                                        triggerToast("Seleziona l'orario desiderato per l'esperienza.");
                                    } else {
                                        triggerToast('Richiesta inviata con successo. Ti contatteremo a breve.');
                                        setTimeout(() => setSelectedActivity(null), 2000);
                                    }
                                }}
                                className={`w-full py-4 text-[11px] uppercase tracking-widest font-bold flex justify-center items-center gap-2 transition-colors duration-300 ${(!activityDate || (!selectedActivity.isFixed && !activityTime)) ? 'bg-stone-800 text-stone-500 cursor-not-allowed' : 'bg-[#BFA872] text-[#1A1A1A] hover:bg-white'}`}
                            >
                                <Check size={16} /> Conferma Prenotazione
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        )}

        {/* --- PAGINA DETTAGLIO PRODOTTO (Sovrapposta - Gestione Vini) --- */}
        {selectedWine && (
            <div className="fixed inset-0 z-[60] bg-[#fdfbf7] overflow-y-auto animate-[fadeIn_0.5s_ease-out]">
                <div className="sticky top-0 w-full px-6 py-4 flex justify-between items-center bg-[#fdfbf7]/90 backdrop-blur-md border-b border-gray-200 z-10">
                    <button onClick={() => setSelectedWine(null)} className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 transition-colors group">
                        <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        <span className="font-['Montserrat'] text-xs tracking-widest uppercase font-bold">Torna alla Collezione</span>
                    </button>
                    <div className="font-['Pinyon_Script'] text-3xl text-gray-300">Maso Sparc</div>
                    <div className="w-24"></div>
                </div>

                <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row gap-12 lg:gap-24 items-stretch">
                    <div className="md:w-4/12 bg-white shadow-md border border-gray-100 p-2 relative overflow-hidden flex flex-col group">
                        <div className="border border-gray-100 h-full w-full p-8 md:p-10 flex flex-col items-center justify-center relative">
                            <div className="absolute inset-0 opacity-[0.03] transition-colors duration-1000" style={{ backgroundColor: wineDatabase[selectedWine].color }}></div>
                            <div className="relative z-10 w-full flex flex-col items-center">
                                <div className="mb-8 transition-transform duration-700 group-hover:scale-110" style={{ color: wineDatabase[selectedWine].color }} dangerouslySetInnerHTML={{ __html: wineDatabase[selectedWine].icon }}></div>
                                <h3 className="font-['Cinzel'] text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-6 pb-4 border-b border-gray-200 w-16 mx-auto text-center">Identità</h3>
                                <div className="w-full flex flex-col items-center">
                                    {wineDatabase[selectedWine].specs.map((spec, index) => (
                                        <React.Fragment key={index}>
                                            <div className="flex flex-col items-center text-center w-full">
                                                <span className="font-['Montserrat'] text-[8px] uppercase tracking-[0.3em] text-gray-400 mb-2">{spec.label}</span>
                                                <span className="font-['Cormorant_Garamond'] text-lg text-gray-800 italic leading-none">{spec.value}</span>
                                            </div>
                                            {index < wineDatabase[selectedWine].specs.length - 1 && <div className="w-4 h-px bg-gray-200 my-5"></div>}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="md:w-8/12 flex flex-col justify-center">
                        <div className="mb-8">
                            <h1 className="text-5xl md:text-6xl font-serif text-gray-900 mb-2 font-bold uppercase tracking-wider">{wineDatabase[selectedWine].name}</h1>
                            <h2 className="text-xl font-['Cinzel'] text-gray-500 pb-6 border-b border-gray-200 tracking-[0.2em] uppercase">{wineDatabase[selectedWine].type}</h2>
                        </div>
                        <p className="text-2xl font-['Cormorant_Garamond'] italic text-gray-800 mb-10 border-l-4 pl-6 py-1 leading-snug transition-colors duration-500" style={{ borderColor: wineDatabase[selectedWine].color }}>
                            {wineDatabase[selectedWine].quote}
                        </p>
                        <div className="text-gray-600 leading-relaxed font-light text-lg font-['Cormorant_Garamond'] space-y-5 mb-14" dangerouslySetInnerHTML={{ __html: wineDatabase[selectedWine].description }}></div>
                        
                        <div className="mt-auto flex flex-col sm:flex-row items-center justify-between bg-white p-6 md:p-8 border border-gray-100 shadow-sm">
                            <div className="text-center sm:text-left mb-4 sm:mb-0">
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-bold">Prezzo a bottiglia</p>
                                <p className="text-4xl font-serif text-gray-900 font-bold">{wineDatabase[selectedWine].price}</p>
                            </div>
                            <button 
                                onClick={() => triggerToast('PRODOTTO ESAURITO PERCHÈ TROPPO BUONO')} 
                                className="w-full sm:w-auto bg-gray-900 text-white px-10 py-4 text-xs tracking-widest uppercase transition-colors duration-300 font-bold shadow-lg"
                                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = wineDatabase[selectedWine].color; }}
                                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = ''; }}
                            >
                                Aggiungi al Carrello
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Toast Notification Globale */}
        <div className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-8 py-5 shadow-2xl z-[100] flex items-center space-x-4 transition-all duration-500 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
            <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <span className="font-['Montserrat'] text-[11px] tracking-[0.2em] uppercase font-bold mt-0.5">{toastMessage}</span>
        </div>

      </div>
    );
  }

  // 3. VISTA MOSAICO
  return (
    <div className="min-h-screen bg-[#1A1A1A] p-4 md:p-8 animate-[fadeIn_0.8s_ease-out]">
      <header className="flex justify-between items-center mb-8 px-4">
        <div className="flex items-center gap-4">
          <MasoSparcLogo className="w-10 h-10 text-[#BFA872]" color="#BFA872" />
          <span className="text-xl font-serif tracking-[0.2em] uppercase text-white">SPARC</span>
          <a href="https://www.instagram.com/masosparc_trentodoc?igsh=c3RldXdhNHZmNnU2" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#BFA872] hover:text-white transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            <span className="text-[10px] uppercase tracking-widest font-bold">@masosparc</span>
          </a>

        </div>
        <span className="text-[#BFA872] text-[10px] uppercase tracking-[0.4em] font-bold hidden sm:block">Esplora il Maso</span>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px] max-w-7xl mx-auto">
        {mosaicTiles.map((tile) => (
         <div key={tile.id} onClick={() => { setActiveSection(tile); setView('section'); window.scrollTo(0,0); }} className={`relative group cursor-pointer overflow-hidden rounded-sm ${tile.bgColor} ${tile.size} border border-white/5 hover:border-[#BFA872]/40 transition-all duration-500 shadow-lg`}>
            
            {/* Immagine di sfondo */}
            {tile.image && (
              <div className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-30 group-hover:scale-110 transition-all duration-1000 z-0" style={{ backgroundImage: `url(${tile.image})` }}></div>
            )}

            {/* Texture a grana fotografica per matericità */}
            <div className="absolute inset-0 opacity-[0.06] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] mix-blend-overlay z-0"></div>
            
            {/* Sfumature per dare profondità e leggibilità (Posizionate sotto la filigrana) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 z-0"></div>

            {/* Filigrana Tipografica Astratta (Più grande, visibile e con movimento accentuato) */}
            <div className="absolute -bottom-10 -right-8 text-[280px] md:text-[420px] font-['Playfair_Display'] italic font-bold text-white/[0.08] group-hover:text-[#BFA872]/[0.4] group-hover:-translate-y-6 group-hover:-translate-x-6 group-hover:scale-105 transition-all duration-1000 ease-out select-none pointer-events-none leading-none drop-shadow-2xl z-0">
              {tile.watermark}
            </div>

            {/* Contenuto in primo piano (Titoli e icone) */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end transition-transform duration-500 group-hover:-translate-y-2 z-10">
              <div className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">{tile.icon}</div>
              <h3 className="text-3xl font-serif text-white mb-2 relative z-10 drop-shadow-md">{tile.title}</h3>
              <div className="flex items-center justify-between relative z-10">
                <p className="text-[10px] uppercase tracking-widest text-[#BFA872] font-bold drop-shadow-md">{tile.subtitle}</p>
                <ChevronRight className="text-white opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-500" size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;