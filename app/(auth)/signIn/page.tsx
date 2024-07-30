import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import Link from 'next/link';
import Adminlogin from '@/components/forms/login';


export default function Component() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="mx-auto  max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Adminlogin />
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Link href="/">
            <Button className="ml-auto w-full " variant="outline">
              create an account
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
