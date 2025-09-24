type QuickStatusProps = {
  available: number;
  occupied: number;
  reserved: number;
  inactive: number;
};

export default function QuickStatus({
  available,
  occupied,
  reserved,
  inactive,
}: QuickStatusProps) {
  return (
    <div className="w-1/4 bg-gray-50 rounded-lg p-4 shadow-sm">
      <h1 className="text-lg font-semibold text-gray-800 mb-2">Quick Status</h1>

      <div className="grid gap-2">
        <div className="border border-gray-300 bg-white rounded-sm p-2 grid items-center">
          <p className="text-xl">{available}</p>
          <p className="text-sm">Available</p>
        </div>
        <div className="border border-gray-300 bg-white rounded-sm p-2 grid items-center">
          <p className="text-xl">{occupied}</p>
          <p className="text-sm">Occupied</p>
        </div>
        <div className="border border-gray-300 bg-white rounded-sm p-2 grid items-center">
          <p className="text-xl">{reserved}</p>
          <p className="text-sm">Reserved</p>
        </div>
        <div className="border border-gray-300 bg-white rounded-sm p-2 grid items-center">
          <p className="text-xl">{inactive}</p>
          <p className="text-sm">Inactive</p>
        </div>
      </div>
    </div>
  );
}
