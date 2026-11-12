import React, { useState } from 'react';
import { useComanda } from '../context/ComandaContext';
import {
  ChevronLeft,
  TrendingUp,
  DollarSign,
  Receipt,
  CreditCard,
  QrCode,
  Banknote,
  Award,
  Calendar
} from 'lucide-react';

export const RelatoriosView: React.FC = () => {
  const { goBack, comandas } = useComanda();
  const [filterPeriod, setFilterPeriod] = useState<'hoje' | 'todos'>('todos');

  const closedComandas = comandas.filter((c) => {
    if (c.status !== 'fechada') return false;
    if (filterPeriod === 'hoje') {
      const today = new Date().toDateString();
      const closedDate = c.closedAt ? new Date(c.closedAt).toDateString() : '';
      return today === closedDate;
    }
    return true;
  });

  const totalRevenue = closedComandas.reduce((acc, c) => acc + c.total, 0);
  const totalOrders = closedComandas.length;
  const averageTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Breakdown by payment
  const paymentBreakdown = {
    pix: closedComandas.filter((c) => c.paymentMethod === 'pix').reduce((acc, c) => acc + c.total, 0),
    dinheiro: closedComandas.filter((c) => c.paymentMethod === 'dinheiro').reduce((acc, c) => acc + c.total, 0),
    cartao_credito: closedComandas.filter((c) => c.paymentMethod === 'cartao_credito').reduce((acc, c) => acc + c.total, 0),
    cartao_debito: closedComandas.filter((c) => c.paymentMethod === 'cartao_debito').reduce((acc, c) => acc + c.total, 0),
    outros: closedComandas.filter((c) => !c.paymentMethod || c.paymentMethod === 'outros').reduce((acc, c) => acc + c.total, 0),
  };

  // Top products
  const productCountMap: { [name: string]: { count: number; total: number } } = {};
  closedComandas.forEach((cmd) => {
    cmd.items.forEach((item) => {
      if (!productCountMap[item.name]) {
        productCountMap[item.name] = { count: 0, total: 0 };
      }
      productCountMap[item.name].count += item.quantity;
      productCountMap[item.name].total += item.price * item.quantity;
    });
  });

  const topProducts = Object.entries(productCountMap)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5);

  return (
    <div className="flex flex-col flex-1 bg-[#F1F5F9] min-h-0">
      {/* Header */}
      <div className="bg-[#43A047] text-white flex items-center justify-between px-4 h-14 shadow-md shrink-0">
        <button
          onClick={goBack}
          className="flex items-center gap-2 hover:opacity-80 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-xl font-bold tracking-tight">Relatórios de Vendas</span>
        </button>
      </div>

      {/* Period filter toggle */}
      <div className="p-3 bg-white border-b border-slate-200 flex justify-center">
        <div className="bg-slate-100 p-1 rounded-lg flex gap-1 w-full max-w-xs text-xs font-semibold">
          <button
            onClick={() => setFilterPeriod('hoje')}
            className={`flex-1 py-1.5 rounded-md text-center transition-colors ${
              filterPeriod === 'hoje' ? 'bg-[#43A047] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Vendas de Hoje
          </button>
          <button
            onClick={() => setFilterPeriod('todos')}
            className={`flex-1 py-1.5 rounded-md text-center transition-colors ${
              filterPeriod === 'todos' ? 'bg-[#43A047] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Histórico Total
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* KPI Cards */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 font-medium block">Faturamento</span>
            <span className="text-sm sm:text-base font-extrabold text-[#2E7D32] block truncate">
              R$ {totalRevenue.toFixed(2)}
            </span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 font-medium block">Comandas</span>
            <span className="text-sm sm:text-base font-extrabold text-slate-800 block">
              {totalOrders}
            </span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 font-medium block">Ticket Médio</span>
            <span className="text-sm sm:text-base font-extrabold text-[#6366F1] block truncate">
              R$ {averageTicket.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Payment Methods Breakdown */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
          <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#43A047]" />
            Recebimento por Forma de Pagamento
          </h3>

          <div className="space-y-2.5 text-xs">
            {/* Pix */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600">
                <QrCode className="w-4 h-4 text-teal-600" />
                Pix
              </span>
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-800">R$ {paymentBreakdown.pix.toFixed(2)}</span>
                <span className="text-slate-400 w-12 text-right">
                  {totalRevenue > 0 ? ((paymentBreakdown.pix / totalRevenue) * 100).toFixed(0) : 0}%
                </span>
              </div>
            </div>

            {/* Dinheiro */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600">
                <Banknote className="w-4 h-4 text-emerald-600" />
                Dinheiro
              </span>
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-800">R$ {paymentBreakdown.dinheiro.toFixed(2)}</span>
                <span className="text-slate-400 w-12 text-right">
                  {totalRevenue > 0 ? ((paymentBreakdown.dinheiro / totalRevenue) * 100).toFixed(0) : 0}%
                </span>
              </div>
            </div>

            {/* Cartão de Crédito */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600">
                <CreditCard className="w-4 h-4 text-indigo-600" />
                Cartão de Crédito
              </span>
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-800">R$ {paymentBreakdown.cartao_credito.toFixed(2)}</span>
                <span className="text-slate-400 w-12 text-right">
                  {totalRevenue > 0 ? ((paymentBreakdown.cartao_credito / totalRevenue) * 100).toFixed(0) : 0}%
                </span>
              </div>
            </div>

            {/* Cartão de Débito */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600">
                <CreditCard className="w-4 h-4 text-sky-600" />
                Cartão de Débito
              </span>
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-800">R$ {paymentBreakdown.cartao_debito.toFixed(2)}</span>
                <span className="text-slate-400 w-12 text-right">
                  {totalRevenue > 0 ? ((paymentBreakdown.cartao_debito / totalRevenue) * 100).toFixed(0) : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top 5 Products */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
          <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            Produtos Mais Vendidos
          </h3>

          {topProducts.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">Nenhuma venda registrada ainda.</p>
          ) : (
            <div className="space-y-2">
              {topProducts.map(([name, data], idx) => (
                <div key={name} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[10px]">
                      {idx + 1}º
                    </span>
                    <span className="font-semibold text-slate-800">{name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-700">{data.count} un.</span>
                    <span className="text-[11px] text-slate-400 ml-2">(R$ {data.total.toFixed(2)})</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
