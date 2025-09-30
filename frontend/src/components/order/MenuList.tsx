import { useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard";
import StatusDropdown from "./StatusDropDown";
import type { TableStatus } from "../../data/Tables";
import { getMenu, type Menu } from "../../hooks/Menu";

type MenuListProps = {
  onAddItem: (item: Menu) => void;
  onRemoveItem: (item: Menu) => void;
  tableStatus: TableStatus;
  setTableStatus: React.Dispatch<React.SetStateAction<TableStatus>>;
};

export default function MenuList({
  onAddItem,
  onRemoveItem,
  tableStatus,
  setTableStatus,
}: MenuListProps) {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await getMenu();
        setMenuItems(res.data);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) return <p>Loading menu...</p>;

  return (
    <div className="flex-1 bg-gray-50 rounded-lg p-4 shadow flex flex-col gap-4">
      {/* Dropdown Status Meja */}
      <StatusDropdown value={tableStatus} onChange={setTableStatus} />

      {/* Grid Menu */}
      <div className="grid grid-cols-5 gap-4 overflow-y-auto max-h-[500px] pr-2">
        {Array.isArray(menuItems) &&
          menuItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onAdd={() => onAddItem(item)}
              onRemove={() => onRemoveItem(item)}
            />
          ))}
      </div>
    </div>
  );
}
