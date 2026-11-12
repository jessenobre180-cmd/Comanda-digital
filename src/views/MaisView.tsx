import React, { useState } from 'react';
import { useComanda } from '../context/ComandaContext';
import {
  ChevronLeft,
  Search,
  Plus,
  Store,
  PieChart,
  Share2,
  Ban,
  Settings,
  X,
  Sparkles
} from 'lucide-react';
import { CategoryIcon } from '../components/CategoryIcons';
import { TableIcon } from '../components/TableIcon';

export const MaisView: React.FC = () => {
  const {
    goBack,
    navigateTo,
    categories,
    addCategory,
    setSelectedCategoryId,
  } = useComanda();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddCatModal, setShowAddCatModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [adsRemoved, setAdsRemoved] = useState(true);
  const [showAdsNotice, setShowAdsNotice] = useState(false);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = (catId: string) => {
    setSelectedCategoryId(catId);
    navigateTo('categoria_produtos');
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addCategory({
      name: newCatName.trim(),
      iconType: 'custom',
    });
    setNewCatName('');
    setShowAddCatModal(false);
  };

  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Lanche e Espetinho da Irmã Jéssica',
        text: 'Conheça o cardápio e comanda digital do Lanche e Espetinho da Irmã Jéssica!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-[#F1F5F9] min-h-0">
      {/* Header matching Screenshot 6 */}
      <div className="bg-[#43A047] text-white flex items-center justify-between px-4 h-14 shadow-md shrink-0">
        <button
          onClick={goBack}
          className="flex items-center gap-2 hover:opacity-80 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-xl font-bold tracking-tight">Mais</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Section 1: Categorias matching Screenshot 6 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-slate-800">Categorias</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1.5 text-slate-600 hover:text-slate-800 rounded-full hover:bg-slate-200"
                title="Buscar categoria"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowAddCatModal(true)}
                className="p-1.5 text-slate-600 hover:text-slate-800 rounded-full hover:bg-slate-200"
                title="Nova categoria"
              >
                <Plus className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {searchOpen && (
            <div className="mb-3 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filtrar categorias..."
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#43A047]"
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
          )}

          {/* 3-Column Categories Grid matching Screenshot 6 */}
          <div className="grid grid-cols-3 gap-3">
            {filteredCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs hover:border-[#43A047] hover:shadow-xs flex flex-col items-center justify-center text-center transition-all active:scale-95 group"
              >
                <div className="h-12 flex items-center justify-center my-1 group-hover:scale-105 transition-transform">
                  <CategoryIcon type={cat.iconType} size={46} />
                </div>
                <span className="text-xs font-semibold text-slate-700 mt-1 line-clamp-1">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Mais matching Screenshot 6 */}
        <div>
          <h2 className="text-base font-bold text-slate-800 mb-3">Mais</h2>

          {/* 2-Column Grid with blue outlined icons matching Screenshot 6 */}
          <div className="grid grid-cols-3 gap-2.5">
            {/* Mesas */}
            <button
              onClick={() => navigateTo('mesas')}
              className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs hover:border-sky-400 hover:shadow-xs flex flex-col items-center justify-center text-center transition-all active:scale-95"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 text-sky-600">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 18v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5" />
                  <path d="M4 13h16" />
                  <line x1="6" y1="18" x2="6" y2="21" />
                  <line x1="18" y1="18" x2="18" y2="21" />
                  <line x1="12" y1="11" x2="12" y2="6" />
                  <line x1="8" y1="6" x2="16" y2="6" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-slate-700">Mesas</span>
            </button>

            {/* Loja */}
            <button
              onClick={() => navigateTo('loja')}
              className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs hover:border-sky-400 hover:shadow-xs flex flex-col items-center justify-center text-center transition-all active:scale-95"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 text-sky-600">
                <Store className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <span className="text-xs font-semibold text-slate-700">Loja</span>
            </button>

            {/* Relatórios */}
            <button
              onClick={() => navigateTo('relatorios')}
              className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs hover:border-sky-400 hover:shadow-xs flex flex-col items-center justify-center text-center transition-all active:scale-95"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 text-sky-600">
                <PieChart className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <span className="text-xs font-semibold text-slate-700">Relatórios</span>
            </button>

            {/* Compartilhar */}
            <button
              onClick={handleShareApp}
              className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs hover:border-sky-400 hover:shadow-xs flex flex-col items-center justify-center text-center transition-all active:scale-95"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 text-sky-600">
                <Share2 className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <span className="text-xs font-semibold text-slate-700">Compartilhar</span>
            </button>

            {/* Remover Ads */}
            <button
              onClick={() => setShowAdsNotice(true)}
              className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs hover:border-sky-400 hover:shadow-xs flex flex-col items-center justify-center text-center transition-all active:scale-95"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 text-sky-600">
                <div className="relative">
                  <span className="font-extrabold text-[13px] tracking-tight border-2 border-sky-600 rounded-md px-1 py-0.5">
                    AD
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-7 h-0.5 bg-sky-600 -rotate-45"></div>
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-700">Remover Ads</span>
            </button>

            {/* Config. */}
            <button
              onClick={() => navigateTo('config_hub')}
              className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs hover:border-sky-400 hover:shadow-xs flex flex-col items-center justify-center text-center transition-all active:scale-95"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 text-sky-600">
                <Settings className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <span className="text-xs font-semibold text-slate-700">Config.</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddCatModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xs p-5">
            <h3 className="text-base font-bold text-slate-800 mb-3">Nova Categoria</h3>
            <form onSubmit={handleCreateCategory} className="space-y-3">
              <input
                type="text"
                autoFocus
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="Ex: Sobremesas, Bebidas..."
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#43A047]"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCatModal(false)}
                  className="px-3 py-1.5 rounded text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#43A047] hover:bg-[#388E3C] text-white rounded text-xs font-bold"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ads Removed Dialog */}
      {showAdsNotice && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-5 text-center">
            <div className="w-12 h-12 bg-emerald-100 text-[#43A047] rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">Versão Completa & Sem Anúncios</h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              O aplicativo <strong>Lanche e Espetinho da Irmã Jéssica</strong> está liberado na versão Premium sem propagandas para agilidade no atendimento de seus clientes!
            </p>
            <button
              onClick={() => setShowAdsNotice(false)}
              className="w-full bg-[#43A047] text-white font-bold py-2 rounded-lg text-xs"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
