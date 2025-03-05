'use client';

import React from 'react';

export default function WorrySection() {
  return (
    <section className="relative w-full overflow-visible">
      {/* 背景画像 - 上のセクションに重なるように調整 */}
      <div 
        className="w-full mt-[-150px] sm:mt-[-150px] md:mt-[-150px] lg:mt-[-400px]"
      >
        <img 
          src="/images/default-bg-image.png" 
          alt="Worry section background" 
          className="w-full h-auto object-contain relative z-10"
        />
      </div>
      
      {/* コンテンツエリア - z-indexを高くしてコンテンツが背景の上に表示されるようにする */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none mt-[-30px] sm:mt-[-60px] md:mt-[-90px] lg:mt-[-120px]">
        <div className="container mx-auto h-full pointer-events-auto relative z-20">
          {/* ここに悩みセクションのコンテンツが入ります */}
        </div>
      </div>
    </section>
  );
} 