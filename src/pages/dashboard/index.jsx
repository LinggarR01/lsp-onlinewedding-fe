import { useEffect, useState } from 'react';
import CatalogTable from './components/CatalogTable';
import {
  FiPackage,
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
  FiSettings,
} from 'react-icons/fi';
import AddPackageModal from './components/AddPackageModal';
import EditPackageModal from './components/EditPackageModal';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('catalog');
  // State untuk modal kebuka atau ketutup gitu
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // Ngedit package
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Tambahin Package
  const handleAddPackage = async (formData) => {
    try {
      console.log('Sending data to API...');
      const response = await fetch('http://localhost:3000/api/catalog', {
        method: 'POST',
        body: formData, // Langsung kirim FormData (include file)
      });
      console.log('Response status:', response.status);
      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        // Refresh data
        const updatedResponse = await fetch(
          'http://localhost:3000/api/catalog'
        );
        const updatedData = await updatedResponse.json();
        setData(updatedData);
        setIsModalOpen(false);
        alert('Package added successfully!');
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add package');
      }
    } catch (err) {
      console.error('Error adding package:', err);
      alert('Error: ' + err.message);
    }
  };
  // Buat delete package
  const handleDeleteClick = async (packageId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/catalog/${packageId}`,
        {
          method: 'DELETE',
        }
      );
      if (response.ok) {
        const updatedResponse = await fetch(
          'http://localhost:3000/api/catalog'
        );
        console.log('Response status:', updatedResponse.status);
        const updatedData = await updatedResponse.json();
        setData(updatedData);
        alert('Package deleted successfully!');
      }
    } catch (err) {
      console.error('Error deleting package:', err);
      alert('Error: ' + err.message);
    }
  };
  // Buat edit package
  const handleEditPackage = async (formData, packageId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/catalog/${packageId}`,
        {
          method: 'PUT',
          body: formData,
        }
      );
      if (response.ok) {
        const updatedResponse = await fetch(
          'http://localhost:3000/api/catalog'
        );
        const updatedData = await updatedResponse.json();
        setData(updatedData);
        setIsEditModalOpen(false);
        setSelectedPackage(null);
        alert('Package updated successfully!');
      }
    } catch (err) {
      console.error('Error editing package:', err);
      alert('Error: ' + err.message);
    }
  };
  // Function untuk buka edit modal
  const handleEditClick = (packageData) => {
    setSelectedPackage(packageData);
    setIsEditModalOpen(true);
  };

  // Fetch data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/catalog');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  // Ngitung statistik di dashboard
  const totalPackages = data.length;
  const totalOrders = 0;
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white shadow-lg transition-all duration-300`}>
        <div className="p-4">
          {sidebarOpen ? (
            <h1 className="text-2xl font-bold text-pink-600">Dashboard</h1>
          ) : (
            <div className="text-2xl text-pink-600">💍</div>
          )}
        </div>
        <nav className="mt-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center w-full px-4 py-3 transition duration-200 ${
              activeTab === 'dashboard'
                ? 'bg-pink-50 border-r-4 border-pink-500 text-pink-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}>
            <FiTrendingUp className="text-xl" />
            {sidebarOpen && <span className="ml-3 font-medium">Dashboard</span>}
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center w-full px-4 py-3 transition duration-200 ${
              activeTab === 'catalog'
                ? 'bg-pink-50 border-r-4 border-pink-500 text-pink-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}>
            <FiPackage className="text-xl" />
            {sidebarOpen && <span className="ml-3 font-medium">Catalog</span>}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center w-full px-4 py-3 transition duration-200 ${
              activeTab === 'orders'
                ? 'bg-pink-50 border-r-4 border-pink-500 text-pink-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}>
            <FiDollarSign className="text-xl" />
            {sidebarOpen && <span className="ml-3 font-medium">Orders</span>}
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center w-full px-4 py-3 transition duration-200 ${
              activeTab === 'settings'
                ? 'bg-pink-50 border-r-4 border-pink-500 text-pink-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}>
            <FiSettings className="text-xl" />
            {sidebarOpen && <span className="ml-3 font-medium">Settings</span>}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Dashboard Stats */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Dashboard Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Packages Card */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-pink-100 rounded-lg">
                      <FiPackage className="text-2xl text-pink-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Total Packages
                      </p>
                      <p className="text-2xl font-bold text-gray-800">
                        {totalPackages}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Total Orders Card */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <FiDollarSign className="text-2xl text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Total Orders
                      </p>
                      <p className="text-2xl font-bold text-gray-800">
                        {totalOrders}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Catalog Page */}
          {activeTab === 'catalog' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Wedding Catalog
                </h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center">
                  <FiPackage className="mr-2" />
                  Add New Package
                </button>
              </div>
              <CatalogTable
                data={data}
                loading={loading}
                error={error}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
              />
              {/* Modal Component */}
              <AddPackageModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddPackage={handleAddPackage}
              />
              <EditPackageModal
                isOpen={isEditModalOpen}
                onClose={() => {
                  setIsEditModalOpen(false);
                  setSelectedPackage(null);
                }}
                onEditPackage={handleEditPackage}
                packageData={selectedPackage}
              />
            </div>
          )}

          {/* Orders Page */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Orders Management
              </h2>
              <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
                <FiUsers className="text-4xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Orders Section
                </h3>
                <p className="text-gray-500">
                  This section is under development
                </p>
              </div>
            </div>
          )}
          {/* Settings Page */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Orders Management
              </h2>
              <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
                <FiUsers className="text-4xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Orders Section
                </h3>
                <p className="text-gray-500">
                  This section is under development
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
