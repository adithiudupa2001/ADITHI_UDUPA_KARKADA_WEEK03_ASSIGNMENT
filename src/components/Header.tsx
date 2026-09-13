import React from 'react';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E1DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Logo and brand name */}
        <button
          id="header-home-btn"
          aria-label="Home"
          className="flex items-center gap-3 text-left focus:outline-none tap-scale group"
          onClick={() => onNavigate('adopt')}
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-terracotta-500 text-white flex items-center justify-center font-bold text-xl shadow-sm group-hover:bg-terracotta-600 transition-colors">
            🐾
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-lg lg:text-xl text-warmgray-900 tracking-tight leading-none">
                Paws &amp; Home SG
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 tracking-wide">
                STUDENT PROJECT
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-warmgray-600 font-medium mt-0.5 sm:mt-1">
              Singapore Stray Adoption &amp; Aftercare
            </p>
          </div>
        </button>

        {/* Center Meta Pills on Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E1DA] text-xs text-warmgray-700 shadow-xs">
            <span className="text-terracotta-500 text-sm">📍</span>
            <span>Pasir Ris Farmway 1, Singapore</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>SMU MGMT 6110</span>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <nav className="flex items-center bg-[#E8E1DA]/60 sm:bg-transparent p-1 sm:p-0 rounded-full border border-[#D6CBC0]/60 sm:border-0 gap-1.5 sm:gap-3">
          <button
            id="nav-btn-adopt"
            onClick={() => onNavigate('adopt')}
            className={`px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full sm:rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
              currentScreen === 'adopt' || currentScreen === 'enquiry'
                ? 'bg-terracotta-500 text-white shadow-sm hover:bg-terracotta-600'
                : 'text-warmgray-800 hover:text-warmgray-900 sm:bg-white sm:border sm:border-[#D6CBC0]'
            }`}
          >
            <span className="sm:hidden">Rescues</span>
            <span className="hidden sm:inline">Meet Rescues</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
