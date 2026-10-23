'use client';
import { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  Sparkles,
  Layers,
  Check,
  X,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { useToast } from '@/components/Toast';
import ConfirmModal from '@/components/ConfirmModal';
import { INDUSTRY_TEMPLATES, DEFAULT_SERVICES } from '@/lib/presets';

export default function ServicesManagerClient({ initialServices, userBusinessName }) {
  const { showToast } = useToast();
  const [services, setServices] = useState(initialServices);

  // Modal / Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'General',
    keywords: '',
  });

  // Deletion confirm modal
  const [serviceToDelete, setServiceToDelete] = useState(null);

  // Industry Preset reset modal
  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const openAddModal = () => {
    setEditingServiceId(null);
    setFormData({ name: '', description: '', category: 'General', keywords: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (svc) => {
    setEditingServiceId(svc.id);
    setFormData({
      name: svc.name,
      description: svc.description || '',
      category: svc.category || 'General',
      keywords: svc.suggestedKeywords?.join(', ') || '',
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Service name is required', 'error');
      return;
    }

    setSubmitting(true);
    const keywordsArray = formData.keywords
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);

    try {
      if (editingServiceId) {
        // Edit existing
        const res = await fetch('/api/business/services', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingServiceId,
            name: formData.name.trim(),
            description: formData.description.trim(),
            category: formData.category.trim(),
            suggestedKeywords: keywordsArray,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update service');

        setServices(data.services);
        showToast('Service updated successfully!', 'success');
      } else {
        // Add new
        const res = await fetch('/api/business/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name.trim(),
            description: formData.description.trim(),
            category: formData.category.trim(),
            suggestedKeywords: keywordsArray,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to add service');

        setServices(data.services);
        showToast('New service added successfully!', 'success');
      }

      setIsModalOpen(false);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!serviceToDelete) return;

    try {
      const res = await fetch(`/api/business/services?id=${serviceToDelete.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete service');

      setServices(data.services);
      showToast('Service deleted.', 'info');
      setServiceToDelete(null);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleApplyPreset = async (presetName, presetList) => {
    try {
      const res = await fetch('/api/business/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ services: presetList }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to apply preset');

      setServices(data.services);
      showToast(`Applied ${presetName} template!`, 'success');
      setIsPresetModalOpen(false);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#202124]">
            Services & Experience Options
          </h2>
          <p className="text-xs text-[#5f6368] mt-1">
            Configure the specific services customers can select on your review page. Rankaro uses these to craft rich, authentic drafts.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setIsPresetModalOpen(true)}
            className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-medium text-[#3c4043] bg-white hover:bg-[#f8f9fa] border border-[#dadce0] rounded-xl transition-colors shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#5f6368]" />
            <span>Industry Presets</span>
          </button>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] rounded-xl shadow-2xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        </div>
      </div>

      {/* Services List / Grid */}
      {services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-2xl p-5 border border-[#dadce0] google-card-shadow flex flex-col justify-between hover:border-[#1a73e8] transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 text-[11px] font-semibold bg-[#e8f0fe] text-[#1a73e8] rounded-md">
                      {svc.category || 'General'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => openEditModal(svc)}
                      title="Edit Service"
                      className="p-1.5 text-[#5f6368] hover:text-[#1a73e8] hover:bg-[#f1f3f4] rounded-lg transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setServiceToDelete(svc)}
                      title="Delete Service"
                      className="p-1.5 text-[#5f6368] hover:text-[#d93025] hover:bg-[#fce8e6] rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-[#202124] mb-1">
                  {svc.name}
                </h3>
                {svc.description && (
                  <p className="text-xs text-[#5f6368] leading-relaxed mb-3">
                    {svc.description}
                  </p>
                )}
              </div>

              {svc.suggestedKeywords && svc.suggestedKeywords.length > 0 && (
                <div className="pt-3 border-t border-[#f1f3f4] flex flex-wrap gap-1.5">
                  {svc.suggestedKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[10px] bg-[#f8f9fa] text-[#5f6368] border border-[#e8eaed] rounded-full"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-[#dadce0]">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#f1f3f4] text-[#5f6368] mb-3">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-[#202124]">No services added yet</h3>
          <p className="mt-1 text-xs text-[#5f6368] max-w-sm mx-auto">
            Add the services or customer experiences you provide, or apply an industry starter pack.
          </p>
          <div className="mt-4 flex items-center justify-center space-x-3">
            <button
              onClick={() => handleApplyPreset('Default Pack', DEFAULT_SERVICES)}
              className="px-4 py-2 text-xs font-medium text-[#1a73e8] bg-[#e8f0fe] rounded-lg hover:bg-[#d2e3fc]"
            >
              Load Default Options
            </button>
            <button
              onClick={openAddModal}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1a73e8] rounded-lg hover:bg-[#1557b0]"
            >
              Add First Service
            </button>
          </div>
        </div>
      )}

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#dadce0]">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f3f4]">
              <h3 className="text-base font-bold text-[#202124]">
                {editingServiceId ? 'Edit Service Option' : 'Add New Service Option'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#5f6368] hover:text-[#202124] p-1 rounded-full hover:bg-[#f1f3f4]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5f6368] mb-1">
                  Service / Experience Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Deep Teeth Cleaning & Polishing"
                  className="w-full px-3.5 py-2.5 text-sm text-[#202124] border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5f6368] mb-1">
                  Category Tag
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Dental Care, Hospitality, Workmanship"
                  className="w-full px-3.5 py-2.5 text-sm text-[#202124] border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5f6368] mb-1">
                  Description (shown to customer)
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. Painless, gentle cleaning with thorough preventative tips."
                  className="w-full px-3.5 py-2 text-sm text-[#202124] border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5f6368] mb-1">
                  Suggested Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  placeholder="e.g. gentle, pain-free, modern clinic"
                  className="w-full px-3.5 py-2.5 text-sm text-[#202124] border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                />
                <span className="text-[11px] text-[#70757a] mt-1 block">
                  Keywords help shape natural vocabulary in the generated review drafts.
                </span>
              </div>

              <div className="pt-3 border-t border-[#f1f3f4] flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#3c4043] border border-[#dadce0] rounded-lg hover:bg-[#f8f9fa]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] rounded-lg transition-colors flex items-center space-x-1.5"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingServiceId ? 'Save Changes' : 'Add Service'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Industry Presets Modal */}
      {isPresetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#dadce0] max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f3f4]">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-[#fbbc04]" />
                <h3 className="text-base font-bold text-[#202124]">
                  Load Industry Starter Pack
                </h3>
              </div>
              <button
                onClick={() => setIsPresetModalOpen(false)}
                className="text-[#5f6368] hover:text-[#202124] p-1 rounded-full hover:bg-[#f1f3f4]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="mt-3 text-xs text-[#5f6368] leading-relaxed">
              Choose an industry template to automatically replace your services with proven experience options tailored to your field:
            </p>

            <div className="mt-4 space-y-3">
              {Object.entries(INDUSTRY_TEMPLATES).map(([industry, items]) => (
                <div
                  key={industry}
                  className="p-4 border border-[#e8eaed] rounded-xl hover:border-[#1a73e8] hover:bg-[#f8f9fa] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-[#202124]">{industry}</h4>
                    <p className="text-xs text-[#5f6368] mt-0.5">
                      {items.map((it) => it.name).join(' • ')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleApplyPreset(industry, items)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-[#1a73e8] bg-[#e8f0fe] hover:bg-[#d2e3fc] rounded-lg shrink-0 transition-colors"
                  >
                    Use Template
                  </button>
                </div>
              ))}

              {/* General Preset */}
              <div className="p-4 border border-[#e8eaed] rounded-xl hover:border-[#1a73e8] hover:bg-[#f8f9fa] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-[#202124]">General Business & Retail</h4>
                  <p className="text-xs text-[#5f6368] mt-0.5">
                    Customer Support, Timeliness, Work Quality, Pricing, Clean Environment
                  </p>
                </div>
                <button
                  onClick={() => handleApplyPreset('General Business', DEFAULT_SERVICES)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-[#1a73e8] bg-[#e8f0fe] hover:bg-[#d2e3fc] rounded-lg shrink-0 transition-colors"
                >
                  Use Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(serviceToDelete)}
        title="Delete this service option?"
        message={`Are you sure you want to remove "${serviceToDelete?.name}"? Customers will no longer see it on your review page.`}
        confirmText="Delete Service"
        isDestructive={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setServiceToDelete(null)}
      />
    </div>
  );
}
