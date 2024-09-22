import React from 'react'
import { cn } from '@/shared/lib/utils'
import { CartButton, Container, SearchInput } from '.'
import Image from 'next/image'
import { Button } from '../ui'
import { User } from 'lucide-react'
import Link from 'next/link'
type Props = {
    className?: string;
    hasSearch?: boolean;
    hasCart?: boolean;
}
export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">

        {/* Left part of the header */}
        <Link href="/" className="flex items-center gap-4">
            <Image src="/logo.png" alt="logo" width={35} height={35} />
            <div>
                <h1 className="text-2xl uppercase font-black">Deliciouso</h1>
                <p className="text-sm text-gray-400 leading-3">Order food online</p>
            </div>
        </Link>

        {/* Middle part of the header */}
        {hasSearch && <div className="mx-10 flex-1">
          <SearchInput />
        </div>}

        {/* Right part of the header */}
        <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-1" >
                <User size={16} />
                Войти
            </Button>

            {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  )
}