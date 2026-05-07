import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Props {
  photo: string;
  onBack: () => void;
  onSave: () => void;
}

export default function EditorScreen({ photo, onBack, onSave }: Props) {
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showOriginal, setShowOriginal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);

  const handleProcess = () => {
    setProcessing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          setProcessed(true);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
  };

  const filters = [
    { id: 'denoise', icon: 'Wind', label: 'Шум', color: '#a855f7' },
    { id: 'sharpen', icon: 'Focus', label: 'Резкость', color: '#06b6d4' },
    { id: 'restore', icon: 'Sparkles', label: 'Детали', color: '#ec4899' },
    { id: 'color', icon: 'Palette', label: 'Цвет', color: '#f97316' },
  ];

  const imgStyle: React.CSSProperties = {
    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
    transition: 'filter 0.3s ease',
  };

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100dvh-80px)]">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4 animate-fade-in">
        <button
          className="w-10 h-10 glass-card flex items-center justify-center"
          onClick={onBack}
        >
          <Icon name="ArrowLeft" size={18} className="text-white" />
        </button>
        <span className="text-white font-semibold font-golos">Редактор</span>
        <button
          className="w-10 h-10 glass-card flex items-center justify-center"
          onClick={() => onSave()}
        >
          <Icon name="Download" size={18} style={{ color: '#a855f7' }} />
        </button>
      </div>

      {/* Image */}
      <div className="relative mx-5 rounded-3xl overflow-hidden animate-scale-in" style={{ aspectRatio: '4/3' }}>
        <img
          src={photo}
          alt="Фото"
          className="w-full h-full object-cover"
          style={showOriginal ? {} : imgStyle}
        />

        {/* Processing overlay */}
        {processing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            style={{ background: 'rgba(8,11,20,0.85)', backdropFilter: 'blur(8px)' }}>
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full animate-spin-slow"
                style={{ background: 'conic-gradient(from 0deg, #a855f7, #ec4899, transparent)', padding: 3 }}>
                <div className="w-full h-full rounded-full bg-[#080b14]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon name="Sparkles" size={28} style={{ color: '#a855f7' }} />
              </div>
            </div>
            <div className="text-center">
              <p className="text-white font-semibold font-rubik">{progress}%</p>
              <p className="text-white/50 text-xs mt-1">Обрабатываем фото...</p>
            </div>
            <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-100"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #a855f7, #ec4899)' }}
              />
            </div>
          </div>
        )}

        {/* Processed badge */}
        {processed && !processing && (
          <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full animate-scale-in"
            style={{ background: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.4)', backdropFilter: 'blur(10px)' }}>
            <Icon name="CheckCircle" size={14} style={{ color: '#a855f7' }} />
            <span className="text-xs text-white/80 font-medium">Восстановлено</span>
          </div>
        )}

        {/* Before/After toggle */}
        <button
          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full text-xs font-medium text-white"
          style={{ background: 'rgba(8,11,20,0.7)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
          onPointerDown={() => setShowOriginal(true)}
          onPointerUp={() => setShowOriginal(false)}
          onPointerLeave={() => setShowOriginal(false)}
        >
          {showOriginal ? 'Оригинал' : 'Удержи для сравнения'}
        </button>
      </div>

      {/* Process button */}
      {!processed && (
        <div className="px-5 mt-4">
          <button
            className="btn-neon w-full py-4 flex items-center justify-center gap-3 text-base font-semibold"
            onClick={handleProcess}
            disabled={processing}
          >
            <span className="relative z-10 flex items-center gap-3">
              <Icon name="Wand2" size={20} className="text-white" />
              {processing ? 'Обработка...' : 'Восстановить фото'}
            </span>
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="px-5 mt-5">
        <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-3">Инструменты</p>
        <div className="grid grid-cols-4 gap-3">
          {filters.map((f) => (
            <button
              key={f.id}
              className="flex flex-col items-center gap-2 py-3 rounded-2xl transition-all duration-200"
              style={{
                background: activeFilter === f.id ? `${f.color}22` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${activeFilter === f.id ? f.color + '66' : 'rgba(255,255,255,0.08)'}`,
                transform: activeFilter === f.id ? 'scale(1.05)' : 'scale(1)',
              }}
              onClick={() => setActiveFilter(activeFilter === f.id ? null : f.id)}
            >
              <Icon name={f.icon} fallback="Star" size={20} style={{ color: activeFilter === f.id ? f.color : 'rgba(255,255,255,0.5)' }} />
              <span className="text-xs font-rubik" style={{ color: activeFilter === f.id ? f.color : 'rgba(255,255,255,0.4)' }}>{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sliders */}
      <div className="px-5 mt-5 mb-4">
        <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-3">Параметры</p>
        <div className="glass-card p-4 flex flex-col gap-5">
          {[
            { label: 'Яркость', value: brightness, setter: setBrightness, color: '#f97316' },
            { label: 'Контраст', value: contrast, setter: setContrast, color: '#06b6d4' },
            { label: 'Насыщенность', value: saturation, setter: setSaturation, color: '#a855f7' },
          ].map((s) => (
            <div key={s.label}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60 text-sm font-rubik">{s.label}</span>
                <span className="text-sm font-semibold" style={{ color: s.color }}>{s.value}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={150}
                value={s.value}
                onChange={(e) => s.setter(Number(e.target.value))}
                className="slider-custom"
                style={{ accentColor: s.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}