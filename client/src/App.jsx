import React from "react"
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { logo } from './assets';
import { Home, CreatePost } from './pages';
import { motion, useMotionTemplate } from 'framer-motion';


export default function App() {
  const backgroundImage = useMotionTemplate`radial-gradient(50% 50% at 50% 50%,#DD335C  1%, #020617)`;
  return (
    <motion.section style={{ backgroundImage }} className="box-content p-2">
      <BrowserRouter>
        <header className="navbar">
          <Link to="/">
            <img src={logo} alt="logo" className="object-contain w-28" />
          </Link>

          <Link to="/create-post">
            <motion.button
              className="relative px-6 py-2 rounded-xl radial-gradient"
              initial={{ "--x": "100%", scale: 1 }}
              animate={{ "--x": "-100%" }}
              whileTap={{ scale: 0.85 }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 1,
                type: "spring",
                stiffness: 20,
                damping: 15,
                mass: 2,
                scale: {
                  type: "spring",
                  stiffness: 10,
                  damping: 5,
                  mass: 0.1,
                }
              }}
            >

              <span
                className="relative block w-full h-full font-light tracking-wider text-neutral-100 linear-mask"
              >
                Create
              </span>
              <span
                className="absolute inset-0 block p-px rounded-xl linear-overlay"
              />
            </motion.button>
          </Link>

        </header>
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </main>
      </BrowserRouter>
    </motion.section>
  )
}