'use client';

import React, { useEffect, useState } from 'react';

export default function HeroSection() {
  const [windowWidth, setWindowWidth] = useState(0);

  // 画面サイズの変更を監視
  useEffect(() => {
    // クライアントサイドでのみ実行
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // 初期値を設定
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // スマホかどうかの判定（例：768px未満をスマホとする）
  const isMobile = windowWidth < 768;

  return (
    <section className="relative w-full overflow-visible">
      {/* 背景画像コンテナ - 高さをautoに変更して画像の本来の高さを維持 */}
      <div className="w-full">
        <img 
          src="/images/hero-bg-image.png" 
          alt="Hero background" 
          className="w-full h-auto object-contain"
        />
      </div>
      
      {/* コンテンツエリア - 絶対配置を使わず、画像の上にオーバーレイ */}
      <div className="container mx-auto relative z-10 mt-[-100%] pointer-events-none">
        <div className="pointer-events-auto">
          {/* ここにheroセクションのコンテンツを追加 */}
        </div>
      </div>
    </section>
  );
}