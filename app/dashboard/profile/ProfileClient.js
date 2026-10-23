'use client';
import { useState } from 'react';
import {
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Globe,
  Link as LinkIcon,
  Save,
  Loader2,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useToast } from '@/components/Toast';
import GoogleReviewUrlHelpModal from '@/components/GoogleReviewUrlHelpModal';

export default function ProfileClient({ initialUser }) {
  const { showToast } = useToast();
  const [user, setUser] = useState(initialUser);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const [formData, setFormData] = useState({
    businessName: user.businessName || '',
    ownerName: user.ownerName || '',
    phone: user.phone || '',
    googleReviewUrl: user.googleReviewUrl || '',
    businessCategory: user.businessCategory || 'Professional Services',
    address: user.address || '',
    city: user.city || '',
    website: user.website || '',
    description: user.description || '',
    slug: user.slug || '',
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/business/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update profile');

      setUser(data.profile);
      showToast('Profile and business details updated successfully!', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#202124]">
          Business Profile &amp; Google Review Link
        </h2>
        <p className="text-xs text-[#5f6368] mt-1">
          Manage your contact credentials, Google Maps Place link, and public page handle.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Google Review URL Card */}
        <div className="bg-white rounded-2xl p-6 border border-[#dadce0] google-card-shadow space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-[#e8f0fe] text-[#1a73e8]">
                <LinkIcon className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-[#202124]">
                  Official Google Review URL *
                </h3>
                <p className="text-xs text-[#5f6368]">
                  This is the link your customers are redirected to once they copy their review draft.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowHelpModal(true)}
              className="inline-flex items-center space-x-1 text-xs text-[#1a73e8] hover:underline font-medium"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>How to find this?</span>
            </button>
          </div>

          <div>
            <input
              type="url"
              name="googleReviewUrl"
              value={formData.googleReviewUrl}
              onChange={handleChange}
              placeholder="https://search.google.com/local/writereview?placeid=... or https://g.page/r/.../review"
              className="w-full px-3.5 py-2.5 text-sm text-[#202124] border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
            />
          </div>

          {formData.googleReviewUrl && (
            <div className="flex items-center space-x-3 text-xs">
              <a
                href={formData.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-[#1a73e8] hover:underline font-medium"
              >
                <span>Open Google link in new tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[#9aa0a6]">•</span>
              <span className="text-[#137333] flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Link configured</span>
              </span>
            </div>
          )}
        </div>

        {/* Core Business Information */}
        <div className="bg-white rounded-2xl p-6 border border-[#dadce0] google-card-shadow space-y-4">
          <h3 className="text-sm font-semibold text-[#202124]">
            Business Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5f6368] mb-1.5">
                Business Name *
              </label>
              <input
                type="text"
                name="businessName"
                required
                value={formData.businessName}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm text-[#202124] border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5f6368] mb-1.5">
                Owner / Manager Name *
              </label>
              <input
                type="text"
                name="ownerName"
                required
                value={formData.ownerName}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm text-[#202124] border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5f6368] mb-1.5">
                Mobile Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm text-[#202124] border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5f6368] mb-1.5">
                Business Category
              </label>
              <select
                name="businessCategory"
                value={formData.businessCategory}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm text-[#202124] border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8] bg-white"
              >
                <option value="Healthcare & Dental">Healthcare & Dental</option>
                <option value="Home Services & Contracting">Home Services & Contracting</option>
                <option value="Restaurant & Cafe">Restaurant & Cafe</option>
                <option value="Auto Repair & Detailing">Auto Repair & Detailing</option>
                <option value="Salon, Spa & Wellness">Salon, Spa & Wellness</option>
                <option value="Legal & Financial">Legal & Financial</option>
                <option value="Retail & Shopping">Retail & Shopping</option>
                <option value="Professional Services">Professional Services</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5f6368] mb-1.5">
                Physical Address (Optional)
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. 742 Evergreen Terrace"
                className="w-full px-3.5 py-2.5 text-sm text-[#202124] border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5f6368] mb-1.5">
                City / Region
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Seattle, WA"
                className="w-full px-3.5 py-2.5 text-sm text-[#202124] border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5f6368] mb-1.5">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourwebsite.com"
                className="w-full px-3.5 py-2.5 text-sm text-[#202124] border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5f6368] mb-1.5">
                Public Review URL Slug *
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 bg-[#f8f9fa] border border-r-0 border-[#dadce0] rounded-l-lg text-xs font-mono text-[#5f6368]">
                  /r/
                </span>
                <input
                  type="text"
                  name="slug"
                  required
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm font-mono text-[#202124] border border-[#dadce0] rounded-r-lg focus:outline-none focus:border-[#1a73e8]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5f6368] mb-1.5">
              Short Description / Bio
            </label>
            <textarea
              rows={2}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief summary of your business shown on your review page..."
              className="w-full px-3.5 py-2.5 text-sm text-[#202124] border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
            />
          </div>
        </div>

        {/* Account Info (Read Only) */}
        <div className="bg-white rounded-2xl p-6 border border-[#dadce0] google-card-shadow">
          <h3 className="text-sm font-semibold text-[#202124] mb-3">
            Account Credentials
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-[#5f6368] block">Registered Email Address:</span>
              <span className="font-semibold text-[#202124]">{user.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-full bg-[#e6f4ea] text-[#137333] font-semibold flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Account</span>
              </span>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end space-x-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center space-x-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] rounded-xl shadow-xs transition-colors"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Save Profile Changes</span>
          </button>
        </div>
      </form>

      <GoogleReviewUrlHelpModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
    </div>
  );
}
