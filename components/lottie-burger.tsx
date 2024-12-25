'use client';

import Lottie from 'lottie-react';
import animationData from './animations/barbers-spinner.json';

interface LottieBurgerProps {
  width?: number;
  height?: number;
  onClickAction: () => void;
}

export function LottieBurger({ onClickAction, width = 20, height = 20 }: LottieBurgerProps) {
  return (
    <div style={{ width, height }} className='cursor-pointer' onClick={onClickAction}>
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        className='h-full w-full scale-150 transition-all duration-300 active:scale-100'
      />
    </div>
  );
}
