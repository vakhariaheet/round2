import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import SearchBar from "../components/ui/SearchBar";
import ApiService, { getSearch, Response } from "../lib/ApiService";
import { IGoogleBooksResponse } from "src/lib/googleTypes";
import axios from "axios";
import BookCard, { Book } from "../components/ui/BookCard";

export interface IBookDetail {
    id: string;
    isbn: string;
    count: number;
    arriving_date: string;

}

const SearchBook = () => {
    const [ searchParams ] = useSearchParams();
    const [results , setResults] = useState<Book[]>([]);
    const search = getSearch(searchParams) || '';

    useEffect(() => {
        
        const fetchBooks = async () => {
            const data = await axios.get<IGoogleBooksResponse>(
                `https://www.googleapis.com/books/v1/volumes?q=${search.q}&orderBy=relevance`,
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

            console.log(backendBooks);
           
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

        }
        fetchBooks().then((books) => setResults(books));
    },[search.q])
    return (
        <div>
            <SearchBar onClick={() => {}} />
            <div className="flex mt-5 flex-wrap gap-4 justify-center">
                {
                    results.map((book) => (
                        <BookCard isMyProfile={false} book={book} />
                    ))
                } 
            </div>
        </div>
    )


}

export default SearchBook;