import { Original, PGD, LocSearchAdv, FGSM } from "@content/perturbed_result";

export type ModelResult = {
  label: string;
  prob: number;
};

export const getImagePath = (imageName: string, method: string) => {
  return `/perturbed_images/${method}/perturbed_${imageName}.png`;
};

export const getPerturbationResult = (imageName: string, method: string) => {
  var curMethod;
  switch (method) {
    case "Org":
      curMethod = Original;
      break;
    case "PGD":
      curMethod = PGD;
      break;
    case "LocSearchAdv":
      curMethod = LocSearchAdv;
      break;
    case "FGSM":
      curMethod = FGSM;
      break;
    default:
      return;
  }
  const image_result = curMethod.find(ele => ele.input_name == imageName);
  if (image_result) {
    return image_result.topk_labels.map((ele, index) => {
      const prob = image_result.topk_probabilities[index];
      return {
        label: ele,
        prob: Math.round(prob * 1000) / 1000,
      } as ModelResult;
    });
  }
};
