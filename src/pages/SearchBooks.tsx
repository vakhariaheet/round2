import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import SearchBar from "../components/ui/SearchBar";
import { getSearch } from "../lib/ApiService";
import { IGoogleBooksResponse } from "src/lib/googleTypes";
import axios from "axios";
import BookCard, { Book } from "../components/ui/BookCard";

const SearchBook = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
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
            console.log(isbn);
            const books: Book[] = data.data.items.map((book) => {
                return {
                    title: book.volumeInfo.title,
                    description: book.volumeInfo.description || '',
                    author: book.volumeInfo.authors,
                    publishedDate: book.volumeInfo.publishedDate,
                    categories: book.volumeInfo.categories,
                    thumbnail: book.volumeInfo.imageLinks?.thumbnail,
                }
            });
            return books;

        }
        fetchBooks().then((books) => setResults(books));
    },[search.q])
    return (
        <div>
            <SearchBar path={'/search'} />
            <div className="flex mt-5 flex-wrap gap-4 justify-center">
                {
                    results.map((book) => (
                        <BookCard book={book} />
                    ))
                } 
            </div>
        </div>
    )


}

export default SearchBook;