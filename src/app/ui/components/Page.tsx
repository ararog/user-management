import React from 'react';

type PageProps = {
  title: string;
  children: React.ReactNode;
};

const Page = ({ title, children }: PageProps) => {
  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-blue-500 text-6xl">{title}</h1>
      {children}
    </div>
  );
};

export default Page;