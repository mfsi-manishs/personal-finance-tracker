import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CategoryIcon from "@mui/icons-material/Category";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import type { NavItem } from "../components/common/sidebar.component";

export const SIDE_NAVBAR_ITEMS: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { label: "Transactions", path: "/transactions", icon: <ReceiptLongIcon /> },
  { label: "Categories", path: "/categories", icon: <CategoryIcon /> },
  { label: "Reports", path: "/reports", icon: <AnalyticsIcon /> },
  { label: "Profile", path: "/profile", icon: <AccountCircleIcon /> },
];
