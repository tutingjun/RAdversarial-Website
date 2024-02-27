import React, { useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

import { useStore } from "@nanostores/react";
import { curImage } from "imageStore";

import { Original } from "@content/perturbed_result";

export default function ImageDropdown() {
  const img_true_label = Original.map(ele => ele.true_label);
  const $curImage = useStore(curImage);
  return (
    <Autocomplete
      label="Select an class"
      className="dropdown-color z-auto max-w-xs"
      autoFocus={true}
      // variant="bordered"
      onSelectionChange={id => {
        console.log(id);
        curImage.set(id as string);
      }}
    >
      {Original.map(img => (
        <AutocompleteItem key={img.input_name} value={img.input_name}>
          {img.true_label}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
}
