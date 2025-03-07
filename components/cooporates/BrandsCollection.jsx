"use client"

import React, { useCallback, useEffect, useState } from 'react'
import Brands from './Brands'

function BrandsCollection() {

    const [pharmaticals, setPharmaticals] = useState([]);
    const [medicalDevices, setMedicalDevices] = useState([]);

    const fetchCooporates = useCallback(async () => {
        try {
            const response = await fetch(
                '/api/cooporates'
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch cooporates");
            }

            const data = await response.json();

            setPharmaticals(data.pharmaticalCooporates);
            setMedicalDevices(data.medicalDeviceCooporates);

        } catch (error) {
            console.error("Error fetching cooporates:", error);
        }
    }, []);

    useEffect(() => {
        fetchCooporates();
    }, [fetchCooporates]);

    return (
        <>
            <section className="flat-spacing-4">
                <div className="container-full">
                    <div className="flat-title-v2" style={{ justifyContent: 'center' }}>
                        <h5
                            className="fw-7 text-uppercase title wow fadeInUp"
                            data-wow-delay="0s"
                        >
                            Pharmatical cooporate
                        </h5>
                    </div>
                    <Brands cooporates={pharmaticals}/>
                </div>
            </section>
            <section className="flat-spacing-4">
                <div className="container-full">
                    <div className="flat-title-v2" style={{ justifyContent: 'center' }}>
                        <h5
                            className="fw-7 text-uppercase title wow fadeInUp"
                            data-wow-delay="0s"
                        >
                            Medical Devices cooporate
                        </h5>
                    </div>
                    <Brands cooporates={medicalDevices}/>
                </div>
            </section>
        </>
    )
}

export default BrandsCollection