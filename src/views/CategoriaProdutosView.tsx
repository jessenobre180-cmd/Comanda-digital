import React, { useState } from 'react';
import { useComanda } from '../context/ComandaContext';
import {
  ChevronLeft,
  Plus,
  Search,
  Trash2,
  Edit2,
  Check,
  X,
  Package,
} from 'lucide-react';
import { ProductItem } from '../types';
import { CategoryIcon } from '../components/CategoryIcons';

export const CategoriaProdutosView: React.FC = () => {
  const {
    goBack,
    categories,
    products,
    selectedCategoryId,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useComanda();

  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [priceStr, setPriceStr] = useState('');
  const [description, setDescription] = useState('');
  const [available, setAvailable] = useState(true);

  const currentCategory = categories.find((c) => c.id === selectedCategoryId) || categories[0];

  const categoryProducts = products.filter(
    (p) => p.categoryId === currentCategory?.id
  );

  const filteredProducts = categoryProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setName('');
    setPriceStr('');
    setDescription('');
    setAvailable(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (p: ProductItem) => {
    setEditingProduct(p);
    setName(p.name);
    setPriceStr(p.price.toFixed(2).replace('.', ','));
    setDescription(p.description || '');
    setAvailable(p.available);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const price = parseFloat(priceStr.replace(',', '.')) || 0;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: name.trim(),
        price,
        description: description.trim() || undefined,
        available,
      });
    } else {
      addProduct({
        categoryId: currentCategory.id,
        name: name.trim(),
        price,
        description: description.trim() || undefined,
        available,
      });
    }

    setModalOpen(false);
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
          <span className="text-xl font-bold tracking-tight">
            {currentCategory?.name || 'Produtos'}
          </span>
        </button>

        <button
          onClick={handleOpenAdd}
          className="p-1.5 hover:bg-black/10 rounded-full transition-colors"
          title="Novo Produto"
        >
          <Plus className="w-6 h-6 text-white stroke-[2.5]" />
        </button>
      </div>

      {/* Category banner */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3">
        <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center shrink-0">
          <CategoryIcon type={currentCategory?.iconType || 'diversos'} size={38} />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-800">{currentCategory?.name}</h2>
          <span className="text-xs text-slate-500">
            {categoryProducts.length} itens cadastrados no cardápio
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
            placeholder={`Buscar em ${currentCategory?.name}...`}
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

      {/* Products List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center text-slate-400">
            <Package className="w-10 h-10 mb-2 opacity-50" />
            <p className="text-sm font-medium">Nenhum produto cadastrado nesta categoria.</p>
            <button
              onClick={handleOpenAdd}
              className="mt-3 text-xs font-bold text-[#43A047] hover:underline"
            >
              + Adicionar Primeiro Item
            </button>
          </div>
        ) : (
          filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-lg p-3 border border-slate-200 shadow-2xs hover:border-[#43A047] flex items-center justify-between gap-3"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-800 text-sm truncate">{prod.name}</h3>
                  {!prod.available && (
                    <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                      Esgotado
                    </span>
                  )}
                </div>
                {prod.description && (
                  <p className="text-xs text-slate-400 truncate mt-0.5">{prod.description}</p>
                )}
                <span className="font-extrabold text-sm text-[#2E7D32] mt-1 block">
                  R$ {prod.price.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleOpenEdit(prod)}
                  className="p-2 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded-md"
                  title="Editar Produto"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteProduct(prod.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md"
                  title="Excluir Produto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-5 animate-in fade-in">
            <h3 className="text-base font-bold text-slate-800 mb-3">
              {editingProduct ? 'Editar Produto' : 'Novo Produto'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nome do Item:
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Espetinho de Picanha..."
                  className="w-full border border-slate-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#43A047]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preço (R$):
                </label>
                <input
                  type="text"
                  required
                  value={priceStr}
                  onChange={(e) => setPriceStr(e.target.value)}
                  placeholder="Ex: 8,50"
                  className="w-full border border-slate-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#43A047]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Descrição / Ingredientes (Opcional):
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: Acompanha farofa da casa e vinagrete..."
                  rows={2}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#43A047]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="availCheck"
                  checked={available}
                  onChange={(e) => setAvailable(e.target.checked)}
                  className="rounded text-[#43A047] focus:ring-[#43A047]"
                />
                <label htmlFor="availCheck" className="text-xs text-slate-700 select-none">
                  Item disponível para venda
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 rounded text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#43A047] hover:bg-[#388E3C] text-white rounded text-xs font-bold shadow-xs"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
