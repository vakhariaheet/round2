import { Badge } from "./badge";

export interface Book {
	title: string;
	description?: string;
	author?: string[];
	publishedDate?: string;
	categories?: string[];
	thumbnail?: string;
}
const BookCard = ({ book }: { book: Book }) => {
	return (
		<div className='relative flex w-full items-center rounded-md max-w-[20rem] flex-col  text-gray-700 shadow-lg'>
			<div className='relative mx-4 mt-4  '>
				<img
					src={book.thumbnail}
					className=' w-auto h-60 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40'
					alt='ui/ux review check'
				/>
				<div className='absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60'></div>
			</div>
			<div className='p-6'>
				<div className='flex flex-col gap-4 justify-between mb-3'>
					<h5 className='block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900'>
						{book.title}
					</h5>
					<div className='flex gap-4'>
						{book.author?.map((author, index) => (
							<Badge key={index}>{author}</Badge>
						))}
					</div>
				</div>
				<p className='block font-sans text-base antialiased font-light leading-relaxed text-gray-700'>
					{book.description && book.description?.length > 150
						? book.description.slice(0, 150) + '...'
						: book.description}
				</p>
			</div>
			<div className='p-6 pt-3 flex gap-4'>
				<button
					className='block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
					type='button'
				>
					Borrow
				</button>
				<button
					className='block w-full select-none rounded-lg bg-blue-300 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
					type='button'
				>
					Follow
				</button>
			</div>
		</div>
	);
};

export default BookCard;