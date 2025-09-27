function CatalogTable({ data, loading, error, onEditClick, onDeleteClick }) {
  if (loading) {
    return (
      // TAILWIND LOADING STATE
      <div className="flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
        <p className="text-gray-600 text-lg">Loading wedding catalog...</p>
      </div>
    );
  }

  if (error) {
    return (
      // TAILWIND ERROR STATE
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-500 text-4xl mb-2">⚠️</div>
        <h3 className="text-red-800 font-semibold text-lg mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200">
          Try Again
        </button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      // TAILWIND EMPTY STATE
      <div className="text-center p-8 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="text-yellow-500 text-4xl mb-2">📝</div>
        <h3 className="text-yellow-800 font-semibold">No Data Available</h3>
        <p className="text-yellow-600">No wedding catalog items found.</p>
      </div>
    );
  }

  const tableData = Array.isArray(data) ? data : [data];

  return (
    // Tabel
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Head */}
          <thead className="bg-gradient-to-r from-pink-500 to-red-500">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider border-b">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider border-b">
                Package Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider border-b">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider border-b">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider border-b">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-pink-50 transition duration-200 even:bg-gray-50">
                {/* ID Catalogue */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-pink-100 text-pink-800 rounded-full text-sm font-bold">
                    {item.id_catalogue || rowIndex + 1}
                  </span>
                </td>

                {/* Name */}
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {item.name || 'No name'}
                  </div>
                </td>

                {/* Price */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-green-600">
                    {item.price
                      ? `Rp ${Number(item.price).toLocaleString('id-ID')}`
                      : '-'}
                  </div>
                </td>

                {/* Description */}
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 max-w-xs truncate">
                    {item.description || 'No description'}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onEditClick(item)}
                    className="text-black bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-lg transition duration-200 mr-3">
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteClick(item.id_catalogue)}
                    className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg transition duration-200">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CatalogTable;
