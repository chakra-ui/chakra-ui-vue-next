export interface IPackageJson {
  name: string
  version: string
  description: string
  main: string
  module: string
  files?: string[] | null
  exports: {
    ".": {
      require: string
      default: string
    }
  }
  repository: string
  author: string
  license: string
  scripts: {
    [key: string]: string
  }
  dependencies: {
    [key: string]: string
  }
  devDependencies: {
    [key: string]: string
  }
  peerDependencies: {
    [key: string]: string
  }
  publishConfig: {
    access: string
  }
}
