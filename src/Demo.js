import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Adjust the path accordingly
import { ref, get, child } from 'firebase/database';
import './Demo.css'; // Import the CSS file

const Demo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const databaseRef = ref(db, 'enrollment'); // Replace 'your_collection' with your actual collection name
        const snapshot = await get(child(databaseRef, '/'));

        const dataArray = [];
        snapshot.forEach(childSnapshot => {
          dataArray.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });

        console.log('Fetched data:', dataArray); // Log fetched data to the console

        setData(dataArray);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalUsers = data.length;

  return (
    <div className="Demo-container">
     <h1>Demo Class  Students</h1>
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        <div>
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Country</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.country}</td>
                  <td>{item.course}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total-users">Total Users: {totalUsers}</p>
        </div>
      )}
    </div>
  );
};

export default Demo;
