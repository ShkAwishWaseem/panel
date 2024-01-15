import React, { useState, useEffect } from 'react';
import { app } from './firebase';
import { getDatabase, ref, push } from 'firebase/database';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [imgSource, setImgSource] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get a reference to the 'courses' node in Firebase Realtime Database
    const db = getDatabase(app);
    const coursesRef = ref(db, 'courses');

    // Push course data to the database
    push(coursesRef, {
      img_source: imgSource,
      title,
      text,
    });

    // Clear form fields
    setImgSource('');
    setTitle('');
    setText('');
  };

  return (
    <div className='container'>
      <h1 className='text-center color fw-bold'>UstazPortal Panel</h1>
     
     <Link to="/enroll" className='btn btn-warning'>Enrolled Students</Link>
      <Link to="/contact" className='btn mx-3 btn-success'>ContactUs Students</Link>
      <Link to="/users" className='btn  btn-primary'>Democlass Students</Link>

      <p className='paragraph fw-bold text-center'>Please Add Courses * </p>

      <div className='container '>
        <div className='row col_demo'>
          <div className='col-md-6 order-md-1 order-2'>
            <form onSubmit={handleSubmit} className='course-form'>
              <div className='mb-3'>
                <label htmlFor='imgSource' className='form-label'>
                  Image Source:
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='imgSource'
                  value={imgSource}
                  onChange={(e) => setImgSource(e.target.value)}
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='title' className='form-label'>
                  Title:
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='text' className='form-label'>
                  Text:
                </label>
                <textarea
                  className='form-control'
                  id='text'
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                />
              </div>
              <button type='submit' className='btn btn-success'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
