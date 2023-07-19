import Link from "next/link";

export default function NotFound() {
  return (
    <div className='flex items-center justify-center flex-col h-[100vh] '>
      <div className='bg-white p-5 rounded-sm '>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, there is nothing to see here</p>
        <p>
          Go to login page{" "}
          <Link
            href='/login'
            className=' cursor-pointer underline text-red-500'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
