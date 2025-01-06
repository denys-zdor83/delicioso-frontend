import { useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '../ui/button';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/shared/store';

interface Props {
  onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {
  const [loading] = useCartStore((state) => [
    state.loading
  ]);
  const { data: session } = useSession();

  return (
    <div className={className}>
      {!session ? (
        <Button 
          loading={loading}
          onClick={onClickSignIn} 
          variant="outline" 
          className="flex items-center gap-1"
        >
          <User size={16} />
          Login
        </Button>
      ) : (
        <Link href="/profile">
          <Button 
            loading={loading}
            variant="secondary" 
            className="flex items-center gap-2"
          >
            <CircleUser size={18} />
            Profile
          </Button>
        </Link>
      )}
    </div>
  );
};