import { useStore } from "@nanostores/react";
import { curImage } from "imageStore";

import ImageCard from "@components/ImageDetailCard";
import { getImagePath, getPerturbationResult } from "@utils/getPerturbation";

export default function ShowImageDetails() {
  const $curImage = useStore(curImage);

  return $curImage.length !== 0 ? (
    <div>
      <div className="flex flex-col gap-5  py-5 sm:flex-row sm:gap-16">
        <ImageCard
          method_name="Original Image"
          path={getImagePath($curImage, "Org")}
          prediction={getPerturbationResult($curImage, "Org")}
        />
      </div>
      <h1 className="py-3 pt-10 text-xl font-semibold">White Box Attack</h1>
      <div className="flex flex-col gap-5  py-5 sm:flex-row sm:gap-16">
        {["FGSM", "PGD"].map(ele => (
          <ImageCard
            key={ele}
            method_name={ele}
            path={getImagePath($curImage, ele)}
            prediction={getPerturbationResult($curImage, ele)}
          />
        ))}
      </div>
      <h1 className="py-3 pt-10 text-xl font-semibold">Black Box Attack</h1>
      <div className="flex flex-col gap-5  py-5 sm:flex-row sm:gap-16">
        {["LocSearchAdv"].map(ele => (
          <ImageCard
            key={ele}
            method_name={ele}
            path={getImagePath($curImage, ele)}
            prediction={getPerturbationResult($curImage, ele)}
          />
        ))}
      </div>
    </div>
  ) : null;
}
