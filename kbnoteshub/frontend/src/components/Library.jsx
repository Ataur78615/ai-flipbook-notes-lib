import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import ReactPageFlip from 'react-pageflip';
import FlipBook from './FlipBook';
import FlipbookNotes from './FlipbookNotes';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

const Library = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const flipbookRef = useRef(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('https://ai-flipbook-notes-lib.onrender.com');
        setNotes(res.data);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleNext = useCallback(() => {
    if (flipbookRef.current && currentPage < notes.length + 1) {
      flipbookRef.current.flipNext();
    }
  }, [currentPage, notes.length]);

  const handlePrev = useCallback(() => {
    if (flipbookRef.current && currentPage > 0) {
      flipbookRef.current.flipPrev();
    }
  }, [currentPage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-xl text-blue-600">Loading library...</div>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 p-6">
        <BookOpen className="w-16 h-16 text-gray-400 mb-4" aria-label="Book icon" />
        <h2 className="text-3xl font-bold text-gray-700 mb-2">No Notes Available</h2>
        <p className="text-gray-500 mb-4">Create some notes to see them appear here!</p>
        <a
          href="#ainotes"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Create First Note
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 mt-10">
          Your Digital Flipbook
        </h1>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            aria-label="Previous Page"
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full transition ${
              currentPage === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-100'
            }`}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentPage >= notes.length + 1}
            aria-label="Next Page"
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full transition ${
              currentPage >= notes.length + 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-100'
            }`}
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Flipbook Component */}
          <ReactPageFlip
            width={550}
            height={700}
            size="stretch"
            showCover={true}
            className="shadow-2xl mx-auto"
            ref={flipbookRef}
            onFlip={(e) => {
              if (e?.data !== undefined) {
                setCurrentPage(e.data);
              }
            }}
          >
            {/* Front Cover */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-full flex flex-col justify-center items-center text-white p-8">
              <BookOpen className="w-16 h-16 mb-4" />
              <h2 className="text-4xl font-bold mb-2">My Notes Collection</h2>
              <p className="text-xl">{notes.length} notes</p>
               <FlipBook /> 
            </div>

            {/* Note Pages */}
            {notes.map((note, index) => (
              <div key={note._id || index} className="bg-white h-full p-8 flex flex-col justify-between overflow-auto">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{note.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">By {note.author || 'Anonymous'}</p>
                  <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
                </div>
                <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                  <FlipbookNotes />
                </div>
              </div>
            ))}

            {/* Back Cover */}
            <div className="bg-gray-100 h-full flex flex-col justify-center items-center p-8">
              <BookOpen className="w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">The End</h3>
              <p className="text-gray-500">Your digital flipbook collection</p>
            </div>
          </ReactPageFlip>
        </div>

        {/* Page Indicator */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center space-x-2">
            {Array.from({ length: notes.length + 2 }).map((_, index) => (
              <button
                key={index}
                onClick={() => flipbookRef.current?.flip(index)}
                aria-label={`Go to page ${index + 1}`}
                className={`w-3 h-3 rounded-full transition ${
                  currentPage === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
