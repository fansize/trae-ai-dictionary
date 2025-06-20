import { CodeBlockProps } from "@/lib/types"
import { CodeBlockWithHeader } from "@/components/grid-item"
import rulesData from "@/data/rules.json"

import { Navigation } from '@/components/navigation'
import { HeroContent } from '@/components/hero-content'
import { LogoSection } from '@/components/logo-section'



export default function Home() {
  const codeBlocks: CodeBlockProps[] = rulesData

  return (
    <>
    <Navigation />
    
    <div className="container mx-auto px-4 py-8">
      
      <HeroContent />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
        {codeBlocks.map((codeBlock, index) => (
          <CodeBlockWithHeader
            key={index}
            framework={codeBlock.framework}
            filename={codeBlock.filename}
            mdcFile={codeBlock.mdcFile}
          />
        ))}
      </div>
      <LogoSection />
    </div>
    </>
  )
}