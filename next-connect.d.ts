declare module 'next-connect' {
    import { NextApiRequest, NextApiResponse } from 'next';
  
    export default function nextConnect<
      Req = NextApiRequest,
      Res = NextApiResponse
    >(): import('connect').NextHandleFunction;
  }
  