import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search, Plus, Download, Eye, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { User, UserRole, UserStatus, KYCStatus } from './BusinessAdminTypes';

interface UserManagementProps {
  users: User[];
  onUpdateUsers: (users: User[]) => void;
}

export function UserManagement({ users, onUpdateUsers }: UserManagementProps) {
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => {
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesStatus && matchesSearch;
  });

  const getRoleBadge = (role: UserRole) => {
    const config = {
      'admin': { bg: 'bg-[#eff8ff]', text: 'text-[#175cd3]', border: 'border-[#b2ddff]' },
      'manager': { bg: 'bg-[#f9f5ff]', text: 'text-[#6941c6]', border: 'border-[#e9d7fe]' },
      'staff': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]', border: 'border-[#d1fadf]' },
      'customer': { bg: 'bg-[#f2f4f7]', text: 'text-[#344054]', border: 'border-[#d0d5dd]' }
    };
    const style = config[role];
    return <Badge className={`${style.bg} ${style.text} border ${style.border} text-[12px]`}>{role}</Badge>;
  };

  const getStatusBadge = (status: UserStatus) => {
    const config = {
      'active': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]', border: 'border-[#d1fadf]' },
      'inactive': { bg: 'bg-[#f2f4f7]', text: 'text-[#344054]', border: 'border-[#d0d5dd]' },
      'suspended': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]', border: 'border-[#fecdca]' }
    };
    const style = config[status];
    return <Badge className={`${style.bg} ${style.text} border ${style.border} text-[12px]`}>{status}</Badge>;
  };

  const getKYCBadge = (kycStatus: KYCStatus) => {
    const config = {
      'verified': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]', border: 'border-[#d1fadf]' },
      'pending': { bg: 'bg-[#fff7ed]', text: 'text-[#f79009]', border: 'border-[#fec84b]' },
      'rejected': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]', border: 'border-[#fecdca]' }
    };
    const style = config[kycStatus];
    return <Badge className={`${style.bg} ${style.text} border ${style.border} text-[12px]`}>{kycStatus}</Badge>;
  };

  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-5 py-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-[24px] text-[#101828] mb-1">User Management</h1>
          <p className="text-[13px] text-[#667085]">Manage staff, managers, and customers</p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4 gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v as UserRole | 'all')}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as UserStatus | 'all')}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => toast.success('Users exported')} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => toast.success('Add user modal opened')} className="bg-[#003883] hover:bg-[#002664]">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white border border-[#eaecf0] rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-[#f9fafb] border-b border-[#eaecf0]">
                <tr>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[180px]">Name</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[180px]">Contact</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[90px]">Role</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[80px]">Status</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[80px]">KYC</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[140px]">Business</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[110px]">Revenue</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[90px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaecf0]">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#f9fafb]">
                    <td className="px-3 py-2.5">
                      <div className="text-[12px] text-[#101828] truncate">{user.name}</div>
                      <div className="text-[10px] text-[#667085]">{user.location}</div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="text-[11px] text-[#667085] truncate">{user.email}</div>
                      <div className="text-[10px] text-[#667085]">{user.phone}</div>
                    </td>
                    <td className="px-3 py-2.5">{getRoleBadge(user.role)}</td>
                    <td className="px-3 py-2.5">{getStatusBadge(user.status)}</td>
                    <td className="px-3 py-2.5">{getKYCBadge(user.kycStatus)}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085] truncate">{user.businessName || '-'}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085]">{formatCurrency(user.totalRevenue)}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex gap-1.5">
                        <button className="text-[#003883] hover:text-[#002664]">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button className="text-[#667085] hover:text-[#344054]">
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button className="text-[#b42318] hover:text-[#912018]">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
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
