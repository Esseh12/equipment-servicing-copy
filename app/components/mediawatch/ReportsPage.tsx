import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Download, 
  Filter, 
  Calendar,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  FileText
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner@2.0.3';
import type { SearchResult, SentimentType } from './MediaWatchTypes';

interface ReportsPageProps {
  results: SearchResult[];
  onBack: () => void;
}

export function ReportsPage({ results, onBack }: ReportsPageProps) {
  const [selectedEntity, setSelectedEntity] = useState<string>('all');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');

  const getSentimentBadgeStyle = (sentiment: SentimentType) => {
    switch (sentiment) {
      case 'Positive':
        return 'bg-[#ecfdf3] text-[#027a48] border-[#abefc6]';
      case 'Negative':
        return 'bg-[#fef3f2] text-[#b42318] border-[#fecdca]';
      case 'Neutral':
        return 'bg-[#f2f4f7] text-[#344054] border-[#d0d5dd]';
    }
  };

  const getSentimentIcon = (sentiment: SentimentType) => {
    switch (sentiment) {
      case 'Positive':
        return <TrendingUp className="h-3.5 w-3.5" />;
      case 'Negative':
        return <TrendingDown className="h-3.5 w-3.5" />;
      case 'Neutral':
        return <Minus className="h-3.5 w-3.5" />;
    }
  };

  const filteredResults = results.filter(result => {
    const matchesEntity = selectedEntity === 'all' || result.entity === selectedEntity;
    const matchesSentiment = selectedSentiment === 'all' || result.sentiment === selectedSentiment;
    
    // Simple date filtering (for demo purposes)
    let matchesDate = true;
    if (dateFrom || dateTo) {
      // In a real app, you'd parse and compare dates properly
      matchesDate = true;
    }
    
    return matchesEntity && matchesSentiment && matchesDate;
  });

  const uniqueEntities = Array.from(new Set(results.map(r => r.entity)));

  const handleExportToExcel = () => {
    // Create CSV content
    const headers = ['Entity', 'Headline', 'Sentiment', 'Date', 'Source', 'URL'];
    const rows = filteredResults.map(r => [
      r.entity,
      r.headline,
      r.sentiment,
      r.date,
      r.source || 'Unknown',
      r.sourceUrl
    ]);
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    // Download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `media_watch_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Report exported successfully');
  };

  const handleClearFilters = () => {
    setSelectedEntity('all');
    setSelectedSentiment('all');
    setDateFrom('');
    setDateTo('');
  };

  const hasActiveFilters = selectedEntity !== 'all' || selectedSentiment !== 'all' || dateFrom || dateTo;

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#667085] hover:text-[#344054] mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-[14px]">Back to Search</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[28px] text-[#101828] mb-1">
                Reports
              </h1>
              <p className="text-[14px] text-[#667085]">
                Access and download historical sentiment data and media reports
              </p>
            </div>
            <Button
              onClick={handleExportToExcel}
              className="bg-[#027a48] hover:bg-[#05603a] text-white h-[40px] px-4"
            >
              <Download className="h-4 w-4 mr-2" />
              Export to Excel
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-[#eaecf0] rounded-lg p-4 mb-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#667085]" />
              <span className="text-[14px] text-[#344054]">Filter Reports:</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Entity Filter */}
              <div className="space-y-1.5">
                <label className="text-[12px] text-[#667085]">Entity Group</label>
                <Select value={selectedEntity} onValueChange={setSelectedEntity}>
                  <SelectTrigger className="h-[40px] border border-[#d0d5dd]">
                    <SelectValue placeholder="All Entities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Entities</SelectItem>
                    {uniqueEntities.map(entity => (
                      <SelectItem key={entity} value={entity}>{entity}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sentiment Filter */}
              <div className="space-y-1.5">
                <label className="text-[12px] text-[#667085]">Sentiment</label>
                <Select value={selectedSentiment} onValueChange={setSelectedSentiment}>
                  <SelectTrigger className="h-[40px] border border-[#d0d5dd]">
                    <SelectValue placeholder="All Sentiments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sentiments</SelectItem>
                    <SelectItem value="Positive">Positive</SelectItem>
                    <SelectItem value="Negative">Negative</SelectItem>
                    <SelectItem value="Neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date From */}
              <div className="space-y-1.5">
                <label className="text-[12px] text-[#667085]">Date From</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085] pointer-events-none" />
                  <Input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="h-[40px] pl-10 border border-[#d0d5dd]"
                  />
                </div>
              </div>

              {/* Date To */}
              <div className="space-y-1.5">
                <label className="text-[12px] text-[#667085]">Date To</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085] pointer-events-none" />
                  <Input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="h-[40px] pl-10 border border-[#d0d5dd]"
                  />
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="flex items-center justify-between pt-2 border-t border-[#eaecf0]">
                <p className="text-[13px] text-[#667085]">
                  Showing {filteredResults.length} of {results.length} reports
                </p>
                <Button
                  variant="ghost"
                  onClick={handleClearFilters}
                  className="text-[#667085] hover:text-[#344054] h-[32px] text-[13px]"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Data Retention Notice */}
        <div className="bg-[#fffaeb] border border-[#fedf89] rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-[#b54708] mt-0.5" />
            <div>
              <p className="text-[14px] text-[#b54708]">
                <strong>Data Retention Policy:</strong> Reports are retained for 5 years before archival. 
                Archived reports can be requested through the admin panel.
              </p>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white border border-[#eaecf0] rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb] border-b border-[#eaecf0]">
                <tr>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Entity
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Headline
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Sentiment
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Download
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaecf0]">
                {filteredResults.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <p className="text-[14px] text-[#667085]">
                        {hasActiveFilters
                          ? 'No reports match your filter criteria'
                          : 'No reports available'
                        }
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredResults.map((result) => (
                    <tr key={result.id} className="hover:bg-[#f9fafb] transition-colors">
                      <td className="px-6 py-4 text-[14px] text-[#101828]">
                        {result.entity}
                      </td>
                      <td className="px-6 py-4 text-[14px] text-[#101828] max-w-[400px]">
                        {result.headline}
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`inline-flex items-center gap-1.5 px-2.5 py-1 border ${getSentimentBadgeStyle(result.sentiment)}`}>
                          {getSentimentIcon(result.sentiment)}
                          {result.sentiment}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-[14px] text-[#667085]">
                        {result.date}
                      </td>
                      <td className="px-6 py-4 text-[14px] text-[#667085]">
                        {result.source || 'Unknown'}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            // In a real app, this would download individual report
                            toast.success('Report downloaded');
                          }}
                          className="text-[#003883] hover:text-[#002860] transition-colors"
                          title="Download report"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer with Summary */}
          {filteredResults.length > 0 && (
            <div className="bg-[#f9fafb] border-t border-[#eaecf0] px-6 py-3 flex items-center justify-between">
              <p className="text-[13px] text-[#667085]">
                Total: {filteredResults.length} report{filteredResults.length !== 1 ? 's' : ''}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#027a48]"></div>
                  <span className="text-[12px] text-[#667085]">
                    {filteredResults.filter(r => r.sentiment === 'Positive').length} Positive
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#b42318]"></div>
                  <span className="text-[12px] text-[#667085]">
                    {filteredResults.filter(r => r.sentiment === 'Negative').length} Negative
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#667085]"></div>
                  <span className="text-[12px] text-[#667085]">
                    {filteredResults.filter(r => r.sentiment === 'Neutral').length} Neutral
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
