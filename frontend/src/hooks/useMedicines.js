import { useState, useEffect, useMemo } from "react";
import { medicineService } from "../services/medicineService";

export function useMedicines() {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    // Fetch all medicines 
    const fetchMedicines = async() => {
        let isMounted = true;
        try {
            setLoading(true);
            setError("");

            const data = await medicineService.getAll();

            if (isMounted) {
                setMedicines(data || []);
            }
        } catch(error) {
            console.error("Error fetching medicines: ", error);
            setError("Failed to load medicines");
        } finally {
            setLoading(false);
        }
    };

    // Load medicine on mount
    useEffect(() => {
        fetchMedicines();
    },[])

    // Process Medicine 
    const processedMedicines = useMemo(() => {
        const today = new Date();

        return medicines.map((medicine) => {
            let stockStatus = "In Stock";
            let expiryStatus = "Safe";

            // Stock Status 
            if(medicine.quantity === 0) {
                stockStatus = "Out of Stock";
            } else if(medicine.quantity <= 5) {
                stockStatus = "Low Stock";
            }

            // Expiry Status 
            const expiryDate = new Date(medicine.expiry_date);
            const diffDays = Math.ceil(
                (expiryDate-today) / (1000*60*60*24)
            );
            if(diffDays < 0) {
                expiryStatus = "Expired";
            } else if(diffDays <= 30) {
                expiryStatus = "Near Expiry";
            } else if(diffDays <= 60) {
                expiryStatus = "2 month to Expire";
            } else if(diffDays <= 90) {
                expiryStatus = "3 month to Expire";
            }

            return {
                ...medicine,
                stockStatus,
                expiryStatus,
            };
        });
    }, [medicines]);

    // Dashboard Statistics
    const stats = useMemo(() => {
        const today = new Date();
        
        return{
            totalMedicines: medicines.length,

            totalStock: medicines.reduce(
                (sum, medicine) => sum+ (medicine.quantity || 0),
                0
            ),

            lowStock: medicines.filter(
                (medicine) => medicine.quantity === 0
            ).length,

            nearExpiry: medicines.filter(
                (medicine) => {
                    const expiryDate = new Date(medicine.expiry_date);

                    const diffDays = Math.ceil(
                        (expiryDate-today) / (1000*60*60*24)
                    );

                    return diffDays >= 0 && diffDays<=60; 
                }
            ).length,

            expired: medicines.filter((medicine) => {
                const expiryDate = new Date(medicine.expiry_date);

                const diffDays = Math.ceil(
                    (expiryDate-today) / (1000*60*60*24)
                );

                return diffDays <= 0;
            }).length,

            totalInvertoryValue: medicines.reduce(
                (sum, medicine) => 
                    sum+ (parseFloat(medicine.mrp || 0)*parseInt(medicine.quantity || 0)), 0
            ),
        };
    }, [medicines]);

    return {
        medicines: processedMedicines,
        stats,
        loading,
        error,
        refresh: fetchMedicines,
    }
}