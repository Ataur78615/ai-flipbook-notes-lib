import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

const Home = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col justify-center items-center px-4 py-16 text-center overflow-hidden"
    >
      {/* Animated Background Gradient */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 z-0"
      />

      {/* 3D Star Background */}
      <div className="absolute inset-0 z-10 opacity-20">
        <Canvas>
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          <Stars radius={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, x: Math.random() * 100 - 50 }}
          animate={{ 
            y: [0, 100, 0],
            x: [Math.random() * 100 - 50, Math.random() * 100 - 50]
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute rounded-full bg-white/10 backdrop-blur-sm"
          style={{
            width: `${Math.random() * 5 + 2}px`,
            height: `${Math.random() * 5 + 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Welcome to <span className="text-white drop-shadow-lg">KB NotesHub</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl md:text-3xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Revolutionize your note-taking with <span className="font-bold text-cyan-300">AI-powered</span> tools that organize, suggest, and collaborate for you.
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <span className="relative z-10">Get Started Free</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button className="px-10 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                See Demo
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 text-white/80"
        >
          {['AI Suggestions', 'Real-time Sync', 'Markdown Support', 'Team Collaboration'].map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10"
            >
              <div className="text-cyan-400 text-2xl mb-2">✨</div>
              <p>{feature}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-20 flex flex-wrap justify-center items-center gap-6 text-white/60"
        >
          <p>Trusted by creators at</p>
          <div className="flex gap-6">
            {['Google', 'Microsoft', 'Notion', 'OpenAI'].map((company, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="font-medium text-white/70"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating CTA */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="fixed bottom-8 right-8 z-30"
      >
        <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
          <span>Join KbNotesHub</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            →
          </motion.span>
        </button>
      </motion.div>
    </section>
  );
};

export default Home;