import React, { useState } from 'react';
import { useComanda } from '../context/ComandaContext';
import { Comanda, PaymentMethod } from '../types';
import {
  X,
  CheckCircle2,
  Banknote,
  QrCode,
  CreditCard,
  DollarSign,
  Copy,
  Check,
  Printer
} from 'lucide-react';

interface CloseComandaModalProps {
  comanda: Comanda;
  onClose: () => void;
}

export const CloseComandaModal: React.FC<CloseComandaModalProps> = ({
  comanda,
  onClose,
}) => {
  const { closeComanda, storeInfo, setReceiptModalComanda, setReceiptType, navigateTo } = useComanda();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('dinheiro');
  const [amountPaidStr, setAmountPaidStr] = useState<string>(comanda.total.toFixed(2));
  const [copiedPix, setCopiedPix] = useState(false);
  const [notes, setNotes] = useState('');

  const amountPaid = parseFloat(amountPaidStr.replace(',', '.')) || 0;
  const change = Math.max(0, amountPaid - comanda.total);

  const handleCopyPix = () => {
    if (storeInfo.pixKey) {
      navigator.clipboard?.writeText(storeInfo.pixKey);
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 2000);
    }
  };

  const handleConfirmClose = (shouldPrintReceipt: boolean = false) => {
    closeComanda(comanda.id, paymentMethod, amountPaid, change, notes);
    onClose();

    if (shouldPrintReceipt) {
      const closedCopy: Comanda = {
        ...comanda,
        status: 'fechada',
        paymentMethod,
        amountPaid,
        change,
        closedAt: new Date().toISOString(),
      };
      setReceiptType('customer');
      setReceiptModalComanda(closedCopy);
    }

    navigateTo('home');
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#43A047] text-white px-4 py-3.5 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base leading-tight">Fechar Comanda</h3>
            <span className="text-xs text-green-100">
              {comanda.tableNumber ? `Mesa ${comanda.tableNumber}` : 'Balcão'} • {comanda.customerName}
            </span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-black/10 rounded-full">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          {/* Total Box */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
            <span className="text-xs font-semibold text-[#2E7D32] uppercase tracking-wide block">
              Total a Receber
            </span>
            <span className="text-2xl font-black text-[#2E7D32]">
              R$ {comanda.total.toFixed(2)}
            </span>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Selecione a Forma de Pagamento:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {/* Dinheiro */}
              <button
                type="button"
                onClick={() => setPaymentMethod('dinheiro')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
                  paymentMethod === 'dinheiro'
                    ? 'border-[#43A047] bg-green-50 text-[#2E7D32] ring-1 ring-[#43A047]'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Banknote className="w-4 h-4 text-emerald-600" />
                Dinheiro
              </button>

              {/* Pix */}
              <button
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
                  paymentMethod === 'pix'
                    ? 'border-[#43A047] bg-green-50 text-[#2E7D32] ring-1 ring-[#43A047]'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <QrCode className="w-4 h-4 text-teal-600" />
                PIX
              </button>

              {/* Cartão de Crédito */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cartao_credito')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
                  paymentMethod === 'cartao_credito'
                    ? 'border-[#43A047] bg-green-50 text-[#2E7D32] ring-1 ring-[#43A047]'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4 text-indigo-600" />
                Crédito
              </button>

              {/* Cartão de Débito */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cartao_debito')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
                  paymentMethod === 'cartao_debito'
                    ? 'border-[#43A047] bg-green-50 text-[#2E7D32] ring-1 ring-[#43A047]'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4 text-sky-600" />
                Débito
              </button>
            </div>
          </div>

          {/* Conditional Method Details */}
          {paymentMethod === 'dinheiro' && (
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">Valor Entregue (R$):</label>
                <input
                  type="text"
                  value={amountPaidStr}
                  onChange={(e) => setAmountPaidStr(e.target.value)}
                  className="w-24 text-right border border-slate-300 rounded px-2 py-1 text-xs font-bold focus:outline-none focus:border-[#43A047]"
                />
              </div>

              {/* Quick cash shortcut buttons */}
              <div className="flex gap-1.5 justify-end">
                {[
                  Math.ceil(comanda.total),
                  Math.ceil(comanda.total / 10) * 10,
                  Math.ceil(comanda.total / 50) * 50 || 50,
                  100,
                ]
                  .filter((v, idx, arr) => arr.indexOf(v) === idx && v >= comanda.total)
                  .map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAmountPaidStr(val.toFixed(2))}
                      className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded font-semibold text-slate-600 hover:bg-slate-100"
                    >
                      R$ {val}
                    </button>
                  ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-700">Troco a Devolver:</span>
                <span className={`text-base font-black ${change > 0 ? 'text-amber-600' : 'text-slate-700'}`}>
                  R$ {change.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {paymentMethod === 'pix' && (
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-center space-y-2">
              <div className="w-28 h-28 bg-white border border-slate-300 rounded-lg mx-auto flex items-center justify-center p-2 shadow-2xs">
                {/* Simulated QR Code illustration */}
                <div className="w-full h-full bg-slate-900 flex flex-col justify-between p-1.5 rounded">
                  <div className="flex justify-between">
                    <div className="w-6 h-6 border-2 border-white flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white"></div></div>
                    <div className="w-6 h-6 border-2 border-white flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white"></div></div>
                  </div>
                  <div className="flex justify-center"><div className="w-3 h-3 bg-white"></div></div>
                  <div className="flex justify-between">
                    <div className="w-6 h-6 border-2 border-white flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white"></div></div>
                    <div className="w-4 h-4 bg-white/70"></div>
                  </div>
                </div>
              </div>

              <span className="text-[11px] text-slate-500 block">Chave PIX da Irmã Jéssica:</span>
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-xs font-mono font-bold text-slate-800 bg-white px-2 py-1 rounded border border-slate-200 max-w-[200px] truncate">
                  {storeInfo.pixKey || 'irma.jessica@pix.com'}
                </span>
                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="p-1 text-slate-600 hover:text-emerald-600"
                  title="Copiar Chave Pix"
                >
                  {copiedPix ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Observação de Pagamento (Opcional):
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Pago pelo Sr. Carlos, 50% Pix / 50% Dinheiro..."
              className="w-full border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#43A047]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 grid grid-cols-2 gap-2 shrink-0">
          <button
            onClick={() => handleConfirmClose(true)}
            className="flex items-center justify-center gap-1 py-2.5 px-2 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            Receber &amp; Imprimir
          </button>

          <button
            onClick={() => handleConfirmClose(false)}
            className="flex items-center justify-center gap-1 py-2.5 px-2 bg-[#43A047] hover:bg-[#388E3C] text-white rounded-lg text-xs font-bold shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            Confirmar Pagamento
          </button>
        </div>
      </div>
    </div>
  );
};
