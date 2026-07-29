import { ChevronsLeftRight } from "lucide-react";

import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "./image-comparison";

export interface CaseStudy {
  title: string;
  description: string;
  beforeSrc: string;
  afterSrc: string;
}

export function CaseCard({
  title,
  description,
  beforeSrc,
  afterSrc,
}: CaseStudy) {
  return (
    <div className="bg-card overflow-hidden rounded-lg border">
      <ImageComparison className="aspect-[4/3] w-full">
        <ImageComparisonImage
          src={beforeSrc}
          alt={`${title} — antes do tratamento`}
          position="left"
        />
        <ImageComparisonImage
          src={afterSrc}
          alt={`${title} — depois do tratamento`}
          position="right"
        />
        <ImageComparisonSlider
          className="bg-background"
          label={`Comparação antes e depois — ${title}`}
        >
          <div className="bg-background absolute top-1/2 left-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-md">
            <ChevronsLeftRight
              className="text-muted-foreground size-4"
              aria-hidden="true"
            />
          </div>
        </ImageComparisonSlider>

        <span className="bg-background/80 text-foreground pointer-events-none absolute top-3 left-3 rounded-md px-2 py-1 text-xs font-medium backdrop-blur-sm">
          Antes
        </span>
        <span className="bg-background/80 text-foreground pointer-events-none absolute top-3 right-3 rounded-md px-2 py-1 text-xs font-medium backdrop-blur-sm">
          Depois
        </span>
      </ImageComparison>

      <div className="p-6">
        <h3 className="font-heading text-foreground text-lg font-medium">
          {title}
        </h3>
        <p className="text-muted-foreground mt-1 text-sm">{description}</p>
      </div>
    </div>
  );
}
