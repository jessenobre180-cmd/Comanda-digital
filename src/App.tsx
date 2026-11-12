import React, { useState } from 'react';
import { ComandaProvider, useComanda } from './context/ComandaContext';
import { ComandasAbertasView } from './views/ComandasAbertasView';
import { MesasView } from './views/MesasView';
import { ComandaNovaView } from './views/ComandaNovaView';
import { ComandaDetailView } from './views/ComandaDetailView';
import { ComandasFechadasView } from './views/ComandasFechadasView';
import { MaisView } from './views/MaisView';
import { CategoriaProdutosView } from './views/CategoriaProdutosView';
import { LojaView } from './views/LojaView';
import { RelatoriosView } from './views/RelatoriosView';
import { ConfiguracaoHubView } from './views/ConfiguracaoHubView';
import { ConfiguracaoGeralView } from './views/ConfiguracaoGeralView';
import { PagamentosConfigView } from './views/PagamentosConfigView';
import { PrivacidadeView } from './views/PrivacidadeView';

// Modals
import { ThermalReceipt } from './components/ThermalReceipt';
import { PrinterSelectModal } from './components/PrinterSelectModal';
import { WhatsAppShareModal } from './components/WhatsAppShareModal';
import { CloseComandaModal } from './views/CloseComandaModal';

// Icons for bottom bar
import {
  ListFilter,
  Settings,
  Smartphone,
  Maximize2,
  UtensilsCrossed,
  Layers,
  Sparkles
} from 'lucide-react';

const MainScreenRouter: React.FC = () => {
  const {
    activeScreen,
    navigateTo,
    fechadasComandas,
    receiptModalComanda,
    setReceiptModalComanda,
    receiptType,
    whatsappModalComanda,
    setWhatsappModalComanda,
    paymentModalComanda,
    setPaymentModalComanda,
  } = useComanda();

  // Show bottom navigation on primary screens
  const showBottomNav =
    activeScreen === 'home' ||
    activeScreen === 'mesas' ||
    activeScreen === 'comandas_fechadas' ||
    activeScreen === 'mais';

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <ComandasAbertasView />;
      case 'mesas':
        return <MesasView />;
      case 'comanda_nova':
        return <ComandaNovaView />;
      case 'comanda_detalhes':
        return <ComandaDetailView />;
      case 'comandas_fechadas':
        return <ComandasFechadasView />;
      case 'mais':
        return <MaisView />;
      case 'categoria_produtos':
        return <CategoriaProdutosView />;
      case 'loja':
        return <LojaView />;
      case 'relatorios':
        return <RelatoriosView />;
      case 'config_hub':
        return <ConfiguracaoHubView />;
      case 'config_geral':
        return <ConfiguracaoGeralView />;
      case 'config_pagamentos':
        return <PagamentosConfigView />;
      case 'privacidade':
        return <PrivacidadeView />;
      default:
        return <ComandasAbertasView />;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-100 select-none">
      {/* Active Screen View */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {renderScreen()}
      </div>

      {/* Bottom Navigation Bar matching Screenshot 2 */}
      {showBottomNav && (
        <div className="bg-white border-t border-slate-200 h-14 flex items-stretch shrink-0 shadow-lg select-none z-10">
          {/* Left: Comandas Fechadas matching Screenshot 2 */}
          <button
            onClick={() => navigateTo('comandas_fechadas')}
            className={`flex-1 flex items-center justify-center gap-2 font-medium text-xs sm:text-sm transition-colors border-r border-slate-200 ${
              activeScreen === 'comandas_fechadas'
                ? 'text-[#43A047] font-bold bg-green-50/50'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ListFilter className="w-5 h-5 text-[#0288D1]" />
            <span>Comandas Fechadas</span>
            {fechadasComandas.length > 0 && (
              <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {fechadasComandas.length}
              </span>
            )}
          </button>

          {/* Quick Mesas Tab */}
          <button
            onClick={() => navigateTo('mesas')}
            className={`px-4 flex items-center justify-center gap-1.5 font-medium text-xs sm:text-sm transition-colors border-r border-slate-200 ${
              activeScreen === 'mesas'
                ? 'text-[#43A047] font-bold bg-green-50/50'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
            title="Ver Mesas"
          >
            <Layers className="w-5 h-5 text-indigo-500" />
            <span className="hidden sm:inline">Mesas</span>
          </button>

          {/* Right: Mais matching Screenshot 2 */}
          <button
            onClick={() => navigateTo('mais')}
            className={`flex-1 flex items-center justify-center gap-2 font-medium text-xs sm:text-sm transition-colors ${
              activeScreen === 'mais'
                ? 'text-[#43A047] font-bold bg-green-50/50'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Settings className="w-5 h-5 text-[#0288D1]" />
            <span>Mais</span>
          </button>
        </div>
      )}

      {/* Modals */}
      {receiptModalComanda && (
        <ThermalReceipt
          comanda={receiptModalComanda}
          type={receiptType}
          onClose={() => setReceiptModalComanda(null)}
        />
      )}

      <PrinterSelectModal />

      {whatsappModalComanda && (
        <WhatsAppShareModal
          comanda={whatsappModalComanda}
          onClose={() => setWhatsappModalComanda(null)}
        />
      )}

      {paymentModalComanda && (
        <CloseComandaModal
          comanda={paymentModalComanda}
          onClose={() => setPaymentModalComanda(null)}
        />
      )}
    </div>
  );
};

export default function App() {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'full'>('mobile');

  return (
    <ComandaProvider>
      <div className="min-h-screen bg-slate-900 flex flex-col text-slate-900 font-sans">
        {/* Top App Bar with Name & Viewport Toggle */}
        <header className="bg-slate-950 text-white px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs shrink-0 z-30">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-[#43A047] flex items-center justify-center text-white font-bold text-xs shadow-xs">
              🍢
            </div>
            <div>
              <h1 className="font-bold text-slate-100 text-xs sm:text-sm tracking-tight truncate">
                Lanche e Espetinho da Irmã Jéssica
              </h1>
              <p className="text-[10px] text-emerald-400 hidden sm:block">
                Comanda Digital • Mesas, Pedidos &amp; Impressão Térmica
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile / Fullscreen toggle */}
            <div className="bg-slate-800 p-0.5 rounded-lg flex items-center text-[11px] font-medium border border-slate-700">
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                  deviceMode === 'mobile'
                    ? 'bg-[#43A047] text-white shadow-xs font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Visualização idêntica ao aplicativo móvel"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Modo Celular</span>
              </button>
              <button
                onClick={() => setDeviceMode('full')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                  deviceMode === 'full'
                    ? 'bg-[#43A047] text-white shadow-xs font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Expandir para tela cheia / computador / tablet"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tela Cheia</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 flex items-center justify-center p-0 sm:p-3 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900">
          {deviceMode === 'mobile' ? (
            /* Smartphone Frame matching screenshots */
            <div className="w-full h-full sm:h-[844px] sm:max-w-[390px] bg-black sm:rounded-[42px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_10px_#1e293b] flex flex-col overflow-hidden relative border-0 sm:border-4 sm:border-slate-800">
              {/* Phone Status Bar (Screenshot match: time, wifi, battery) */}
              <div className="bg-[#43A047] text-white text-[11px] font-semibold px-5 pt-2 pb-1 flex items-center justify-between select-none shrink-0">
                <span>04:35</span>
                {/* Camera punch hole on modern phones */}
                <div className="w-3.5 h-3.5 bg-black rounded-full hidden sm:block"></div>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <span>📶</span>
                  <span>100%</span>
                  <span>🔋</span>
                </div>
              </div>

              {/* App Screen inside phone */}
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[#F1F5F9]">
                <MainScreenRouter />
              </div>

              {/* Android Home Navigation Bar indicator matching Screenshot */}
              <div className="bg-white/95 text-slate-400 py-1 flex items-center justify-around text-xs shrink-0 border-t border-slate-200">
                <span className="cursor-pointer hover:text-slate-800">&lt;</span>
                <span className="cursor-pointer hover:text-slate-800">○</span>
                <span className="cursor-pointer hover:text-slate-800">|||</span>
              </div>
            </div>
          ) : (
            /* Fullscreen Mode for tablets and desktop */
            <div className="w-full h-full max-w-4xl bg-white sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-700">
              <MainScreenRouter />
            </div>
          )}
        </main>
      </div>
    </ComandaProvider>
  );
}
