import React, { useRef } from 'react';
import { useComanda } from '../context/ComandaContext';
import { Comanda } from '../types';
import { Printer, Copy, Check, X, FileText, UtensilsCrossed } from 'lucide-react';

interface ThermalReceiptProps {
  comanda: Comanda;
  type: 'customer' | 'kitchen';
  onClose: () => void;
}

export const ThermalReceipt: React.FC<ThermalReceiptProps> = ({
  comanda,
  type,
  onClose,
}) => {
  const { storeInfo, settings } = useComanda();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  const isKitchen = type === 'kitchen';
  const paperWidthClass = settings.paperType === '80mm' ? 'max-w-[320px]' : 'max-w-[270px]';

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    let text = '';
    if (isKitchen) {
      text = `=== VIA DE COZINHA / CHURRASQUEIRA ===\n`;
      text += `Comanda #${comanda.number} - ${comanda.tableNumber ? `Mesa ${comanda.tableNumber}` : 'Balcão'}\n`;
      text += `Cliente: ${comanda.customerName}\n`;
      text += `Hora: ${new Date().toLocaleTimeString()}\n`;
      text += `--------------------------------\n`;
      comanda.items.forEach((it) => {
        text += `${it.quantity}x ${it.name}\n`;
        if (it.observation) text += `   * OBS: ${it.observation}\n`;
      });
      text += `--------------------------------\n`;
    } else {
      text = `================================\n`;
      text += `${storeInfo.name.toUpperCase()}\n`;
      text += `${storeInfo.tagline}\n`;
      text += `Tel: ${storeInfo.phone}\n`;
      text += `End: ${storeInfo.address}\n`;
      text += `================================\n`;
      text += `Comanda #${comanda.number} - ${comanda.tableNumber ? `Mesa ${comanda.tableNumber}` : 'Balcão'}\n`;
      text += `Cliente: ${comanda.customerName}\n`;
      text += `Data: ${new Date().toLocaleString()}\n`;
      text += `--------------------------------\n`;
      text += `ITEM            QTD   VALOR  TOTAL\n`;
      comanda.items.forEach((it) => {
        text += `${it.name.substring(0, 15)} ${it.quantity}x ${it.price.toFixed(2)} = ${(it.price * it.quantity).toFixed(2)}\n`;
        if (it.observation) text += `  Obs: ${it.observation}\n`;
      });
      text += `--------------------------------\n`;
      text += `Subtotal: R$ ${comanda.subtotal.toFixed(2)}\n`;
      if (comanda.serviceChargeValue > 0) {
        text += `Taxa Serv.: R$ ${comanda.serviceChargeValue.toFixed(2)}\n`;
      }
      if (comanda.discount > 0) {
        text += `Desconto: -R$ ${comanda.discount.toFixed(2)}\n`;
      }
      text += `TOTAL: R$ ${comanda.total.toFixed(2)}\n`;
      if (comanda.paymentMethod) {
        text += `Forma: ${comanda.paymentMethod.toUpperCase()}\n`;
      }
      if (storeInfo.pixKey) {
        text += `Chave PIX: ${storeInfo.pixKey}\n`;
      }
      text += `================================\n`;
      text += `${storeInfo.receiptFooterMessage}\n`;
      text += `================================\n`;
    }

    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Top Control Bar */}
        <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-xs uppercase tracking-wider">
              {isKitchen ? 'Comprovante da Cozinha' : 'Recibo Térmico (58mm)'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thermal Paper Container */}
        <div className="p-4 bg-slate-200 overflow-y-auto flex justify-center flex-1">
          <div
            ref={receiptRef}
            className={`${paperWidthClass} w-full bg-white text-black p-4 font-mono text-[11px] leading-tight shadow-md border-t-4 border-dashed border-slate-300 relative`}
            style={{ fontSize: `${settings.fontSizePx || 11}px` }}
          >
            {/* Header */}
            {isKitchen ? (
              <div className="text-center pb-2 border-b-2 border-dashed border-black mb-2">
                <div className="text-sm font-black uppercase tracking-wider bg-black text-white px-2 py-0.5 rounded inline-block mb-1">
                  *** COZINHA / CHURRASQUEIRA ***
                </div>
                <div className="text-xs font-black">
                  {comanda.tableNumber ? `MESA ${comanda.tableNumber}` : 'BALCÃO / VIAGEM'}
                </div>
                <div className="text-[10px]">Cliente: {comanda.customerName}</div>
                <div className="text-[10px]">
                  Hora: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
              </div>
            ) : (
              <div className="text-center pb-2 border-b-2 border-dashed border-black mb-2">
                <h3 className="font-black text-xs uppercase leading-tight tracking-tight">
                  {storeInfo.name}
                </h3>
                <p className="text-[10px] text-gray-700">{storeInfo.tagline}</p>
                <p className="text-[10px]">Tel: {storeInfo.phone}</p>
                <p className="text-[9px] text-gray-600">{storeInfo.address}</p>
                <div className="mt-1 pt-1 border-t border-dotted border-black flex justify-between text-[10px]">
                  <span className="font-bold">
                    {comanda.tableNumber ? `MESA ${comanda.tableNumber}` : 'BALCÃO'} • CMD #{comanda.number}
                  </span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="text-left text-[10px]">Cliente: {comanda.customerName}</div>
              </div>
            )}

            {/* Items Table */}
            <div className="py-1">
              <div className="flex justify-between border-b border-black font-bold pb-0.5 mb-1 text-[10px]">
                <span className="flex-1">QTD ITEM</span>
                {!isKitchen && <span className="w-16 text-right">TOTAL</span>}
              </div>

              <div className="space-y-1.5">
                {comanda.items.map((it) => (
                  <div key={it.id}>
                    <div className="flex justify-between items-start">
                      <span className="font-bold flex-1 pr-1">
                        {it.quantity}x {it.name}
                      </span>
                      {!isKitchen && (
                        <span className="font-bold text-right shrink-0">
                          R$ {(it.price * it.quantity).toFixed(2)}
                        </span>
                      )}
                    </div>
                    {it.observation && (
                      <div className="text-[10px] italic font-semibold pl-2 text-gray-800 bg-gray-100 py-0.5 rounded mt-0.5">
                        &gt;&gt; OBS: {it.observation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Financial summary (Only on Customer ticket) */}
            {!isKitchen && (
              <div className="mt-2 pt-2 border-t-2 border-dashed border-black space-y-0.5">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>R$ {comanda.subtotal.toFixed(2)}</span>
                </div>
                {comanda.serviceChargeValue > 0 && (
                  <div className="flex justify-between">
                    <span>Taxa Serviço ({comanda.serviceChargePercent}%):</span>
                    <span>R$ {comanda.serviceChargeValue.toFixed(2)}</span>
                  </div>
                )}
                {comanda.discount > 0 && (
                  <div className="flex justify-between">
                    <span>Desconto:</span>
                    <span>-R$ {comanda.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-black text-sm pt-1 border-t border-black">
                  <span>TOTAL A PAGAR:</span>
                  <span>R$ {comanda.total.toFixed(2)}</span>
                </div>

                {comanda.paymentMethod && (
                  <div className="flex justify-between text-[10px] pt-1">
                    <span>Forma de Pagto:</span>
                    <span className="uppercase font-bold">{comanda.paymentMethod}</span>
                  </div>
                )}

                {storeInfo.pixKey && (
                  <div className="text-center pt-2 mt-1 border-t border-dotted border-black">
                    <span className="text-[10px] font-bold block">CHAVE PIX:</span>
                    <span className="text-[10px] bg-gray-100 px-1 py-0.5 rounded font-mono block truncate">
                      {storeInfo.pixKey}
                    </span>
                  </div>
                )}

                {/* Footer Message */}
                <div className="text-center pt-3 text-[10px] italic border-t border-black mt-2">
                  {storeInfo.receiptFooterMessage}
                </div>
              </div>
            )}

            {/* Cut line decoration */}
            <div className="mt-4 pt-2 border-b-2 border-dashed border-gray-400 text-center text-[9px] text-gray-500 select-none">
              - - - - - CORTE AQUI - - - - -
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-3 bg-white border-t border-slate-200 grid grid-cols-2 gap-2 shrink-0">
          <button
            onClick={handleCopyText}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copiar Texto
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#43A047] hover:bg-[#388E3C] text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            Imprimir Recibo
          </button>
        </div>
      </div>
    </div>
  );
};
