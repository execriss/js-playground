// src/images.d.ts (o el nombre que le hayas puesto)

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  // Si usas SVGs como componentes React (con SVGR), la declaración es diferente:
  // import * as React from 'react';
  // export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  // const src: string;
  // export default src;

  // Si solo usas SVGs como archivos (URL):
  const value: string;
  export default value;
}
