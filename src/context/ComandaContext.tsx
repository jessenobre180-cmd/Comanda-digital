import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Comanda,
  Table,
  Category,
  ProductItem,
  GeneralSettings,
  StoreInfo,
  ActiveScreen,
  PaymentMethod,
  OrderItem,
} from '../types';
import {
  INITIAL_STORE_INFO,
  INITIAL_SETTINGS,
  INITIAL_TABLES,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
} from '../data/initialData';

interface ComandaContextType {
  // Navigation
  activeScreen: ActiveScreen;
  screenHistory: ActiveScreen[];
  navigateTo: (screen: ActiveScreen) => void;
  goBack: () => void;

  // Data
  comandas: Comanda[];
  tables: Table[];
  categories: Category[];
  products: ProductItem[];
  settings: GeneralSettings;
  storeInfo: StoreInfo;

  // Selection
  selectedComandaId: string | null;
  setSelectedComandaId: (id: string | null) => void;
  selectedTableNumber: number | null;
  setSelectedTableNumber: (num: number | null) => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;

  // Modals & Receipts
  receiptModalComanda: Comanda | null;
  setReceiptModalComanda: (comanda: Comanda | null) => void;
  receiptType: 'customer' | 'kitchen';
  setReceiptType: (type: 'customer' | 'kitchen') => void;
  printerModalOpen: boolean;
  setPrinterModalOpen: (open: boolean) => void;
  whatsappModalComanda: Comanda | null;
  setWhatsappModalComanda: (comanda: Comanda | null) => void;
  paymentModalComanda: Comanda | null;
  setPaymentModalComanda: (comanda: Comanda | null) => void;

  // Comanda Operations
  startComanda: (tableNumber?: number | null, customerName?: string) => Comanda;
  addItemToComanda: (comandaId: string, product: ProductItem, quantity?: number, observation?: string) => void;
  removeItemFromComanda: (comandaId: string, orderItemId: string) => void;
  updateItemQuantity: (comandaId: string, orderItemId: string, delta: number) => void;
  updateComandaDiscountOrTip: (comandaId: string, discount: number, tipPercent: number) => void;
  closeComanda: (comandaId: string, paymentMethod: PaymentMethod, amountPaid?: number, change?: number, notes?: string) => void;
  reopenComanda: (comandaId: string) => void;
  cancelComanda: (comandaId: string) => void;

  // Tables
  addTable: (customName?: string) => void;
  deleteTable: (tableNumber: number) => void;

  // Categories & Products
  addProduct: (product: Omit<ProductItem, 'id'>) => void;
  updateProduct: (product: ProductItem) => void;
  deleteProduct: (productId: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (categoryId: string) => void;

  // Configuration
  updateSettings: (newSettings: Partial<GeneralSettings>) => void;
  updateStoreInfo: (newStoreInfo: Partial<StoreInfo>) => void;
  exportBackup: () => void;
  importBackup: (fileContent: string) => boolean;
  resetToDefaults: () => void;

  // Getters
  abertasCount: number;
  activeComandas: Comanda[];
  fechadasComandas: Comanda[];
  currentComanda: Comanda | undefined;
}

const STORAGE_KEYS = {
  COMANDAS: 'comanda_app_comandas',
  TABLES: 'comanda_app_tables',
  CATEGORIES: 'comanda_app_categories',
  PRODUCTS: 'comanda_app_products',
  SETTINGS: 'comanda_app_settings',
  STORE: 'comanda_app_store',
};

const ComandaContext = createContext<ComandaContextType | undefined>(undefined);

export const ComandaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Screen routing
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [screenHistory, setScreenHistory] = useState<ActiveScreen[]>(['home']);

  // Selection states
  const [selectedComandaId, setSelectedComandaId] = useState<string | null>(null);
  const [selectedTableNumber, setSelectedTableNumber] = useState<number | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Modals
  const [receiptModalComanda, setReceiptModalComanda] = useState<Comanda | null>(null);
  const [receiptType, setReceiptType] = useState<'customer' | 'kitchen'>('customer');
  const [printerModalOpen, setPrinterModalOpen] = useState(false);
  const [whatsappModalComanda, setWhatsappModalComanda] = useState<Comanda | null>(null);
  const [paymentModalComanda, setPaymentModalComanda] = useState<Comanda | null>(null);

  // Core Data with localStorage persistence
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STORE);
      return saved ? JSON.parse(saved) : INITIAL_STORE_INFO;
    } catch {
      return INITIAL_STORE_INFO;
    }
  });

  const [settings, setSettings] = useState<GeneralSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [tables, setTables] = useState<Table[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TABLES);
      return saved ? JSON.parse(saved) : INITIAL_TABLES;
    } catch {
      return INITIAL_TABLES;
    }
  });

  const [comandas, setComandas] = useState<Comanda[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMANDAS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync back to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STORE, JSON.stringify(storeInfo));
  }, [storeInfo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TABLES, JSON.stringify(tables));
  }, [tables]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMANDAS, JSON.stringify(comandas));
  }, [comandas]);

  // Sync table status with active comandas
  useEffect(() => {
    setTables((prevTables) =>
      prevTables.map((t) => {
        const activeComanda = comandas.find(
          (c) => c.status === 'aberta' && c.tableNumber === t.number
        );
        return {
          ...t,
          status: activeComanda ? 'ocupada' : 'livre',
          currentComandaId: activeComanda ? activeComanda.id : undefined,
        };
      })
    );
  }, [comandas]);

  // Navigation handlers
  const navigateTo = (screen: ActiveScreen) => {
    setScreenHistory((prev) => [...prev, screen]);
    setActiveScreen(screen);
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop(); // Remove current screen
      const previousScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setActiveScreen(previousScreen);
    } else {
      setActiveScreen('home');
    }
  };

  // Helper calculation for comanda
  const recalculateComandaTotals = (items: OrderItem[], tipPercent: number, discount: number = 0) => {
    const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
    const serviceChargeValue = (subtotal * (tipPercent || 0)) / 100;
    const total = Math.max(0, subtotal + serviceChargeValue - discount);
    return { subtotal, serviceChargeValue, total };
  };

  // Comanda actions
  const startComanda = (tableNumber?: number | null, customerName: string = ''): Comanda => {
    const nextNumber = comandas.length > 0 ? Math.max(...comandas.map((c) => c.number || 0)) + 1 : 1;
    const newComanda: Comanda = {
      id: `cmd_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      number: nextNumber,
      tableNumber: tableNumber ?? null,
      tableName: tableNumber ? `Mesa ${tableNumber}` : undefined,
      customerName: customerName.trim() || (tableNumber ? `Mesa ${tableNumber}` : `Cliente ${nextNumber}`),
      status: 'aberta',
      items: [],
      subtotal: 0,
      serviceChargePercent: settings.serviceFeePercent || 0,
      serviceChargeValue: 0,
      discount: 0,
      total: 0,
      createdAt: new Date().toISOString(),
    };

    setComandas((prev) => [newComanda, ...prev]);
    setSelectedComandaId(newComanda.id);
    return newComanda;
  };

  const addItemToComanda = (
    comandaId: string,
    product: ProductItem,
    quantity: number = 1,
    observation?: string
  ) => {
    setComandas((prev) =>
      prev.map((c) => {
        if (c.id !== comandaId) return c;

        // Check if item with same productId and same observation already exists
        const existingIndex = c.items.findIndex(
          (item) => item.productId === product.id && (item.observation || '') === (observation || '')
        );

        let newItems: OrderItem[];
        if (existingIndex > -1) {
          newItems = c.items.map((it, idx) =>
            idx === existingIndex ? { ...it, quantity: it.quantity + quantity } : it
          );
        } else {
          const newItem: OrderItem = {
            id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            observation: observation?.trim() || undefined,
            addedAt: new Date().toISOString(),
          };
          newItems = [...c.items, newItem];
        }

        const { subtotal, serviceChargeValue, total } = recalculateComandaTotals(
          newItems,
          c.serviceChargePercent,
          c.discount
        );

        return {
          ...c,
          items: newItems,
          subtotal,
          serviceChargeValue,
          total,
        };
      })
    );
  };

  const removeItemFromComanda = (comandaId: string, orderItemId: string) => {
    setComandas((prev) =>
      prev.map((c) => {
        if (c.id !== comandaId) return c;
        const newItems = c.items.filter((it) => it.id !== orderItemId);
        const { subtotal, serviceChargeValue, total } = recalculateComandaTotals(
          newItems,
          c.serviceChargePercent,
          c.discount
        );
        return {
          ...c,
          items: newItems,
          subtotal,
          serviceChargeValue,
          total,
        };
      })
    );
  };

  const updateItemQuantity = (comandaId: string, orderItemId: string, delta: number) => {
    setComandas((prev) =>
      prev.map((c) => {
        if (c.id !== comandaId) return c;
        const item = c.items.find((it) => it.id === orderItemId);
        if (!item) return c;

        const newQty = item.quantity + delta;
        let newItems: OrderItem[];

        if (newQty <= 0) {
          newItems = c.items.filter((it) => it.id !== orderItemId);
        } else {
          newItems = c.items.map((it) => (it.id === orderItemId ? { ...it, quantity: newQty } : it));
        }

        const { subtotal, serviceChargeValue, total } = recalculateComandaTotals(
          newItems,
          c.serviceChargePercent,
          c.discount
        );

        return {
          ...c,
          items: newItems,
          subtotal,
          serviceChargeValue,
          total,
        };
      })
    );
  };

  const updateComandaDiscountOrTip = (comandaId: string, discount: number, tipPercent: number) => {
    setComandas((prev) =>
      prev.map((c) => {
        if (c.id !== comandaId) return c;
        const { subtotal, serviceChargeValue, total } = recalculateComandaTotals(
          c.items,
          tipPercent,
          discount
        );
        return {
          ...c,
          discount,
          serviceChargePercent: tipPercent,
          serviceChargeValue,
          total,
        };
      })
    );
  };

  const closeComanda = (
    comandaId: string,
    paymentMethod: PaymentMethod,
    amountPaid?: number,
    change?: number,
    notes?: string
  ) => {
    setComandas((prev) =>
      prev.map((c) => {
        if (c.id !== comandaId) return c;
        return {
          ...c,
          status: 'fechada',
          paymentMethod,
          amountPaid: amountPaid ?? c.total,
          change: change ?? 0,
          closedAt: new Date().toISOString(),
          notes,
        };
      })
    );
  };

  const reopenComanda = (comandaId: string) => {
    setComandas((prev) =>
      prev.map((c) => {
        if (c.id !== comandaId) return c;
        return {
          ...c,
          status: 'aberta',
          closedAt: undefined,
          paymentMethod: undefined,
        };
      })
    );
  };

  const cancelComanda = (comandaId: string) => {
    setComandas((prev) =>
      prev.map((c) => {
        if (c.id !== comandaId) return c;
        return {
          ...c,
          status: 'cancelada',
          closedAt: new Date().toISOString(),
        };
      })
    );
  };

  // Table management
  const addTable = (customName?: string) => {
    const nextNumber = tables.length > 0 ? Math.max(...tables.map((t) => t.number)) + 1 : 1;
    const newTable: Table = {
      number: nextNumber,
      name: customName || `Mesa ${nextNumber}`,
      status: 'livre',
    };
    setTables((prev) => [...prev, newTable]);
  };

  const deleteTable = (tableNumber: number) => {
    setTables((prev) => prev.filter((t) => t.number !== tableNumber));
  };

  // Products & Categories
  const addProduct = (p: Omit<ProductItem, 'id'>) => {
    const newProduct: ProductItem = {
      ...p,
      id: `p_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (updated: ProductItem) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const addCategory = (cat: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...cat,
      id: `cat_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const updateCategory = (updated: Category) => {
    setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const deleteCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
  };

  // Settings & Store Info
  const updateSettings = (newSettings: Partial<GeneralSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const updateStoreInfo = (newStoreInfo: Partial<StoreInfo>) => {
    setStoreInfo((prev) => ({ ...prev, ...newStoreInfo }));
  };

  // Backup & Restore
  const exportBackup = () => {
    const backupData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      storeInfo,
      settings,
      tables,
      categories,
      products,
      comandas,
    };
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonStr);
    downloadAnchor.setAttribute('download', `backup_irma_jessica_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importBackup = (fileContent: string): boolean => {
    try {
      const data = JSON.parse(fileContent);
      if (data.storeInfo) setStoreInfo(data.storeInfo);
      if (data.settings) setSettings(data.settings);
      if (data.tables) setTables(data.tables);
      if (data.categories) setCategories(data.categories);
      if (data.products) setProducts(data.products);
      if (data.comandas) setComandas(data.comandas);
      return true;
    } catch {
      return false;
    }
  };

  const resetToDefaults = () => {
    setStoreInfo(INITIAL_STORE_INFO);
    setSettings(INITIAL_SETTINGS);
    setTables(INITIAL_TABLES);
    setCategories(INITIAL_CATEGORIES);
    setProducts(INITIAL_PRODUCTS);
    setComandas([]);
  };

  // Derived properties
  const activeComandas = comandas.filter((c) => c.status === 'aberta');
  const fechadasComandas = comandas.filter((c) => c.status === 'fechada');
  const abertasCount = activeComandas.length;
  const currentComanda = comandas.find((c) => c.id === selectedComandaId);

  return (
    <ComandaContext.Provider
      value={{
        activeScreen,
        screenHistory,
        navigateTo,
        goBack,
        comandas,
        tables,
        categories,
        products,
        settings,
        storeInfo,
        selectedComandaId,
        setSelectedComandaId,
        selectedTableNumber,
        setSelectedTableNumber,
        selectedCategoryId,
        setSelectedCategoryId,
        receiptModalComanda,
        setReceiptModalComanda,
        receiptType,
        setReceiptType,
        printerModalOpen,
        setPrinterModalOpen,
        whatsappModalComanda,
        setWhatsappModalComanda,
        paymentModalComanda,
        setPaymentModalComanda,
        startComanda,
        addItemToComanda,
        removeItemFromComanda,
        updateItemQuantity,
        updateComandaDiscountOrTip,
        closeComanda,
        reopenComanda,
        cancelComanda,
        addTable,
        deleteTable,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        updateSettings,
        updateStoreInfo,
        exportBackup,
        importBackup,
        resetToDefaults,
        abertasCount,
        activeComandas,
        fechadasComandas,
        currentComanda,
      }}
    >
      {children}
    </ComandaContext.Provider>
  );
};

export const useComanda = () => {
  const context = useContext(ComandaContext);
  if (!context) {
    throw new Error('useComanda must be used within a ComandaProvider');
  }
  return context;
};
