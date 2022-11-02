import { HttpResponse } from "../models/httpResponse";
import type { DataNode } from 'antd/es/tree';
import { PageData } from "../models/pageData";
import { Family } from "../models/family";

const CORS='cors';
const GETMETHOD='GET';
const env= process.env.NODE_ENV

let baseUrl='';
if (env==="development") {
    baseUrl='https://localhost:5001/api'
}
else if (env==="production") {
    baseUrl='https://galaservice.goufeifei.xyz/api'
}

export const getFamilyCategoryFetch=async () => {
    var url=`${baseUrl}/family/categories`
    var response=await fetch(url,{
        mode: CORS,
        method: GETMETHOD,
    })
 var httpResponse=(await response.json()) as HttpResponse<DataNode[]>
 return httpResponse;
}

export const getFamilyPageByKeywordFetch=async(keyword:string|undefined,pageIndex:number,pageSize:number)=>{
    var url=keyword?`${baseUrl}/family/?keyword=${keyword}&pageIndex=${pageIndex}&pageSize=${pageSize}`:
        `${baseUrl}/family/?pageIndex=${pageIndex}&pageSize=${pageSize}`
    var response=await fetch(url,{
        mode: CORS,
        method: GETMETHOD,
    })
 var httpResponse=(await response.json()) as HttpResponse<PageData<Family>>
 return httpResponse;
}

export const getFamilyPageByCategoryFetch=async(category:number|0,pageIndex:number,pageSize:number)=>{
    var url=`${baseUrl}/family/byCategory?categoryId=${category}&pageIndex=${pageIndex}&pageSize=${pageSize}`
    var response=await fetch(url,{
        mode: CORS,
        method: GETMETHOD,
    })
 var httpResponse=(await response.json()) as HttpResponse<PageData<Family>>
 return httpResponse;
}

export const getFamilyFileUrlFetch=async(fileKey:string)=>{
    var url=`${baseUrl}/family/file/${fileKey}`;
    var response=await fetch(url,{
        mode: CORS,
        method: GETMETHOD,
    })
    var httpResponse=(await response.json()) as HttpResponse<string>
    return httpResponse;
}


export const getFamilyDetailFetch =async(id:number)=>{
    var url=`${baseUrl}/family/${id}`;
    var response=await fetch(url,{
        mode:CORS,
        method:GETMETHOD
    })
    var httpResponse=(await response.json()) as HttpResponse<Family>
    return httpResponse;
}
