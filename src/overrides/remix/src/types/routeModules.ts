import type { AppData } from './data';
import type { SerializeFrom } from './serialize';
import type {
  ActionFunctionArgs as RRActionFunctionArgs,
  LoaderFunctionArgs as RRLoaderFunctionArgs,
} from 'react-router-dom';

/**
 * Arguments passed to a route `clientAction` function
 * @private Public API is exported from @remix-run/react
 */
export type ClientActionFunctionArgs = RRActionFunctionArgs<undefined> & {
  serverAction: <T = AppData>() => Promise<SerializeFrom<T>>;
};

/**
 * Arguments passed to a route `clientLoader` function
 * @private Public API is exported from @remix-run/react
 */
export type ClientLoaderFunctionArgs = RRLoaderFunctionArgs<undefined> & {
  serverLoader: <T = AppData>() => Promise<SerializeFrom<T>>;
};
