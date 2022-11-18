import { FamilyCategory } from "./familyCategory";

export class Family {
    id:number;
    name:string;
    uploader:string|undefined;
    createTime:string;
    updateTime:string;
    version:number;
    fileId:string;
    imageUrl:string;
    category:FamilyCategory|undefined
}