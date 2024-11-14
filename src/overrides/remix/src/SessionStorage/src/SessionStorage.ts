import { v4 } from 'uuid';
import { createSession } from './Session';
import { CookieParseOptions } from './types/CookieParseOptions';
import { CookieSerializeOptions } from './types/CookieSerializeOptions';
import { Session } from './types/Session';
import { SessionData } from './types/SessionData';
import { localStorage } from '~/shared/Utilities';

export interface SessionStorage<Data = SessionData, FlashData = Data> {
  getSession: (cookieHeader?: string | null, options?: CookieParseOptions) => Promise<Session<Data, FlashData>>;
  commitSession: (session: Session<Data, FlashData>, options?: CookieSerializeOptions) => Promise<string>;
  destroySession: (session: Session<Data, FlashData>, options?: CookieSerializeOptions) => Promise<string>;
}

export const createSessionStorage = <Data = SessionData>(keyInLocalStorage: string): SessionStorage<SessionData> => {
  return {
    commitSession: session => {
      localStorage.setItem(keyInLocalStorage, JSON.stringify(session.data));
      return Promise.resolve(session.id);
    },
    destroySession: () => {
      localStorage.removeItem(keyInLocalStorage);
      return Promise.resolve('');
    },
    getSession: () => {
      try {
        const data = localStorage.getItem(keyInLocalStorage);
        if (data) {
          const data_ = JSON.parse(data) as Session<Data>;
          return Promise.resolve(createSession(data_, keyInLocalStorage));
        }
        return Promise.resolve(createSession(undefined, v4()));
      } catch {
        localStorage.removeItem(keyInLocalStorage);
        return Promise.resolve(createSession(undefined, v4()));
      }
    },
  };
};
