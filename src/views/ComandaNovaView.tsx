import React, { useState } from 'react';
import { useComanda } from '../context/ComandaContext';
import { ChevronLeft, Plus, FileText, Check } from 'lucide-react';
import { TableIcon } from '../components/TableIcon';

export const ComandaNovaView: React.FC = () => {
  const {
    goBack,
    navigateTo,
    tables,
    selectedTableNumber,
    setSelectedTableNumber,
    startComanda,
  } = useComanda();

  const [customerName, setCustomerName] = useState('');
  const [showTablePicker, setShowTablePicker] = useState(false);

  const selectedTable = tables.find((t) => t.number === selectedTableNumber);

  const handleStartComanda = () => {
    const finalCustomerName = customerName.trim() || (selectedTableNumber ? `Mesa ${selectedTableNumber}` : 'Balcão');
    startComanda(selectedTableNumber, finalCustomerName);
    navigateTo('comanda_detalhes');
  };

  return (
    <div className="flex flex-col flex-1 bg-[#F8FAFC] min-h-0">
      {/* Header matching Screenshot 5 */}
      <div className="bg-[#43A047] text-white flex items-center justify-between px-4 h-14 shadow-md shrink-0">
        <button
          onClick={goBack}
          className="flex items-center gap-2 hover:opacity-80 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-xl font-bold tracking-tight">Comanda</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTablePicker(true)}
            className="p-1.5 hover:bg-black/10 rounded-full transition-colors"
            title="Escolher Mesa"
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={goBack}
            className="p-1.5 hover:bg-black/10 rounded-full transition-colors"
            title="Listar Comandas"
          >
            <FileText className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Main Content matching Screenshot 5 */}
      <div className="p-4 flex-1">
        <div className="bg-white rounded-xl p-5 shadow-xs border border-slate-200">
          <div className="flex items-start gap-4 mb-6">
            {/* Table Selection Area matching Screenshot 5 */}
            <div
              onClick={() => setShowTablePicker(true)}
              className="flex flex-col items-center justify-center cursor-pointer group"
            >
              <div className="p-2 rounded-lg group-hover:bg-slate-50 transition-colors">
                <TableIcon size={58} />
              </div>
              <span className="text-xs font-semibold text-[#6366F1] group-hover:underline mt-1 text-center">
                {selectedTableNumber ? `Mesa ${selectedTableNumber}` : 'Selecionar mesa'}
              </span>
            </div>

            {/* Customer Name Input matching Screenshot 5 */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Nome cliente
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ex: João, Família Silva..."
                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#43A047] focus:ring-1 focus:ring-[#43A047]"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                {selectedTableNumber
                  ? `Vinculado à Mesa ${selectedTableNumber}`
                  : 'Sem mesa? O pedido será aberto como Balcão'}
              </p>
            </div>
          </div>

          {/* Yellow/Amber Button matching Screenshot 5: Iniciar comanda */}
          <button
            onClick={handleStartComanda}
            className="w-full bg-[#FFB300] hover:bg-[#FFA000] active:bg-[#FF8F00] text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all active:scale-[0.99] text-base"
          >
            Iniciar comanda
          </button>
        </div>
      </div>

      {/* Select Table Modal */}
      {showTablePicker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-800 text-base">Selecionar Mesa</h3>
              <button
                onClick={() => setShowTablePicker(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2 py-1 rounded"
              >
                Fechar
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              {/* Option to clear table (Balcão) */}
              <button
                onClick={() => {
                  setSelectedTableNumber(null);
                  setShowTablePicker(false);
                }}
                className={`w-full mb-3 p-3 rounded-lg border text-left flex items-center justify-between ${
                  selectedTableNumber === null
                    ? 'border-[#43A047] bg-green-50 text-[#2E7D32] font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span>Balcão / Viagem (Sem Mesa)</span>
                {selectedTableNumber === null && <Check className="w-5 h-5 text-[#43A047]" />}
              </button>

              <div className="grid grid-cols-4 gap-2">
                {tables.map((table) => {
                  const isSelected = selectedTableNumber === table.number;
                  const isOccupied = table.status === 'ocupada';

                  return (
                    <button
                      key={table.number}
                      disabled={isOccupied}
                      onClick={() => {
                        setSelectedTableNumber(table.number);
                        setShowTablePicker(false);
                      }}
                      className={`p-2.5 rounded-lg border flex flex-col items-center justify-center relative transition-all ${
                        isOccupied
                          ? 'bg-slate-100 text-slate-400 border-slate-200 opacity-60 cursor-not-allowed'
                          : isSelected
                          ? 'border-[#43A047] bg-green-50 text-[#2E7D32] ring-2 ring-[#43A047]'
                          : 'border-slate-200 bg-white hover:border-[#43A047] text-slate-700'
                      }`}
                    >
                      <span className="text-xs font-bold">Mesa {table.number}</span>
                      <span className="text-[10px] mt-0.5">
                        {isOccupied ? 'Ocupada' : 'Livre'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
