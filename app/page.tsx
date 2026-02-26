'use client'

import { useState, useRef, useCallback } from 'react'

export default function Home() {
  const [image, setImage] = useState<string | null>(null)
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(600)
  const [maintainRatio, setMaintainRatio] = useState(true)
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 })
  const [resizedImage, setResizedImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        setOriginalSize({ width: img.width, height: img.height })
        setWidth(img.width)
        setHeight(img.height)
        setImage(event.target?.result as string)
        setResizedImage(null)
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files?.[0]
    if (!file || !file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        setOriginalSize({ width: img.width, height: img.height })
        setWidth(img.width)
        setHeight(img.height)
        setImage(event.target?.result as string)
        setResizedImage(null)
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }, [])

  const resizeImage = useCallback(() => {
    if (!image || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = width
    canvas.height = height

    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height)
      setResizedImage(canvas.toDataURL('image/png'))
    }
    img.src = image
  }, [image, width, height])

  const downloadImage = useCallback(() => {
    if (!resizedImage) return
    const link = document.createElement('a')
    link.download = 'resized-image.png'
    link.href = resizedImage
    link.click()
  }, [resizedImage])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Animated background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-400/10 to-cyan-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/30 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-indigo-500/40 group-hover:scale-105">
                🖼️
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Image Resizer</span>
                <p className="text-sm text-slate-500">Resize images online</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Improved Hero Section */}
      <section className="relative bg-white/50 backdrop-blur-sm border-b border-slate-200/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/50 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            {/* Animated icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-4xl shadow-2xl shadow-indigo-500/30 mb-8 animate-float animate-pulse-glow">
              🖼️
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Image Resizer
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
              Resize images online for free. 
              <span className="block mt-2 text-lg text-slate-500">Change dimensions while maintaining quality with our easy-to-use tool.</span>
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="px-4 py-2 bg-white rounded-full shadow-md border border-slate-200 text-slate-700 hover:shadow-lg hover:border-indigo-300 transition-all duration-300 cursor-default">
                ✨ Free & Unlimited
              </span>
              <span className="px-4 py-2 bg-white rounded-full shadow-md border border-slate-200 text-slate-700 hover:shadow-lg hover:border-indigo-300 transition-all duration-300 cursor-default">
                🔒 Private & Secure
              </span>
              <span className="px-4 py-2 bg-white rounded-full shadow-md border border-slate-200 text-slate-700 hover:shadow-lg hover:border-indigo-300 transition-all duration-300 cursor-default">
                ⚡ Fast Processing
              </span>
            </div>
          </div>
        </div>
        
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      </section>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-2xl shadow-slate-200/50 p-6 md:p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-100/50">
          {!image ? (
            <div 
              className={`dropzone ${isDragging ? 'dropzone-active' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-purple-50/0 to-pink-50/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative">
                {/* Upload icon with animation */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 mb-6 transition-all duration-300 group-hover:scale-110">
                  <span className="text-5xl filter drop-shadow-lg">📤</span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {isDragging ? 'Drop your image here!' : 'Upload an image to resize'}
                </h3>
                
                <p className="text-slate-500 mb-6 max-w-md mx-auto">
                  Drag and drop your image here, or click the button below to browse. 
                  Supports JPG, PNG, WebP, and GIF formats.
                </p>
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                />
                <label 
                  htmlFor="image-upload" 
                  className="btn-primary cursor-pointer inline-flex items-center gap-2"
                >
                  <span>📁</span>
                  <span>Choose Image</span>
                </label>
              </div>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="group">
                  <label className="block text-sm font-medium text-slate-700 mb-2 group-hover:text-indigo-600 transition-colors">Width (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => {
                      setWidth(Number(e.target.value))
                      if (maintainRatio && originalSize.width) {
                        const ratio = originalSize.height / originalSize.width
                        setHeight(Math.round(Number(e.target.value) * ratio))
                      }
                    }}
                    className="input"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-slate-700 mb-2 group-hover:text-indigo-600 transition-colors">Height (px)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => {
                      setHeight(Number(e.target.value))
                      if (maintainRatio && originalSize.height) {
                        const ratio = originalSize.width / originalSize.height
                        setWidth(Math.round(Number(e.target.value) * ratio))
                      }
                    }}
                    className="input"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 mb-8 p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-indigo-50 transition-all duration-300 group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={maintainRatio}
                    onChange={(e) => setMaintainRatio(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all"
                  />
                </div>
                <span className="text-sm text-slate-700 font-medium group-hover:text-indigo-700 transition-colors">
                  Maintain aspect ratio
                </span>
                <span className="text-xs text-slate-400 ml-auto">
                  {originalSize.width} × {originalSize.height} original
                </span>
              </label>

              <div className="flex flex-wrap gap-4 mb-8">
                <button 
                  onClick={resizeImage} 
                  className="btn-success"
                >
                  <span>✨</span>
                  <span>Resize Image</span>
                </button>
                <label className="btn-secondary cursor-pointer group">
                  <span className="group-hover:scale-110 transition-transform">📁</span>
                  <span>Change Image</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              </div>

              {resizedImage && (
                <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-200">
                  <div className="relative group mb-6">
                    <img 
                      src={resizedImage} 
                      alt="Resized" 
                      className="max-w-full mx-auto rounded-xl border border-slate-200 shadow-lg transition-all duration-300 group-hover:shadow-xl" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  </div>
                  <button 
                    onClick={downloadImage} 
                    className="btn-success w-full md:w-auto"
                  >
                    <span>💾</span>
                    <span>Download Resized Image</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </main>

      <footer className="bg-slate-900/95 backdrop-blur-sm text-slate-400 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🖼️</span>
            <span className="text-lg font-semibold text-slate-200">Image Resizer</span>
          </div>
          <p className="text-sm text-slate-500">© 2024 SmartOK Tools. Free online tools.</p>
        </div>
      </footer>
    </div>
  )
}
