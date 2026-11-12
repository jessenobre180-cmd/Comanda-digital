import { Category, ProductItem, Table, GeneralSettings, StoreInfo } from '../types';

export const INITIAL_STORE_INFO: StoreInfo = {
  name: "Lanche e Espetinho da Irmã Jéssica",
  tagline: "O melhor lanche e espetinho da cidade!",
  phone: "(11) 98765-4321",
  address: "Av. Principal, 450 - Bairro da Paz",
  pixKey: "irma.jessica@espetinho.com.br",
  pixType: "email",
  receiptFooterMessage: "Agradecemos a preferência! Que Deus abençoe seu dia! Volte sempre!"
};

export const INITIAL_SETTINGS: GeneralSettings = {
  useTables: true,
  serviceFeePercent: 0.0,
  currencySymbol: "R$",
  resetNumberDaily: false,
  paperType: "58mm",
  fontSizePx: 11.0,
  printerName: "Impressora Térmica 58mm (Padrão)",
  printerType: "navegador",
  printKitchenCopy: true,
  printCustomerCopy: true,
  autoPrintOrders: true,
  autoPrintTarget: 'kitchen',
};

export const INITIAL_TABLES: Table[] = Array.from({ length: 20 }, (_, i) => ({
  number: i + 1,
  name: `Mesa ${i + 1}`,
  status: 'livre',
}));

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat_espetinhos', name: 'Espetinhos', iconType: 'espetinhos' },
  { id: 'cat_bebidas', name: 'Bebidas', iconType: 'bebidas' },
  { id: 'cat_hamburguer', name: 'Hambúrguer', iconType: 'hamburguer' },
  { id: 'cat_porcoes', name: 'Porções', iconType: 'porcoes' },
  { id: 'cat_salgados', name: 'Salgados', iconType: 'salgados' },
  { id: 'cat_pizza', name: 'Pizza', iconType: 'pizza' },
  { id: 'cat_frios', name: 'Frios', iconType: 'frios' },
  { id: 'cat_diversos', name: 'Diversos', iconType: 'diversos' },
];

export const INITIAL_PRODUCTS: ProductItem[] = [
  // Espetinhos da Irmã Jéssica
  { id: 'p_esp_carne', categoryId: 'cat_espetinhos', name: 'Espetinho de Carne', price: 8.00, available: true, description: 'Alcatra macia grelhada na brasa' },
  { id: 'p_esp_frango_bacon', categoryId: 'cat_espetinhos', name: 'Espetinho de Frango c/ Bacon', price: 8.50, available: true, description: 'Cubos de peito envolvidos em bacon crocante' },
  { id: 'p_esp_queijo', categoryId: 'cat_espetinhos', name: 'Espetinho de Queijo Coalho', price: 8.00, available: true, description: 'Queijo coalho tostadinho com melaço opcional' },
  { id: 'p_esp_kafta', categoryId: 'cat_espetinhos', name: 'Kafta Recheada', price: 9.00, available: true, description: 'Carne temperada recheada com queijo' },
  { id: 'p_esp_coracao', categoryId: 'cat_espetinhos', name: 'Espetinho de Coração', price: 8.50, available: true, description: 'Coração de frango temperado' },
  { id: 'p_esp_linguica', categoryId: 'cat_espetinhos', name: 'Espetinho de Linguiça Toscana', price: 7.50, available: true, description: 'Linguiça toscana suculenta' },
  { id: 'p_esp_pao_alho', categoryId: 'cat_espetinhos', name: 'Pão de Alho Especial', price: 6.50, available: true, description: 'Pão recheado com creme de alho e ervas' },
  { id: 'p_esp_medalhao', categoryId: 'cat_espetinhos', name: 'Medalhão de Frango', price: 9.50, available: true, description: 'Frango com queijo e bacon especial' },

  // Hambúrguer
  { id: 'p_burg_xtudo', categoryId: 'cat_hamburguer', name: 'X-Tudo da Irmã Jéssica', price: 24.00, available: true, description: 'Pão, carne artesanal, bacon, queijo, presunto, ovo, salada, milho, batata palha e maionese especial' },
  { id: 'p_burg_xburguer', categoryId: 'cat_hamburguer', name: 'X-Burguer Especial', price: 16.00, available: true, description: 'Pão selado, burger artesanal 150g e queijo derretido' },
  { id: 'p_burg_xbacon', categoryId: 'cat_hamburguer', name: 'X-Bacon Supremo', price: 21.00, available: true, description: 'Burger, queijo prato, muito bacon e molho especial' },
  { id: 'p_burg_xfrango', categoryId: 'cat_hamburguer', name: 'X-Frango c/ Catupiry', price: 19.00, available: true, description: 'Filé de frango desfiado, catupiry original e milho' },

  // Bebidas
  { id: 'p_beb_coca', categoryId: 'cat_bebidas', name: 'Coca-Cola Lata 350ml', price: 6.00, available: true },
  { id: 'p_beb_guarana', categoryId: 'cat_bebidas', name: 'Guaraná Antarctica Lata', price: 6.00, available: true },
  { id: 'p_beb_suco_laranja', categoryId: 'cat_bebidas', name: 'Suco Natural Laranja 500ml', price: 8.00, available: true },
  { id: 'p_beb_cerveja_hnk', categoryId: 'cat_bebidas', name: 'Heineken Long Neck', price: 10.00, available: true },
  { id: 'p_beb_cerveja_lata', categoryId: 'cat_bebidas', name: 'Cerveja Lata (Brahma/Skol)', price: 6.00, available: true },
  { id: 'p_beb_agua', categoryId: 'cat_bebidas', name: 'Água Mineral sem Gás 500ml', price: 4.00, available: true },
  { id: 'p_beb_agua_gas', categoryId: 'cat_bebidas', name: 'Água Mineral com Gás', price: 4.50, available: true },

  // Porções
  { id: 'p_porc_fritas', categoryId: 'cat_porcoes', name: 'Batata Frita c/ Cheddar e Bacon', price: 26.00, available: true, description: '500g de batata crocante' },
  { id: 'p_porc_mandioca', categoryId: 'cat_porcoes', name: 'Mandioca Frita com Alho', price: 22.00, available: true },
  { id: 'p_porc_farofa_vina', categoryId: 'cat_porcoes', name: 'Combo Farofa & Vinagrete', price: 8.00, available: true, description: 'Acompanhamento perfeito para espetinhos' },
  { id: 'p_porc_calabresa', categoryId: 'cat_porcoes', name: 'Calabresa Acebolada c/ Pão', price: 28.00, available: true },

  // Salgados
  { id: 'p_salg_coxinha', categoryId: 'cat_salgados', name: 'Coxinha com Catupiry', price: 7.00, available: true },
  { id: 'p_salg_pastel_carne', categoryId: 'cat_salgados', name: 'Pastel Frito de Carne', price: 9.00, available: true },
  { id: 'p_salg_pastel_queijo', categoryId: 'cat_salgados', name: 'Pastel Frito de Queijo', price: 9.00, available: true },
  { id: 'p_salg_enroladinho', categoryId: 'cat_salgados', name: 'Enroladinho de Presunto e Queijo', price: 6.50, available: true },

  // Pizza
  { id: 'p_piz_calabresa', categoryId: 'cat_pizza', name: 'Pizza Brotinho Calabresa', price: 18.00, available: true },
  { id: 'p_piz_frango', categoryId: 'cat_pizza', name: 'Pizza Brotinho Frango c/ Catupiry', price: 20.00, available: true },
  { id: 'p_piz_queijo', categoryId: 'cat_pizza', name: 'Pizza Brotinho 4 Queijos', price: 22.00, available: true },

  // Frios
  { id: 'p_frio_tabua', categoryId: 'cat_frios', name: 'Tábua de Frios Mista', price: 34.00, available: true, description: 'Salame italiano, queijo prato em cubos, azeitonas e palmito' },

  // Diversos
  { id: 'p_div_doce', categoryId: 'cat_diversos', name: 'Doce Caseiro em Pedaço', price: 5.00, available: true },
  { id: 'p_div_picole', categoryId: 'cat_diversos', name: 'Picolé de Frutas', price: 4.00, available: true },
];
