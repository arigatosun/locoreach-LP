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

  // スマホかどうかの判定（768px未満をスマホとする）
  const isMobile = windowWidth < 768;
  
  // タブレットサイズの判定（768px以上1024px未満）
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  
  // タイトル画像の位置計算
  const getTitleStyles = () => {
    if (isMobile) {
      // モバイル表示 - 中央配置
      return {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '150px',
        textAlign: 'center' as const,
        maxWidth: '80%'
      };
    } else if (isTablet) {
      // タブレット表示 - 左余白を段階的に減少
      const leftMargin = Math.max(50, (windowWidth - 768) / (1024 - 768) * 200 + 50);
      return {
        marginLeft: `${leftMargin}px`,
        marginTop: '250px',
        maxWidth: '70%'
      };
    } else {
      // デスクトップ表示 - 指定された位置
      return {
        marginLeft: '250px',
        marginTop: '320px'
      };
    }
  };
  
  // サブタイトル画像の位置計算
  const getSubtitleStyles = () => {
    if (isMobile) {
      // モバイル表示 - 左右マージンなしで上のマージンのみ維持
      return {
        marginLeft: '0',
        marginRight: '0',
        marginTop: '20px',
        textAlign: 'center' as const,
        width: '100%'  // 幅を100%に設定して左右いっぱいに広げる
      };
    } else if (isTablet) {
      // タブレット表示 - タイトルより少し左（画面サイズに応じて調整）
      const leftMargin = Math.max(50, (windowWidth - 768) / (1024 - 768) * 200 + 50) - 30;
      return {
        marginLeft: `${leftMargin}px`,
        marginTop: '20px',
        maxWidth: '70%'
      };
    } else {
      // デスクトップ表示 - タイトルより80px左（変更なし）
      return {
        marginLeft: '170px', // 250px - 80px
        marginTop: '20px'
      };
    }
  };

  return (
    <section className="relative w-full overflow-visible">
      {/* 背景画像 */}
      <div className="w-full">
        <img 
          src="/images/hero-bg-image.png" 
          alt="Hero background" 
          className="w-full h-auto object-contain"
        />
      </div>
      
      {/* コンテンツエリア */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="container mx-auto h-full pointer-events-auto">
          {/* タイトル画像 */}
          <div style={getTitleStyles()}>
            <img 
              src="/images/title-image.png" 
              alt="タイトル" 
              className="max-w-full h-auto"
            />
          </div>
          
          {/* サブタイトル画像 */}
          <div style={getSubtitleStyles()}>
            <img 
              src="/images/sub-title-image.png" 
              alt="サブタイトル" 
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}