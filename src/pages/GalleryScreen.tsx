import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface GalleryItem {
  id: number;
  src: string;
  date: string;
  method: string;
  color: string;
}

const MOCK_ITEMS: GalleryItem[] = [
  { id: 1, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop', date: '7 мая 2026', method: 'Шум + Резкость', color: '#a855f7' },
  { id: 2, src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=400&fit=crop', date: '6 мая 2026', method: 'Восстановление', color: '#06b6d4' },
  { id: 3, src: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=400&h=300&fit=crop', date: '5 мая 2026', method: 'Детали + Цвет', color: '#ec4899' },
  { id: 4, src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop', date: '4 мая 2026', method: 'Резкость', color: '#f97316' },
  { id: 5, src: 'https://images.unsplash.com/photo-1540206395-68808572332f?w=400&h=300&fit=crop', date: '3 мая 2026', method: 'Шум', color: '#a855f7' },
  { id: 6, src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=400&fit=crop', date: '2 мая 2026', method: 'Макс. качество', color: '#06b6d4' },
];

export default function GalleryScreen() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'today' | 'week'>('all');

  const filters = [
    { id: 'all', label: 'Все' },
    { id: 'today', label: 'Сегодня' },
    { id: 'week', label: 'Неделя' },
  ];

  return (
    <div className="relative z-10 px-5 pt-14 pb-6 min-h-[calc(100dvh-80px)]">
      {/* Header */}
      <div className="flex items-end justify-between mb-5 animate-fade-in-up opacity-0-init" style={{ animationFillMode: 'forwards' }}>
        <div>
          <h1 className="text-2xl font-bold font-golos text-white">Галерея</h1>
          <p className="text-white/40 text-sm mt-0.5 font-rubik">{MOCK_ITEMS.length} обработанных фото</p>
        </div>
        <button className="w-10 h-10 glass-card flex items-center justify-center">
          <Icon name="SlidersHorizontal" size={16} style={{ color: '#a855f7' }} />
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 animate-fade-in-up opacity-0-init delay-100" style={{ animationFillMode: 'forwards' }}>
        {filters.map(f => (
          <button
            key={f.id}
            className="px-4 py-2 rounded-full text-sm font-medium font-rubik transition-all duration-200"
            style={{
              background: filter === f.id ? 'linear-gradient(135deg, #a855f7, #ec4899)' : 'rgba(255,255,255,0.06)',
              color: filter === f.id ? 'white' : 'rgba(255,255,255,0.4)',
              border: filter === f.id ? 'none' : '1px solid rgba(255,255,255,0.08)',
            }}
            onClick={() => setFilter(f.id as 'all' | 'today' | 'week')}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 animate-fade-in-up opacity-0-init delay-200" style={{ animationFillMode: 'forwards' }}>
        {MOCK_ITEMS.map((item, i) => (
          <div
            key={item.id}
            className="gallery-item"
            style={{ aspectRatio: i % 3 === 2 ? '16/9' : '1/1', animationDelay: `${i * 0.05}s` }}
            onClick={() => setSelected(item)}
          >
            <img
              src={item.src}
              alt="Фото"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
            <div className="absolute bottom-0 left-0 right-0 z-20 p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                <span className="text-xs text-white/70 font-rubik">{item.method}</span>
              </div>
              <p className="text-xs text-white/40 font-rubik">{item.date}</p>
            </div>
            <div className="absolute top-2 right-2 z-20">
              <div className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: `${item.color}33`, border: `1px solid ${item.color}55` }}>
                <Icon name="CheckCircle" size={12} style={{ color: item.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full-screen preview */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex flex-col animate-fade-in"
          style={{ background: 'rgba(8,11,20,0.97)', backdropFilter: 'blur(20px)' }}
          onClick={() => setSelected(null)}
        >
          <div className="flex items-center justify-between px-5 pt-14 pb-4" onClick={e => e.stopPropagation()}>
            <button className="w-10 h-10 glass-card flex items-center justify-center" onClick={() => setSelected(null)}>
              <Icon name="X" size={18} className="text-white" />
            </button>
            <span className="text-white font-semibold font-golos">{selected.date}</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-full"
              style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
              <Icon name="Share2" size={16} className="text-white" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center px-5" onClick={e => e.stopPropagation()}>
            <img src={selected.src} alt="Фото" className="w-full rounded-3xl object-cover animate-scale-in"
              style={{ maxHeight: '60dvh' }} />
          </div>

          <div className="px-5 py-6" onClick={e => e.stopPropagation()}>
            <div className="glass-card p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${selected.color}22`, border: `1px solid ${selected.color}44` }}>
                <Icon name="Sparkles" size={18} style={{ color: selected.color }} />
              </div>
              <div>
                <p className="text-white font-semibold text-sm font-rubik">{selected.method}</p>
                <p className="text-white/40 text-xs mt-0.5">{selected.date}</p>
              </div>
              <button className="ml-auto btn-neon px-4 py-2 text-sm">
                <span className="relative z-10">Скачать</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
