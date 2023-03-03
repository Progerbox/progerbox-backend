class Utils {
  public toArray<T>(v: any): T[] {
    return Array.isArray(v) ? v : [v];
  }
}

export const utils = new Utils();
