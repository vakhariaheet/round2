import { useEffect, useState } from 'react';
import SearchBar from '../components/ui/SearchBar';
import axios from 'axios';
import { IGoogleBooksResponse } from '../lib/googleTypes';
import BookCard, { Book } from '../components/ui/BookCard';
import { useNavigate } from 'react-router-dom';
import { IBookDetail } from './SearchBooks';
import ApiService, { Response } from '../lib/ApiService';



const Home = () => {
	const [trendingBooks, setTrendingBooks] = useState<Book[]>([]);
    const [ newArrivalBooks, setNewArrivalBooks ] = useState<Book[]>([])

    const navigate = useNavigate();
	useEffect(() => {
		const fetchBooks = async (order:string) => {
			const data = await axios.get<IGoogleBooksResponse>(
				`https://www.googleapis.com/books/v1/volumes?q=subject:Romance&maxResults=6&orderBy=${order}`,
			);
            const isbn = data.data.items.map((book) => {
                return book.volumeInfo.industryIdentifiers?.[0].identifier;
            });
            const backendBooks: {
                [isbn: string]: IBookDetail
            } = {};
            const backendBookInfo = await ApiService.post<Response<IBookDetail[]>>('books/details/', {
                books_isbn: isbn
            });
           
            if(backendBookInfo.data.data.length >0)
                backendBookInfo.data.data?.forEach((book) => {
                console.log(book);
                backendBooks[book.isbn] = book;
            });           
            const books: Book[] = data.data.items.filter(v => v.volumeInfo.industryIdentifiers?.[ 0 ].identifier).map((book) => {
                
                return {
                    title: book.volumeInfo.title,
                    description: book.volumeInfo.description || '',
                    author: book.volumeInfo.authors,
                    publishedDate: book.volumeInfo.publishedDate,
                    categories: book.volumeInfo.categories,
                    thumbnail: book.volumeInfo.imageLinks?.thumbnail,
                    isbn: book.volumeInfo.industryIdentifiers?.[ 0 ].identifier || '',
                    count: backendBooks[ book.volumeInfo.industryIdentifiers?.[ 0 ].identifier || '' ]?.count || 0,
                    arriving_date: backendBooks[ book.volumeInfo.industryIdentifiers?.[ 0 ].identifier || '' ]?.arriving_date || '',
                }
            });
            return books;
        };
        
        fetchBooks('relevance').then((books) => setTrendingBooks(books));
        fetchBooks('newest').then((books) => setNewArrivalBooks(books));
	}, []);
    

	return (
		<div className=''>
            <SearchBar onClick={(q) => {
                navigate(`/search?q=${q}`);
            }} />
			<div className='flex'>
				<div className='p-4 w-1/2'>
					<h1 className='text-4xl mb-4 font-bold text-center'>
						Trending Books
					</h1>
					<div className='flex flex-wrap gap-8 justify-center'>
						{trendingBooks.map((book) => (
							<BookCard isMyProfile={false} book={book}/>
						))}
					</div>
				</div>
				<div className='p-4 w-1/2'>
					<h1 className='text-4xl mb-4 font-bold text-center'>
						New Arrivals
					</h1>
					<div className='flex flex-wrap gap-4 justify-center '>
						{newArrivalBooks.map((book) => (
							<BookCard isMyProfile={false} book={book}/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
