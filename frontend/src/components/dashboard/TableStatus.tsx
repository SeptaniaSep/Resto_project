export default function TableStatus() {
  return (
    <div className="rounded-md bg-gray-50 p-3 shadow-sm">
      <p className="text-sm font-medium text-gray-700 mb-2">Table Status</p>
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-gray-300 rounded-sm"></span>
          <span className="text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-gray-700 rounded-sm"></span>
          <span className="text-sm text-gray-600">Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-blue-400 rounded-sm"></span>
          <span className="text-sm text-gray-600">Reserved</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-gray-400 rounded-sm"></span>
          <span className="text-sm text-gray-600">Inactive</span>
        </div>
      </div>
    </div>
  );
}
