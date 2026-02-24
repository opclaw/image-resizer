'use client'

import { useState, useRef, useCallback } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [image, setImage] = useState<string | null>(null)
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(600)
  const [maintainAspect, setMaintainAspect] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setImage(event.target?.result as string)
      
      // Get original dimensions
      const img = new Image()
      img.onload = () => {
        setWidth(img.width)
        setHeight(img.height)
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth)
    if (maintainAspect && image) {
      const img = new Image()
      img.onload = () => {
        const aspectRatio = img.height / img.width
        setHeight(Math.round(newWidth * aspectRatio))
      }
      img.src = image
    }
  }

  const resizeImage = useCallback(() => {
    if (!image || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)
    }
    img.src = image
  }, [image, width, height])

  const downloadImage = () => {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.download = 'resized-image.png'
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🖼️ Image Resizer</h1>

      <div className={styles.upload}>
        <input type="file" accept="image/*" onChange={handleFileUpload} id="upload" />
        <label htmlFor="upload">📁 {image ? 'Change Image' : 'Upload Image'}</label>
      </div>

      {image && (
        <>
          <div className={styles.dimensions}>
            <div>
              <label>Width: {width}px</label>
              <input
                type="range"
                min="50"
                max="2000"
                value={width}
                onChange={(e) => handleWidthChange(parseInt(e.target.value))}
              />
            </div>
            <div>
              <label>Height: {height}px</label>
              <input
                type="range"
                min="50"
                max="2000"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value))}
              />
            </div>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={maintainAspect}
                onChange={(e) => setMaintainAspect(e.target.checked)}
              />
              Maintain aspect ratio
            </label>
          </div>

          <button onClick={resizeImage} className={styles.resizeBtn}>🔄 Resize Image</button>

          <div className={styles.result}>
            <canvas ref={canvasRef} />
            <button onClick={downloadImage} className={styles.downloadBtn}>💾 Download</button>
          </div>
        </>
      )}
    </div>
  )
}