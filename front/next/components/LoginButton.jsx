import React from 'react';
import Link from 'next/link';

const LoginButton = () => {
  return (
    <Link href="/login">
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4 mt-4 md:mt-0">Login</button>
    </Link>
  );
}

export default LoginButton;