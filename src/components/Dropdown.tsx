import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

import { useStore } from "@nanostores/react";
import { curImage } from "imageStore";

import { Original } from "@content/perturbed_result";

export default function ImageDropdown() {
  const img_name = Original.map(ele => ele.input_name);
  const $curImage = useStore(curImage);
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">
          {$curImage.length == 0 ? "Select an Image" : $curImage}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-chevron-down"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 9l6 6l6 -6" />
          </svg>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        className="dropdown-color"
        aria-label="Dynamic Actions"
        onAction={key => {
          curImage.set(key as string);
        }}
      >
        {img_name.map(element => (
          <DropdownItem key={element} color="default">
            {element}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
