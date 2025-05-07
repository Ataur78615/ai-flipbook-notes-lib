import React, { useState, useRef } from 'react';
import ReactPageFlip from 'react-pageflip';
import { BookOpen, Bookmark, Share2 } from 'lucide-react';

const FlipBook = () => {
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const audioRef = useRef(null); // 👈 Audio reference

  const handleAddNote = () => {
    if (!noteTitle.trim() || !noteContent.trim()) return;

    const newNote = {
      _id: Date.now().toString(),
      title: noteTitle,
      content: noteContent,
      author: 'Ataur',
      createdAt: new Date().toISOString(),
    };

    setNotes([newNote, ...notes]);
    setNoteTitle('');
    setNoteContent('');
  };

  const playFlipSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => {
        console.log('Audio play error:', e);
      });
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-6">
      {/* 👇 Audio Element */}
      <audio ref={audioRef} src="/PageFlip.ogg" preload="auto" />

      {/* 👇 Input Section */}
      <div className="w-full max-w-2xl mb-6 bg-white shadow-md p-6 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Create a New Note</h2>
        <input
          type="text"
          placeholder="Enter note title"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <textarea
          placeholder="Write or paste your note content here..."
          className="w-full h-40 border border-gray-300 rounded px-4 py-2 mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />
        <button
          onClick={handleAddNote}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Note
        </button>
      </div>

      {/* 👇 Flipbook for Desktop */}
      <div className="hidden md:block">
        <ReactPageFlip
          width={700}
          height={700}
          showCover={true}
          mobileScrollSupport={false}
          className="shadow-2xl"
          onFlip={playFlipSound} // 👈 Play sound on page flip
        >
          {/* Front Cover */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-full flex flex-col justify-center items-center text-white p-8">
            <BookOpen className="w-16 h-16 mb-4" />
            <h2 className="text-4xl font-bold mb-2">My Notes Collection</h2>
            <p className="text-xl text-blue-100">{notes.length} notes</p>
          </div>

          {/* Pages */}
          {notes.map((note) => (
            <div key={note._id} className="bg-white h-full p-8">
              <div className="h-full flex flex-col">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{note.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">By {note.author}</p>
                  <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-3">
                    <Bookmark className="w-5 h-5 text-gray-400" />
                    <Share2 className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
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

      {/* 👇 Mobile View */}
      <div className="md:hidden w-full max-w-2xl mt-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white text-center rounded-t-lg">
          <h2 className="text-2xl font-bold mb-2">My Notes Collection</h2>
          <p className="text-blue-100">{notes.length} notes</p>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 bg-gray-50">
          {notes.map((note) => (
            <div key={note._id} className="bg-white rounded-lg shadow-md border border-gray-200 p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{note.title}</h3>
              <p className="text-gray-500 text-sm mb-3">By {note.author}</p>
              <p className="text-gray-600 line-clamp-3 mb-4">{note.content}</p>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>
                <div className="flex space-x-2">
                  <Bookmark className="w-4 h-4 text-gray-400" />
                  <Share2 className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-100 p-4 text-center text-gray-500 rounded-b-lg">
          <BookOpen className="w-6 h-6 mx-auto mb-1" />
          <p className="text-sm">Your digital collection</p>
        </div>
      </div>
    </div>
  );
};

export default FlipBook;
