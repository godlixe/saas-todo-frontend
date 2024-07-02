"use client";
import LoginDialog from '@/components/LoginDialog';
import { useContext } from 'react'
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from 'next/navigation';
import AuthCheck from '@/components/AuthCheck';

const page = () => {
  const { userInfo } = useContext(AuthContext);
  const router = useRouter();

  if (userInfo) {
    router.push("/");
  };

  return (
    <div>
      <LoginDialog />
    </div>
  )
}

export default page