import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { 
  ExternalLink, 
  Flag, 
  AlertTriangle,
  CheckCircle2,
  X
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { SearchResult, SentimentType, Alert } from './MediaWatchTypes';

interface SentimentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  mention: SearchResult | Alert | null;
  onFlagEscalation?: (mentionId: string, comments: string) => void;
  userRole?: string;
}

export function SentimentDetailModal({ 
  isOpen, 
  onClose, 
  mention,
  onFlagEscalation,
  userRole
}: SentimentDetailModalProps) {
  const [showFlagForm, setShowFlagForm] = useState(false);
  const [escalationComments, setEscalationComments] = useState('');

  if (!mention) return null;

  const handleFlagForEscalation = () => {
    if (!escalationComments.trim()) {
      toast.error('Please provide escalation comments');
      return;
    }

    if (onFlagEscalation) {
      onFlagEscalation(mention.id, escalationComments);
    }

    toast.success('Mention flagged for escalation', {
      description: 'Communications and Risk teams have been notified'
    });

    setEscalationComments('');
    setShowFlagForm(false);
    onClose();
  };

  const getSentimentIcon = (sentiment: SentimentType) => {
    switch (sentiment) {
      case 'Positive':
        return <CheckCircle2 className="h-5 w-5 text-[#027a48]" />;
      case 'Negative':
        return <AlertTriangle className="h-5 w-5 text-[#b42318]" />;
      case 'Neutral':
        return <div className="w-5 h-5 rounded-full border-2 border-[#667085]" />;
    }
  };

  const getSentimentBadge = (sentiment: SentimentType) => {
    const config = {
      'Positive': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]', border: 'border-[#d1fadf]' },
      'Negative': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]', border: 'border-[#fecdca]' },
      'Neutral': { bg: 'bg-[#f2f4f7]', text: 'text-[#344054]', border: 'border-[#d0d5dd]' }
    };
    const style = config[sentiment];
    return (
      <Badge className={`${style.bg} ${style.text} border ${style.border} text-[14px] px-3 py-1`}>
        <span className="flex items-center gap-2">
          {getSentimentIcon(sentiment)}
          {sentiment}
        </span>
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[20px] text-[#101828] pr-8">
            {mention.headline}
          </DialogTitle>
          <DialogDescription className="sr-only">
            View detailed sentiment analysis and escalation options for this media mention
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-[#f9fafb] rounded-lg border border-[#eaecf0]">
            <div>
              <div className="text-[12px] text-[#667085] mb-1">Date</div>
              <div className="text-[14px] text-[#101828]">{mention.date}</div>
            </div>
            <div>
              <div className="text-[12px] text-[#667085] mb-1">Source</div>
              <div className="text-[14px] text-[#101828]">{mention.source || 'Unknown'}</div>
            </div>
            <div>
              <div className="text-[12px] text-[#667085] mb-1">Entity</div>
              <div className="text-[14px] text-[#101828]">{mention.entity}</div>
            </div>
            <div>
              <div className="text-[12px] text-[#667085] mb-1">Sentiment</div>
              <div className="mt-1">{getSentimentBadge(mention.sentiment)}</div>
            </div>
          </div>

          {/* Article Extract */}
          <div>
            <div className="text-[14px] text-[#344054] mb-2">Article Extract</div>
            <div className="p-4 bg-white border border-[#eaecf0] rounded-lg">
              <p className="text-[14px] text-[#667085] leading-relaxed">
                {mention.snippet || 'No snippet available for this article.'}
              </p>
            </div>
          </div>

          {/* Sentiment Analysis Reason (Optional) */}
          {mention.sentiment === 'Negative' && (
            <div className="p-4 bg-[#fef3f2] border border-[#fecdca] rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-[#b42318] mt-0.5" />
                <div>
                  <div className="text-[14px] text-[#b42318]">Negative Sentiment Detected</div>
                  <div className="text-[12px] text-[#667085] mt-1">
                    This mention contains keywords or phrases associated with potential reputational risk.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Escalation Form */}
          {showFlagForm && (
            <div className="p-4 bg-[#fff7ed] border border-[#ffc9a3] rounded-lg">
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Flag className="h-4 w-4 text-[#ff8200]" />
                  <span className="text-[14px] text-[#344054]">Escalation Comments</span>
                </div>
                <Textarea
                  placeholder="Provide details on why this mention requires escalation (required)"
                  value={escalationComments}
                  onChange={(e) => setEscalationComments(e.target.value)}
                  className="min-h-[100px] border-[#d0d5dd]"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleFlagForEscalation}
                  className="bg-[#ff8200] hover:bg-[#cc6800] text-white h-[36px] px-4"
                >
                  <Flag className="h-4 w-4 mr-2" />
                  Submit Escalation
                </Button>
                <Button
                  onClick={() => {
                    setShowFlagForm(false);
                    setEscalationComments('');
                  }}
                  variant="outline"
                  className="h-[36px] px-4 border-[#d0d5dd]"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <Button
              onClick={() => window.open(mention.sourceUrl, '_blank')}
              variant="outline"
              className="h-[40px] px-4 border-[#d0d5dd] text-[#344054]"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Full Article
            </Button>
            
            {userRole === 'risk-officer' && !showFlagForm && (
              <Button
                onClick={() => setShowFlagForm(true)}
                className="bg-[#ff8200] hover:bg-[#cc6800] text-white h-[40px] px-4"
              >
                <Flag className="h-4 w-4 mr-2" />
                Flag for Escalation
              </Button>
            )}
          </div>

          <Button
            onClick={onClose}
            variant="outline"
            className="h-[40px] px-4 border-[#d0d5dd]"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
