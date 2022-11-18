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

//获取所有的族类别
export const getFamilyCategoryFetch=async () => {
    var url=`${baseUrl}/family/categories`
    var response=await fetch(url,{
        mode: CORS,
        method: GETMETHOD,
    })
 var httpResponse=(await response.json()) as HttpResponse<DataNode[]>
 return httpResponse;
}

//根据关键字搜索族
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

//根据族类别获取族
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

//获取族详情
export const getFamilyDetailFetch =async(id:number)=>{
    var url=`${baseUrl}/family/${id}`;
    var response=await fetch(url,{
        mode:CORS,
        method:GETMETHOD
    })
    var httpResponse=(await response.json()) as HttpResponse<Family>
    return httpResponse;
}
//获取族的版本
export const getFamilyVersionsFetch=async(id:number)=>{
    var url=`${baseUrl}/family/versions/${id}`;
    var response=await fetch(url,{
        mode:CORS,
        method:GETMETHOD
    })
    var httpResponse=(await response.json()) as HttpResponse<number[]>
    return httpResponse;
}
//根据id获取族文件
export const getFamilyFileByIdFetch=async(id:number,version:number)=>{
    var url=`${baseUrl}/family/${id}/${version}`;
    try {
        var response=await fetch(url,{
        mode:CORS,
        method:GETMETHOD,
        })
        const {status}=response;
    if (status===200) {
        return response.blob();
    }
    } catch (error) {
        console.log(error);
    }
     return undefined;
}

