'use client';

import React, { useEffect, useState } from 'react';

export default function HeroSection() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

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
      const leftMargin = Math.max(20, (windowWidth - 768) / (1024 - 768) * 170 + 20); // 30px減少
      return {
        marginLeft: `${leftMargin}px`,
        marginTop: '250px',
        maxWidth: '70%'
      };
    } else {
      // デスクトップ表示 - 指定された位置 (30px左に移動)
      return {
        marginLeft: '220px', // 250px - 30px
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
      const leftMargin = Math.max(20, (windowWidth - 768) / (1024 - 768) * 170 + 20) - 30; // 30px減少
      return {
        marginLeft: `${leftMargin}px`,
        marginTop: '20px',
        maxWidth: '70%'
      };
    } else {
      // デスクトップ表示 - タイトルより80px左（30px分左に移動）
      return {
        marginLeft: '140px', // 170px - 30px
        marginTop: '20px'
      };
    }
  };

  // MEO画像の位置計算 - 1450px以上のみ表示
  const getMeoImageStyles = () => {
    if (windowWidth < 1450) {
      // 1450px未満では非表示
      return {
        display: 'none'
      };
    } else {
      // 1450px以上 - 右から200px、位置を微調整
      return {
        position: 'absolute' as const,
        right: '200px',
        top: '276px', // 16px下に調整（260px + 16px）
        maxWidth: '300px' // 適宜調整
      };
    }
  };

  // ボックスのスタイル計算
  const getBoxStyles = () => {
    // ベーススタイル
    const baseStyles = {
      borderRadius: '30px',
      background: '#E2EAF2',
      boxShadow: '4px 8px 20px 0px rgba(20, 0, 61, 0.25)',
      padding: '70px 80px',
      position: 'absolute' as const,
      left: '0',
      right: '0',
      marginLeft: 'auto',
      marginRight: 'auto',
      minHeight: '300px',
      zIndex: 11,
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center'
    };

    // PCサイズ (1024px以上)
    if (windowWidth >= 1024) {
      return {
        ...baseStyles,
        width: 'calc(100% - 620px)', // 左右310pxの余白
        marginTop: windowWidth >= 1450 ? '120px' : '90px', // 値をさらに小さく調整
      };
    } 
    // タブレットサイズ
    else if (isTablet) {
      // 余白を比例的に調整
      const horizontalMargin = Math.max(40, (windowWidth - 768) / (1024 - 768) * 270 + 40);
      return {
        ...baseStyles,
        width: `calc(100% - ${horizontalMargin * 2}px)`,
        marginTop: '70px', // 値をさらに小さく調整
        padding: '50px 60px',
      };
    } 
    // モバイルサイズ
    else {
      return {
        ...baseStyles,
        width: 'calc(100% - 40px)', // 左右20pxの余白
        marginTop: '50px', // 値をさらに小さく調整
        padding: '40px 30px',
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
        {/* モバイル用背景画像 (767px以下で表示) */}
        {windowWidth <= 767 && (
          <img 
            src="/images/hero-mobile-bg-image.png" 
            alt="Mobile hero background" 
            className="w-full h-auto object-contain"
            style={{ marginTop: '-4px', position: 'relative' }}
          />
        )}
      </div>
      
      {/* コンテンツエリア */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="container mx-auto h-full pointer-events-auto relative">
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
          
          {/* MEO画像 - PCのみ表示 */}
          <div style={getMeoImageStyles()}>
            <img 
              src="/images/meo-image.png" 
              alt="MEO" 
              className="max-w-full h-auto"
            />
          </div>

          {/* 新しいボックス */}
          <div style={getBoxStyles()}>
            <img 
              src="/images/locoreach-q.png" 
              alt="ロコリーチ" 
              className="max-w-full h-auto"
            />
            <div style={{ 
              marginTop: '36px', 
              textAlign: 'center', 
              color: '#10003C',
              fontFamily: '"Zen Kaku Gothic New"',
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '44px',
              letterSpacing: '1.44px'
            }}>
              <p>ロコリーチとはMEO対策ができるAI搭載型の集客サービスです。</p>
              <p>AIを活用することで投稿や多言語での対応にかかる運用代行費が不要になり、</p>
              <p>Google、Instagram、インバウンド３つの対策がまとめて可能です。</p>
              <p style={{ marginTop: '16px' }}>コストを最低限に抑えながら、最高品質の MEO対策ができるサービスを実現しました。</p>
              
              <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
                <button 
                  style={{
                    width: '332px',
                    height: '44px',
                    background: `linear-gradient(94deg, #B3E3FC 0%, #84C7ED 11%, #55ABDE 23%, #3094D3 35%, #1585CA 45%, #057BC5 55%, #0078C4 63%, #047DC7 70%, #118ED2 80%, #26AAE4 92%, #39C2F4 100%)`,
                    borderRadius: '28px',
                    color: '#FFF',
                    textAlign: 'center',
                    fontFamily: '"Zen Kaku Gothic New"',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    letterSpacing: '1.2px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: isButtonHovered ? 'translateY(-3px) scale(1.03)' : 'translateY(0) scale(1)',
                    boxShadow: isButtonHovered ? '0 10px 20px rgba(20, 0, 61, 0.2)' : '0 4px 6px rgba(20, 0, 61, 0.1)',
                  }}
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                >
                  サービス詳細ページへ →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}