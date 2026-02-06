import React, { useState, useEffect } from 'react';
import Layout from './components/layout';
import PrinciplesGrid from './components/principles';
import Assessment from './components/Assessment';
import GeminiChat from './components/GeminiChat';
import { View } from './types';
import { getDailyReflection } from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [reflection, setReflection] = useState<string>('');
  const [loadingReflection, setLoadingReflection] = useState(false);

  useEffect(() => {
    fetchReflection();
  }, []);

  const fetchReflection = async () => {
    setLoadingReflection(true);
    const res = await getDailyReflection();
    setReflection(res);
    setLoadingReflection(false);
  };

  const renderContent = () => {
    switch (currentView) {
      case View.HOME:
        return (
          <div className="space-y-12 animate-fadeIn">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-[3.5rem] bg-slate-900 text-white p-10 md:p-16 lg:p-20 shadow-2xl">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest">
                    <span className="flex h-2 w-2 rounded-full bg-teal-400 mr-2 animate-pulse" />
                    {/* ...rest of your content */}
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout currentView={currentView} setCurrentView={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

export default App;

