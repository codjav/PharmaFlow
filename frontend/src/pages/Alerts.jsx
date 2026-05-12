import React from "react";
import SideBar from "../components/SideBar";
import Topbar from "../components/TopBar";
import StatCard from "../components/StatCard";
import { useMedicines } from "../hooks/useMedicines";
import {
  AlertTriangle,
  PackageX,
  CalendarClock,
  CalendarX,
} from "lucide-react";

const Alerts = () => {
  const { medicines, stats, loading, error, refresh } = useMedicines();

  // Alerts
  const alerts = medicines.filter(
    (m) => m.stockStatus === "Low Stock" || m.stockStatus === "Out of Stock",
  );

  // Expiry alerts
  const expAlerts = medicines.filter(
    (m) =>
      m.expiryStatus === "Near Expiry" ||
      m.expiryStatus === "3 month to Expire",
  );

  // Expired
  const expired = medicines.filter((m) => m.expiryStatus === "Expired");

  return (
    <div className="flex">
      {/* SideBar */}
      <SideBar />

      <div className="min-h-screen w-full bg-gray-100">
        {/* Navbar */}
        <Topbar
          name="Medicine Alerts"
          description="Showing low stock and near expiry medicines"
        />

        {/* Main Content */}
        <div className="px-4 py-8">
          {/* Stats */}
          <div className="grid grid-cols-5 gap-6 mb-8">
            <StatCard
              title="Low Stock"
              value={stats.lowStock}
              sub="Need Refill"
              icon={AlertTriangle}
              bg="bg-blue-100"
              text="text-blue-600"
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
              title="3 Months to Expire"
              value={stats.totalMedicines}
              sub="Within 90 days"
              icon={CalendarClock}
              bg="bg-green-100"
              text="text-green-600"
            />

            <StatCard
              title="Near Expiry"
              value={stats.nearExpiry}
              sub="Within 60 days"
              icon={CalendarClock}
              bg="bg-orange-100"
              text="text-orange-600"
            />

            <StatCard
              title="Expired"
              value={stats.expired}
              sub="Expired Items"
              icon={CalendarX}
              bg="bg-red-100"
              text="text-red-600"
            />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Alerts For Stock */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="mb-5 text-lg font-bold text-gray-800">
                Low Stock Medicines
              </h3>

              {Alerts.length === 0 ? (
                <div className="rounded-2xl bg-green-50 p-4 text-sm text-green-700">
                  All medicines are sufficiently stocked.
                </div>
              ) : (
                alerts.map((a) => (
                  <div
                    key={a.id}
                    className="mb-3 rounded-2xl border border-yellow-100 bg-yellow-50 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-yellow-900">
                          {a.name}
                        </p>
                        <p className="text-xs text-yellow-700">
                          Quantity: {a.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Alerts for Expiry */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="mb-5 text-lg font-bold text-gray-800">
                Near Expiry Medicines
              </h3>

              {Alerts.length === 0 ? (
                <div className="rounded-2xl bg-green-50 p-4 text-sm text-green-700">
                  All medicines have sufficient expiry.
                </div>
              ) : (
                expAlerts.map((a) => (
                  <div
                    key={a.id}
                    className="mb-3 rounded-2xl border border-yellow-100 bg-yellow-50 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className={`font-semibold
                            ${
                            a.expiryStatus === "Near Expiry"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`
                          }
                        >
                          {a.name}
                        </p>
                        <p className={`text-xs 
                            ${
                            a.expiryStatus === "Near Expiry"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`
                          }>
                          Expiry: {a.expiry_date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Alerts for Expired */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="mb-5 text-lg font-bold text-gray-800">
                Expired Medicines
              </h3>

              {Alerts.length === 0 ? (
                <div className="rounded-2xl bg-green-50 p-4 text-sm text-green-700">
                  No expired medicines.
                </div>
              ) : (
                expired.map((a) => (
                  <div
                    key={a.id}
                    className="mb-3 rounded-2xl border border-yellow-100 bg-yellow-50 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-blue-900">
                          {a.name}
                        </p>
                        <p className="text-xs text-blue-700">
                          Expiry: {a.expiry_date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
