import HeroSection from '@/components/sections/HeroSection';
import WorrySection from '@/components/sections/WorrySection';

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden p-0 m-0">
      <HeroSection />
      <WorrySection />
      {/* 他のセクションはここに追加していく */}
    </main>
  );
}