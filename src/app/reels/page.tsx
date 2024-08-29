"use client";

import React, { useState } from "react";

type Item = {
  id: number;
  text: string;
  comment: string;
};

const Explore: React.FC = () => {
  const items: Item[] = [
    { id: 1, text: "1", comment: "16" },
    { id: 2, text: "2", comment: "20" },
    { id: 3, text: "3", comment: "48" },
    { id: 4, text: "3", comment: "48" },
    { id: 5, text: "3", comment: "48" },
    { id: 6, text: "3", comment: "48" },
    { id: 7, text: "3", comment: "48" },
    { id: 8, text: "3", comment: "48" },
    { id: 9, text: "3", comment: "48" },
    { id: 10, text: "3", comment: "48" },
    { id: 11, text: "3", comment: "48" },
  ];

  return (
    <main className="container flex justify-center h-full">
      <section className="  grid grid-cols-3 gap-1   my-6">
        {items.map(({ id, text, comment }) => (
          <ExploreItem key={id} id={id} text={text} comment={comment} />
        ))}
      </section>
    </main>
  );
};

const ExploreItem: React.FC<Item> = ({ id, text, comment }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLarge = id % 10 === 3 || id % 10 === 6;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden bg-red-800 w-[20rem] h-full min-h-[20rem]   cursor-pointer ${
        isLarge ? "row-span-2 bg-blue-800" : "bg-red-800"
      }`}
    ></div>
  );
};

export default Explore;
