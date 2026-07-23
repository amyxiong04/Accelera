import { GalleryVerticalEnd } from 'lucide-react';
import Image from 'next/image';

import { LoginForm } from '@/components/auth/login-form';
import LoginImage from '@/assets/img/login-image.jpg';

export default function LoginPage() {
  return (
    <div className="bg-primary/5 flex h-screen w-screen items-center justify-center overflow-hidden">
      <div className="flex min-w-[600px] flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 text-lg font-medium">
            <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-7" />
            </div>
            Accelera
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-full">
            <LoginForm />
          </div>
        </div>
      </div>
      <Image
        src={LoginImage}
        alt="Image"
        className="absolute inset-0 -z-1 h-full w-full object-cover opacity-80"
      />
    </div>
  );
}
