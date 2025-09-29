import { useState, useRef, useEffect } from 'react';
import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiPackage,
} from 'react-icons/fi';

function AddOrderModal({ isOpen, onClose, onAddOrder, catalogData }) {
  const [formData, setFormData] = useState({
    id_catalogue: '',
    cust_name: '',
    email: '',
    phone_number: '',
    wedding_date: '',
    STATUS: 'requested',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form ketika modal dibuka
  useEffect(() => {
    if (isOpen) {
      setFormData({
        id_catalogue: '',
        cust_name: '',
        email: '',
        phone_number: '',
        wedding_date: '',
        STATUS: 'requested',
      });
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Data order baru yang dikirim:', formData);

      await onAddOrder(formData); // TIDAK PERLU orderId UNTUK ADD
    } catch (error) {
      console.error('Error adding order:', error);
      alert('Error adding order: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get selected package name for display
  const getSelectedPackageName = () => {
    if (!formData.id_catalogue || !catalogData) return '';
    const selectedPackage = catalogData.find(
      (pkg) => pkg.id_catalogue == formData.id_catalogue
    );
    return selectedPackage ? selectedPackage.package_name : '';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800">Add New Order</h3>{' '}
          {/* UBAH TITLE */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition duration-200">
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Customer Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiUser className="inline mr-1" />
                Customer Name *
              </label>
              <input
                type="text"
                name="cust_name"
                value={formData.cust_name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter customer name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiMail className="inline mr-1" />
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="customer@email.com"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiPhone className="inline mr-1" />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="08123456789"
              />
            </div>

            {/* Wedding Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiCalendar className="inline mr-1" />
                Wedding Date *
              </label>
              <input
                type="date"
                name="wedding_date"
                value={formData.wedding_date}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Package Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiPackage className="inline mr-1" />
                Package *
              </label>
              <select
                name="id_catalogue"
                value={formData.id_catalogue}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select a package</option>
                {catalogData &&
                  catalogData.map((pkg) => (
                    <option key={pkg.id_catalogue} value={pkg.id_catalogue}>
                      {pkg.package_name} - Rp {pkg.price?.toLocaleString()}
                    </option>
                  ))}
              </select>
              {formData.id_catalogue && (
                <p className="text-xs text-gray-500 mt-1">
                  Selected: {getSelectedPackageName()}
                </p>
              )}
            </div>

            {/* Status (Optional untuk Add) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="STATUS"
                value={formData.STATUS}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="requested">Requested</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
              {isSubmitting ? (
                <>
                  {' '}
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>{' '}
                  Creating...{' '}
                </>
              ) : (
                'Create Order'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddOrderModal;
