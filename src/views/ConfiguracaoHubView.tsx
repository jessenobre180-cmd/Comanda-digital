import React, { useRef, useState } from 'react';
import { useComanda } from '../context/ComandaContext';
import {
  ChevronLeft,
  Settings,
  CreditCard,
  Database,
  HardDriveDownload,
  Server,
  FileCheck,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const ConfiguracaoHubView: React.FC = () => {
  const { goBack, navigateTo, exportBackup, importBackup } = useComanda();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [serverModalOpen, setServerModalOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importBackup(content);
      if (success) {
        setFeedbackMessage({ text: 'Backup restaurado com sucesso!', type: 'success' });
      } else {
        setFeedbackMessage({ text: 'Erro ao restaurar backup. Verifique o arquivo JSON.', type: 'error' });
      }
      setTimeout(() => setFeedbackMessage(null), 3500);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="flex flex-col flex-1 bg-[#F8FAFC] min-h-0">
      {/* Header matching Screenshot 4 */}
      <div className="bg-[#43A047] text-white flex items-center px-4 h-14 shadow-md shrink-0">
        <button
          onClick={goBack}
          className="flex items-center gap-2 hover:opacity-80 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-xl font-bold tracking-tight">Configuração</span>
        </button>
      </div>

      {feedbackMessage && (
        <div
          className={`mx-4 mt-3 p-3 rounded-lg text-xs font-semibold flex items-center gap-2 ${
            feedbackMessage.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
          }`}
        >
          {feedbackMessage.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {feedbackMessage.text}
        </div>
      )}

      {/* Hidden file input for Restore */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 2x3 Grid matching Screenshot 4 */}
      <div className="p-0 border-b border-slate-200">
        <div className="grid grid-cols-3 divide-x divide-y divide-slate-200 border-t border-slate-200 bg-white">
          {/* Geral */}
          <button
            onClick={() => navigateTo('config_geral')}
            className="p-6 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors active:bg-slate-100 min-h-[120px]"
          >
            <Settings className="w-8 h-8 text-[#0288D1] mb-2" strokeWidth={1.8} />
            <span className="text-sm font-medium text-slate-700">Geral</span>
          </button>

          {/* Pagamentos */}
          <button
            onClick={() => navigateTo('config_pagamentos')}
            className="p-6 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors active:bg-slate-100 min-h-[120px]"
          >
            <CreditCard className="w-8 h-8 text-[#0288D1] mb-2" strokeWidth={1.8} />
            <span className="text-sm font-medium text-slate-700">Pagamentos</span>
          </button>

          {/* Servidor */}
          <button
            onClick={() => setServerModalOpen(true)}
            className="p-6 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors active:bg-slate-100 min-h-[120px]"
          >
            <Database className="w-8 h-8 text-[#0288D1] mb-2" strokeWidth={1.8} />
            <span className="text-sm font-medium text-slate-700">Servidor</span>
          </button>

          {/* Backup */}
          <button
            onClick={exportBackup}
            className="p-6 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors active:bg-slate-100 min-h-[120px]"
          >
            <HardDriveDownload className="w-8 h-8 text-[#0288D1] mb-2" strokeWidth={1.8} />
            <span className="text-sm font-medium text-slate-700">Backup</span>
          </button>

          {/* Restaurar */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-6 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors active:bg-slate-100 min-h-[120px]"
          >
            <Server className="w-8 h-8 text-[#0288D1] mb-2" strokeWidth={1.8} />
            <span className="text-sm font-medium text-slate-700">Restaurar</span>
          </button>

          {/* Política de Privacidade */}
          <button
            onClick={() => navigateTo('privacidade')}
            className="p-6 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors active:bg-slate-100 min-h-[120px]"
          >
            <div className="w-8 h-8 mb-2 flex items-center justify-center">
              <FileCheck className="w-8 h-8 text-slate-400" strokeWidth={1.5} />
            </div>
            <span className="text-xs font-medium text-slate-700 text-center leading-tight">
              Política de Privacidade
            </span>
          </button>
        </div>
      </div>

      {/* Info footer */}
      <div className="p-4 text-center text-xs text-slate-400">
        Lanche e Espetinho da Irmã Jéssica • Versão 2.4.0 (Offline & Nuvem)
      </div>

      {/* Servidor Modal */}
      {serverModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-5 text-center">
            <div className="w-12 h-12 bg-sky-100 text-[#0288D1] rounded-full flex items-center justify-center mx-auto mb-3">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">Status do Servidor</h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              O aplicativo opera com <strong>Armazenamento Local Autônomo e Sincronização Automática</strong>. Todas as comandas e produtos são salvos com segurança no seu dispositivo mesmo sem conexão à internet.
            </p>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs text-slate-600 mb-4 text-left">
              <div>• Modo: <strong>Stand-alone Local Storage</strong></div>
              <div>• Latência: <strong>0 ms (Instantâneo)</strong></div>
              <div>• Backup: <strong>Disponível na aba Backup</strong></div>
            </div>
            <button
              onClick={() => setServerModalOpen(false)}
              className="w-full bg-[#43A047] text-white font-bold py-2 rounded-lg text-xs"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
