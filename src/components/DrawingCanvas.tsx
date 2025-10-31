'use client'

import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas'
import { DrawingStroke } from '@/types'

interface DrawingCanvasProps {
  initialStrokes?: DrawingStroke[]
  currentColor: string
  disabled?: boolean
  onStrokeUpdate?: (strokes: DrawingStroke[]) => void
}

export interface DrawingCanvasHandle {
  undo: () => void
  clear: () => void
  getStrokes: () => Promise<DrawingStroke[]>
  exportImage: () => Promise<string>
}

const COLORS = {
  black: '#2B2B2B',
  red: '#FF5757',
  blue: '#5B8FF9',
  green: '#5FD35F',
  yellow: '#FFD93D',
}

const DrawingCanvas = forwardRef<DrawingCanvasHandle, DrawingCanvasProps>(
  ({ initialStrokes = [], currentColor, disabled = false, onStrokeUpdate }, ref) => {
    const canvasRef = useRef<ReactSketchCanvasRef>(null)

    useEffect(() => {
      if (canvasRef.current && initialStrokes.length > 0) {
        // Load initial strokes
        const paths = initialStrokes.map((stroke) => ({
          drawMode: false,
          strokeColor: stroke.color,
          strokeWidth: 4,
          paths: stroke.points.map((point) => ({
            x: point[0],
            y: point[1],
          })),
        }))
        canvasRef.current.loadPaths(paths)
      }
    }, [initialStrokes])

    useImperativeHandle(ref, () => ({
      undo: () => {
        canvasRef.current?.undo()
      },
      clear: () => {
        canvasRef.current?.clearCanvas()
      },
      getStrokes: async () => {
        const paths = await canvasRef.current?.exportPaths()
        if (!paths) return []

        return JSON.parse(paths).map((path: any) => ({
          color: path.strokeColor,
          points: path.paths.map((p: any) => [p.x, p.y] as [number, number]),
        }))
      },
      exportImage: async () => {
        const image = await canvasRef.current?.exportImage('png')
        return image || ''
      },
    }))

    return (
      <div className="soft-panel relative overflow-hidden">
        <ReactSketchCanvas
          ref={canvasRef}
          width="100%"
          height="400px"
          strokeWidth={4}
          strokeColor={COLORS[currentColor as keyof typeof COLORS] || COLORS.black}
          canvasColor="#FFFFFF"
          style={{
            border: 'none',
            borderRadius: '12px',
          }}
          allowOnlyPointerType="all"
          onChange={() => {
            if (onStrokeUpdate) {
              canvasRef.current?.exportPaths().then((paths) => {
                const strokes = JSON.parse(paths).map((path: any) => ({
                  color: path.strokeColor,
                  points: path.paths.map((p: any) => [p.x, p.y] as [number, number]),
                }))
                onStrokeUpdate(strokes)
              })
            }
          }}
        />
        {disabled && (
          <div className="absolute inset-0 bg-white/50 cursor-not-allowed rounded-xl backdrop-blur-sm flex items-center justify-center">
            <div className="text-2xl font-bold text-draw-black/50">time's up!</div>
          </div>
        )}
      </div>
    )
  }
)

DrawingCanvas.displayName = 'DrawingCanvas'

export default DrawingCanvas
