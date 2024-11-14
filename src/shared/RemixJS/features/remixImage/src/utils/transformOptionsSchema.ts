import { enum as enum_, number, object, optional, string } from 'zod';

// Base
/** The source URL of the image. */
export const src = string();

/** The width of the resulting image. */
export const width = number().optional();

/** The height of the resulting image. */
export const height = number().optional();

/** The quality of the resulting image. */
export const quality = number().optional();

/** The compression level of the resulting image. */
export const compressionLevel = number().optional();

/** The radius of the blur effect applied to the resulting image. */
export const blurRadius = number().optional();

/** The degree of rotation applied to the resulting image. */
export const rotate = number().optional();

/** The method used to fit the image within specified dimensions. */
export const fit = optional(
  enum_([
    /** Preserving aspect ratio, contain image within both provided dimensions using a border where necessary. */
    'contain',
    /** Preserving aspect ratio, ensure the image covers both provided dimensions by cropping it to fit. */
    'cover',
    /** Ignore the aspect ratio of the input and stretch to both provided dimensions. */
    'fill',
    /** Preserving aspect ratio, resize the image to be as large as possible while ensuring its dimensions are less than or equal to both those specified. */
    'inside',
    /** Preserving aspect ratio, resize the image to be as small as possible while ensuring its dimensions are greater than or equal to both those specified. */
    'outside',
  ]),
);

/** The cropping dimensions of the resulting image. */
export const crop = object({
  x: number(),
  y: number(),
  width: number(),
  height: number(),
}).optional();

/** The flipping direction of the resulting image. */
export const flip = optional(enum_(['horizontal', 'vertical', 'both']));

/** The position of the resulting image within a container. */
export const position = optional(
  enum_([
    'left-top',
    'left-center',
    'left-bottom',
    'middle-top',
    'middle-center',
    'middle-bottom',
    'right-top',
    'right-center',
    'right-bottom',
  ]),
);

/** The content type of the resulting image. */
export const mimeType = optional(
  enum_([
    'image/svg+xml',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp',
    'image/tiff',
    'image/avif',
  ]),
);

/** Delay between animation frames (in milliseconds). */
export const delay = number().optional();

/** Number of animation iterations, use 0 for infinite animation. */
export const loop = number().optional();

/** The options for transforming the image. */
export const transformOptions = object({
  src,
  width,
  height,
  contentType: mimeType,
  fit,
  quality,
  compressionLevel,
  blurRadius,
  rotate,
  flip,
  crop,
  delay,
  loop,
  position,
});
