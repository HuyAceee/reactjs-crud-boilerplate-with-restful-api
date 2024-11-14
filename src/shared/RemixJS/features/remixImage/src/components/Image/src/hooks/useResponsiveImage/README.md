# Overview

The `useResponsiveImage` hook is designed to generate responsive attributes for an image element based on the provided configuration. It calculates the optimal `src`, `srcSet`, and `sizes` attributes to ensure the image displays correctly across various devices and resolutions.

# Options

The hook takes a configuration object as its argument, which includes various properties defining the behavior and characteristics of the responsive image.

### Parameters

- **options**: An object containing the following properties:
  - `dprVariants`: Optional. Specifies the device pixel ratio (DPR) variants for the image. This can be a number or an array of numbers representing different DPR values.
  - `responsives`: An array of responsive configurations for the image. Each configuration specifies the size constraints for different viewport widths.
  - `src`: The source URL of the image.
  - `loaderUrl`: The URL of the image loader.
  - `option`: The option configuration for the image, such as format and quality.

### Return

- An object containing the responsive attributes for the image:
  - `src`: The optimized source URL of the image.
  - `srcSet`: Optional. The list of image URLs with corresponding widths for use in `srcset` attribute.
  - `sizes`: Optional. The list of media conditions and image sizes for use in `sizes` attribute.

# Usage

```jsx
import React from "react";
import { useResponsiveImage } from "path-to-useResponsiveImage-hook";

function MyComponent() {
  const { src, srcSet, sizes } = useResponsiveImage({
    dprVariants: [1, 2],
    responsives: [{ maxWidth: 600, size: { width: 300, height: 200 } }, { maxWidth: 1200, size: { width: 600, height: 400 } }, { size: { width: 1200, height: 800 } }],
    src: "example.jpg",
    loaderUrl: "https://example.com/loader",
    option: { format: "jpeg", quality: 80 },
  });

  return <img src={src} srcSet={srcSet} sizes={sizes} alt="Responsive Image" />;
}

export default MyComponent;
```
