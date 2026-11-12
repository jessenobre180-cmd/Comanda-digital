import React, { useState } from 'react';
import { useComanda } from '../context/ComandaContext';
import {
  ChevronLeft,
  Search,
  Printer,
  Share2,
  RotateCcw,
  Calendar,
  X,
  CreditCard,
  Banknote,
  QrCode,
  Receipt
} from 'lucide-react';
import { PaymentMethod } from '../types';

export const ComandasFechadasView: React.FC = () => {
  const {
    fechadasComandas,
    goBack,
    reopenComanda,
    setReceiptModalComanda,
    setReceiptType,
    setWhatsappModalComanda,
  } = useComanda();

  const [searchTerm, setSearchTerm] = useState('');

  const filtered = fechadasComandas.filter((c) => {
    const term = searchTerm.toLowerCase();
    const matchName = c.customerName.toLowerCase().includes(term);
    const matchTable = c.tableNumber ? c.tableNumber.toString().includes(term) : false;
    const matchNum = c.number.toString().includes(term);
    return matchName || matchTable || matchNum;
  });

  const totalBilled = filtered.reduce((acc, c) => acc + c.total, 0);

  const getPaymentBadge = (method?: PaymentMethod) => {
    switch (method) {
      case 'pix':
        return (
          <span className="flex items-center gap-1 bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded">
            <QrCode className="w-3 h-3" /> Pix
          </span>
        );
      case 'dinheiro':
        return (
          <span className="flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
            <Banknote className="w-3 h-3" /> Dinheiro
          </span>
        );
      case 'cartao_credito':
        return (
          <span className="flex items-center gap-1 bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded">
            <CreditCard className="w-3 h-3" /> Crédito
          </span>
        );
      case 'cartao_debito':
        return (
          <span className="flex items-center gap-1 bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5 rounded">
            <CreditCard className="w-3 h-3" /> Débito
          </span>
        );
      default:
        return (
          <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
            Outro
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-[#F1F5F9] min-h-0">
      {/* Header */}
      <div className="bg-[#43A047] text-white flex items-center justify-between px-4 h-14 shadow-md shrink-0">
        <button
          onClick={goBack}
          className="flex items-center gap-2 hover:opacity-80 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-xl font-bold tracking-tight">Comandas Fechadas</span>
        </button>
      </div>

      {/* Summary Banner */}
      <div className="bg-white border-b border-slate-200 p-3.5 flex items-center justify-between shadow-2xs">
        <div>
          <span className="text-xs text-slate-500 block">Total Finalizado</span>
          <span className="text-lg font-extrabold text-[#2E7D32]">
            R$ {totalBilled.toFixed(2)}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500 block">Quantidade</span>
          <span className="text-sm font-bold text-slate-700">
            {filtered.length} {filtered.length === 1 ? 'comanda' : 'comandas'}
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-3 bg-slate-50 border-b border-slate-200">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente, mesa ou nº..."
            className="w-full bg-white border border-slate-300 rounded-md pl-9 pr-8 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#43A047]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-2 text-slate-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center text-slate-400">
            <Receipt className="w-10 h-10 mb-2 opacity-50" />
            <p className="text-sm font-medium">Nenhuma comanda fechada encontrada.</p>
          </div>
        ) : (
          filtered.map((cmd) => (
            <div
              key={cmd.id}
              className="bg-white rounded-lg p-3 border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div className="flex items-start justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-700 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                    {cmd.tableNumber ? `Mesa ${cmd.tableNumber}` : 'Balcão'}
                  </span>
                  <span className="font-bold text-slate-800 text-sm">{cmd.customerName}</span>
                </div>
                <span className="font-extrabold text-[#2E7D32] text-base">
                  R$ {cmd.total.toFixed(2)}
                </span>
              </div>

              {/* Items summary */}
              <div className="text-xs text-slate-500 mb-2 line-clamp-1">
                {cmd.items.map((it) => `${it.quantity}x ${it.name}`).join(', ')}
              </div>

              {/* Footer with Payment badge & Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  {getPaymentBadge(cmd.paymentMethod)}
                  <span className="text-[11px] text-slate-400">
                    {cmd.closedAt ? new Date(cmd.closedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {/* Reopen button */}
                  <button
                    onClick={() => reopenComanda(cmd.id)}
                    className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-100 rounded"
                    title="Reabrir Comanda"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  {/* Print Receipt */}
                  <button
                    onClick={() => {
                      setReceiptType('customer');
                      setReceiptModalComanda(cmd);
                    }}
                    className="p-1.5 text-slate-500 hover:text-[#43A047] hover:bg-slate-100 rounded"
                    title="Ver Recibo Térmico"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>

                  {/* Share WhatsApp */}
                  <button
                    onClick={() => setWhatsappModalComanda(cmd)}
                    className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded"
                    title="Compartilhar via WhatsApp"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
