import React, { useState, useEffect } from "react";

import {
  Card,
  CardBody,
  Image,
  CardHeader,
  Progress,
  Chip,
  Divider,
} from "@nextui-org/react";
import type { PerturbationResult } from "@utils/getPerturbation";
import { Success } from "@assets/success";
import { Failed } from "@assets/failed";

interface ImageProps {
  path: string;
  method_name: string;
  prediction?: PerturbationResult;
}

const ImageCard: React.FC<ImageProps> = ({ path, prediction, method_name }) => {
  return prediction ? (
    <Card className="card-border-color m-auto w-80 px-2 py-4 sm:m-0">
      <CardHeader className="flex-row items-start justify-between px-4 pb-2 pt-2">
        <h4 className="text-xl font-bold">{method_name}</h4>
        {prediction.epsilon ? (
          <p className="text-base">&epsilon;:{prediction.epsilon}</p>
        ) : null}
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="rounded-xl object-cover"
          src={path}
          width={300}
          height={300}
        />
        {method_name !== "Original Image" && (
          <div>
            <div className="flex flex-row justify-between pb-2 pt-2 pt-5">
              <p className="pb-2 text-lg font-medium">Perturbation</p>
              <Chip
                startContent={
                  prediction.isSuccessful ? (
                    <Success size={14} />
                  ) : (
                    <Failed size={14} />
                  )
                }
                variant="light"
                color={prediction.isSuccessful ? "success" : "danger"}
              >
                {prediction.isSuccessful ? "Success" : "Failed"}
              </Chip>
            </div>
            <hr className="mx-auto max-w-3xl border-skin-line px-4" />
          </div>
        )}
        <div className="pt-2">
          <p className="text-lg font-medium">Model Prediction</p>
          <div className="flex flex-col justify-between">
            {prediction.model_result.map(ele => (
              <div
                className="flex flex-row justify-between py-2 pr-3"
                key={ele.label}
              >
                <Progress
                  classNames={{
                    base: "max-w-md flex-col-reverse",
                    label: "w-45 text-wrap text-sm text-default-600 pr-1",
                    value: "ext-sm text-default-600 pl-1",
                  }}
                  color="success"
                  size="sm"
                  radius="sm"
                  label={ele.label}
                  value={ele.prob * 100}
                  showValueLabel={true}
                  formatOptions={{
                    style: "percent",
                    maximumFractionDigits: 1,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  ) : null;
};

export default ImageCard;
