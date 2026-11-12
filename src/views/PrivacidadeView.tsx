import React from 'react';
import { useComanda } from '../context/ComandaContext';
import { ChevronLeft, ShieldCheck } from 'lucide-react';

export const PrivacidadeView: React.FC = () => {
  const { goBack } = useComanda();

  return (
    <div className="flex flex-col flex-1 bg-[#F8FAFC] min-h-0">
      {/* Header */}
      <div className="bg-[#43A047] text-white flex items-center justify-between px-4 h-14 shadow-md shrink-0">
        <button
          onClick={goBack}
          className="flex items-center gap-2 hover:opacity-80 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-xl font-bold tracking-tight">Política de Privacidade</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 max-w-lg mx-auto text-slate-700 text-xs space-y-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-[#43A047] font-bold text-sm">
            <ShieldCheck className="w-5 h-5" />
            Privacidade e Proteção de Dados
          </div>

          <p className="leading-relaxed">
            O aplicativo <strong>Lanche e Espetinho da Irmã Jéssica - Comanda Digital</strong> respeita integralmente a privacidade dos seus usuários e clientes.
          </p>

          <h4 className="font-bold text-slate-800 text-xs pt-2">1. Armazenamento Local Seguro</h4>
          <p className="leading-relaxed">
            Todos os dados de pedidos, mesas, cardápios e histórico financeiro são armazenados diretamente no dispositivo do operador (armazenamento local). Nenhuma informação confidencial de clientes ou valores é transmitida para terceiros.
          </p>

          <h4 className="font-bold text-slate-800 text-xs pt-2">2. Backup e Portabilidade</h4>
          <p className="leading-relaxed">
            Você é o único proprietário dos dados do seu restaurante. É possível realizar o download do backup em formato aberto (JSON) a qualquer momento através do menu Configurações &gt; Backup.
          </p>

          <h4 className="font-bold text-slate-800 text-xs pt-2">3. Uso de Impressoras e Compartilhamento</h4>
          <p className="leading-relaxed">
            A emissão de recibos e vias de cozinha é processada localmente nos padrões térmicos 58mm / 80mm através dos drivers do navegador ou conexão direta com impressoras térmicas ESC/POS.
          </p>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
            Última atualização: Novembro de 2026 • Lanche e Espetinho da Irmã Jéssica
          </div>
        </div>
      </div>
    </div>
  );
};
