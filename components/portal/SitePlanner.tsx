"use client"

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Button } from '@/components/portal/ui/button'
import { Input } from '@/components/portal/ui/input'
import { Label } from '@/components/portal/ui/label'
import { Badge } from '@/components/portal/ui/badge'
import { supabase } from '@/lib/portal/supabase'
import { PRIVATE_STORAGE_BUCKETS, uploadPrivateFile, resolveStorageUrl } from '@/lib/portal/storage'
import { toast } from 'sonner'
import { SitePlan } from '@/types/crm'
import { useConfirm } from '@/components/portal/ui/alert-dialog'
import {
  MousePointer2, Pencil, Type,
  Save, X, Undo2, Redo2, Trash2, Loader2, RotateCcw, Upload,
  Plus, Copy, Square, Circle, Triangle, Minus,
  ZoomIn, ZoomOut, Maximize, Grid3X3, Magnet,
  ArrowUpToLine, ArrowLeftToLine,
  AlignStartVertical, AlignCenterVertical, AlignEndVertical,
  AlignStartHorizontal, AlignCenterHorizontal, AlignEndHorizontal,
  ArrowBigUp, ArrowBigDown,
  HelpCircle, Download, FileImage, FileType,
  Eye, EyeOff, ChevronUp, ChevronDown
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────

interface SitePlanPage {
  name: string
  canvas_json: Record<string, unknown> | null
  background_url: string | null
  background_opacity: number
  order: number
}

interface MultiPageData {
  pages: SitePlanPage[]
  canvasWidth: number
  canvasHeight: number
}

type ToolMode = 'select' | 'draw' | 'text' | 'icon' | 'rect' | 'circle' | 'triangle' | 'line'

interface SitePlannerProps {
  quotationId: string
  existingPlan?: SitePlan | null
  onSave?: (url: string) => void
  onClose?: () => void
}

const CANVAS_PRESETS = {
  A4: { w: 794, h: 1123 },
  A3: { w: 1123, h: 1587 },
  Letter: { w: 816, h: 1056 },
  Custom: { w: 900, h: 600 },
} as const

const DEFAULT_GRID_SIZE = 20
const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#000000', '#ffffff']

// ─── Sub-component: ToolButton ──────────────────────────

function ToolButton({ active, onClick, icon, label, title }: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  title?: string
}) {
  return (
    <Button
      variant={active ? 'default' : 'ghost'}
      size="sm"
      onClick={onClick}
      className={`text-white ${active ? 'bg-brand-electric hover:bg-brand-electric text-brand-navy font-semibold' : 'hover:bg-brand-navy/60'}`}
      title={title || label}
    >
      {icon}
      <span className="ml-1 text-xs hidden lg:inline">{label}</span>
    </Button>
  )
}

// ─── Sub-component: IconButton ─────────────────────────

function IconButton({ onClick, icon, label, disabled, active }: {
  onClick: () => void
  icon: React.ReactNode
  label: string
  disabled?: boolean
  active?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-1.5 rounded transition-colors text-white disabled:opacity-30 disabled:cursor-not-allowed
        ${active ? 'bg-brand-electric/30 text-brand-electric' : 'hover:bg-white/10'}`}
      title={label}
    >
      {icon}
    </button>
  )
}

// ─── Sub-component: PropertiesPanel ─────────────────────

function PropertiesPanel({
  selectedObject,
  onChange,
  onTextChange,
}: {
  selectedObject: any
  onChange: (props: Record<string, unknown>) => void
  onTextChange: (text: string) => void
}) {
  if (!selectedObject) {
    return (
      <div className="p-4 text-center text-brand-slate text-sm">
        Select an object to edit its properties
      </div>
    )
  }

  const isText = selectedObject.type === 'i-text' || selectedObject.type === 'text' || selectedObject.type === 'textbox'
  const isShape = ['rect', 'circle', 'triangle', 'line', 'ellipse'].includes(selectedObject.type)
  const isGroup = selectedObject.type === 'group'

  return (
    <div className="p-3 space-y-3 text-white overflow-y-auto">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-electric">
        Properties
      </h3>

      {/* Name */}
      <div className="text-xs text-brand-slate truncate">
        {isGroup ? 'Group' : selectedObject.type?.replace('i-', '')} — {Math.round(selectedObject.left ?? 0)}×{Math.round(selectedObject.top ?? 0)}
      </div>

      {/* Position */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-[10px] text-brand-slate">X</Label>
          <Input
            type="number"
            value={Math.round(selectedObject.left ?? 0)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ left: parseFloat(e.target.value) || 0 })}
            className="h-7 text-xs bg-brand-navy border-brand-steel/40 text-white"
          />
        </div>
        <div>
          <Label className="text-[10px] text-brand-slate">Y</Label>
          <Input
            type="number"
            value={Math.round(selectedObject.top ?? 0)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ top: parseFloat(e.target.value) || 0 })}
            className="h-7 text-xs bg-brand-navy border-brand-steel/40 text-white"
          />
        </div>
      </div>

      {/* Size */}
      <div className="grid grid-cols-[1fr_1fr_24px] gap-2 items-end">
        <div>
          <Label className="text-[10px] text-brand-slate">W</Label>
          <Input
            type="number"
            value={Math.round((selectedObject.width ?? 0) * (selectedObject.scaleX ?? 1))}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newW = parseFloat(e.target.value) || 0
              const currentW = (selectedObject.width ?? 0) * (selectedObject.scaleX ?? 1)
              const ratio = currentW > 0 ? newW / currentW : 1
              onChange({ scaleX: (selectedObject.scaleX ?? 1) * ratio })
            }}
            className="h-7 text-xs bg-brand-navy border-brand-steel/40 text-white"
          />
        </div>
        <div>
          <Label className="text-[10px] text-brand-slate">H</Label>
          <Input
            type="number"
            value={Math.round((selectedObject.height ?? 0) * (selectedObject.scaleY ?? 1))}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newH = parseFloat(e.target.value) || 0
              const currentH = (selectedObject.height ?? 0) * (selectedObject.scaleY ?? 1)
              const ratio = currentH > 0 ? newH / currentH : 1
              onChange({ scaleY: (selectedObject.scaleY ?? 1) * ratio })
            }}
            className="h-7 text-xs bg-brand-navy border-brand-steel/40 text-white"
          />
        </div>
        <div className="pb-0.5" />
      </div>

      {/* Rotation */}
      <div>
        <Label className="text-[10px] text-brand-slate">Rotation</Label>
        <Input
          type="range"
          min="0"
          max="360"
          value={Math.round(selectedObject.angle ?? 0)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ angle: parseInt(e.target.value) || 0 })}
          className="h-6 w-full"
        />
        <span className="text-[10px] text-brand-slate">{Math.round(selectedObject.angle ?? 0)}°</span>
      </div>

      {/* Opacity */}
      <div>
        <Label className="text-[10px] text-brand-slate">Opacity: {Math.round((selectedObject.opacity ?? 1) * 100)}%</Label>
        <Input
          type="range"
          min="0"
          max="100"
          value={Math.round((selectedObject.opacity ?? 1) * 100)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ opacity: parseInt(e.target.value) / 100 })}
          className="h-6 w-full"
        />
      </div>

      {/* Fill & Stroke for shapes */}
      {isShape && (
        <>
          <div className="flex items-center gap-2">
            <Label className="text-[10px] text-brand-slate w-10">Fill</Label>
            <input
              type="color"
              value={selectedObject.fill || '#ffffff'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ fill: e.target.value })}
              className="h-6 w-8 bg-transparent cursor-pointer"
            />
            <button
              className="text-[10px] text-brand-electric hover:underline"
              onClick={() => onChange({ fill: 'transparent' })}
            >
              none
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-[10px] text-brand-slate w-10">Stroke</Label>
            <input
              type="color"
              value={selectedObject.stroke || '#000000'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ stroke: e.target.value })}
              className="h-6 w-8 bg-transparent cursor-pointer"
            />
            <input
              type="range"
              min="0"
              max="10"
              value={selectedObject.strokeWidth || 1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ strokeWidth: parseInt(e.target.value) })}
              className="h-4 w-12"
            />
          </div>
        </>
      )}

      {/* Font for text */}
      {isText && (
        <>
          <div>
            <Label className="text-[10px] text-brand-slate">Font Size</Label>
            <Input
              type="number"
              value={selectedObject.fontSize ?? 16}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ fontSize: parseInt(e.target.value) || 16 })}
              className="h-7 text-xs bg-brand-navy border-brand-steel/40 text-white"
            />
          </div>
          <div>
            <Label className="text-[10px] text-brand-slate">Font</Label>
            <select
              value={selectedObject.fontFamily ?? 'Arial'}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange({ fontFamily: e.target.value })}
              className="w-full h-7 text-xs bg-brand-navy border border-brand-steel/40 rounded text-white px-1"
            >
              {['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana', 'Impact'].map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-[10px] text-brand-slate">Text</Label>
            <textarea
              value={selectedObject.text ?? ''}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onTextChange(e.target.value)}
              className="w-full h-16 text-xs bg-brand-navy border border-brand-steel/40 rounded text-white p-1 resize-none"
            />
          </div>
        </>
      )}

      {/* Fill color for text */}
      {isText && (
        <div className="flex items-center gap-2">
          <Label className="text-[10px] text-brand-slate w-10">Color</Label>
          <input
            type="color"
            value={selectedObject.fill || '#1e293b'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ fill: e.target.value })}
            className="h-6 w-8 bg-transparent cursor-pointer"
          />
        </div>
      )}
    </div>
  )
}

// ─── Sub-component: ShortcutsModal ──────────────────────

function ShortcutsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null

  const shortcuts = [
    { keys: 'Ctrl+Z', desc: 'Undo' },
    { keys: 'Ctrl+Shift+Z / Ctrl+Y', desc: 'Redo' },
    { keys: 'Ctrl+C', desc: 'Copy selected' },
    { keys: 'Ctrl+V', desc: 'Paste' },
    { keys: 'Ctrl+X', desc: 'Cut selected' },
    { keys: 'Ctrl+A', desc: 'Select all' },
    { keys: 'Delete / Backspace', desc: 'Delete selected' },
    { keys: 'Escape', desc: 'Deselect all / Cancel tool' },
    { keys: 'Ctrl+0', desc: 'Fit to screen' },
    { keys: '+ / -', desc: 'Zoom in / out' },
    { keys: 'Space + Drag', desc: 'Pan canvas' },
    { keys: 'Ctrl+]', desc: 'Bring forward' },
    { keys: 'Ctrl+Shift+]', desc: 'Bring to front' },
    { keys: 'Ctrl+[', desc: 'Send backward' },
    { keys: 'Ctrl+Shift+[', desc: 'Send to back' },
    { keys: 'Mouse wheel', desc: 'Zoom at cursor' },
  ]

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="bg-brand-navy border border-brand-steel/40 rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold text-lg">Keyboard Shortcuts</h2>
          <button onClick={onClose} className="text-brand-slate hover:text-white"><X className="h-5 w-5" /></button>
        </div>
        <div className="space-y-1.5 max-h-[60vh] overflow-y-auto">
          {shortcuts.map((s, i) => (
            <div key={i} className="flex justify-between items-center py-1.5 border-b border-brand-steel/20 last:border-0">
              <kbd className="text-xs px-2 py-0.5 bg-brand-navy/60 border border-brand-steel/40 rounded text-brand-electric font-mono">
                {s.keys}
              </kbd>
              <span className="text-sm text-white ml-4">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const SECURITY_DEVICES = [
  {
    id: 'dome-camera',
    name: 'Dome Camera',
    svg: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="22" fill="#2563eb" stroke="#ffffff" stroke-width="2"/>
        <path d="M14 20h20v2c0 5.52-4.48 10-10 10s-10-4.48-10-10v-2z" fill="#ffffff"/>
        <circle cx="24" cy="22" r="4" fill="#1e3a8a"/>
        <path d="M18 20v-4c0-3.31 2.69-6 6-6s6 2.69 6 6v4" stroke="#ffffff" stroke-width="2" fill="none"/>
      </svg>
    `)
  },
  {
    id: 'bullet-camera',
    name: 'Bullet Camera',
    svg: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="22" fill="#3b82f6" stroke="#ffffff" stroke-width="2"/>
        <rect x="14" y="16" width="16" height="10" rx="2" fill="#ffffff"/>
        <path d="M30 18l6-3v10l-6-3" fill="#ffffff" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"/>
        <rect x="18" y="26" width="4" height="8" fill="#ffffff"/>
        <path d="M14 34h12" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `)
  },
  {
    id: 'pir-motion',
    name: 'Motion Detector (PIR)',
    svg: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="22" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
        <path d="M16 16h16v16H16z" fill="#ffffff" rx="2"/>
        <path d="M20 20c2 1 2 3 0 4M28 20c-2 1-2 3 0 4M24 16v16" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `)
  },
  {
    id: 'door-contact',
    name: 'Door Contact',
    svg: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="22" fill="#22c55e" stroke="#ffffff" stroke-width="2"/>
        <rect x="16" y="14" width="6" height="20" rx="1" fill="#ffffff"/>
        <rect x="26" y="14" width="6" height="20" rx="1" fill="#ffffff"/>
        <path d="M22 24h4" stroke="#ffffff" stroke-width="2" stroke-dasharray="2 2"/>
      </svg>
    `)
  },
  {
    id: 'alarm-keypad',
    name: 'Alarm Keypad',
    svg: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="22" fill="#f97316" stroke="#ffffff" stroke-width="2"/>
        <rect x="15" y="13" width="18" height="22" rx="2" fill="#ffffff"/>
        <rect x="18" y="16" width="12" height="6" fill="#cbd5e1"/>
        <circle cx="19" cy="26" r="1.5" fill="#f97316"/>
        <circle cx="24" cy="26" r="1.5" fill="#f97316"/>
        <circle cx="29" cy="26" r="1.5" fill="#f97316"/>
        <circle cx="19" cy="30" r="1.5" fill="#f97316"/>
        <circle cx="24" cy="30" r="1.5" fill="#f97316"/>
        <circle cx="29" cy="30" r="1.5" fill="#f97316"/>
      </svg>
    `)
  },
  {
    id: 'siren',
    name: 'Siren / Strobe',
    svg: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="22" fill="#ec4899" stroke="#ffffff" stroke-width="2"/>
        <path d="M16 20l12-6v20l-12-6z" fill="#ffffff"/>
        <path d="M30 18c2 2 2 6 0 8" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none"/>
        <path d="M33 15c4 3 4 11 0 14" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none"/>
        <rect x="14" y="21" width="3" height="6" fill="#ffffff"/>
      </svg>
    `)
  },
  {
    id: 'energizer',
    name: 'Fence Energizer',
    svg: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="22" fill="#8b5cf6" stroke="#ffffff" stroke-width="2"/>
        <rect x="16" y="14" width="16" height="20" rx="2" fill="#ffffff"/>
        <path d="M25 18l-4 6h5l-3 6" stroke="#8b5cf6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      </svg>
    `)
  },
  {
    id: 'gate-motor',
    name: 'Gate Motor',
    svg: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="22" fill="#14b8a6" stroke="#ffffff" stroke-width="2"/>
        <rect x="15" y="18" width="18" height="16" rx="2" fill="#ffffff"/>
        <circle cx="24" cy="26" r="4" fill="#14b8a6"/>
        <path d="M24 22v8M20 26h8" stroke="#ffffff" stroke-width="1.5"/>
        <path d="M19 14h10" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `)
  },
  {
    id: 'access-reader',
    name: 'Access Reader',
    svg: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="22" fill="#0ea5e9" stroke="#ffffff" stroke-width="2"/>
        <rect x="17" y="13" width="14" height="22" rx="2" fill="#ffffff"/>
        <rect x="20" y="16" width="8" height="6" fill="#0ea5e9"/>
        <path d="M21 27c0-2 3-2 3-2s3 0 3 2v4h-6v-4z" fill="#0ea5e9"/>
        <circle cx="24" cy="25" r="1.5" fill="#0ea5e9"/>
      </svg>
    `)
  }
]

// ─── Main Component ─────────────────────────────────────

export default function SitePlanner({ quotationId, existingPlan, onSave, onClose }: SitePlannerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<any>(null)
  const fabricLibRef = useRef<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { confirm, ConfirmDialog } = useConfirm()

  // ── Multi-page state ──
  const [pages, setPages] = useState<SitePlanPage[]>([{
    name: 'Page 1',
    canvas_json: null,
    background_url: null,
    background_opacity: 1,
    order: 0,
  }])
  const [activePageIndex, setActivePageIndex] = useState(0)
  const [thumbnails, setThumbnails] = useState<Map<number, string>>(new Map())

  // ── Tool state ──
  const [activeTool, setActiveTool] = useState<ToolMode>('select')
  const [drawColor, setDrawColor] = useState('#ef4444')
  const drawWidth = 3
  const [fillColor, setFillColor] = useState('#3b82f6')
  const [strokeColor, setStrokeColor] = useState('#1e40af')
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [selectedIcon, setSelectedIcon] = useState<any>(null)
  // ── Zoom & Pan ──
  const [zoom, setZoom] = useState(100)
  const panRef = useRef(false)
  const panStartRef = useRef<{ x: number; y: number } | null>(null)
  const spaceHeldRef = useRef(false)

  // ── Grid & Snap ──
  const [showGrid, setShowGrid] = useState(false)
  const [snapToGrid, setSnapToGrid] = useState(true)
  const gridSize = DEFAULT_GRID_SIZE

  // ── Undo/Redo (per-page) ──
  const pageHistoriesRef = useRef<Map<number, { stack: any[]; idx: number }>>(new Map())
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  // ── Clipboard ──
  const clipboardRef = useRef<any[]>([])

  // ── Background ──
  const [hasBackground, setHasBackground] = useState(false)
  const [backgroundOpacity, setBackgroundOpacity] = useState(1)
  const [canvasPreset, setCanvasPreset] = useState<keyof typeof CANVAS_PRESETS>('Custom')
  const [customW, setCustomW] = useState(900)
  const [customH, setCustomH] = useState(600)

  // ── UI state ──
  const [saving, setSaving] = useState(false)
  const [canvasReady, setCanvasReady] = useState(false)
  const [statusText, setStatusText] = useState('Ready')
  const [selectedObj, setSelectedObj] = useState<any>(null)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [rightPanelTab, setRightPanelTab] = useState<'properties' | 'layers' | 'devices'>('devices')
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; pageIndex: number } | null>(null)

  const activeToolRef = useRef(activeTool)
  activeToolRef.current = activeTool

  const selectedIconRef = useRef(selectedIcon)
  selectedIconRef.current = selectedIcon

  const fillColorRef = useRef(fillColor)
  fillColorRef.current = fillColor

  const strokeColorRef = useRef(strokeColor)
  strokeColorRef.current = strokeColor

  const strokeWidthRef = useRef(strokeWidth)
  strokeWidthRef.current = strokeWidth

  const drawColorRef = useRef(drawColor)
  drawColorRef.current = drawColor

  const snapToGridRef = useRef(snapToGrid)
  snapToGridRef.current = snapToGrid

  const gridSizeRef = useRef(gridSize)
  gridSizeRef.current = gridSize

  // ── Drawing shape state ──
  const shapeDrawingRef = useRef<{ startX: number; startY: number; shape: any } | null>(null)
  const lineStartRef = useRef<{ x: number; y: number } | null>(null)

  // ── History helpers ──
  const saveHistory = useCallback(() => {
    const canvas = fabricRef.current
    if (!canvas) return
    try {
      const json = canvas.toJSON(['deviceType', 'deviceName'])
      const hist = pageHistoriesRef.current.get(activePageIndex) || { stack: [], idx: -1 }
      const existing = hist.stack[hist.idx]
      if (existing && JSON.stringify(existing) === JSON.stringify(json)) return
      const newStack = hist.stack.slice(0, hist.idx + 1)
      newStack.push(json)
      if (newStack.length > 50) newStack.shift()
      else if (hist.idx < hist.stack.length - 1) { /* truncated redo stack */ }
      const newHist = { stack: newStack, idx: newStack.length - 1 }
      pageHistoriesRef.current.set(activePageIndex, newHist)
      setCanUndo(newHist.idx > 0)
      setCanRedo(newHist.idx < newHist.stack.length - 1)
    } catch { /* ignore */ }
  }, [activePageIndex])

  const updateUndoRedoState = useCallback(() => {
    const hist = pageHistoriesRef.current.get(activePageIndex)
    if (hist) {
      setCanUndo(hist.idx > 0)
      setCanRedo(hist.idx < hist.stack.length - 1)
    } else {
      setCanUndo(false)
      setCanRedo(false)
    }
  }, [activePageIndex])

  // ── Save current page state to pages array ──
  const saveCurrentPageState = useCallback(() => {
    const canvas = fabricRef.current
    if (!canvas) return
    try {
      const json = canvas.toJSON(['deviceType', 'deviceName'])
      const rawBgUrl = pages[activePageIndex]?.background_url || null

      setPages(prev => {
        const next = [...prev]
        if (next[activePageIndex]) {
          next[activePageIndex] = {
            ...next[activePageIndex],
            canvas_json: json,
            background_url: rawBgUrl,
          }
        }
        return next
      })
      // Generate thumbnail
      try {
        const dataUrl = canvas.toDataURL({ format: 'png', quality: 0.5, multiplier: 0.15 })
        setThumbnails(prev => {
          const next = new Map(prev)
          next.set(activePageIndex, dataUrl)
          return next
        })
      } catch { /* ignore */ }
    } catch { /* ignore */ }
  }, [activePageIndex, pages])

  // ── Grid overlay function ──
  const attachGridOverlayFn = useCallback((canvas: any) => {
    if (!canvas) return
    canvas.off('before:render')
    canvas.on('before:render', () => {
      const ctx = canvas.contextContainer
      if (!ctx) return
      const w = canvas.width || 900
      const h = canvas.height || 600
      const gs = gridSize
      const vpt = canvas.viewportTransform
      if (!vpt) return

      const z = canvas.getZoom()
      const panX = vpt[4]
      const panY = vpt[5]

      ctx.save()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.strokeStyle = 'rgba(148,163,184,0.12)'
      ctx.lineWidth = 0.5

      const step = gs * z
      const offsetX = panX % step
      const offsetY = panY % step

      for (let x = offsetX; x < w; x += step) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = offsetY; y < h; y += step) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
      ctx.restore()
    })
    canvas.renderAll()
  }, [gridSize])

  // ── Load page into canvas ──
  const loadPage = useCallback(async (pageIndex: number, canvas: any) => {
    const page = pages[pageIndex]
    if (!page || !canvas) return

    canvas.off('before:render')
    canvas.clear()
    canvas.setBackgroundImage(null, () => {})
    canvas.backgroundColor = '#e8ecf2'

    if (page.canvas_json) {
      try {
        await new Promise<void>((resolve) => {
          canvas.loadFromJSON(page.canvas_json, () => {
            if (page.background_url) {
              const resolveAndSetBg = async () => {
                let displayBg = page.background_url
                if (page.background_url && !page.background_url.startsWith('data:') && !page.background_url.startsWith('blob:') && !page.background_url.startsWith('http')) {
                  try {
                    displayBg = await resolveStorageUrl(PRIVATE_STORAGE_BUCKETS.SITE_PLANS, page.background_url)
                  } catch (e) {
                    console.error('Error resolving background URL:', e)
                  }
                }
                canvas.setBackgroundImage(
                  displayBg,
                  canvas.renderAll.bind(canvas),
                  { opacity: page.background_opacity ?? 1 }
                )
              }
              resolveAndSetBg()
            }
            resolve()
          })
        })
      } catch {
        canvas.backgroundColor = '#e8ecf2'
        canvas.renderAll()
      }
    } else {
      canvas.renderAll()
    }

    setHasBackground(!!page.background_url)
    setBackgroundOpacity(page.background_opacity ?? 1)
    setActivePageIndex(pageIndex)
    setSelectedObj(null)
    canvas.discardActiveObject?.()
    updateUndoRedoState()

    // Restore grid if active
    if (showGrid) {
      attachGridOverlayFn(canvas)
    }

    canvas.renderAll()
  }, [pages, showGrid, updateUndoRedoState, attachGridOverlayFn])

  // ── Grid toggle effect ──
  useEffect(() => {
    const canvas = fabricRef.current
    if (!canvas) return
    if (showGrid) {
      attachGridOverlayFn(canvas)
    } else {
      canvas.off('before:render')
      canvas.renderAll()
    }
  }, [showGrid, attachGridOverlayFn])

  // ── Init canvas ──
  useEffect(() => {
    let canvas: any = null
    let disposed = false

    const initCanvas = async () => {
      const fabric = await import('fabric')
      fabricLibRef.current = fabric

      if (!canvasRef.current || disposed) return

      canvas = new fabric.Canvas(canvasRef.current, {
        width: customW,
        height: customH,
        backgroundColor: '#e8ecf2',
        selection: true,
        preserveObjectStacking: true,
        fireRightClick: true,
        stopContextMenu: false,
      })

      fabricRef.current = canvas
      setCanvasReady(true)

      // 1. Selection & Object bindings
      canvas.on('object:added', () => saveHistory())
      canvas.on('selection:created', (opt: any) => setSelectedObj(opt.selected?.[0] || null))
      canvas.on('selection:updated', (opt: any) => setSelectedObj(opt.selected?.[0] || null))
      canvas.on('selection:cleared', () => setSelectedObj(null))

      // 2. Snap to grid & modification saving
      canvas.on('object:modified', (opt: any) => {
        if (snapToGridRef.current) {
          const obj = opt.target
          if (obj && !obj.isEditing) {
            const gs = gridSizeRef.current
            if (obj.left !== undefined) obj.left = Math.round(obj.left / gs) * gs
            if (obj.top !== undefined) obj.top = Math.round(obj.top / gs) * gs
          }
        }
        saveHistory()
        saveCurrentPageState()
      })

      // Helper function to remove guides
      const removeGuides = () => {
        const oldGuides = canvas.getObjects().filter((o: any) => o.type === 'guide-line')
        oldGuides.forEach((g: any) => canvas.remove(g))
      }

      // 3. Smart guides during movement
      canvas.on('object:moving', (opt: any) => {
        const obj = opt.target
        if (!obj) return

        const objects = canvas.getObjects().filter((o: any) => o !== obj && o.type !== 'guide-line')
        const objCenter = obj.getCenterPoint()
        const objL = obj.left ?? 0
        const objR = objL + (obj.width ?? 0) * (obj.scaleX ?? 1)
        const objT = obj.top ?? 0
        const objB = objT + (obj.height ?? 0) * (obj.scaleY ?? 1)

        removeGuides()
        const threshold = 6
        const guides: any[] = []

        const addG = (x1: number, y1: number, x2: number, y2: number) => {
          const line = new fabric.Line([x1, y1, x2, y2], {
            stroke: '#00e5ff', strokeWidth: 1, strokeDashArray: [5, 3],
            selectable: false, evented: false, excludeFromExport: true,
          })
          line.type = 'guide-line'
          guides.push(line)
        }

        for (const other of objects) {
          const oc = other.getCenterPoint()
          const ol = other.left ?? 0
          const or = ol + (other.width ?? 0) * (other.scaleX ?? 1)
          const ot = other.top ?? 0
          const ob = ot + (other.height ?? 0) * (other.scaleY ?? 1)

          if (Math.abs(objCenter.x - oc.x) < threshold) addG(oc.x, 0, oc.x, canvas.height || 600)
          if (Math.abs(objCenter.y - oc.y) < threshold) addG(0, oc.y, canvas.width || 900, oc.y)
          if (Math.abs(objL - ol) < threshold) addG(ol, 0, ol, canvas.height || 600)
          if (Math.abs(objL - or) < threshold) addG(or, 0, or, canvas.height || 600)
          if (Math.abs(objR - ol) < threshold) addG(ol, 0, ol, canvas.height || 600)
          if (Math.abs(objR - or) < threshold) addG(or, 0, or, canvas.height || 600)
          if (Math.abs(objT - ot) < threshold) addG(0, ot, canvas.width || 900, ot)
          if (Math.abs(objT - ob) < threshold) addG(0, ob, canvas.width || 900, ob)
          if (Math.abs(objB - ot) < threshold) addG(0, ot, canvas.width || 900, ot)
          if (Math.abs(objB - ob) < threshold) addG(0, ob, canvas.width || 900, ob)
        }

        for (const g of guides) canvas.add(g)
        canvas.renderAll()
      })

      // 4. Mouse wheel zoom
      canvas.on('mouse:wheel', (opt: any) => {
        if (spaceHeldRef.current) return
        const delta = opt.e.deltaY
        let z = canvas.getZoom()
        z *= 0.999 ** delta
        if (z > 20) z = 20
        if (z < 0.05) z = 0.05
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, z)
        setZoom(Math.round(z * 100))
        opt.e.preventDefault()
        opt.e.stopPropagation()
      })

      // 5. Mouse Down: Pan & Tool routing
      canvas.on('mouse:down', (opt: any) => {
        if (spaceHeldRef.current && opt.e.button === 0) {
          panRef.current = true
          panStartRef.current = { x: opt.e.clientX, y: opt.e.clientY }
          canvas.defaultCursor = 'grabbing'
          canvas.hoverCursor = 'grabbing'
          canvas.selection = false
          opt.e.preventDefault()
          return
        }

        const tool = activeToolRef.current
        if (tool === 'select' || tool === 'draw') return

        const pointer = canvas.getPointer(opt.e)

        if (tool === 'line') {
          if (!lineStartRef.current) {
            lineStartRef.current = { x: pointer.x, y: pointer.y }
            setStatusText('Click to set line end point')
          } else {
            const line = new fabric.Line(
              [lineStartRef.current.x, lineStartRef.current.y, pointer.x, pointer.y],
              { stroke: strokeColorRef.current, strokeWidth: strokeWidthRef.current, fill: 'transparent', selectable: true, evented: true }
            )
            canvas.add(line)
            canvas.renderAll()
            lineStartRef.current = null
            setStatusText('Click to set line start point')
            saveHistory()
            saveCurrentPageState()
          }
        } else if (tool === 'text') {
          const labelText = prompt('Enter label text:', 'Label')
          if (!labelText) return

          const text = new fabric.IText(labelText, {
            left: pointer.x, top: pointer.y,
            fontSize: 18, fontFamily: 'Arial', fill: '#1e293b', fontWeight: 'bold',
            backgroundColor: 'rgba(255, 255, 255, 0.85)', padding: 6,
            borderColor: '#3b82f6', cornerColor: '#3b82f6', cornerSize: 8,
            transparentCorners: false, editable: true,
          })

          canvas.add(text)
          canvas.setActiveObject(text)
          canvas.renderAll()
          saveHistory()
          saveCurrentPageState()
        } else if (tool === 'icon') {
          const icon = selectedIconRef.current
          if (!icon) return
          const imgEl = new Image()
          imgEl.src = icon.svg
          imgEl.onload = () => {
            const img = new fabric.Image(imgEl, {
              left: pointer.x - 24, top: pointer.y - 24,
              scaleX: 1, scaleY: 1,
              hasRotatingPoint: true, cornerSize: 10,
              transparentCorners: false, borderColor: '#3b82f6', cornerColor: '#3b82f6',
            })

            const label = new fabric.Text(icon.name, {
              left: pointer.x, top: pointer.y + 28,
              fontSize: 11, fontFamily: 'Arial', fill: '#475569',
              textAlign: 'center', originX: 'center',
              backgroundColor: 'rgba(255,255,255,0.8)', padding: 2,
            })

            const group = new fabric.Group([img, label], {
              left: pointer.x - 24, top: pointer.y - 24,
              hasRotatingPoint: true, cornerSize: 10,
              transparentCorners: false, borderColor: '#3b82f6', cornerColor: '#3b82f6',
              deviceType: icon.id,
              deviceName: icon.name
            } as any)

            canvas.add(group)
            canvas.renderAll()
            saveHistory()
            saveCurrentPageState()
          }
        } else if (['rect', 'circle', 'triangle'].includes(tool)) {
          shapeDrawingRef.current = { startX: pointer.x, startY: pointer.y, shape: null }
        }
      })

      // 6. Mouse Move: Pan & Shape Drawing dimensions
      canvas.on('mouse:move', (opt: any) => {
        if (panRef.current && panStartRef.current && spaceHeldRef.current) {
          const dx = opt.e.clientX - panStartRef.current.x
          const dy = opt.e.clientY - panStartRef.current.y
          canvas.relativePan({ x: dx, y: dy })
          panStartRef.current = { x: opt.e.clientX, y: opt.e.clientY }
          return
        }

        const tool = activeToolRef.current
        if (!['rect', 'circle', 'triangle'].includes(tool)) return
        const sd = shapeDrawingRef.current
        if (!sd) return

        const pointer = canvas.getPointer(opt.e)

        const w = Math.abs(pointer.x - sd.startX)
        const h = Math.abs(pointer.y - sd.startY)
        const left = Math.min(pointer.x, sd.startX)
        const top = Math.min(pointer.y, sd.startY)

        if (sd.shape) canvas.remove(sd.shape)

        let shape: any
        switch (tool) {
          case 'rect':
            shape = new fabric.Rect({ left, top, width: w, height: h, fill: fillColorRef.current, stroke: strokeColorRef.current, strokeWidth: strokeWidthRef.current, selectable: false, evented: false })
            break
          case 'circle':
            shape = new fabric.Ellipse({ left, top, rx: w / 2, ry: h / 2, fill: fillColorRef.current, stroke: strokeColorRef.current, strokeWidth: strokeWidthRef.current, selectable: false, evented: false })
            break
          case 'triangle':
            shape = new fabric.Triangle({ left: sd.startX, top: sd.startY, width: pointer.x - sd.startX, height: pointer.y - sd.startY, fill: fillColorRef.current, stroke: strokeColorRef.current, strokeWidth: strokeWidthRef.current, selectable: false, evented: false })
            break
        }

        if (shape) {
          sd.shape = shape
          canvas.add(shape)
          canvas.renderAll()
        }
      })

      // 7. Mouse Up: Finish pan or shape creation
      canvas.on('mouse:up', () => {
        if (panRef.current) {
          panRef.current = false
          panStartRef.current = null
          canvas.defaultCursor = 'default'
          canvas.hoverCursor = 'move'
          canvas.selection = true
        }

        const tool = activeToolRef.current
        if (['rect', 'circle', 'triangle'].includes(tool)) {
          const sd = shapeDrawingRef.current
          if (sd && sd.shape) {
            sd.shape.set({ selectable: true, evented: true })
            canvas.requestRenderAll()
            saveHistory()
            saveCurrentPageState()
          }
          shapeDrawingRef.current = null
        }

        removeGuides()
        canvas.renderAll()
      })

      // Load existing plan
      if (existingPlan?.canvas_json) {
        const data = existingPlan.canvas_json as any
        if (data?.pages && Array.isArray(data.pages)) {
          setPages(data.pages)
          const w = data.canvasWidth || customW
          const h = data.canvasHeight || customH
          setCustomW(w); setCustomH(h)
          canvas.setWidth(w); canvas.setHeight(h)
          await loadPageDirect(0, canvas, data.pages)
        } else {
          const bgUrl = existingPlan.background_url || null
          setPages([{ name: 'Page 1', canvas_json: data, background_url: bgUrl, background_opacity: 1, order: 0 }])
          setHasBackground(!!bgUrl)
          canvas.loadFromJSON(data, () => {
            if (bgUrl) {
              const resolveAndSetBg = async () => {
                let displayBg = bgUrl
                if (bgUrl && !bgUrl.startsWith('data:') && !bgUrl.startsWith('blob:') && !bgUrl.startsWith('http')) {
                  try {
                    displayBg = await resolveStorageUrl(PRIVATE_STORAGE_BUCKETS.SITE_PLANS, bgUrl)
                  } catch (e) {
                    console.error('Error resolving background URL:', e)
                  }
                }
                canvas.setBackgroundImage(displayBg, canvas.renderAll.bind(canvas), { opacity: 1 })
              }
              resolveAndSetBg()
            } else {
              canvas.renderAll()
            }
            setStatusText('Plan loaded — ready to edit')
            saveHistory()
          })
        }
      }
    }

    const loadPageDirect = async (idx: number, c: any, pageList?: SitePlanPage[]) => {
      const list = pageList || pages
      const page = list[idx]
      if (!page) return
      c.clear()
      c.setBackgroundImage(null, () => {})
      c.backgroundColor = '#e8ecf2'
      if (page.canvas_json) {
        await new Promise<void>((resolve) => {
          c.loadFromJSON(page.canvas_json, () => {
            if (page.background_url) {
              const resolveAndSetBg = async () => {
                let displayBg = page.background_url
                if (page.background_url && !page.background_url.startsWith('data:') && !page.background_url.startsWith('blob:') && !page.background_url.startsWith('http')) {
                  try {
                    displayBg = await resolveStorageUrl(PRIVATE_STORAGE_BUCKETS.SITE_PLANS, page.background_url)
                  } catch (e) {
                    console.error('Error resolving background URL:', e)
                  }
                }
                c.setBackgroundImage(displayBg, c.renderAll.bind(c), { opacity: page.background_opacity ?? 1 })
              }
              resolveAndSetBg()
            }
            resolve()
          })
        })
      } else {
        c.renderAll()
      }
      setHasBackground(!!page.background_url)
      setBackgroundOpacity(page.background_opacity ?? 1)
      saveHistory()
      c.renderAll()
    }

    initCanvas()

    return () => {
      disposed = true
      if (canvas) canvas.dispose()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Tool mode effect ──
  useEffect(() => {
    const canvas = fabricRef.current
    if (!canvas) return

    canvas.isDrawingMode = false
    canvas.selection = true
    canvas.defaultCursor = spaceHeldRef.current ? 'grab' : 'default'
    canvas.hoverCursor = spaceHeldRef.current ? 'grab' : 'move'
    shapeDrawingRef.current = null
    lineStartRef.current = null

    switch (activeTool) {
      case 'select':
        setStatusText('Click to select, drag to move. Shift+click for multi-select.')
        break

      case 'draw':
        canvas.isDrawingMode = true
        canvas.freeDrawingBrush.color = drawColor
        canvas.freeDrawingBrush.width = drawWidth
        canvas.selection = false
        setStatusText('Draw freely on the canvas')
        break

      case 'rect':
      case 'circle':
      case 'triangle':
      case 'line':
        canvas.selection = false
        canvas.defaultCursor = 'crosshair'
        setStatusText(`Click-drag to draw a ${activeTool}`)
        break

      case 'text':
        canvas.selection = false
        canvas.defaultCursor = 'text'
        setStatusText('Click anywhere to add a text label')
        break

      case 'icon':
        canvas.selection = false
        canvas.defaultCursor = 'copy'
        setStatusText(selectedIcon ? `Click to place: ${selectedIcon.name}` : 'Select an icon first')
        break
    }
  }, [activeTool, drawColor, drawWidth, selectedIcon])

  // ── Update brush ──
  useEffect(() => {
    const canvas = fabricRef.current
    if (!canvas || activeTool !== 'draw') return
    canvas.freeDrawingBrush.color = drawColor
    canvas.freeDrawingBrush.width = drawWidth
  }, [drawColor, drawWidth, activeTool])

  // ── Undo ──
  const handleUndo = useCallback(() => {
    const canvas = fabricRef.current
    if (!canvas) return
    const hist = pageHistoriesRef.current.get(activePageIndex)
    if (!hist || hist.idx <= 0) return
    hist.idx -= 1
    canvas.loadFromJSON(hist.stack[hist.idx], () => {
      canvas.renderAll()
      updateUndoRedoState()
      saveCurrentPageState()
    })
  }, [activePageIndex, updateUndoRedoState, saveCurrentPageState])

  // ── Redo ──
  const handleRedo = useCallback(() => {
    const canvas = fabricRef.current
    if (!canvas) return
    const hist = pageHistoriesRef.current.get(activePageIndex)
    if (!hist || hist.idx >= hist.stack.length - 1) return
    hist.idx += 1
    canvas.loadFromJSON(hist.stack[hist.idx], () => {
      canvas.renderAll()
      updateUndoRedoState()
      saveCurrentPageState()
    })
  }, [activePageIndex, updateUndoRedoState, saveCurrentPageState])

  // ── Delete ──
  const handleDelete = useCallback(() => {
    const canvas = fabricRef.current
    if (!canvas) return
    const active = canvas.getActiveObject()
    if (active?.isEditing) return
    const selected = canvas.getActiveObjects()
    if (selected.length === 0) return
    selected.forEach((obj: any) => canvas.remove(obj))
    canvas.discardActiveObject()
    canvas.renderAll()
    saveHistory()
    saveCurrentPageState()
    setSelectedObj(null)
  }, [saveHistory, saveCurrentPageState])

  // ── Copy ──
  const handleCopy = useCallback(() => {
    const canvas = fabricRef.current
    if (!canvas) return
    const active = canvas.getActiveObjects()
    if (active.length === 0) return
    clipboardRef.current = active.map((obj: any) => obj.toObject())
    toast.success(`Copied ${active.length} object(s)`)
  }, [])

  // ── Paste ──
  const handlePaste = useCallback(() => {
    const canvas = fabricRef.current
    const fabric = fabricLibRef.current
    if (!canvas || !fabric || clipboardRef.current.length === 0) return

    const toEnliven = JSON.parse(JSON.stringify(clipboardRef.current))
    fabric.util.enlivenObjects(toEnliven).then((objects: any[]) => {
      canvas.discardActiveObject()
      objects.forEach((obj: any) => {
        obj.set({ left: (obj.left ?? 0) + 25, top: (obj.top ?? 0) + 25 })
        canvas.add(obj)
        canvas.setActiveObject(obj)
      })
      canvas.renderAll()
      saveHistory()
      saveCurrentPageState()
    })
  }, [saveHistory, saveCurrentPageState])

  // ── Cut ──
  const handleCut = useCallback(() => { handleCopy(); handleDelete() }, [handleCopy, handleDelete])

  // ── Select All ──
  const handleSelectAll = useCallback(() => {
    const canvas = fabricRef.current
    const fabric = fabricLibRef.current
    if (!canvas || !fabric) return
    canvas.discardActiveObject()
    const all = canvas.getObjects().filter((o: any) => o.type !== 'guide-line')
    if (all.length > 0) {
      const sel = new fabric.ActiveSelection(all, { canvas })
      canvas.setActiveObject(sel)
      canvas.renderAll()
    }
  }, [])

  // ── Background upload ──
  const handleBackgroundUpload = useCallback(async (file: File) => {
    const canvas = fabricRef.current
    if (!file || !canvas) return

    const reader = new FileReader()
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const fabric = fabricLibRef.current
      if (!fabric) return

      try {
        const dataUrl = e.target?.result as string
        const res = await fetch(dataUrl)
        const blob = await res.blob()
        const bgFilename = `${quotationId}/backgrounds/${Date.now()}-${file.name}`
        const bgUrl = await uploadPrivateFile(PRIVATE_STORAGE_BUCKETS.SITE_PLANS, bgFilename, blob)
        const displayUrl = await resolveStorageUrl(PRIVATE_STORAGE_BUCKETS.SITE_PLANS, bgUrl)

        applyBackgroundImageRef.current(canvas, bgUrl, displayUrl, fabric)
      } catch (err) {
        console.error('Error uploading background:', err)
        // Fallback to data URL
        applyBackgroundImageRef.current(canvas, e.target?.result as string, undefined, fabric)
      }
    }
    reader.readAsDataURL(file)
  }, [quotationId])

  const applyBackgroundImage = useCallback((canvas: any, src: string, displayUrl?: string, fabricLib?: any) => {
    const imgEl = new Image()
    imgEl.src = displayUrl || src
    imgEl.onload = () => {
      const fabric = fabricLib || fabricLibRef.current
      if (!fabric) return
      const fImg = new fabric.Image(imgEl)
      const scaleX = canvas.width / fImg.width
      const scaleY = canvas.height / fImg.height
      const scale = Math.min(scaleX, scaleY)

      canvas.setBackgroundImage(fImg, canvas.renderAll.bind(canvas), {
        scaleX: scale, scaleY: scale,
        originX: 'left', originY: 'top',
        opacity: backgroundOpacity,
      })

      setHasBackground(true)
      setStatusText('Floor plan loaded')
      setPages(prev => {
        const next = [...prev]
        if (next[activePageIndex]) {
          next[activePageIndex] = { ...next[activePageIndex], background_url: src, background_opacity: backgroundOpacity }
        }
        return next
      })
      saveHistory()
    }
  }, [activePageIndex, backgroundOpacity, saveHistory])

  const applyBackgroundImageRef = useRef(applyBackgroundImage)
  applyBackgroundImageRef.current = applyBackgroundImage

  // ── Remove background ──
  const handleRemoveBackground = useCallback(async () => {
    const canvas = fabricRef.current
    if (!canvas) return
    const ok = await confirm({
      title: 'Remove Background',
      description: 'Remove the background image from this page?',
      confirmLabel: 'Remove',
      variant: 'destructive',
    })
    if (!ok) return
    canvas.setBackgroundImage(null, () => {})
    canvas.backgroundColor = '#e8ecf2'
    canvas.renderAll()
    setHasBackground(false)
    setPages(prev => {
      const next = [...prev]
      if (next[activePageIndex]) next[activePageIndex] = { ...next[activePageIndex], background_url: null }
      return next
    })
    saveHistory()
  }, [activePageIndex, saveHistory, confirm])

  // ── Background opacity ──
  const handleBackgroundOpacityChange = useCallback((opacity: number) => {
    setBackgroundOpacity(opacity)
    const canvas = fabricRef.current
    if (!canvas || !canvas.backgroundImage) return
    canvas.backgroundImage.opacity = opacity
    canvas.renderAll()
    setPages(prev => {
      const next = [...prev]
      if (next[activePageIndex]) next[activePageIndex] = { ...next[activePageIndex], background_opacity: opacity }
      return next
    })
  }, [activePageIndex])

  // ── Canvas size ──
  const handleCanvasSize = useCallback((preset: keyof typeof CANVAS_PRESETS, w?: number, h?: number) => {
    const canvas = fabricRef.current
    if (!canvas) return
    const size = preset === 'Custom' ? { w: w || customW, h: h || customH } : CANVAS_PRESETS[preset]
    setCanvasPreset(preset)
    if (preset === 'Custom' && w && h) { setCustomW(w); setCustomH(h) }
    canvas.setWidth(size.w)
    canvas.setHeight(size.h)
    canvas.renderAll()
    saveHistory()
  }, [customW, customH, saveHistory])

  // ── Zoom ──
  const handleZoomIn = useCallback(() => {
    const canvas = fabricRef.current
    if (!canvas) return
    let z = canvas.getZoom() * 1.15
    if (z > 20) z = 20
    const center = canvas.getCenter()
    canvas.zoomToPoint({ x: center.left, y: center.top }, z)
    setZoom(Math.round(z * 100))
  }, [])

  const handleZoomOut = useCallback(() => {
    const canvas = fabricRef.current
    if (!canvas) return
    let z = canvas.getZoom() * 0.85
    if (z < 0.05) z = 0.05
    const center = canvas.getCenter()
    canvas.zoomToPoint({ x: center.left, y: center.top }, z)
    setZoom(Math.round(z * 100))
  }, [])

  const handleFitToScreen = useCallback(() => {
    const canvas = fabricRef.current
    if (!canvas) return
    const vpt = canvas.viewportTransform
    if (!vpt) return
    vpt[0] = 1; vpt[1] = 0; vpt[2] = 0; vpt[3] = 1; vpt[4] = 0; vpt[5] = 0
    canvas.setViewportTransform(vpt)
    canvas.requestRenderAll()
    setZoom(100)
  }, [])

  // ── Alignment ──
  const alignObjects = useCallback((direction: string) => {
    const canvas = fabricRef.current
    if (!canvas) return
    const objects = canvas.getActiveObjects()
    if (objects.length < 2) return

    let bounds = objects[0].getBoundingRect()
    objects.forEach((obj: any) => {
      const r = obj.getBoundingRect()
      bounds = unionBounds(bounds, r)
    })

    switch (direction) {
      case 'left': objects.forEach((o: any) => o.set({ left: bounds.left })); break
      case 'center-h': objects.forEach((o: any) => o.set({ left: bounds.left + bounds.width / 2 - (o.width * (o.scaleX ?? 1)) / 2 })); break
      case 'right': objects.forEach((o: any) => o.set({ left: bounds.left + bounds.width - (o.width * (o.scaleX ?? 1)) })); break
      case 'top': objects.forEach((o: any) => o.set({ top: bounds.top })); break
      case 'center-v': objects.forEach((o: any) => o.set({ top: bounds.top + bounds.height / 2 - (o.height * (o.scaleY ?? 1)) / 2 })); break
      case 'bottom': objects.forEach((o: any) => o.set({ top: bounds.top + bounds.height - (o.height * (o.scaleY ?? 1)) })); break
      case 'distribute-h': {
        const sorted = [...objects].sort((a: any, b: any) => a.left - b.left)
        const totalW = sorted.reduce((s: number, o: any) => s + (o.width * (o.scaleX ?? 1)), 0)
        const gap = (bounds.width - totalW) / (sorted.length - 1 || 1)
        let x = bounds.left
        sorted.forEach((o: any) => { o.set({ left: x }); x += (o.width * (o.scaleX ?? 1)) + gap })
        break
      }
      case 'distribute-v': {
        const sorted = [...objects].sort((a: any, b: any) => a.top - b.top)
        const totalH = sorted.reduce((s: number, o: any) => s + (o.height * (o.scaleY ?? 1)), 0)
        const gap = (bounds.height - totalH) / (sorted.length - 1 || 1)
        let y = bounds.top
        sorted.forEach((o: any) => { o.set({ top: y }); y += (o.height * (o.scaleY ?? 1)) + gap })
        break
      }
    }
    canvas.renderAll()
    saveHistory()
    saveCurrentPageState()
  }, [saveHistory, saveCurrentPageState])

  function unionBounds(a: any, b: any) {
    const left = Math.min(a.left, b.left)
    const top = Math.min(a.top, b.top)
    const right = Math.max(a.left + a.width, b.left + b.width)
    const bottom = Math.max(a.top + a.height, b.top + b.height)
    return { left, top, width: right - left, height: bottom - top }
  }

  // ── Layer controls ──
  const bringForward = useCallback(() => {
    const canvas = fabricRef.current
    if (!canvas) return
    const obj = canvas.getActiveObject()
    if (!obj) return
    canvas.bringForward(obj)
    canvas.renderAll()
    saveHistory()
  }, [saveHistory])

  const bringToFront = useCallback(() => {
    const canvas = fabricRef.current
    if (!canvas) return
    const obj = canvas.getActiveObject()
    if (!obj) return
    canvas.bringToFront(obj)
    canvas.renderAll()
    saveHistory()
  }, [saveHistory])

  const sendBackward = useCallback(() => {
    const canvas = fabricRef.current
    if (!canvas) return
    const obj = canvas.getActiveObject()
    if (!obj) return
    canvas.sendBackwards(obj)
    canvas.renderAll()
    saveHistory()
  }, [saveHistory])

  const sendToBack = useCallback(() => {
    const canvas = fabricRef.current
    if (!canvas) return
    const obj = canvas.getActiveObject()
    if (!obj) return
    canvas.sendToBack(obj)
    canvas.renderAll()
    saveHistory()
  }, [saveHistory])

  // ── Properties change ──
  const handlePropertiesChange = useCallback((props: Record<string, unknown>) => {
    const canvas = fabricRef.current
    if (!canvas) return
    const obj = canvas.getActiveObject()
    if (!obj) return
    obj.set(props)
    canvas.renderAll()
    setSelectedObj(obj)
    saveHistory()
    saveCurrentPageState()
  }, [saveHistory, saveCurrentPageState])

  const handleTextChange = useCallback((text: string) => {
    const canvas = fabricRef.current
    if (!canvas) return
    const obj = canvas.getActiveObject()
    if (!obj) return
    if (obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox') {
      obj.set({ text })
      canvas.renderAll()
      setSelectedObj(obj)
      saveHistory()
      saveCurrentPageState()
    }
  }, [saveHistory, saveCurrentPageState])

  // ── Page management ──
  const addPage = useCallback(() => {
    saveCurrentPageState()
    const newPage: SitePlanPage = {
      name: `Page ${pages.length + 1}`,
      canvas_json: null, background_url: null, background_opacity: 1, order: pages.length,
    }
    const newPages = [...pages, newPage]
    setPages(newPages)
    const newIdx = newPages.length - 1
    setActivePageIndex(newIdx)
    const canvas = fabricRef.current
    if (canvas) {
      canvas.clear()
      canvas.setBackgroundImage(null, () => {})
      canvas.backgroundColor = '#e8ecf2'
      canvas.renderAll()
      setHasBackground(false)
      setBackgroundOpacity(1)
    }
    pageHistoriesRef.current.set(newIdx, { stack: [], idx: -1 })
    updateUndoRedoState()
    toast.success(`Added ${newPage.name}`)
  }, [pages, saveCurrentPageState, updateUndoRedoState])

  const deletePage = useCallback(async (pageIndex: number) => {
    if (pages.length <= 1) { toast.error('Cannot delete the only page'); return }
    const ok = await confirm({
      title: 'Delete Page', description: `Delete "${pages[pageIndex].name}"? This cannot be undone.`,
      confirmLabel: 'Delete', variant: 'destructive',
    })
    if (!ok) return

    saveCurrentPageState()
    const newPages = pages.filter((_, i) => i !== pageIndex).map((p, i) => ({ ...p, order: i }))
    setPages(newPages)

    const newHistories = new Map<number, { stack: any[]; idx: number }>()
    pageHistoriesRef.current.forEach((v, k) => {
      if (k > pageIndex) newHistories.set(k - 1, v)
      else if (k < pageIndex) newHistories.set(k, v)
    })
    pageHistoriesRef.current = newHistories

    const newIdx = Math.min(pageIndex, newPages.length - 1)
    const canvas = fabricRef.current
    if (canvas) await loadPage(newIdx, canvas)
    else setActivePageIndex(newIdx)
    toast.success('Page deleted')
  }, [pages, saveCurrentPageState, loadPage, confirm])

  const duplicatePage = useCallback(async (pageIndex: number) => {
    saveCurrentPageState()
    const source = pages[pageIndex]
    const newPage: SitePlanPage = {
      ...source, name: `${source.name} (copy)`, order: pages.length,
    }
    if (source.canvas_json) newPage.canvas_json = JSON.parse(JSON.stringify(source.canvas_json))
    const newPages = [...pages, newPage]
    setPages(newPages)
    const canvas = fabricRef.current
    if (canvas) await loadPage(newPages.length - 1, canvas)
    toast.success(`Duplicated as "${newPage.name}"`)
  }, [pages, saveCurrentPageState, loadPage])

  const handlePageClick = useCallback(async (pageIndex: number) => {
    if (pageIndex === activePageIndex) return
    saveCurrentPageState()
    const canvas = fabricRef.current
    if (canvas) await loadPage(pageIndex, canvas)
  }, [activePageIndex, saveCurrentPageState, loadPage])

  // ── Page drag-drop reorder ──
  const dragPageRef = useRef<number | null>(null)
  const handlePageDragStart = useCallback((e: React.DragEvent, idx: number) => {
    dragPageRef.current = idx
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(idx))
  }, [])

  const handlePageDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move' }, [])

  const handlePageDrop = useCallback((e: React.DragEvent, targetIdx: number) => {
    e.preventDefault()
    const sourceIdx = dragPageRef.current
    if (sourceIdx === null || sourceIdx === targetIdx) return
    saveCurrentPageState()
    const newPages = [...pages]
    const [moved] = newPages.splice(sourceIdx, 1)
    newPages.splice(targetIdx, 0, moved)
    newPages.forEach((p, i) => (p.order = i))
    setPages(newPages)
    if (sourceIdx === activePageIndex) setActivePageIndex(targetIdx)
    else if (targetIdx <= activePageIndex && sourceIdx > activePageIndex) setActivePageIndex(activePageIndex + 1)
    else if (targetIdx >= activePageIndex && sourceIdx < activePageIndex) setActivePageIndex(activePageIndex - 1)
    const newHistories = new Map<number, { stack: any[]; idx: number }>()
    pageHistoriesRef.current.forEach((v, k) => {
      if (k === sourceIdx) newHistories.set(targetIdx, v)
      else if (sourceIdx < targetIdx && k > sourceIdx && k <= targetIdx) newHistories.set(k - 1, v)
      else if (sourceIdx > targetIdx && k < sourceIdx && k >= targetIdx) newHistories.set(k + 1, v)
      else newHistories.set(k, v)
    })
    pageHistoriesRef.current = newHistories
    dragPageRef.current = null
  }, [pages, activePageIndex, saveCurrentPageState])

  // ── Context menu ──
  const handlePageContextMenu = useCallback((e: React.MouseEvent, pageIndex: number) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY, pageIndex })
  }, [])

  useEffect(() => { const close = () => setContextMenu(null); window.addEventListener('click', close); return () => window.removeEventListener('click', close) }, [])

  // ── Clear ──
  const handleClear = useCallback(async () => {
    const canvas = fabricRef.current
    if (!canvas) return
    const ok = await confirm({
      title: 'Clear Annotations', description: 'Clear all annotations? Background will be kept.',
      confirmLabel: 'Clear', variant: 'destructive',
    })
    if (!ok) return
    const bg = canvas.backgroundImage
    canvas.clear()
    if (bg) canvas.setBackgroundImage(bg, canvas.renderAll.bind(canvas), { opacity: backgroundOpacity })
    else canvas.backgroundColor = '#e8ecf2'
    canvas.renderAll()
    saveHistory()
    saveCurrentPageState()
  }, [saveHistory, saveCurrentPageState, confirm, backgroundOpacity])

  // ── Export PNG ──
  const handleExportPNG = useCallback(() => {
    const canvas = fabricRef.current
    if (!canvas) return
    const dataUrl = canvas.toDataURL({ format: 'png', quality: 1, multiplier: 2 })
    const link = document.createElement('a')
    link.download = `${pages[activePageIndex]?.name || 'page'}-${activePageIndex + 1}.png`
    link.href = dataUrl
    link.click()
    toast.success('Page exported as PNG')
  }, [activePageIndex, pages])

  // ── Export SVG ──
  const handleExportSVG = useCallback(() => {
    const canvas = fabricRef.current
    if (!canvas) return
    const svg = canvas.toSVG()
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = `${pages[activePageIndex]?.name || 'page'}-${activePageIndex + 1}.svg`
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Page exported as SVG')
  }, [activePageIndex, pages])

  // ── Export multi-page PDF ──
  const handleExportPDF = useCallback(async () => {
    const canvas = fabricRef.current
    const fabric = fabricLibRef.current
    if (!canvas || !fabric) return

    toast.loading('Generating PDF...', { id: 'pdf-export' })
    try {
      const { default: jsPDF } = await import('jspdf')
      saveCurrentPageState()

      const allPages = [...pages]
      allPages[activePageIndex] = {
        ...allPages[activePageIndex],
        canvas_json: canvas.toJSON(['deviceType', 'deviceName']),
      }

      const w = canvas.width || 900
      const h = canvas.height || 600
      const finalPdf = new jsPDF({ orientation: w > h ? 'landscape' : 'portrait', unit: 'px', format: [w, h] })

      for (let i = 0; i < allPages.length; i++) {
        const page = allPages[i]
        let pageUrl: string

        if (i === activePageIndex) {
          pageUrl = canvas.toDataURL({ format: 'png', quality: 1, multiplier: 1 })
        } else if (page.canvas_json) {
          const offscreen = document.createElement('canvas')
          offscreen.width = w; offscreen.height = h
          const tmpCanvas = new fabric.StaticCanvas(offscreen)
          await new Promise<void>(async (resolve) => {
            tmpCanvas.loadFromJSON(page.canvas_json, async () => {
              if (page.background_url) {
                let displayBg = page.background_url
                if (!page.background_url.startsWith('data:') && !page.background_url.startsWith('blob:') && !page.background_url.startsWith('http')) {
                  try {
                    displayBg = await resolveStorageUrl(PRIVATE_STORAGE_BUCKETS.SITE_PLANS, page.background_url)
                  } catch (e) {
                    console.error('Error resolving background URL for PDF:', e)
                  }
                }
                tmpCanvas.setBackgroundImage(displayBg, () => {}, { opacity: page.background_opacity ?? 1 })
              }
              tmpCanvas.renderAll()
              resolve()
            })
          })
          pageUrl = tmpCanvas.toDataURL({ format: 'png', quality: 1, multiplier: 1 })
          tmpCanvas.dispose()
        } else {
          const emptyCanvas = document.createElement('canvas')
          emptyCanvas.width = w; emptyCanvas.height = h
          const ctx = emptyCanvas.getContext('2d')
          if (ctx) { ctx.fillStyle = '#e8ecf2'; ctx.fillRect(0, 0, w, h) }
          pageUrl = emptyCanvas.toDataURL('image/png')
        }

        if (i > 0) finalPdf.addPage([w, h])
        finalPdf.addImage(pageUrl, 'PNG', 0, 0, w, h)
      }

      finalPdf.save(`${quotationId}-site-plan.pdf`)
      toast.success(`${allPages.length} pages exported as PDF`, { id: 'pdf-export' })
    } catch (error: any) {
      console.error('PDF export error:', error)
      toast.error(`PDF export failed: ${error.message}`, { id: 'pdf-export' })
    }
  }, [pages, quotationId, activePageIndex, saveCurrentPageState])

  // ── Save to Supabase ──
  const handleSave = useCallback(async () => {
    const canvas = fabricRef.current
    if (!canvas) return

    setSaving(true)
    const toastId = toast.loading('Saving site plan...')

    try {
      saveCurrentPageState()

      const currentPages = [...pages]
      currentPages[activePageIndex] = {
        ...currentPages[activePageIndex],
        canvas_json: canvas.toJSON(['deviceType', 'deviceName']),
        background_url: currentPages[activePageIndex].background_url,
      }

      const multiPageData: MultiPageData = {
        pages: currentPages,
        canvasWidth: canvas.width || 900,
        canvasHeight: canvas.height || 600,
      }

      const dataUrl = canvas.toDataURL({ format: 'png', quality: 1, multiplier: 2 })
      const res = await fetch(dataUrl)
      const blob = await res.blob()
      const flatFilename = `${quotationId}/flattened-${Date.now()}.png`
      const flattenedUrl = await uploadPrivateFile(PRIVATE_STORAGE_BUCKETS.SITE_PLANS, flatFilename, blob)

      let bgUrl = currentPages[activePageIndex].background_url
      if (bgUrl && (bgUrl.startsWith('blob:') || bgUrl.startsWith('data:'))) {
        try {
          const bgRes = await fetch(bgUrl)
          const bgBlob = await bgRes.blob()
          const bgFilename = `${quotationId}/bg-${Date.now()}.png`
          bgUrl = await uploadPrivateFile(PRIVATE_STORAGE_BUCKETS.SITE_PLANS, bgFilename, bgBlob)
          currentPages[activePageIndex] = { ...currentPages[activePageIndex], background_url: bgUrl }
        } catch { /* keep */ }
      }

      if (existingPlan?.id) {
        const { error } = await supabase.from('site_plans').update({
          canvas_json: { pages: currentPages, canvasWidth: multiPageData.canvasWidth, canvasHeight: multiPageData.canvasHeight },
          flattened_url: flattenedUrl,
          background_url: bgUrl,
          updated_at: new Date().toISOString(),
        }).eq('id', existingPlan.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('site_plans').insert([{
          quotation_id: quotationId,
          canvas_json: { pages: currentPages, canvasWidth: multiPageData.canvasWidth, canvasHeight: multiPageData.canvasHeight },
          flattened_url: flattenedUrl,
          background_url: bgUrl,
        }])
        if (error) throw error
      }

      toast.success('Site plan saved!', { id: toastId })
      onSave?.(flattenedUrl)
    } catch (error: any) {
      console.error('Error saving site plan:', error)
      toast.error(`Failed to save: ${error.message}`, { id: toastId })
    } finally {
      setSaving(false)
    }
  }, [quotationId, existingPlan, onSave, pages, activePageIndex, saveCurrentPageState])

  // ── Keyboard shortcuts ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const canvas = fabricRef.current
      if (!canvas) return

      const active = canvas.getActiveObject()
      if (active?.isEditing) return

      if (e.code === 'Space' && !e.repeat) {
        spaceHeldRef.current = true
        if (activeTool === 'select') { canvas.defaultCursor = 'grab'; canvas.hoverCursor = 'grab' }
        e.preventDefault()
        return
      }

      if (e.ctrlKey && e.key === '0') { e.preventDefault(); handleFitToScreen(); return }
      if (e.ctrlKey && e.key === 'z' && !e.shiftKey) { e.preventDefault(); handleUndo(); return }
      if ((e.ctrlKey && e.key === 'z' && e.shiftKey) || (e.ctrlKey && e.key === 'y')) { e.preventDefault(); handleRedo(); return }
      if (e.ctrlKey && e.key === 'c' && !e.shiftKey) { e.preventDefault(); handleCopy(); return }
      if (e.ctrlKey && e.key === 'v') { e.preventDefault(); handlePaste(); return }
      if (e.ctrlKey && e.key === 'x') { e.preventDefault(); handleCut(); return }
      if (e.ctrlKey && e.key === 'a') { e.preventDefault(); handleSelectAll(); return }

      if (e.key === 'Delete' || e.key === 'Backspace') { handleDelete(); return }

      if (e.key === 'Escape') {
        canvas.discardActiveObject()
        canvas.renderAll()
        setSelectedObj(null)
        spaceHeldRef.current = false
        panRef.current = false
        setActiveTool('select')
        return
      }

      if (e.key === '=' || e.key === '+') { e.preventDefault(); handleZoomIn(); return }
      if (e.key === '-') { e.preventDefault(); handleZoomOut(); return }

      if (e.ctrlKey && e.key === ']' && e.shiftKey) { e.preventDefault(); bringToFront(); return }
      if (e.ctrlKey && e.key === ']') { e.preventDefault(); bringForward(); return }
      if (e.ctrlKey && e.key === '[' && e.shiftKey) { e.preventDefault(); sendToBack(); return }
      if (e.ctrlKey && e.key === '[') { e.preventDefault(); sendBackward(); return }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        spaceHeldRef.current = false
        panRef.current = false
        panStartRef.current = null
        const canvas = fabricRef.current
        if (canvas) { canvas.defaultCursor = 'default'; canvas.hoverCursor = 'move'; canvas.selection = true }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => { window.removeEventListener('keydown', handleKeyDown); window.removeEventListener('keyup', handleKeyUp) }
  }, [handleUndo, handleRedo, handleCopy, handlePaste, handleCut, handleSelectAll, handleDelete,
    handleFitToScreen, handleZoomIn, handleZoomOut, bringForward, bringToFront, sendBackward, sendToBack, activeTool])

  // ── Drag-drop ──
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation()
    const files = e.dataTransfer?.files
    if (files?.[0]?.type.startsWith('image/')) handleBackgroundUpload(files[0])
  }, [handleBackgroundUpload])

  const handleDragOverCapture = useCallback((e: React.DragEvent) => { e.preventDefault(); e.stopPropagation() }, [])

  // ── Layer list ──
  interface LayerItem { key: number; obj: any; name: string; visible: boolean; displayIndex: number }
  const layerList: LayerItem[] = useMemo(() => {
    const canvas = fabricRef.current
    if (!canvas) return []
    const objects = canvas.getObjects().filter((o: any) => o.type !== 'guide-line' && !o.excludeFromExport)
    const items: LayerItem[] = []
    for (let i = objects.length - 1; i >= 0; i--) {
      const obj = objects[i]
      items.push({
        key: i,
        obj,
        name: getObjLabel(obj),
        visible: obj.visible !== false,
        displayIndex: objects.length - 1 - i,
      })
    }
    return items
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedObj, activePageIndex, canvasReady])

  function getObjLabel(obj: any): string {
    if (obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox') return `Text: "${(obj.text || '').substring(0, 16)}"`
    if (obj.type === 'group') return `Group (${obj._objects?.length || 0})`
    if (obj.type === 'image') return 'Image'
    const map: Record<string, string> = { rect: 'Rectangle', circle: 'Circle', ellipse: 'Ellipse', triangle: 'Triangle', line: 'Line', path: 'Path' }
    return map[obj.type] || obj.type || 'Object'
  }

  const getCanvasObjects = () => {
    const canvas = fabricRef.current
    if (!canvas) return []
    return canvas.getObjects().filter((o: any) => o.type !== 'guide-line')
  }

  const deviceCounts = useMemo(() => {
    const canvas = fabricRef.current
    if (!canvas || !canvasReady) return {}
    const objects = canvas.getObjects()
    const counts: Record<string, number> = {}
    objects.forEach((obj: any) => {
      if (obj.deviceType) {
        counts[obj.deviceType] = (counts[obj.deviceType] || 0) + 1
      }
    })
    return counts
  }, [selectedObj, activePageIndex, canvasReady, pages])

  // ── Render ──
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-brand-navy text-white">
      {/* ─── Top Toolbar ─── */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-brand-navy border-b border-brand-steel/20">
        <div className="flex items-center gap-1 flex-wrap">
          <ToolButton active={activeTool === 'select'} onClick={() => setActiveTool('select')}
            icon={<MousePointer2 className="h-4 w-4" />} label="Select" title="Select (V)" />
          <ToolButton active={activeTool === 'draw'} onClick={() => setActiveTool('draw')}
            icon={<Pencil className="h-4 w-4" />} label="Draw" title="Freehand" />

          <div className="w-px h-6 bg-brand-steel/40 mx-1" />

          <ToolButton active={activeTool === 'rect'} onClick={() => setActiveTool('rect')}
            icon={<Square className="h-4 w-4" />} label="Rect" title="Rectangle" />
          <ToolButton active={activeTool === 'circle'} onClick={() => setActiveTool('circle')}
            icon={<Circle className="h-4 w-4" />} label="Circle" title="Ellipse" />
          <ToolButton active={activeTool === 'triangle'} onClick={() => setActiveTool('triangle')}
            icon={<Triangle className="h-4 w-4" />} label="Tri" title="Triangle" />
          <ToolButton active={activeTool === 'line'} onClick={() => setActiveTool('line')}
            icon={<Minus className="h-4 w-4 rotate-45" />} label="Line" title="Line" />

          <div className="w-px h-6 bg-brand-steel/40 mx-1" />

          <ToolButton active={activeTool === 'text'} onClick={() => setActiveTool('text')}
            icon={<Type className="h-4 w-4" />} label="Text" title="Text" />
          <ToolButton active={activeTool === 'icon'} onClick={() => setActiveTool('icon')}
            icon={<Upload className="h-4 w-4" />} label="Icon" title="Security Icon" />

          {(activeTool === 'rect' || activeTool === 'circle' || activeTool === 'triangle' || activeTool === 'line') && (
            <>
              <div className="w-px h-6 bg-brand-steel/40 mx-1" />
              <div className="flex items-center gap-1.5">
                <Label className="text-[10px] text-brand-slate">Fill</Label>
                <input type="color" value={fillColor} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFillColor(e.target.value)}
                  className="w-5 h-5 rounded cursor-pointer bg-transparent border-0" />
                <Label className="text-[10px] text-brand-slate ml-1">Stroke</Label>
                <input type="color" value={strokeColor} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStrokeColor(e.target.value)}
                  className="w-5 h-5 rounded cursor-pointer bg-transparent border-0" />
                <Input type="range" min="0" max="10" value={strokeWidth}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStrokeWidth(parseInt(e.target.value))}
                  className="w-16 h-5" title={`Stroke: ${strokeWidth}px`} />
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-1">
          <IconButton onClick={handleUndo} icon={<Undo2 className="h-4 w-4" />} label="Undo (Ctrl+Z)" disabled={!canUndo} />
          <IconButton onClick={handleRedo} icon={<Redo2 className="h-4 w-4" />} label="Redo (Ctrl+Y)" disabled={!canRedo} />

          <div className="w-px h-5 bg-brand-steel/40 mx-1" />

          <IconButton onClick={handleZoomOut} icon={<ZoomOut className="h-4 w-4" />} label="Zoom Out (-)" />
          <span className="text-xs text-brand-electric font-mono min-w-[3em] text-center">{zoom}%</span>
          <IconButton onClick={handleZoomIn} icon={<ZoomIn className="h-4 w-4" />} label="Zoom In (+)" />
          <IconButton onClick={handleFitToScreen} icon={<Maximize className="h-4 w-4" />} label="Fit to Screen (Ctrl+0)" />

          <div className="w-px h-5 bg-brand-steel/40 mx-1" />

          <IconButton onClick={() => setShowGrid(!showGrid)} icon={<Grid3X3 className="h-4 w-4" />} label="Toggle Grid" active={showGrid} />
          <IconButton onClick={() => setSnapToGrid(!snapToGrid)} icon={<Magnet className="h-4 w-4" />} label="Snap to Grid" active={snapToGrid} />

          <div className="w-px h-5 bg-brand-steel/40 mx-1" />

          <IconButton onClick={() => alignObjects('left')} icon={<AlignStartVertical className="h-4 w-4 rotate-90" />} label="Align Left" />
          <IconButton onClick={() => alignObjects('center-h')} icon={<AlignCenterVertical className="h-4 w-4" />} label="Center H" />
          <IconButton onClick={() => alignObjects('right')} icon={<AlignEndVertical className="h-4 w-4 rotate-90" />} label="Align Right" />

          <div className="w-px h-5 bg-brand-steel/40 mx-0.5" />

          <IconButton onClick={() => alignObjects('top')} icon={<AlignStartHorizontal className="h-4 w-4 rotate-90" />} label="Align Top" />
          <IconButton onClick={() => alignObjects('center-v')} icon={<AlignCenterHorizontal className="h-4 w-4" />} label="Center V" />
          <IconButton onClick={() => alignObjects('bottom')} icon={<AlignEndHorizontal className="h-4 w-4 rotate-90" />} label="Align Bottom" />

          <div className="w-px h-5 bg-brand-steel/40 mx-0.5" />

          <IconButton onClick={() => alignObjects('distribute-h')} icon={<ArrowLeftToLine className="h-4 w-4" />} label="Distribute H" />
          <IconButton onClick={() => alignObjects('distribute-v')} icon={<ArrowUpToLine className="h-4 w-4" />} label="Distribute V" />

          <div className="w-px h-5 bg-brand-steel/40 mx-1" />

          <IconButton onClick={bringToFront} icon={<ArrowBigUp className="h-4 w-4" />} label="To Front (Ctrl+Shift+])" />
          <IconButton onClick={bringForward} icon={<ChevronUp className="h-4 w-4" />} label="Forward (Ctrl+])" />
          <IconButton onClick={sendBackward} icon={<ChevronDown className="h-4 w-4" />} label="Backward (Ctrl+[)" />
          <IconButton onClick={sendToBack} icon={<ArrowBigDown className="h-4 w-4" />} label="To Back (Ctrl+Shift+[)" />
        </div>

        <div className="flex items-center gap-1">
          <IconButton onClick={handleExportPNG} icon={<FileImage className="h-4 w-4" />} label="Export PNG" />
          <IconButton onClick={handleExportSVG} icon={<FileType className="h-4 w-4" />} label="Export SVG" />
          <IconButton onClick={handleExportPDF} icon={<Download className="h-4 w-4" />} label="Export PDF (All Pages)" />

          <div className="w-px h-5 bg-brand-steel/40 mx-1" />

          <IconButton onClick={() => setShowShortcuts(true)} icon={<HelpCircle className="h-4 w-4" />} label="Shortcuts" />

          <Button variant="ghost" size="sm" onClick={handleClear} className="text-white hover:bg-white/10">
            <RotateCcw className="h-4 w-4 mr-1" /> Clear
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDelete} className="text-white hover:bg-white/10">
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>

          <div className="w-px h-6 bg-brand-steel/40 mx-1" />

          <Button size="sm" onClick={handleSave} disabled={saving} className="bg-brand-electric hover:bg-brand-electric text-brand-navy font-semibold">
            {saving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Save className="h-4 w-4 mr-1" />}
            Save
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/10">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* ─── Main Area ─── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Page Thumbnails */}
        <div className="w-40 min-w-[10rem] bg-brand-navy border-r border-brand-steel/20 flex flex-col overflow-hidden">
          <div className="px-2 py-2 border-b border-brand-steel/20">
            <span className="text-xs text-brand-slate uppercase tracking-wider font-semibold">Pages</span>
            <span className="text-xs text-brand-electric ml-2">{activePageIndex + 1} of {pages.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto p-1.5 space-y-1.5">
            {pages.map((page, idx) => (
              <div key={idx}
                className={`relative group rounded border transition-colors cursor-pointer
                  ${idx === activePageIndex ? 'border-brand-electric bg-brand-electric/10' : 'border-brand-steel/30 hover:border-brand-steel/60'}`}
                onClick={() => handlePageClick(idx)}
                onContextMenu={(e) => handlePageContextMenu(e, idx)}
                draggable
                onDragStart={(e) => handlePageDragStart(e, idx)}
                onDragOver={handlePageDragOver}
                onDrop={(e) => handlePageDrop(e, idx)}
              >
                <div className="aspect-[4/3] bg-brand-navy/60 flex items-center justify-center overflow-hidden">
                  {thumbnails.has(idx) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumbnails.get(idx)} alt={page.name} className="w-full h-full object-contain" />
                  ) : (
                    <div className="text-brand-slate/70 text-[10px] text-center px-1">
                      {page.background_url ? 'Preview' : 'Empty'}
                    </div>
                  )}
                </div>
                <div className="px-1.5 py-0.5 flex items-center justify-between">
                  <span className="text-[11px] text-white truncate">{page.name}</span>
                  <div className="opacity-0 group-hover:opacity-100 flex gap-0.5 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); duplicatePage(idx) }}
                      className="text-brand-slate hover:text-brand-electric p-0.5" title="Duplicate">
                      <Copy className="h-3 w-3" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); deletePage(idx) }}
                      className="text-brand-slate hover:text-red-400 p-0.5" title="Delete">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-1.5 border-t border-brand-steel/20">
            <Button variant="outline" size="sm" className="w-full text-white border-brand-steel/40 hover:bg-brand-navy/60 text-xs" onClick={addPage}>
              <Plus className="h-3.5 w-3.5 mr-1" /> Add Page
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center bg-[#1a2744] overflow-hidden relative"
          onDrop={handleDrop} onDragOver={handleDragOverCapture}>
          <div className="relative shadow-2xl rounded-lg overflow-hidden border border-brand-steel/40">
            <canvas ref={canvasRef} />
            {!hasBackground && canvasReady && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-[#e8ecf2]">
                <Upload className="h-10 w-10 text-brand-slate/80 mb-3" />
                <p className="text-sm text-brand-slate font-medium">Drop a floor plan image here</p>
                <p className="text-xs text-brand-slate/70 mt-1">or use the Upload button in the sidebar</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-60 min-w-[15rem] bg-brand-navy border-l border-brand-steel/20 flex flex-col overflow-hidden">
          <div className="flex border-b border-brand-steel/20">
            <button onClick={() => setRightPanelTab('devices')}
              className={`flex-1 py-1.5 text-xs font-medium ${rightPanelTab === 'devices' ? 'text-brand-electric border-b-2 border-brand-electric' : 'text-brand-slate'}`}>
              Devices
            </button>
            <button onClick={() => setRightPanelTab('properties')}
              className={`flex-1 py-1.5 text-xs font-medium ${rightPanelTab === 'properties' ? 'text-brand-electric border-b-2 border-brand-electric' : 'text-brand-slate'}`}>
              Properties
            </button>
            <button onClick={() => setRightPanelTab('layers')}
              className={`flex-1 py-1.5 text-xs font-medium ${rightPanelTab === 'layers' ? 'text-brand-electric border-b-2 border-brand-electric' : 'text-brand-slate'}`}>
              Layers
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {rightPanelTab === 'devices' && (
              <div className="p-3 space-y-4">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-electric mb-2">
                    Security Devices
                  </h3>
                  <p className="text-[10px] text-brand-slate leading-relaxed">
                    Select a device, then click on the canvas to place it.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {SECURITY_DEVICES.map((device) => {
                    const count = deviceCounts[device.id] || 0
                    const isSelected = selectedIcon?.id === device.id && activeTool === 'icon'
                    return (
                      <button
                        key={device.id}
                        onClick={() => {
                          setSelectedIcon(device)
                          setActiveTool('icon')
                        }}
                        className={`p-2 rounded-xl border flex flex-col items-center text-center transition-all relative group
                          ${isSelected
                            ? 'border-brand-electric bg-brand-electric/10 text-white shadow-lg'
                            : 'border-brand-steel/30 hover:border-brand-steel/60 text-brand-slate hover:text-white bg-brand-navy/40'
                          }`}
                      >
                        <div className="w-10 h-10 mb-1 flex items-center justify-center bg-white/5 rounded-lg p-1 group-hover:scale-105 transition-transform">
                          <img src={device.svg} alt={device.name} className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[10px] font-medium leading-tight truncate w-full">{device.name}</span>
                        
                        {count > 0 && (
                          <Badge className="absolute -top-1.5 -right-1.5 h-4 min-w-[1rem] px-1 bg-brand-electric text-brand-navy font-bold text-[9px] flex items-center justify-center rounded-full">
                            {count}
                          </Badge>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Legend summary */}
                <div className="border-t border-brand-steel/20 pt-3">
                  <h4 className="text-[10px] font-semibold uppercase tracking-wider text-brand-slate mb-2">
                    Active Legend
                  </h4>
                  <div className="space-y-1 bg-brand-navy/30 rounded-lg p-2 border border-brand-steel/10">
                    {SECURITY_DEVICES.map((device) => {
                      const count = deviceCounts[device.id] || 0
                      if (count === 0) return null
                      return (
                        <div key={device.id} className="flex justify-between items-center text-xs">
                          <span className="text-brand-slate flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: device.id.includes('camera') ? '#2563eb' : device.id.includes('motion') ? '#ef4444' : '#f97316' }} />
                            {device.name}
                          </span>
                          <span className="font-bold text-brand-electric">{count}</span>
                        </div>
                      )
                    })}
                    {Object.values(deviceCounts).reduce((a, b) => a + b, 0) === 0 && (
                      <p className="text-[10px] text-brand-slate italic text-center">No devices placed yet</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {rightPanelTab === 'properties' && (
              <PropertiesPanel selectedObject={selectedObj} onChange={handlePropertiesChange} onTextChange={handleTextChange} />
            )}

            {rightPanelTab === 'layers' && (
              <div className="p-3 space-y-1">
                {layerList.length === 0 ? (
                  <p className="text-brand-slate text-xs text-center py-4">No objects on this page</p>
                ) : (
                  layerList.map((layer) => (
                    <div key={layer.key}
                      className={`flex items-center gap-2 px-2 py-1 rounded text-xs cursor-pointer group
                        ${selectedObj === layer.obj ? 'bg-brand-electric/10 text-white' : 'text-brand-slate hover:bg-white/5'}`}
                      onClick={() => {
                        const c = fabricRef.current
                        if (c) { c.setActiveObject(layer.obj); c.renderAll(); setSelectedObj(layer.obj) }
                      }}
                      onDoubleClick={() => { layer.obj.set('visible', !layer.visible); fabricRef.current?.renderAll(); saveHistory(); saveCurrentPageState() }}
                    >
                      <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        {layer.visible ? <Eye className="h-3 w-3 text-brand-slate shrink-0" /> : <EyeOff className="h-3 w-3 text-red-400 shrink-0" />}
                        <span className="truncate flex-1">{layer.name}</span>
                      </div>
                      <div className="flex gap-0.5 opacity-0 group-hover:opacity-100">
                        {layer.displayIndex > 0 && (
                          <button onClick={(e) => { e.stopPropagation(); bringForward() }} className="p-0.5 hover:text-brand-electric" title="Forward">
                            <ChevronUp className="h-3 w-3" />
                          </button>
                        )}
                        {layer.displayIndex < layerList.length - 1 && (
                          <button onClick={(e) => { e.stopPropagation(); sendBackward() }} className="p-0.5 hover:text-brand-electric" title="Backward">
                            <ChevronDown className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Background controls */}
          <div className="border-t border-brand-steel/20 p-3 space-y-2">
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-brand-slate">Background</h3>
            <div className="flex flex-wrap gap-1">
              {(Object.keys(CANVAS_PRESETS) as Array<keyof typeof CANVAS_PRESETS>).map(p => (
                <button key={p} onClick={() => handleCanvasSize(p)}
                  className={`text-[10px] px-2 py-1 rounded border transition-colors
                    ${canvasPreset === p ? 'border-brand-electric text-brand-electric bg-brand-electric/10' : 'border-brand-steel/40 text-brand-slate hover:border-brand-steel/60 hover:text-white'}`}>
                  {p}
                </button>
              ))}
            </div>
            {canvasPreset === 'Custom' && (
              <div className="flex gap-2">
                <Input type="number" value={customW} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { const v = parseInt(e.target.value) || 600; setCustomW(v); handleCanvasSize('Custom', v, customH) }}
                  className="h-6 text-[10px] bg-brand-navy border-brand-steel/40 text-white w-16" placeholder="W" />
                <Input type="number" value={customH} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { const v = parseInt(e.target.value) || 400; setCustomH(v); handleCanvasSize('Custom', customW, v) }}
                  className="h-6 text-[10px] bg-brand-navy border-brand-steel/40 text-white w-16" placeholder="H" />
              </div>
            )}
            <div className="flex gap-1">
              <Button variant="outline" size="sm" className="flex-1 text-white border-brand-steel/40 text-xs"
                onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-3.5 w-3.5 mr-1" /> Upload
              </Button>
              {hasBackground && (
                <Button variant="outline" size="sm" className="text-red-400 border-brand-steel/40 text-xs"
                  onClick={handleRemoveBackground}>Remove</Button>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => { if (e.target.files?.[0]) handleBackgroundUpload(e.target.files[0]) }} />
            {hasBackground && (
              <div>
                <Label className="text-[10px] text-brand-slate">Opacity: {Math.round(backgroundOpacity * 100)}%</Label>
                <Input type="range" min="0" max="100" value={Math.round(backgroundOpacity * 100)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBackgroundOpacityChange(parseInt(e.target.value) / 100)}
                  className="h-5 w-full" />
              </div>
            )}

            {/* Color picker for drawing */}
            <div className="pt-1">
              <Label className="text-[10px] text-brand-slate mb-1 block">Draw Colors</Label>
              <div className="flex flex-wrap gap-1">
                {COLORS.map(c => (
                  <button key={c}
                    onClick={() => setDrawColor(c)}
                    className={`w-5 h-5 rounded-full border transition-all
                      ${drawColor === c ? 'border-white scale-110 ring-2 ring-brand-electric' : 'border-brand-steel/40 hover:scale-105'}`}
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Status Bar ─── */}
      <div className="px-4 py-1 bg-brand-navy border-t border-brand-steel/20 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px] text-brand-electric border-brand-steel/40">
            {activeTool.toUpperCase()}
          </Badge>
          <span className="text-brand-slate">{statusText}</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-brand-slate">
          <span>Page {activePageIndex + 1} of {pages.length}</span>
          <span>|</span>
          <span>Zoom: {zoom}%</span>
          <span>|</span>
          <span>{getCanvasObjects().length} objects</span>
          <span>|</span>
          <span>Grid: {gridSize}px{snapToGrid ? ' (snap)' : ''}</span>
        </div>
      </div>

      {/* ─── Context Menu ─── */}
      {contextMenu && (
        <div className="fixed z-[70] bg-[#112240] border border-brand-steel/40 rounded-lg shadow-xl py-1 min-w-[140px]"
          style={{ left: contextMenu.x, top: contextMenu.y }}>
          <button className="w-full text-left px-3 py-1.5 text-sm text-white hover:bg-white/10 flex items-center gap-2"
            onClick={() => { duplicatePage(contextMenu.pageIndex); setContextMenu(null) }}>
            <Copy className="h-3.5 w-3.5" /> Duplicate Page
          </button>
          <button className="w-full text-left px-3 py-1.5 text-sm text-red-400 hover:bg-white/10 flex items-center gap-2"
            onClick={() => { deletePage(contextMenu.pageIndex); setContextMenu(null) }}>
            <Trash2 className="h-3.5 w-3.5" /> Delete Page
          </button>
        </div>
      )}

      {/* ─── Shortcuts Modal ─── */}
      <ShortcutsModal open={showShortcuts} onClose={() => setShowShortcuts(false)} />
      <ConfirmDialog />
    </div>
  )
}
