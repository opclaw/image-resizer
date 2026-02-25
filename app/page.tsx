'use client'

import { useState, useRef, useCallback } from 'react'

export default function Home() {
  const [image, setImage] = useState<string | null>(null)
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(600)
  const [maintainRatio, setMaintainRatio] = useState(true)
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 })
  const [resizedImage, setResizedImage] = useState<string | null>(null)
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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center text-2xl shadow-lg">🖼️</div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Image Resizer</h1>
                <p className="text-sm text-slate-500">Resize images online</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-lime-500 to-green-600 text-3xl shadow-xl mb-6">🖼️</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Image Resizer</h2>
            <p className="text-lg md:text-xl text-slate-600">Resize images online for free. Change dimensions while maintaining quality.</p>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 md:p-8">
          {!image ? (
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center">
              <div className="text-4xl mb-4">🖼️</div>
              <p className="text-slate-600 mb-4">Upload an image to resize</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="btn-primary cursor-pointer inline-block">
                📁 Choose Image
              </label>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Width (px)</label>
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
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Height (px)</label>
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

              <label className="flex items-center gap-2 mb-6 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={maintainRatio}
                  onChange={(e) => setMaintainRatio(e.target.checked)}
                  className="rounded border-slate-300"
                />
                Maintain aspect ratio
              </label>

              <div className="flex gap-3 mb-6">
                <button onClick={resizeImage} className="btn-primary bg-lime-600 hover:bg-lime-700">
                  ✨ Resize Image
                </button>
                <label className="btn-secondary cursor-pointer">
                  📁 Change Image
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              </div>

              {resizedImage && (
                <div className="text-center">
                  <img src={resizedImage} alt="Resized" className="max-w-full mx-auto rounded-lg border border-slate-200 mb-4" />
                  <button onClick={downloadImage} className="btn-primary bg-lime-600 hover:bg-lime-700">
                    💾 Download Resized Image
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2024 SmartOK Tools. Free online tools.</p>
        </div>
      </footer>
    </div>
  )
}
