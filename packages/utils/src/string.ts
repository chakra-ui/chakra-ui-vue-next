import _camelCase from "lodash.camelcase"
import memoize from "lodash.memoize"

export const camelCase: (key: string) => string = memoize((key: string) =>
  _camelCase(key)
)
