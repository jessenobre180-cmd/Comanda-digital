import React, { useState } from 'react';
import { useComanda } from '../context/ComandaContext';
import { ChevronLeft, Search, Plus, X, Users, AlertCircle } from 'lucide-react';
import { TableIcon } from '../components/TableIcon';

export const MesasView: React.FC = () => {
  const {
    tables,
    addTable,
    goBack,
    navigateTo,
    setSelectedTableNumber,
    setSelectedComandaId,
    activeComandas,
  } = useComanda();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTableName, setNewTableName] = useState('');

  const filteredTables = tables.filter((t) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return t.number.toString().includes(term) || (t.name && t.name.toLowerCase().includes(term));
  });

  const handleTableClick = (tableNumber: number, currentComandaId?: string) => {
    if (currentComandaId) {
      setSelectedComandaId(currentComandaId);
      navigateTo('comanda_detalhes');
    } else {
      setSelectedTableNumber(tableNumber);
      navigateTo('comanda_nova');
    }
  };

  const handleAddTableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTable(newTableName.trim() || undefined);
    setNewTableName('');
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col flex-1 bg-[#F1F5F9] min-h-0 relative">
      {/* Header matching Screenshot 1 */}
      <div className="bg-[#43A047] text-white flex items-center justify-between px-4 h-14 shadow-md shrink-0">
        <button
          onClick={goBack}
          className="flex items-center gap-2 hover:opacity-80 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-xl font-bold tracking-tight">Mesas</span>
        </button>

        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="p-2 hover:bg-black/10 rounded-full transition-colors"
          title="Buscar mesa"
        >
          <Search className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Search Input Dropdown */}
      {searchOpen && (
        <div className="p-2.5 bg-white border-b border-slate-200 flex items-center gap-2">
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite o número da mesa..."
            className="flex-1 bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-sm text-slate-800 focus:outline-none focus:border-[#43A047]"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Mesas Summary Status bar */}
      <div className="bg-white/80 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
            Livre: {tables.filter((t) => t.status === 'livre').length}
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
            Ocupada: {tables.filter((t) => t.status === 'ocupada').length}
          </span>
        </div>
        <span className="text-slate-400 font-medium">Total: {tables.length} mesas</span>
      </div>

      {/* Grid of Tables matching Screenshot 1 */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-3 gap-3">
          {filteredTables.map((table) => {
            const isOccupied = table.status === 'ocupada';
            const tableComanda = activeComandas.find((c) => c.tableNumber === table.number);

            return (
              <button
                key={table.number}
                onClick={() => handleTableClick(table.number, table.currentComandaId)}
                className={`relative bg-white rounded-xl p-3 flex flex-col items-center justify-center border transition-all duration-150 hover:shadow-md active:scale-95 text-center group ${
                  isOccupied
                    ? 'border-amber-400 shadow-amber-100/50 bg-amber-50/20'
                    : 'border-slate-200 shadow-xs hover:border-[#43A047]'
                }`}
              >
                {/* Number Badge at Top Right (Screenshot 1: Purple square badge) */}
                <div
                  className={`absolute top-1.5 right-1.5 min-w-[20px] h-5 px-1 rounded flex items-center justify-center text-xs font-bold text-white shadow-xs ${
                    isOccupied ? 'bg-amber-600' : 'bg-[#6366F1]'
                  }`}
                >
                  {table.number}
                </div>

                {/* Table Illustration matching Screenshot 1 */}
                <div className="my-1.5">
                  <TableIcon size={58} />
                </div>

                {/* Table Label */}
                <span className="text-xs font-semibold text-slate-700 mt-1">
                  {table.name || `Mesa ${table.number}`}
                </span>

                {/* Occupied info if open */}
                {isOccupied && tableComanda && (
                  <div className="mt-1 text-[10px] leading-tight text-amber-700 font-bold bg-amber-100/80 px-1.5 py-0.5 rounded w-full truncate">
                    R$ {tableComanda.total.toFixed(2)}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {filteredTables.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">
            Nenhuma mesa encontrada com "{searchTerm}".
          </div>
        )}
      </div>

      {/* FAB: Green button at bottom-right matching Screenshot 1 */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed md:absolute bottom-6 right-6 w-14 h-14 bg-[#4CAF50] hover:bg-[#43A047] text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 z-20"
        title="Adicionar Mesa"
      >
        <Plus className="w-8 h-8 stroke-[2.5]" />
      </button>

      {/* Add Table Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xs p-5 animate-in fade-in zoom-in duration-150">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Adicionar Nova Mesa</h3>
            <p className="text-xs text-slate-500 mb-4">
              A próxima mesa disponível será adicionada automaticamente à lista.
            </p>
            <form onSubmit={handleAddTableSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Nome / Identificador (Opcional):
                </label>
                <input
                  type="text"
                  placeholder={`Mesa ${tables.length + 1} ou Balcão...`}
                  value={newTableName}
                  onChange={(e) => setNewTableName(e.target.value)}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#43A047]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 rounded text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#43A047] hover:bg-[#388E3C] text-white rounded text-xs font-bold shadow-xs"
                >
                  Adicionar Mesa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
