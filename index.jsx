import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Users, FileText, Award, LogOut, 
  Plus, Edit2, Trash2, ChevronRight, User, 
  Book, CheckCircle, AlertCircle, Layout, X, Save,
  Search, Bell, TrendingUp, ShieldCheck, Key, Printer, 
  FileDown, Download, MessageSquare, Send, Calendar,
  Library, ShoppingBag, DownloadCloud, Wallet, Receipt, Menu, Banknote,
  Youtube, Paperclip, Eye, CheckCircle2, Clock, ExternalLink
} from 'lucide-react';

// --- KOMPONEN LOGO (Menggunakan File Gambar yang Diunggah) ---
const Logo = ({ className = "w-12 h-12" }) => (
  <img 
    src="Logo-Mafatihul-Arabiyyah.png" 
    alt="Logo Mafatihul Arabiyyah" 
    className={`object-contain rounded-2xl ${className}`}
    onError={(e) => {
      // Fallback jika gambar gagal dimuat
      e.target.onerror = null;
      e.target.style.display = 'none';
    }}
  />
);

// --- DATA AWAL (MOCKUP) ---
const initialUsers = [
  { id: 1, username: 'admin', name: 'Admin Pusat', role: 'admin', password: 'password' },
  { id: 2, username: 'ustadz.ahmad', name: 'Ustadz Ahmad Fauzi', role: 'guru', password: 'password', teacherId: 'GR0001', specialization: 'Ilmu Tafsir', email: 'ahmad.fauzi@email.com', phone: '081122334455', joinYear: 2020, baseSalary: 3500000 },
  { id: 3, username: 'ustadzah.siti', name: 'Ustadzah Siti Aminah', role: 'guru', password: 'password', teacherId: 'GR0002', specialization: 'Nahwu & Sharaf', email: 'siti.aminah@email.com', phone: '085566778899', joinYear: 2022, baseSalary: 3000000 },
  { id: 4, username: 'santri.budi', name: 'Budi Darmawan', role: 'santri', password: 'password', studentId: 'MA0001', admissionYear: 2024, age: 15, email: 'budi.darmawan@email.com', phone: '081234567890' },
  { id: 5, username: 'santri.aisyah', name: 'Aisyah Putri', role: 'santri', password: 'password', studentId: 'MA0002', admissionYear: 2025, age: 14, email: 'aisyah.putri@email.com', phone: '089876543210' },
];

const initialClasses = [
  { id: 101, name: 'Tafsir Jalalain', guruId: 2, description: 'Kajian mendalam kitab Tafsir Jalalain Juz 1-5' },
  { id: 102, name: 'Nahwu Sharaf Dasar', guruId: 3, description: 'Pembelajaran kaidah bahasa Arab Kitab Al-Ajurumiyyah' },
];

const initialEnrollments = [
  { id: 1, classId: 101, santriId: 4, status: 'aktif' },
  { id: 2, classId: 102, santriId: 4, status: 'aktif' },
  { id: 3, classId: 101, santriId: 5, status: 'aktif' },
];

const initialMaterials = [
  { id: 1, classId: 101, title: 'Muqaddimah Tafsir', content: 'Pembahasan mengenai pentingnya mempelajari ilmu tafsir sebelum masuk ke ayat-ayat Al-Quran...', youtubeLink: 'https://youtube.com', attachmentLink: '', viewedBy: [4] },
  { id: 2, classId: 102, title: 'Bab Kalam', content: 'Kalam adalah lafadz yang tersusun, memberikan faedah, dan menggunakan bahasa Arab.', youtubeLink: '', attachmentLink: 'https://drive.google.com', viewedBy: [] },
];

const initialExams = [
  { id: 501, classId: 101, title: 'Imtihan Syahriyah', description: 'Ujian bulanan mencakup pemahaman Bab 1 sampai 3. Pastikan membaca materi sebelum mengerjakan.', dueDate: '2026-04-10', duration: 90, link: 'https://forms.google.com' },
  { id: 502, classId: 102, title: 'Tugas Isim dan Fiil', description: 'Kerjakan soal latihan interaktif pada link berikut.', dueDate: '2026-04-12', duration: 45, link: 'https://quizizz.com' },
];

const initialGrades = [
  { id: 1, examId: 501, santriId: 4, score: 92 },
  { id: 2, examId: 502, santriId: 4, score: 78 },
  { id: 3, examId: 501, santriId: 5, score: 85 },
];

const initialAnnouncements = [
  { id: 1, title: 'Libur Idul Fitri', content: 'Pembelajaran daring akan diliburkan mulai tanggal 25 Maret hingga 5 April 2026.', date: '2026-03-20', author: 'Admin Pusat' },
  { id: 2, title: 'Pendaftaran Re-Tahfidz', content: 'Bagi santri yang ingin memperbaiki setoran hafalan, silakan mendaftar di menu pendaftaran.', date: '2026-03-18', author: 'Ustadz Ahmad' },
];

const initialForum = [
  { 
    id: 1, 
    userId: 4, 
    title: 'Tanya Isim Jamak', 
    content: 'Apa perbedaan mendasar antara Jamak Mudzakkar Salim dan Jamak Taksir?', 
    date: '2026-03-21', 
    replies: [
      { id: 101, userId: 2, name: 'Ustadz Ahmad', content: 'Jamak Mudzakkar Salim memiliki pola beraturan (akhiran una/ina), sedangkan Jamak Taksir tidak beraturan.', date: '2026-03-21' }
    ]
  }
];

const initialBooks = [
  { id: 1, title: 'Matan Al-Ajurumiyyah', description: 'Buku panduan dasar ilmu nahwu format digital untuk santri.', type: 'pdf', price: 0, link: '#' },
  { id: 2, title: 'Tafsir Jalalain Jilid 1', description: 'Buku fisik cetakan tebal tepercaya kualitas premium.', type: 'physical', price: 125000, link: 'https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20ingin%20membeli%20Tafsir%20Jalalain' },
  { id: 3, title: 'Kamus Al-Munawwir Premium', description: 'Kamus digital PDF berlisensi resmi lengkap dengan navigasi interaktif. PDF ini berbayar.', type: 'pdf', price: 50000, link: 'https://wa.me/6281234567890?text=Beli%20Kamus%20PDF' },
];

const initialPayments = [
  { id: 1, santriId: 4, month: 0, year: 2026, amount: 150000, date: '5 Januari 2026', status: 'lunas' },
  { id: 2, santriId: 4, month: 1, year: 2026, amount: 150000, date: '6 Februari 2026', status: 'lunas' },
  { id: 3, santriId: 5, month: 0, year: 2026, amount: 150000, date: '10 Januari 2026', status: 'lunas' },
];

const initialSalaries = [
  { id: 1, guruId: 2, month: 0, year: 2026, amount: 3500000, date: '25 Januari 2026', status: 'dibayar' },
  { id: 2, guruId: 3, month: 0, year: 2026, amount: 3000000, date: '25 Januari 2026', status: 'dibayar' },
];

// --- SUB-KOMPONEN UI ---

const ActionModal = ({ config, onClose }) => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (config && config.defaultValue !== undefined) {
            setInputValue(config.defaultValue);
        } else {
            setInputValue('');
        }
    }, [config]);

    if (!config) return null;

    const handleConfirm = () => {
        if (config.type === 'prompt') {
            config.onConfirm(inputValue);
        } else {
            config.onConfirm();
        }
    };

    return (
        <div className="fixed inset-0 z-[300] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white p-6 rounded-[2rem] max-w-sm w-full space-y-4 shadow-2xl animate-in zoom-in-95">
                <h3 className={`font-black text-lg ${config.type === 'alert' ? 'text-rose-600' : 'text-slate-900'}`}>{config.title}</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">{config.message}</p>
                
                {config.type === 'prompt' && (
                    <div className="mt-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2 mb-1 block">Nominal (Rp)</label>
                        <input
                            type="number"
                            className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 font-black text-lg text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/10"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            autoFocus
                        />
                    </div>
                )}

                <div className="flex gap-2 pt-2">
                    <button onClick={handleConfirm} className={`flex-1 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-colors ${config.type === 'alert' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-blue-900 hover:bg-blue-800'}`}>
                        {config.type === 'alert' ? 'Mengerti' : 'Lanjutkan'}
                    </button>
                    {(config.type === 'confirm' || config.type === 'prompt') && (
                        <button onClick={onClose} className="flex-1 bg-slate-100 text-slate-500 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-colors">Batal</button>
                    )}
                </div>
            </div>
        </div>
    );
};

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-white flex w-full font-sans selection:bg-blue-200">
      {/* Panel Kiri - Branding (Hanya tampil di Desktop) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-900 via-blue-950 to-emerald-950 relative items-center justify-center p-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent"></div>
        
        <div className="relative z-10 text-white max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-1000 flex flex-col items-start">
           <Logo className="w-48 h-48 mb-10" />
           <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight">
             Membangun Generasi <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Rabbani</span>
           </h1>
           <p className="text-blue-100/80 text-lg font-medium leading-relaxed max-w-md">
             Sistem Manajemen Pembelajaran terpadu Pesantren Modern Mafatihul Arabiyyah. Akses materi, ujian, dan rapor secara langsung dalam satu portal digital.
           </p>
        </div>
      </div>

      {/* Panel Kanan - Form Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-slate-50 lg:bg-white">
        <div className="w-full max-w-md space-y-8 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-150">
           
           <div className="text-center lg:text-left">
              <div className="lg:hidden flex justify-center mb-8">
                <Logo className="w-32 h-32" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Selamat Datang</h2>
              <p className="text-slate-500 mt-2 font-medium">Silakan masuk menggunakan kredensial Anda.</p>
           </div>

           <form onSubmit={(e) => { e.preventDefault(); onLogin(username, password); }} className="space-y-5 mt-8">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Username / ID</label>
                 <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18}/>
                    <input 
                        type="text" 
                        className="w-full pl-12 pr-5 py-4 bg-white lg:bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-800 shadow-sm" 
                        placeholder="Masukkan username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                 </div>
              </div>
              
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                 <div className="relative group">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18}/>
                    <input 
                        type="password" 
                        className="w-full pl-12 pr-5 py-4 bg-white lg:bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-800 shadow-sm" 
                        placeholder="••••••••" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                 </div>
              </div>

              <div className="pt-2 space-y-3">
                  <button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-900/20 transition-all hover:-translate-y-1 mt-2 text-sm">
                     Masuk ke Portal
                  </button>
                  
                  <a href="https://wa.me/6288224247118?text=Assalamu'alaikum%20Admin,%20saya%20ingin%20mendaftar%20akun%20atau%20meminta%20bantuan%20terkait%20LMS%20Mafatihul%20Arabiyyah." target="_blank" rel="noreferrer" className="w-full flex justify-center items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-black py-4 rounded-2xl shadow-sm transition-all border border-emerald-200 hover:-translate-y-1 text-sm">
                     <MessageSquare size={18} /> Daftar / Bantuan via WA
                  </a>
              </div>
           </form>

           <div className="mt-12 pt-8 border-t border-slate-200 text-center">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Pintasan Akses Cepat (Mode Demo)</p>
              <div className="grid grid-cols-3 gap-3">
                 <button onClick={() => onLogin('admin', 'password')} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white lg:bg-slate-50 border border-slate-200 hover:bg-blue-50 hover:border-blue-200 transition-all hover:-translate-y-1 group shadow-sm">
                    <ShieldCheck size={20} className="text-slate-400 group-hover:text-blue-600 mb-2 transition-colors"/>
                    <span className="text-[9px] font-black text-slate-500 group-hover:text-blue-700">ADMIN</span>
                 </button>
                 <button onClick={() => onLogin('ustadz.ahmad', 'password')} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white lg:bg-slate-50 border border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 transition-all hover:-translate-y-1 group shadow-sm">
                    <BookOpen size={20} className="text-slate-400 group-hover:text-emerald-600 mb-2 transition-colors"/>
                    <span className="text-[9px] font-black text-slate-500 group-hover:text-emerald-700">USTADZ</span>
                 </button>
                 <button onClick={() => onLogin('santri.budi', 'password')} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white lg:bg-slate-50 border border-slate-200 hover:bg-amber-50 hover:border-amber-200 transition-all hover:-translate-y-1 group shadow-sm">
                    <Users size={20} className="text-slate-400 group-hover:text-amber-600 mb-2 transition-colors"/>
                    <span className="text-[9px] font-black text-slate-500 group-hover:text-amber-700">SANTRI</span>
                 </button>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

const SidebarLink = ({ icon: Icon, label, active, onClick }) => {
  return (
    <button onClick={onClick} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 ${active ? 'bg-blue-50 text-blue-900 shadow-sm border border-blue-100/50' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
      <div className={`${active ? 'text-blue-600' : 'text-slate-400'}`}>
        {Icon && <Icon size={18} />}
      </div>
      <span className="font-bold text-sm tracking-tight">{label}</span>
    </button>
  );
};

const Dashboard = ({ user, classes, enrollments, users, announcements, setActiveTab }) => {
  const stats = user.role === 'admin' ? [
    { label: 'Total Santri', value: users.filter(u => u.role === 'santri').length, color: 'from-blue-800 to-blue-900' },
    { label: 'Total Ustadz', value: users.filter(u => u.role === 'guru').length, color: 'from-blue-700 to-blue-800' },
    { label: 'Kelas Aktif', value: classes.length, color: 'from-blue-600 to-blue-700' },
  ] : [
    { label: 'Kelas Saya', value: user.role === 'guru' ? classes.filter(c => c.guruId === user.id).length : enrollments.filter(e => e.santriId === user.id).length, color: 'from-blue-800 to-blue-900' },
    { label: 'Materi Aktif', value: '12', color: 'from-blue-700 to-blue-800' },
    { label: 'Pencapaian', value: 'A+', color: 'from-blue-600 to-blue-700' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Marhaban, {user.name}!</h2>
          <p className="text-slate-500 font-medium mt-1">LMS Pesantren Modern Mafatihul Arabiyyah.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-6 py-3 rounded-2xl border border-emerald-100">
           <ShieldCheck size={18}/>
           <span className="text-xs font-black uppercase tracking-widest">Sistem Terverifikasi</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-gradient-to-br ${stat.color} p-8 rounded-[2.5rem] text-white shadow-xl shadow-slate-200 relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer`}>
            <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
            <p className="text-5xl font-black mt-3 tracking-tighter">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm h-fit">
           <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
              <Bell size={20} className="text-blue-900"/> Pengumuman Terbaru
           </h3>
           <div className="space-y-4">
              {announcements.slice(0, 3).map(a => (
                <div key={a.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                   <p className="text-[9px] font-black text-blue-900 uppercase mb-1">{a.date}</p>
                   <h4 className="font-bold text-slate-800 text-sm mb-1">{a.title}</h4>
                   <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{a.content}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Shortcuts for Mobile/Desktop */}
        <div className="flex flex-col gap-6">
           <div className="bg-gradient-to-br from-emerald-800 to-emerald-600 p-8 rounded-[3rem] text-white relative overflow-hidden flex flex-col items-center justify-center text-center shadow-xl shadow-emerald-900/10 hover:scale-[1.02] transition-all cursor-pointer" onClick={() => setActiveTab('library')}>
              <Library size={36} className="mb-4 opacity-90"/>
              <h4 className="text-xl font-black tracking-tight mb-1 uppercase">Maktabah</h4>
              <p className="text-[10px] text-white/80 font-medium">Pusat kitab PDF & Buku cetak</p>
           </div>
           
           {(user.role === 'admin' || user.role === 'santri') && (
               <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-8 rounded-[3rem] text-white relative overflow-hidden flex flex-col items-center justify-center text-center shadow-xl shadow-blue-900/10 hover:scale-[1.02] transition-all cursor-pointer" onClick={() => setActiveTab('spp')}>
                  <Wallet size={36} className="mb-4 opacity-90"/>
                  <h4 className="text-xl font-black tracking-tight mb-1 uppercase">{user.role === 'admin' ? 'Keuangan SPP' : 'Status SPP'}</h4>
                  <p className="text-[10px] text-white/80 font-medium">Pembayaran Syahriyah bulanan</p>
               </div>
           )}
        </div>
      </div>
    </div>
  );
};

const AnnouncementsModule = ({ user, announcements, setAnnouncements }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ title: '', content: '' });

  const handleSave = () => {
    if (!form.title || !form.content) return;
    setAnnouncements([{ ...form, id: Date.now(), date: new Date().toISOString().split('T')[0], author: user.name }, ...announcements]);
    setIsAdding(false);
    setForm({ title: '', content: '' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Pengumuman</h2>
          <p className="text-slate-400 text-xs font-medium">Informasi dan berita terbaru.</p>
        </div>
        {user.role === 'admin' && (
          <button onClick={() => setIsAdding(true)} className="bg-blue-900 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform">
            <Plus size={16}/> Buat Baru
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-[2.5rem] border-2 border-blue-50 shadow-xl space-y-4 animate-in zoom-in-95">
          <input className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-blue-500/10" placeholder="Judul Pengumuman" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          <textarea className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 font-medium h-32 outline-none focus:ring-2 focus:ring-blue-500/10" placeholder="Isi pengumuman..." value={form.content} onChange={e => setForm({...form, content: e.target.value})} />
          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} className="flex-1 bg-blue-900 text-white p-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-800 transition-colors">Simpan</button>
            <button onClick={() => setIsAdding(false)} className="bg-slate-100 text-slate-400 px-8 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-colors">Batal</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {announcements.map(a => (
          <div key={a.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative group hover:shadow-md transition-shadow">
            {user.role === 'admin' && (
              <button onClick={() => setAnnouncements(announcements.filter(x => x.id !== a.id))} className="absolute top-8 right-8 text-slate-300 hover:text-rose-500 transition-colors bg-slate-50 p-2 rounded-xl">
                <Trash2 size={16}/>
              </button>
            )}
            <div className="flex gap-4 items-center mb-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center">
                <Bell size={20}/>
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-900">{a.title}</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{a.date} • {a.author}</p>
              </div>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed">{a.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const PayrollModule = ({ user, users, salaries, setSalaries, showConfirm, showPrompt }) => {
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const currentYear = 2026;
    const [selectedGuruId, setSelectedGuruId] = useState(null);
    const [search, setSearch] = useState('');

    const gurus = users.filter(u => u.role === 'guru' && u.name.toLowerCase().includes(search.toLowerCase()));

    const handlePay = (guruId, monthIdx, baseAmount) => {
        showPrompt(`Masukkan nominal gaji/mukafah untuk bulan ${months[monthIdx]} ${currentYear}:`, baseAmount, (val) => {
            const amount = parseInt(val) || 0;
            const newSalaries = salaries.filter(s => !(s.guruId === guruId && s.month === monthIdx && s.year === currentYear));
            setSalaries([...newSalaries, {
                id: Date.now(), guruId, month: monthIdx, year: currentYear, amount: amount,
                date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
                status: 'dibayar'
            }]);
        });
    };

    const handleCancelPay = (salaryId) => {
        showConfirm("Hapus atau batalkan data pembayaran gaji ini?", () => {
            setSalaries(salaries.filter(s => s.id !== salaryId));
        });
    };

    if (!selectedGuruId) {
        return (
            <div className="space-y-8 animate-in fade-in duration-500 pb-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Penggajian Guru</h2>
                        <p className="text-slate-400 text-xs font-medium">Manajemen pembayaran gaji atau mukafah Ustadz/Ustadzah.</p>
                    </div>
                    <div className="relative w-full md:w-auto">
                        <input className="w-full md:w-64 bg-white border border-slate-100 pl-10 pr-4 py-3 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/10 shadow-sm" placeholder="Cari Ustadz..." value={search} onChange={e => setSearch(e.target.value)}/>
                        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"/>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gurus.map(g => {
                        const paidCount = salaries.filter(s => s.guruId === g.id && s.year === currentYear && s.status === 'dibayar').length;
                        
                        return (
                            <div key={g.id} onClick={() => setSelectedGuruId(g.id)} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex items-center gap-4">
                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                    <Banknote size={24}/>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-black text-slate-900 leading-tight">{g.name}</h4>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Gaji Terbayar: {paidCount}/12 Bulan</p>
                                </div>
                                <ChevronRight size={16} className="text-slate-300"/>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }

    const targetGuru = users.find(u => u.id === selectedGuruId);
    if (!targetGuru) return null;
    const baseSalary = targetGuru.baseSalary || 3000000;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <button onClick={() => setSelectedGuruId(null)} className="text-slate-400 font-bold flex items-center gap-2 hover:text-emerald-700 transition-colors"><ChevronRight size={18} className="rotate-180" /> Kembali ke Daftar Guru</button>
            
            <div className="bg-gradient-to-tr from-emerald-800 to-emerald-600 p-8 rounded-[3rem] text-white shadow-xl flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/20 shrink-0">
                    <Banknote size={32}/>
                </div>
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-black tracking-tight">{targetGuru.name}</h2>
                    <p className="text-white/70 text-sm font-medium mt-1">Status Penggajian Tahun {currentYear}</p>
                </div>
                <div className="md:ml-auto w-full md:w-auto bg-white/10 px-6 py-4 rounded-2xl border border-white/20 backdrop-blur-sm text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-1">Gaji Pokok / Bulan</p>
                    <p className="text-xl font-black">Rp {baseSalary.toLocaleString('id-ID')}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {months.map((monthName, idx) => {
                    const salary = salaries.find(s => s.guruId === targetGuru.id && s.year === currentYear && s.month === idx);

                    return (
                        <div key={idx} className={`p-6 rounded-[2.5rem] border ${salary?.status === 'dibayar' ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-slate-100'} shadow-sm flex flex-col justify-between group`}>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h4 className={`font-black text-lg ${salary?.status === 'dibayar' ? 'text-emerald-900' : 'text-slate-700'}`}>{monthName}</h4>
                                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${salary?.status === 'dibayar' ? 'text-emerald-600/70' : 'text-slate-400'}`}>{currentYear}</p>
                                </div>
                                {salary?.status === 'dibayar' ? (
                                    <div className="bg-emerald-200 text-emerald-800 p-2 rounded-xl shadow-inner"><CheckCircle size={18}/></div>
                                ) : (
                                    <div className="bg-slate-100 text-slate-400 p-2 rounded-xl"><AlertCircle size={18}/></div>
                                )}
                            </div>
                            
                            {salary?.status === 'dibayar' ? (
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="inline-block text-[10px] font-black uppercase tracking-widest text-emerald-600 px-3 py-1.5 bg-emerald-100 rounded-xl">TELAH DIBAYAR</div>
                                        <button onClick={() => handleCancelPay(salary.id)} className="text-slate-400 hover:text-rose-500 transition-colors p-1" title="Batalkan Pembayaran"><Trash2 size={14}/></button>
                                    </div>
                                    <p className="text-lg font-black text-slate-800 tracking-tight mb-1">Rp {salary.amount.toLocaleString('id-ID')}</p>
                                    <p className="text-[10px] font-bold text-emerald-700/70 uppercase tracking-widest flex items-center gap-1.5">
                                        <Calendar size={12}/> {salary.date}
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <div className="inline-block text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl mb-4">BELUM DIBAYAR</div>
                                    <button onClick={() => handlePay(targetGuru.id, idx, baseSalary)} className="w-full bg-emerald-600 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20">Bayar Gaji</button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const SPPModule = ({ user, users, payments, setPayments, showConfirm, showPrompt }) => {
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const currentYear = 2026;
    const [selectedSantriId, setSelectedSantriId] = useState(user.role === 'santri' ? user.id : null);
    const [search, setSearch] = useState('');

    const santris = users.filter(u => u.role === 'santri' && u.name.toLowerCase().includes(search.toLowerCase()));

    const handlePay = (santriId, monthIdx) => {
        showPrompt(`Masukkan nominal pembayaran SPP bulan ${months[monthIdx]} ${currentYear}:`, 150000, (val) => {
            const amount = parseInt(val) || 0;
            const newPayments = payments.filter(p => !(p.santriId === santriId && p.month === monthIdx && p.year === currentYear));
            setPayments([...newPayments, {
                id: Date.now(), santriId, month: monthIdx, year: currentYear, amount: amount,
                date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
                status: 'lunas'
            }]);
        });
    };

    const handleSantriPay = (santriId, monthIdx) => {
        showPrompt(`Masukkan nominal SPP bulan ${months[monthIdx]} yang telah Anda transfer:`, 150000, (val) => {
            const amount = parseInt(val) || 0;
            setPayments([...payments, {
                id: Date.now(), santriId, month: monthIdx, year: currentYear, amount: amount,
                date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
                status: 'pending'
            }]);
        });
    };

    const handleCancelPay = (paymentId) => {
        showConfirm("Hapus atau batalkan data pembayaran ini?", () => {
            setPayments(payments.filter(p => p.id !== paymentId));
        });
    };

    if (user.role === 'admin' && !selectedSantriId) {
        return (
            <div className="space-y-8 animate-in fade-in duration-500 pb-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Administrasi SPP</h2>
                        <p className="text-slate-400 text-xs font-medium">Kelola pembayaran uang syahriyah (SPP) santri.</p>
                    </div>
                    <div className="relative w-full md:w-auto">
                        <input className="w-full md:w-64 bg-white border border-slate-100 pl-10 pr-4 py-3 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/10 shadow-sm" placeholder="Cari santri..." value={search} onChange={e => setSearch(e.target.value)}/>
                        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"/>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {santris.map(s => {
                        const paidCount = payments.filter(p => p.santriId === s.id && p.year === currentYear && p.status === 'lunas').length;
                        const pendingCount = payments.filter(p => p.santriId === s.id && p.year === currentYear && p.status === 'pending').length;
                        
                        return (
                            <div key={s.id} onClick={() => setSelectedSantriId(s.id)} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex items-center gap-4">
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-900 group-hover:text-white transition-colors relative">
                                    <User size={24}/>
                                    {pendingCount > 0 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-pulse border-2 border-white"></span>}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-black text-slate-900 leading-tight">{s.name}</h4>
                                    <div className="flex gap-3 mt-1 items-center flex-wrap">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">Lunas: {paidCount}/12</p>
                                        {pendingCount > 0 && (
                                            <p className="text-[9px] text-amber-600 font-black uppercase bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
                                                {pendingCount} Verifikasi
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-slate-300"/>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }

    const targetSantri = users.find(u => u.id === selectedSantriId);
    if (!targetSantri) return null;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {user.role === 'admin' && (
                <button onClick={() => setSelectedSantriId(null)} className="text-slate-400 font-bold flex items-center gap-2 hover:text-blue-900 transition-colors"><ChevronRight size={18} className="rotate-180" /> Kembali ke Daftar</button>
            )}
            
            <div className="bg-gradient-to-tr from-blue-900 to-emerald-800 p-8 rounded-[3rem] text-white shadow-xl flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/20 shrink-0">
                    <Receipt size={32}/>
                </div>
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-black tracking-tight">{targetSantri.name}</h2>
                    <p className="text-white/70 text-sm font-medium mt-1">Status Pembayaran SPP Tahun {currentYear}</p>
                </div>
                {user.role === 'santri' && (
                    <div className="md:ml-auto w-full md:w-auto bg-white/10 px-6 py-4 rounded-2xl border border-white/20 backdrop-blur-sm text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-1">Tagihan Per Bulan</p>
                        <p className="text-xl font-black">Rp 150.000</p>
                        <p className="text-[9px] font-medium mt-1 opacity-70">Transfer ke BSI: 123456789 (Pesantren)</p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {months.map((monthName, idx) => {
                    const payment = payments.find(p => p.santriId === targetSantri.id && p.year === currentYear && p.month === idx);

                    return (
                        <div key={idx} className={`p-6 rounded-[2.5rem] border ${payment?.status === 'lunas' ? 'bg-emerald-50 border-emerald-100' : payment?.status === 'pending' ? 'bg-amber-50 border-amber-100' : 'bg-white border-slate-100'} shadow-sm flex flex-col justify-between group`}>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h4 className={`font-black text-lg ${payment?.status === 'lunas' ? 'text-emerald-900' : 'text-slate-700'}`}>{monthName}</h4>
                                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${payment?.status === 'lunas' ? 'text-emerald-600/70' : 'text-slate-400'}`}>{currentYear}</p>
                                </div>
                                {payment?.status === 'lunas' ? (
                                    <div className="bg-emerald-200 text-emerald-800 p-2 rounded-xl shadow-inner"><CheckCircle size={18}/></div>
                                ) : payment?.status === 'pending' ? (
                                    <div className="bg-amber-200 text-amber-800 p-2 rounded-xl shadow-inner"><AlertCircle size={18}/></div>
                                ) : (
                                    <div className="bg-slate-100 text-slate-400 p-2 rounded-xl"><AlertCircle size={18}/></div>
                                )}
                            </div>
                            
                            {payment?.status === 'lunas' ? (
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="inline-block text-[10px] font-black uppercase tracking-widest text-emerald-600 px-3 py-1.5 bg-emerald-100 rounded-xl">LUNAS</div>
                                        {user.role === 'admin' && (
                                            <button onClick={() => handleCancelPay(payment.id)} className="text-slate-400 hover:text-rose-500 transition-colors p-1" title="Batalkan Pembayaran"><Trash2 size={14}/></button>
                                        )}
                                    </div>
                                    <p className="text-lg font-black text-slate-800 tracking-tight mb-1">Rp {payment.amount.toLocaleString('id-ID')}</p>
                                    <p className="text-[10px] font-bold text-emerald-700/70 uppercase tracking-widest flex items-center gap-1.5">
                                        <Calendar size={12}/> {payment.date}
                                    </p>
                                </div>
                            ) : payment?.status === 'pending' ? (
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="inline-block text-[10px] font-black uppercase tracking-widest text-amber-600 px-3 py-1.5 bg-amber-100 rounded-xl">VERIFIKASI</div>
                                        {user.role === 'admin' && (
                                            <button onClick={() => handleCancelPay(payment.id)} className="text-slate-400 hover:text-rose-500 transition-colors p-1" title="Tolak / Hapus"><Trash2 size={14}/></button>
                                        )}
                                    </div>
                                    <p className="text-lg font-black text-slate-800 tracking-tight mb-1">Rp {payment.amount.toLocaleString('id-ID')}</p>
                                    {user.role === 'admin' ? (
                                        <button onClick={() => handlePay(targetSantri.id, idx)} className="w-full bg-emerald-600 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20 mt-2">Terima Lunas</button>
                                    ) : (
                                        <p className="text-[10px] font-bold text-amber-700/70 uppercase tracking-widest flex items-center gap-1.5 mt-2">
                                            Sedang dicek Admin...
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <div className="inline-block text-[10px] font-black uppercase tracking-widest text-rose-500 px-3 py-1.5 bg-rose-50 rounded-xl mb-4">BELUM DIBAYAR</div>
                                    {user.role === 'admin' ? (
                                        <button onClick={() => handlePay(targetSantri.id, idx)} className="w-full bg-blue-900 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20">Catat Manual</button>
                                    ) : (
                                        <button onClick={() => handleSantriPay(targetSantri.id, idx)} className="w-full bg-blue-900 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20">Konfirmasi Transfer</button>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const LibraryModule = ({ user, books, setBooks, showAlert, showConfirm }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', type: 'pdf', price: 0, link: '' });

  const handleSave = () => {
    if (!form.title || !form.link) return showAlert("Judul dan Link tautan buku wajib diisi!");
    setBooks([{ ...form, id: Date.now(), price: parseInt(form.price) || 0 }, ...books]);
    setIsAdding(false);
    setForm({ title: '', description: '', type: 'pdf', price: 0, link: '' });
  };

  const handleDelete = (id) => {
    showConfirm("Apakah Anda yakin ingin menghapus buku ini dari koleksi Maktabah?", () => {
      setBooks(books.filter(b => b.id !== id));
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Maktabah & Toko Buku</h2>
          <p className="text-slate-400 text-xs font-medium">Pusat unduhan e-book (PDF) dan pembelian buku fisik.</p>
        </div>
        {user.role === 'admin' && (
          <button onClick={() => setIsAdding(true)} className="bg-emerald-600 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform">
            <Plus size={16}/> Tambah Buku
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-[2.5rem] border-2 border-emerald-50 shadow-xl space-y-5 animate-in zoom-in-95">
          <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Judul Buku / Kitab</label>
              <input className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-emerald-500/10" placeholder="Contoh: Terjemah Fathul Qorib" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          </div>
          <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Deskripsi Singkat</label>
              <textarea className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 font-medium h-24 outline-none focus:ring-2 focus:ring-emerald-500/10" placeholder="Jelaskan isi buku ini..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
             <div>
                 <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Format Buku</label>
                 <select className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-emerald-500/10" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                    <option value="pdf">E-Book (PDF Digital)</option>
                    <option value="physical">Buku Cetak (Fisik)</option>
                 </select>
             </div>
             <div>
                 <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Harga (Isi 0 jika Gratis)</label>
                 <input type="number" className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-emerald-500/10" placeholder="0" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
             </div>
          </div>
          <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Tautan (Link)</label>
              <input className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-emerald-500/10" placeholder={parseInt(form.price) === 0 ? "Link Google Drive / URL File PDF" : "Link WhatsApp / Shopee Pembelian"} value={form.link} onChange={e => setForm({...form, link: e.target.value})} />
          </div>
          
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} className="flex-1 bg-emerald-600 text-white p-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-700 transition-colors">Simpan ke Maktabah</button>
            <button onClick={() => setIsAdding(false)} className="bg-slate-100 text-slate-400 px-8 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-colors">Batal</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map(book => {
          const isFree = book.price === 0;
          return (
          <div key={book.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-xl hover:-translate-y-1 transition-all">
             <div>
                <div className="flex justify-between items-start mb-4">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${book.type === 'pdf' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                      {book.type === 'pdf' ? <DownloadCloud size={20}/> : <ShoppingBag size={20}/>}
                   </div>
                   {user.role === 'admin' && (
                      <button onClick={() => handleDelete(book.id)} className="text-slate-300 hover:text-rose-500 p-2 transition-colors hover:bg-rose-50 rounded-lg"><Trash2 size={16}/></button>
                   )}
                </div>
                <div className="mb-3">
                   <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl ${book.type === 'pdf' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                      {book.type === 'pdf' ? 'PDF Digital' : 'Buku Fisik'}
                   </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 leading-tight mb-2">{book.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-6 font-medium">{book.description}</p>
             </div>
             
             <div className="pt-5 border-t border-slate-50 flex items-center justify-between">
                <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Harga</p>
                    <span className={`font-black ${isFree ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {isFree ? 'Gratis' : `Rp ${book.price.toLocaleString('id-ID')}`}
                    </span>
                </div>
                <a href={book.link} target="_blank" rel="noreferrer" className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${isFree ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-lg shadow-blue-900/20' : 'bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/20'}`}>
                   {isFree ? 'Unduh PDF' : 'Beli Sekarang'}
                </a>
             </div>
          </div>
        )})}
      </div>
    </div>
  );
};

const ForumModule = ({ user, users, threads, setThreads, showConfirm }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newThread, setNewThread] = useState({ title: '', content: '' });
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handlePost = () => {
    if (!newThread.title || !newThread.content) return;
    const thread = {
      id: Date.now(),
      userId: user.id,
      title: newThread.title,
      content: newThread.content,
      date: new Date().toISOString().split('T')[0],
      replies: []
    };
    setThreads([thread, ...threads]);
    setIsAdding(false);
    setNewThread({ title: '', content: '' });
  };

  const handleReply = (threadId) => {
    if (!replyText) return;
    const reply = {
      id: Date.now(),
      userId: user.id,
      name: user.name,
      content: replyText,
      date: new Date().toISOString().split('T')[0]
    };
    setThreads(threads.map(t => t.id === threadId ? { ...t, replies: [...t.replies, reply] } : t));
    setReplyText('');
    setActiveReplyId(null);
  };

  const deleteThread = (id) => {
    showConfirm("Apakah Anda yakin ingin menghapus diskusi ini dari forum?", () => {
        setThreads(threads.filter(t => t.id !== id));
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Forum Diskusi</h2>
          <p className="text-slate-400 text-xs font-medium">Tanya jawab dan diskusi santri seputar pembelajaran.</p>
        </div>
        <button onClick={() => setIsAdding(true)} className="bg-blue-900 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2">
          <MessageSquare size={16}/> Mulai Diskusi
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-[2.5rem] border-2 border-blue-50 shadow-xl space-y-4">
          <input className="w-full bg-slate-50 p-4 rounded-2xl border font-bold outline-none" placeholder="Subjek Pertanyaan" value={newThread.title} onChange={e => setNewThread({...newThread, title: e.target.value})} />
          <textarea className="w-full bg-slate-50 p-4 rounded-2xl border font-medium h-32 outline-none" placeholder="Tuliskan pertanyaan Anda secara detail..." value={newThread.content} onChange={e => setNewThread({...newThread, content: e.target.value})} />
          <div className="flex gap-2">
            <button onClick={handlePost} className="flex-1 bg-blue-900 text-white p-4 rounded-2xl font-black uppercase tracking-widest text-xs">Kirim Diskusi</button>
            <button onClick={() => setIsAdding(false)} className="bg-slate-100 text-slate-400 px-6 rounded-2xl font-black uppercase tracking-widest text-xs">Batal</button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {threads.map(thread => {
          const author = users.find(u => u.id === thread.userId) || { name: 'Anonim' };
          return (
            <div key={thread.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-black text-xs">
                        {author.name.substring(0,2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{author.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{thread.date}</p>
                      </div>
                   </div>
                   {user.role === 'admin' && (
                     <button onClick={() => deleteThread(thread.id)} className="text-slate-200 hover:text-rose-500 p-2"><Trash2 size={16}/></button>
                   )}
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-4">{thread.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed mb-6">{thread.content}</p>
                
                <div className="flex items-center gap-6">
                   <button onClick={() => setActiveReplyId(activeReplyId === thread.id ? null : thread.id)} className="text-[10px] font-black uppercase tracking-widest text-blue-900 flex items-center gap-2 hover:opacity-70 transition-opacity">
                      <Send size={14}/> {thread.replies.length} Balasan
                   </button>
                </div>
              </div>
              <div className="bg-slate-50/50 border-t border-slate-50 p-8 space-y-6">
                {thread.replies.map(reply => (
                  <div key={reply.id} className="flex gap-4 group">
                     <div className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-[8px] font-black text-slate-400 uppercase shrink-0">
                        {reply.name.substring(0,2)}
                     </div>
                     <div className="flex-1">
                        <div className="bg-white p-4 rounded-2xl border border-slate-200/50 shadow-sm relative">
                           <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-black text-slate-900">{reply.name}</span>
                              <span className="text-[8px] font-bold text-slate-300 uppercase">{reply.date}</span>
                           </div>
                           <p className="text-xs text-slate-600 leading-relaxed font-medium">{reply.content}</p>
                        </div>
                     </div>
                  </div>
                ))}
                {activeReplyId === thread.id && (
                  <div className="flex gap-4 animate-in slide-in-from-top-2">
                     <div className="w-8 h-8 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-[8px] font-black text-blue-600 uppercase shrink-0">
                        ME
                     </div>
                     <div className="flex-1 relative">
                        <textarea 
                          className="w-full bg-white p-4 rounded-2xl border border-blue-100 shadow-inner text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/10 min-h-[80px]" 
                          placeholder="Tulis balasan Anda..."
                          value={replyText}
                          onChange={e => setReplyText(e.target.value)}
                        />
                        <button onClick={() => handleReply(thread.id)} className="absolute bottom-4 right-4 bg-blue-600 text-white p-2 rounded-xl hover:scale-105 transition-transform">
                          <Send size={14}/>
                        </button>
                     </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

const UserManagement = ({ users, setUsers, showAlert, classes, enrollments }) => {
  const [filterRole, setFilterRole] = useState('santri');
  const [isAdding, setIsAdding] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [form, setForm] = useState({ name: '', username: '', role: 'santri', password: '', admissionYear: '', age: '', email: '', phone: '', specialization: '', joinYear: '', baseSalary: '' });
  
  const handleEdit = (u) => { 
      setEditingUserId(u.id); 
      setForm({ 
          name: u.name, username: u.username, role: u.role, password: u.password,
          admissionYear: u.admissionYear || '', age: u.age || '', email: u.email || '', phone: u.phone || '',
          specialization: u.specialization || '', joinYear: u.joinYear || '', baseSalary: u.baseSalary || ''
      }); 
      setIsAdding(false); 
  };
  
  const handleSave = () => { 
      if (!form.name || !form.username || !form.password) return showAlert("Nama, Username, dan Password wajib diisi!");
      
      let finalData = { ...form };
      if (finalData.baseSalary) finalData.baseSalary = parseInt(finalData.baseSalary);
      
      if (form.role === 'santri' && !editingUserId && !finalData.studentId) {
          const santris = users.filter(u => u.role === 'santri' && u.studentId);
          let nextIdNum = 1;
          if (santris.length > 0) {
              const maxId = Math.max(...santris.map(s => parseInt(s.studentId.replace('MA', '')) || 0));
              nextIdNum = maxId + 1;
          }
          finalData.studentId = `MA${String(nextIdNum).padStart(4, '0')}`;
      }

      if (form.role === 'guru' && !editingUserId && !finalData.teacherId) {
          const gurus = users.filter(u => u.role === 'guru' && u.teacherId);
          let nextIdNum = 1;
          if (gurus.length > 0) {
              const maxId = Math.max(...gurus.map(g => parseInt(g.teacherId.replace('GR', '')) || 0));
              nextIdNum = maxId + 1;
          }
          finalData.teacherId = `GR${String(nextIdNum).padStart(4, '0')}`;
      }

      if (editingUserId) { 
          setUsers(users.map(u => u.id === editingUserId ? { ...u, ...finalData } : u)); 
          setEditingUserId(null); 
      } else { 
          setUsers([...users, {...finalData, id: Date.now()}]); 
      } 
      setIsAdding(false);
      setForm({ name: '', username: '', role: filterRole, password: '', admissionYear: '', age: '', email: '', phone: '', specialization: '', joinYear: '', baseSalary: '' }); 
  };

  const filteredUsers = users.filter(u => u.role === filterRole);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Database Pengguna</h2>
            <p className="text-slate-400 text-xs font-medium mt-1">Kelola data terperinci santri, ustadz, dan admin sistem.</p>
        </div>
        <button onClick={() => {setIsAdding(true); setForm({ ...form, role: filterRole }); setEditingUserId(null);}} className="bg-blue-900 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20">
            + Tambah {filterRole === 'santri' ? 'Santri' : filterRole === 'guru' ? 'Ustadz' : 'Admin'}
        </button>
      </div>

      <div className="flex gap-2 bg-white p-2 rounded-2xl border border-slate-100 w-fit shadow-sm overflow-x-auto max-w-full">
         {['santri', 'guru', 'admin'].map(r => (
             <button key={r} onClick={() => setFilterRole(r)} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${filterRole === r ? 'bg-blue-50 text-blue-900 border border-blue-100 shadow-sm' : 'text-slate-400 hover:bg-slate-50 border border-transparent'}`}>
                 Data {r === 'santri' ? 'Santri (Siswa)' : r === 'guru' ? 'Ustadz (Guru)' : 'Admin'}
             </button>
         ))}
      </div>

      {(isAdding || editingUserId) && (
        <div className="bg-white p-8 rounded-[2.5rem] border-2 border-blue-50 shadow-xl space-y-5 animate-in zoom-in-95 relative">
          <button onClick={() => {setIsAdding(false); setEditingUserId(null);}} className="absolute top-6 right-6 text-slate-400 hover:text-rose-500 bg-slate-50 p-2 rounded-xl transition-colors"><X size={18}/></button>
          <h3 className="font-black text-lg text-slate-900 mb-4">{editingUserId ? 'Edit Data' : 'Tambah Data'} {filterRole === 'santri' ? 'Santri' : filterRole === 'guru' ? 'Ustadz' : 'Admin'}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Nama Lengkap</label>
                  <input className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-blue-500/10" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Contoh: Muhammad Fatih" />
              </div>
              <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Role (Hak Akses)</label>
                  <select className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-blue-500/10" value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
                      <option value="santri">Santri / Siswa</option>
                      <option value="guru">Guru / Ustadz</option>
                      <option value="admin">Administrator</option>
                  </select>
              </div>
          </div>

          {form.role === 'santri' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 bg-blue-50/50 rounded-[2rem] border border-blue-50">
                  <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Tahun Masuk</label>
                      <input type="number" className="w-full bg-white p-4 rounded-2xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-blue-500/10 shadow-sm" placeholder="Contoh: 2026" value={form.admissionYear} onChange={e => setForm({...form, admissionYear: e.target.value})} />
                  </div>
                  <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Usia (Tahun)</label>
                      <input type="number" className="w-full bg-white p-4 rounded-2xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-blue-500/10 shadow-sm" placeholder="Contoh: 15" value={form.age} onChange={e => setForm({...form, age: e.target.value})} />
                  </div>
                  <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Email Aktif</label>
                      <input type="email" className="w-full bg-white p-4 rounded-2xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-blue-500/10 shadow-sm" placeholder="santri@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                  <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">No. WhatsApp</label>
                      <input type="text" className="w-full bg-white p-4 rounded-2xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-blue-500/10 shadow-sm" placeholder="0812345..." value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
              </div>
          )}

          {form.role === 'guru' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 bg-emerald-50/50 rounded-[2rem] border border-emerald-50">
                  <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Tahun Bergabung</label>
                      <input type="number" className="w-full bg-white p-4 rounded-2xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-emerald-500/10 shadow-sm" placeholder="Contoh: 2020" value={form.joinYear} onChange={e => setForm({...form, joinYear: e.target.value})} />
                  </div>
                  <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Spesialisasi Bidang</label>
                      <input type="text" className="w-full bg-white p-4 rounded-2xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-emerald-500/10 shadow-sm" placeholder="Contoh: Fiqih, Nahwu" value={form.specialization} onChange={e => setForm({...form, specialization: e.target.value})} />
                  </div>
                  <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Email Aktif</label>
                      <input type="email" className="w-full bg-white p-4 rounded-2xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-emerald-500/10 shadow-sm" placeholder="ustadz@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                  <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">No. WhatsApp</label>
                      <input type="text" className="w-full bg-white p-4 rounded-2xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-emerald-500/10 shadow-sm" placeholder="0812345..." value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                  <div className="md:col-span-2">
                      <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Gaji Pokok / Mukafah (Rp)</label>
                      <input type="number" className="w-full bg-white p-4 rounded-2xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-emerald-500/10 shadow-sm" placeholder="Contoh: 3000000" value={form.baseSalary} onChange={e => setForm({...form, baseSalary: e.target.value})} />
                  </div>
              </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Username Login</label>
                  <input className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-blue-500/10" value={form.username} onChange={e => setForm({...form, username: e.target.value})} />
              </div>
              <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Password</label>
                  <input className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-blue-500/10" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
              </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} className="flex-1 bg-blue-900 text-white p-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20">Simpan Data</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-x-auto shadow-sm">
        <table className="w-full text-left min-w-[900px]">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
                {(filterRole === 'santri' || filterRole === 'guru') && <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest whitespace-nowrap">ID {filterRole === 'santri' ? 'Santri' : 'Guru'}</th>}
                <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest whitespace-nowrap">Data Diri</th>
                {(filterRole === 'santri' || filterRole === 'guru') && (
                    <>
                        <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest whitespace-nowrap">Kontak</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Akademik / Tugas</th>
                    </>
                )}
                <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest whitespace-nowrap">Kredensial Akun</th>
                <th className="px-6 py-5 text-right text-[10px] font-black uppercase text-slate-400 tracking-widest">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredUsers.map(u => {
                let activeClasses = [];
                if (u.role === 'santri' && enrollments && classes) {
                    const myEnrollments = enrollments.filter(e => e.santriId === u.id);
                    activeClasses = myEnrollments.map(e => classes.find(c => c.id === e.classId)?.name).filter(Boolean);
                } else if (u.role === 'guru' && classes) {
                    activeClasses = classes.filter(c => c.guruId === u.id).map(c => c.name);
                }

                return (
                    <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                        {(filterRole === 'santri' || filterRole === 'guru') && (
                            <td className="px-6 py-5 align-top">
                                <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest border whitespace-nowrap inline-block mt-1 ${filterRole === 'santri' ? 'bg-blue-50 text-blue-800 border-blue-100' : 'bg-emerald-50 text-emerald-800 border-emerald-100'}`}>
                                    {filterRole === 'santri' ? (u.studentId || '-') : (u.teacherId || '-')}
                                </span>
                            </td>
                        )}
                        <td className="px-6 py-5 align-top">
                            <p className="font-black text-slate-900 text-sm">{u.name}</p>
                            {filterRole === 'santri' && u.age && <p className="text-[10px] text-slate-400 font-bold mt-1">Usia: {u.age} Tahun</p>}
                            {filterRole === 'guru' && u.specialization && <p className="text-[10px] text-slate-400 font-bold mt-1">Spesialisasi: {u.specialization}</p>}
                        </td>
                        {(filterRole === 'santri' || filterRole === 'guru') && (
                            <td className="px-6 py-5 align-top">
                                <p className="text-xs font-bold text-slate-600 truncate max-w-[180px]">{u.email || '-'}</p>
                                <p className="text-[10px] font-bold text-slate-400 mt-1">WA: {u.phone || '-'}</p>
                            </td>
                        )}
                        {filterRole === 'santri' && (
                            <td className="px-6 py-5 align-top">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Masuk: {u.admissionYear || '-'}</p>
                                <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                                    {activeClasses.length > 0 ? activeClasses.map((cName, idx) => (
                                        <span key={idx} className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg text-[9px] font-black border border-emerald-100 truncate max-w-full">
                                            {cName}
                                        </span>
                                    )) : <span className="text-[10px] font-bold text-slate-300">- Belum ada kelas -</span>}
                                </div>
                            </td>
                        )}
                        {filterRole === 'guru' && (
                            <td className="px-6 py-5 align-top">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Bergabung: {u.joinYear || '-'}</p>
                                <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                                    {activeClasses.length > 0 ? activeClasses.map((cName, idx) => (
                                        <span key={idx} className="bg-blue-50 text-blue-800 px-2.5 py-1 rounded-lg text-[9px] font-black border border-blue-100 truncate max-w-full">
                                            Ngajar: {cName}
                                        </span>
                                    )) : <span className="text-[10px] font-bold text-slate-300">- Belum ada kelas -</span>}
                                </div>
                            </td>
                        )}
                        <td className="px-6 py-5 align-top">
                            <p className="text-xs font-bold text-slate-900 truncate">@{u.username}</p>
                            <p className="text-[10px] text-slate-400 font-bold mt-1 truncate">Pass: {u.password}</p>
                        </td>
                        <td className="px-6 py-5 text-right align-top">
                            <div className="flex justify-end gap-2 mt-1">
                                <button onClick={() => handleEdit(u)} className="text-slate-400 hover:text-blue-600 p-2.5 transition-colors bg-white hover:bg-blue-50 rounded-xl shadow-sm border border-slate-100" title="Edit Data"><Edit2 size={14}/></button>
                                <button onClick={() => setUsers(users.filter(x => x.id !== u.id))} disabled={u.id === 1} className="text-slate-400 hover:text-rose-600 p-2.5 transition-colors bg-white hover:bg-rose-50 rounded-xl shadow-sm border border-slate-100 disabled:opacity-50" title="Hapus"><Trash2 size={14}/></button>
                            </div>
                        </td>
                    </tr>
                )
            })}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
            <div className="p-10 text-center text-slate-400 font-bold text-sm">Belum ada data {filterRole}.</div>
        )}
      </div>
    </div>
  );
};

const AdminMonitoring = ({ classes, enrollments, materials, exams, grades, users }) => {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Monitoring Akademik</h2>
            <div className="grid grid-cols-1 gap-4">
                {classes.map(cls => {
                    const studentCount = enrollments.filter(e => e.classId === cls.id).length;
                    const classGrades = grades.filter(g => exams.filter(e => e.classId === cls.id).map(ex => ex.id).includes(g.examId));
                    const avg = classGrades.length > 0 ? Math.round(classGrades.reduce((a, b) => a + b.score, 0) / classGrades.length) : 0;
                    return (
                        <div key={cls.id} className="bg-white p-8 rounded-[2.5rem] border shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-4"><TrendingUp className="text-blue-600"/><h4 className="font-black text-lg">{cls.name}</h4></div>
                            <div className="flex gap-8 text-center">
                                <div><p className="text-[9px] font-black uppercase">Santri</p><p className="text-lg font-black">{studentCount}</p></div>
                                <div><p className="text-[9px] font-black uppercase text-emerald-600">Rata-rata</p><p className="text-lg font-black text-emerald-600">{avg}</p></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const ClassManagement = ({ classes, setClasses, users }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClassId, setEditingClassId] = useState(null);
  const [form, setForm] = useState({ name: '', guruId: '', description: '' });
  const gurus = users.filter(u => u.role === 'guru');
  
  const handleEdit = (c) => { 
      setEditingClassId(c.id); 
      setForm({ name: c.name, guruId: c.guruId.toString(), description: c.description }); 
      setIsFormOpen(true); 
  };
  
  const handleSave = () => { 
      if (editingClassId) {
          setClasses(classes.map(c => c.id === editingClassId ? { ...c, ...form, guruId: parseInt(form.guruId) } : c));
      } else {
          setClasses([...classes, { ...form, id: Date.now(), guruId: parseInt(form.guruId) }]); 
      }
      setIsFormOpen(false); 
      setEditingClassId(null); 
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Kurikulum Kelas</h2>
        <button onClick={() => { setEditingClassId(null); setForm({ name: '', guruId: '', description: '' }); setIsFormOpen(true); }} className="bg-blue-900 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest">+ Kelas</button>
      </div>
      {isFormOpen && (
        <div className="bg-white p-8 rounded-[2.5rem] border-2 border-blue-50 shadow-2xl space-y-4 animate-in zoom-in-95">
          <input className="w-full bg-slate-50 p-4 rounded-2xl border font-bold" placeholder="Nama Kitab" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <select className="w-full bg-slate-50 p-4 rounded-2xl border font-bold" value={form.guruId} onChange={e => setForm({...form, guruId: e.target.value})}>
            <option value="">Pilih Ustadz</option>
            {gurus.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
          <textarea className="w-full bg-slate-50 p-4 rounded-2xl border font-bold h-24" placeholder="Deskripsi" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          <button onClick={handleSave} className="w-full bg-blue-900 text-white p-4 rounded-2xl font-black uppercase tracking-widest text-xs">Simpan Kelas</button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map(c => (
          <div key={c.id} className="bg-white p-8 rounded-[2.5rem] border group">
            <div className="flex justify-between mb-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center"><BookOpen size={20}/></div>
                <div className="flex gap-2">
                    <button onClick={() => handleEdit(c)}><Edit2 size={14} className="text-slate-400 hover:text-blue-600"/></button>
                    <button onClick={() => setClasses(classes.filter(x => x.id !== c.id))}><Trash2 size={14} className="text-slate-400 hover:text-rose-600"/></button>
                </div>
            </div>
            <h3 className="font-black text-lg">{c.name}</h3><p className="text-xs text-slate-400 mt-2 font-bold uppercase">Ustadz: {users.find(u => u.id === c.guruId)?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const MyClasses = ({ user, classes, enrollments, onSelectClass }) => {
  const myClasses = user.role === 'guru' ? classes.filter(c => c.guruId === user.id) : classes.filter(c => enrollments.some(e => e.classId === c.id && e.santriId === user.id));
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Portal Belajar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myClasses.map(c => (
          <div key={c.id} onClick={() => onSelectClass(c.id)} className="bg-white p-8 rounded-[2.5rem] border hover:shadow-2xl transition-all cursor-pointer group">
            <div className="bg-blue-50 text-blue-900 w-12 h-12 rounded-2xl flex items-center justify-center mb-6"><BookOpen size={24}/></div>
            <h3 className="text-xl font-black text-slate-900">{c.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

const AddMaterial = ({ classId, onAdd }) => {
  const [show, setShow] = useState(false);
  const [m, setM] = useState({ title: '', content: '', youtubeLink: '', attachmentLink: '' });
  
  if (!show) return <button onClick={() => setShow(true)} className="w-full py-6 border-2 border-dashed rounded-[2rem] text-blue-900 font-black uppercase text-[10px] tracking-widest hover:bg-blue-50 transition-colors">+ Tambah Materi Baru</button>;
  
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border shadow-xl space-y-4 animate-in zoom-in-95 relative">
      <h3 className="font-black text-lg text-slate-900 mb-4">Unggah Materi Pembelajaran</h3>
      <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Judul Materi</label>
          <input className="w-full bg-slate-50 p-4 rounded-2xl border font-bold focus:ring-2 focus:ring-blue-500/10 outline-none" placeholder="Contoh: Pertemuan 1 - Muqaddimah" value={m.title} onChange={e => setM({...m, title: e.target.value})} />
      </div>
      <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Penjelasan / Teks Materi</label>
          <textarea className="w-full bg-slate-50 p-4 rounded-2xl border font-medium h-32 focus:ring-2 focus:ring-blue-500/10 outline-none" placeholder="Tuliskan isi materi atau ringkasan disini..." value={m.content} onChange={e => setM({...m, content: e.target.value})} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Link Video YouTube (Opsional)</label>
              <div className="relative">
                 <Youtube size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-500"/>
                 <input className="w-full bg-slate-50 pl-11 pr-4 py-4 rounded-2xl border font-bold text-sm focus:ring-2 focus:ring-blue-500/10 outline-none" placeholder="https://youtube.com/..." value={m.youtubeLink} onChange={e => setM({...m, youtubeLink: e.target.value})} />
              </div>
          </div>
          <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Link Lampiran File/PDF (Opsional)</label>
              <div className="relative">
                 <Paperclip size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"/>
                 <input className="w-full bg-slate-50 pl-11 pr-4 py-4 rounded-2xl border font-bold text-sm focus:ring-2 focus:ring-blue-500/10 outline-none" placeholder="Link Google Drive / Dropbox..." value={m.attachmentLink} onChange={e => setM({...m, attachmentLink: e.target.value})} />
              </div>
          </div>
      </div>
      <div className="flex gap-2 pt-4">
          <button onClick={() => { 
              if (!m.title) return alert('Judul materi harus diisi!');
              onAdd({ ...m, id: Date.now(), classId, viewedBy: [] }); 
              setShow(false); 
              setM({title:'', content:'', youtubeLink:'', attachmentLink:''}); 
          }} className="flex-1 bg-blue-900 text-white p-4 rounded-2xl font-black uppercase text-xs hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20">Simpan Materi</button>
          <button onClick={() => setShow(false)} className="bg-slate-100 text-slate-400 px-8 rounded-2xl font-black text-xs hover:bg-slate-200 transition-colors">Batal</button>
      </div>
    </div>
  );
};

const AddExam = ({ classId, onAdd }) => {
  const [show, setShow] = useState(false);
  const [e, setE] = useState({ title: '', description: '', dueDate: '', duration: '', link: '' });
  
  if (!show) return <button onClick={() => setShow(true)} className="w-full py-6 border-2 border-dashed border-amber-200 rounded-[2rem] text-amber-600 font-black uppercase text-[10px] tracking-widest hover:bg-amber-50 transition-colors">+ Jadwalkan Ujian / Tugas Baru</button>;
  
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-amber-100 shadow-xl space-y-4 animate-in zoom-in-95 relative">
      <h3 className="font-black text-lg text-slate-900 mb-4">Buat Ujian Baru</h3>
      
      <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Judul Ujian / Tugas</label>
          <input className="w-full bg-slate-50 p-4 rounded-2xl border font-bold focus:ring-2 focus:ring-amber-500/10 outline-none" placeholder="Contoh: Ujian Tengah Semester" value={e.title} onChange={ev => setE({...e, title: ev.target.value})} />
      </div>

      <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Instruksi / Deskripsi</label>
          <textarea className="w-full bg-slate-50 p-4 rounded-2xl border font-medium h-24 focus:ring-2 focus:ring-amber-500/10 outline-none" placeholder="Jelaskan tata cara pengerjaan ujian..." value={e.description} onChange={ev => setE({...e, description: ev.target.value})} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Batas Waktu (Deadline)</label>
              <input type="date" className="w-full bg-slate-50 p-4 rounded-2xl border font-bold focus:ring-2 focus:ring-amber-500/10 outline-none" value={e.dueDate} onChange={ev => setE({...e, dueDate: ev.target.value})} />
          </div>
          <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Waktu Pengerjaan (Menit)</label>
              <input type="number" className="w-full bg-slate-50 p-4 rounded-2xl border font-bold focus:ring-2 focus:ring-amber-500/10 outline-none" placeholder="Contoh: 90" value={e.duration} onChange={ev => setE({...e, duration: ev.target.value})} />
          </div>
      </div>

      <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Tautan Link Ujian (Opsional)</label>
          <input className="w-full bg-slate-50 p-4 rounded-2xl border font-bold focus:ring-2 focus:ring-amber-500/10 outline-none" placeholder="Link Google Form / Quizizz..." value={e.link} onChange={ev => setE({...e, link: ev.target.value})} />
      </div>

      <div className="flex gap-2 pt-4">
          <button onClick={() => { 
              if (!e.title) return alert('Judul ujian harus diisi!');
              onAdd({ ...e, id: Date.now(), classId }); 
              setShow(false); 
              setE({title:'', description:'', dueDate:'', duration:'', link:''}); 
          }} className="flex-1 bg-amber-600 text-white p-4 rounded-2xl font-black text-xs uppercase hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/20">Simpan Jadwal</button>
          <button onClick={() => setShow(false)} className="bg-slate-100 text-slate-400 px-8 rounded-2xl font-black text-xs uppercase hover:bg-slate-200 transition-colors">Batal</button>
      </div>
    </div>
  );
};

const ClassDetail = ({ classId, user, classes, users, enrollments, setEnrollments, materials, setMaterials, exams, setExams, grades, setGrades, onBack, showAlert }) => {
  const [tab, setTab] = useState('materi');
  const [editingExam, setEditingExam] = useState(null);
  const cls = classes.find(c => c.id === classId);
  const students = users.filter(u => enrollments.some(e => e.classId === classId && e.santriId === u.id));
  const isGuru = user.role === 'guru';
  const myEnrollment = !isGuru ? enrollments.find(e => e.classId === classId && e.santriId === user.id) : null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <button onClick={onBack} className="text-slate-400 font-bold flex items-center gap-2 hover:text-blue-900 transition-colors"><ChevronRight size={18} className="rotate-180" /> Kembali</button>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black text-slate-900">{cls?.name}</h2>
            {!isGuru && myEnrollment && myEnrollment.status !== 'aktif' && (
                <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest ${myEnrollment.status === 'lulus' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-rose-100 text-rose-700 border border-rose-200'}`}>
                    {myEnrollment.status === 'lulus' ? 'LULUS' : 'TIDAK LULUS'}
                </span>
            )}
        </div>
        <div className="flex bg-white p-1 rounded-2xl border shadow-sm">
          {['materi', 'ujian', 'nilai', 'presensi'].map(t => (!isGuru && (t === 'nilai' || t === 'presensi') ? null : <button key={t} onClick={() => setTab(t)} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === t ? 'bg-blue-900 text-white' : 'text-slate-400'}`}>{t}</button>))}
        </div>
      </div>
      {tab === 'materi' && (
        <div className="space-y-6">
          {isGuru && <AddMaterial classId={classId} onAdd={(m) => setMaterials([...materials, m])} />}
          {materials.filter(m => m.classId === classId).map(m => {
            const hasViewed = m.viewedBy?.includes(user.id);
            const viewCount = m.viewedBy?.length || 0;
            const totalStudents = students.length;

            return (
                <div key={m.id} className="bg-white p-8 md:p-10 rounded-[2.5rem] border shadow-sm space-y-6 group hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start border-b border-slate-50 pb-6">
                        <div>
                            <h4 className="font-black text-2xl text-slate-900 tracking-tight">{m.title}</h4>
                            {isGuru && (
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-1.5">
                                    <Eye size={14}/> Dilihat oleh {viewCount} dari {totalStudents} Santri
                                </p>
                            )}
                        </div>
                        {isGuru && (
                            <button onClick={() => setMaterials(materials.filter(x => x.id !== m.id))} className="text-slate-300 hover:text-rose-500 bg-slate-50 hover:bg-rose-50 p-3 rounded-xl transition-colors">
                                <Trash2 size={18}/>
                            </button>
                        )}
                    </div>
                    
                    <p className="text-slate-600 font-medium whitespace-pre-wrap leading-relaxed">{m.content}</p>
                    
                    {(m.youtubeLink || m.attachmentLink) && (
                        <div className="flex flex-wrap gap-3 pt-4">
                            {m.youtubeLink && (
                                <a href={m.youtubeLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-rose-50 text-rose-600 px-5 py-3 rounded-xl font-bold text-xs hover:bg-rose-100 transition-colors border border-rose-100">
                                    <Youtube size={16}/> Tonton Video
                                </a>
                            )}
                            {m.attachmentLink && (
                                <a href={m.attachmentLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-3 rounded-xl font-bold text-xs hover:bg-blue-100 transition-colors border border-blue-100">
                                    <Paperclip size={16}/> Unduh Lampiran
                                </a>
                            )}
                        </div>
                    )}

                    {!isGuru && (
                        <div className="pt-6 border-t border-slate-50 flex justify-end">
                            {hasViewed ? (
                                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-5 py-3 rounded-xl border border-emerald-100">
                                    <CheckCircle2 size={18} />
                                    <span className="font-black text-[10px] uppercase tracking-widest">Selesai Dipelajari</span>
                                </div>
                            ) : (
                                <button onClick={() => {
                                    setMaterials(materials.map(mat => mat.id === m.id ? { ...mat, viewedBy: [...(mat.viewedBy || []), user.id] } : mat));
                                }} className="flex items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-900/20 hover:scale-105 transition-transform">
                                    <CheckCircle size={16} /> Tandai Selesai Dibaca
                                </button>
                            )}
                        </div>
                    )}
                </div>
            );
          })}
          {materials.filter(m => m.classId === classId).length === 0 && (
              <div className="text-center p-10 bg-slate-50 border border-slate-100 rounded-[2.5rem]">
                  <p className="text-slate-400 font-bold text-sm">Belum ada materi di kelas ini.</p>
              </div>
          )}
        </div>
      )}
      {tab === 'ujian' && (
        <div className="space-y-6">
          {isGuru && <AddExam classId={classId} onAdd={(e) => setExams([...exams, e])} />}
          
          {exams.filter(e => e.classId === classId).map(ex => {
            if (editingExam?.id === ex.id) {
                return (
                    <div key={ex.id} className="bg-white p-8 rounded-[2.5rem] border border-blue-100 shadow-xl space-y-4 relative">
                        <h3 className="font-black text-lg text-slate-900 mb-4">Edit Ujian / Tugas</h3>
                        
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Judul Ujian / Tugas</label>
                            <input className="w-full bg-slate-50 p-4 rounded-2xl border font-bold focus:ring-2 focus:ring-blue-500/10 outline-none" placeholder="Contoh: Ujian Tengah Semester" value={editingExam.title} onChange={ev => setEditingExam({...editingExam, title: ev.target.value})} />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Instruksi / Deskripsi</label>
                            <textarea className="w-full bg-slate-50 p-4 rounded-2xl border font-medium h-24 focus:ring-2 focus:ring-blue-500/10 outline-none" placeholder="Jelaskan tata cara pengerjaan ujian..." value={editingExam.description} onChange={ev => setEditingExam({...editingExam, description: ev.target.value})} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Batas Waktu (Deadline)</label>
                                <input type="date" className="w-full bg-slate-50 p-4 rounded-2xl border font-bold focus:ring-2 focus:ring-blue-500/10 outline-none" value={editingExam.dueDate} onChange={ev => setEditingExam({...editingExam, dueDate: ev.target.value})} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Waktu Pengerjaan (Menit)</label>
                                <input type="number" className="w-full bg-slate-50 p-4 rounded-2xl border font-bold focus:ring-2 focus:ring-blue-500/10 outline-none" placeholder="Contoh: 90" value={editingExam.duration} onChange={ev => setEditingExam({...editingExam, duration: ev.target.value})} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase ml-3 mb-1">Tautan Link Ujian (Opsional)</label>
                            <input className="w-full bg-slate-50 p-4 rounded-2xl border font-bold focus:ring-2 focus:ring-blue-500/10 outline-none" placeholder="Link Google Form / Quizizz..." value={editingExam.link} onChange={ev => setEditingExam({...editingExam, link: ev.target.value})} />
                        </div>

                        <div className="flex gap-2 pt-4">
                            <button onClick={() => { 
                                if (!editingExam.title) return alert('Judul ujian harus diisi!');
                                setExams(exams.map(e => e.id === editingExam.id ? editingExam : e));
                                setEditingExam(null);
                            }} className="flex-1 bg-blue-600 text-white p-4 rounded-2xl font-black text-xs uppercase hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">Simpan Perubahan</button>
                            <button onClick={() => setEditingExam(null)} className="bg-slate-100 text-slate-400 px-8 rounded-2xl font-black text-xs uppercase hover:bg-slate-200 transition-colors">Batal</button>
                        </div>
                    </div>
                );
            }

            return (
            <div key={ex.id} className="bg-white p-8 md:p-10 rounded-[2.5rem] border shadow-sm space-y-5 relative group hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-black text-2xl text-slate-900 tracking-tight">{ex.title}</h4>
                        <div className="flex flex-wrap gap-3 mt-3">
                            <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-amber-100">
                                <Calendar size={14}/> Deadline: {ex.dueDate || '-'}
                            </span>
                            <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-blue-100">
                                <Clock size={14}/> Durasi: {ex.duration || 'Tidak Dibatasi'} {ex.duration ? 'Menit' : ''}
                            </span>
                        </div>
                    </div>
                    {isGuru && (
                        <div className="flex gap-2">
                            <button onClick={() => setEditingExam(ex)} className="text-slate-300 hover:text-blue-500 bg-slate-50 hover:bg-blue-50 p-3 rounded-xl transition-colors">
                                <Edit2 size={18}/>
                            </button>
                            <button onClick={() => setExams(exams.filter(x => x.id !== ex.id))} className="text-slate-300 hover:text-rose-500 bg-slate-50 hover:bg-rose-50 p-3 rounded-xl transition-colors">
                                <Trash2 size={18}/>
                            </button>
                        </div>
                    )}
                </div>
                
                {ex.description && (
                    <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">{ex.description}</p>
                )}
                
                {ex.link && (
                    <div className="pt-5 border-t border-slate-50">
                        <a href={ex.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-blue-900 text-white px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-900/20 hover:scale-105 transition-transform">
                            <ExternalLink size={16} /> Buka Tautan Ujian
                        </a>
                    </div>
                )}
            </div>
          )})}

          {exams.filter(e => e.classId === classId).length === 0 && (
              <div className="text-center p-10 bg-slate-50 border border-slate-100 rounded-[2.5rem]">
                  <p className="text-slate-400 font-bold text-sm">Belum ada jadwal ujian di kelas ini.</p>
              </div>
          )}
        </div>
      )}
      {tab === 'nilai' && isGuru && (
        <div className="bg-white rounded-[2.5rem] border overflow-x-auto shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-8 border-b border-slate-100 sticky left-0">
             <div>
                 <h3 className="font-black text-xl text-slate-900 mb-1">Rekap Nilai & Kelulusan</h3>
                 <p className="text-xs font-medium text-slate-400">Sistem menyimpan otomatis saat diketik, namun Anda bisa menekan tombol simpan untuk konfirmasi.</p>
             </div>
             <button 
                onClick={() => showAlert("Perubahan data nilai dan status kelulusan santri di kelas ini berhasil disimpan ke dalam sistem!")} 
                className="bg-blue-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20 shrink-0"
             >
                 <Save size={16}/> Simpan Perubahan
             </button>
          </div>
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 sticky left-0 bg-slate-50 z-10 w-64 shadow-[1px_0_0_0_#f1f5f9]">Nama Santri</th>
                    {exams.filter(e => e.classId === classId).map(ex => (
                        <th key={ex.id} className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center border-l border-slate-100 min-w-[120px]">
                            {ex.title}
                        </th>
                    ))}
                    {exams.filter(e => e.classId === classId).length === 0 && (
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Belum Ada Ujian</th>
                    )}
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center border-l border-slate-100 min-w-[150px]">Status Kelulusan</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {students.map(s => {
                    const studentEnrollment = enrollments.find(e => e.classId === classId && e.santriId === s.id);
                    return (
                <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6 font-bold text-sm text-slate-800 sticky left-0 bg-white z-10 shadow-[1px_0_0_0_#f1f5f9] group-hover:bg-slate-50">
                        {s.name}
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">ID: {s.studentId}</p>
                    </td>
                    {exams.filter(e => e.classId === classId).map(ex => {
                        const grade = grades.find(g => g.examId === ex.id && g.santriId === s.id);
                        return (
                            <td key={ex.id} className="px-6 py-6 text-center border-l border-slate-50">
                                <input 
                                    type="number" 
                                    className="w-20 p-3 bg-slate-50 border border-slate-200 rounded-xl font-black text-center text-blue-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all" 
                                    placeholder="0"
                                    value={grade?.score ?? ''} 
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        let score = val === '' ? '' : parseInt(val);
                                        // Batasi nilai dari 0 sampai 100
                                        if (score !== '' && (score < 0 || score > 100)) return; 
                                        
                                        const existing = grades.find(g => g.examId === ex.id && g.santriId === s.id);
                                        if (existing) {
                                            setGrades(grades.map(g => g.id === existing.id ? {...g, score} : g)); 
                                        } else {
                                            setGrades([...grades, { id: Date.now(), examId: ex.id, santriId: s.id, score }]);
                                        }
                                    }} 
                                />
                            </td>
                        )
                    })}
                    {exams.filter(e => e.classId === classId).length === 0 && (
                        <td className="px-6 py-6 text-center text-[10px] font-bold text-slate-300">-</td>
                    )}
                    <td className="px-6 py-6 text-center border-l border-slate-50">
                        <select 
                            className={`w-full p-3 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none border transition-all cursor-pointer ${studentEnrollment?.status === 'lulus' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : studentEnrollment?.status === 'tidak_lulus' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}
                            value={studentEnrollment?.status || 'aktif'}
                            onChange={(e) => {
                                if(studentEnrollment) {
                                    setEnrollments(enrollments.map(en => en.id === studentEnrollment.id ? { ...en, status: e.target.value } : en));
                                }
                            }}
                        >
                            <option value="aktif">Aktif Belajar</option>
                            <option value="lulus">Lulus</option>
                            <option value="tidak_lulus">Tidak Lulus</option>
                        </select>
                    </td>
                </tr>
              )})}
            </tbody>
          </table>
          {students.length === 0 && (
              <div className="text-center p-10 text-slate-400 font-bold text-sm border-t border-slate-50">Belum ada santri di kelas ini.</div>
          )}
        </div>
      )}
      {tab === 'presensi' && isGuru && (
        <div className="bg-white rounded-[2.5rem] border overflow-x-auto shadow-sm">
          <div className="p-8 border-b border-slate-100">
             <h3 className="font-black text-xl text-slate-900 mb-1">Rekap Presensi Materi</h3>
             <p className="text-xs font-medium text-slate-400">Kehadiran dihitung berdasarkan santri yang telah menekan tombol "Tandai Selesai Dibaca" pada setiap materi.</p>
          </div>
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 sticky left-0 bg-slate-50 z-10 w-64 shadow-[1px_0_0_0_#f1f5f9]">Nama Santri</th>
                    {materials.filter(m => m.classId === classId).map(m => (
                        <th key={m.id} className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center border-l border-slate-100 min-w-[120px] max-w-[150px] truncate" title={m.title}>
                            {m.title}
                        </th>
                    ))}
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-emerald-600 text-center border-l border-slate-100 min-w-[100px] bg-emerald-50/50">
                        Persentase
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {students.map(s => {
                    const classMaterials = materials.filter(m => m.classId === classId);
                    const totalMaterials = classMaterials.length;
                    const attendedCount = classMaterials.filter(m => m.viewedBy?.includes(s.id)).length;
                    const attendancePercentage = totalMaterials > 0 ? Math.round((attendedCount / totalMaterials) * 100) : 0;

                    return (
                        <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-8 py-6 font-bold text-sm text-slate-800 sticky left-0 bg-white z-10 shadow-[1px_0_0_0_#f1f5f9] group-hover:bg-slate-50">
                                {s.name}
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">ID: {s.studentId}</p>
                            </td>
                            {classMaterials.map(m => {
                                const hasViewed = m.viewedBy?.includes(s.id);
                                return (
                                    <td key={m.id} className="px-6 py-6 text-center border-l border-slate-50">
                                        {hasViewed ? (
                                            <div className="flex justify-center text-emerald-500 bg-emerald-50 w-8 h-8 rounded-full items-center mx-auto shadow-sm border border-emerald-100">
                                                <CheckCircle2 size={16} />
                                            </div>
                                        ) : (
                                            <div className="flex justify-center text-slate-300 w-8 h-8 rounded-full items-center mx-auto">
                                                <X size={16} />
                                            </div>
                                        )}
                                    </td>
                                );
                            })}
                            <td className="px-6 py-6 text-center border-l border-slate-50 bg-emerald-50/10">
                                <span className={`font-black text-lg ${attendancePercentage >= 80 ? 'text-emerald-600' : attendancePercentage >= 50 ? 'text-amber-500' : 'text-rose-500'}`}>
                                    {attendancePercentage}%
                                </span>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
          </table>
          {students.length === 0 && (
              <div className="text-center p-10 text-slate-400 font-bold text-sm border-t border-slate-50">Belum ada santri di kelas ini.</div>
          )}
          {materials.filter(m => m.classId === classId).length === 0 && students.length > 0 && (
              <div className="text-center p-10 text-slate-400 font-bold text-sm border-t border-slate-50">Belum ada materi untuk direkap.</div>
          )}
        </div>
      )}
    </div>
  );
};

const CertificateTemplate = ({ data }) => {
   return (
      <div className="p-8 border-[16px] border-double border-emerald-800 bg-white text-center font-serif min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden">
         <div className="absolute top-0 left-0 w-32 h-32 border-l-[40px] border-t-[40px] border-emerald-500/10 -rotate-45 -translate-x-12 -translate-y-12"></div>
         <div className="absolute bottom-0 right-0 w-32 h-32 border-r-[40px] border-b-[40px] border-emerald-500/10 -rotate-45 translate-x-12 translate-y-12"></div>
         <div className="mb-6">
            <Logo className="w-24 h-24 mx-auto" />
            <h1 className="text-4xl font-black text-emerald-900 mt-4 tracking-[0.2em] uppercase">Sertifikat Kelulusan</h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2 italic">Mafatihul Arabiyyah Digital Learning Center</p>
         </div>
         <div className="my-8">
            <p className="text-xl text-slate-600 italic">Diberikan kepada santri teladan:</p>
            <h2 className="text-5xl font-black text-slate-900 my-4 border-b-2 border-emerald-100 pb-2 inline-block px-12">{data.studentName}</h2>
         </div>
         <div className="max-w-2xl px-12 leading-loose text-slate-700">
            <p className="text-lg">Telah dinyatakan **LULUS** dengan kualifikasi memuaskan dalam program pembelajaran daring untuk bidang studi:</p>
            <h3 className="text-2xl font-bold text-emerald-800 mt-2 uppercase tracking-tight">{data.className}</h3>
         </div>
         <div className="mt-16 w-full flex justify-around items-end">
            <div className="text-center">
               <p className="text-xs font-bold text-slate-400 mb-16 uppercase">Admin Akademik</p>
               <div className="w-32 h-[1px] bg-slate-200 mx-auto"></div>
               <p className="text-sm font-bold text-slate-800 mt-2">Administrator Pusat</p>
            </div>
            <div className="text-center">
               <p className="text-xs font-bold text-slate-400 mb-16 uppercase tracking-widest">Kepala Program</p>
               <div className="w-32 h-[1px] bg-slate-200 mx-auto"></div>
               <p className="text-sm font-bold text-slate-800 mt-2">{data.teacherName}</p>
            </div>
         </div>
      </div>
   );
};

const ReportTemplate = ({ data }) => {
    return (
        <div className="bg-white p-12 text-slate-800 font-sans border border-slate-100 min-h-screen">
            <div className="flex justify-between items-start border-b-4 border-emerald-900 pb-8 mb-10">
                <div className="flex items-center gap-4">
                    <Logo className="w-16 h-16" />
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase">Rapor Capaian Santri</h1>
                        <p className="text-emerald-600 font-bold text-sm tracking-widest uppercase mt-2 italic">Mafatihul Arabiyyah • Tahun Akademik 2026</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold text-slate-800">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-12 mb-10 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <div className="space-y-3">
                    <div className="flex justify-between border-b border-slate-200 pb-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Santri</span>
                        <span className="text-sm font-black text-slate-800 uppercase tracking-tight">{data.student.name}</span>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between border-b border-slate-200 pb-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID Peserta</span>
                        <span className="text-sm font-bold text-slate-800">MAF-00{data.student.id}</span>
                    </div>
                </div>
            </div>
            <div className="border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm mb-12">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Mata Pelajaran</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Rata-rata</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Predikat</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.results.map((res, idx) => (
                            <tr key={idx}>
                                <td className="px-8 py-5 font-black text-slate-900">{res.className}</td>
                                <td className="px-8 py-5 text-center font-black text-blue-900">{res.averageScore}</td>
                                <td className="px-8 py-5 text-right uppercase text-[10px] font-black">{res.averageScore >= 80 ? 'Mumtaz' : 'Jayyid'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ReportsModule = ({ users, classes, enrollments, grades, exams, onPrint }) => {
    const [search, setSearch] = useState('');
    const santris = users.filter(u => u.role === 'santri' && u.name.toLowerCase().includes(search.toLowerCase()));

    const handleGenerateReport = (santri) => {
        const myEnrollments = enrollments.filter(e => e.santriId === santri.id);
        const results = myEnrollments.map(e => {
            const cls = classes.find(c => c.id === e.classId);
            const teacher = users.find(u => u.id === cls.guruId);
            const examIds = exams.filter(ex => ex.classId === cls.id).map(ex => ex.id);
            const classGrades = grades.filter(g => g.santriId === santri.id && examIds.includes(g.examId));
            const avg = classGrades.length > 0 ? Math.round(classGrades.reduce((a, b) => a + b.score, 0) / classGrades.length) : 0;
            return { classId: cls.id, className: cls.name, teacherName: teacher.name, averageScore: avg };
        });
        onPrint({ type: 'report', data: { student: santri, results } });
    };

    const handleGenerateCertificate = (santri, clsId) => {
        const cls = classes.find(c => c.id === clsId);
        const teacher = users.find(u => u.id === cls.guruId);
        onPrint({ type: 'certificate', data: { studentName: santri.name, className: cls.name, teacherName: teacher.name } });
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Pusat Laporan & Sertifikat</h2>
                <input className="bg-white border p-2 rounded-xl text-xs font-bold outline-none" placeholder="Cari santri..." value={search} onChange={e => setSearch(e.target.value)}/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {santris.map(s => {
                    const myEnroll = enrollments.filter(e => e.santriId === s.id);
                    return (
                        <div key={s.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <h4 className="font-black text-lg mb-4">{s.name}</h4>
                            <button onClick={() => handleGenerateReport(s)} className="w-full bg-slate-50 p-4 rounded-2xl border text-xs font-bold uppercase mb-4 flex justify-between items-center hover:bg-slate-100 transition-colors">
                                Ekspor Rapor <FileDown size={14}/>
                            </button>
                            <div className="flex flex-wrap gap-2">
                                {myEnroll.map(e => (
                                    <button key={e.id} onClick={() => handleGenerateCertificate(s, e.classId)} className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl text-[10px] font-black border hover:bg-emerald-100 transition-colors">
                                        Sertifikat {classes.find(c => c.id === e.classId)?.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- KOMPONEN UTAMA ---
export default function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(initialUsers);
  const [classes, setClasses] = useState(initialClasses);
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [materials, setMaterials] = useState(initialMaterials);
  const [exams, setExams] = useState(initialExams);
  const [grades, setGrades] = useState(initialGrades);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [forumThreads, setForumThreads] = useState(initialForum);
  const [books, setBooks] = useState(initialBooks);
  const [payments, setPayments] = useState(initialPayments);
  const [salaries, setSalaries] = useState(initialSalaries);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [printContent, setPrintContent] = useState(null);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState(null);

  const showConfirm = (message, onConfirmCallback) => {
      setModalConfig({ 
          title: 'Konfirmasi', 
          message, 
          type: 'confirm', 
          onConfirm: () => { 
              onConfirmCallback(); 
              setModalConfig(null); 
          } 
      });
  };

  const showPrompt = (message, defaultValue, onConfirmCallback) => {
      setModalConfig({
          title: 'Konfirmasi Nominal',
          message,
          type: 'prompt',
          defaultValue,
          onConfirm: (val) => {
              onConfirmCallback(val);
              setModalConfig(null);
          }
      });
  };
  
  const showAlert = (message) => {
      setModalConfig({ title: 'Peringatan', message, type: 'alert', onConfirm: () => setModalConfig(null) });
  };

  const navigateTo = (tab) => {
      setActiveTab(tab);
      setIsMobileMenuOpen(false);
  };

  const handleLogin = (username, password) => {
    const foundUser = users.find(u => u.username === username && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      setActiveTab('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
    setSelectedClassId(null);
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800 relative">
      <ActionModal config={modalConfig} onClose={() => setModalConfig(null)} />

      {printContent && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8 relative animate-in zoom-in-95">
             <button onClick={() => setPrintContent(null)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-rose-500 transition-colors bg-slate-50 rounded-full print:hidden">
                <X size={20} />
             </button>
             <div id="printable-area">
                {printContent.type === 'certificate' ? <CertificateTemplate data={printContent.data} /> : <ReportTemplate data={printContent.data} />}
             </div>
             <div className="mt-8 flex justify-center gap-4 print:hidden">
                <button onClick={() => window.print()} className="bg-blue-900 text-white px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest flex items-center gap-2 shadow-lg shadow-blue-900/20">
                    <Printer size={16}/> Cetak Sekarang
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Overlay untuk Mobile Menu */}
      {isMobileMenuOpen && (
         <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      <aside className={`${isMobileMenuOpen ? 'flex absolute inset-y-0 left-0 h-full z-50' : 'hidden'} md:flex w-72 bg-white text-slate-700 flex-col shadow-2xl shadow-slate-200 shrink-0 border-r border-slate-100 transition-all`}>
        <div className="p-8 border-b border-slate-50 relative">
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden absolute top-8 right-6 p-2 text-slate-400 bg-slate-50 rounded-xl hover:bg-slate-100">
              <X size={18}/>
          </button>
          <div className="flex items-center space-x-3">
            <Logo className="w-12 h-12" />
            <div className="overflow-hidden">
              <h1 className="text-lg font-black leading-none text-slate-900 tracking-tight truncate">Mafatihul</h1>
              <p className="text-xs font-bold text-emerald-600 tracking-widest uppercase mt-1 italic">Arabiyyah</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-1.5 overflow-y-auto">
          <SidebarLink icon={Layout} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => {navigateTo('dashboard'); setSelectedClassId(null);}} />
          <SidebarLink icon={Bell} label="Pengumuman" active={activeTab === 'announcements'} onClick={() => navigateTo('announcements')} />
          <SidebarLink icon={MessageSquare} label="Forum Diskusi" active={activeTab === 'forum'} onClick={() => navigateTo('forum')} />
          <SidebarLink icon={Library} label="Maktabah (Buku)" active={activeTab === 'library'} onClick={() => navigateTo('library')} />
          
          {user.role === 'admin' && (
            <>
              <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manajemen</div>
              <SidebarLink icon={Users} label="Data Pengguna" active={activeTab === 'users'} onClick={() => navigateTo('users')} />
              <SidebarLink icon={BookOpen} label="Kelola Kelas" active={activeTab === 'classes'} onClick={() => navigateTo('classes')} />
              <SidebarLink icon={TrendingUp} label="Monitoring Akademik" active={activeTab === 'monitoring'} onClick={() => navigateTo('monitoring')} />
              <SidebarLink icon={FileDown} label="Laporan & Sertifikat" active={activeTab === 'reports'} onClick={() => navigateTo('reports')} />
              <SidebarLink icon={Wallet} label="Keuangan & SPP" active={activeTab === 'spp'} onClick={() => navigateTo('spp')} />
              <SidebarLink icon={Banknote} label="Penggajian Guru" active={activeTab === 'payroll'} onClick={() => navigateTo('payroll')} />
            </>
          )}

          {(user.role === 'guru' || user.role === 'santri') && (
            <>
               <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Akademik</div>
               <SidebarLink icon={Book} label={user.role === 'guru' ? 'Kelas Saya' : 'Pembelajaran'} active={activeTab === 'my_classes' || activeTab === 'class_detail'} onClick={() => navigateTo('my_classes')} />
            </>
          )}

          {user.role === 'santri' && (
            <>
               <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Administrasi</div>
               <SidebarLink icon={Receipt} label="Status SPP" active={activeTab === 'spp'} onClick={() => navigateTo('spp')} />
            </>
          )}
        </nav>

        <div className="p-6 border-t border-slate-50">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-4 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-900 border border-slate-100 shrink-0">
              <User size={18} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{user.role}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white p-3 rounded-2xl transition-all duration-300 font-bold text-sm">
            <LogOut size={16} />
            <span>Keluar Sistem</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 h-screen overflow-y-auto">
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-10 px-6 md:px-10 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 text-slate-500 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50">
                    <Menu size={20} />
                </button>
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest hidden md:block">
                  {activeTab.toUpperCase()}
                </h2>
                <h2 className="text-lg font-black text-slate-900 md:hidden">Portal LMS</h2>
            </div>
            <div className="flex items-center gap-4">
                <div className="hidden sm:block text-right">
                    <p className="text-xs font-bold text-slate-900">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>
        </header>

        <div className="p-6 md:p-10">
          {activeTab === 'dashboard' && <Dashboard user={user} classes={classes} enrollments={enrollments} users={users} announcements={announcements} setActiveTab={setActiveTab} />}
          {activeTab === 'announcements' && <AnnouncementsModule user={user} announcements={announcements} setAnnouncements={setAnnouncements} />}
          {activeTab === 'forum' && <ForumModule user={user} users={users} threads={forumThreads} setThreads={setForumThreads} showConfirm={showConfirm} />}
          {activeTab === 'library' && <LibraryModule user={user} books={books} setBooks={setBooks} showAlert={showAlert} showConfirm={showConfirm} />}
          
          {activeTab === 'spp' && <SPPModule user={user} users={users} payments={payments} setPayments={setPayments} showConfirm={showConfirm} showPrompt={showPrompt} />}
          {user.role === 'admin' && activeTab === 'payroll' && <PayrollModule user={user} users={users} salaries={salaries} setSalaries={setSalaries} showConfirm={showConfirm} showPrompt={showPrompt} />}
          
          {user.role === 'admin' && activeTab === 'users' && <UserManagement users={users} setUsers={setUsers} showAlert={showAlert} classes={classes} enrollments={enrollments} />}
          {user.role === 'admin' && activeTab === 'classes' && <ClassManagement classes={classes} setClasses={setClasses} users={users} />}
          {user.role === 'admin' && activeTab === 'monitoring' && <AdminMonitoring classes={classes} enrollments={enrollments} materials={materials} exams={exams} grades={grades} users={users} />}
          {user.role === 'admin' && activeTab === 'reports' && <ReportsModule users={users} classes={classes} enrollments={enrollments} grades={grades} exams={exams} onPrint={(content) => setPrintContent(content)} />}
          
          {activeTab === 'my_classes' && <MyClasses user={user} classes={classes} enrollments={enrollments} onSelectClass={(id) => { setSelectedClassId(id); setActiveTab('class_detail'); }} />}
          {activeTab === 'class_detail' && selectedClassId && <ClassDetail classId={selectedClassId} user={user} classes={classes} users={users} enrollments={enrollments} setEnrollments={setEnrollments} materials={materials} setMaterials={setMaterials} exams={exams} setExams={setExams} grades={grades} setGrades={setGrades} onBack={() => setActiveTab('my_classes')} showAlert={showAlert} />}
        </div>
      </main>
    </div>
  );
}