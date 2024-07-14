import React from 'react';

const Profile: React.FC = () => {
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
      
      <div className="flex gap-8">
        <main className="w-3/4">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Search Books</h2>
            <div className="flex">
              <input type="text" placeholder="Odoo Development" className="flex-grow border p-2" />
              <button className="bg-blue-500 text-white px-4 py-2">Search</button>
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
        
        <aside className="w-1/4">
          <div className="bg-gray-100 p-4 mb-6 rounded">
            <h2 className="text-xl font-semibold mb-4">User Profile</h2>
            <img src="profile-placeholder.jpg" alt="Profile" className="w-24 h-24 rounded-full object-cover mb-4" />
            <h3 className="font-semibold">Mitchell Admin</h3>
            <p className="text-sm">YourCompany</p>
            <p className="text-sm">215 Vine St<br />Scranton PA 18503<br />United States</p>
            <p className="text-sm">+1 555-555-5555</p>
            <p className="text-sm mb-2">admin@yourcompany.example.com</p>
            <a href="#" className="text-blue-500">Edit information</a>
          </div>
          
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-semibold mb-4">Your contact</h2>
            <p className="text-sm">Mitchell Admin</p>
            <p className="text-sm">admin@yourcompany.example.com</p>
            <p className="text-sm">+1 555-555-5555</p>
            <p className="text-sm">Scranton</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Profile;