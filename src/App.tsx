import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Icon from '@/components/ui/icon';
import UploadScreen from '@/pages/UploadScreen';
import EditorScreen from '@/pages/EditorScreen';
import SettingsScreen from '@/pages/SettingsScreen';
import GalleryScreen from '@/pages/GalleryScreen';

type Screen = 'upload' | 'editor' | 'settings' | 'gallery';

const queryClient = new QueryClient();

const navItems = [
  { id: 'upload', icon: 'ImagePlus', label: 'Загрузка' },
  { id: 'gallery', icon: 'Images', label: 'Галерея' },
  { id: 'settings', icon: 'Settings2', label: 'Настройки' },
] as const;

function PhotoApp() {
  const [screen, setScreen] = useState<Screen>('upload');
  const [photo, setPhoto] = useState<string | null>(null);

  const handlePhotoSelect = (src: string) => {
    setPhoto(src);
    setScreen('editor');
  };

  const handleSave = () => {
    setScreen('gallery');
  };

  const handleBack = () => {
    setPhoto(null);
    setScreen('upload');
  };

  const activeNav = screen === 'editor' ? 'upload' : screen;

  return (
    <div className="app-container">
      <div className="bg-mesh" />

      <main>
        {screen === 'upload' && (
          <UploadScreen onPhotoSelect={handlePhotoSelect} />
        )}
        {screen === 'editor' && photo && (
          <EditorScreen photo={photo} onBack={handleBack} onSave={handleSave} />
        )}
        {screen === 'gallery' && (
          <GalleryScreen />
        )}
        {screen === 'settings' && (
          <SettingsScreen />
        )}
      </main>

      {/* Bottom Navigation */}
      {screen !== 'editor' && (
        <nav className="bottom-nav">
          <div className="flex items-center justify-around px-4 py-3">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  className="flex flex-col items-center gap-1.5 px-5 py-2 rounded-2xl transition-all duration-300"
                  style={{
                    background: isActive ? 'rgba(168,85,247,0.12)' : 'transparent',
                    border: isActive ? '1px solid rgba(168,85,247,0.2)' : '1px solid transparent',
                  }}
                  onClick={() => setScreen(item.id as Screen)}
                >
                  <div className="relative">
                    <Icon
                      name={item.icon}
                      fallback="Circle"
                      size={22}
                      style={{
                        color: isActive ? '#a855f7' : 'rgba(255,255,255,0.35)',
                        transition: 'color 0.3s ease',
                        filter: isActive ? 'drop-shadow(0 0 6px rgba(168,85,247,0.6))' : 'none',
                      }}
                    />
                    {isActive && (
                      <div
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: '#a855f7' }}
                      />
                    )}
                  </div>
                  <span
                    className="text-xs font-rubik font-medium transition-colors duration-300"
                    style={{ color: isActive ? '#a855f7' : 'rgba(255,255,255,0.3)' }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {/* Floating logo */}
      {screen !== 'editor' && (
        <div
          className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
            <Icon name="Sparkles" size={11} className="text-white" />
          </div>
          <span className="text-white/80 text-xs font-semibold font-golos tracking-wide">ФотоРеставратор</span>
        </div>
      )}
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <PhotoApp />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
