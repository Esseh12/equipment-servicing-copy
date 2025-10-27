import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  AlertCircle, 
  TrendingUp, 
  Minus,
  Eye,
  RefreshCw,
  Bell,
  BellOff,
  Search
} from 'lucide-react';
import type { Alert, EntityCategory, SentimentType } from './MediaWatchTypes';

interface AlertsPageProps {
  alerts: Alert[];
  onViewDetail: (alert: Alert) => void;
  onSettings?: () => void;
}

export function AlertsPage({ alerts, onViewDetail, onSettings }: AlertsPageProps) {
  const [frequencyFilter, setFrequencyFilter] = useState<string>('6');
  const [categoryFilter, setCategoryFilter] = useState<EntityCategory | 'All'>('All');
  const [sentimentFilter, setSentimentFilter] = useState<SentimentType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date().toLocaleTimeString());

  // Filter alerts
  const filteredAlerts = alerts.filter(alert => {
    if (categoryFilter !== 'All' && !alert.entity.toLowerCase().includes(categoryFilter.toLowerCase())) {
      return false;
    }
    if (sentimentFilter !== 'All' && alert.sentiment !== sentimentFilter) {
      return false;
    }
    if (searchQuery && !alert.headline.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !alert.entity.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Calculate summary stats
  const newNegativeCount = filteredAlerts.filter(a => a.isNew && a.sentiment === 'Negative').length;
  const positiveCount = filteredAlerts.filter(a => a.sentiment === 'Positive').length;
  const neutralCount = filteredAlerts.filter(a => a.sentiment === 'Neutral').length;
  const negativeCount = filteredAlerts.filter(a => a.sentiment === 'Negative').length;

  const handleRefresh = () => {
    setLastRefresh(new Date().toLocaleTimeString());
    // In real app, this would trigger API call
  };

  const getSentimentBadge = (sentiment: SentimentType) => {
    const config = {
      'Positive': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]', border: 'border-[#d1fadf]' },
      'Negative': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]', border: 'border-[#fecdca]' },
      'Neutral': { bg: 'bg-[#f2f4f7]', text: 'text-[#344054]', border: 'border-[#d0d5dd]' }
    };
    const style = config[sentiment];
    return (
      <Badge className={`${style.bg} ${style.text} border ${style.border} text-[12px]`}>
        {sentiment}
      </Badge>
    );
  };

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-[28px] text-[#101828] mb-1">
                Alerts & Mentions
              </h1>
              <p className="text-[14px] text-[#667085]">
                Real-time monitoring of media mentions and sentiment alerts
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleRefresh}
                variant="outline"
                className="h-[40px] px-4 border-[#d0d5dd] text-[#344054]"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button
                onClick={() => setEmailAlertsEnabled(!emailAlertsEnabled)}
                variant="outline"
                className={`h-[40px] px-4 ${emailAlertsEnabled ? 'border-[#027a48] text-[#027a48]' : 'border-[#d0d5dd] text-[#344054]'}`}
              >
                {emailAlertsEnabled ? <Bell className="h-4 w-4 mr-2" /> : <BellOff className="h-4 w-4 mr-2" />}
                Email Alerts {emailAlertsEnabled ? 'On' : 'Off'}
              </Button>
            </div>
          </div>

          <div className="text-[12px] text-[#667085] mb-4">
            Last refresh: {lastRefresh} • Auto-refresh every {frequencyFilter} hours
          </div>
        </div>

        {/* Alert Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-[#eaecf0] rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] text-[#667085]">New Negative Mentions</span>
              <div className="w-10 h-10 rounded-full bg-[#fef3f2] flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-[#b42318]" />
              </div>
            </div>
            <div className="text-[32px] text-[#b42318]">{newNegativeCount}</div>
            {newNegativeCount > 0 && (
              <div className="text-[12px] text-[#b42318] mt-1">Requires attention</div>
            )}
          </div>

          <div className="bg-white border border-[#eaecf0] rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] text-[#667085]">Positive Mentions</span>
              <div className="w-10 h-10 rounded-full bg-[#ecfdf3] flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-[#027a48]" />
              </div>
            </div>
            <div className="text-[32px] text-[#027a48]">{positiveCount}</div>
          </div>

          <div className="bg-white border border-[#eaecf0] rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] text-[#667085]">Neutral Mentions</span>
              <div className="w-10 h-10 rounded-full bg-[#f2f4f7] flex items-center justify-center">
                <Minus className="h-5 w-5 text-[#344054]" />
              </div>
            </div>
            <div className="text-[32px] text-[#344054]">{neutralCount}</div>
          </div>

          <div className="bg-white border border-[#eaecf0] rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] text-[#667085]">All Negative</span>
              <div className="w-10 h-10 rounded-full bg-[#fef3f2] flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-[#f04438]" />
              </div>
            </div>
            <div className="text-[32px] text-[#344054]">{negativeCount}</div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white border border-[#eaecf0] rounded-lg p-4 shadow-sm mb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-[12px] text-[#344054] mb-1.5">Frequency</label>
              <Select value={frequencyFilter} onValueChange={setFrequencyFilter}>
                <SelectTrigger className="h-[40px] border-[#d0d5dd]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">Last 6 hours</SelectItem>
                  <SelectItem value="12">Last 12 hours</SelectItem>
                  <SelectItem value="24">Last 24 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-[12px] text-[#344054] mb-1.5">Entity Category</label>
              <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as EntityCategory | 'All')}>
                <SelectTrigger className="h-[40px] border-[#d0d5dd]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="Access Holdings">Access Holdings</SelectItem>
                  <SelectItem value="Obligor">Obligors</SelectItem>
                  <SelectItem value="Individual">Individuals</SelectItem>
                  <SelectItem value="Other Organisation">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-[12px] text-[#344054] mb-1.5">Sentiment</label>
              <Select value={sentimentFilter} onValueChange={(value) => setSentimentFilter(value as SentimentType | 'All')}>
                <SelectTrigger className="h-[40px] border-[#d0d5dd]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Sentiments</SelectItem>
                  <SelectItem value="Positive">Positive</SelectItem>
                  <SelectItem value="Neutral">Neutral</SelectItem>
                  <SelectItem value="Negative">Negative</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-[12px] text-[#344054] mb-1.5">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#667085]" />
                <Input
                  placeholder="Search alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-[40px] pl-10 border-[#d0d5dd]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Alert Table */}
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
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    View
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaecf0]">
                {filteredAlerts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[14px] text-[#667085]">
                      No alerts match your current filters
                    </td>
                  </tr>
                ) : (
                  filteredAlerts.map((alert) => (
                    <tr 
                      key={alert.id} 
                      className={`hover:bg-[#f9fafb] transition-colors ${
                        alert.sentiment === 'Negative' ? 'bg-[#fffcfc] border-l-4 border-l-[#f04438]' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] text-[#101828]">{alert.entity}</span>
                          {alert.isNew && (
                            <Badge className="bg-[#ff8200] text-white text-[10px] px-1.5 py-0.5">NEW</Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-md">
                        <div className="text-[14px] text-[#101828] line-clamp-2">{alert.headline}</div>
                      </td>
                      <td className="px-6 py-4">
                        {getSentimentBadge(alert.sentiment)}
                      </td>
                      <td className="px-6 py-4 text-[14px] text-[#667085]">
                        {alert.source}
                      </td>
                      <td className="px-6 py-4 text-[14px] text-[#667085]">
                        {alert.date}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => onViewDetail(alert)}
                          className="text-[#003883] hover:text-[#002664] transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-4 text-[12px] text-[#667085] text-center">
          Showing {filteredAlerts.length} of {alerts.length} alerts • Reports retained for 5 years before archival
        </div>
      </div>
    </div>
  );
}
