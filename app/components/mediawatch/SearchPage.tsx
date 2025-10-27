import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Search, 
  Settings, 
  Eye, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import type { SearchResult, SentimentSummary, SentimentType } from './MediaWatchTypes';

interface SearchPageProps {
  results: SearchResult[];
  summary: SentimentSummary;
  onManualSearch: () => void;
  onSettings: () => void;
}

export function SearchPage({ results, summary, onManualSearch, onSettings }: SearchPageProps) {
  const [selectedEntity, setSelectedEntity] = useState<string>('all');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('');
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);

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
    return matchesEntity && matchesSentiment;
  });

  const uniqueEntities = Array.from(new Set(results.map(r => r.entity)));

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[28px] text-[#101828] mb-1">
              Search Results
            </h1>
            <p className="text-[14px] text-[#667085]">
              View automated search results and perform custom sentiment searches
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={onManualSearch}
              className="bg-[#027a48] hover:bg-[#05603a] text-white h-[40px] px-4"
            >
              <Search className="h-4 w-4 mr-2" />
              Manual Search
            </Button>
            <Button
              onClick={onSettings}
              variant="outline"
              className="h-[40px] px-4 border-[#d0d5dd] text-[#344054]"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-[#eaecf0] rounded-lg p-4 shadow-sm">
            <div className="text-[14px] text-[#667085] mb-1">Total Mentions</div>
            <div className="text-[32px] text-[#101828]">{summary.totalMentions}</div>
          </div>
          <div className="bg-white border border-[#eaecf0] rounded-lg p-4 shadow-sm">
            <div className="text-[14px] text-[#667085] mb-1">Positive</div>
            <div className="text-[32px] text-[#027a48] flex items-center gap-2">
              {summary.positivePercent}%
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
          <div className="bg-white border border-[#eaecf0] rounded-lg p-4 shadow-sm">
            <div className="text-[14px] text-[#667085] mb-1">Negative</div>
            <div className="text-[32px] text-[#b42318] flex items-center gap-2">
              {summary.negativePercent}%
              <TrendingDown className="h-6 w-6" />
            </div>
          </div>
          <div className="bg-white border border-[#eaecf0] rounded-lg p-4 shadow-sm">
            <div className="text-[14px] text-[#667085] mb-1">Neutral</div>
            <div className="text-[32px] text-[#667085] flex items-center gap-2">
              {summary.neutralPercent}%
              <Minus className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-[#eaecf0] rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#667085]" />
              <span className="text-[14px] text-[#344054]">Filters:</span>
            </div>
            
            <Select value={selectedEntity} onValueChange={setSelectedEntity}>
              <SelectTrigger className="w-[200px] h-[36px] border border-[#d0d5dd]">
                <SelectValue placeholder="Select Entity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Entities</SelectItem>
                {uniqueEntities.map(entity => (
                  <SelectItem key={entity} value={entity}>{entity}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSentiment} onValueChange={setSelectedSentiment}>
              <SelectTrigger className="w-[180px] h-[36px] border border-[#d0d5dd]">
                <SelectValue placeholder="Sentiment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sentiments</SelectItem>
                <SelectItem value="Positive">Positive</SelectItem>
                <SelectItem value="Negative">Negative</SelectItem>
                <SelectItem value="Neutral">Neutral</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative flex-1 max-w-[300px]">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667085]" />
              <Input
                type="date"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                placeholder="Select date range"
                className="h-[36px] pl-10 border border-[#d0d5dd]"
              />
            </div>

            {(selectedEntity !== 'all' || selectedSentiment !== 'all' || dateRange) && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedEntity('all');
                  setSelectedSentiment('all');
                  setDateRange('');
                }}
                className="text-[#667085] hover:text-[#344054] h-[36px]"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white border border-[#eaecf0] rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb] border-b border-[#eaecf0]">
                <tr>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Entity
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Headline
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Source Link
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Sentiment
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaecf0]">
                {filteredResults.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <p className="text-[14px] text-[#667085]">No results found</p>
                    </td>
                  </tr>
                ) : (
                  filteredResults.map((result) => (
                    <tr key={result.id} className="hover:bg-[#f9fafb] transition-colors">
                      <td className="px-6 py-4 text-[14px] text-[#101828]">
                        {result.entity}
                      </td>
                      <td className="px-6 py-4 text-[14px] text-[#667085]">
                        {result.date}
                      </td>
                      <td className="px-6 py-4 text-[14px] text-[#101828] max-w-[400px]">
                        {result.headline}
                      </td>
                      <td className="px-6 py-4">
                        <a 
                          href={result.sourceUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[14px] text-[#003883] hover:underline truncate block max-w-[200px]"
                        >
                          {result.sourceUrl}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`inline-flex items-center gap-1.5 px-2.5 py-1 border ${getSentimentBadgeStyle(result.sentiment)}`}>
                          {getSentimentIcon(result.sentiment)}
                          {result.sentiment}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedResult(result)}
                          className="text-[#003883] hover:text-[#002860] hover:bg-[#eff8ff]"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* View Details Modal */}
        <Dialog open={!!selectedResult} onOpenChange={() => setSelectedResult(null)}>
          <DialogContent className="max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-[20px] text-[#101828]">
                Article Details
              </DialogTitle>
            </DialogHeader>
            {selectedResult && (
              <div className="space-y-4">
                <div>
                  <div className="text-[12px] text-[#667085] mb-1">Entity</div>
                  <div className="text-[14px] text-[#101828]">{selectedResult.entity}</div>
                </div>
                <div>
                  <div className="text-[12px] text-[#667085] mb-1">Headline</div>
                  <div className="text-[16px] text-[#101828]">{selectedResult.headline}</div>
                </div>
                <div>
                  <div className="text-[12px] text-[#667085] mb-1">Sentiment</div>
                  <Badge className={`inline-flex items-center gap-1.5 px-2.5 py-1 border ${getSentimentBadgeStyle(selectedResult.sentiment)}`}>
                    {getSentimentIcon(selectedResult.sentiment)}
                    {selectedResult.sentiment}
                  </Badge>
                </div>
                <div>
                  <div className="text-[12px] text-[#667085] mb-1">Source</div>
                  <div className="text-[14px] text-[#101828]">{selectedResult.source || 'Unknown'}</div>
                </div>
                <div>
                  <div className="text-[12px] text-[#667085] mb-1">Date</div>
                  <div className="text-[14px] text-[#101828]">{selectedResult.date}</div>
                </div>
                <div>
                  <div className="text-[12px] text-[#667085] mb-1">Article Snippet</div>
                  <div className="text-[14px] text-[#344054] bg-[#f9fafb] p-4 rounded-lg border border-[#eaecf0]">
                    {selectedResult.snippet || 'No snippet available'}
                  </div>
                </div>
                <div>
                  <div className="text-[12px] text-[#667085] mb-1">Source URL</div>
                  <a 
                    href={selectedResult.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[14px] text-[#003883] hover:underline break-all"
                  >
                    {selectedResult.sourceUrl}
                  </a>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
