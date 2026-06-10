import Editor from "@monaco-editor/react";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <nav className="bg-slate-900 border-b border-slate-700 p-4">
        <h1 className="text-3xl font-bold text-cyan-400">
          AI Compiler Assistant
        </h1>
      </nav>

      <div className="p-6">

        <div className="bg-slate-900 rounded-xl p-4 shadow-lg">

          <h2 className="text-xl font-semibold mb-3">
            Code Editor
          </h2>

          <Editor
            height="500px"
            defaultLanguage="c"
            defaultValue="// Write your C code here"
            theme="vs-dark"
          />

        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">

          <div className="bg-red-950 p-4 rounded-xl">
            <h2 className="text-xl font-bold text-red-400">
              Errors
            </h2>

            <p className="mt-3">
              No errors detected
            </p>
          </div>

          <div className="bg-green-950 p-4 rounded-xl">
            <h2 className="text-xl font-bold text-green-400">
              Suggested Fix
            </h2>

            <p className="mt-3">
              Waiting for analysis...
            </p>

            <button className="mt-4 px-4 py-2 bg-green-600 rounded-lg">
              Apply Fix
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;
