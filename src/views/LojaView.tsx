import React, { useState } from 'react';
import { useComanda } from '../context/ComandaContext';
import { ChevronLeft, Store, Save, Check, MapPin, Phone, QrCode, MessageSquare } from 'lucide-react';

export const LojaView: React.FC = () => {
  const { goBack, storeInfo, updateStoreInfo } = useComanda();

  const [name, setName] = useState(storeInfo.name);
  const [tagline, setTagline] = useState(storeInfo.tagline);
  const [phone, setPhone] = useState(storeInfo.phone);
  const [address, setAddress] = useState(storeInfo.address);
  const [pixKey, setPixKey] = useState(storeInfo.pixKey);
  const [receiptFooterMessage, setReceiptFooterMessage] = useState(storeInfo.receiptFooterMessage);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreInfo({
      name,
      tagline,
      phone,
      address,
      pixKey,
      receiptFooterMessage,
    });
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
          <span className="text-xl font-bold tracking-tight">Dados da Loja</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <form onSubmit={handleSave} className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4 max-w-md mx-auto">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-12 h-12 bg-green-50 text-[#43A047] rounded-xl flex items-center justify-center">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Identificação do Estabelecimento</h3>
              <p className="text-xs text-slate-400">Informações impressas no cabeçalho das comandas</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nome do Estabelecimento:
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#43A047]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Slogan / Subtítulo:
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#43A047]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              Telefone / WhatsApp:
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(00) 00000-0000"
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#43A047]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Endereço Completo:
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#43A047]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-slate-400" />
              Chave Pix para Pagamentos:
            </label>
            <input
              type="text"
              value={pixKey}
              onChange={(e) => setPixKey(e.target.value)}
              placeholder="Chave Pix (CPF, Celular, E-mail ou Aleatória)"
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#43A047]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
              Mensagem no Rodapé do Recibo:
            </label>
            <textarea
              value={receiptFooterMessage}
              onChange={(e) => setReceiptFooterMessage(e.target.value)}
              rows={2}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#43A047]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#43A047] hover:bg-[#388E3C] text-white font-bold py-3 rounded-lg shadow-sm flex items-center justify-center gap-2 text-sm transition-transform active:scale-[0.99] mt-2"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                Dados Salvos com Sucesso!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Salvar Alterações
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
