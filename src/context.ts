export interface Context {
  cmdLine: string;
  cordova: any;
  hook: string;
  opts: Opts;
  scriptLocation: string;

  requireCordovaModule<T = any>(name: string): T;
}

export interface Cordova {
  platforms: string[];
  plugins: string[];
  version: string;
}

export interface Opts {
  platforms: string[];
  projectRoot: string;

  options: {
    [key: string]: string | string[] | boolean;
    argv: string[];
    buildConfig: string;
  };

  verbose: boolean;
  silent: boolean;
  browserify: boolean;
  fetch: boolean;
  nohooks: any[];
  searchpath: string | undefined;
  save: boolean;
  cordova: Cordova;
  paths: string[];
}
