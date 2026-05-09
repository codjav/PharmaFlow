import React, { useEffect } from "react";
import { X, Pill } from "lucide-react";

export default function MedicineForm({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  isEditing,
  suppliers = [],
}) {
  // Close form with ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Form */}
      <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl border animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex item-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-xl">
              <Pill className="p-2 rounded-xl" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {isEditing
                  ? "Modify Medicine Details"
                  : "Register New Medicine"}
              </h2>

              <p className="text-sm text-gray-500">
                Fill all medicine information carefully
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-6 space-y-5">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            {/* Medicine name */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Medicine Name
              </label>
              <input
                type="text"
                required
                placeholder="Paracetamol 10Tab"
                className="w-full rounded-2xl border bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                value={formData.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            {/* Batch Number */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Batch Number
              </label>
              <input
                type="text"
                required
                placeholder="B2026"
                className="w-full rounded-2xl border bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                value={formData.batch_number || ""}
                onChange={(e) => handleChange("batch_number", e.target.value)}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Category
              </label>
              <input
                type="text"
                required
                placeholder="Tablet/Syrup"
                className="w-full rounded-2xl border bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                value={formData.category || ""}
                onChange={(e) => handleChange("category", e.target.value)}
              />
            </div>

            {/* Company */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Company
              </label>
              <input
                type="text"
                required
                placeholder="Leeford"
                className="w-full rounded-2xl border bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                value={formData.company || ""}
                onChange={(e) => handleChange("company", e.target.value)}
              />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-2 gap-4">
              {/* Supplier */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Supplier
                </label>
                <select
                  className="w-full rounded-2xl border bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  value={formData.supplier_id || ""}
                  onChange={(e) => handleChange("supplier_id", e.target.value)}
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Barcode */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Barcode
                </label>
                <input
                  type="text"
                  required
                  placeholder="Scan or Enter Barcode"
                  className="w-full rounded-2xl border bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  value={formData.barcode || ""}
                  onChange={(e) => handleChange("barcode", e.target.value)}
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-3 gap-4">
              {/* MRP */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  MRP (₹)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full rounded-2xl border bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  value={formData.mrp || ""}
                  onChange={(e) =>
                    handleChange("mrp", parseFloat(e.target.value) || 0)
                  }
                />
              </div>

              {/* Doctor price */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Doctor Price (₹)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full rounded-2xl border bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  value={formData.dr_price || ""}
                  onChange={(e) =>
                    handleChange("dr_price", parseFloat(e.target.value) || 0)
                  }
                />
              </div>

              {/* Price */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Price (₹)
                </label>

                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full rounded-2xl border bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  value={formData.price || ""}
                  onChange={(e) =>
                    handleChange("price", parseFloat(e.target.value) || 0)
                  }
                />
              </div>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-2 gap-4">
              {/* Quantity */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  placeholder="0"
                  className="w-full rounded-2xl border bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  value={formData.quantity || ""}
                  onChange={(e) => 
                    handleChange("quantity", parseInt(e.target.value) || 0)
                  }
                />
              </div>

              {/* Expiry date */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Expiry Date
                </label>
                <input 
                  type="date" 
                  required
                  className="w-full rounded-2xl border bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  value={formData.expiry_date || ""}
                  onChange={(e) => 
                    handleChange("expiry_date", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Footer Button */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-2xl border px-5 py-2.5 text-sm font-medium hover:bg-gray-100 transition cursor-pointer"
                >
                    Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-2xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-indigo-700 transition cursor-pointer"
                >
                    {isEditing ? "Update Medicine" : "Save Medicine"}
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
