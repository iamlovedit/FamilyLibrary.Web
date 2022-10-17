import { FamilyCategory } from "../models/FamilyCategory";

const env= process.env.NODE_ENV
let baseUrl='';
if (env==="development") {
    baseUrl='https://localhost:5001/api'
}
else if (env==="production") {
    baseUrl='https://galaservice.goufeifei.xyz/api'
}

export const getFamilyCategoryFetch=async () => {
    
}
