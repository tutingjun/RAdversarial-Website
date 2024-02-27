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
};

export const getImagePath = (imageName: string, method: string) => {
  return `../perturbed_images/${method}/perturbed_${imageName}.png`;
};

export const isPerturbationSuccess = (imageName: string, method: string) => {
  const curMethod = getJson(method);
  const image_result = curMethod.find(ele => ele.input_name == imageName);
};

export const getPerturbationResult = (imageName: string, method: string) => {
  const curMethod = getJson(method);

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
    } as PerturbationResult;
  }
};
