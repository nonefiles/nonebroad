import React, { useState, useEffect } from 'react';
import { 
  Github, Youtube, Users, Eye, EyeOff, Star, BookOpen, RefreshCw, 
  ExternalLink, Layers, Award, Terminal, TrendingUp, 
  TrendingDown, Calendar, Clock, Zap, Activity, Shield, 
  Key, Mail, HardDrive, CalendarDays, Search, Wifi, 
  MonitorPlay, Globe, Code2, Target, Minus, Plus, Video,
  ChevronRight, ChevronLeft, Lock, Coffee, LogOut,
  Play, Pause, RotateCcw, CheckSquare, Trash2, Edit3,
  Cloud, Music, Bitcoin, MapPin, DollarSign, Hash,
  LogIn, UserPlus, Loader2
} from 'lucide-react';

// --- API CONFIGURATION ---
const API_CONFIG = {
  YOUTUBE_KEY: "AIzaSyDIsemv1v-ZUqp-8amLOeA6RTRqQaOrB6M",
  GITHUB_TOKEN: "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",
  USER_GITHUB: "cumakaradash",
  HANDLE_YOUTUBE: "@CumaKaradash",
  USER_LEETCODE: "nonefiles",
  // SUPABASE CONFIG
  SUPABASE_URL: "https://rwcamchqlaaqcsvsdxel.supabase.co", 
  SUPABASE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3Y2FtY2hxbGFhcWNzdnNkeGVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNTQyNjksImV4cCI6MjA4MDYzMDI2OX0.zWYTHd1yumm1C7Y5yRVhxp75RZEF4gzIkwZQW2StrA8"
};

// --- MOCK DATA ---
const FALLBACK_NEWS = [
  { title: "Linux 6.8 Çekirdeği Yayınlandı", link: "#", pubDate: new Date().toISOString() },
  { title: "Yapay Zeka Güvenliği Tehditleri", link: "#", pubDate: new Date().toISOString() },
  { title: "Docker Güvenlik Açığı Analizi", link: "#", pubDate: new Date().toISOString() },
  { title: "2025 Siber Güvenlik Trendleri", link: "#", pubDate: new Date().toISOString() },
];

const FALLBACK_VIDEOS = [
  {
    id: "1",
    snippet: {
      title: "OpenAI Sora: Gerçekçi Video Üretimi",
      thumbnails: { default: { url: "https://img.youtube.com/vi/HK6y8DAPN_0/default.jpg" } }
    },
    statistics: { viewCount: "4500000" }
  },
  {
    id: "2",
    snippet: {
      title: "Devin AI: İlk Yapay Zeka Yazılım Mühendisi",
      thumbnails: { default: { url: "https://img.youtube.com/vi/fjZp8I1OB9I/default.jpg" } }
    },
    statistics: { viewCount: "3200000" }
  },
  {
    id: "3",
    snippet: {
      title: "NVIDIA GTC 2024: Yeni B200 Çipi",
      thumbnails: { default: { url: "https://img.youtube.com/vi/Y2E87gC5jMg/default.jpg" } }
    },
    statistics: { viewCount: "2100000" }
  }
];

const DEV_TIPS = [
  "Konsolu temiz tut: console.clear() hayat kurtarır.",
  "Git commit mesajlarını anlamlı yaz, gelecekteki sen teşekkür edecek.",
  "Erken optimizasyon tüm kötülüklerin anasıdır.",
  "Kodunu test etmezsen, kullanıcıların test eder.",
  "Kısa molalar ver, buglar yürüyüş yaparken çözülür.",
  "DRY (Don't Repeat Yourself) prensibine sadık kal."
];

// --- HELPER COMPONENTS ---

const AnimatedCounter = ({ value }) => {
  if (!value) return <span>0</span>;
  return <span>{new Intl.NumberFormat('tr-TR', { notation: "compact", compactDisplay: "short" }).format(value)}</span>;
};

const BentoCard = ({ children, className = "", title, icon: Icon, action }) => (
  <div className={`bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between hover:border-neutral-700 transition-colors duration-300 shadow-sm ${className}`}>
    {(title || Icon) && (
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-2 text-neutral-400">
          {Icon && <Icon size={16} className="text-emerald-500/80" />}
          {title && <h3 className="text-xs font-bold tracking-wider uppercase text-neutral-500">{title}</h3>}
        </div>
        {action}
      </div>
    )}
    {children}
  </div>
);

const StatBox = ({ label, value, subValue }) => (
  <div className="flex flex-col">
    <span className="text-[10px] text-neutral-500 font-bold uppercase mb-1">{label}</span>
    <div className="flex items-baseline gap-2">
      <span className="text-xl font-medium text-neutral-200">{value}</span>
      {subValue && <span className="text-[10px] text-neutral-500">{subValue}</span>}
    </div>
  </div>
);

// --- AUTH COMPONENT ---

const AuthScreen = ({ supabase }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setError(null);
    try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950 p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="text-emerald-500" size={24} />
          </div>
          <h2 className="text-2xl font-light text-white">Geliştirici Üssü</h2>
          <p className="text-sm text-neutral-500">Devam etmek için giriş yapın</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-neutral-400 mb-1 block">E-posta</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
              placeholder="ornek@email.com"
            />
          </div>
          <div className="relative">
            <label className="text-xs text-neutral-400 mb-1 block">Şifre</label>
            <input 
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 pr-10 text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
              placeholder="••••••••"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-neutral-500 hover:text-white transition-colors"
            >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          
          {error && <div className="text-xs text-rose-500 bg-rose-500/10 p-2 rounded">{error}</div>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg p-3 text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- PRODUCTIVITY COMPONENTS ---

const PomodoroWidget = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); 

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };
  const switchMode = () => {
    const newMode = mode === 'work' ? 'break' : 'work';
    setMode(newMode);
    setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60);
    setIsActive(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <BentoCard title={`Pomodoro (${mode === 'work' ? 'Odak' : 'Mola'})`} icon={Clock}>
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className={`text-4xl font-mono font-light tracking-tighter ${isActive ? 'text-white' : 'text-neutral-500'}`}>
          {formatTime(timeLeft)}
        </div>
        <div className="flex gap-2 w-full justify-center">
          <button onClick={toggleTimer} className="p-2 bg-neutral-800 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors">
            {isActive ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button onClick={resetTimer} className="p-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors">
            <RotateCcw size={16} />
          </button>
          <button onClick={switchMode} className="px-3 py-2 bg-neutral-800 text-xs rounded-lg hover:bg-neutral-700 transition-colors">
            {mode === 'work' ? 'Mola Ver' : 'Çalış'}
          </button>
        </div>
      </div>
    </BentoCard>
  );
};

const TodoWidget = ({ supabase, session }) => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      if (!supabase || !session) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      
      if (!error && data) setTodos(data);
      setLoading(false);
    };
    fetchTodos();
  }, [supabase, session]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.trim() || !supabase || !session) return;
    
    const newTodo = { text: input, completed: false, user_id: session.user.id };
    const tempId = Date.now();
    setTodos([{ ...newTodo, id: tempId }, ...todos]);
    setInput('');

    const { data, error } = await supabase.from('todos').insert([newTodo]).select();
    if (error) {
        setTodos(prev => prev.filter(t => t.id !== tempId));
    } else if (data) {
        setTodos(prev => prev.map(t => t.id === tempId ? data[0] : t));
    }
  };

  const toggleTodo = async (id, currentStatus) => {
    if (!supabase) return;
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !currentStatus } : t));
    await supabase.from('todos').update({ completed: !currentStatus }).eq('id', id);
  };

  const deleteTodo = async (id) => {
    if (!supabase) return;
    setTodos(todos.filter(t => t.id !== id));
    await supabase.from('todos').delete().eq('id', id);
  };

  return (
    <BentoCard title="Yapılacaklar" icon={CheckSquare} className="row-span-2">
      <div className="flex flex-col h-full">
        <form onSubmit={addTodo} className="flex gap-2 mb-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Görev ekle..."
            className="flex-1 bg-neutral-800 border-none rounded text-xs px-2 py-1.5 text-white focus:ring-1 focus:ring-emerald-500 outline-none"
          />
          <button type="submit" disabled={!session} className="bg-neutral-800 p-1.5 rounded hover:bg-emerald-600 hover:text-white transition-colors">
            <Plus size={14} />
          </button>
        </form>
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar min-h-[100px]">
          {loading && <p className="text-center text-[10px] text-neutral-500">Yükleniyor...</p>}
          {!loading && todos.length === 0 && <p className="text-center text-[10px] text-neutral-600 mt-4">Henüz görev yok.</p>}
          {todos.map(todo => (
            <div key={todo.id} className="group flex items-center justify-between p-2 bg-neutral-800/30 rounded border border-transparent hover:border-neutral-700 transition-all">
              <div className="flex items-center gap-2 overflow-hidden">
                <button 
                  onClick={() => toggleTodo(todo.id, todo.completed)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${todo.completed ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-500' : 'border-neutral-600 text-transparent'}`}
                >
                  <CheckSquare size={10} />
                </button>
                <span className={`text-xs truncate ${todo.completed ? 'text-neutral-600 line-through' : 'text-neutral-300'}`}>
                  {todo.text}
                </span>
              </div>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="text-neutral-600 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
};

const ScratchpadWidget = ({ supabase, session }) => {
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      if (!supabase || !session) return;
      const { data } = await supabase
        .from('scratchpad')
        .select('content')
        .eq('user_id', session.user.id)
        .single();
      
      if (data) setNote(data.content);
    };
    fetchNote();
  }, [supabase, session]);

  const handleSave = async (content) => {
    if (!supabase || !session) return;
    setSaving(true);
    await supabase
        .from('scratchpad')
        .upsert({ user_id: session.user.id, content }, { onConflict: 'user_id' });
    setSaving(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
        if (note) handleSave(note);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [note]);

  return (
    <BentoCard title="Scratchpad" icon={Edit3} action={saving && <span className="text-[9px] text-emerald-500 animate-pulse">Kaydediliyor...</span>}>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Hızlı notlar..."
        className="w-full h-full bg-transparent resize-none outline-none text-xs text-neutral-300 placeholder-neutral-700 font-mono leading-relaxed"
      />
    </BentoCard>
  );
};

// --- DATA WIDGETS ---

const NetworkWidget = () => {
  const [ipData, setIpData] = useState(null);

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        setIpData(data);
      } catch (e) {
        setIpData({ ip: "127.0.0.1", city: "Localhost", org: "Unknown" });
      }
    };
    fetchIp();
  }, []);

  return (
    <BentoCard title="Ağ Durumu" icon={Wifi}>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-neutral-500">IP Adresi</span>
          <span className="text-xs font-mono text-emerald-400">{ipData?.ip || "..."}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-neutral-500">Lokasyon</span>
          <span className="text-xs text-white truncate max-w-[100px]">{ipData?.city || "..."}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-neutral-500">ISP</span>
          <span className="text-xs text-neutral-400 truncate max-w-[100px]">{ipData?.org || "..."}</span>
        </div>
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-neutral-800">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] text-neutral-500">Online</span>
        </div>
      </div>
    </BentoCard>
  );
};

const CryptoWidget = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true');
        const data = await res.json();
        setPrices([
          { name: "BTC", val: data.bitcoin.usd, change: data.bitcoin.usd_24h_change },
          { name: "ETH", val: data.ethereum.usd, change: data.ethereum.usd_24h_change },
          { name: "SOL", val: data.solana.usd, change: data.solana.usd_24h_change }
        ]);
      } catch (e) {
        setPrices([
          { name: "BTC", val: 64200, change: 2.4 },
          { name: "ETH", val: 3450, change: -1.2 },
          { name: "SOL", val: 145, change: 5.6 }
        ]);
      }
    };
    fetchCrypto();
  }, []);

  return (
    <BentoCard title="Piyasa" icon={DollarSign}>
      <div className="space-y-3">
        {prices.map((coin, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-neutral-400">{coin.name}</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-white">${coin.val.toLocaleString()}</div>
              <div className={`text-[10px] ${coin.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                {coin.change > 0 ? '+' : ''}{coin.change.toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=39.9334&longitude=32.8597&current=temperature_2m,weather_code&timezone=auto');
        const data = await res.json();
        setWeather({
          temp: data.current.temperature_2m,
          code: data.current.weather_code
        });
      } catch (e) {
        setWeather({ temp: 18, code: 0 });
      }
    };
    fetchWeather();
  }, []);

  const getWeatherIcon = (code) => {
    if (code === 0) return "☀️";
    if (code < 3) return "Hz☁️";
    if (code < 50) return "🌫️";
    return "🌧️";
  };

  return (
    <BentoCard title="Hava (Ankara)" icon={Cloud}>
      <div className="flex items-center justify-between h-full">
        <div className="text-3xl">{weather ? getWeatherIcon(weather.code) : "..."}</div>
        <div className="text-right">
          <div className="text-2xl font-light text-white">{weather?.temp}°C</div>
          <div className="text-[10px] text-neutral-500">Bugün</div>
        </div>
      </div>
    </BentoCard>
  );
};

const MusicWidget = () => {
  return (
    <BentoCard title="Lo-Fi Odak" icon={Music}>
      <div className="relative w-full h-full min-h-[160px] rounded overflow-hidden bg-neutral-900">
        <iframe 
          className="absolute inset-0 w-full h-full"
          src="https://www.youtube.com/embed/jfKfPfyJRdk?si=EnSIkaIECMiOmarE&controls=1&autoplay=1&mute=0" 
          title="Lofi Girl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
    </BentoCard>
  );
};

const DailyTipWidget = () => {
    const [tip, setTip] = useState("");
    useEffect(() => {
        setTip(DEV_TIPS[Math.floor(Math.random() * DEV_TIPS.length)]);
    }, []);
    return (
        <BentoCard title="Günün İpucu" icon={Award}>
            <div className="flex flex-col h-full justify-center">
                <p className="text-xs text-neutral-300 italic leading-relaxed">
                    "{tip}"
                </p>
            </div>
        </BentoCard>
    );
};

const FinancialGoalsMinimal = () => {
  const [goals, setGoals] = useState([
    { id: 'freelance', label: "Freelance", current: 0, target: 5, unit: "İş" },
    { id: 'ads', label: "Web Reklam", current: 0, target: 4, unit: "Site" },
    { id: 'yt', label: "YouTube", current: 0, target: 270, unit: "€" },
  ]);

  const handleIncrement = (id, val) => {
    setGoals(goals.map(g => g.id === id ? { ...g, current: Math.max(0, g.current + val) } : g));
  };

  return (
    <BentoCard title="Finansal Hedefler" icon={Target} className="h-full">
      <div className="space-y-4 flex-1">
        {goals.map((g, i) => (
          <div key={i} className="group">
            <div className="flex justify-between items-end mb-1">
              <span className="text-xs text-neutral-300">{g.label}</span>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleIncrement(g.id, -1)} className="text-neutral-600 hover:text-neutral-300"><Minus size={12}/></button>
                <button onClick={() => handleIncrement(g.id, 1)} className="text-neutral-600 hover:text-neutral-300"><Plus size={12}/></button>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">{g.current}/{g.target} {g.unit}</span>
            </div>
            <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500/80 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((g.current / g.target) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
};

const ToolsWidget = () => {
  const [selected, setSelected] = useState(null);
  const tools = {
    proton: {
      title: "Proton",
      icon: Shield,
      apps: [
        { name: "Mail", icon: Mail, url: "https://proton.me/mail" },
        { name: "VPN", icon: Shield, url: "https://protonvpn.com" },
        { name: "Pass", icon: Key, url: "https://proton.me/pass" },
        { name: "Drive", icon: HardDrive, url: "https://proton.me/drive" },
      ]
    },
    kali: {
      title: "Kali",
      icon: Terminal,
      apps: [
        { name: "Exploit", icon: Terminal, url: "https://www.exploit-db.com/" },
        { name: "Nmap", icon: Search, url: "https://nmap.org" },
        { name: "Wireshark", icon: Activity, url: "https://www.wireshark.org" },
        { name: "Burp", icon: Layers, url: "https://portswigger.net/burp" },
      ]
    }
  };

  if (selected) {
    const data = tools[selected];
    return (
      <div className="h-full flex flex-col animate-in fade-in duration-300">
        <button onClick={() => setSelected(null)} className="mb-2 text-[10px] font-medium text-neutral-500 hover:text-white flex items-center gap-1 transition-colors w-fit">
          <ChevronLeft size={10} /> Geri
        </button>
        <div className="grid grid-cols-2 gap-2">
          {data.apps.map((app, i) => (
            <a key={i} href={app.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-2 bg-neutral-800/40 rounded border border-neutral-800 hover:border-emerald-500/30 hover:bg-neutral-800 transition-all cursor-pointer group">
               {app.icon && <app.icon size={16} className="text-neutral-400 group-hover:text-emerald-500 mb-1" />}
               <span className="text-[10px] text-neutral-400 group-hover:text-white">{app.name}</span>
            </a>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full gap-2">
      <button onClick={() => setSelected('proton')} className="flex items-center justify-between p-3 rounded bg-neutral-800/40 border border-neutral-800 hover:border-emerald-500/30 hover:bg-neutral-800 transition-all group text-left">
        <div className="flex items-center gap-2">
          <Shield size={14} className="text-neutral-500 group-hover:text-emerald-500" />
          <span className="text-xs font-bold text-neutral-400 group-hover:text-white">Proton</span>
        </div>
        <ChevronRight size={12} className="text-neutral-600"/>
      </button>
      <button onClick={() => setSelected('kali')} className="flex items-center justify-between p-3 rounded bg-neutral-800/40 border border-neutral-800 hover:border-blue-500/30 hover:bg-neutral-800 transition-all group text-left">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-neutral-500 group-hover:text-blue-500" />
          <span className="text-xs font-bold text-neutral-400 group-hover:text-white">Kali</span>
        </div>
        <ChevronRight size={12} className="text-neutral-600"/>
      </button>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function MinimalDashboard() {
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [supabase, setSupabase] = useState(null);
  const [session, setSession] = useState(null);
  const [data, setData] = useState({ youtube: null, github: null, leetcode: null });

  // Initialize Supabase - Using dynamic script loading to fix preview build error
  useEffect(() => {
    const initSupabase = () => {
      if (window.supabase) {
        try {
          const client = window.supabase.createClient(API_CONFIG.SUPABASE_URL, API_CONFIG.SUPABASE_KEY);
          setSupabase(client);
        } catch (e) {
          console.error("Supabase init error", e);
        }
      }
    };

    if (!window.supabase) {
      const script = document.createElement('script');
      // unpkg.com, jsdelivr'e göre bazı mobil ağlarda daha kararlı olabilir
      script.src = "https://unpkg.com/@supabase/supabase-js@2";
      script.async = true;
      script.onload = initSupabase;
      document.body.appendChild(script);
    } else {
      initSupabase();
    }
  }, []);

  useEffect(() => {
    if (supabase) {
        supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
        return () => subscription.unsubscribe();
    }
  }, [supabase]);

  const fetchData = async () => {
    setLoading(true);
    const fetchYT = async () => {
      try {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&forHandle=${API_CONFIG.HANDLE_YOUTUBE}&key=${API_CONFIG.YOUTUBE_KEY}`);
        const json = await res.json();
        return json.items?.[0];
      } catch (e) { return null; }
    };
    const fetchGHUser = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${API_CONFIG.USER_GITHUB}`);
        return await res.json();
      } catch (e) { return null; }
    };
    const fetchGHRepos = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${API_CONFIG.USER_GITHUB}/repos?per_page=100`);
        return await res.json();
      } catch (e) { return []; }
    };
    const fetchLC = async () => {
      try {
        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${API_CONFIG.USER_LEETCODE}`);
        return await res.json();
      } catch (e) { return null; }
    };

    try {
      const [ytItem, ghUser, ghRepos, lcJson] = await Promise.all([fetchYT(), fetchGHUser(), fetchGHRepos(), fetchLC()]);
      const stars = Array.isArray(ghRepos) ? ghRepos.reduce((acc, r) => acc + r.stargazers_count, 0) : 0;
      setData({
        youtube: ytItem ? { subs: parseInt(ytItem.statistics.subscriberCount), views: parseInt(ytItem.statistics.viewCount), img: ytItem.snippet.thumbnails.default.url } : null,
        github: ghUser ? { followers: ghUser.followers, repos: ghUser.public_repos, stars, img: ghUser.avatar_url } : null,
        leetcode: (lcJson && lcJson.status === 'success') ? { solved: lcJson.totalSolved, hard: lcJson.hardSolved } : null
      });
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };
  
  useEffect(() => {
    fetchData();
    document.title = "Dashboard - Cuma Karadash";
  }, []);

  const handleLogout = async () => { if (supabase) await supabase.auth.signOut(); };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans p-6 md:p-12" style={{ zoom: '65%' }}>
      {supabase && !session && <AuthScreen supabase={supabase} />}
      <header className="max-w-7xl mx-auto mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-light text-white tracking-tight mb-1">Cuma Karadash</h1>
          <p className="text-sm text-neutral-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Geliştirici Üssü {session && <span className="ml-2 text-emerald-600 text-[10px] border border-emerald-900/50 px-1 rounded bg-emerald-900/20">{session.user.email}</span>}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {session && (
            <button onClick={handleLogout} className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-rose-600 hover:text-rose-500 transition-all text-neutral-400">
                <LogOut size={16} />
            </button>
          )}
          <button onClick={() => setAutoRefresh(!autoRefresh)} className={`p-2.5 rounded-full border transition-all ${autoRefresh ? 'bg-emerald-900/20 border-emerald-500/50 text-emerald-400' : 'bg-neutral-900 border-neutral-800 text-neutral-400'}`}>
            <Zap size={16} />
          </button>
          <button onClick={fetchData} disabled={loading} className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-neutral-400">
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <BentoCard className="md:col-span-2 row-span-2" title="GitHub" icon={Github}>
          <div className="flex flex-col h-full gap-4">
            <div className="flex items-start gap-4">
              <img src={data.github?.img} alt="Profile" className="w-12 h-12 rounded-full grayscale opacity-80" />
              <div className="flex-1 grid grid-cols-3 gap-4">
                <StatBox label="Takipçi" value={<AnimatedCounter value={data.github?.followers} />} />
                <StatBox label="Yıldız" value={<AnimatedCounter value={data.github?.stars} />} />
                <StatBox label="Repo" value={data.github?.repos} />
              </div>
            </div>
            <div className="flex-1 w-full rounded bg-neutral-900 border border-neutral-800 overflow-hidden flex items-center justify-center p-2 opacity-60">
               <img src={`https://github-readme-activity-graph.vercel.app/graph?username=${API_CONFIG.USER_GITHUB}&bg_color=171717&color=a3a3a3&line=525252&point=ffffff&area=true&hide_border=true&hide_title=true`} alt="Activity" className="w-full h-full object-contain" />
            </div>
          </div>
        </BentoCard>

        <PomodoroWidget />
        <ToolsWidget />
        <TodoWidget supabase={supabase} session={session} />
        <FinancialGoalsMinimal />
        <ScratchpadWidget supabase={supabase} session={session} />
        
        <BentoCard title="YouTube" icon={Youtube}>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <StatBox label="Abone" value={<AnimatedCounter value={data.youtube?.subs} />} />
              <div className="text-right">
                 <span className="text-2xl font-light text-white block"><AnimatedCounter value={data.youtube?.views} /></span>
                 <span className="text-[10px] text-neutral-500 uppercase">İzlenme</span>
              </div>
            </div>
            <div className="w-full bg-neutral-800 h-1 rounded-full overflow-hidden">
              <div className="bg-rose-600/60 h-full w-[35%]"></div> 
            </div>
          </div>
        </BentoCard>

        <BentoCard title="LeetCode" icon={Code2}>
          <div className="flex items-center justify-between h-full">
              <div className="flex flex-col">
                <span className="text-2xl font-light text-white">{data.leetcode?.solved || 0}</span>
                <span className="text-[10px] text-neutral-500">Çözülen</span>
              </div>
              <div className="text-right space-y-1">
                 <div className="text-xs text-rose-500">Zor: {data.leetcode?.hard || 0}</div>
              </div>
          </div>
        </BentoCard>

        <DailyTipWidget />
        <CryptoWidget />
        <WeatherWidget />
        <NetworkWidget />
        <MusicWidget />
      </div>
      
      <footer className="max-w-7xl mx-auto mt-12 pt-6 border-t border-neutral-900 flex justify-between items-center text-[10px] text-neutral-600">
          <p>v0.3 &bull; React Dashboard</p>
          <div className="flex gap-4"><span>Priv</span><span>Term</span></div>
      </footer>
    </div>
  );
}
