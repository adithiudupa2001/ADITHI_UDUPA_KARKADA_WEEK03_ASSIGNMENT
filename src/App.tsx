import { useState } from 'react';
import { Header } from './components/Header';
import { AdoptScreen } from './components/AdoptScreen';
import { EnquiryScreen } from './components/EnquiryScreen';
import { SupportScreen } from './components/SupportScreen';
import { Footer } from './components/Footer';
import { ANIMALS } from './data';
import { ActionType, Animal, ScreenType } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('adopt');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal>(ANIMALS[0]);
  const [selectedAction, setSelectedAction] = useState<ActionType>('visit');

  const handleSelectAction = (animal: Animal, action: ActionType) => {
    setSelectedAnimal(animal);
    setSelectedAction(action);
    setCurrentScreen('enquiry');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF7F2] text-warmgray-800 font-sans selection:bg-orange-100 selection:text-terracotta-600 antialiased">
      {/* Sticky Global Navigation */}
      <Header currentScreen={currentScreen} onNavigate={handleNavigate} />

      {/* Main View Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full flex-grow">
        {currentScreen === 'adopt' && (
          <AdoptScreen animals={ANIMALS} onSelectAction={handleSelectAction} />
        )}

        {currentScreen === 'enquiry' && (
          <EnquiryScreen
            animal={selectedAnimal}
            actionType={selectedAction}
            onBack={() => handleNavigate('adopt')}
          />
        )}

        {currentScreen === 'support' && (
          <SupportScreen onBackToAdopt={() => handleNavigate('adopt')} />
        )}
      </main>

      {/* Global Reassurance Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
