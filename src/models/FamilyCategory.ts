//https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html

export class FamilyCategory{
    name:string | undefined;
    code:string|undefined;
    parent:FamilyCategory|undefined;
    children:FamilyCategory[]|undefined
}