/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/refs */
'use client'

import { useRef, useEffect, useState } from 'react'

interface RichTextEditorProps {
  isOpen: boolean
  onClose: () => void
  content: string
  setContent: (content: string) => void
}

export default function RichTextEditor({ isOpen, onClose, content, setContent }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  
  const [openMenu, setOpenMenu] = useState<'block' | 'size' | 'color' | null>(null)
  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null)
  
  const [imgState, setImgState] = useState<{ 
    target: HTMLDivElement | null; 
    rotation: number;
  }>({ target: null, rotation: 0 })

  useEffect(() => {
    if (isOpen && editorRef.current) {
      editorRef.current.innerHTML = content
      editorRef.current.querySelectorAll('.free-img-wrapper').forEach(el => {
        const wrapper = el as HTMLDivElement
        const matrix = new DOMMatrixReadOnly(window.getComputedStyle(wrapper).transform)
        const rot = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI)
        attachDragHandlers(wrapper, rot)
      })
    }
  }, [isOpen, content])

  useEffect(() => {
    const handleClick = () => {
      setOpenMenu(null)
      setMenuPos(null)
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (imgState.target && (e.key === 'Delete' || e.key === 'Backspace')) {
        e.preventDefault()
        imgState.target.remove()
        setImgState({ target: null, rotation: 0 })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [imgState.target])

  const exec = (cmd: string, value?: string) => {
    document.execCommand(cmd, false, value)
    editorRef.current?.focus()
    setOpenMenu(null)
  }

  const toggleMenu = (e: React.MouseEvent, menu: 'block' | 'size' | 'color') => {
    e.stopPropagation()
    if (openMenu === menu) {
      setOpenMenu(null)
      return
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setMenuPos({ x: rect.right + 10, y: rect.top })
    setOpenMenu(menu)
  }

  const insertImageAtPosition = (src: string) => {
    if (!editorRef.current) return
    const wrapper = document.createElement('div')
    wrapper.className = 'free-img-wrapper'
    wrapper.style.position = 'absolute'
    wrapper.style.top = '150px'
    wrapper.style.left = '150px'
    wrapper.style.width = '300px'
    wrapper.style.height = 'auto'
    wrapper.style.zIndex = '10'
    wrapper.style.cursor = 'move'
    
    const img = document.createElement('img')
    img.src = src
    img.style.width = '100%'
    img.style.height = '100%'
    img.style.display = 'block'
    img.style.borderRadius = '12px'
    img.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)'
    
    wrapper.appendChild(img)
    editorRef.current.appendChild(wrapper)
    attachDragHandlers(wrapper, 0)
    setImgState({ target: wrapper, rotation: 0 })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => insertImageAtPosition(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.includes('image')) {
      const reader = new FileReader()
      reader.onloadend = () => insertImageAtPosition(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const attachDragHandlers = (wrapper: HTMLDivElement, initialRotation: number) => {
    wrapper.onmousedown = (e) => {
      e.preventDefault()
      e.stopPropagation()
      
      setImgState({ target: wrapper, rotation: initialRotation })

      const startX = e.clientX
      const startY = e.clientY
      const startLeft = parseInt(wrapper.style.left || '0')
      const startTop = parseInt(wrapper.style.top || '0')

      const doDrag = (ev: MouseEvent) => {
        ev.preventDefault()
        wrapper.style.left = `${startLeft + ev.clientX - startX}px`
        wrapper.style.top = `${startTop + ev.clientY - startY}px`
        setImgState(prev => prev.target ? { ...prev } : prev)
      }
      
      const stopDrag = () => {
        document.removeEventListener('mousemove', doDrag)
        document.removeEventListener('mouseup', stopDrag)
      }
      
      document.addEventListener('mousemove', doDrag)
      document.addEventListener('mouseup', stopDrag)
    }
  }

  const handleEditorClick = (e: React.MouseEvent) => {
    if (e.target === editorRef.current) {
      setImgState({ target: null, rotation: 0 })
    }
  }

  const startResize = (e: React.MouseEvent, corner: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (!imgState.target) return

    const wrapper = imgState.target
    const img = wrapper.querySelector('img')
    if(!img) return

    const startX = e.clientX
    const startY = e.clientY
    const startWidth = wrapper.offsetWidth
    const startHeight = img.offsetHeight
    const ratio = startWidth / startHeight
    
    const rad = imgState.rotation * Math.PI / 180
    const cos = Math.cos(rad)
    const sin = Math.sin(rad)

    const doDrag = (ev: MouseEvent) => {
      const dx = ev.clientX - startX
      const dy = ev.clientY - startY
      const localDx = dx * cos + dy * sin
      
      let newWidth = startWidth
      if (corner.includes('e')) newWidth = startWidth + localDx
      if (corner.includes('w')) newWidth = startWidth - localDx
      
      newWidth = Math.max(50, newWidth)
      wrapper.style.width = `${newWidth}px`
      wrapper.style.height = `${newWidth / ratio}px`
      setImgState(prev => prev.target ? { ...prev } : prev)
    }

    const stopDrag = () => {
      document.removeEventListener('mousemove', doDrag)
      document.removeEventListener('mouseup', stopDrag)
    }
    document.addEventListener('mousemove', doDrag)
    document.addEventListener('mouseup', stopDrag)
  }

  const startRotate = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!imgState.target) return

    const wrapper = imgState.target
    const rect = wrapper.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    const doDrag = (ev: MouseEvent) => {
      ev.preventDefault()
      let angle = Math.atan2(ev.clientY - cy, ev.clientX - cx) * (180 / Math.PI) + 90
      if (angle < 0) angle += 360
      
      if (Math.abs(angle - 0) < 5 || Math.abs(angle - 360) < 5) angle = 0
      else if (Math.abs(angle - 90) < 5) angle = 90
      else if (Math.abs(angle - 180) < 5) angle = 180
      else if (Math.abs(angle - 270) < 5) angle = 270
      
      wrapper.style.transform = `rotate(${angle}deg)`
      setImgState({ target: wrapper, rotation: angle })
    }

    const stopDrag = () => {
      document.removeEventListener('mousemove', doDrag)
      document.removeEventListener('mouseup', stopDrag)
    }
    document.addEventListener('mousemove', doDrag)
    document.addEventListener('mouseup', stopDrag)
  }

  const getHandlePos = (corner: string) => {
    if (!imgState.target) return { x: 0, y: 0 }
    const wrapper = imgState.target
    const rect = wrapper.getBoundingClientRect()
    
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const w = wrapper.offsetWidth
    const h = wrapper.offsetHeight
    
    const rad = imgState.rotation * Math.PI / 180
    const cos = Math.cos(rad)
    const sin = Math.sin(rad)
    
    let dx = 0, dy = 0
    if (corner === 'nw') { dx = -w/2; dy = -h/2; }
    if (corner === 'ne') { dx = w/2; dy = -h/2; }
    if (corner === 'sw') { dx = -w/2; dy = h/2; }
    if (corner === 'se') { dx = w/2; dy = h/2; }
    if (corner === 'rotate') { dx = 0; dy = -h/2 - 30; }
    
    return {
      x: cx + dx * cos - dy * sin,
      y: cy + dx * sin + dy * cos
    }
  }

  const handleSave = () => {
    if (editorRef.current) setContent(editorRef.current.innerHTML)
    onClose()
  }

  // NEW: Clear everything inside the canvas
  const clearCanvas = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = ''
      setImgState({ target: null, rotation: 0 })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-[#eef2f5] flex flex-col font-sans">
      
      <style jsx global>{`
        .editor-canvas { position: relative; overflow: hidden; }
        .editor-canvas a { color: #2563eb; text-decoration: underline; cursor: pointer; }
        
        /* RED DOTTED MARGIN LINE (Responsive) */
        .editor-canvas::before {
          content: '';
          position: absolute;
          top: 16px; left: 16px; right: 16px; bottom: 16px;
          border: 2px dashed #ef4444;
          pointer-events: none;
          z-index: 0;
          border-radius: 16px;
        }
        @media (min-width: 640px) {
          .editor-canvas::before {
            top: 40px; left: 40px; right: 40px; bottom: 40px;
          }
        }
        
        .free-img-wrapper { position: absolute; }
        .resize-handle { position: fixed; width: 12px; height: 12px; background: #25D366; border: 2px solid white; border-radius: 50%; z-index: 1000; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
        .rotate-handle { position: fixed; width: 24px; height: 24px; background: #075E54; border: 2px solid white; border-radius: 50%; z-index: 1000; display: flex; align-items: center; justify-content: center; cursor: grab; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
        .rotate-handle:active { cursor: grabbing; }
        .custom-scroll::-webkit-scrollbar { width: 8px; }
        .custom-scroll::-webkit-scrollbar-track { background: #f0f2f5; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
      `}</style>

      {/* WhatsApp Light Theme Header */}
      <div className="bg-[#075E54] p-4 flex items-center justify-between shadow-lg shrink-0 z-20">
        <h2 className="text-white text-xl font-bold tracking-wide flex items-center gap-2 pl-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#25D366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Content Studio
        </h2>
        <div className="flex gap-2">
          {/* Replaced HTML View with Clear & Close Buttons */}
          <button 
            onClick={clearCanvas} 
            className="text-sm bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition shadow-md"
          >
            Clear Canvas
          </button>
          <button 
            onClick={onClose} 
            className="text-sm bg-white/20 hover:bg-white/30 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            Close Canvas
          </button>
          <button 
            onClick={handleSave} 
            className="text-sm bg-[#25D366] hover:bg-[#1eb455] text-white font-bold px-6 py-2 rounded-lg transition shadow-md"
          >
            Save & Exit
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Light Theme Sidebar */}
        <div className="w-24 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-2 shrink-0 overflow-y-auto custom-scroll shadow-sm">
          
          <button 
            onClick={(e) => toggleMenu(e, 'block')}
            className="w-20 h-12 flex flex-col items-center justify-center text-gray-500 hover:text-[#075E54] hover:bg-[#f0f2f5] rounded-lg transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8M4 18h16" /></svg>
            <span className="text-[10px] mt-1 font-medium">Style</span>
          </button>

          <button 
            onClick={(e) => toggleMenu(e, 'size')}
            className="w-20 h-12 flex flex-col items-center justify-center text-gray-500 hover:text-[#075E54] hover:bg-[#f0f2f5] rounded-lg transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 20h4l4-12 4 12h4M8 14h8" /></svg>
            <span className="text-[10px] mt-1 font-medium">Size</span>
          </button>

          <div className="w-12 border-t border-gray-100 my-2"></div>

          <button onClick={() => exec('bold')} className="w-20 h-12 flex flex-col items-center justify-center text-gray-500 hover:text-[#075E54] hover:bg-[#f0f2f5] rounded-lg transition font-bold text-base" title="Bold">
            <span className="text-lg leading-none">B</span>
            <span className="text-[10px] mt-1 font-medium">Bold</span>
          </button>
          <button onClick={() => exec('italic')} className="w-20 h-12 flex flex-col items-center justify-center text-gray-500 hover:text-[#075E54] hover:bg-[#f0f2f5] rounded-lg transition italic text-base" title="Italic">
            <span className="text-lg leading-none">I</span>
            <span className="text-[10px] mt-1 font-medium">Italic</span>
          </button>
          <button onClick={() => exec('underline')} className="w-20 h-12 flex flex-col items-center justify-center text-gray-500 hover:text-[#075E54] hover:bg-[#f0f2f5] rounded-lg transition underline text-base" title="Underline">
            <span className="text-lg leading-none">U</span>
            <span className="text-[10px] mt-1 font-medium">Underline</span>
          </button>

          <div className="w-12 border-t border-gray-100 my-2"></div>

          <button 
            onClick={(e) => toggleMenu(e, 'color')}
            className="w-20 h-12 flex flex-col items-center justify-center text-gray-500 hover:text-[#075E54] hover:bg-[#f0f2f5] rounded-lg transition"
            title="Colors"
          >
            <span className="text-lg leading-none">A</span>
            <span className="w-6 h-1 bg-red-500 rounded-sm mt-1"></span>
          </button>

          <div className="w-12 border-t border-gray-100 my-2"></div>

          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <button onClick={() => exec('justifyLeft')} className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-[#075E54] hover:bg-[#f0f2f5] rounded-lg transition" title="Align Left">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h16" /></svg>
              </button>
              <button onClick={() => exec('justifyCenter')} className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-[#075E54] hover:bg-[#f0f2f5] rounded-lg transition" title="Align Center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M7 12h10M4 18h16" /></svg>
              </button>
            </div>
            <div className="flex gap-1">
              <button onClick={() => exec('justifyRight')} className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-[#075E54] hover:bg-[#f0f2f5] rounded-lg transition" title="Align Right">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M10 12h10M4 18h16" /></svg>
              </button>
              <button onClick={() => exec('justifyFull')} className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-[#075E54] hover:bg-[#f0f2f5] rounded-lg transition" title="Justify">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            </div>
          </div>

          <div className="w-12 border-t border-gray-100 my-2"></div>

          <button 
            onClick={() => {
              const url = prompt('Enter URL (https://...)')
              if (url) exec('createLink', url)
            }} 
            className="w-20 h-12 flex flex-col items-center justify-center text-gray-500 hover:text-[#075E54] hover:bg-[#f0f2f5] rounded-lg transition" title="Insert Link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
            <span className="text-[10px] mt-1 font-medium">Link</span>
          </button>

          <label title="Upload Image" className="w-20 h-12 flex flex-col items-center justify-center text-gray-500 hover:text-[#075E54] hover:bg-[#f0f2f5] rounded-lg transition cursor-pointer relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span className="text-[10px] mt-1 font-medium">Image</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
          </label>

        </div>

        {/* The Infinite Expanding Canvas Area */}
        <div className="flex-1 overflow-y-auto custom-scroll bg-[#eef2f5] flex justify-center p-4 sm:p-10 items-start">
          <div
            ref={editorRef}
            contentEditable
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={handleEditorClick}
            className="editor-canvas relative bg-white w-full max-w-4xl mx-auto min-h-[80vh] shadow-2xl p-4 sm:p-16 rounded-3xl border border-gray-100 overflow-hidden focus:outline-none"
            style={{ lineHeight: '1.8', fontSize: '18px' }}
          />
        </div>

        {/* Floating Dropdown Menus (Light Theme) */}
        {openMenu && menuPos && (
          <div className="fixed z-[2000] shadow-2xl" style={{ top: `${menuPos.y}px`, left: `${menuPos.x}px` }} onClick={(e) => e.stopPropagation()}>
            {openMenu === 'block' && (
              <div className="bg-white border border-gray-200 rounded-lg py-2 w-48">
                {[{v:'p', l:'Normal Text'}, {v:'h1', l:'Heading 1'}, {v:'h2', l:'Heading 2'}, {v:'h3', l:'Heading 3'}].map(opt => (
                  <button key={opt.v} onClick={() => exec('formatBlock', opt.v)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#f0f2f5] hover:text-[#075E54] text-sm">{opt.l}</button>
                ))}
              </div>
            )}
            {openMenu === 'size' && (
              <div className="bg-white border border-gray-200 rounded-lg py-2 w-32">
                {[{v:'1', l:'Tiny'}, {v:'2', l:'Small'}, {v:'3', l:'Normal'}, {v:'4', l:'Medium'}, {v:'5', l:'Large'}, {v:'6', l:'Big'}, {v:'7', l:'Huge'}].map(opt => (
                  <button key={opt.v} onClick={() => exec('fontSize', opt.v)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#f0f2f5] hover:text-[#075E54] text-sm">{opt.l}</button>
                ))}
              </div>
            )}
            {openMenu === 'color' && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 w-48">
                <p className="text-gray-400 text-xs mb-2 uppercase font-bold">Text Color</p>
                <div className="grid grid-cols-6 gap-2 mb-4">
                  {['#000000', '#ffffff', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#6b7280', '#dc2626', '#2563eb'].map(c => (
                    <button key={c} onClick={() => exec('foreColor', c)} className="w-6 h-6 rounded-md border border-gray-300 shadow-sm" style={{ background: c }} />
                  ))}
                </div>
                <p className="text-gray-400 text-xs mb-2 uppercase font-bold">Highlight</p>
                <div className="grid grid-cols-6 gap-2">
                  {['#ffff00', '#ff00ff', '#00ffff', '#00ff00', '#ff0000', '#0000ff'].map(c => (
                    <button key={c} onClick={() => exec('hiliteColor', c)} className="w-6 h-6 rounded-md border border-gray-300 shadow-sm" style={{ background: c }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Floating Image Resize & Rotate Handles */}
        {imgState.target && (
          <>
            <div className="resize-handle" style={{ left: getHandlePos('nw').x - 6, top: getHandlePos('nw').y - 6, cursor: 'nwse-resize' }} onMouseDown={(e) => startResize(e, 'nw')} />
            <div className="resize-handle" style={{ left: getHandlePos('ne').x - 6, top: getHandlePos('ne').y - 6, cursor: 'nesw-resize' }} onMouseDown={(e) => startResize(e, 'ne')} />
            <div className="resize-handle" style={{ left: getHandlePos('sw').x - 6, top: getHandlePos('sw').y - 6, cursor: 'nesw-resize' }} onMouseDown={(e) => startResize(e, 'sw')} />
            <div className="resize-handle" style={{ left: getHandlePos('se').x - 6, top: getHandlePos('se').y - 6, cursor: 'nwse-resize' }} onMouseDown={(e) => startResize(e, 'se')} />
            
            <div className="rotate-handle" style={{ left: getHandlePos('rotate').x - 12, top: getHandlePos('rotate').y - 12 }} onMouseDown={startRotate}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
