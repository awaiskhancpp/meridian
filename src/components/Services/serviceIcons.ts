import {
  Bath,
  ChefHat,
  ClipboardList,
  Compass,
  Home,
  HousePlus,
  LayoutGrid,
  PencilLine,
  ShelvingUnit,
  type LucideIcon,
} from 'lucide-react'

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  'chef-hat': ChefHat,
  'layout-grid': LayoutGrid,
  bath: Bath,
  home: Home,
  'house-plus': HousePlus,
  'shelving-unit': ShelvingUnit,
  'pencil-line': PencilLine,
  compass: Compass,
  'clipboard-list': ClipboardList,
}

export function getServiceIcon(name?: string) {
  return name ? SERVICE_ICONS[name] : undefined
}
