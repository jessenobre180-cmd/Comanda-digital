import React, { useState } from 'react';
import { useComanda } from '../context/ComandaContext';
import { ChevronLeft, Printer, Check, ChevronDown } from 'lucide-react';

export const ConfiguracaoGeralView: React.FC = () => {
  const { goBack, settings, updateSettings, setPrinterModalOpen } = useComanda();

  // Local state for form fields matching Screenshot 3
  const [useTables, setUseTables] = useState<boolean>(settings.useTables);
  const [serviceFeePercent, setServiceFeePercent] = useState<string>(
    settings.serviceFeePercent.toFixed(2).replace('.', ',')
  );
  const [currencySymbol, setCurrencySymbol] = useState<string>(settings.currencySymbol || 'R$');
  const [resetNumberDaily, setResetNumberDaily] = useState<boolean>(settings.resetNumberDaily);
  const [paperType, setPaperType] = useState<'58mm' | '80mm' | 'A4'>(settings.paperType);
  const [fontSizePx, setFontSizePx] = useState<string>(
    settings.fontSizePx.toFixed(2).replace('.', ',')
  );
  const [autoPrintOrders, setAutoPrintOrders] = useState<boolean>(settings.autoPrintOrders ?? true);
  const [autoPrintTarget, setAutoPrintTarget] = useState<'kitchen' | 'customer'>(
    settings.autoPrintTarget || 'kitchen'
  );
  const [saveToast, setSaveToast] = useState(false);

  const handleSave = () => {
    const parsedFee = parseFloat(serviceFeePercent.replace(',', '.')) || 0;
    const parsedFontSize = parseFloat(fontSizePx.replace(',', '.')) || 11;

    updateSettings({
      useTables,
      serviceFeePercent: parsedFee,
      currencySymbol,
      resetNumberDaily,
      paperType,
      fontSizePx: parsedFontSize,
      autoPrintOrders,
      autoPrintTarget,
    });

    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
      goBack();
    }, 800);
  };

  return (
    <div className="flex flex-col flex-1 bg-white min-h-0">
      {/* Header matching Screenshot 3 */}
      <div className="bg-[#43A047] text-white flex items-center px-4 h-14 shadow-md shrink-0">
        <button
          onClick={goBack}
          className="flex items-center gap-2 hover:opacity-80 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-xl font-bold tracking-tight">Configuração Geral</span>
        </button>
      </div>

      {/* Main form content matching Screenshot 3 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Field 1: Usar mesas em comanda */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Usar mesas em comanda
          </label>
          <div className="relative">
            <select
              value={useTables ? 'Sim' : 'Não'}
              onChange={(e) => setUseTables(e.target.value === 'Sim')}
              className="w-full bg-transparent border-b border-slate-300 py-1.5 text-sm text-slate-800 appearance-none focus:outline-none focus:border-[#43A047]"
            >
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-1 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Field 2: Gorjeta(%) */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Gorjeta(%)
          </label>
          <input
            type="text"
            value={serviceFeePercent}
            onChange={(e) => setServiceFeePercent(e.target.value)}
            className="w-full bg-transparent border-b border-slate-300 py-1.5 text-sm text-slate-800 focus:outline-none focus:border-[#43A047]"
          />
        </div>

        {/* Field 3: Símbolo Moeda */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Símbolo Moeda
          </label>
          <input
            type="text"
            value={currencySymbol}
            onChange={(e) => setCurrencySymbol(e.target.value)}
            className="w-full bg-transparent border-b border-slate-300 py-1.5 text-sm text-slate-800 focus:outline-none focus:border-[#43A047]"
          />
        </div>

        {/* Section: Comanda */}
        <div className="pt-2">
          <h3 className="text-sm font-bold text-slate-800 mb-3">Comanda</h3>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Resetar Número da Comanda quando abrir app em outro dia
            </label>
            <div className="relative">
              <select
                value={resetNumberDaily ? 'Sim' : 'Não'}
                onChange={(e) => setResetNumberDaily(e.target.value === 'Sim')}
                className="w-full bg-transparent border-b border-slate-300 py-1.5 text-sm text-slate-800 appearance-none focus:outline-none focus:border-[#43A047]"
              >
                <option value="Não">Não</option>
                <option value="Sim">Sim</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-1 top-2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Section: Config. Documentos */}
        <div className="pt-2">
          <h3 className="text-sm font-bold text-slate-800 mb-3">Config. Documentos</h3>

          {/* Tipo papel */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tipo papel
            </label>
            <div className="relative">
              <select
                value={paperType}
                onChange={(e) => setPaperType(e.target.value as any)}
                className="w-full bg-transparent border-b border-slate-300 py-1.5 text-sm text-slate-800 appearance-none focus:outline-none focus:border-[#43A047]"
              >
                <option value="58mm">58mm</option>
                <option value="80mm">80mm</option>
                <option value="A4">A4</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-1 top-2 pointer-events-none" />
            </div>
          </div>

          {/* Tamanho Letra (px) */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tamanho Letra (px)
            </label>
            <input
              type="text"
              value={fontSizePx}
              onChange={(e) => setFontSizePx(e.target.value)}
              className="w-full bg-transparent border-b border-slate-300 py-1.5 text-sm text-slate-800 focus:outline-none focus:border-[#43A047]"
            />
          </div>

          {/* Impressão Automática de Pedidos */}
          <div className="mb-4 bg-emerald-50/60 p-3 rounded-xl border border-emerald-200/80">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-800">
                Impressão Automática de Pedidos
              </label>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  autoPrintOrders ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {autoPrintOrders ? 'Ativado' : 'Desativado'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">
              Ao confirmar um novo pedido, o modal de recibo térmico abrirá automaticamente para agilizar o atendimento.
            </p>
            <div className="relative">
              <select
                value={autoPrintOrders ? 'Sim' : 'Não'}
                onChange={(e) => setAutoPrintOrders(e.target.value === 'Sim')}
                className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 appearance-none focus:outline-none focus:border-[#43A047]"
              >
                <option value="Sim">Sim (Abrir recibo automaticamente)</option>
                <option value="Não">Não (Impressão manual)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 top-2 pointer-events-none" />
            </div>

            {autoPrintOrders && (
              <div className="mt-2.5 pt-2 border-t border-emerald-200/60">
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Via do comprovante automático:
                </label>
                <div className="relative">
                  <select
                    value={autoPrintTarget}
                    onChange={(e) => setAutoPrintTarget(e.target.value as 'kitchen' | 'customer')}
                    className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 appearance-none focus:outline-none focus:border-[#43A047]"
                  >
                    <option value="kitchen">Via de Cozinha / Churrasqueira (Espetos e Pedidos)</option>
                    <option value="customer">Via do Cliente (Conta Completa)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 top-2 pointer-events-none" />
                </div>
              </div>
            )}
          </div>

          {/* Yellow Button matching Screenshot 3: Selecionar Impressora */}
          <button
            type="button"
            onClick={() => setPrinterModalOpen(true)}
            className="w-full bg-[#FFB300] hover:bg-[#FFA000] text-white font-bold py-3 rounded-lg shadow-sm flex items-center justify-center gap-2 text-sm transition-transform active:scale-[0.99]"
          >
            <Printer className="w-4 h-4" />
            Selecionar Impressora
          </button>
        </div>
      </div>

      {/* Bottom action buttons matching Screenshot 3: Fechar (white) / Salvar (purple) */}
      <div className="p-4 border-t border-slate-200 bg-white grid grid-cols-2 gap-3 shrink-0">
        <button
          onClick={goBack}
          className="w-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-lg text-sm text-center"
        >
          Fechar
        </button>
        <button
          onClick={handleSave}
          className="w-full bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white font-bold py-2.5 rounded-lg text-sm text-center shadow-sm flex items-center justify-center gap-1.5"
        >
          {saveToast ? (
            <>
              <Check className="w-4 h-4" />
              Salvo!
            </>
          ) : (
            'Salvar'
          )}
        </button>
      </div>
    </div>
  );
};
