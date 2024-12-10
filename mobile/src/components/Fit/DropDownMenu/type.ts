export type DropDownMenuProps = {
  text: string;
  selectedItem: string | null;
  onSelect: (item: string) => void;
  data: {id: number; label: string}[];
};
