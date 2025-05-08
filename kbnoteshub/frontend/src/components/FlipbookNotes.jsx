import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight, BookOpen, Bookmark, Share2 } from 'lucide-react';

const FlipbookNotes = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('public');
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`https://ai-flipbook-notes-lib.onrender.com`);
        setNotes(res.data);
        setCurrentPage(0);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setError("Failed to load notes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [filter]);

  const playFlipSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleNext = () => {
    if (currentPage < notes.length - 1) {
      setCurrentPage(currentPage + 1);
      playFlipSound();
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      playFlipSound();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-xl text-blue-600">Loading your flipbook...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-xl">
        {error}
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 p-6">
        <BookOpen className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-2xl font-bold text-gray-600 mb-2">No notes yet</h3>
        <p className="text-gray-500">Create your first note to see it appear here!</p>
      </div>
    );
  }

  const note = notes[currentPage];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#FFEBEE] to-[#FFF3E0] p-4 md:p-6 font-[Inter]">
      {/* Flip Sound */}
      <audio ref={audioRef} src="/PageFlip.ogg" preload="auto" />

      {/* Book Frame */}
      <div className="relative w-full max-w-4xl h-[75vh] bg-white border-8 border-blue-200 rounded-xl shadow-2xl overflow-hidden transition-all duration-500">
        <div className="absolute top-0 left-0 w-2 bg-yellow-500 h-full shadow-inner"></div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 pl-10 pr-10 transition-opacity duration-500 ease-in-out animate-fade-in">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900">{note.title}</h2>
              <p className="text-sm text-gray-500 mt-1">By {note.author || 'Anonymous'}</p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => alert("Bookmark feature coming soon!")} className="p-2 rounded-full hover:bg-blue-100 transition">
                <Bookmark className="w-5 h-5 text-gray-600" />
              </button>
              <button onClick={() => alert("Share feature coming soon!")} className="p-2 rounded-full hover:bg-blue-100 transition">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="text-[1.05rem] text-gray-800 whitespace-pre-wrap leading-relaxed font-medium">
            {note.content}
          </div>

          <div className="absolute bottom-4 right-6 text-xs text-gray-400 italic">
            {new Date(note.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Filter Info */}
      <p className="mt-4 text-sm text-gray-600">
        Viewing <strong>{filter}</strong> notes
      </p>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center w-full max-w-4xl mt-8 px-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow transition ${
            currentPage === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <ChevronLeft className="w-5 h-5" /> Previous
        </button>

        <div className="text-center">
          <p className="text-gray-700 font-medium text-lg">
            Page {currentPage + 1} of {notes.length}
          </p>
          <div className="flex justify-center mt-2 space-x-1">
            {notes.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentPage(index);
                  playFlipSound();
                }}
                className={`w-3 h-3 rounded-full transition ${
                  index === currentPage ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === notes.length - 1}
          className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow transition ${
            currentPage === notes.length - 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Next <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Toggle */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setFilter('public')}
          className={`px-4 py-2 text-sm rounded-lg font-medium shadow transition ${
            filter === 'public' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Public Notes
        </button>
        <button
          onClick={() => setFilter('private')}
          className={`px-4 py-2 text-sm rounded-lg font-medium shadow transition ${
            filter === 'private' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          My Private Notes
        </button>
      </div>
    </div>
  );
};

export default FlipbookNotes;
