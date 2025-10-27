import React from 'react';
import { Card } from '../ui/card';
import { ArrowUp, ArrowDown, Users, Building, TrendingUp, DollarSign } from 'lucide-react';
import type { DashboardMetrics } from './BusinessAdminTypes';

interface AdminDashboardProps {
  metrics: DashboardMetrics;
}

export function AdminDashboard({ metrics }: AdminDashboardProps) {
  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;
  const formatNumber = (num: number) => num.toLocaleString();

  const metricCards = [
    {
      title: 'Total Users',
      value: formatNumber(metrics.totalUsers),
      change: metrics.usersChange,
      icon: Users,
      color: 'text-[#003883]'
    },
    {
      title: 'Active Businesses',
      value: formatNumber(metrics.activeBusinesses),
      change: metrics.businessesChange,
      icon: Building,
      color: 'text-[#ff8200]'
    },
    {
      title: 'Daily Transactions',
      value: formatNumber(metrics.dailyTransactions),
      change: metrics.transactionsChange,
      icon: TrendingUp,
      color: 'text-[#16a34a]'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(metrics.totalRevenue),
      change: metrics.revenueChange,
      icon: DollarSign,
      color: 'text-[#7c3aed]'
    }
  ];

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-5 py-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-[24px] text-[#101828] mb-1">Dashboard</h1>
          <p className="text-[13px] text-[#667085]">
            System overview and key metrics
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {metricCards.map((metric) => {
            const Icon = metric.icon;
            const isPositive = metric.change >= 0;
            return (
              <Card key={metric.title} className="p-4 border-[#eaecf0]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] text-[#667085]">{metric.title}</span>
                  <div className={`p-1.5 rounded-lg bg-[#f9fafb] ${metric.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-[22px] text-[#101828] mb-1.5">{metric.value}</div>
                <div className="flex items-center gap-1">
                  {isPositive ? (
                    <ArrowUp className="h-3.5 w-3.5 text-[#16a34a]" />
                  ) : (
                    <ArrowDown className="h-3.5 w-3.5 text-[#dc2626]" />
                  )}
                  <span className={`text-[11px] ${isPositive ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>
                    {Math.abs(metric.change)}%
                  </span>
                  <span className="text-[11px] text-[#667085]">vs last month</span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-4 border-[#eaecf0]">
            <h3 className="text-[16px] text-[#101828] mb-3">Recent Activity</h3>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 p-2.5 bg-[#f9fafb] rounded-lg">
                <div className="w-2 h-2 rounded-full bg-[#16a34a]"></div>
                <div className="flex-1">
                  <p className="text-[13px] text-[#101828]">New business registered</p>
                  <p className="text-[11px] text-[#667085]">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-[#f9fafb] rounded-lg">
                <div className="w-2 h-2 rounded-full bg-[#003883]"></div>
                <div className="flex-1">
                  <p className="text-[13px] text-[#101828]">Order completed</p>
                  <p className="text-[11px] text-[#667085]">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-[#f9fafb] rounded-lg">
                <div className="w-2 h-2 rounded-full bg-[#ff8200]"></div>
                <div className="flex-1">
                  <p className="text-[13px] text-[#101828]">Payment processed</p>
                  <p className="text-[11px] text-[#667085]">28 minutes ago</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-[#eaecf0]">
            <h3 className="text-[16px] text-[#101828] mb-3">System Status</h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#667085]">API Services</span>
                <span className="text-[11px] text-[#16a34a] bg-[#ecfdf3] px-2 py-0.5 rounded">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#667085]">Database</span>
                <span className="text-[11px] text-[#16a34a] bg-[#ecfdf3] px-2 py-0.5 rounded">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#667085]">Payment Gateway</span>
                <span className="text-[11px] text-[#16a34a] bg-[#ecfdf3] px-2 py-0.5 rounded">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#667085]">Email Service</span>
                <span className="text-[11px] text-[#16a34a] bg-[#ecfdf3] px-2 py-0.5 rounded">Operational</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
