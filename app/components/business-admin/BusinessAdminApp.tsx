import React, { useState } from 'react';
import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { Badge } from '../ui/badge';
import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';
import { 
  Home,
  Users,
  Building,
  Store,
  CreditCard,
  ShoppingCart,
  Package,
  FileText,
  Receipt,
  Briefcase,
  BarChart3,
  Shield,
  HelpCircle,
  Settings
} from 'lucide-react';
import type { Screen, User, Business, Store as StoreType, Order, Product, Invoice, Expense, Transaction, AuditLog, SupportTicket } from './BusinessAdminTypes';
import { mockMetrics, mockUsers, mockBusinesses, mockStores, mockOrders, mockProducts, mockInvoices, mockExpenses, mockTransactions, mockAuditLogs, mockTickets } from './MockBusinessData';
import { AdminDashboard } from './AdminDashboard';
import { UserManagement } from './UserManagement';
import { BusinessManagement } from './BusinessManagement';
import { StoreManagement } from './StoreManagement';
import { OrderManagement } from './OrderManagement';
import { InventoryManagement } from './InventoryManagement';
import { InvoiceManagement } from './InvoiceManagement';
import { ExpenseManagement } from './ExpenseManagement';
import { TransactionManagement } from './TransactionManagement';
import { AuditLogs } from './AuditLogs';
import { SupportCenter } from './SupportCenter';

interface BusinessAdminAppProps {
  onBackToSelector: () => void;
}

export function BusinessAdminApp({ onBackToSelector }: BusinessAdminAppProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  // State management
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [businesses, setBusinesses] = useState<Business[]>(mockBusinesses);
  const [stores, setStores] = useState<StoreType[]>(mockStores);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets);

  // Sidebar Component
  function SidebarContent() {
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'users', label: 'User Management', icon: Users },
      { id: 'businesses', label: 'Business Management', icon: Building },
      { id: 'stores', label: 'Store Management', icon: Store },
      { id: 'payments', label: 'Payment Management', icon: CreditCard },
      { id: 'orders', label: 'Order Management', icon: ShoppingCart },
      { id: 'inventory', label: 'Inventory Management', icon: Package },
      { id: 'invoices', label: 'Invoice Management', icon: FileText },
      { id: 'expenses', label: 'Expense Management', icon: Receipt },
      { id: 'transactions', label: 'Transaction Management', icon: Briefcase },
      { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
      { id: 'audit', label: 'Audit Logs', icon: Shield },
      { id: 'support', label: 'Support Center', icon: HelpCircle },
      { id: 'settings', label: 'System Settings', icon: Settings }
    ];

    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="h-[65px] border-b border-[#d0d5dd] flex items-center px-[16px]">
          <div className="flex items-center gap-[10px]">
            <img src={accessLogo} alt="Access Bank" className="h-8" />
            <div>
              <h1 className="text-[14px] font-bold text-[#003883]">Service Central</h1>
              <p className="text-[12px] text-[#526484]">Business Admin</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="px-[16px] py-[16px] border-b border-[#d0d5dd]">
          <div className="text-[18px] text-[#003883]">Business Admin</div>
          <div className="flex items-center gap-2 mt-1">
            <Users className="h-4 w-4 text-[#526484]" />
            <span className="text-[12px] text-[#526484]">Role:</span>
            <Badge className="bg-[#003883] text-white text-[11px] h-5">
              Admin
            </Badge>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-[16px] scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id as Screen)}
                  className={`w-full px-3 py-2 rounded-lg text-left transition-colors ${
                    currentScreen === item.id
                      ? 'bg-[#003883] text-white'
                      : 'bg-white hover:bg-[#f8f9fa] border border-[#e2e8f0] text-[#003883]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span className="text-[13px]">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Back Button */}
        <div className="p-[16px] border-t border-[#d0d5dd]">
          <button
            onClick={onBackToSelector}
            className="w-full px-4 py-2 rounded-lg bg-white border border-[#e2e8f0] text-[#003883] hover:bg-[#f8f9fa] transition-colors text-[14px]"
          >
            ← Back to Systems
          </button>
        </div>
      </div>
    );
  }

  // Header Component
  function HeaderContent() {
    return <div className="h-full" />;
  }

  return (
    <ServiceCentralLayout
      sidebarContent={<SidebarContent />}
      headerContent={<HeaderContent />}
    >
      {currentScreen === 'dashboard' && (
        <AdminDashboard metrics={mockMetrics} />
      )}

      {currentScreen === 'users' && (
        <UserManagement 
          users={users}
          onUpdateUsers={setUsers}
        />
      )}

      {currentScreen === 'businesses' && (
        <BusinessManagement 
          businesses={businesses}
          onUpdateBusinesses={setBusinesses}
        />
      )}

      {currentScreen === 'stores' && (
        <StoreManagement 
          stores={stores}
          onUpdateStores={setStores}
        />
      )}

      {currentScreen === 'orders' && (
        <OrderManagement 
          orders={orders}
          onUpdateOrders={setOrders}
        />
      )}

      {currentScreen === 'inventory' && (
        <InventoryManagement 
          products={products}
          onUpdateProducts={setProducts}
        />
      )}

      {currentScreen === 'invoices' && (
        <InvoiceManagement 
          invoices={invoices}
          onUpdateInvoices={setInvoices}
        />
      )}

      {currentScreen === 'expenses' && (
        <ExpenseManagement 
          expenses={expenses}
          onUpdateExpenses={setExpenses}
        />
      )}

      {currentScreen === 'transactions' && (
        <TransactionManagement 
          transactions={transactions}
        />
      )}

      {currentScreen === 'audit' && (
        <AuditLogs logs={auditLogs} />
      )}

      {currentScreen === 'support' && (
        <SupportCenter 
          tickets={tickets}
          onUpdateTickets={setTickets}
        />
      )}

      {currentScreen === 'payments' && (
        <div className="h-full bg-[#f9fafb] flex items-center justify-center">
          <div className="text-center">
            <CreditCard className="h-12 w-12 text-[#003883] mx-auto mb-4" />
            <h2 className="text-[24px] text-[#101828] mb-2">Payment Management</h2>
            <p className="text-[14px] text-[#667085]">Payment processing and gateway integration</p>
          </div>
        </div>
      )}

      {currentScreen === 'reports' && (
        <div className="h-full bg-[#f9fafb] flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-[#003883] mx-auto mb-4" />
            <h2 className="text-[24px] text-[#101828] mb-2">Reports & Analytics</h2>
            <p className="text-[14px] text-[#667085]">Business intelligence and reporting</p>
          </div>
        </div>
      )}

      {currentScreen === 'settings' && (
        <div className="h-full bg-[#f9fafb] flex items-center justify-center">
          <div className="text-center">
            <Settings className="h-12 w-12 text-[#003883] mx-auto mb-4" />
            <h2 className="text-[24px] text-[#101828] mb-2">System Settings</h2>
            <p className="text-[14px] text-[#667085]">Application configuration and settings</p>
          </div>
        </div>
      )}
    </ServiceCentralLayout>
  );
}
