// import React from 'react';
import { useForm } from 'react-hook-form';
// import { useGoogleLogin } from '@react-oauth/google';

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
import {  useNavigate } from 'react-router-dom';
import useAuth from '../components/hooks/useAuth';

const loginSchema = z.object({
	username: z.string(),
	password: z.string().min(8),
});

const Login = () => {
	const navigate = useNavigate();
	// const login = useGoogleLogin({
	// 	async onSuccess(tokenResponse) {
	// 		console.log(tokenResponse);
	// 		// try {
	// 		// 	await auth.googleLogin(tokenResponse);
	// 		// 	navigate('/');
	// 		// } catch (err) {
	// 		// 	console.log(err);
	// 		// }
	// 	},
	// });
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});
	const authHook = useAuth();
	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		await authHook.login(values.username, values.password);
		navigate('/');
	};
	return (
		<div className='flex justify-center flex-col  items-center min-h-screen h-full'>
			<div className='w-full  p-8 shadow-md max-w-[30rem] border border-gray-100  rounded'>
				<h1 className='text-4xl mb-4 font-bold text-center'>Login</h1>
				{/* <div className='flex justify-center'>
					<Button className='p-4' onClick={login}>
						<svg
							className='w-6 h-6 mr-2'
							viewBox='0 0 47 47'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M10.9705 28.1199L9.38876 34.0247L3.60768 34.147C1.87998 30.9425 0.900002 27.2761 0.900002 23.38C0.900002 19.6125 1.81626 16.0596 3.44038 12.9313H3.44162L8.58841 13.8749L10.843 18.9908C10.3711 20.3665 10.1139 21.8433 10.1139 23.38C10.1141 25.0478 10.4162 26.6457 10.9705 28.1199Z'
								fill='#FBBB00'
							/>
							<path
								d='M45.943 19.1356C46.2039 20.51 46.34 21.9294 46.34 23.38C46.34 25.0066 46.169 26.5933 45.8432 28.1238C44.7372 33.3319 41.8472 37.8796 37.8438 41.0979L37.8425 41.0966L31.3599 40.7659L30.4424 35.0384C33.0989 33.4805 35.1749 31.0424 36.2685 28.1238H24.1195V19.1356H36.4457H45.943Z'
								fill='#518EF8'
							/>
							<path
								d='M37.8425 41.0966L37.8437 41.0979C33.9501 44.2275 29.0041 46.1 23.62 46.1C14.9677 46.1 7.44513 41.2639 3.60767 34.1471L10.9705 28.1201C12.8891 33.2408 17.8289 36.886 23.62 36.886C26.1092 36.886 28.4412 36.2131 30.4422 35.0384L37.8425 41.0966Z'
								fill='#28B446'
							/>
							<path
								d='M38.1221 5.89054L30.7618 11.9163C28.6908 10.6218 26.2427 9.874 23.62 9.874C17.6978 9.874 12.6657 13.6864 10.8431 18.9908L3.44163 12.9313H3.44038C7.22167 5.64089 14.8391 0.659973 23.62 0.659973C29.1327 0.659973 34.1873 2.62366 38.1221 5.89054Z'
								fill='#F14336'
							/>
						</svg>
						Login with Google
					</Button>
				</div> */}

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

									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='flex items-center justify-between'>
							<Button type='submit' variant='default'>
								Submit
							</Button>
							{/* <p className='text-muted-foreground text-sm '>
								Dont have an account?{' '}
								<Link to='/sign-up' className='text-primary underline'>
									Sign Up
								</Link>
							</p> */}
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default Login;
