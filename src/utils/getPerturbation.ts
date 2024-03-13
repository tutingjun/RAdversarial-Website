import type { SearchItem } from "@components/Search";
import {
  Original,
  PGD,
  LocSearchAdv,
  FGSM,
  FGSM_Surrogate,
  PGD_Surrogate,
} from "@content/perturbed_result";

const getJson = (method: string) => {
  switch (method) {
    case "Org":
      return Original;
    case "PGD":
      return PGD;
    case "LocSearchAdv":
      return LocSearchAdv;
    case "FGSM":
      return FGSM;
    case "FGSM_Surrogate":
      return FGSM_Surrogate;
    case "PGD_Surrogate":
      return PGD_Surrogate;
    default:
      return Original;
  }
};

type ModelResult = {
  label: string;
  prob: number;
};

export type PerturbationResult = {
  model_result: ModelResult[];
  isSuccessful: boolean;
  epsilon: string;
};

export const getImagePath = (imageName: string, method: string) => {
  return `./perturbed_images/${method}/perturbed_${imageName}.png`;
};

export const getPerturbationResult = (imageName: string, method: string) => {
  const curMethod = getJson(method) as SearchItem[];

  const image_result = curMethod.find(ele => ele.input_name == imageName);
  if (image_result) {
    return {
      model_result: image_result.topk_labels
        .map((ele, index) => {
          const prob = image_result.topk_probabilities[index];
          return {
            label: ele,
            prob: prob,
          } as ModelResult;
        })
        .slice(0, 3),
      isSuccessful:
        image_result.true_label_idx !== image_result.topk_indices[0],
      epsilon: image_result.epsilon
        ? image_result.epsilon[0] + "/" + image_result.epsilon[1]
        : "",
    } as PerturbationResult;
  }
};
