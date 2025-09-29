import { useEffect, useState } from 'react';
import CatalogTable from './components/CatalogTable';
import {
  FiPackage,
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi';
import AddPackageModal from './components/AddPackageModal';
import EditPackageModal from './components/EditPackageModal';
import OrderTable from './components/OrderTable';
import EditOrderModal from './components/EditOrderModal';
import AddOrderModal from './components/AddOrderModal';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  // State untuk auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // State untuk nampung data dari API
  const [catalogData, setCatalogData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);

  // State buat loading & error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State buat UI
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('catalog');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isEditOrderModalOpen, setIsEditOrderModalOpen] = useState(false);

  // State package dan Order yang dipilih untuk edit
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  // State navigate
  const navigate = useNavigate();

  // Fetch data function
  const fetchData = async () => {
    try {
      setLoading(true);
      const [catalogResponse, ordersResponse] = await Promise.all([
        fetch('http://localhost:3000/api/catalog'),
        fetch('http://localhost:3000/api/orders'),
      ]);

      const [catalogResult, ordersResult] = await Promise.all([
        catalogResponse.json(),
        ordersResponse.json(),
      ]);

      setCatalogData(catalogResult);
      setOrdersData(ordersResult);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    navigate('/');
  };

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
        // Refresh catalog data
        const updatedResponse = await fetch(
          'http://localhost:3000/api/catalog'
        );
        const updatedData = await updatedResponse.json();
        setCatalogData(updatedData);
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
        // Refresh catalog data
        const updatedResponse = await fetch(
          'http://localhost:3000/api/catalog'
        );
        const updatedData = await updatedResponse.json();
        setCatalogData(updatedData);
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
        // Refresh catalog data
        const updatedResponse = await fetch(
          'http://localhost:3000/api/catalog'
        );
        const updatedData = await updatedResponse.json();
        setCatalogData(updatedData);
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

  const handleEditOrderClick = (orderData) => {
    setSelectedOrder(orderData);
    setIsEditOrderModalOpen(true);
  };

  const handleDeleteClickOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/orders/${orderId}`,
        {
          method: 'DELETE',
        }
      );
      if (response.ok) {
        // Refresh catalog data
        const updatedResponse = await fetch('http://localhost:3000/api/orders');
        const updatedData = await updatedResponse.json();
        setOrdersData(updatedData);
        alert('Package deleted successfully!');
      }
    } catch (err) {
      console.error('Error deleting package:', err);
      alert('Error: ' + err.message);
    }
  };

  // Tambahin Package
  const handleAddOrder = async (formData) => {
    try {
      console.log('Sending order data to API...');
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // KIRIM SEBAGAI JSON
        },
        body: JSON.stringify(formData), // CONVERT KE JSON
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        // Refresh orders data
        const updatedResponse = await fetch('http://localhost:3000/api/orders');
        const updatedData = await updatedResponse.json();
        setOrdersData(updatedData);
        setIsOrderModalOpen(false);
        alert('Order added successfully!'); // UBAH PESAN
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add order');
      }
    } catch (err) {
      console.error('Error adding order:', err);
      alert('Error: ' + err.message);
    }
  };

  const handleEditOrder = async (formData, orderId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/orders/${orderId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Refresh orders data
        const updatedResponse = await fetch('http://localhost:3000/api/orders');
        const updatedData = await updatedResponse.json();
        setOrdersData(updatedData);
        setIsEditOrderModalOpen(false);
        setSelectedOrder(null);
        alert('Order updated successfully!');
      }
    } catch (err) {
      console.error('Error editing order:', err);
      alert('Error: ' + err.message);
    }
  };

  // Fetch data dari API (CATALOG & ORDERS)
  useEffect(() => {
    // Cek session di localStorage
    const session = localStorage.getItem('userSession');

    if (!session) {
      // Redirect ke login jika tidak ada session
      navigate('/login');
      return;
    }

    try {
      const sessionData = JSON.parse(session);
      setUser(sessionData.user);
      fetchData();
    } catch (error) {
      // Jika session corrupt, redirect ke login
      localStorage.removeItem('userSession');
      navigate('/login');
    }
  }, [navigate]);

  // Ngitung statistik di dashboard - SEKARANG PAKE DATA REAL
  const totalPackages = catalogData.length;
  const totalOrders = ordersData.length;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

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
          <button
            onClick={handleLogout}
            className={`flex items-center w-full px-4 py-3 transition duration-200 text-gray-600 hover:bg-gray-100 ${
              sidebarOpen ? 'justify-start' : 'justify-center'
            }`}>
            <FiLogOut className="text-xl" />
            {sidebarOpen && <p className="ml-3 font-medium">Logout</p>}
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
                data={catalogData}
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Orders Management
                </h2>
                <button
                  onClick={() => setIsOrderModalOpen(true)}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center">
                  <FiDollarSign className="mr-2" />
                  Add New Order
                </button>
              </div>
              <div className="bg-white ">
                <OrderTable
                  data={ordersData}
                  loading={loading}
                  error={error}
                  onEditClick={handleEditOrderClick}
                  onDeleteClick={handleDeleteClickOrder}
                />
              </div>
              <AddOrderModal
                isOpen={isOrderModalOpen}
                onClose={() => setIsOrderModalOpen(false)}
                onAddOrder={handleAddOrder}
                catalogData={catalogData}
              />
              <EditOrderModal
                isOpen={isEditOrderModalOpen}
                onClose={() => {
                  setIsEditOrderModalOpen(false);
                  setSelectedPackage(null);
                }}
                onEditOrder={handleEditOrder}
                orderData={selectedOrder}
                catalogData={catalogData}
              />
            </div>
          )}
          {/* Settings Page */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Settings
              </h2>
              <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
                <FiSettings className="text-4xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Setting Section
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
