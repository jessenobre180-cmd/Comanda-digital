import React, { useState } from 'react';
import { useComanda } from '../context/ComandaContext';
import { Printer, Bluetooth, Wifi, Usb, Check, X, RefreshCw } from 'lucide-react';

export const PrinterSelectModal: React.FC = () => {
  const { printerModalOpen, setPrinterModalOpen, settings, updateSettings } = useComanda();
  const [selectedType, setSelectedType] = useState(settings.printerType || 'navegador');
  const [scanning, setScanning] = useState(false);
  const [testPrinted, setTestPrinted] = useState(false);

  if (!printerModalOpen) return null;

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
    }, 1200);
  };

  const handleTestPrint = () => {
    setTestPrinted(true);
    setTimeout(() => {
      window.print();
      setTestPrinted(false);
    }, 300);
  };

  const handleConfirm = () => {
    updateSettings({ printerType: selectedType });
    setPrinterModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#FFB300] text-slate-900 px-4 py-3 flex items-center justify-between font-bold text-sm">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5" />
            <span>Selecionar Impressora</span>
          </div>
          <button
            onClick={() => setPrinterModalOpen(false)}
            className="p-1 hover:bg-black/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <p className="text-xs text-slate-500">
            Escolha o método de conexão com sua impressora térmica de comandas (58mm / 80mm):
          </p>

          <div className="space-y-2">
            {/* Navegador / Padrão */}
            <div
              onClick={() => setSelectedType('navegador')}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                selectedType === 'navegador'
                  ? 'border-[#43A047] bg-green-50/70 text-slate-900 ring-1 ring-[#43A047]'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <Printer className="w-5 h-5 text-[#43A047]" />
                <div>
                  <span className="text-xs font-bold block">Navegador / Sistema Operacional</span>
                  <span className="text-[10px] text-slate-400">Funciona em qualquer celular ou PC (PDF/Driver)</span>
                </div>
              </div>
              {selectedType === 'navegador' && <Check className="w-4 h-4 text-[#43A047]" />}
            </div>

            {/* Bluetooth */}
            <div
              onClick={() => setSelectedType('bluetooth')}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                selectedType === 'bluetooth'
                  ? 'border-[#43A047] bg-green-50/70 text-slate-900 ring-1 ring-[#43A047]'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <Bluetooth className="w-5 h-5 text-blue-600" />
                <div>
                  <span className="text-xs font-bold block">Impressora Bluetooth Portátil</span>
                  <span className="text-[10px] text-slate-400">Mini impressora térmica 58mm POS</span>
                </div>
              </div>
              {selectedType === 'bluetooth' && <Check className="w-4 h-4 text-[#43A047]" />}
            </div>

            {/* USB */}
            <div
              onClick={() => setSelectedType('usb')}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                selectedType === 'usb'
                  ? 'border-[#43A047] bg-green-50/70 text-slate-900 ring-1 ring-[#43A047]'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <Usb className="w-5 h-5 text-amber-600" />
                <div>
                  <span className="text-xs font-bold block">Impressora USB / Cabo</span>
                  <span className="text-[10px] text-slate-400">Epson, Bematech, Elgin ou Daruma</span>
                </div>
              </div>
              {selectedType === 'usb' && <Check className="w-4 h-4 text-[#43A047]" />}
            </div>

            {/* Rede / Wifi */}
            <div
              onClick={() => setSelectedType('rede')}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                selectedType === 'rede'
                  ? 'border-[#43A047] bg-green-50/70 text-slate-900 ring-1 ring-[#43A047]'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <Wifi className="w-5 h-5 text-purple-600" />
                <div>
                  <span className="text-xs font-bold block">Rede Ethernet / Wi-Fi</span>
                  <span className="text-[10px] text-slate-400">Impressora de cozinha conectada ao roteador</span>
                </div>
              </div>
              {selectedType === 'rede' && <Check className="w-4 h-4 text-[#43A047]" />}
            </div>
          </div>

          {/* Test print */}
          <div className="pt-2 flex justify-between items-center">
            <button
              type="button"
              onClick={handleTestPrint}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              Testar Impressão Agora
            </button>
            <button
              type="button"
              onClick={handleScan}
              className="text-xs font-semibold text-[#43A047] flex items-center gap-1 hover:underline"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${scanning ? 'animate-spin' : ''}`} />
              {scanning ? 'Buscando...' : 'Buscar dispositivos'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
          <button
            onClick={() => setPrinterModalOpen(false)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-1.5 bg-[#FFB300] hover:bg-[#FFA000] text-slate-900 rounded-lg text-xs font-bold shadow-xs"
          >
            Confirmar Seleção
          </button>
        </div>
      </div>
    </div>
  );
};
