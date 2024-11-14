# Overview

The `Image` component renders an image element with responsive attributes based on the provided configuration. It offers features such as resizing images for faster loading, converting to efficient file types, and applying transformations like resizing, cropping, rotating, blurring, and flipping.

# Props

| Prop                | Type                                                                | Description                                             |
| ------------------- | ------------------------------------------------------------------- | ------------------------------------------------------- |
| `src`               | `string`                                                            | The source URL of the image.                            |
| `width`             | `number`                                                            | Width of the image.                                     |
| `height`            | `number`                                                            | Height of the image.                                    |
| `loaderUrl`         | `string`                                                            | The URL of the image loader.                            |
| `responsives`       | `Responsive[]`                                                      | An array of responsive configurations for the image.    |
| `transformOptions`  | `Omit<TransformOptions, 'src' \| 'origin'>`                         | The option configuration for the image.                 |
| `dprVariants`       | `number \| number[]`                                                | Device pixel ratio (DPR) variants for the image.        |
| `onLoadingComplete` | `(result: { naturalWidth: number; naturalHeight: number }) => void` | A function to be called when image loading is complete. |
| `placeholder`       | `string`                                                            | The placeholder URL for the image.                      |
| `fallback`          | `string`                                                            | The fallback URL for the image.                         |
