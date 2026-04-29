/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/UseEffect` | `/UseEffect`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/UseMemo` | `/UseMemo`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/UseState` | `/UseState`; params?: Router.UnknownInputParams; } | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/UseEffect` | `/UseEffect`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/UseMemo` | `/UseMemo`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/UseState` | `/UseState`; params?: Router.UnknownOutputParams; } | { pathname: `/+not-found`, params: Router.UnknownOutputParams & {  } };
      href: Router.RelativePathString | Router.ExternalPathString | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/UseEffect${`?${string}` | `#${string}` | ''}` | `/UseEffect${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/UseMemo${`?${string}` | `#${string}` | ''}` | `/UseMemo${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/UseState${`?${string}` | `#${string}` | ''}` | `/UseState${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/UseEffect` | `/UseEffect`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/UseMemo` | `/UseMemo`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/UseState` | `/UseState`; params?: Router.UnknownInputParams; } | `/+not-found${`?${string}` | `#${string}` | ''}` | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
    }
  }
}
