'use client';

import React from 'react'
import { cn } from '@/shared/lib/utils'
import { AuthModal, CartButton, Container, ProfileButton, SearchInput } from '.'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

type Props = {
    className?: string;
    hasSearch?: boolean;
    hasCart?: boolean;
    hasLogin?: boolean;
}

export const Header: React.FC<Props> = ({ 
  hasSearch = true, 
  hasCart = true, 
  hasLogin = true, 
  className 
}) => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const searchParams = useSearchParams();

  React.useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('verified')) {
      toastMessage = 'The email has been successfully verified!';
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }, []);

  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8 flex-wrap">

        {/* Left part of the header */}
        <Link href="/" className="hidden flex-[1_1_50%] sm:flex md:flex-none box-border items-center gap-4">
          <Image src="/logo.png" alt="logo" width={35} height={35} />
          <div>
            <h1 className="text-md md:text-2xl uppercase font-black">Deliciouso</h1>
            <p className="text-sm text-gray-400 leading-3">Order food online</p>
          </div>
        </Link>

        {/* Middle part of the header */}
        {hasSearch && <div className="flex-[0_0_100%] box-border mt-2 md:mt-0 md:mx-10 md:flex-1 order-last md:order-none">
          <SearchInput />
        </div>}

        {/* Right part of the header */}
        <div className="flex flex-[1_1_50%] md:flex-none justify-end box-border items-center gap-3">
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
          {/* TODO: Return LogIn button for 'complete-order' page. Fix loader. LATER */}
          {hasLogin && <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />}
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  )
}