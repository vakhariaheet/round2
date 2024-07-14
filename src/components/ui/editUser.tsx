import { z } from 'zod';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../../components/ui/dialog';
import { Button } from './button';
import { Input } from './input';

import { Textarea } from './textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './form';
import useAuth from '../hooks/useAuth';
import ApiService, { Response } from '../../lib/ApiService';
import { useToast } from './use-toast';
import { IUser, setUser } from '../../Redux/Slices/UserSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const editUserSchema = z.object({
	username: z.string(),
	email: z.string().email(),
	phone: z.string().length(10),
	
	address: z.string(),
});

const EditUser = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();
	const form = useForm({
		resolver: zodResolver(editUserSchema),
		defaultValues: {
			username: user.username || '',
			email: user.email || '',
			phone: user.phone || '',
			address: user.address || '',
		},
	});

    const onSubmit = async (values: any) => {
        const { data } = await ApiService.put<Response<IUser>>('users/update/', {
            ...user,
            ...values,
        }, {
            protected: true,
        });
        if (data.isSuccess) {
            dispatch(setUser(data.data));
            toast({
                title: 'User Updated',
                description: `User ${values.username} has been updated`,
            })
            navigate('/profile');
        }
    };

	return (
		<Dialog>
			<DialogTrigger>
				<Button>Edit User</Button>
			</DialogTrigger>
			<DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
							<FormField
								control={form.control}
								name='username'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input
												placeholder='Your username'
												className='rounded'
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder='Your email'
												className='rounded'
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='phone'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone</FormLabel>
										<FormControl>
											<Input
												placeholder='Phone'
												className='rounded'
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='address'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Address</FormLabel>
										<FormControl>
											<Textarea
												id='address'
												placeholder='Your Address'
												className='rounded'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
                            />
                            <Button type='submit'>
                                Submit
                            </Button>
						</form>
					</Form>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default EditUser;

