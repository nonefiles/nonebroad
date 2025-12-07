import React, { useState, useEffect } from 'react';
// Supabase kütüphanesini Canvas ortamına uygun şekilde yüklemek için bu satır kaldırıldı.
// Kütüphanenin tarayıcı ortamında global olarak (window.supabase) mevcut olduğu varsayılacaktır.
// import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { 
  Github, Youtube, Users, Eye, Star, BookOpen, RefreshCw, 
  ExternalLink, Layers, Award, Terminal, TrendingUp, 
  TrendingDown, Calendar, Clock, Zap, Activity, Shield, 
  Key, Mail, HardDrive, CalendarDays, Search, Wifi, 
  MonitorPlay, Globe, Code2, Target, Minus, Plus, Video,
  ChevronRight, ChevronLeft, Lock, Coffee, LogOut 
} from 'lucide-react';

// Supabase kütüphanesini CDN üzerinden yükleyen script etiketini ekliyoruz.
// Bu, "Dynamic require" hatasını çözer ve createClient'ı global kapsamda kullanılabilir yapar.
// Eğer bu kod Canvas ortamında çalışıyorsa ve kütüphane otomatik yüklenmiyorsa bu gereklidir.
const SupabaseLoader = () => {
  useEffect(() => {
    if (typeof window.supabase === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);
  return null;
};


// --- API CONFIGURATION ---
const API_CONFIG = {
  YOUTUBE_KEY: "AIzaSyDIsemv1v-ZUqp-8amLOeA6RTRqQaOrB6M",
  GITHUB_TOKEN: "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",
  USER_GITHUB: "cumakaradash",
  HANDLE_YOUTUBE: "@CumaKaradash",
  USER_LEETCODE: "nonefiles"
};

// ===============================================
// SUPABASE CONFIGURATION - GÜNCELLENMİŞTİR
// ===============================================
const supabaseUrl = "https://rwcamchqlaaqcsvsdxel.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3Y2FtY2hxbGFhcWNzdnNkeGVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNTQyNjksImV4cCI6MjA4MDYzMDI2OX0.zWYTHd1yumm1C7Y5yRVhxp75RZEF4gzIkwZQW2StrA8";

// Supabase istemcisini oluşturmak için bir değişken tanımlıyoruz. 
// Bu, bileşen yüklendikten sonra oluşturulacaktır.
let supabaseClient = null;

// Fonksiyon: createClient'a güvenli erişim
const getSupabaseClient = () => {
    if (supabaseClient) return supabaseClient;
    if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
        supabaseClient = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
        return supabaseClient;
    }
    // Eğer Supabase kütüphanesi henüz yüklenmediyse null döner
    return null;
};
// ===============================================


// --- MOCK DATA ---
const FALLBACK_NEWS = [
  { title: "Linux 6.8 Çekirdeği Yayınlandı", link: "#", pubDate: new Date().toISOString() },
  { title: "Yapay Zeka Güvenliği Tehditleri", link: "#", pubDate: new Date().toISOString() },
  { title: "Docker Güvenlik Açığı Analizi", link: "#", pubDate: new Date().toISOString() },
  { title: "2025 Siber Güvenlik Trendleri", link: "#", pubDate: new Date().toISOString() },
];

// --- HELPER COMPONENTS ---

const AnimatedCounter = ({ value }) => {
  if (!value) return <span>0</span>;
  return <span>{new Intl.NumberFormat('tr-TR', { notation: "compact", compactDisplay: "short" }).format(value)}</span>;
};

// Minimalist Card Wrapper
const BentoCard = ({ children, className = "", title, icon: Icon, action }) => (
  <div className={`bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors duration-300 ${className}`}>
    {(title || Icon) && (
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-2 text-neutral-400">
          {Icon && <Icon size={18} />}
          {title && <h3 className="text-sm font-medium tracking-wide uppercase">{title}</h3>}
        </div>
        {action}
      </div>
    )}
    {children}
  </div>
);

const TrendIndicator = ({ value }) => {
  if (!value) return null;
  const isPositive = value > 0;
  return (
    <span className={`text-xs font-medium flex items-center gap-1 ${isPositive ? 'text-emerald-500' : value < 0 ? 'text-rose-500' : 'text-neutral-500'}`}>
      {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
      {Math.abs(value)}%
    </span>
  );
};

// Simplified Chart
const MiniChart = ({ data, color = "#525252" }) => {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((val - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="h-8 w-24 opacity-50">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
};

// --- FEATURE COMPONENTS ---

const StatBox = ({ label, value, subValue, icon: Icon }) => (
  <div className="flex flex-col">
    <span className="text-xs text-neutral-500 font-medium mb-1">{label}</span>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-light text-neutral-100">{value}</span>
      {subValue && <span className="text-xs text-neutral-500">{subValue}</span>}
    </div>
  </div>
);

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
      <div className="space-y-6 flex-1">
        {goals.map((g, i) => (
          <div key={i} className="group">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm text-neutral-300">{g.label}</span>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleIncrement(g.id, -1)} className="text-neutral-600 hover:text-neutral-300"><Minus size={14}/></button>
                <button onClick={() => handleIncrement(g.id, 1)} className="text-neutral-600 hover:text-neutral-300"><Plus size={14}/></button>
              </div>
              <span className="text-xs font-mono text-neutral-400">{g.current} / {g.target} {g.unit}</span>
            </div>
            <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-neutral-200 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((g.current / g.target) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-4 border-t border-neutral-800 flex justify-between items-center text-xs text-neutral-500">
        <span className="flex items-center gap-1"><Clock size={12}/> 3 Ay Süre</span>
        <span>Hedef: 670€</span>
      </div>
    </BentoCard>
  );
};

const ViralVideosMinimal = ({ apiKey }) => {
  const [videos, setVideos] = useState([]);
  
  useEffect(() => {
    const fetchViral = async () => {
      try {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&videoCategoryId=28&maxResults=3&key=${apiKey}`);
        const data = await res.json();
        if (data.items) setVideos(data.items);
      } catch (e) { console.error(e); }
    };
    fetchViral();
  }, [apiKey]);

  return (
    <BentoCard title="Trend (Global Teknoloji)" icon={TrendingUp} className="h-full">
      <div className="space-y-3">
        {videos.map(vid => (
          <a key={vid.id} href={`https://www.youtube.com/watch?v=${vid.id}`} target="_blank" rel="noreferrer" className="flex gap-3 group">
            <div className="w-16 h-10 bg-neutral-800 rounded overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all">
              <img src={vid.snippet.thumbnails.default.url} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-neutral-300 truncate group-hover:text-white transition-colors">{vid.snippet.title}</p>
              <div className="flex gap-2 text-[10px] text-neutral-500 mt-1">
                <span>{new Intl.NumberFormat('tr-TR', { notation: "compact" }).format(vid.statistics.viewCount)} izlenme</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </BentoCard>
  );
};

const TechNewsMinimal = () => {
  const [news, setNews] = useState(FALLBACK_NEWS);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://feeds.feedburner.com/TheHackersNews')}`);
        const data = await res.json();
        if (data.status === 'ok') setNews(data.items.slice(0, 4));
      } catch (e) {}
    };
    fetchNews();
  }, []);

  return (
    <BentoCard title="Haber Akışı" icon={Globe} className="h-full">
      <div className="space-y-4">
        {news.map((item, i) => (
          <a key={i} href={item.link} target="_blank" rel="noreferrer" className="block group">
            <h4 className="text-sm text-neutral-400 group-hover:text-neutral-200 transition-colors line-clamp-1">{item.title}</h4>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-neutral-600">{new Date(item.pubDate).toLocaleDateString()}</span>
            </div>
          </a>
        ))}
      </div>
    </BentoCard>
  );
};

const ToolsWidget = () => {
  const [selected, setSelected] = useState(null);

  const tools = {
    proton: {
      title: "Proton Paketi",
      icon: Shield,
      apps: [
        { name: "Proton Mail", icon: Mail, desc: "Uçtan uca şifreli e-posta.", url: "https://proton.me/mail" },
        { name: "Proton VPN", icon: Shield, desc: "Yüksek hızlı güvenli VPN.", url: "https://protonvpn.com" },
        { name: "Proton Pass", icon: Key, desc: "Kimlik ve şifre yöneticisi.", url: "https://proton.me/pass" },
        { name: "Proton Drive", icon: HardDrive, desc: "Güvenli dosya depolama.", url: "https://proton.me/drive" },
        { name: "Proton Calendar", icon: CalendarDays, desc: "Şifreli takvim.", url: "https://proton.me/calendar" }
      ]
    },
    kali: {
      title: "Kali Linux (USB)",
      icon: Terminal,
      apps: [
        { name: "Metasploit", icon: Terminal, desc: "Sızma testi çatısı.", url: "https://www.metasploit.com" },
        { name: "Nmap", icon: Search, desc: "Ağ tarama ve haritalama.", url: "https://nmap.org" },
        { name: "Wireshark", icon: Activity, desc: "Ağ trafiği analizi.", url: "https://www.wireshark.org" },
        { name: "Burp Suite", icon: Layers, desc: "Web uygulama güvenliği.", url: "https://portswigger.net/burp" },
        { name: "Aircrack-ng", icon: Wifi, desc: "Kablosuz ağ denetimi.", url: "https://www.aircrack-ng.org" }
      ]
    }
  };

  if (selected) {
    const data = tools[selected];
    return (
      <div className="h-full flex flex-col animate-in fade-in duration-300">
        <button 
          onClick={() => setSelected(null)} 
          className="mb-4 text-xs font-medium text-neutral-400 hover:text-white flex items-center gap-1 transition-colors w-fit"
        >
          <ChevronLeft size={14} /> Geri Dön
        </button>
        
        <div className="flex items-center gap-2 mb-4 text-neutral-200">
          <data.icon size={18} className="text-emerald-500" />
          <span className="font-bold text-sm tracking-wide">{data.title}</span>
        </div>
        
        <div className="overflow-y-auto pr-1 space-y-2 custom-scrollbar flex-1 -mr-2 pr-2">
          {data.apps.map((app, i) => (
            <a 
              key={i} 
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-neutral-800/40 p-3 rounded-lg border border-neutral-800 hover:border-emerald-500/50 hover:bg-neutral-800 transition-all cursor-pointer group"
            >
              <div className="flex gap-3 items-start">
                 {/* App Icon */}
                 <div className="p-2 rounded bg-neutral-900 text-neutral-400 group-hover:text-emerald-500 transition-colors shrink-0">
                    {app.icon && <app.icon size={16} />}
                 </div>
                 
                 <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                       <span className="text-xs font-bold text-neutral-300 group-hover:text-white truncate">{app.name}</span>
                       <ExternalLink size={10} className="text-neutral-600 group-hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                    <div className="text-[10px] text-neutral-500 leading-relaxed truncate">{app.desc}</div>
                 </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col gap-3 justify-center flex-1">
        <button 
          onClick={() => setSelected('proton')}
          className="flex items-center justify-between p-4 rounded-xl bg-neutral-800/40 border border-neutral-800 hover:border-emerald-500/30 hover:bg-neutral-800 transition-all group text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-neutral-900 text-neutral-400 group-hover:text-emerald-500 transition-colors">
              <Shield size={18} />
            </div>
            <div>
              <div className="text-sm font-bold text-neutral-300 group-hover:text-white transition-colors">Proton Paketi</div>
              <div className="text-[10px] text-neutral-500">Gizlilik Uygulamaları</div>
            </div>
          </div>
          <ChevronRight size={16} className="text-neutral-600 group-hover:text-neutral-400 group-hover:translate-x-1 transition-all"/>
        </button>

        <button 
          onClick={() => setSelected('kali')}
          className="flex items-center justify-between p-4 rounded-xl bg-neutral-800/40 border border-neutral-800 hover:border-blue-500/30 hover:bg-neutral-800 transition-all group text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-neutral-900 text-neutral-400 group-hover:text-blue-500 transition-colors">
              <Terminal size={18} />
            </div>
            <div>
              <div className="text-sm font-bold text-neutral-300 group-hover:text-white transition-colors">Kali Linux</div>
              <div className="text-[10px] text-neutral-500">USB Canlı Araçlar</div>
            </div>
          </div>
          <ChevronRight size={16} className="text-neutral-600 group-hover:text-neutral-400 group-hover:translate-x-1 transition-all"/>
        </button>
      </div>
    </div>
  );
};

// --- LOGIN SCREEN COMPONENT ---
const LoginScreen = ({ setAuthScreen, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "☕ nonebroad - Giriş";
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const sb = getSupabaseClient();

    if (!sb) {
      setError("Supabase kütüphanesi yüklenmedi. Lütfen bir saniye bekleyip tekrar deneyin.");
      setLoading(false);
      return;
    }
    
    // Güvenlik: Boş alan kontrolü
    if (!email || !password) {
        setError("Lütfen e-posta ve şifrenizi giriniz.");
        setLoading(false);
        return;
    }

    // Konsola bilgi yazdır
    console.log("Supabase Auth isteği gönderiliyor...");
    console.log("E-posta:", email);
    console.log("Şifre Uzunluğu:", password.length);


    try {
      const { data, error } = await sb.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }
      
      // Kullanıcı verisinin mevcut olduğundan emin olun
      if (!data.user) {
        throw new Error("Giriş yapıldı ancak kullanıcı bilgisi alınamadı.");
      }

      setUser(data.user);
      setAuthScreen(false); // Dashboard'u göster

    } catch (err) {
      // Supabase'den gelen hataları daha ayrıntılı göster
      let errorMessage;
      if (err.message.includes('Invalid login credentials')) {
          errorMessage = "Geçersiz giriş bilgileri. E-posta veya şifrenizi kontrol edin.";
      } else {
          errorMessage = err.message || "Bilinmeyen Hata. Lütfen konsolu kontrol edin.";
      }
      setError("Giriş başarısız: " + errorMessage);
      console.error("Giriş hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 p-6">
      <div className="w-full max-w-md p-8 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl animate-in fade-in duration-500">
        
        <div className="flex flex-col items-center mb-8">
          <Coffee size={32} className="text-emerald-500 mb-2" />
          <h1 className="text-3xl font-light text-white tracking-tight">nonebroad</h1>
          <p className="text-sm text-neutral-500 mt-2">Dashboard'a erişmek için giriş yapın.</p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1" htmlFor="email">E-posta</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500 text-sm placeholder-neutral-600 transition-colors"
              placeholder="e.g. user@domain.com"
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1" htmlFor="password">Şifre</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500 text-sm placeholder-neutral-600 transition-colors"
              placeholder="********"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="text-xs text-rose-400 bg-rose-900/20 p-3 rounded-lg border border-rose-800/50">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <RefreshCw size={16} className="animate-spin" />}
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <p className="text-center text-[10px] text-neutral-600 mt-6">
          Bu dashboard sadece yetkili kullanıcılar içindir.
        </p>
        {(!supabaseClient) && (
           <p className="text-center text-xs text-amber-500 mt-4">⚠️ Supabase kütüphanesi yükleniyor...</p>
        )}
      </div>
    </div>
  );
};


// --- MAIN APP COMPONENT ---

export default function MinimalDashboard() {
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [user, setUser] = useState(null); // Supabase kullanıcı nesnesi
  const [authScreen, setAuthScreen] = useState(true); 
  
  // State
  const [data, setData] = useState({ youtube: null, github: null, leetcode: null });

  // Supabase'den çıkış yapma
  const handleSignOut = async () => {
    const sb = getSupabaseClient();
    if (sb) {
      await sb.auth.signOut();
      setUser(null);
      setAuthScreen(true);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // API çağrıları (mevcut kodunuz)
      const ytRes = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&forHandle=${API_CONFIG.HANDLE_YOUTUBE}&key=${API_CONFIG.YOUTUBE_KEY}`);
      const ytJson = await ytRes.json();
      const ytItem = ytJson.items?.[0];

      const ghUserRes = await fetch(`https://api.github.com/users/${API_CONFIG.USER_GITHUB}`);
      const ghUser = await ghUserRes.json();
      const ghReposRes = await fetch(`https://api.github.com/users/${API_CONFIG.USER_GITHUB}/repos?per_page=100`);
      const ghRepos = await ghReposRes.json();
      const stars = Array.isArray(ghRepos) ? ghRepos.reduce((acc, r) => acc + r.stargazers_count, 0) : 0;

      const lcRes = await fetch(`https://leetcode-stats-api.herokuapp.com/${API_CONFIG.USER_LEETCODE}`);
      const lcJson = await lcRes.json();

      setData({
        youtube: ytItem ? {
          subs: parseInt(ytItem.statistics.subscriberCount),
          views: parseInt(ytItem.statistics.viewCount),
          videos: parseInt(ytItem.statistics.videoCount),
          img: ytItem.snippet.thumbnails.default.url
        } : null,
        github: {
          followers: ghUser.followers,
          repos: ghUser.public_repos,
          stars: stars,
          img: ghUser.avatar_url,
          chart: [10, 15, 12, 20, 25, 22, 30] // Mock trend
        },
        leetcode: lcJson.status === 'success' ? {
          solved: lcJson.totalSolved,
          acceptance: lcJson.acceptanceRate,
          hard: lcJson.hardSolved
        } : null
      });
      setLastUpdated(new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'}));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  
  // Oturum dinleyicisi (Supabase)
  useEffect(() => {
    // Supabase kütüphanesinin yüklenmesini bekleyen geçici bir dinleyici
    const checkSupabase = setInterval(() => {
        const sb = getSupabaseClient();
        if (sb) {
            clearInterval(checkSupabase);
            
            sb.auth.onAuthStateChange((_event, session) => {
              if (session) {
                setUser(session.user);
                setAuthScreen(false);
                fetchData();
              } else {
                setUser(null);
                setAuthScreen(true);
              }
            });

            // İlk yüklemede mevcut oturumu kontrol et
            sb.auth.getSession().then(({ data: { session } }) => {
                if (session) {
                    setUser(session.user);
                    setAuthScreen(false);
                    fetchData();
                } else {
                    setAuthScreen(true);
                    setLoading(false);
                }
            });
        }
    }, 100); // 100ms'de bir kontrol et

    return () => clearInterval(checkSupabase);
  }, []);

  // Auto Refresh Logic (5 minutes)
  useEffect(() => {
    let interval;
    if (autoRefresh && user) { // Oturum açılmışsa ve autoRefresh açıksa
      interval = setInterval(fetchData, 300000); // 5 dakika
    }
    return () => clearInterval(interval);
  }, [autoRefresh, user]);
  
  // Sekme başlığını ayarla
  useEffect(() => { 
    document.title = user ? "☕ nonebroad - Cuma Karadash" : "☕ nonebroad - Giriş";
  }, [user]);
  
  // Supabase kütüphanesini yükleyen gizli bileşen
  // Bu, getSupabaseClient'ın window.supabase'e erişmesini sağlar
  // Normalde bunu index.html'e koyardık, ancak React tek dosya kısıtlaması nedeniyle buraya ekliyoruz.
  SupabaseLoader();

  // Eğer giriş yapılmadıysa LoginScreen bileşenini göster
  if (authScreen || !user) {
    const sb = getSupabaseClient();
    // Supabase bağlantısı yoksa, loading ekranı göster
    if (!sb && typeof window.supabase === 'undefined') {
       return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white p-6">
            <div className="text-center p-8 bg-neutral-900 border border-neutral-800 rounded-lg">
                <h2 className="text-xl font-bold text-neutral-400 mb-4 flex items-center justify-center gap-2">
                    <RefreshCw size={20} className="animate-spin text-emerald-500" /> Kütüphane Yükleniyor...
                </h2>
                <p className="text-sm text-neutral-500">Supabase kütüphanesinin yüklenmesi bekleniyor.</p>
            </div>
        </div>
      );
    }
    // Login ekranını göster
    return <LoginScreen setAuthScreen={setAuthScreen} setUser={setUser} />;
  }


  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 p-6 md:p-12 font-sans selection:bg-neutral-700 selection:text-white">
      
      {/* HEADER */}
      <header className="max-w-6xl mx-auto mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-light text-white tracking-tight mb-1">Cuma Karadash</h1>
          <p className="text-sm text-neutral-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Geliştirici Analitiği
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] text-neutral-600 uppercase tracking-wider">Son Güncelleme</div>
            <div className="text-xs font-mono text-neutral-400">{lastUpdated || "--:--"}</div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`p-3 rounded-full border transition-all active:scale-95 flex items-center justify-center ${
                autoRefresh 
                  ? 'bg-emerald-900/30 border-emerald-500/50 text-emerald-400' 
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:bg-neutral-800'
              }`}
              title={autoRefresh ? "Otomatik Yenileme Açık (5dk)" : "Otomatik Yenileme Kapalı"}
            >
              <Zap size={16} className={autoRefresh ? "fill-current" : ""} />
            </button>
            
            <button 
              onClick={fetchData} 
              disabled={loading}
              className="p-3 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800 transition-all active:scale-95 disabled:opacity-50 text-neutral-400"
              title="Şimdi Yenile"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
            
            <button 
              onClick={handleSignOut} 
              className="p-3 rounded-full bg-neutral-900 border border-neutral-800 hover:border-rose-600/50 hover:bg-rose-900/20 transition-all active:scale-95 text-neutral-400 hover:text-rose-400"
              title="Çıkış Yap"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* BENTO GRID LAYOUT */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* 1. GITHUB MAIN STATS (Large Box - Row Span 2) */}
        <BentoCard className="md:col-span-2 lg:col-span-2 row-span-2" title="GitHub Aktivitesi" icon={Github}>
          <div className="flex flex-col h-full gap-6">
            <div className="flex items-start gap-6">
              <img src={data.github?.img} alt="Profile" className="w-16 h-16 rounded-full grayscale opacity-80" />
              <div className="flex-1 grid grid-cols-3 gap-4">
                <StatBox label="Takipçi" value={<AnimatedCounter value={data.github?.followers} />} />
                <StatBox label="Yıldız" value={<AnimatedCounter value={data.github?.stars} />} />
                <StatBox label="Repo" value={data.github?.repos} />
              </div>
            </div>
            {/* Expanded Chart Area */}
            <div className="flex-1 min-h-[160px] w-full rounded bg-neutral-900 border border-neutral-800 overflow-hidden flex items-center justify-center p-2 relative">
               <img 
                 src={`https://github-readme-activity-graph.vercel.app/graph?username=${API_CONFIG.USER_GITHUB}&bg_color=171717&color=a3a3a3&line=525252&point=ffffff&area=true&hide_border=true&hide_title=true`} 
                 alt="Github Activity Graph" 
                 className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity" 
               />
            </div>
          </div>
        </BentoCard>

        {/* 2. FINANCIAL GOALS (Row Span 2 for Symmetry) */}
        <div className="md:col-span-1 lg:col-span-1 row-span-2">
          <FinancialGoalsMinimal />
        </div>

        {/* 3. TOOLKIT (Row Span 2 for Symmetry) */}
        <BentoCard title="Araç Seti" icon={Terminal} className="md:col-span-1 lg:col-span-1 row-span-2">
           <div className="flex flex-col h-full justify-between">
             <div className="space-y-2 h-full">
               <ToolsWidget />
             </div>
           </div>
        </BentoCard>

        {/* --- BOTTOM ROW: 4 Items Side by Side --- */}

        {/* 4. YOUTUBE STATS */}
        <BentoCard className="md:col-span-1 h-full" title="YouTube" icon={Youtube}>
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <StatBox label="Abone" value={<AnimatedCounter value={data.youtube?.subs} />} />
              <div className="text-right">
                <MiniChart data={[100, 120, 115, 140, 160]} color="#ef4444" />
                <TrendIndicator value={2.4} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
              <StatBox label="İzlenme" value={<AnimatedCounter value={data.youtube?.views} />} />
              <StatBox label="Video" value={data.youtube?.videos} />
            </div>
            
            <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div className="bg-neutral-500 h-full w-[25%]"></div> 
            </div>
            <div className="text-[10px] text-neutral-500 text-right mt-1">YPP İlerlemesi</div>
          </div>
        </BentoCard>

        {/* 5. LEETCODE */}
        <BentoCard className="md:col-span-1 h-full" title="LeetCode" icon={Code2}>
          <div className="space-y-6 flex flex-col h-full justify-center">
            <div className="flex items-center justify-between">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-neutral-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path className="text-neutral-200" strokeDasharray={`${data.leetcode?.acceptance || 60}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span className="absolute text-sm font-medium">{data.leetcode?.solved || 0}</span>
              </div>
              <div className="text-right space-y-2">
                <div className="text-xs text-neutral-500">Kabul Oranı</div>
                <div className="text-lg text-white">{data.leetcode?.acceptance || 0}%</div>
              </div>
            </div>
            <div className="flex gap-2 text-[10px] font-mono justify-center pt-4 border-t border-neutral-800">
               <span className="px-2 py-1 bg-neutral-800 rounded text-emerald-500">Kolay</span>
               <span className="px-2 py-1 bg-neutral-800 rounded text-amber-500">Orta</span>
               <span className="px-2 py-1 bg-neutral-800 rounded text-rose-500">Zor</span>
            </div>
          </div>
        </BentoCard>

        {/* 6. TREND (GLOBAL TECH) */}
        <div className="md:col-span-1">
           <ViralVideosMinimal apiKey={API_CONFIG.YOUTUBE_KEY} />
        </div>
        
        {/* 7. NEWS */}
        <div className="md:col-span-1">
           <TechNewsMinimal />
        </div>

      </div>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto mt-16 pt-8 border-t border-neutral-900 flex justify-between items-center text-xs text-neutral-600">
        <p>Minimalist Dashboard v0.1</p>
        <div className="flex gap-4">
          <span>Gizlilik</span>
          <span>Şartlar</span>
        </div>
      </footer>
    </div>
  );
}
