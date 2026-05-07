import { useState } from 'react';
import Icon from '@/components/ui/icon';

export default function SettingsScreen() {
  const [aiQuality, setAiQuality] = useState<'fast' | 'balanced' | 'max'>('balanced');
  const [autoSave, setAutoSave] = useState(true);
  const [noiseRemoval, setNoiseRemoval] = useState(true);
  const [sharpening, setSharpening] = useState(true);
  const [detailRestore, setDetailRestore] = useState(false);
  const [noiseLevel, setNoiseLevel] = useState(70);
  const [sharpenLevel, setSharpenLevel] = useState(60);
  const [outputFormat, setOutputFormat] = useState<'jpg' | 'png' | 'webp'>('jpg');

  const qualities = [
    { id: 'fast', label: 'Быстро', sub: '~5 сек', icon: 'Zap', color: '#f97316' },
    { id: 'balanced', label: 'Баланс', sub: '~15 сек', icon: 'Scale', color: '#06b6d4' },
    { id: 'max', label: 'Максимум', sub: '~45 сек', icon: 'Crown', color: '#a855f7' },
  ];

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <div className={`toggle-track ${value ? 'active' : ''}`} onClick={onChange}>
      <div className="toggle-thumb" />
    </div>
  );

  return (
    <div className="relative z-10 px-5 pt-14 pb-6 min-h-[calc(100dvh-80px)]">
      {/* Header */}
      <div className="mb-6 animate-fade-in-up opacity-0-init" style={{ animationFillMode: 'forwards' }}>
        <h1 className="text-2xl font-bold font-golos text-white">Настройки</h1>
        <p className="text-white/40 text-sm mt-1 font-rubik">Параметры обработки и приложения</p>
      </div>

      {/* AI Quality */}
      <div className="mb-5 animate-fade-in-up opacity-0-init delay-100" style={{ animationFillMode: 'forwards' }}>
        <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-3">Качество ИИ-обработки</p>
        <div className="grid grid-cols-3 gap-3">
          {qualities.map((q) => (
            <button
              key={q.id}
              className="flex flex-col items-center gap-2 py-4 rounded-2xl transition-all duration-200"
              style={{
                background: aiQuality === q.id ? `${q.color}18` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${aiQuality === q.id ? q.color + '55' : 'rgba(255,255,255,0.08)'}`,
                transform: aiQuality === q.id ? 'scale(1.03)' : 'scale(1)',
              }}
              onClick={() => setAiQuality(q.id as 'fast' | 'balanced' | 'max')}
            >
              <Icon name={q.icon} fallback="Star" size={22} style={{ color: aiQuality === q.id ? q.color : 'rgba(255,255,255,0.3)' }} />
              <div>
                <p className="text-xs font-semibold font-rubik" style={{ color: aiQuality === q.id ? q.color : 'rgba(255,255,255,0.6)' }}>{q.label}</p>
                <p className="text-xs text-white/30">{q.sub}</p>
              </div>
              {aiQuality === q.id && (
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: q.color }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="mb-5 animate-fade-in-up opacity-0-init delay-200" style={{ animationFillMode: 'forwards' }}>
        <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-3">Функции</p>
        <div className="glass-card divide-y divide-white/5">
          {[
            { label: 'Удаление шума', sub: 'Убирает зернистость и артефакты', icon: 'Wind', value: noiseRemoval, toggle: () => setNoiseRemoval(!noiseRemoval), color: '#a855f7' },
            { label: 'Повышение резкости', sub: 'Чёткость краёв и деталей', icon: 'Focus', value: sharpening, toggle: () => setSharpening(!sharpening), color: '#06b6d4' },
            { label: 'Восстановление деталей', sub: 'ИИ-реконструкция из размытых фото', icon: 'Sparkles', value: detailRestore, toggle: () => setDetailRestore(!detailRestore), color: '#ec4899' },
            { label: 'Авто-сохранение', sub: 'Сохранять в галерею после обработки', icon: 'Save', value: autoSave, toggle: () => setAutoSave(!autoSave), color: '#f97316' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${item.color}18`, border: `1px solid ${item.color}33` }}>
                <Icon name={item.icon} fallback="Star" size={16} style={{ color: item.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/90 text-sm font-medium font-rubik">{item.label}</p>
                <p className="text-white/35 text-xs mt-0.5">{item.sub}</p>
              </div>
              <Toggle value={item.value} onChange={item.toggle} />
            </div>
          ))}
        </div>
      </div>

      {/* Sliders */}
      <div className="mb-5 animate-fade-in-up opacity-0-init delay-300" style={{ animationFillMode: 'forwards' }}>
        <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-3">Интенсивность</p>
        <div className="glass-card p-4 flex flex-col gap-5">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-white/60 text-sm font-rubik">Удаление шума</span>
              <span className="text-sm font-semibold" style={{ color: '#a855f7' }}>{noiseLevel}%</span>
            </div>
            <input type="range" min={0} max={100} value={noiseLevel}
              onChange={e => setNoiseLevel(Number(e.target.value))}
              className="slider-custom" style={{ accentColor: '#a855f7' }} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-white/60 text-sm font-rubik">Резкость</span>
              <span className="text-sm font-semibold" style={{ color: '#06b6d4' }}>{sharpenLevel}%</span>
            </div>
            <input type="range" min={0} max={100} value={sharpenLevel}
              onChange={e => setSharpenLevel(Number(e.target.value))}
              className="slider-custom" style={{ accentColor: '#06b6d4' }} />
          </div>
        </div>
      </div>

      {/* Output Format */}
      <div className="animate-fade-in-up opacity-0-init delay-400" style={{ animationFillMode: 'forwards' }}>
        <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-3">Формат сохранения</p>
        <div className="flex gap-3">
          {(['jpg', 'png', 'webp'] as const).map(fmt => (
            <button
              key={fmt}
              className="flex-1 py-3 rounded-2xl text-sm font-semibold font-rubik uppercase tracking-wider transition-all duration-200"
              style={{
                background: outputFormat === fmt ? 'linear-gradient(135deg, #a855f7, #ec4899)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${outputFormat === fmt ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
                color: outputFormat === fmt ? 'white' : 'rgba(255,255,255,0.4)',
                boxShadow: outputFormat === fmt ? '0 4px 20px rgba(168,85,247,0.3)' : 'none',
              }}
              onClick={() => setOutputFormat(fmt)}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
