import React from 'react';
import { Badge } from '../ui/badge';
import { AlertCircle } from 'lucide-react';
import type { Product } from './BusinessAdminTypes';

interface InventoryManagementProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
}

export function InventoryManagement({ products }: InventoryManagementProps) {
  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-5 py-4">
        <div className="mb-4">
          <h1 className="text-[24px] text-[#101828] mb-1">Inventory Management</h1>
          <p className="text-[13px] text-[#667085]">Product catalog and stock management</p>
        </div>

        <div className="bg-white border border-[#eaecf0] rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-[#f9fafb] border-b border-[#eaecf0]">
                <tr>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[200px]">Product</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[120px]">SKU</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[100px]">Category</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[100px]">Price</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[120px]">Stock</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[160px]">Store</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaecf0]">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-[#f9fafb]">
                    <td className="px-3 py-2.5 text-[12px] text-[#101828] truncate">{product.name}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085]">{product.sku}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085]">{product.category}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#101828]">{formatCurrency(product.price)}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-[#101828]">{product.stock}</span>
                        {product.stock <= product.lowStockThreshold && (
                          <Badge className="bg-[#fef3f2] text-[#b42318] text-[9px] flex items-center gap-0.5 px-1.5 py-0.5">
                            <AlertCircle className="h-2.5 w-2.5" />
                            Low
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085] truncate">{product.storeName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
