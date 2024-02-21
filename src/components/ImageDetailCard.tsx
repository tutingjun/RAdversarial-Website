import React, { useState, useEffect } from "react";

import { Card, CardBody, Image, CardHeader, Progress } from "@nextui-org/react";
import type { ModelResult } from "@utils/getPerturbation";

interface ImageProps {
  path: string;
  method_name: string;
  prediction?: ModelResult[];
  true_class?: string;
}

const ImageCard: React.FC<ImageProps> = ({ path, prediction, method_name }) => {
  return prediction ? (
    <Card className="card-border-color m-auto w-80 px-2 py-4 sm:m-0">
      <CardHeader className="flex-col items-start px-4 pb-2 pt-2">
        <h4 className="text-xl font-bold">{method_name}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="rounded-xl object-cover"
          src={path}
          width={300}
          height={300}
        />
        <div className="pt-2 pt-5">
          <p className="text-lg font-medium">Model Prediction</p>
          <div className="flex flex-col justify-between">
            {prediction.map(ele => (
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
