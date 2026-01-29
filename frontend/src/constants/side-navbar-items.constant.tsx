import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CategoryIcon from "@mui/icons-material/Category";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import type { NavItem } from "../components/common/sidebar.component";

export const SIDE_NAVBAR_ITEMS: NavItem[] = [
  { label: "sidebar.dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { label: "sidebar.transactions", path: "/transactions", icon: <ReceiptLongIcon /> },
  { label: "sidebar.categories", path: "/categories", icon: <CategoryIcon /> },
  { label: "sidebar.reports", path: "/reports", icon: <AnalyticsIcon /> },
  { label: "sidebar.profile", path: "/profile", icon: <AccountCircleIcon /> },
];
