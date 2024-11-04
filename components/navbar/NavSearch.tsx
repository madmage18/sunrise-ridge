"use client";
import { Input } from "../ui/input";
import { useSearchParams, useRouter } from "next/navigation"; // useRouter used to navigate back to the product pages
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";
//  using client side for this component (so using useSearchParams hook instead of accessing the server side available searchParams).

function NavSearch() {
  // access search params using hook
  const searchParams = useSearchParams();
  const getSearchParams = searchParams.get("search");
  const { replace } = useRouter();
  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || ""
  );
  // function to get serch param entered
  // useDebouncedCallback. expects 2 arguments. 2nd is the amount of delay. first is what we are going to delay getting the value of
  const handleSearch = useDebouncedCallback((value: string) => {
    // new URLSearchParams is out of the box functionality.
    
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    // updates the route
    replace(`/products?${params.toString()}`);
  }, 500);
  // useEffect dependency: anytime there is a change in the 'search' URL params
  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearch("");
    }
  }, [getSearchParams, searchParams]);
  // remove searchParams from dependency array in future. Only want use effect to run in the 'search' search param is updated.
  return (
    <Input
      type="search"
      placeholder="search product..."
      className="max-w-xs dark:bg-muted"
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
      value={search}
    />
  );
}

export default NavSearch;
