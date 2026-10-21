declare module "lucide-react" {
  type IconProps = React.SVGProps<SVGSVGElement> & {
    size?: string | number;
    strokeWidth?: string | number;
  };

  export const CalendarDays: React.ComponentType<IconProps>;
  export const ChevronDown: React.ComponentType<IconProps>;
  export const Edit3: React.ComponentType<IconProps>;
  export const Filter: React.ComponentType<IconProps>;
  export const Search: React.ComponentType<IconProps>;
  export const ShieldAlert: React.ComponentType<IconProps>;
  export const Trash2: React.ComponentType<IconProps>;
  export const Users: React.ComponentType<IconProps>;
  export const X: React.ComponentType<IconProps>;
}
