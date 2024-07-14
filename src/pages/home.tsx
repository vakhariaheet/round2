import { useEffect, useState } from 'react';
import SearchBar from '../components/ui/SearchBar';
import axios from 'axios';
import { IGoogleBooksResponse } from '../lib/googleTypes';
import BookCard, { Book } from '../components/ui/BookCard';



const Home = () => {
	const [trendingBooks, setTrendingBooks] = useState<Book[]>([]);
    const [newArrivalBooks,setNewArrivalBooks] = useState<Book[]>([])
	useEffect(() => {
		const fetchBooks = async (order:string) => {
			const data = await axios.get<IGoogleBooksResponse>(
				`https://www.googleapis.com/books/v1/volumes?q=subject:Thriller&maxResults=6&orderBy=${order}`,
			);
			const books: Book[] = data.data.items.map((book) => {
				return {
					title: book.volumeInfo.title,
					description: book.volumeInfo.description || '',
					author: book.volumeInfo.authors,
					publishedDate: book.volumeInfo.publishedDate,
					categories: book.volumeInfo.categories,
					thumbnail: book.volumeInfo.imageLinks?.thumbnail,
				};
			});
			return books;
        };
        
        fetchBooks('relevance').then((books) => setTrendingBooks(books));
        fetchBooks('newest').then((books) => setNewArrivalBooks(books));
	}, []);
    

	return (
		<div className=''>
			<SearchBar path="/search" />
			<div className='flex'>
				<div className='p-4 w-1/2'>
					<h1 className='text-4xl mb-4 font-bold text-center'>
						Trending Books
					</h1>
					<div className='flex flex-wrap gap-8 justify-center'>
						{trendingBooks.map((book) => (
							<BookCard book={book}/>
						))}
					</div>
				</div>
				<div className='p-4 w-1/2'>
					<h1 className='text-4xl mb-4 font-bold text-center'>
						New Arrivals
					</h1>
					<div className='flex flex-wrap gap-4 justify-center '>
						{newArrivalBooks.map((book) => (
							<BookCard book={book}/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
