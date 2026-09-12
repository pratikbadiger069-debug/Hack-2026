'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { getUserDisplayName } from '@/lib/user-utils';
import {
  AVATAR_PRESETS,
  AvatarStyle,
  generateSvgAvatar,
  getDefaultAvatar,
} from '@/lib/avatar-service';
import { UserAvatar } from './UserAvatar';
import {
  X,
  Sparkles,
  Upload,
  RefreshCw,
  Check,
  Palette,
  ShieldCheck,
} from 'lucide-react';

interface AvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVATAR_STYLES: { id: AvatarStyle; label: string; desc: string }[] = [
  { id: 'minimalist-geometric', label: 'Minimalist Clean', desc: 'Precision geometric tech avatar' },
  { id: 'cyber-builder', label: 'Cyber Core', desc: 'Futuristic bot & tech engineering aesthetic' },
  { id: 'abstract-gradient', label: 'Abstract Shapes', desc: 'Modern geometric gradient art' },
  { id: '3d-clay', label: '3D Clay Tech', desc: 'Playful textured 3D builder design' },
  { id: 'pixel-tech', label: 'Pixel Matrix', desc: 'Retro cryptographic dev identicon' },
  { id: 'vector-coder', label: 'Adventurer Dev', desc: 'Character-driven developer portrait' },
  { id: 'notion-minimal', label: 'Notion Minimal', desc: 'Black and white ink style line portrait' },
];

export function AvatarModal({ isOpen, onClose }: AvatarModalProps) {
  const { studentProfile, updateStudentProfile, currentUser, setCurrentUser } = useAppStore();
  
  const initialName = getUserDisplayName(studentProfile, currentUser);
  const [selectedStyle, setSelectedStyle] = useState<AvatarStyle>('minimalist-geometric');
  const [seed, setSeed] = useState(initialName);
  const [previewUrl, setPreviewUrl] = useState(studentProfile?.avatar || getDefaultAvatar(initialName));
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [activeTab, setActiveTab] = useState<'generate' | 'presets' | 'custom'>('generate');

  const handleGenerateStyle = (style: AvatarStyle) => {
    setSelectedStyle(style);
    const newUrl = generateSvgAvatar(seed + Math.floor(Math.random() * 100), style);
    setPreviewUrl(newUrl);
  };

  const handleRandomize = () => {
    const randomSeed = `${seed}-${Math.random().toString(36).substring(2, 7)}`;
    const newUrl = generateSvgAvatar(randomSeed, selectedStyle);
    setPreviewUrl(newUrl);
  };

  const handleApplyPreset = (url: string) => {
    setPreviewUrl(url);
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrlInput) {
      setPreviewUrl(customUrlInput);
    }
  };

  const handleSave = () => {
    updateStudentProfile({ avatar: previewUrl });
    if (currentUser) {
      setCurrentUser({ ...currentUser, avatar: previewUrl });
    }
    onClose();
  };


  const handleResetDefault = () => {
    const def = getDefaultAvatar(initialName);
    setPreviewUrl(def);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.15 }}
          className="bg-white rounded-3xl border border-[#E8E5DD] max-w-xl w-full p-6 space-y-6 shadow-2xl relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
            <div>
              <h3 className="text-lg font-bold text-[#1B1B1B]">Profile Avatar System</h3>
              <p className="text-xs text-[#6F6A60]">
                Choose an AI-generated style, select a verified builder preset, or upload custom imagery.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#6F6A60] hover:text-[#1B1B1B] hover:bg-[#F6F4EE] rounded-xl transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Current Live Preview */}
          <div className="flex items-center gap-5 p-4 bg-[#F6F4EE] rounded-2xl border border-[#E8E5DD]">
            <UserAvatar src={previewUrl} name={initialName} size="xl" />
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#6F6A60] uppercase tracking-wider block">
                Active Live Preview
              </span>
              <h4 className="text-sm font-bold text-[#1B1B1B]">{initialName}</h4>
              <p className="text-[11px] text-[#6F6A60]">
                Appears across Navbar, Journey, Rankings, Discussions, and Builder Card.
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex rounded-xl bg-[#F6F4EE] p-1 border border-[#E8E5DD]">
            <button
              onClick={() => setActiveTab('generate')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'generate'
                  ? 'bg-white text-[#1B1B1B] shadow-xs'
                  : 'text-[#6F6A60] hover:text-[#1B1B1B]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C76A2A]" />
              <span>Generate AI Avatar</span>
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'presets'
                  ? 'bg-white text-[#1B1B1B] shadow-xs'
                  : 'text-[#6F6A60] hover:text-[#1B1B1B]'
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-[#2F7A45]" />
              <span>Curated Presets</span>
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'custom'
                  ? 'bg-white text-[#1B1B1B] shadow-xs'
                  : 'text-[#6F6A60] hover:text-[#1B1B1B]'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Custom</span>
            </button>
          </div>

          {/* Tab 1: AI Generative Styles */}
          {activeTab === 'generate' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                {AVATAR_STYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => handleGenerateStyle(style.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedStyle === style.id
                        ? 'bg-[#1B1B1B] text-white border-[#1B1B1B]'
                        : 'bg-white border-[#E8E5DD] hover:border-[#C76A2A] text-[#1B1B1B]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{style.label}</span>
                      {selectedStyle === style.id && <Check className="w-3.5 h-3.5 text-[#C76A2A]" />}
                    </div>
                    <p className={`text-[10px] mt-0.5 ${selectedStyle === style.id ? 'text-gray-300' : 'text-[#6F6A60]'}`}>
                      {style.desc}
                    </p>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleRandomize}
                  className="px-3.5 py-2 bg-[#F6F4EE] hover:bg-[#E8E5DD] text-[#1B1B1B] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#C76A2A]" />
                  <span>Regenerate Variation</span>
                </button>
                <button
                  onClick={handleResetDefault}
                  className="px-3 py-2 text-[#6F6A60] hover:text-[#1B1B1B] text-xs font-medium"
                >
                  Reset Default
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Curated Presets */}
          {activeTab === 'presets' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AVATAR_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset.url)}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                    previewUrl === preset.url
                      ? 'bg-[#C76A2A]/10 border-[#C76A2A] ring-1 ring-[#C76A2A]'
                      : 'bg-white border-[#E8E5DD] hover:border-[#1B1B1B]'
                  }`}
                >
                  <UserAvatar src={preset.url} name={preset.name} size="lg" />
                  <div>
                    <span className="text-xs font-bold text-[#1B1B1B] block">{preset.name}</span>
                    <span className="text-[10px] text-[#6F6A60] capitalize">{preset.style.replace('-', ' ')}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Tab 3: Custom Upload */}
          {activeTab === 'custom' && (
            <form onSubmit={handleApplyCustom} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1B1B1B] block">Direct Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or GitHub avatar URL"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  className="w-full p-2.5 text-xs bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:outline-none focus:border-[#C76A2A]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#1B1B1B] text-white rounded-xl text-xs font-semibold hover:bg-[#C76A2A] transition-colors"
              >
                Apply Image Link
              </button>
            </form>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8E5DD]">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#6F6A60] hover:text-[#1B1B1B] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-[#1B1B1B] hover:bg-[#C76A2A] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
            >
              Save Avatar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
