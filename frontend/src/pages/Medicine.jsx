import { useState } from "react";
import { useMedicines } from "../hooks/useMedicines";
import { medicineService } from "../services/medicineService";
import MedicineModal from "../components/MedicineForm";
import SideBar from "../components/SideBar";
import StatCard from "../components/StatCard";
import Topbar from "../components/TopBar";
import {
  Search,
  Pill,
  AlertTriangle,
  PackageX,
  CalendarClock,
  Pencil,
  Trash2,
  Plus,
  IndianRupee,
} from "lucide-react";
import Supplier from "./Supplier";

const Medicine = () => {
  const { medicines, stats, loading, error, refresh } = useMedicines();

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);

  const initialFormState = {
    name: "",
    batch_number: "",
    category: "",
    company: "",
    supplier_id: "",
    barcode: "",
    mrp: 0,
    dr_price: 0,
    price: 0,
    quantity: 0,
    expiry_date: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  // Search Filter
  const filteredMedicines = medicines.filter((m) =>
    `${m.name} ${m.company} ${m.category} ${m.batch_number}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  // Alerts
  const alerts = medicines.filter(
    (m) => m.stockStatus === "Low Stock" || m.stockStatus === "Out of Stock",
  );

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingMedicine) {
        await medicineService.update(editingMedicine.id, formData);
      } else {
        await medicineService.create(formData);
      }

      await refresh();

      setIsModalOpen(false);
      setEditingMedicine(null);
      setFormData(initialFormState);
    } catch (err) {
      console.error(err);

      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

  // Delete Medicine
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?",
    );

    if (!confirmDelete) return;

    try {
      await medicineService.delete(id);
      refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete medicine");
    }
  };

  // Open Add Modal
  const openAddModal = () => {
    setEditingMedicine(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (medicine) => {
    setEditingMedicine(medicine);

    setFormData({
      name: medicine.name || "",
      batch_number: medicine.batch_number || "",
      category: medicine.category || "",
      company: medicine.company || "",
      supplier_id: medicine.supplier_id || "",
      barcode: medicine.barcode || "",
      mrp: medicine.mrp || 0,
      dr_price: medicine.dr_price || 0,
      price: medicine.price || 0,
      quantity: medicine.quantity || 0,
      expiry_date: medicine.expiry_date || "",
    });

    setIsModalOpen(true);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <SideBar />

      {/* Medical */}
      <div className="min-h-screen w-full bg-gray-100">
        {/* Navbar */}
        <div className="h-20 bg-white px-4 flex items-center justify-between">
          <Topbar
            name="Medicine Management"
            description="Manage medicine inventory and stock"
          />

          {/* Search */}
          <div className="flex items-center gap-3 border rounded-2xl px-4 py-3 bg-gray-50 w-96">
            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 py-8">
          {/* Top Actions */}
          <div className="flex items-center justify-end mb-6">
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-white shadow-md hover:bg-indigo-700 transition"
            >
              <Plus size={18} />
              Add Medicine
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-5 gap-6 mb-8">
            <StatCard
              title="Total Medicines"
              value={stats.totalMedicines}
              sub="Inventory items"
              icon={Pill}
              bg="bg-blue-100"
              text="text-blue-600"
            />

            <StatCard
              title="Low Stock"
              value={stats.lowStock}
              sub="Need refill"
              icon={AlertTriangle}
              bg="bg-yellow-100"
              text="text-yellow-600"
            />

            <StatCard
              title="Out Of Stock"
              value={stats.outOfStock}
              sub="Unavailable items"
              icon={PackageX}
              bg="bg-red-100"
              text="text-red-600"
            />

            <StatCard
              title="Near Expiry"
              value={stats.nearExpiry}
              sub="Within 60 days"
              icon={CalendarClock}
              bg="bg-green-100"
              text="text-green-600"
            />

            <StatCard
              title="Inventory Value"
              value={`₹${stats.totalInventoryValue}`}
              sub="Total stock worth"
              icon={IndianRupee}
              bg="bg-purple-100"
              text="text-purple-600"
            />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-10 gap-4">
            {/* Table */}
            <div className="col-span-10 overflow-hidden rounded-3xl bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-sm text-gray-600">
                    <tr>
                      <th className="px-4 py-4 text-left">Medicine</th>
                      <th className="px-4 py-4 text-sm text-left">Company</th>
                      <th className="px-4 py-4 text-sm text-left">Category</th>
                      <th className="px-4 py-4 text-sm text-left">MRP</th>
                      <th className="px-4 py-4 text-sm text-left">DR Price</th>
                      <th className="px-4 py-4 text-sm text-left">Price</th>
                      <th className="px-4 py-4 text-sm text-left">Quantity</th>
                      <th className="px-4 py-4 text-sm text-left">Expiry</th>
                      <th className="px-4 py-4 text-sm text-left">Status</th>
                      <th className="px-4 py-4 text-sm text-left">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td
                          colSpan="10"
                          className="py-10 text-center text-gray-500"
                        >
                          Loading Medicines...
                        </td>
                      </tr>
                    ) : filteredMedicines.length === 0 ? (
                      <tr>
                        <td
                          colSpan="10"
                          className="py-10 text-center text-gray-500"
                        >
                          No medicines Found
                        </td>
                      </tr>
                    ) : (
                      filteredMedicines.map((m) => {
                        <tr key={m.id} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <p className="font-semibold text-gray-800">
                              {m.name}
                            </p>
                          </td>
                          <td className="px-4 py-4">{m.company}</td>
                          <td className="px-4 py-4">{m.category || "-"}</td>
                          <td className="px-4 py-4">₹{m.mrp}</td>
                          <td className="px-4 py-4">₹{m.dr_price}</td>
                          <td className="px-4 py-4">₹{m.price}</td>
                          <td className="px-4 py-4">{m.quantity}</td>
                          <td className="px-4 py-4">
                            <span
                              className={`text-xs font-semibold
                              ${
                                m.expiryStatus === "Near Expiry"
                                  ? "bg-red-100 text-red-700"
                                  : m.expiryStatus === "3 month to Expire"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : m.expiryStatus === "Expired"
                                      ? "bg-blue-100 text-blue-700"
                                      : ""
                              }`}
                            >
                              {m.expiry_date}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold
                                ${
                                  m.stockStatus === "In stock"
                                    ? "bg-green-100 text-green-700"
                                    : m.stockStatus === "Low Stock"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                }
                              `}
                            >
                              {m.stockStatus}
                            </span>
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => {
                                  openEditModal(m);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Pencil size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(m.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>;
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <MedicineModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          isEditing={!!editingMedicine}
        />
      </div>
    </div>
  );
};

export default Medicine;
