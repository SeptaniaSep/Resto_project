import type { Menu } from "../../hooks/Menu";

type Props = {
  item: Menu;
  onAdd: () => void;
  onRemove: () => void;
};

export default function MenuItemCard({ item,  onAdd, onRemove }: Props) {
  return (
    <div className="grid gap-2">
      <div className="bg-2 flex rounded-lg p-3 shadow h-24 w-full">
        {/* Kiri: nama + harga */}
        <div className="flex flex-col justify-start flex-1">
          <p className="font-medium text-1 text-sm break-words">{item.name}</p>
          <p className="text-xs text-1 mt-1">Rp {item.price}</p>
        </div>

        {/* Kanan: tombol */}
        <div className="flex items-start">
          <button
            onClick={onAdd}
            className="w-7 h-7 flex items-center justify-center bgbutton-1 text-white rounded text-sm"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
