import React, { useState } from 'react';
import { useComanda } from '../context/ComandaContext';
import {
  ChevronLeft,
  Printer,
  Share2,
  Trash2,
  Plus,
  Minus,
  MessageSquare,
  Search,
  CheckCircle2,
  AlertCircle,
  Receipt,
  FileText
} from 'lucide-react';
import { ProductItem } from '../types';
import { CategoryIcon } from '../components/CategoryIcons';

export const ComandaDetailView: React.FC = () => {
  const {
    currentComanda,
    goBack,
    categories,
    products,
    addItemToComanda,
    removeItemFromComanda,
    updateItemQuantity,
    updateComandaDiscountOrTip,
    setReceiptModalComanda,
    setReceiptType,
    setWhatsappModalComanda,
    setPaymentModalComanda,
    settings,
  } = useComanda();

  const [selectedCatId, setSelectedCatId] = useState<string>('cat_espetinhos');
  const [productSearch, setProductSearch] = useState('');
  const [activeItemForObs, setActiveItemForObs] = useState<ProductItem | null>(null);
  const [observationText, setObservationText] = useState('');
  const [confirmedToast, setConfirmedToast] = useState(false);

  const handleConfirmOrder = () => {
    if (!currentComanda || currentComanda.items.length === 0) return;

    setConfirmedToast(true);
    setTimeout(() => setConfirmedToast(false), 2500);

    // If autoPrintOrders is enabled in settings, open receipt modal automatically!
    if (settings.autoPrintOrders) {
      setReceiptType(settings.autoPrintTarget || 'kitchen');
      setReceiptModalComanda(currentComanda);
    }
  };

  if (!currentComanda) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-12 h-12 text-amber-500 mb-2" />
        <p className="text-slate-700 font-semibold mb-4">Nenhuma comanda selecionada</p>
        <button
          onClick={goBack}
          className="bg-[#43A047] text-white px-4 py-2 rounded-lg font-bold text-sm"
        >
          Voltar para Início
        </button>
      </div>
    );
  }

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCatId ? p.categoryId === selectedCatId : true;
    const matchesSearch = productSearch
      ? p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(productSearch.toLowerCase()))
      : true;
    return matchesCat && matchesSearch;
  });

  const handleQuickAdd = (product: ProductItem) => {
    addItemToComanda(currentComanda.id, product, 1);
  };

  const handleAddWithObs = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeItemForObs) {
      addItemToComanda(currentComanda.id, activeItemForObs, 1, observationText);
      setActiveItemForObs(null);
      setObservationText('');
    }
  };

  const handleOpenReceipt = (type: 'customer' | 'kitchen') => {
    setReceiptType(type);
    setReceiptModalComanda(currentComanda);
  };

  return (
    <div className="flex flex-col flex-1 bg-[#F1F5F9] min-h-0">
      {/* Header */}
      <div className="bg-[#43A047] text-white flex items-center justify-between px-3 h-14 shadow-md shrink-0">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 hover:opacity-80 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-lg font-bold">
            {currentComanda.tableNumber ? `Mesa ${currentComanda.tableNumber}` : 'Comanda'} #{currentComanda.number}
          </span>
        </button>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Kitchen receipt */}
          <button
            onClick={() => handleOpenReceipt('kitchen')}
            className="p-2 hover:bg-black/10 rounded-full transition-colors text-white/90"
            title="Imprimir Via Cozinha"
          >
            <Receipt className="w-5 h-5" />
          </button>

          {/* Customer receipt */}
          <button
            onClick={() => handleOpenReceipt('customer')}
            className="p-2 hover:bg-black/10 rounded-full transition-colors text-white/90"
            title="Imprimir Conta"
          >
            <Printer className="w-5 h-5" />
          </button>

          {/* WhatsApp share */}
          <button
            onClick={() => setWhatsappModalComanda(currentComanda)}
            className="p-2 hover:bg-black/10 rounded-full transition-colors text-white/90"
            title="Enviar WhatsApp"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Order Confirmed Toast */}
      {confirmedToast && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 text-xs font-bold flex items-center justify-between shadow-md animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>Pedido confirmado com sucesso!</span>
            {settings.autoPrintOrders && (
              <span className="text-[10px] bg-emerald-700 px-1.5 py-0.5 rounded text-emerald-100">
                Imprimindo via de {settings.autoPrintTarget === 'kitchen' ? 'cozinha' : 'cliente'}...
              </span>
            )}
          </div>
        </div>
      )}

      {/* Comanda Info Strip */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800 text-sm">{currentComanda.customerName}</span>
          <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
            Aberta
          </span>
          {settings.autoPrintOrders && (
            <span
              className="hidden sm:flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-medium"
              title="A impressão automática está ativada nas configurações"
            >
              <Printer className="w-3 h-3 text-emerald-600" />
              Auto-impressão ativa
            </span>
          )}
        </div>
        <span className="text-xs text-slate-500">
          Início: {new Date(currentComanda.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {/* Two section split: Items in comanda & Menu catalog */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left / Top: Order Items List */}
        <div className="flex-1 flex flex-col bg-white border-b md:border-b-0 md:border-r border-slate-200 overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
              Itens do Pedido ({currentComanda.items.reduce((acc, it) => acc + it.quantity, 0)})
            </span>
            <span className="text-xs text-slate-400">Total parcial</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {currentComanda.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-center text-slate-400">
                <FileText className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm font-medium">Nenhum item adicionado ainda.</p>
                <p className="text-xs">Selecione produtos abaixo para adicionar ao pedido.</p>
              </div>
            ) : (
              currentComanda.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 hover:bg-slate-100/80 rounded-lg p-2.5 border border-slate-200 flex items-center justify-between gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-800 text-sm truncate">{item.name}</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      R$ {item.price.toFixed(2)} un. • <span className="font-semibold text-slate-700">R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    {item.observation && (
                      <div className="text-[11px] text-amber-700 font-medium bg-amber-50 rounded px-1.5 py-0.5 mt-1 border border-amber-200/60 inline-block">
                        Obs: {item.observation}
                      </div>
                    )}
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
                    <button
                      onClick={() => updateItemQuantity(currentComanda.id, item.id, -1)}
                      className="p-1 hover:bg-slate-100 text-slate-600 rounded"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-bold text-xs text-slate-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateItemQuantity(currentComanda.id, item.id, 1)}
                      className="p-1 hover:bg-slate-100 text-slate-600 rounded"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeItemFromComanda(currentComanda.id, item.id)}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                    title="Remover Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Financial Totals */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 space-y-1.5">
            <div className="flex justify-between text-xs text-slate-600">
              <span>Subtotal:</span>
              <span className="font-semibold">R$ {currentComanda.subtotal.toFixed(2)}</span>
            </div>
            {currentComanda.serviceChargeValue > 0 && (
              <div className="flex justify-between text-xs text-slate-600">
                <span>Taxa de serviço ({currentComanda.serviceChargePercent}%):</span>
                <span className="font-semibold">R$ {currentComanda.serviceChargeValue.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-extrabold text-slate-900 pt-1 border-t border-slate-200">
              <span>Total Geral:</span>
              <span className="text-[#2E7D32] text-xl">R$ {currentComanda.total.toFixed(2)}</span>
            </div>

            {/* Primary Action: Confirmar Pedido */}
            <div className="pt-2">
              <button
                onClick={handleConfirmOrder}
                disabled={currentComanda.items.length === 0}
                className={`w-full py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-[0.99] ${
                  currentComanda.items.length === 0
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-[#FFB300] hover:bg-[#FFA000] text-slate-900 shadow-sm'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-slate-900" />
                <span>
                  Confirmar Pedido ({currentComanda.items.reduce((acc, it) => acc + it.quantity, 0)} itens)
                </span>
                {settings.autoPrintOrders && (
                  <span className="text-[10px] bg-black/10 text-slate-900 font-bold px-1.5 py-0.5 rounded ml-1 flex items-center gap-1">
                    <Printer className="w-3 h-3" /> Auto
                  </span>
                )}
              </button>
            </div>

            {/* Secondary Actions: Imprimir Conta / Fechar Comanda */}
            <div className="pt-1.5 grid grid-cols-2 gap-2">
              <button
                onClick={() => handleOpenReceipt('customer')}
                className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                Imprimir Conta
              </button>
              <button
                onClick={() => setPaymentModalComanda(currentComanda)}
                className="bg-[#43A047] hover:bg-[#388E3C] text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                Fechar Comanda
              </button>
            </div>
          </div>
        </div>

        {/* Right / Bottom: Products Catalog */}
        <div className="flex-1 flex flex-col bg-[#F8FAFC] overflow-hidden min-h-[300px]">
          {/* Categories Pill Bar */}
          <div className="p-2 bg-white border-b border-slate-200 flex gap-1.5 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCatId(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  selectedCatId === cat.id
                    ? 'bg-[#43A047] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Product Search */}
          <div className="p-2 border-b border-slate-200 bg-white">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Buscar lanche, espetinho ou bebida..."
                className="w-full bg-slate-50 border border-slate-300 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#43A047]"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1 overflow-y-auto p-3">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-lg p-2.5 border border-slate-200 shadow-2xs hover:border-[#43A047] transition-all flex flex-col justify-between"
                >
                  <div>
                    <h4 className="font-bold text-xs text-slate-800 line-clamp-1">{prod.name}</h4>
                    {prod.description && (
                      <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">{prod.description}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
                    <span className="font-extrabold text-xs text-[#2E7D32]">
                      R$ {prod.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-1">
                      {/* Observation button */}
                      <button
                        onClick={() => {
                          setActiveItemForObs(prod);
                          setObservationText('');
                        }}
                        className="p-1 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded"
                        title="Adicionar com observação"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                      {/* Add button */}
                      <button
                        onClick={() => handleQuickAdd(prod)}
                        className="p-1 bg-[#43A047] hover:bg-[#388E3C] text-white rounded font-bold transition-transform active:scale-90"
                        title="Adicionar ao pedido"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Observation Modal */}
      {activeItemForObs && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-4 animate-in fade-in">
            <h4 className="font-bold text-slate-800 text-sm mb-1">Observação do Item</h4>
            <p className="text-xs text-slate-500 mb-3">{activeItemForObs.name}</p>

            {/* Quick chips */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {['Sem cebola', 'Ao ponto', 'Bem passado', 'Com farofa', 'Com vinagrete', 'Gelo e limão', 'Sem maionese'].map(
                (chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() =>
                      setObservationText((prev) => (prev ? `${prev}, ${chip}` : chip))
                    }
                    className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded"
                  >
                    + {chip}
                  </button>
                )
              )}
            </div>

            <form onSubmit={handleAddWithObs} className="space-y-3">
              <textarea
                value={observationText}
                onChange={(e) => setObservationText(e.target.value)}
                placeholder="Ex: Carne bem passada, farofa separada..."
                rows={2}
                className="w-full border border-slate-300 rounded-md p-2 text-xs focus:outline-none focus:border-[#43A047]"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveItemForObs(null)}
                  className="px-3 py-1.5 rounded text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#43A047] hover:bg-[#388E3C] text-white rounded text-xs font-bold"
                >
                  Adicionar Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
