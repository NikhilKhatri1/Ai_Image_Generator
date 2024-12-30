import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components'
import { motion, useMotionTemplate } from 'framer-motion';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: form.name,
            prompt: form.prompt,
            photo: form.photo, // Base64 image string
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to create a post');
        }

        const data = await response.json();
        if (data.success) {
          navigate('/'); // Navigate back to the main page after success
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter a prompt and generate an image');
    }
  };


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt })
  }
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', { // Use updated endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to generate image');
        }

        const data = await response.json();
        setForm({ ...form, photo: data.photo });
      } catch (error) {
        alert(error.message);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  };

  return (
    <section className='mx-auto max-w-7xl'>
      <div>
        <h1 className="font-light text-gray-100 text-7xl">Create</h1>
        <p className="mt-2 text-neutral-200 text-[18px] max-w-[500px] tracking-wider font-light">Generate an imaginative image through Clipdrop AI and share it with the community</p>
      </div>
      <form className="max-w-3xl mt-16" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative flex items-center justify-center w-64 h-64 p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="object-contain w-full h-full"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="object-contain w-9/12 h-9/12 opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-5 mt-5">
          <motion.button
            type="button"
            onClick={generateImage}
            className="relative px-6 py-2 rounded-xl radial-gradient-1"
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
              {generatingImg ? 'Generating...' : 'Generate'}
            </span>
            <span
              className="absolute inset-0 block p-px rounded-xl linear-overlay-1" />

          </motion.button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-neutral-200 text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
          <button
            type="submit"
            className="mt-3 text-white rounded-xl font-sans font-light tracking-widest  bg-teal-600/90 hover:bg-teal-700/90 active:bg-teal-600/90 w-full sm:w-auto px-5 py-2.5 text-center ring-1 ring-inset ring-teal-600/45"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost