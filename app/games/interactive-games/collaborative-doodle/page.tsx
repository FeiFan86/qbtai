'use client'

import { useState, useEffect, useRef } from 'react'

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

import { Navigation } from '@/components/navigation'

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

import { Footer } from '@/components/footer'

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

import { Button } from '@/components/ui/button'

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

import { Badge } from '@/components/ui/badge'

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

import { 
  ArrowLeft,
  Palette,
  Brush,
  Eraser,
  Undo2,
  RotateCcw,
  Download,
  Share2,
  Heart,
  Users,
  Clock,
  Star,
  Lightbulb,
  Sparkles,
  Send,
  Trophy
} from 'lucide-react'

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

import Link from 'next/link'

// 情感主题和提示词
const emotionThemes = [
  {
    id: 'happiness',
    name: '快乐',
    color: '#FFD700',
    prompts: [
      '画出让你感到最开心的一刻',
      '用色彩表达快乐的情绪',
      '创作一个代表快乐的符号',
      '画出阳光和彩虹'
    ]
  }
]

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

  {
    id: 'love',
    name: '爱',
    color: '#FF69B4',
    prompts: [
      '画出你们第一次见面的场景',
      '创作一个代表你们爱情的符号',
      '画出一起度过的美好时光',
      '用色彩表达爱的感觉'
    ]
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
},
  {
    id: 'surprise',
    name: '惊喜',
    color: '#9370DB',
    prompts: [
      '画出令人惊喜的时刻',
      '创作一个神秘的盒子',
      '画出突然出现的彩虹',
      '表达惊讶的表情'
    ]
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
},
  {
    id: 'adventure',
    name: '冒险',
    color: '#20B2AA',
    prompts: [
      '画出你们梦想的旅行地',
      '创作一个冒险地图',
      '画出一起探索未知',
      '创造新的世界'
    ]
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
},
  {
    id: 'calm',
    name: '宁静',
    color: '#87CEEB',
    prompts: [
      '画出最宁静的地方',
      '创作一个和平的符号',
      '画出安静的时刻',
      '用色彩表达宁静'
    ]
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
},
  {
    id: 'nostalgia',
    name: '回忆',
    color: '#DEB887',
    prompts: [
      '画出童年的回忆',
      '创作一个怀旧的场景',
      '画出珍贵的记忆',
      '用色彩表达怀旧感'
    ]
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
]

// 示例模板数据
const drawingTemplates = [
  {
    id: 'template_001',
    name: '心形轮廓',
    description: '画出爱心形状，表达爱意',
    category: '浪漫',
    difficulty: '简单',
    color: '#FF69B4',
    svgPath: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
},
  {
    id: 'template_002',
    name: '笑脸表情',
    description: '画一个开心的笑脸',
    category: '快乐',
    difficulty: '简单',
    color: '#FFD700',
    svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
},
  {
    id: 'template_003',
    name: '房子轮廓',
    description: '画出家的形状',
    category: '温暖',
    difficulty: '中等',
    color: '#8B4513',
    svgPath: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
},
  {
    id: 'template_004',
    name: '树形轮廓',
    description: '画出大树形状',
    category: '自然',
    difficulty: '中等',
    color: '#228B22',
    svgPath: 'M12 2L4 12h3v8h10v-8h3L12 2z'
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
},
  {
    id: 'template_005',
    name: '星星轮廓',
    description: '画出五角星形状',
    category: '梦想',
    difficulty: '简单',
    color: '#FFA500',
    svgPath: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
},
  {
    id: 'template_006',
    name: '花朵轮廓',
    description: '画出简单花朵形状',
    category: '美丽',
    difficulty: '中等',
    color: '#FF1493',
    svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
]

// 示例图片参考
const exampleDrawings = [
  {
    id: 'example_001',
    title: '浪漫日落',
    description: '用暖色调画出日落场景',
    colors: ['#FF6B35', '#FFA500', '#FFD700', '#87CEEB'],
    techniques: ['渐变色彩', '简单几何形状', '层次感']
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
},
  {
    id: 'example_002',
    title: '抽象情感',
    description: '用线条和色块表达情感',
    colors: ['#9370DB', '#4B0082', '#FF69B4', '#00CED1'],
    techniques: ['抽象线条', '色彩对比', '情感表达']
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
},
  {
    id: 'example_003',
    title: '自然风景',
    description: '描绘美丽的自然风光',
    colors: ['#228B22', '#32CD32', '#87CEEB', '#F0E68C'],
    techniques: ['自然色彩', '远近层次', '细节刻画']
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
]

// 示例模板数据
const drawingTemplates = [
  {
    id: 'template_001',
    name: '心形轮廓',
    description: '画出爱心形状，表达爱意',
    category: '浪漫',
    difficulty: '简单',
    color: '#FF69B4',
    svgPath: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
},
  {
    id: 'template_002',
    name: '笑脸表情',
    description: '画一个开心的笑脸',
    category: '快乐',
    difficulty: '简单',
    color: '#FFD700',
    svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
},
  {
    id: 'template_003',
    name: '房子轮廓',
    description: '画出家的形状',
    category: '温暖',
    difficulty: '中等',
    color: '#8B4513',
    svgPath: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
},
  {
    id: 'template_004',
    name: '树形轮廓',
    description: '画出大树形状',
    category: '自然',
    difficulty: '中等',
    color: '#228B22',
    svgPath: 'M12 2L4 12h3v8h10v-8h3L12 2z'
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
},
  {
    id: 'template_005',
    name: '星星轮廓',
    description: '画出五角星形状',
    category: '梦想',
    difficulty: '简单',
    color: '#FFA500',
    svgPath: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
},
  {
    id: 'template_006',
    name: '花朵轮廓',
    description: '画出简单花朵形状',
    category: '美丽',
    difficulty: '中等',
    color: '#FF1493',
    svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
]

// 示例图片参考
const exampleDrawings = [
  {
    id: 'example_001',
    title: '浪漫日落',
    description: '用暖色调画出日落场景',
    colors: ['#FF6B35', '#FFA500', '#FFD700', '#87CEEB'],
    techniques: ['渐变色彩', '简单几何形状', '层次感']
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
},
  {
    id: 'example_002',
    title: '抽象情感',
    description: '用线条和色块表达情感',
    colors: ['#9370DB', '#4B0082', '#FF69B4', '#00CED1'],
    techniques: ['抽象线条', '色彩对比', '情感表达']
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
},
  {
    id: 'example_003',
    title: '自然风景',
    description: '描绘美丽的自然风光',
    colors: ['#228B22', '#32CD32', '#87CEEB', '#F0E68C'],
    techniques: ['自然色彩', '远近层次', '细节刻画']
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
]

export default function CollaborativeDoodlePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentColor, setCurrentColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(5)
  const [drawingHistory, setDrawingHistory] = useState<string[]>([])
  const [historyStep, setHistoryStep] = useState(-1)
  const [selectedTheme, setSelectedTheme] = useState(emotionThemes[0])
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [isEraser, setIsEraser] = useState(false)
  const [showCompleted, setShowCompleted] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [showTemplates, setShowTemplates] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  // 预设颜色
  const presetColors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
    '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB', '#A52A2A',
    '#808080', '#FFD700', '#4B0082', '#00CED1', '#FF1493', '#32CD32'
  ]

  // 初始化画布
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    
    // 设置白色背景
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // 保存初始状态
    saveCanvasState()
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}, [])

  // 计时器
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined
    if (timerActive) {
      interval = setInterval(() => {
        setSessionTime(prevTime => prevTime + 1)
      }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}, 1000)
    }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
} else if (!timerActive && sessionTime !== 0) {
      clearInterval(interval)
    }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
    return () => clearInterval(interval)
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}, [timerActive, sessionTime])

  // 格式化时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}:${secs.toString().padStart(2, '0')}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}`
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

  // 随机选择提示词
  useEffect(() => {
    const randomPrompt = selectedTheme.prompts[Math.floor(Math.random() * selectedTheme.prompts.length)]
    setCurrentPrompt(randomPrompt)
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}, [selectedTheme])

  // 保存画布状态
  const saveCanvasState = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const dataURL = canvas.toDataURL()
    const newHistory = drawingHistory.slice(0, historyStep + 1)
    newHistory.push(dataURL)
    setDrawingHistory(newHistory)
    setHistoryStep(newHistory.length - 1)
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

  // 开始绘画
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!timerActive) setTimerActive(true)
    setIsDrawing(true)
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

  // 绘画中
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over'
    ctx.strokeStyle = isEraser ? 'rgba(0,0,0,1)' : currentColor
    ctx.lineWidth = brushSize
    ctx.lineTo(x, y)
    ctx.stroke()
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

  // 结束绘画
  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false)
      saveCanvasState()
    }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

  // 撤销
  const undo = () => {
    if (historyStep <= 0) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const canvasPic = new Image()
    
    canvasPic.src = drawingHistory[historyStep - 1]
    canvasPic.onload = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(canvasPic, 0, 0)
    }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
    
    setHistoryStep(historyStep - 1)
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

  // 重做
  const redo = () => {
    if (historyStep >= drawingHistory.length - 1) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const canvasPic = new Image()
    
    canvasPic.src = drawingHistory[historyStep + 1]
    canvasPic.onload = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(canvasPic, 0, 0)
    }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
    
    setHistoryStep(historyStep + 1)
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

  // 清空画布
  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    saveCanvasState()
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

  // 下载画作
  const downloadDrawing = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const link = document.createElement('a')
    link.download = `collaborative-doodle-${selectedTheme.name}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}-${Date.now()}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

  // 完成绘画会话
  const completeSession = () => {
    setTimerActive(false)
    setShowCompleted(true)
    
    // 计算得分
    const timeBonus = Math.max(0, 300 - sessionTime) // 最多5分钟时间奖励
    const sessionPoints = 50 + timeBonus
    setTotalPoints(totalPoints + sessionPoints)
    setCompletedSessions(completedSessions + 1)
    
    // 3秒后隐藏完成消息
    setTimeout(() => {
      setShowCompleted(false)
      resetSession()
    }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}, 5000)
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

  // 重置会话
  const resetSession = () => {
    setSessionTime(0)
    setTimerActive(false)
    clearCanvas()
    
    // 选择新的随机主题
    const newTheme = emotionThemes[Math.floor(Math.random() * emotionThemes.length)]
    setSelectedTheme(newTheme)
  }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <Link href="/games">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回互动游戏
              </Button>
            </Link>
          </div>
          
          {/* 页面标题 */}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              协作涂鸦
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 block md:inline">
                情感表达
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              双人一起绘画，通过色彩和形状表达情感，增进彼此理解和默契
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 左侧控制面板 */}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
            <div className="lg:col-span-1">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-purple-500" />
                    绘画工具
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 主题选择 */}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                  <div>
                    <h3 className="text-sm font-medium mb-2">情感主题</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {emotionThemes.map(theme => (
                        <Button
                          key={theme.id}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                          variant={selectedTheme.id === theme.id ? "default" : "outline"}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                          size="sm"
                          onClick={() => setSelectedTheme(theme)}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                          className="flex items-center gap-1"
                        >
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: theme.color }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                          ></div>
                          {theme.name}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                        </Button>
                      ))}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                    </div>
                  </div>
                  
                  {/* 当前提示 */}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h3 className="text-sm font-medium mb-1 flex items-center gap-1">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      今日提示
                    </h3>
                    <p className="text-sm text-gray-700">{currentPrompt}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}</p>
                  </div>
                  
                  {/* 画笔工具 */}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                  <div>
                    <h3 className="text-sm font-medium mb-2">绘画模式</h3>
                    <div className="flex gap-2">
                      <Button
                        variant={!isEraser ? "default" : "outline"}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                        size="sm"
                        onClick={() => setIsEraser(false)}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                        className="flex items-center gap-1"
                      >
                        <Brush className="h-4 w-4" />
                        画笔
                      </Button>
                      <Button
                        variant={isEraser ? "default" : "outline"}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                        size="sm"
                        onClick={() => setIsEraser(true)}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                        className="flex items-center gap-1"
                      >
                        <Eraser className="h-4 w-4" />
                        橡皮擦
                      </Button>
                    </div>
                  </div>
                  
                  {/* 画笔大小 */}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                  <div>
                    <h3 className="text-sm font-medium mb-2">画笔大小: {brushSize}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}px</h3>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={brushSize}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                      onChange={(e) => setBrushSize(parseInt(e.target.value))}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                      className="w-full"
                    />
                  </div>
                  
                  {/* 颜色选择 */}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                  <div>
                    <h3 className="text-sm font-medium mb-2">颜色选择</h3>
                    <div className="grid grid-cols-6 gap-1 mb-2">
                      {presetColors.map(color => (
                        <button
                          key={color}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                          className={`w-8 h-8 rounded border-2 ${currentColor === color ? 'border-gray-800' : 'border-gray-300'}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}`}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                          style={{ backgroundColor: color }

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                          onClick={() => setCurrentColor(color)}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                        />
                      ))}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                    </div>
                    <input
                      type="color"
                      value={currentColor}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                      onChange={(e) => setCurrentColor(e.target.value)}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                      className="w-full h-10 cursor-pointer"
                    />
                  </div>
                  
                  {/* 操作按钮 */}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={undo}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
} disabled={historyStep <= 0}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}>
                        <Undo2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={redo}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
} disabled={historyStep >= drawingHistory.length - 1}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={clearCanvas}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}>
                        清空
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* 会话状态 */}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    会话状态
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">会话时间</span>
                    <span className="text-sm font-bold">{formatTime(sessionTime)}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">完成会话</span>
                    <span className="text-sm font-bold">{completedSessions}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">总积分</span>
                    <span className="text-sm font-bold">{totalPoints}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}</span>
                  </div>
                  
                  <Button 
                    onClick={completeSession}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
} 
                    className="w-full mt-4"
                    disabled={sessionTime < 30}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
} // 至少30秒才能完成
                  >
                    <Trophy className="h-4 w-4 mr-2" />
                    完成绘画
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* 右侧画布区域 */}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-purple-500" />
                      绘画画布
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={downloadDrawing}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}>
                        <Download className="h-4 w-4 mr-1" />
                        下载
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        分享
                      </Button>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    在画布上自由绘画，表达你的情感和创意
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative bg-white rounded-lg overflow-hidden border">
                    <canvas
                      ref={canvasRef}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                      width={800}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                      height={600}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                      className="w-full cursor-crosshair"
                      onMouseDown={startDrawing}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                      onMouseMove={draw}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                      onMouseUp={stopDrawing}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                      onMouseLeave={stopDrawing}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                    />
                  </div>
                  
                  {showCompleted && (
                    <div className="mt-4 bg-green-50 border border-green-200 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-green-800 font-medium">绘画完成！</p>
                          <p className="text-green-600 text-sm">
                            获得 {50 + Math.max(0, 300 - sessionTime)}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
} 积分，继续创作吧！
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-100 px-2 py-1 rounded">{template.category}</span>
                <span className="text-gray-500">{template.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">绘画示例参考</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}