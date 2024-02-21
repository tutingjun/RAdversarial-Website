import Fuse from "fuse.js";
import { useEffect, useRef, useState, useMemo } from "react";
import { Original } from "@content/perturbed_result";
import { curImage } from "imageStore";
import { Button, Input } from "@nextui-org/react";

export type SearchItem = {
  input_name: string;
  true_label: string;
  true_label_idx: number;
  original_top1_index: number;
  original_true_class_probability: number;
  true_class_probability: number;
  topk_indices: number[];
  topk_labels: string[];
  topk_probabilities: number[];
};

interface SearchResult {
  item: SearchItem;
  refIndex: number;
}

function generateRandom(max: number, exclude: number): number {
  var num = Math.floor(Math.random() * max);
  return num === exclude ? generateRandom(max, exclude) : num;
}

export default function SearchBar() {
  const [inputVal, setInputVal] = useState("");
  var index: number;
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null
  );

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const fuse = useMemo(
    () =>
      new Fuse(Original, {
        keys: ["true_label"],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.3,
      }),
    []
  );

  useEffect(() => {
    // Add search result only if
    // input value is more than one character
    if (inputVal.length === 0) {
      index = -1;
    }
    let inputResult = inputVal.length > 1 ? fuse.search(inputVal) : [];
    setSearchResults(inputResult);

    // Update search string in URL
    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.replaceState(history.state, "", newRelativePathQuery);
    } else {
      history.replaceState(history.state, "", window.location.pathname);
    }
  }, [inputVal]);

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      index = Math.floor(Math.random() * searchResults.length);

      const img = searchResults[index].item;
      curImage.set(img.input_name);
    } else {
      curImage.set("");
      index = -1;
    }
  }, [searchResults]);

  return (
    <>
      <div className="mb-8 flex flex-row items-center justify-between gap-2">
        <Input
          isClearable
          radius="lg"
          variant="bordered"
          placeholder="Type to search an image..."
          startContent={
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
            </svg>
          }
          value={inputVal}
          onChange={handleChange}
          onClear={() => setInputVal("")}
          autoComplete="off"
        />
        <Button
          color="danger"
          size="lg"
          onClick={() => {
            index = generateRandom(Original.length, index);
            curImage.set(Original[index].input_name);
          }}
        >
          Random Image
        </Button>
      </div>

      {inputVal.length > 1 && (
        <div className=" mt-8 flex flex-row items-center justify-between">
          <div className="">
            Found {searchResults?.length}
            {searchResults?.length && searchResults?.length === 1
              ? " result"
              : " results"}{" "}
            for '{inputVal}'
          </div>
          {searchResults?.length && searchResults?.length > 1 ? (
            <Button
              className="text-sm"
              color="default"
              variant="flat"
              size="sm"
              onClick={() => {
                index = generateRandom(searchResults.length, index);
                console.log(index);
                curImage.set(searchResults[index].item.input_name);
              }}
            >
              Another One
            </Button>
          ) : null}
        </div>
      )}
    </>
  );
}
