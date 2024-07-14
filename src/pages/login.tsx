import React from 'react';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import useAuth from '../components/hooks/useAuth';

const loginSchema = z
	.object({
		username: z.string(),
		password: z.string().min(8),
		
	});


const Login = () => {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: '',
			password: '',
		},
		
	});
	const authHook = useAuth();
	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		const data = await authHook.login(values.username, values.password);
		console.log(data);
	}
	return (
		<div className='flex justify-center flex-col  items-center min-h-screen h-full'>
			<div className='w-full  p-8 shadow-md max-w-[30rem] border border-gray-100  rounded'>
				<h1 className='text-4xl mb-4 font-bold text-center'>Login</h1>
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
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel> Password</FormLabel>
									<FormControl>
										<Input
											type='password'
											placeholder='Password'
											className='rounded'
											{...field}
										/>
									</FormControl>
									
									<FormMessage  />
								</FormItem>
							)}
						/>
						
					
						<div className='flex items-center justify-between'>
							<Button type='submit' variant='default'>
								Submit
							</Button>
							<p className='text-muted-foreground text-sm '>
								Dont have an account?{' '}
								<Link to='/sign-up' className='text-primary underline'>
									Sign Up
								</Link>
							</p>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default Login;
