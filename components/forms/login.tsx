"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import {  useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '../ui/button';
import Cookies from 'js-cookie'
import { Input } from '../ui/input';
import { signIn, useSession } from 'next-auth/react';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(5, { message: 'Password atleast more than 5 character' })
});

type UserFormValue = z.infer<typeof formSchema>;
const Adminlogin = () => {
  const { update: UpdateSession, data: session } = useSession();
      const router = useRouter();

    const defaultValues = {
      email: 'bp@gmail.com',
      password: ''
    };
     const form = useForm<UserFormValue>({
       resolver: zodResolver(formSchema),
       defaultValues
     });

     toast('Invalid email and Password..');
  const onSubmit = async (data: UserFormValue) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
        const signInResult = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (signInResult.ok) {
          router.push('/dashboard'); // Redirect to the home page or wherever you want
        } else {
          console.log('Failed to sign in after registration');
        }
    
   
  } 
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-[90%] w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your Password..."
                    className=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="ml-auto w-full " type="submit">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Adminlogin