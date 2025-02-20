import React from "react";

type Props = {};

const Loader = (props: Props) => {
  return (
    <>
      <div className="flex-col gap-4 w-full flex items-center justify-center h-screen">
        <div className="w-52 h-52 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
          <svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
            <text x="10" y="40" fontFamily="Arial" fontSize="30" fill="black">
              Liviapoma
            </text>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Loader;
