"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { formUrlQuery } from "@/sanity/utils";

const links = ["all", "Next 14", "frontend", "backend", "fullstack"];

const Filters = () => {
  const [active, setActive] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilters = (link: string) => {
    let newurl = "";
    if (active === link) {
      setActive("");
      newurl = formUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    } else {
      newurl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: link.toLowerCase(),
      });
      setActive(link);
    }
    router.push(newurl, { scroll: false });
  };

  return (
    <ul className="text-white-800 body-text no-scrollbar flex w-full max-w-full gap-2 overflow-auto py-2 sm:max-w-2xl">
      {links.map((link) => (
        <button
          className={`${
            active === link ? "gradient_blue-purple" : ""
          } whitespace-nowrap rounded-lg px-8 py-2.5 capitalize`}
          key={link}
          onClick={() => handleFilters(link)}
        >
          {link}
        </button>
      ))}
    </ul>
  );
};

export default Filters;
