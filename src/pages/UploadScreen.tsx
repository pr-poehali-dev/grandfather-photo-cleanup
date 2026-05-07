import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';

interface Props {
  onPhotoSelect: (photo: string) => void;
}

export default function UploadScreen({ onPhotoSelect }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      setTimeout(() => {
        setIsLoading(false);
        onPhotoSelect(e.target?.result as string);
      }, 1200);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const features = [
    { icon: 'Zap', label: 'Удаление шума', color: '#a855f7' },
    { icon: 'Focus', label: 'Повышение резкости', color: '#06b6d4' },
    { icon: 'Sparkles', label: 'Восстановление деталей', color: '#ec4899' },
  ];

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100dvh-80px)] px-5 pt-14 pb-6">
      {/* Header */}
      <div className="animate-fade-in-up opacity-0-init" style={{ animationDelay: '0s', animationFillMode: 'forwards' }}>
        <div className="flex items-center gap-2 mb-1">
          <div className="tag-badge">ИИ-обработка</div>
        </div>
        <h1 className="text-3xl font-bold font-golos text-white mt-3 leading-tight">
          Восстанови<br />
          <span style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            любое фото
          </span>
        </h1>
        <p className="text-white/50 text-sm mt-2 font-rubik">
          Загрузи старое, размытое или повреждённое фото
        </p>
      </div>

      {/* Upload Zone */}
      <div
        className="upload-zone mt-8 py-12 flex flex-col items-center justify-center gap-4 animate-fade-in-up opacity-0-init delay-200"
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        style={{
          borderColor: isDragging ? 'rgba(168,85,247,0.9)' : undefined,
          background: isDragging ? 'rgba(168,85,247,0.15)' : undefined,
          animationFillMode: 'forwards',
        }}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleInputChange}
        />

        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
              <div className="animate-spin-slow">
                <Icon name="Loader2" size={28} className="text-white" />
              </div>
            </div>
            <div className="w-48">
              <div className="progress-bar" />
            </div>
            <p className="text-white/60 text-sm">Загружаем фото...</p>
          </div>
        ) : (
          <>
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center animate-pulse-glow"
              style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))', border: '1px solid rgba(168,85,247,0.3)' }}
            >
              <Icon name="ImagePlus" size={36} style={{ color: '#a855f7' }} />
            </div>
            <div className="text-center">
              <p className="text-white font-semibold text-base font-rubik">Нажми или перетащи фото</p>
              <p className="text-white/40 text-xs mt-1">JPG, PNG, HEIC · до 20 МБ</p>
            </div>
          </>
        )}
      </div>

      {/* Camera button */}
      <button
        className="btn-neon btn-cyan w-full py-4 mt-4 flex items-center justify-center gap-3 text-base font-semibold animate-fade-in-up opacity-0-init delay-300"
        style={{ animationFillMode: 'forwards' }}
        onClick={() => fileRef.current?.click()}
      >
        <span className="relative z-10 flex items-center gap-3">
          <Icon name="Camera" size={20} className="text-white" />
          Снять на камеру
        </span>
      </button>

      {/* Features */}
      <div className="mt-8 animate-fade-in-up opacity-0-init delay-400" style={{ animationFillMode: 'forwards' }}>
        <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-4">Что умеет приложение</p>
        <div className="flex flex-col gap-3">
          {features.map((f, i) => (
            <div key={i} className="glass-card px-4 py-3 flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${f.color}22`, border: `1px solid ${f.color}44` }}
              >
                <Icon name={f.icon} fallback="Star" size={18} style={{ color: f.color }} />
              </div>
              <span className="text-white/80 text-sm font-medium font-rubik">{f.label}</span>
              <Icon name="ChevronRight" size={16} className="text-white/20 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}