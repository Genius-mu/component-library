import * as React from "react";

/** Theme palette tokens are driven by CSS variables; values are "dark" | "light". */
export type Theme = "dark" | "light";
export type Size = "sm" | "md" | "lg";
export type ToastType = "info" | "success" | "warning" | "error";
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

type LucideIcon = React.ComponentType<{ className?: string; size?: number | string }>;

// ---------- Inputs & controls ----------

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  icon?: LucideIcon;
  className?: string;
  children?: React.ReactNode;
}
export const Button: React.FC<ButtonProps>;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  error?: string;
  className?: string;
}
export const Input: React.FC<InputProps>;

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id?: string;
  error?: string;
  rows?: number;
  className?: string;
}
export const Textarea: React.FC<TextareaProps>;

export interface SelectOption {
  label: string;
  value: string | number;
}
export interface SelectProps {
  options: Array<SelectOption | string | number>;
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}
export const Select: React.FC<SelectProps>;

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}
export const Checkbox: React.FC<CheckboxProps>;

export interface RadioGroupProps {
  value?: string | number;
  onChange?: (value: string | number) => void;
  children?: React.ReactNode;
  className?: string;
}
export const RadioGroup: React.FC<RadioGroupProps>;

export interface RadioProps {
  value: string | number;
  label?: string;
  disabled?: boolean;
  className?: string;
}
export const Radio: React.FC<RadioProps>;

export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: Size;
  className?: string;
}
export const Switch: React.FC<SwitchProps>;

export interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  disabled?: boolean;
  className?: string;
}
export const Slider: React.FC<SliderProps>;

// ---------- Overlays ----------

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}
export const Modal: React.FC<ModalProps>;

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  side?: "left" | "right" | "top" | "bottom";
  title?: string;
  children?: React.ReactNode;
  className?: string;
}
export const Drawer: React.FC<DrawerProps>;

export interface TooltipProps {
  content: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}
export const Tooltip: React.FC<TooltipProps>;

export interface DropdownItem {
  label: string;
  onClick?: () => void;
  icon?: LucideIcon;
  danger?: boolean;
}
export interface DropdownProps {
  trigger?: React.ReactNode;
  items?: DropdownItem[];
  onSelect?: (item: DropdownItem) => void;
  className?: string;
}
export const Dropdown: React.FC<DropdownProps>;

// ---------- Layout & navigation ----------

export interface CardProps {
  title?: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
  className?: string;
}
export const Card: React.FC<CardProps>;

export interface AccordionProps {
  items?: Array<{ title: string; content: React.ReactNode }>;
  className?: string;
}
export const Accordion: React.FC<AccordionProps>;

export interface TabsProps {
  tabs?: Array<{ label: string; content: React.ReactNode }>;
  className?: string;
}
export const Tabs: React.FC<TabsProps>;

export interface CarouselProps {
  items?: React.ReactNode[];
  className?: string;
}
export const Carousel: React.FC<CarouselProps>;

export interface NavbarProps {
  brand?: React.ReactNode;
  links?: Array<{ label: string; href: string }>;
  className?: string;
}
export const Navbar: React.FC<NavbarProps>;

export interface BreadcrumbProps {
  items?: Array<{ label: string; href?: string }>;
  className?: string;
}
export const Breadcrumb: React.FC<BreadcrumbProps>;

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}
export const Pagination: React.FC<PaginationProps>;

export const ProgressBar: React.FC<{ className?: string }>;

export interface TableColumn<T = any> {
  key: string;
  header: React.ReactNode;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}
export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  sortable?: boolean;
  emptyMessage?: string;
  className?: string;
}
export function Table<T = any>(props: TableProps<T>): React.ReactElement;

// ---------- Feedback & display ----------

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: Size | "xl";
  status?: "online" | "offline" | "busy" | "away";
  className?: string;
}
export const Avatar: React.FC<AvatarProps>;

export interface AlertProps {
  type?: ToastType;
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}
export const Alert: React.FC<AlertProps>;

export interface BadgeProps {
  variant?: "primary" | "success" | "warning" | "error" | "secondary";
  children?: React.ReactNode;
  className?: string;
}
export const Badge: React.FC<BadgeProps>;

export interface ToastProps {
  message: React.ReactNode;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
  position?: ToastPosition;
  className?: string;
}
export const Toast: React.FC<ToastProps>;

export const Spinner: React.FC<{ size?: Size; className?: string }>;
export const Skeleton: React.FC<{ className?: string }>;
export const ThemeToggle: React.FC<{ className?: string }>;

// ---------- Providers, hooks & utils ----------

export interface ThemeProviderProps {
  children?: React.ReactNode;
}
export const ThemeProvider: React.FC<ThemeProviderProps>;
export function useTheme(): { theme: Theme; toggleTheme: () => void };

export interface ToastOptions {
  duration?: number;
}
export interface ToastApi {
  show: (message: React.ReactNode, type?: ToastType, opts?: ToastOptions) => string;
  info: (message: React.ReactNode, opts?: ToastOptions) => string;
  success: (message: React.ReactNode, opts?: ToastOptions) => string;
  warning: (message: React.ReactNode, opts?: ToastOptions) => string;
  error: (message: React.ReactNode, opts?: ToastOptions) => string;
  dismiss: (id: string) => void;
}
export interface ToastProviderProps {
  children?: React.ReactNode;
  position?: ToastPosition;
  duration?: number;
}
export const ToastProvider: React.FC<ToastProviderProps>;
export function useToast(): ToastApi;

export function cn(...classes: Array<string | false | null | undefined>): string;
