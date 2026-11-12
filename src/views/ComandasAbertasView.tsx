import React, { useState } from 'react';
import { useComanda } from '../context/ComandaContext';
import { RotateCw, FileText, X, Plus, Utensils, Clock, ArrowRight } from 'lucide-react';

export const ComandasAbertasView: React.FC = () => {
  const {
    abertasCount,
    activeComandas,
    navigateTo,
    setSelectedComandaId,
    setPaymentModalComanda,
  } = useComanda();

  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 300);
  };

  const filteredComandas = activeComandas.filter((cmd) => {
    const matchCustomer = cmd.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTable = cmd.tableNumber ? cmd.tableNumber.toString().includes(searchTerm) : false;
    const matchNumber = cmd.number.toString().includes(searchTerm);
    return matchCustomer || matchTable || matchNumber;
  });

  const handleOpenComanda = (id: string) => {
    setSelectedComandaId(id);
    navigateTo('comanda_detalhes');
  };

  const handleNewComandaClick = () => {
    navigateTo('comanda_nova');
  };

  return (
    <div className="flex flex-col flex-1 bg-[#F1F5F9] min-h-0">
      {/* Top Header matching Screenshot 2 */}
      <div className="bg-[#43A047] text-white flex items-stretch h-14 shadow-md select-none shrink-0">
        {/* Left: 0 Abertas with Refresh button */}
        <button
          onClick={handleRefresh}
          className="flex-1 flex items-center justify-center gap-2 font-semibold text-lg hover:bg-black/10 transition-colors px-4 border-r border-green-600/60"
        >
          <span className="text-xl font-bold">{abertasCount}</span>
          <span>Abertas</span>
          <RotateCw className={`w-4 h-4 text-white/90 transition-transform ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>

        {/* Right: Abrir Comanda Button */}
        <button
          onClick={handleNewComandaClick}
          className="flex-1 bg-[#2E7D32] hover:bg-[#256628] flex items-center justify-center gap-2 font-medium text-white px-4 transition-colors"
        >
          <FileText className="w-5 h-5 text-white" />
          <span className="font-semibold">Abrir Comanda</span>
        </button>
      </div>

      {/* Search Bar matching Screenshot 2 */}
      <div className="p-3 bg-[#F8FAFC] border-b border-slate-200">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente ou mesa..."
            className="w-full bg-white border border-slate-300 rounded px-3 py-2 pr-9 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#43A047] focus:ring-1 focus:ring-[#43A047] shadow-xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-3">
        {filteredComandas.length === 0 ? (
          /* Empty State matching Screenshot 2 */
          <div className="flex flex-col items-center justify-center h-64 text-center select-none pt-12">
            <p className="text-slate-700 text-base font-medium mb-3">
              {searchTerm ? 'Nenhuma comanda encontrada para a busca' : 'Nenhuma Comanda Encontrada'}
            </p>
            <button
              onClick={handleNewComandaClick}
              className="text-[#6366F1] font-semibold text-base hover:underline active:text-[#4F46E5] flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Abrir Comanda
            </button>
          </div>
        ) : (
          /* Comandas List */
          <div className="space-y-3">
            {filteredComandas.map((cmd) => (
              <div
                key={cmd.id}
                onClick={() => handleOpenComanda(cmd.id)}
                className="bg-white rounded-lg p-3.5 border border-slate-200 shadow-xs hover:border-[#43A047] hover:shadow-sm cursor-pointer transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {cmd.tableNumber ? (
                      <span className="bg-[#6366F1] text-white text-xs font-bold px-2.5 py-1 rounded-md">
                        Mesa {cmd.tableNumber}
                      </span>
                    ) : (
                      <span className="bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                        Balcão
                      </span>
                    )}
                    <h3 className="font-bold text-slate-800 text-base">{cmd.customerName}</h3>
                  </div>
                  <span className="font-extrabold text-[#2E7D32] text-lg">
                    R$ {cmd.total.toFixed(2)}
                  </span>
                </div>

                {/* Items summary */}
                <div className="text-xs text-slate-500 mb-2.5 line-clamp-2">
                  {cmd.items.length === 0 ? (
                    <span className="italic text-slate-400">Nenhum item adicionado ainda</span>
                  ) : (
                    cmd.items.map((it) => `${it.quantity}x ${it.name}`).join(', ')
                  )}
                </div>

                {/* Footer with time and actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(cmd.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    <span className="ml-1 text-slate-400">({cmd.items.reduce((acc, it) => acc + it.quantity, 0)} itens)</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPaymentModalComanda(cmd);
                      }}
                      className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-2.5 py-1 rounded font-semibold text-xs transition-colors"
                    >
                      Pagar
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenComanda(cmd.id);
                      }}
                      className="flex items-center gap-1 text-[#43A047] font-semibold hover:underline"
                    >
                      Ver
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button for Fast Comanda Creation */}
      {filteredComandas.length > 0 && (
        <button
          onClick={handleNewComandaClick}
          className="fixed md:absolute bottom-16 right-5 w-14 h-14 bg-[#4CAF50] hover:bg-[#43A047] text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 z-20"
          title="Nova Comanda"
        >
          <Plus className="w-8 h-8" />
        </button>
      )}
    </div>
  );
};
