"use client"

import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockGroup,
} from "@/components/ui/code-block"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { useState, useEffect } from "react"

// 定义CodeBlockWithHeader组件的props类型
type CodeBlockWithHeaderProps = {
  framework: string
  filename: string
  mdcFile: string
}

export function CodeBlockWithHeader({ 
  framework = "", 
  filename = "", 
  mdcFile = "" 
}: CodeBlockWithHeaderProps) {
  const [copied, setCopied] = useState(false)
  const [mdcContent, setMdcContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadMdcContent = async () => {
      if (!mdcFile) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await fetch(`/rules/${mdcFile}.mdc`)
        if (!response.ok) {
          throw new Error(`Failed to load ${mdcFile}.mdc`)
        }
        const content = await response.text()
        setMdcContent(content)
        setError("")
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load content")
        setMdcContent("")
      } finally {
        setLoading(false)
      }
    }

    loadMdcContent()
  }, [mdcFile])

  const handleCopy = () => {
    const contentToCopy = mdcContent || "No content available"
    navigator.clipboard.writeText(contentToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getDisplayContent = () => {
    if (loading) return "Loading..."
    if (error) return `Error: ${error}`
    if (!mdcContent) return "No content available"
    return mdcContent
  }

  const getLanguage = () => {
    // 根据文件扩展名确定语言
    if (filename.endsWith('.mdc')) return 'markdown'
    if (filename.endsWith('.tsx') || filename.endsWith('.ts')) return 'typescript'
    if (filename.endsWith('.jsx') || filename.endsWith('.js')) return 'javascript'
    if (filename.endsWith('.vue')) return 'vue'
    if (filename.endsWith('.svelte')) return 'svelte'
    return 'markdown'
  }

  return (
    <div className="w-full max-w-[450px]">
      <CodeBlock>
        <CodeBlockGroup className="border-border border-b py-2 pr-2 pl-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 text-primary rounded px-2 py-1 text-xs font-medium">
              {framework}
            </div>
            <span className="text-muted-foreground text-sm">{filename}</span>
            {loading && (
              <span className="text-muted-foreground text-xs">Loading...</span>
            )}
            {error && (
              <span className="text-red-500 text-xs">Error</span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleCopy}
            disabled={loading}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </CodeBlockGroup>
        <CodeBlockCode 
          code={getDisplayContent()} 
          language={getLanguage()} 
        />
      </CodeBlock>
    </div>
  )
}
