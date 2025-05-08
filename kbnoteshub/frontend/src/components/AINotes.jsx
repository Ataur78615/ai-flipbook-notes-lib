import React, { useState } from "react";
import axios from "axios";
import { Sparkles, ClipboardCopy, Loader2 } from "lucide-react"; // Icons

const AINotes = () => {
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("");
  const [generatedNote, setGeneratedNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim() || !title.trim()) {
      setError("⚠️ Please enter both title and topic");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const geminiRes = await axios.post(
        "https://ai-flipbook-notes-lib.onrender.com/api/generate",
        {
          prompt,
          isPublic: true,
        }
      );

      const content = geminiRes.data.content;
      setGeneratedNote(content);

      await axios.post("https://ai-flipbook-notes-lib.onrender.com/api/notes", {
        title,
        content,
        isPublic: true,
        author: "User",
      });

      setSuccess("✅ Note saved successfully!");
    } catch (err) {
      setError("❌ Failed to generate note. Check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedNote);
    alert("✅ Copied to clipboard!");
  };

  return (
    <section
      id="ainotes"
      className="px-6 py-12 md:p-16 bg-gradient-to-br from-indigo-100 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen text-gray-900 dark:text-white transition-all"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-6 flex items-center justify-center gap-2">
          <Sparkles className="text-indigo-600 dark:text-indigo-400" />
          AI Notes Generator
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            className="w-full p-4 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="📝 Enter Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full p-4 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="💡 Enter your topic or prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
          />

          <div className="flex flex-wrap items-center gap-4">
            <button
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-all duration-200"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles />
                  Generate & Save
                </>
              )}
            </button>

            {generatedNote && (
              <button
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition-all duration-200"
                onClick={handleCopy}
              >
                <ClipboardCopy />
                Copy Note
              </button>
            )}
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </div>

        {generatedNote && (
          <div className="mt-10 bg-white/30 dark:bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-semibold mb-3 text-indigo-700 dark:text-indigo-300">
              📘 Generated Note:
            </h3>
            <p className="whitespace-pre-line leading-relaxed text-gray-800 dark:text-gray-200">
              {generatedNote}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AINotes;
