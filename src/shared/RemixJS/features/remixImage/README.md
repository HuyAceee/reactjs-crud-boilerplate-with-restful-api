# Overview

A React component for responsive images in Remix.

This library lets you:

- Resize images to the minimum size needed for faster page loading
- Convert images to more efficient file types for faster page loader
- Apply transformations to images such as `resize`, `crop`, `rotate`, `blur`, and `flip`
- Cache commonly requested assets for the best performance

# Usage

```jsx
// routes/public.images.ts
import { sharpLoader } from "remixjs/server";
export const loader = sharpLoader;

// Client
/** External image */
<Image
  src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg"
  loaderUrl="/medias"
  responsives={[
    {
      size: { width: 100, height: 100 },
      maxWidth: 500,
    },
    {
      size: { width: 600, height: 600 },
      maxWidth: 1200,
    },
  ]}
/>;

/** Internal image by import */
import image from "..";
<Image
  src={image}
  loaderUrl="/medias"
  responsives={[
    {
      size: { width: 100, height: 100 },
      maxWidth: 500,
    },
    {
      size: { width: 600, height: 600 },
      maxWidth: 1200,
    },
  ]}
/>;

/** Internal image by public folders */
import image from "..";
<Image
  // public/images/image.jpeg
  src="/images/image.jpeg"
  loaderUrl="/medias"
  responsives={[
    {
      size: { width: 100, height: 100 },
      maxWidth: 500,
    },
    {
      size: { width: 600, height: 600 },
      maxWidth: 1200,
    },
  ]}
/>;
```
