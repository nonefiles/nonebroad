import React, { useState, useEffect } from 'react';
import { 
  Github, Youtube, Users, Eye, EyeOff, Star, BookOpen, RefreshCw, 
  ExternalLink, Layers, Award, Terminal, TrendingUp, 
  TrendingDown, Calendar, Clock, Zap, Activity, Shield, 
  Key, Mail, HardDrive, CalendarDays, Search, 
  MonitorPlay, Globe, Code2, Target, Minus, Plus, Video,
  ChevronRight, ChevronLeft, Lock, Coffee, LogOut, Maximize2, X,
  Play, Pause, RotateCcw, CheckSquare, Trash2, Edit3,
  Cloud, Music, Bitcoin, MapPin, DollarSign, Hash,
  LogIn, UserPlus, Loader2, ShieldCheck
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
      // Önce yerel veriyi yükle
      const localTodos = localStorage.getItem('local_todos');
      if (localTodos) {
        setTodos(JSON.parse(localTodos));
      }

      if (!supabase || !session) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setTodos(data);
        localStorage.setItem('local_todos', JSON.stringify(data));
      }
      setLoading(false);
    };
    fetchTodos();
  }, [supabase, session]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const tempId = Date.now();
    const newTodoText = input.trim();
    const newTodo = { id: tempId, text: newTodoText, completed: false, user_id: session?.user?.id };
    
    // Optimistik güncelleme: Hemen listeye ve localStorage'a ekle
    const updatedTodos = [newTodo, ...todos];
    setTodos(updatedTodos);
    localStorage.setItem('local_todos', JSON.stringify(updatedTodos));
    setInput('');

    // Eğer oturum varsa DB'ye kaydetmeyi dene
    if (supabase && session) {
      try {
        const { data, error } = await supabase
          .from('todos')
          .insert([{ text: newTodoText, completed: false, user_id: session.user.id }])
          .select();
        
        if (error) throw error;
        
        if (data && data[0]) {
          const finalTodos = updatedTodos.map(t => t.id === tempId ? data[0] : t);
          setTodos(finalTodos);
          localStorage.setItem('local_todos', JSON.stringify(finalTodos));
        }
      } catch (err) {
        console.error("Todo ekleme hatası (offline mod olabilir):", err);
      }
    }
  };

  const toggleTodo = async (id, currentStatus) => {
    const updatedTodos = todos.map(t => t.id === id ? { ...t, completed: !currentStatus } : t);
    setTodos(updatedTodos);
    localStorage.setItem('local_todos', JSON.stringify(updatedTodos));
    
    if (supabase && typeof id === 'string') {
      try {
        await supabase.from('todos').update({ completed: !currentStatus }).eq('id', id);
      } catch (e) {
        console.error("Todo güncelleme hatası:", e);
      }
    }
  };

  const deleteTodo = async (id) => {
    const updatedTodos = todos.filter(t => t.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('local_todos', JSON.stringify(updatedTodos));
    
    if (supabase && typeof id === 'string') {
      try {
        await supabase.from('todos').delete().eq('id', id);
      } catch (e) {
        console.error("Todo silme hatası:", e);
      }
    }
  };

  return (
    <BentoCard title="Todo List" icon={CheckSquare} className="row-span-2">
      <div className="flex flex-col h-full">
        <form onSubmit={addTodo} className="flex gap-2 mb-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="New task..."
            className="flex-1 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-xs px-3 py-2 text-white focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none transition-all placeholder:text-neutral-600"
          />
          <button type="submit" disabled={!session} className="bg-emerald-600/10 text-emerald-500 p-2 rounded-lg hover:bg-emerald-600 hover:text-white transition-all disabled:opacity-50">
            <Plus size={16} />
          </button>
        </form>
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar min-h-[150px]">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="animate-spin text-neutral-600" size={16} />
            </div>
          )}
          {!loading && todos.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 opacity-40">
              <CheckSquare size={24} className="mb-2" />
              <p className="text-[10px] uppercase tracking-widest font-bold">Empty List</p>
            </div>
          )}
          {todos.map(todo => (
            <div key={todo.id} className="group flex items-center justify-between p-2.5 bg-neutral-800/20 rounded-xl border border-neutral-800/50 hover:border-neutral-700 transition-all">
              <div className="flex items-center gap-3 overflow-hidden">
                <button 
                  onClick={() => toggleTodo(todo.id, todo.completed)}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${todo.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-neutral-700 hover:border-emerald-500/50 text-transparent'}`}
                >
                  <CheckSquare size={12} strokeWidth={3} />
                </button>
                <span className={`text-xs font-medium transition-all truncate ${todo.completed ? 'text-neutral-600 line-through' : 'text-neutral-300'}`}>
                  {todo.text}
                </span>
              </div>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="p-1.5 text-neutral-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-md opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
};

const NotepadWidget = ({ supabase, session }) => {
  const [notes, setNotes] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  const activeNote = notes.find(n => n.id === activeNoteId) || notes[0] || null;

  useEffect(() => {
    if (notes.length > 0 && !activeNoteId) {
      setActiveNoteId(notes[0].id);
    }
  }, [notes, activeNoteId]);

  useEffect(() => {
    const fetchNotes = async () => {
      // Önce yerel veriyi yükle
      const localNotes = localStorage.getItem('local_notes');
      if (localNotes) {
        const parsed = JSON.parse(localNotes);
        setNotes(parsed);
        if (parsed.length > 0) setActiveNoteId(parsed[0].id);
      }

      if (!supabase || !session) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('scratchpad')
          .select('*')
          .eq('user_id', session.user.id)
          .order('updated_at', { ascending: false });
        
        if (data && data.length > 0) {
          setNotes(data);
          localStorage.setItem('local_notes', JSON.stringify(data));
          setActiveNoteId(data[0].id);
        } else {
          // Eğer hiç not yoksa veya hata varsa en azından yerel bir tane oluşturalım
          const newNote = { id: Date.now(), user_id: session.user.id, content: '' };
          setNotes([newNote]);
          setActiveNoteId(newNote.id);
          
          // Arka planda DB'ye kaydetmeyi deneyelim
          if (!error) {
            const { data: createdData } = await supabase.from('scratchpad').insert([{ user_id: session.user.id, content: '' }]).select();
            if (createdData && createdData[0]) {
              setNotes([createdData[0]]);
              localStorage.setItem('local_notes', JSON.stringify([createdData[0]]));
              setActiveNoteId(createdData[0].id);
            }
          }
        }
      } catch (err) {
        console.error("Notlar yüklenirken hata:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [supabase, session]);

  // Debounced save logic
  useEffect(() => {
    if (!activeNote || !supabase || !session || (typeof activeNote.id !== 'string' && activeNote.id > 1000000000000)) {
      // Yerel kaydetme her durumda çalışsın
      if (notes.length > 0) {
        localStorage.setItem('local_notes', JSON.stringify(notes));
      }
      return;
    }

    const timeout = setTimeout(async () => {
      setSaving(true);
      try {
        // Yerel kaydet
        localStorage.setItem('local_notes', JSON.stringify(notes));
        
        // Uzak kaydet
        await supabase
          .from('scratchpad')
          .update({ content: activeNote.content || '', updated_at: new Date().toISOString() })
          .eq('id', activeNote.id);
      } catch (e) {
        console.error("Kaydetme hatası (offline olabilir):", e);
      } finally {
        setSaving(false);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [activeNote?.content, activeNote?.id, supabase, session, notes]);

  const handleUpdateContent = (e) => {
    const newContent = e.target.value;
    const updatedNotes = notes.map(n => n.id === activeNoteId ? { ...n, content: newContent } : n);
    setNotes(updatedNotes);
    localStorage.setItem('local_notes', JSON.stringify(updatedNotes));
  };

  const addNewNote = async () => {
    const tempId = Date.now();
    const newNote = { id: tempId, user_id: session?.user?.id, content: '' };
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem('local_notes', JSON.stringify(updatedNotes));
    setActiveNoteId(tempId);

    if (supabase && session) {
      try {
        const { data } = await supabase.from('scratchpad').insert([{ user_id: session.user.id, content: '' }]).select();
        if (data && data[0]) {
          const finalNotes = updatedNotes.map(n => n.id === tempId ? data[0] : n);
          setNotes(finalNotes);
          localStorage.setItem('local_notes', JSON.stringify(finalNotes));
          setActiveNoteId(data[0].id);
        }
      } catch (e) {
        console.error("Not ekleme hatası:", e);
      }
    }
  };

  const deleteNote = async (id) => {
    if (!id || notes.length <= 1) return;
    
    const remainingNotes = notes.filter(n => n.id !== id);
    setNotes(remainingNotes);
    localStorage.setItem('local_notes', JSON.stringify(remainingNotes));
    
    if (activeNoteId === id) {
      setActiveNoteId(remainingNotes[0].id);
    }

    if (supabase && typeof id === 'string') {
      try {
        await supabase.from('scratchpad').delete().eq('id', id);
      } catch (e) {
        console.error("Silme hatası:", e);
      }
    }
  };

  const notepadAction = (
    <div className="flex items-center gap-2">
      {saving && <span className="text-[9px] text-emerald-500 animate-pulse">Kaydediliyor...</span>}
      <button 
        onClick={addNewNote}
        className="p-1 hover:bg-neutral-800 rounded text-neutral-500 hover:text-white transition-colors"
        title="Yeni Not"
      >
        <Plus size={12} />
      </button>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-1 hover:bg-neutral-800 rounded text-neutral-500 hover:text-white transition-colors"
        title={isExpanded ? "Küçült" : "Genişlet"}
      >
        <Maximize2 size={12} className={isExpanded ? "rotate-180" : ""} />
      </button>
    </div>
  );

  const NoteList = ({ horizontal = false }) => (
    <div className={`flex ${horizontal ? 'flex-row overflow-x-auto pb-2 gap-2 custom-scrollbar' : 'flex-col gap-1 pr-2 overflow-y-auto custom-scrollbar h-full'}`}>
      {notes.map(n => (
        <div key={n.id} className="relative group shrink-0">
          <button
            onClick={() => setActiveNoteId(n.id)}
            className={`text-left px-3 py-2 rounded text-[10px] transition-all border ${activeNoteId === n.id ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-neutral-800/40 border-neutral-800 text-neutral-500 hover:border-neutral-700'} ${horizontal ? 'w-32 truncate' : 'w-full truncate'}`}
          >
            {(n.content || "").split('\n')[0].substring(0, 20) || "Yeni Not..."}
          </button>
          {notes.length > 1 && (
            <button 
              onClick={(e) => { e.stopPropagation(); deleteNote(n.id); }}
              className="absolute top-1 right-1 p-0.5 bg-neutral-900 rounded-full text-rose-500 opacity-0 group-hover:opacity-100 hover:bg-rose-500 hover:text-white transition-all"
            >
              <X size={8} />
            </button>
          )}
        </div>
      ))}
    </div>
  );

  if (loading) return (
    <BentoCard title="Not Defteri" icon={BookOpen}>
      <div className="flex items-center justify-center h-full">
        <Loader2 size={16} className="animate-spin text-neutral-600" />
      </div>
    </BentoCard>
  );

  return (
    <>
      <BentoCard title="Not Defteri" icon={BookOpen} action={notepadAction} className={isExpanded ? "md:col-span-2 md:row-span-2" : ""}>
        <div className="flex flex-col h-full gap-3">
          <NoteList horizontal={!isExpanded} />
          <textarea
            value={activeNote?.content || ''}
            onChange={handleUpdateContent}
            placeholder="Notlarınızı buraya yazın..."
            className={`w-full flex-1 bg-transparent resize-none outline-none text-xs text-neutral-300 placeholder-neutral-700 font-sans leading-relaxed ${isExpanded ? 'min-h-[300px]' : 'min-h-[80px]'}`}
          />
        </div>
      </BentoCard>

      {isExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-6xl h-full max-h-[85vh] bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-neutral-800">
              <div className="flex items-center gap-2 text-neutral-400">
                <BookOpen size={16} className="text-emerald-500" />
                <h3 className="text-sm font-bold tracking-wider uppercase">Not Defteri (Gelişmiş)</h3>
              </div>
              <div className="flex items-center gap-4">
                {saving && <span className="text-[10px] text-emerald-500 animate-pulse font-medium">Otomatik kaydediliyor...</span>}
                <button onClick={addNewNote} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded border border-emerald-500/20 transition-all">
                  <Plus size={14} /> YENİ NOT
                </button>
                <button onClick={() => setIsExpanded(false)} className="p-2 hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition-all">
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar List */}
              <div className="w-64 border-r border-neutral-800 p-4 bg-neutral-950/20">
                <NoteList />
              </div>
              
              {/* Editor */}
              <div className="flex-1 flex flex-col p-6">
                <textarea
                  value={activeNote?.content || ''}
                  onChange={handleUpdateContent}
                  autoFocus
                  className="flex-1 bg-transparent resize-none outline-none text-sm text-neutral-200 placeholder-neutral-700 font-sans leading-relaxed"
                  placeholder="Uzun notlarınızı buraya yazmaya başlayın..."
                />
              </div>
            </div>
            
            <div className="p-3 border-t border-neutral-800 text-[10px] text-neutral-500 flex justify-between bg-neutral-950/20">
              <div className="flex gap-4">
                <span>{(activeNote?.content || "").length} karakter</span>
                <span>{(activeNote?.content || "").split(/\s+/).filter(Boolean).length} kelime</span>
              </div>
              <span>Değişiklikler otomatik olarak kaydedilir</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- DATA WIDGETS ---



const CryptoWidget = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,monero&vs_currencies=usd&include_24hr_change=true');
        if (!res.ok) throw new Error('coingecko failed');
        const data = await res.json();
        setPrices([
          { name: "BTC", val: data.bitcoin.usd, change: data.bitcoin.usd_24h_change },
          { name: "ETH", val: data.ethereum.usd, change: data.ethereum.usd_24h_change },
          { name: "XMR", val: data.monero.usd, change: data.monero.usd_24h_change }
        ]);
      } catch (e) {
        try {
          // Fallback to Binance for prices if Coingecko fails
          const symbols = ['BTCUSDT', 'ETHUSDT', 'XMRUSDT'];
          const priceResults = await Promise.all(symbols.map(s => 
            fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${s}`).then(r => r.json())
          ));
          
          setPrices(priceResults.map(p => ({
            name: p.symbol.replace('USDT', ''),
            val: parseFloat(p.lastPrice),
            change: parseFloat(p.priceChangePercent)
          })));
        } catch (e2) {
          setPrices([
            { name: "BTC", val: 64200, change: 2.4 },
            { name: "ETH", val: 3450, change: -1.2 },
            { name: "XMR", val: 165, change: 0.8 }
          ]);
        }
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
  const [location, setLocation] = useState("Yükleniyor...");

  useEffect(() => {
    const fetchWeather = async (lat, lon, cityName = null) => {
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`);
        const data = await res.json();
        setWeather({
          temp: data.current.temperature_2m,
          code: data.current.weather_code
        });
        if (cityName) setLocation(cityName);
      } catch (e) {
        console.error("Hava durumu hatası:", e);
        setWeather({ temp: 18, code: 0 });
      }
    };

    const getCityName = async (lat, lon) => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const data = await res.json();
        const city = data.address.city || data.address.town || data.address.village || data.address.suburb || "Konumun";
        return city;
      } catch (e) {
        return "Bilinmeyen";
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const cityName = await getCityName(latitude, longitude);
        fetchWeather(latitude, longitude, cityName);
      }, (error) => {
        console.warn("Konum erişimi reddedildi, varsayılan (Ankara) gösteriliyor.");
        fetchWeather(39.9334, 32.8597, "Ankara");
      });
    } else {
      fetchWeather(39.9334, 32.8597, "Ankara");
    }
  }, []);

  const getWeatherIcon = (code) => {
    if (code === 0) return "☀️";
    if (code < 3) return "☁️";
    if (code < 50) return "🌫️";
    if (code < 70) return "🌧️";
    if (code < 80) return "❄️";
    return "⛈️";
  };

  return (
    <BentoCard title="Hava Durumu" icon={Cloud}>
      <div className="flex items-center justify-between h-full">
        <div className="text-3xl">{weather ? getWeatherIcon(weather.code) : "..."}</div>
        <div className="text-right">
          <div className="text-2xl font-light text-white">{weather?.temp}°C</div>
          <div className="text-[10px] text-neutral-500">{location !== "Yükleniyor..." ? location : "Şu an"}</div>
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

const CalendarWidget = ({ supabase, session }) => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEventText, setNewEventText] = useState("");
  
  useEffect(() => {
    if (supabase && session) {
      fetchEvents();
    }
  }, [date, session]);

  const fetchEvents = async () => {
    try {
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59).toISOString();
      
      const { data, error } = await supabase
        .from('calendar_events')
        .select('*')
        .gte('event_date', startOfMonth)
        .lte('event_date', endOfMonth)
        .eq('user_id', session.user.id);
      
      if (error) {
        console.error("Etkinlik getirme hatası:", error);
        return;
      }
      if (data) setEvents(data);
    } catch (err) {
      console.error("Takvim verisi çekilemedi:", err);
    }
  };

  const addEvent = async (e) => {
    e.preventDefault();
    if (!newEventText.trim() || !selectedDay) return;

    const eventDate = new Date(date.getFullYear(), date.getMonth(), selectedDay, 12, 0, 0).toISOString();
    const tempId = Date.now();
    const newEventTextConst = newEventText.trim();

    // Optimistik güncelleme - Kullanıcıya anında geri bildirim ver
    const optimisticEvent = {
      id: tempId,
      user_id: session?.user?.id,
      event_text: newEventTextConst,
      event_date: eventDate,
      isOptimistic: true
    };

    setEvents(prev => [...prev, optimisticEvent]);
    setNewEventText("");
    
    if (!supabase || !session) {
      console.error("Supabase veya oturum bulunamadı");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .insert([{
          user_id: session.user.id,
          event_text: newEventTextConst,
          event_date: eventDate
        }])
        .select();
      
      if (error) {
        console.error("Etkinlik ekleme hatası:", error);
        // Hata durumunda optimistik veriyi kaldır
        setEvents(prev => prev.filter(e => e.id !== tempId));
        alert("Etkinlik eklenemedi: " + error.message);
      } else if (data && data[0]) {
        // Geçici ID'yi gerçek ID ile değiştir
        setEvents(prev => prev.map(e => e.id === tempId ? data[0] : e));
      }
    } catch (err) {
      console.error("Beklenmedik hata:", err);
      setEvents(prev => prev.filter(e => e.id !== tempId));
    }
  };

  const deleteEvent = async (id) => {
    const { error } = await supabase.from('calendar_events').delete().eq('id', id);
    if (!error) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
  
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date().getDate();
  const isCurrentMonth = new Date().getMonth() === month && new Date().getFullYear() === year;

  const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const dayNames = ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"];

  const days = [];
  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-6 w-full"></div>);
  }

  for (let i = 1; i <= totalDays; i++) {
    const isToday = isCurrentMonth && i === today;
    const hasEvent = events.some(e => new Date(e.event_date).getDate() === i);
    const isSelected = selectedDay === i;

    days.push(
      <button 
        key={i} 
        onClick={() => {
          setSelectedDay(i);
          setShowEventForm(true);
        }}
        className={`h-6 w-full flex flex-col items-center justify-center text-[10px] rounded-md transition-all relative
          ${isToday ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30' : 'text-neutral-400 hover:bg-neutral-800'}
          ${isSelected ? 'border border-neutral-600 bg-neutral-800' : ''}`}
      >
        {i}
        {hasEvent && <span className="absolute bottom-0.5 w-1 h-1 bg-emerald-500 rounded-full"></span>}
      </button>
    );
  }

  return (
    <BentoCard title="Takvim" icon={CalendarDays}>
      <div className="flex flex-col h-full relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider">
            {monthNames[month]} {year}
          </span>
          <div className="flex gap-1">
            <button onClick={() => setDate(new Date(year, month - 1))} className="p-1 hover:bg-neutral-800 rounded transition-colors text-neutral-500 hover:text-white">
              <ChevronLeft size={10} />
            </button>
            <button onClick={() => setDate(new Date(year, month + 1))} className="p-1 hover:bg-neutral-800 rounded transition-colors text-neutral-500 hover:text-white">
              <ChevronRight size={10} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-y-1 text-center mb-1">
          {dayNames.map(day => (
            <div key={day} className="text-[9px] font-bold text-neutral-600 uppercase">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1">
          {days}
        </div>

        {showEventForm && selectedDay && (
          <div className="absolute inset-0 bg-neutral-950/95 z-10 flex flex-col p-2 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-white">{selectedDay} {monthNames[month]} Etkinlikleri</span>
              <button onClick={() => setShowEventForm(false)} className="text-neutral-500 hover:text-white"><X size={12} /></button>
            </div>
            
              <div className="flex-1 overflow-y-auto mb-2 space-y-1 custom-scrollbar">
                {events.filter(e => new Date(e.event_date).getDate() === selectedDay).length === 0 ? (
                  <div className="text-[10px] text-neutral-600 text-center py-4">Etkinlik yok</div>
                ) : (
                  events.filter(e => new Date(e.event_date).getDate() === selectedDay).map(event => (
                    <div key={event.id} className={`flex items-center justify-between p-1.5 bg-neutral-900 border border-neutral-800 rounded group ${event.isOptimistic ? 'opacity-50' : ''}`}>
                      <span className="text-[10px] text-neutral-300 truncate mr-2">{event.event_text}</span>
                      {!event.isOptimistic && (
                        <button onClick={() => deleteEvent(event.id)} className="text-neutral-600 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all">
                          <Trash2 size={10} />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>

            <form onSubmit={addEvent} className="mt-auto flex gap-1">
              <input 
                type="text" 
                value={newEventText}
                onChange={(e) => setNewEventText(e.target.value)}
                placeholder="Yeni etkinlik..."
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-[10px] text-white focus:outline-none focus:border-emerald-500/50"
              />
              <button type="submit" className="p-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded transition-colors">
                <Plus size={12} />
              </button>
            </form>
          </div>
        )}
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
    },
    mullvad: {
      title: "Mullvad",
      icon: EyeOff,
      apps: [
        { name: "VPN", icon: Shield, url: "https://mullvad.net/vpn" },
        { name: "Browser", icon: Globe, url: "https://mullvad.net/browser" },
        { name: "Check", icon: Activity, url: "https://mullvad.net/check" },
        { name: "DNS", icon: Layers, url: "https://mullvad.net/dns" },
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
      <button onClick={() => setSelected('mullvad')} className="flex items-center justify-between p-3 rounded bg-neutral-800/40 border border-neutral-800 hover:border-orange-500/30 hover:bg-neutral-800 transition-all group text-left">
        <div className="flex items-center gap-2">
          <EyeOff size={14} className="text-neutral-500 group-hover:text-orange-500" />
          <span className="text-xs font-bold text-neutral-400 group-hover:text-white">Mullvad</span>
        </div>
        <ChevronRight size={12} className="text-neutral-600"/>
      </button>
    </div>
  );
};

const WelcomePopup = ({ forceOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: "1. Teknik Yetkinlik",
      subtitle: "\"Kod Hademeliği\" ve Denetim",
      content: [
        "AI Optimizasyonu: AI'ın ürettiği spagetti kodları temizlemeyi ve mimariye oturtmayı becerin haline getir.",
        "FinOps Bilinci: Yazdığın her fonksiyonun bulut maliyetini hesapla; maliyet bilmeyen yazılımcı devri bitti.",
        "Hibrit Altyapı: Kendi sunucun (on-premise) ve Linux bilgisini derinleştirerek hibrit sistemlere hakim ol."
      ],
      icon: <Terminal className="text-emerald-500" size={32} />
    },
    {
      title: "2. Kariyer",
      subtitle: "Tek Kişilik Dev Kadro (Solopreneurship)",
      content: [
        "Üretim Gücü: AI araçlarını kaldıraç olarak kullanarak tek başına 100 kişilik iş üreten bir deve dönüş.",
        "Portfolyo > Diploma: Gerçek dünyadaki sorunları çözen somut projelerini ve GitHub portfolyonu konuştur.",
        "Kullan-At Uygulamalar: Tek bir işi yapan ve işi bitince yok olan mikro servislere odaklan."
      ],
      icon: <Users className="text-blue-500" size={32} />
    },
    {
      title: "3. Güvenlik ve Gizlilik",
      subtitle: "Siber Güvenlik 2.0",
      content: [
        "Zero Trust (Sıfır Güven): Hayatın her alanında doğrulanmamış hiçbir veriye veya sese güvenme.",
        "Linux'a Geçiş: Mahremiyet endişeleri nedeniyle Linux'u ana işletim sistemin yap.",
        "Kuantum Hazırlığı: Gelecekteki 'Harvest Now, Decrypt Later' riskine karşı güvenlik standartlarını takip et."
      ],
      icon: <ShieldCheck className="text-rose-500" size={32} />
    }
  ];

  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
      setCurrentPage(0);
      return;
    }
    const hasSeenPopup = localStorage.getItem('hasSeenWelcomePopupV2');
    if (!hasSeenPopup) {
      setIsOpen(true);
    }
  }, [forceOpen]);

  const handleClose = () => {
    localStorage.setItem('hasSeenWelcomePopupV2', 'true');
    setIsOpen(false);
    if (onClose) onClose();
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-500">
      <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div className="relative p-8 md:p-10 flex flex-col items-center text-center">
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 text-neutral-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="mb-6 p-5 bg-neutral-800/50 rounded-2xl shadow-inner">
            {pages[currentPage].icon}
          </div>

          <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-[0.2em] mb-2">
            {pages[currentPage].title}
          </h2>
          
          <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">
            {pages[currentPage].subtitle}
          </h3>

          <div className="space-y-4 mb-10 w-full">
            {pages[currentPage].content.map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-left bg-neutral-950/30 p-4 rounded-xl border border-neutral-800/50">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between w-full mt-auto pt-4 border-t border-neutral-800/50">
            <div className="flex gap-1.5">
              {pages.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 rounded-full transition-all duration-500 ${i === currentPage ? 'w-8 bg-emerald-500' : 'w-2 bg-neutral-800'}`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              {currentPage > 0 && (
                <button 
                  onClick={prevPage}
                  className="px-4 py-2 text-neutral-400 hover:text-white text-sm font-bold transition-colors"
                >
                  Geri
                </button>
              )}
              <button 
                onClick={nextPage}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/20 active:scale-95 text-sm"
              >
                {currentPage === pages.length - 1 ? "Anladım, Başlayalım" : "Sonraki"}
              </button>
            </div>
          </div>
        </div>
      </div>
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
  const [showWelcome, setShowWelcome] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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
        leetcode: (lcJson && lcJson.status === 'success') ? { 
          solved: lcJson.totalSolved, 
          easy: lcJson.easySolved,
          medium: lcJson.mediumSolved,
          hard: lcJson.hardSolved 
        } : null
      });
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };
  
  useEffect(() => {
    fetchData();
    document.title = "Dashboard - Cuma Karadash";
  }, []);

  const handleLogout = async () => { if (supabase) await supabase.auth.signOut(); };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans p-6 md:p-12">
      <WelcomePopup forceOpen={showWelcome} onClose={() => setShowWelcome(false)} />
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
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-widest uppercase transition-all ${isOnline ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            {isOnline ? 'Online' : 'Offline'}
          </div>
          <button 
            onClick={() => setShowWelcome(true)}
            className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-emerald-500 hover:text-emerald-500 transition-all text-neutral-400"
            title="Hoş Geldin Mesajını Aç"
          >
            <ShieldCheck size={16} />
          </button>
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
        <WeatherWidget />
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
        <NotepadWidget supabase={supabase} session={session} />
        
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
              <div className="text-right flex flex-col gap-0.5">
                 <div className="text-[10px] text-emerald-500 font-medium">Kolay: {data.leetcode?.easy || 0}</div>
                 <div className="text-[10px] text-amber-500 font-medium">Orta: {data.leetcode?.medium || 0}</div>
                 <div className="text-[10px] text-rose-500 font-medium">Zor: {data.leetcode?.hard || 0}</div>
              </div>
          </div>
        </BentoCard>

        <DailyTipWidget />
        <CalendarWidget supabase={supabase} session={session} />
        <CryptoWidget />
        <MusicWidget />
      </div>
      
      <footer className="max-w-7xl mx-auto mt-12 pt-6 border-t border-neutral-900 flex justify-between items-center text-[10px] text-neutral-600">
          <p>v0.3 &bull; React Dashboard</p>
          <div className="flex gap-4"><span>Priv</span><span>Term</span></div>
      </footer>
    </div>
  );
}
