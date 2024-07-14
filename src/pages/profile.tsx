import React, { useState, useEffect } from 'react';
import Avatar from 'boring-avatars';
import useAuth from '../components/hooks/useAuth';
import ApiService, { Response } from '../lib/ApiService';
import axios from 'axios';
import { IGoogleBooksResponse } from '../lib/googleTypes';
import {PhoneCall,Mail,User,BookUser} from 'lucide-react'
import BookCard, { Book } from '../components/ui/BookCard';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/ui/SearchBar';
import EditUser from '../components/ui/editUser';

const Profile = () => {
  const [searchParams] = useSearchParams('');
  const { user } = useAuth();
  const { username, role, email, phone, address } = user; 
  const [books, setBooks] = useState<Book[]>([]);

  const handleSearch = () => {
    
  };

  useEffect(() => {
    (async () => {
      const { data } = await ApiService.get<Response<{
        isbn: string;
        issue_date: string;
        return_date: string;
      }[]>>('books/list?username=' + username);
      const books = await Promise.all(data.data.map(async (book) => {
        return {
          ...(await getBook(book.isbn)),
          ...book
        };
      }));
      console.log(books);
      setBooks(books);
    })()
  }, []);

  const getBook = async (isbn: string) => {
    const { data } = await axios.get<IGoogleBooksResponse>('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn);
    const currentBook = data.items[0];
    const book = {
      title: currentBook.volumeInfo.title,
      description: currentBook.volumeInfo.description || '',
      author: currentBook.volumeInfo.authors,
      publishedDate: currentBook.volumeInfo.publishedDate,
      categories: currentBook.volumeInfo.categories,
      thumbnail: currentBook.volumeInfo.imageLinks?.thumbnail,
      isbn: currentBook.volumeInfo.industryIdentifiers?.[0].identifier || '',
    }
    return book;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 font-sans">
      <div className="flex flex-col lg:flex-row gap-8">
        <main className="w-full lg:w-3/4">
          <SearchBar onClick={handleSearch} />

          <div className='mt-4'>
            <h2 className="text-2xl font-semibold mb-4">My Books</h2>
            <div className="flex">
              {
                books.filter(book => book.title.toLowerCase().includes(searchParams.get('q')?.toLowerCase() || '')).map(book => (
                  <BookCard book={book} isMyProfile={true} />
                ))
              }
            </div>
          </div>
        </main>

        <aside className="w-full lg:w-1/4">
          <div className="bg-gray-100 p-4 mb-6 rounded">
            <h2 className="text-xl font-semibold mb-4">User Profile</h2>
            <Avatar
              name={user.username}
              size={50}
              variant="beam"
              colors={['#A3A948', '#EDB92E', '#F85931', '#CE1836', '#009989']}
            />
            <h3 className="font-semibold">{username}</h3>
            <p className="text-sm flex items-center">
              <User
                size={16}
                className="mr-2"
              />
              {role}</p>
            <p className="text-sm flex items-center mb-2">
              <Mail
                size={16}
                className="mr-2"
              />
              {email}
            </p>
            <p className="text-sm mb-2 flex items-center">
              <PhoneCall
                size={16}
                className="mr-2"
              />
              {phone}</p> 
            <p className="text-sm mb-2 flex items-center">
              <BookUser/>
              {address}</p>          
            <EditUser/>
          </div>

         
        </aside>
      </div>
    </div>
  );
};

export default Profile;
