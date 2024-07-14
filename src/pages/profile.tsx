import React, { useState, useEffect } from 'react';
import Avatar from 'boring-avatars';

interface UserProfileProps {
  userId: string;
  userName: string;
  userRole: string;
  userEmail: string;
}

const Profile: React.FC<UserProfileProps> = ({ userId, userName, userRole, userEmail }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Handle search logic
    console.log(`Searching for: ${searchQuery}`);
  };

  useEffect(() => {
    // Perform any initialization logic if needed
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 font-sans">
      <header className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold">
          📚 Public Library
        </div>
        <div className="flex items-center">
          <span className="mr-4 text-2xl">🔔</span>
          <button className="bg-green-500 text-white px-4 py-2 rounded">Signout</button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <main className="w-full lg:w-3/4">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Search Books</h2>
            <div className="flex">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Odoo Development" 
                className="flex-grow border p-2" 
              />
              <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2">Search</button>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">My Books</h2>
            <div className="flex bg-gray-100 p-4 rounded">
              <img src="book-cover-placeholder.jpg" alt="Book cover" className="w-24 h-36 object-cover mr-4" />
              <div>
                <h3 className="font-semibold mb-2">Odoo 14 Development Cookbook: Rapidly build, customize, and ...</h3>
                <p className="text-sm mb-2">With over 200 recipes covering real-world examples, you'll learn how to take your Odoo development skills to the next level and solve complex business problems...</p>
                <span className="bg-orange-500 text-white text-sm px-2 py-1 rounded">3 Days Remaining</span>
              </div>
            </div>
          </div>
        </main>

        <aside className="w-full lg:w-1/4">
          <div className="bg-gray-100 p-4 mb-6 rounded">
            <h2 className="text-xl font-semibold mb-4">User Profile</h2>
            <Avatar
              name={userName}
              size={50}
              variant="beam"
              colors={['#A3A948', '#EDB92E', '#F85931', '#CE1836', '#009989']}
            />
            <h3 className="font-semibold">{userName}</h3>
            <p className="text-sm">{userRole}</p> 
            <p className="text-sm mb-2">{userEmail}</p> 
            <p className="text-sm mb-2">{userId}</p> 
            <a href="#" className="text-blue-500">Edit information</a>
          </div>

          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-semibold mb-4">Your contact</h2>
            <p className="text-sm">{userName}</p>
            <p className="text-sm">{userEmail}</p>
            <p className="text-sm">{userRole}</p>
            <p className="text-sm">{userId}</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Profile;
