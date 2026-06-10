import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import Navbar from './components/Navbar'
import LanguageSelector from './components/LanguageSelector'
import CodeEditor from './components/CodeEditor'
import AnalyzeButton from './components/AnalyzeButton'
import ErrorPanel from './components/ErrorPanel'
import SuggestionPanel from './components/SuggestionPanel'
import CompilerWorkflow from './components/CompilerWorkflow'
import WorkflowDrawer from './components/WorkflowDrawer'

const App = () => {
  const [language, setLanguage] = useState('c')
  const [code, setCode] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const [errors, setErrors] = useState([])
  const [suggestions, setSuggestions] = useState([])

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [analysisData, setAnalysisData] = useState(null)

  const handleAnalyze = async () => {
    try {
      setIsAnalyzing(true)

      const response = await fetch(
        'http://127.0.0.1:5000/analyze',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
            language,
          }),
        }
      )

      const data = await response.json()

      setAnalysisData(data)

      setErrors(data.errorDetection || [])
console.log(data)
if (data.errorDetection?.length > 0) {

  const firstError = data.errorDetection[0]

  setSuggestions([
    {
      message: `Error at Line ${firstError.line}`,
      fix: firstError.message,
      confidence: 95,
    },
  ])

} else {

  setSuggestions([
    {
      message: 'Code Analysis',
      fix: 'No compiler errors detected',
      confidence: 100,
    },
  ])

}


      setIsAnalyzing(false)
    } catch (error) {
      console.error('Backend Error:', error)
      setIsAnalyzing(false)
    }
  }


const handleApplyFix = () => {

  if (!errors.length) return

  const firstError = errors[0]

  let updatedCode = code

  let lines = updatedCode.split('\n')

  if (
    firstError.action === "add_semicolon"
  ) {

    const targetLine =
      firstError.targetLine - 1

    if (
      targetLine >= 0 &&
      targetLine < lines.length
    ) {

      if (
        !lines[targetLine]
          .trim()
          .endsWith(';')
      ) {

        lines[targetLine] =
          lines[targetLine] + ';'
      }
    }
  }

  setCode(lines.join('\n'))
}

  const handleApplyAIFix = () => {
    console.log('Apply AI Fix')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black">
      <Navbar />

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Side */}

          <div className="lg:col-span-2 space-y-6">

            <div className="glass-card p-1">
              <div className="bg-gray-950/50 rounded-lg p-4">
                <LanguageSelector
                  selectedLanguage={language}
                  onLanguageChange={setLanguage}
                />
              </div>
            </div>

            <div className="glass-card overflow-hidden">
              <div className="border-b border-gray-700/50 px-4 py-3">
                <h3 className="text-gray-300 font-semibold text-sm">
                  Code Editor
                </h3>
              </div>

              <CodeEditor
                language={language}
                value={code}
                onChange={setCode}
              />
            </div>

            <div className="flex justify-between items-center">

              <AnalyzeButton
                onClick={handleAnalyze}
                isLoading={isAnalyzing}
              />

              <CompilerWorkflow
                onClick={() =>
                  setIsDrawerOpen(true)
                }
              />
            </div>
          </div>

          {/* Right Side */}

          <div className="space-y-6">

            <AnimatePresence mode="wait">
              {errors.length > 0 && (
                <ErrorPanel errors={errors} />
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {suggestions.length > 0 && (
                <SuggestionPanel
                  suggestions={suggestions}
                  onApplyFix={handleApplyFix}
                />
              )}
            </AnimatePresence>

          </div>
        </div>
      </main>

      <WorkflowDrawer
        isOpen={isDrawerOpen}
        onClose={() =>
          setIsDrawerOpen(false)
        }
        analysisData={analysisData}
        onApplyAIFix={handleApplyAIFix}
      />
    </div>
  )
}

export default App
