import React, { useEffect } from "react"
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { logo } from './assets';
import { Home, CreatePost } from './pages';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import { Stars } from '@react-three/drei';
import {Canvas} from '@react-three/fiber';


const COLORS = ['#13FFAA', '#1E67C6', '#CE84CF', '#DD335C'];
export default function App() {
  const color = useMotionValue(COLORS[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(50% 50% at 50% 50%,${color}  1%, #020617)`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0 0 4px ${color}`;
  useEffect(() => {
    animate(color, COLORS, {
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut'
    })
  })

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
              whileHover={{ scale: 1.05 }}
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
        <div className="absolute inset-0 z-0 h-[100%] top-20">
          <Canvas>
            <Stars radius={100} depth={10} count={5000} factor={2} saturation={0} fade speed={1} />
          </Canvas>
        </div>
      </BrowserRouter>
    </motion.section>
  )
}