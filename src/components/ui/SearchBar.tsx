import { useState } from 'react';
import { Input } from './input';
import { Button } from './button';
import {  useSearchParams } from 'react-router-dom';



// const TRENDING_BOOKS = [
//     {
//         title: 'Odoo 14 Development Cookbook: Rapidly build, customize, and ...',
//         description: 'With over 200 recipes covering real-world examples, you\'ll learn how to take your Odoo development skills to the next level and solve complex business problems...',
        
//     }
// ];


const SearchBar = ({onClick}) => {
	
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ q, setQ ] = useState(searchParams.get('q') || '');
	return (
		<div className='flex justify-center'>
			<div className='flex w-[80%]   items-center space-x-2'>
				<Input type='Search Book' placeholder='Search' value={q} onChange={(e) => setQ(e.target.value)} />
                <Button
                    onClick={() => {
                        
                        setSearchParams({ q });
                        onClick && onClick(q);
                    }}
                >Search</Button>
            </div>
            
		</div>
	);
};

export default SearchBar;