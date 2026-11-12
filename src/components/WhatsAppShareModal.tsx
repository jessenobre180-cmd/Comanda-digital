import React, { useState } from 'react';
import { useComanda } from '../context/ComandaContext';
import { Comanda } from '../types';
import { Share2, MessageCircle, Copy, Check, X, Phone } from 'lucide-react';

interface WhatsAppShareModalProps {
  comanda: Comanda;
  onClose: () => void;
}

export const WhatsAppShareModal: React.FC<WhatsAppShareModalProps> = ({
  comanda,
  onClose,
}) => {
  const { storeInfo } = useComanda();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [copied, setCopied] = useState(false);

  const generateMessage = () => {
    let msg = `🍢 *${storeInfo.name}* 🍢\n`;
    msg += `_${storeInfo.tagline}_\n\n`;
    msg += `📄 *Comanda #${comanda.number}* - ${comanda.tableNumber ? `Mesa ${comanda.tableNumber}` : 'Balcão'}\n`;
    msg += `👤 Cliente: *${comanda.customerName}*\n`;
    msg += `🕒 Data: ${new Date(comanda.createdAt).toLocaleDateString()} às ${new Date(comanda.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n`;
    msg += `---------------------------------\n`;
    msg += `*ITENS DO PEDIDO:*\n`;

    comanda.items.forEach((it) => {
      msg += `• ${it.quantity}x ${it.name} - R$ ${(it.price * it.quantity).toFixed(2)}\n`;
      if (it.observation) {
        msg += `   _Obs: ${it.observation}_\n`;
      }
    });

    msg += `---------------------------------\n`;
    msg += `Subtotal: R$ ${comanda.subtotal.toFixed(2)}\n`;
    if (comanda.serviceChargeValue > 0) {
      msg += `Taxa de serviço: R$ ${comanda.serviceChargeValue.toFixed(2)}\n`;
    }
    if (comanda.discount > 0) {
      msg += `Desconto: -R$ ${comanda.discount.toFixed(2)}\n`;
    }
    msg += `*TOTAL A PAGAR: R$ ${comanda.total.toFixed(2)}*\n\n`;

    if (storeInfo.pixKey) {
      msg += `🔑 *Chave PIX:* ${storeInfo.pixKey}\n\n`;
    }

    msg += `🙏 ${storeInfo.receiptFooterMessage}\n`;
    msg += `📞 Dúvidas? Tel: ${storeInfo.phone}`;

    return msg;
  };

  const fullMessage = generateMessage();

  const handleCopy = () => {
    navigator.clipboard?.writeText(fullMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const encoded = encodeURIComponent(fullMessage);
    const url = cleanPhone
      ? `https://api.whatsapp.com/send?phone=55${cleanPhone}&text=${encoded}`
      : `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#25D366] text-white px-4 py-3 flex items-center justify-between font-bold text-sm">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <span>Enviar Pedido pelo WhatsApp</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-black/10 rounded-full">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto flex-1">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              WhatsApp do Cliente (com DDD):
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Ex: 11988887777 (ou deixe vazio para escolher o contato)"
              className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#25D366]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Prévia da Mensagem:
            </label>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-[11px] text-slate-700 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
              {fullMessage}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 grid grid-cols-2 gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
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
            onClick={handleSendWhatsApp}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-bold shadow-xs transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Abrir WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};
