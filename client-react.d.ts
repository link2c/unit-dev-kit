declare module 'virtual:vite-folder-routes' {
  export interface RouteInfo {
    /** 路由名稱 */
    name: string;

    /** 入口路徑 */
    index?: string;

    /** 佈局路徑 */
    layout?: string;

    /** 加載路徑 */
    loading?: string;

    /** 子路由 */
    children?: RouteInfo[];
  }

  export const routes: RouteInfo[];
}
