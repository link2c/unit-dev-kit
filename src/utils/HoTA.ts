import { useCallback, useEffect, useState } from 'react';

type DisPatch<S> = [S, (action: S | ((v: S) => S)) => void];

/**
 * HoTA「黑塔」状态管理
 */
export class HoTA<S extends Record<string, unknown> = Record<string, unknown>> {
  protected handle: Partial<Record<string, (() => void)[]>> = {};
  private INVALID_STATE: S;

  constructor (initState?: S) {
    this.INVALID_STATE = Object.create(initState ?? {});
  }

  protected on(key: string, update: () => void) {
    this.handle[key] ??= [];
    this.handle[key]?.push(update);
  }

  protected off(key: string, update: () => void) {
    const index = this.handle[key]?.findIndex(handle => handle === update) ?? -1;
    if (index > -1) this.handle[key]?.splice(index, 1);
  }

  protected emit<K extends keyof S = keyof S>(key: string, value: S | S[K]) {
    if (key === '*') {
      Object.assign(this.INVALID_STATE, value);
      for (const k in value as S) {
        this.emit(k, (value as S)[k]);
      }
      return;
    }
    Object.assign(this.INVALID_STATE, { [key]: value });
    this.handle[key]?.map(handle => handle());
  }

  /**
   * 使用「黑塔」狀態的全部值
   */
  useValue(): DisPatch<S>;

  /**
   * 使用「黑塔」狀態的部分值
   * @param key 鍵
   */
  useValue<K extends keyof S = keyof S>(key: K): DisPatch<S[K]>;

  useValue<K extends keyof S = keyof S>(key?: K): any {
    const [value, setValue] = useState(key ? this.INVALID_STATE[key] : this.INVALID_STATE);

    const update = useCallback<DisPatch<typeof value>[1]>((action) => {
      const newVal = action instanceof Function ? action(key ? this.INVALID_STATE[key] : this.INVALID_STATE) : action;
      this.emit(String(key ?? '*'), newVal);
    }, [key]);

    useEffect(() => {
      const name = String(key ?? '*');
      const updater = () => setValue(key ? this.INVALID_STATE[key] : this.INVALID_STATE);
      this.on(name, updater);
      return () => {
        this.off(name, updater);
      };
    }, []);

    return [value, update];
  };

}

// const o = new HoTA<{ name?: string }>();

// o.useValue('name');
// o.useValue();