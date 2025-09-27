import { useState, useRef, useEffect } from 'react';
import {
  FiX,
  FiCamera,
  FiDollarSign,
  FiFileText,
  FiUpload,
  FiUser,
} from 'react-icons/fi';

function EditPackageModal({ isOpen, onClose, onEditPackage, packageData }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Reset form ketika packageData berubah atau modal dibuka
  useEffect(() => {
    if (packageData && isOpen) {
      setFormData({
        name: packageData.name || '',
        price: packageData.price || '',
        description: packageData.description || '',
        image: null,
      });
      setImagePreview(
        packageData.image
          ? `http://localhost:3000/uploads/${packageData.image}`
          : ''
      );
    }
  }, [packageData, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setImagePreview(
      packageData.image
        ? `http://localhost:3000/uploads/${packageData.image}`
        : ''
    );
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('price', formData.price);
      submitData.append('description', formData.description);

      // Hanya append image jika ada perubahan
      if (formData.image) {
        submitData.append('image', formData.image);
      }

      // Tambahkan ID untuk update
      submitData.append('id_catalogue', packageData.id_catalogue);

      console.log('Data edit yang dikirim:');
      for (let [key, value] of submitData.entries()) {
        console.log(key, value);
      }

      await onEditPackage(submitData, packageData.id_catalogue);
    } catch (error) {
      console.error('Error editing package:', error);
      alert('Error editing package: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs  bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800">Edit Package</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition duration-200">
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiCamera className="inline mr-1" />
                Package Image
              </label>

              {imagePreview && (
                <div className="mb-3">
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-pink-200"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600">
                      ×
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Current image. Upload new image to replace.
                  </p>
                </div>
              )}

              <div
                className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition duration-200 ${
                  formData.image
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-300 hover:border-pink-400 hover:bg-pink-50'
                }`}
                onClick={() => fileInputRef.current?.click()}>
                <FiUpload className="text-2xl text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {formData.image
                    ? 'New image selected ✓'
                    : 'Click to change image'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, JPEG (Max 5MB)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Package Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiUser className="inline mr-1" />
                Package Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Enter package name"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiDollarSign className="inline mr-1" />
                Price (IDR) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="5000000"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiFileText className="inline mr-1" />
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Describe the package details..."
              />
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
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Updating...
                </>
              ) : (
                'Update Package'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPackageModal;
