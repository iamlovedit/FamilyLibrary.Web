import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Family } from '../models/family';
import { getFamilyDetailFetch } from "../services/family";
import './index.css'

function FamilyDetail() {
    const { id } = useParams();
    const [family, setFamily] = useState<Family>(new Family())
    async function getFamilyDetail(id: number) {
        var httpResponse = await getFamilyDetailFetch(id);
        if (httpResponse.success) {
            var familyObj = httpResponse.response;
            setFamily(familyObj);
        }
    }

    useEffect(() => {
        getFamilyDetail(Number(id));
    }, [id])

    return (
        <div>
            {family.id}
        </div>
    )
}

export default FamilyDetail