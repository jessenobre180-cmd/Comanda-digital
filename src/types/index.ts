export type PaymentMethod = 'dinheiro' | 'pix' | 'cartao_credito' | 'cartao_debito' | 'outros';

export interface ProductItem {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  description?: string;
  code?: string;
  available: boolean;
}

export interface Category {
  id: string;
  name: string;
  iconType: 'bebidas' | 'diversos' | 'frios' | 'hamburguer' | 'pizza' | 'porcoes' | 'salgados' | 'espetinhos' | 'custom';
  color?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  observation?: string;
  addedAt: string;
}

export interface Comanda {
  id: string;
  number: number;
  tableNumber?: number | null;
  tableName?: string;
  customerName: string;
  status: 'aberta' | 'fechada' | 'cancelada';
  items: OrderItem[];
  subtotal: number;
  serviceChargePercent: number; // Gorjeta
  serviceChargeValue: number;
  discount: number;
  total: number;
  createdAt: string;
  closedAt?: string;
  paymentMethod?: PaymentMethod;
  amountPaid?: number;
  change?: number;
  notes?: string;
}

export interface Table {
  number: number;
  name?: string;
  status: 'livre' | 'ocupada';
  currentComandaId?: string;
}

export interface GeneralSettings {
  useTables: boolean; // Usar mesas em comanda
  serviceFeePercent: number; // Gorjeta(%)
  currencySymbol: string; // Símbolo Moeda: R$
  resetNumberDaily: boolean; // Resetar Número da Comanda quando abrir app em outro dia
  paperType: '58mm' | '80mm' | 'A4'; // Config. Documentos Tipo papel
  fontSizePx: number; // Tamanho Letra (px)
  printerName?: string;
  printerType: 'bluetooth' | 'usb' | 'rede' | 'navegador';
  printKitchenCopy: boolean;
  printCustomerCopy: boolean;
  autoPrintOrders: boolean; // Impressão Automática de Pedidos
  autoPrintTarget: 'kitchen' | 'customer'; // Destino da impressão automática (Cozinha ou Cliente)
}

export interface StoreInfo {
  name: string;
  tagline: string;
  phone: string;
  address: string;
  pixKey: string;
  pixType: 'cpf' | 'cnpj' | 'telefone' | 'email' | 'aleatoria';
  receiptFooterMessage: string;
}

export type ActiveScreen = 
  | 'home' // Comandas Abertas
  | 'mesas' // Grid de Mesas
  | 'comanda_nova' // Iniciar comanda
  | 'comanda_detalhes' // Detalhes da comanda ativa
  | 'comandas_fechadas' // Histórico de fechadas
  | 'mais' // Menu Mais
  | 'categorias' // Gestão de categorias e cardápio
  | 'categoria_produtos' // Produtos de uma categoria
  | 'loja' // Dados do estabelecimento
  | 'relatorios' // Faturamento e estatísticas
  | 'config_hub' // Configurações (Geral, Pagamentos, Backup, etc)
  | 'config_geral' // Configuração Geral
  | 'config_pagamentos' // Formas de pagamento
  | 'privacidade'; // Política de Privacidade
