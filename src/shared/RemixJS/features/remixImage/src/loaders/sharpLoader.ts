import { LoaderFunctionArgs } from '@remix-run/node';
import sharp from 'sharp';
import { createHash } from 'crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { stat } from 'fs/promises';
import { dirname, join, resolve } from 'path';
import { urlSearchParamsUtil } from '../utils/urlSearchParamsUtil';

/**
 * Creates a loader function for processing assets with Sharp.
 */
export const sharpLoader = async ({ request }: LoaderFunctionArgs): Promise<Response> => {
  try {
    const imageOptions = urlSearchParamsUtil.decrypt(request);
    const {
      src,
      blurRadius = 0,
      compressionLevel = 6,
      contentType = 'image/webp',
      crop,
      flip = false,
      rotate = 0,
      fit = 'cover',
      quality = 80,
      height,
      width,
      delay,
      loop,
      position = 'center',
    } = imageOptions;

    //#region Read cache
    const hash = createHash('sha256')
      .update('v1')
      .update(src?.toString() ?? '')
      .update(blurRadius?.toString() ?? '')
      .update(compressionLevel?.toString() ?? '')
      .update(contentType?.toString() ?? '')
      .update(JSON.stringify(crop) ?? '')
      .update(flip?.toString() ?? '')
      .update(rotate?.toString() ?? '')
      .update(width?.toString() ?? '')
      .update(height?.toString() ?? '')
      .update(delay?.toString() ?? '')
      .update(loop?.toString() ?? '')
      .update(quality.toString())
      .update(fit)
      .update(position);
    const key = hash.digest('hex');

    const cachedFile = join(resolve(), '.data/sharpLoader', [key, contentType.replace('image/', '')].join('.'));

    const exists = await stat(cachedFile)
      .then(s => s.isFile())
      .catch(() => false);

    if (exists) {
      try {
        const fileStream = readFileSync(cachedFile);
        console.log({ Cache: 'HIT', imageOptions });
        return new Response(fileStream, {
          status: 200,
          headers: {
            'Content-Type': 'image/webp',
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      } catch (error) {
        console.log({ region: 'Read cache', error });
      }
    }
    console.log({ Cache: 'MISS', imageOptions });
    //#endregion

    //#region Resolver
    const url = new URL(src, new URL(request.url).origin);
    const imageResponse = await fetch(url, {
      headers: {
        accept: 'image/*',
      },
    });
    const imageData = await imageResponse.arrayBuffer();
    //#endregion

    //#region Transform image
    const image = sharp(imageData, {
      animated: true,
    });
    image.ensureAlpha(1);
    if (crop) {
      image.extract({
        left: crop.x,
        top: crop.y,
        width: crop.width,
        height: crop.height,
      });
    }
    if (width != null || height != null) {
      image.resize(width, height, {
        fit,
        position,
      });
    }
    if (flip) {
      if (flip === 'horizontal' || flip === 'both') {
        image.flop();
      }
      if (flip === 'vertical' || flip === 'both') {
        image.flip();
      }
    }
    if (rotate && rotate !== 0) {
      image.rotate(rotate, {});
    }
    if (blurRadius && blurRadius > 0) {
      image.blur(blurRadius);
    }
    const result = await image
      .jpeg({
        quality,
        progressive: true,
        force: contentType === 'image/jpeg',
      })
      .png({
        progressive: true,
        compressionLevel,
        force: contentType === 'image/png',
      })
      .gif({
        loop,
        delay,
        force: contentType === 'image/gif',
      })
      .webp({
        quality,
        force: contentType === 'image/webp',
      })
      .tiff({
        quality,
        force: contentType === 'image/tiff',
      })
      .avif({
        quality,
        force: contentType === 'image/avif',
      })
      .toBuffer();
    const resultData = new Uint8Array(result);
    //#endregion

    //#region Write cache
    try {
      mkdirSync(dirname(cachedFile), { recursive: true });
      writeFileSync(cachedFile, resultData);
    } catch (error) {
      console.log({ region: 'Write cache', error });
    }
    //#endregion

    //#region  Return response
    return new Response(resultData, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
    //#endregion
  } catch (error) {
    console.log({ reion: 'Catch clause', error });
    return new Response(undefined, {
      status: 500,
    });
  }
};
