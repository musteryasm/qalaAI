import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await 
        response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64, ${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  }; 

  const handleSubmit = async (e) => {
    // for browser to not auto reload
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form), //fptm
        })

        await response.json();
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err + response.body);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return ( 
    <section className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center justify-center h-screen">
        <div>
          <h1 className="font-extrabold text-yellow-700 text-2xl md:text-4xl max-w-[5000px] text-center">Generate your very own AI-inspired image design!!</h1>
          <p className="mt-2 text-yellow-700 text-lg md:text-xl max-w-[5000px] text-center">Unleash your creativity and generate a mesmerizing image with the help of QalaAI</p>
        </div>
  
        <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Your Name"
              type="text"
              name="name"
              placeholder="Eg. Kanchan Dabre"
              value={form.name}
              handleChange={handleChange}
            />
  
            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="Nature painting"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />
  
            <div className="relative bg-white border border-white text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-96 p-4 h-96 flex justify-center items-center mx-auto">
              { form.photo ? (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  className="w-9/12 h-9/12 object-contain opacity-40"
                />
              )}
  
              {generatingImg && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                  <Loader />
                </div>
              )}
            </div>
          </div>
          <div className="mt-5 flex gap-5 justify-center">
            <button
              type="button"
              onClick={generateImage}
              className="text-white bg-yellow-700 font-medium rounded-md text-sm w-40 sm:w-auto px-5 py-3.5 text-center border border-white"
            >
              {generatingImg ? 'Generating...' : 'Generate'}
            </button>
          </div>
  
          <div className="mt-10 justify-center">
            <p className="mt-2 text-yello-700 text-[17px] text-center">** Once you have created the image you want, you can share it with others in the community **</p>
            <center><button type="submit"
  className="mt-3 text-yellow-700 bg-rose-100 font-medium rounded-md text-sm w-48 sm:w-auto px-60 py-2.5 text-center mx-auto border border-white">
            
  {loading ? 'Sharing...' : 'Share with the Community'}
</button></center>

          </div>
        </form>
      </div>
    </section>
  );
  
};

export default CreatePost;