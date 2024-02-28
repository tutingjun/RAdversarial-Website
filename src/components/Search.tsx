import { useEffect, useRef, useState, useMemo } from "react";
import { Original } from "@content/perturbed_result";
import { curImage } from "imageStore";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import React from "react";

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
  iteration?: number;
  epsilon?: number[];
};

function generateRandom(max: number, exclude: number): number {
  var num = Math.floor(Math.random() * max);
  return num === exclude ? generateRandom(max, exclude) : num;
}

export default function SearchBar() {
  var index: number;

  const onSelectionChange = (key: React.Key) => {
    if (key) {
      setSelectedKey(key.toString());
    }
  };
  const [selectedKey, setSelectedKey] = React.useState<string>("");

  useEffect(() => {
    if (selectedKey.length > 0) {
      curImage.set(selectedKey);
    } else {
      curImage.set("");
      index = -1;
    }
  }, [selectedKey]);

  return (
    <>
      <div className="mb-8 flex flex-row items-center justify-between gap-2">
        {/* <Input
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
        /> */}
        <Autocomplete
          size="md"
          label="Select an image class"
          classNames={{
            base: "max-w-lg",
            listboxWrapper: "dropdown-color",
          }}
          variant="bordered"
          onSelectionChange={onSelectionChange}
          clearButtonProps={{
            onClick: () => {
              curImage.set("");
            },
          }}
        >
          {Original.map(img => (
            <AutocompleteItem key={img.input_name} value={img.input_name}>
              {img.true_label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
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
    </>
  );
}
