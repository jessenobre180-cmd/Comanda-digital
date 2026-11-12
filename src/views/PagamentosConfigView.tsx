import React, { useState } from 'react';
import { useComanda } from '../context/ComandaContext';
import { ChevronLeft, CreditCard, Check, QrCode, Banknote, ShieldCheck } from 'lucide-react';

export const PagamentosConfigView: React.FC = () => {
  const { goBack, storeInfo, updateStoreInfo } = useComanda();

  const [pixEnabled, setPixEnabled] = useState(true);
  const [cashEnabled, setCashEnabled] = useState(true);
  const [creditEnabled, setCreditEnabled] = useState(true);
  const [debitEnabled, setDebitEnabled] = useState(true);
  const [pixKey, setPixKey] = useState(storeInfo.pixKey);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreInfo({ pixKey });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col flex-1 bg-[#F8FAFC] min-h-0">
      {/* Header */}
      <div className="bg-[#43A047] text-white flex items-center justify-between px-4 h-14 shadow-md shrink-0">
        <button
          onClick={goBack}
          className="flex items-center gap-2 hover:opacity-80 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-xl font-bold tracking-tight">Formas de Pagamento</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 max-w-md mx-auto w-full">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-3">
            <h3 className="font-bold text-slate-800 text-sm mb-2">Métodos Aceitos no Caixa</h3>

            {/* Pix */}
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">PIX</span>
                  <span className="text-[11px] text-slate-400">Recebimento instantâneo</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={pixEnabled}
                onChange={(e) => setPixEnabled(e.target.checked)}
                className="rounded text-[#43A047] focus:ring-[#43A047] h-4 w-4"
              />
            </div>

            {/* Dinheiro */}
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Banknote className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Dinheiro em Espécie</span>
                  <span className="text-[11px] text-slate-400">Com calculadora de troco automática</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={cashEnabled}
                onChange={(e) => setCashEnabled(e.target.checked)}
                className="rounded text-[#43A047] focus:ring-[#43A047] h-4 w-4"
              />
            </div>

            {/* Cartão de Crédito */}
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Cartão de Crédito</span>
                  <span className="text-[11px] text-slate-400">Máquinas POS / Stone / PagSeguro / Cielo</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={creditEnabled}
                onChange={(e) => setCreditEnabled(e.target.checked)}
                className="rounded text-[#43A047] focus:ring-[#43A047] h-4 w-4"
              />
            </div>

            {/* Cartão de Débito */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Cartão de Débito</span>
                  <span className="text-[11px] text-slate-400">Visa / Mastercard / Elo</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={debitEnabled}
                onChange={(e) => setDebitEnabled(e.target.checked)}
                className="rounded text-[#43A047] focus:ring-[#43A047] h-4 w-4"
              />
            </div>
          </div>

          {/* Pix Key Configuration */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-3">
            <h3 className="font-bold text-slate-800 text-sm">Chave Pix da Loja</h3>
            <p className="text-xs text-slate-500">
              Esta chave é apresentada ao cliente na tela de pagamento para facilitar o Pix Copia e Cola.
            </p>
            <input
              type="text"
              value={pixKey}
              onChange={(e) => setPixKey(e.target.value)}
              placeholder="Digite a chave Pix (e-mail, telefone, CPF, etc.)"
              className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#43A047]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#43A047] hover:bg-[#388E3C] text-white font-bold py-2.5 rounded-lg text-xs shadow-sm flex items-center justify-center gap-1.5"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                Configurações Salvas!
              </>
            ) : (
              'Salvar Configurações'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
