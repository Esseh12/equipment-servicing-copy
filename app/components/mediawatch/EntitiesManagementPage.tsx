import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { 
  Plus, 
  Upload, 
  Download, 
  Edit, 
  Trash2, 
  AlertTriangle,
  ArrowLeft,
  Lock
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { BulkUploadModal } from './BulkUploadModal';
import { toast } from 'sonner@2.0.3';
import type { Entity, EntityCategory, UserRole } from './MediaWatchTypes';

interface EntitiesManagementPageProps {
  entities: Entity[];
  userRole: UserRole;
  onBack: () => void;
  onUpdateEntities: (entities: Entity[]) => void;
}

export function EntitiesManagementPage({ entities, userRole, onBack, onUpdateEntities }: EntitiesManagementPageProps) {
  const [localEntities, setLocalEntities] = useState(entities);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState<Entity | null>(null);
  const [deleteEntityId, setDeleteEntityId] = useState<string | null>(null);

  // Form state
  const [entityName, setEntityName] = useState('');
  const [category, setCategory] = useState<EntityCategory>('Access Holdings');
  const [error, setError] = useState('');

  const handleSaveEntity = () => {
    setError('');

    if (!entityName.trim()) {
      setError('Entity name is required');
      return;
    }

    // Check for duplicates
    const isDuplicate = localEntities.some(
      e => e.name.toLowerCase() === entityName.trim().toLowerCase() && 
           (!editingEntity || e.id !== editingEntity.id)
    );

    if (isDuplicate) {
      setError('An entity with this name already exists');
      return;
    }

    if (editingEntity) {
      // Update existing entity
      const updatedEntities = localEntities.map(entity =>
        entity.id === editingEntity.id
          ? { ...entity, name: entityName.trim(), category }
          : entity
      );
      setLocalEntities(updatedEntities);
      onUpdateEntities(updatedEntities);
      toast.success('Entity updated successfully');
    } else {
      // Create new entity
      const newEntity: Entity = {
        id: `E${String(localEntities.length + 1).padStart(3, '0')}`,
        name: entityName.trim(),
        category,
        createdDate: new Date().toLocaleDateString('en-GB'),
        status: 'Active'
      };
      const updatedEntities = [...localEntities, newEntity];
      setLocalEntities(updatedEntities);
      onUpdateEntities(updatedEntities);
      toast.success('Entity added successfully');
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingEntity(null);
    setEntityName('');
    setCategory('Access Holdings');
    setError('');
  };

  const handleEditEntity = (entity: Entity) => {
    setEditingEntity(entity);
    setEntityName(entity.name);
    setCategory(entity.category);
    setIsAddModalOpen(true);
  };

  const handleDeleteEntity = () => {
    if (!deleteEntityId) return;

    const updatedEntities = localEntities.filter(entity => entity.id !== deleteEntityId);
    setLocalEntities(updatedEntities);
    onUpdateEntities(updatedEntities);
    toast.success('Entity deleted successfully');
    setDeleteEntityId(null);
  };

  const handleBulkUpload = (newEntities: Entity[]) => {
    const updatedEntities = [...localEntities, ...newEntities];
    setLocalEntities(updatedEntities);
    onUpdateEntities(updatedEntities);
  };

  const handleExport = () => {
    // Create CSV content
    const headers = ['Entity Name', 'Category', 'Created Date', 'Status'];
    const rows = localEntities.map(e => [e.name, e.category, e.createdDate, e.status]);
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    
    // Download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `entities_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Entities exported successfully');
  };

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
                {userRole === 'risk-officer' ? 'Entities Overview' : 'Entities Management'}
              </h1>
              <p className="text-[14px] text-[#667085]">
                {userRole === 'risk-officer' 
                  ? 'View entities being monitored for sentiment and media coverage'
                  : 'Manage entities to be tracked for sentiment and media coverage'
                }
              </p>
            </div>
            <div className="flex items-center gap-3">
              {userRole === 'risk-officer' ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-[#f9fafb] border border-[#eaecf0] rounded-lg">
                  <Lock className="h-4 w-4 text-[#667085]" />
                  <span className="text-[14px] text-[#667085]">View Only Mode</span>
                </div>
              ) : (
                <>
                  <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-[#027a48] hover:bg-[#05603a] text-white h-[40px] px-4"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Entity
                  </Button>
                  {userRole === 'admin' && (
                    <Button
                      onClick={() => setIsBulkUploadOpen(true)}
                      className="bg-[#ff8200] hover:bg-[#cc6800] text-white h-[40px] px-4"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Bulk Upload
                    </Button>
                  )}
                </>
              )}
              <Button
                onClick={handleExport}
                variant="outline"
                className="h-[40px] px-4 border-[#d0d5dd]"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Entities Table */}
        <div className="bg-white border border-[#eaecf0] rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb] border-b border-[#eaecf0]">
                <tr>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Entity Name
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Created Date
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaecf0]">
                {localEntities.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <p className="text-[14px] text-[#667085] mb-4">No entities configured</p>
                      <Button
                        onClick={() => setIsAddModalOpen(true)}
                        variant="outline"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Entity
                      </Button>
                    </td>
                  </tr>
                ) : (
                  localEntities.map((entity) => (
                    <tr key={entity.id} className="hover:bg-[#f9fafb] transition-colors">
                      <td className="px-6 py-4 text-[14px] text-[#101828]">
                        {entity.name}
                      </td>
                      <td className="px-6 py-4 text-[14px] text-[#667085]">
                        {entity.category}
                      </td>
                      <td className="px-6 py-4 text-[14px] text-[#667085]">
                        {entity.createdDate}
                      </td>
                      <td className="px-6 py-4">
                        <Badge 
                          className={`${
                            entity.status === 'Active'
                              ? 'bg-[#ecfdf3] text-[#027a48] border-[#abefc6]'
                              : 'bg-[#f2f4f7] text-[#344054] border-[#d0d5dd]'
                          } border`}
                        >
                          {entity.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {userRole === 'risk-officer' ? (
                            <span className="text-[12px] text-[#667085]">View Only</span>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEditEntity(entity)}
                                className="text-[#667085] hover:text-[#344054] transition-colors"
                                title="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              {userRole === 'admin' ? (
                                <button
                                  onClick={() => setDeleteEntityId(entity.id)}
                                  className="text-[#b42318] hover:text-[#912018] transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              ) : (
                                <button
                                  className="text-[#d0d5dd] cursor-not-allowed"
                                  title="Admin access required"
                                  disabled
                                >
                                  <Lock className="h-4 w-4" />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Entity Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={handleCloseModal}>
          <DialogContent className="max-w-[480px]">
            <DialogHeader>
              <DialogTitle className="text-[20px] text-[#101828]">
                {editingEntity ? 'Edit Entity' : 'Add Entity'}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {editingEntity ? 'Edit entity details and settings' : 'Add a new entity to monitor'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {/* Entity Name */}
              <div className="space-y-2">
                <Label className="text-[14px] text-[#344054]">
                  Entity Name <span className="text-[#ee3148]">*</span>
                </Label>
                <Input
                  value={entityName}
                  onChange={(e) => setEntityName(e.target.value)}
                  placeholder="Enter entity name"
                  className="h-[40px] border border-[#d0d5dd]"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label className="text-[14px] text-[#344054]">
                  Category <span className="text-[#ee3148]">*</span>
                </Label>
                <Select value={category} onValueChange={(value) => setCategory(value as EntityCategory)}>
                  <SelectTrigger className="h-[40px] border border-[#d0d5dd]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Access Holdings">Access Holdings</SelectItem>
                    <SelectItem value="Other Organisation">Other Organisation</SelectItem>
                    <SelectItem value="Obligor">Obligor</SelectItem>
                    <SelectItem value="Individual">Individual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-[#fef3f2] border border-[#fecdca] rounded-lg p-3 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-[#b42318] mt-0.5" />
                  <p className="text-[14px] text-[#b42318]">{error}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <Button
                  onClick={handleSaveEntity}
                  className="flex-1 bg-[#003883] hover:bg-[#002860] text-white h-[40px]"
                >
                  {editingEntity ? 'Update' : 'Save'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCloseModal}
                  className="flex-1 h-[40px] border-[#d0d5dd]"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Bulk Upload Modal */}
        <BulkUploadModal
          isOpen={isBulkUploadOpen}
          onClose={() => setIsBulkUploadOpen(false)}
          existingEntities={localEntities}
          onUpload={handleBulkUpload}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteEntityId} onOpenChange={() => setDeleteEntityId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Entity</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this entity? This action cannot be undone and will affect all associated automation rules.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteEntity}
                className="bg-[#b42318] hover:bg-[#912018]"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
