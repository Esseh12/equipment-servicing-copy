import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { AlertTriangle, Search } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { Entity } from './MediaWatchTypes';

interface ManualSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  entities: Entity[];
  onSearch: (params: { entityIds: string[]; keywords: string; dateRange?: string }) => void;
}

export function ManualSearchModal({ isOpen, onClose, entities, onSearch }: ManualSearchModalProps) {
  const [selectedEntityIds, setSelectedEntityIds] = useState<string[]>([]);
  const [keywords, setKeywords] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!keywords.trim()) {
      setError('Keywords are required');
      return;
    }

    if (selectedEntityIds.length === 0) {
      setError('Please select at least one entity');
      return;
    }

    const dateRange = dateFrom && dateTo ? `${dateFrom} to ${dateTo}` : undefined;
    
    onSearch({
      entityIds: selectedEntityIds,
      keywords: keywords.trim(),
      dateRange
    });

    toast.success('Search results generated successfully');
    handleClose();
  };

  const handleClose = () => {
    setSelectedEntityIds([]);
    setKeywords('');
    setDateFrom('');
    setDateTo('');
    setError('');
    onClose();
  };

  const toggleEntity = (entityId: string) => {
    setSelectedEntityIds(prev => 
      prev.includes(entityId)
        ? prev.filter(id => id !== entityId)
        : [...prev, entityId]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[540px]">
        <DialogHeader>
          <DialogTitle className="text-[20px] text-[#101828]">
            Manual Search
          </DialogTitle>
          <DialogDescription className="text-[14px] text-[#667085] mt-1">
            Perform a custom keyword-based sentiment search
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Entity Selection */}
          <div className="space-y-2">
            <Label className="text-[14px] text-[#344054]">
              Select Entities <span className="text-[#ee3148]">*</span>
            </Label>
            <div className="border border-[#d0d5dd] rounded-lg p-3 max-h-[160px] overflow-y-auto">
              {entities.filter(e => e.status === 'Active').map(entity => (
                <label
                  key={entity.id}
                  className="flex items-center gap-2 py-2 cursor-pointer hover:bg-[#f9fafb] px-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedEntityIds.includes(entity.id)}
                    onChange={() => toggleEntity(entity.id)}
                    className="h-4 w-4 text-[#003883] border-[#d0d5dd] rounded focus:ring-[#003883]"
                  />
                  <span className="text-[14px] text-[#101828]">{entity.name}</span>
                  <span className="text-[12px] text-[#667085] ml-auto">
                    ({entity.category})
                  </span>
                </label>
              ))}
            </div>
            {selectedEntityIds.length > 0 && (
              <p className="text-[12px] text-[#667085]">
                {selectedEntityIds.length} entit{selectedEntityIds.length === 1 ? 'y' : 'ies'} selected
              </p>
            )}
          </div>

          {/* Keywords */}
          <div className="space-y-2">
            <Label htmlFor="keywords" className="text-[14px] text-[#344054]">
              Keywords <span className="text-[#ee3148]">*</span>
            </Label>
            <Input
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g., expansion, loan, investment"
              className="h-[40px] border border-[#d0d5dd]"
            />
            <p className="text-[12px] text-[#667085]">
              Enter keywords separated by commas
            </p>
          </div>

          {/* Date Range (Optional) */}
          <div className="space-y-2">
            <Label className="text-[14px] text-[#344054]">
              Date Range (Optional)
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  placeholder="From"
                  className="h-[40px] border border-[#d0d5dd]"
                />
              </div>
              <div>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  placeholder="To"
                  className="h-[40px] border border-[#d0d5dd]"
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-[#fef3f2] border border-[#fecdca] rounded-lg p-3 flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-[#b42318] mt-0.5" />
              <p className="text-[14px] text-[#b42318]">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="submit"
              className="flex-1 bg-[#027a48] hover:bg-[#05603a] text-white h-[40px]"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 h-[40px] border-[#d0d5dd]"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
