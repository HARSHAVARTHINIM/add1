// src/react-plx.d.ts
declare module 'react-plx' {
    import * as React from 'react';
  
    type PlxProps = {
      parallaxData: Array<{
        start: number;
        end: number;
        properties: Array<{
          startValue: number;
          endValue: number;
          property: string;
        }>;
      }>;
      style?: React.CSSProperties;
      children?: React.ReactNode;
    };
  
    const Plx: React.FC<PlxProps>;
  
    export default Plx;
  }
  