import { CodeBlockWithHeader } from "@/components/grid-item"
import rulesData from "@/data/rules.json"

type CodeBlockWithHeaderProps = {
  framework: string
  filename: string
  mdcFile: string
}

export default function Home() {
  const codeBlocks: CodeBlockWithHeaderProps[] = rulesData

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Development Rules & Best Practices</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {codeBlocks.map((codeBlock, index) => (
          <CodeBlockWithHeader
            key={index}
            framework={codeBlock.framework}
            filename={codeBlock.filename}
            mdcFile={codeBlock.mdcFile}
          />
        ))}
      </div>
    </div>
  )
}