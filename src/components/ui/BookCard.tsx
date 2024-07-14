import { Badge } from './badge';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../../components/ui/tooltip';

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../../components/ui/dialog';
import { Button } from './button';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ApiService, { Response } from '../../lib/ApiService';
import { useToast } from './use-toast';



export interface Book {
	title: string;
	description?: string;
	author?: string[];
	publishedDate?: string;
	categories?: string[];
	thumbnail?: string;
	count?: number;
    arriving_date?: string;
    isbn?: string;
}
const BookCard = ({ book, isMyProfile=false }: { book: Book,isMyProfile:boolean }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const onBorrow = async () => {
        if (!user.id) navigate('/login');
        
        const resp = await ApiService.post<Response<{
            user: string;
            isnb: string;
            issue_date: string;
            return_date:string
        }>>('books/issue/', {
            isbn: book.isbn
        }, {
            protected: true
        });
        if (resp.data.isSuccess) {
            toast({
                title: 'Book Issued',
                description: `Book ${book.title} has been issued to you`,
               
            })
            navigate('/profile');
        }

        
    };
    const onReturn = async () => { 
        const resp = await ApiService.put<Response<{
            user: string;
            isnb: string;
            issue_date: string;
            return_date:string
        }>>('books/update/', {
            isbn: book.isbn
        }, {
            protected: true
        });
        if (resp.data.isSuccess) {
            toast({
                title: 'Book Returned',
                description: `Book ${book.title} has been returned`,
               
            })
            navigate('/profile');
        }
    
    }
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
				<div className='flex flex-col '>
					<div className='flex gap-4 justify-between mb-3'>
						<h5 className='block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900'>
							{book.title}
						</h5>
						
					</div>
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
				<div className='flex mt-4'>
					{book.categories?.map((category, index) => (
						<Badge variant={'outline'} key={index}>
							{category}
						</Badge>
					))}
				</div>
			</div>
            {isMyProfile ? 
                <div className="p-6 pt-3 flex gap-4">
                    <Button onClick={onReturn}>
                        Return
                    </Button>
                </div>
            : <div className='p-6 pt-3 flex gap-4'>
				<Dialog>
					<DialogTrigger>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<button
										className='block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
										type='button'
										disabled={book.count === 0}
									>
										Borrow
									</button>
								</TooltipTrigger>
								{book.count === 0 && !book.arriving_date && (
									<TooltipContent>
										<span className='text-red-500'>Out of stock</span>
									</TooltipContent>
								)}
								{book.arriving_date && book.count === 0 && (
									<TooltipContent>
										<span className='text-blue-500'>
											Arriving on {book.arriving_date}
										</span>
									</TooltipContent>
								)}
							</Tooltip>
						</TooltipProvider>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Borrow {book.title }</DialogTitle>
                            <DialogDescription>
                                Do you want to borrow this book for 7 days
                            </DialogDescription>
                            
                            <DialogClose />
                        </DialogHeader>
                        <DialogFooter>
                            <Button onClick={onBorrow}>Borrow</Button>
                        </DialogFooter>
                    </DialogContent>
				</Dialog>
				<button
					className='block w-full select-none rounded-lg bg-blue-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
					type='button'
				>
					Follow
				</button>
			</div>}
		</div>
	);
};

export default BookCard;
