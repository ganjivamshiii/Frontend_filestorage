// featuresData.js
import { Lock, Database, Folder, CreditCard } from "lucide-react";
import { LayoutDashboard, Upload, File,  Receipt } from "lucide-react";
export const features = [
  {
    icon: Lock,
    iconColor: "text-blue-500",
    title: "Secure Storage",
    description: "Keep your data safe with end-to-end encryption and secure cloud storage."
  },
  {
    icon: Database,
    iconColor: "text-green-500",
    title: "Flexible Credits",
    description: "Easily scale your resources with flexible credit options."
  },
  {
    icon: Folder,
    iconColor: "text-purple-500",
    title: "File Management",
    description: "Organize, access, and share files seamlessly from anywhere."
  },
  {
    icon: CreditCard,
    iconColor: "text-orange-500",
    title: "Transaction Management",
    description: "Track and manage all your transactions with detailed insights."
  }
];

// pricingPlans.js
export const  price = [
  {
    name: "Basic",
    description: "Perfect for individuals just getting started.",
    price: "$9/month",
    features: [
      "5 GB secure storage",
      "Basic file management",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "Great for professionals needing more flexibility.",
    price: "$29/month",
    features: [
      "100 GB secure storage",
      "Advanced file management",
      "Priority email support",
      "Transaction tracking",
    ],
    cta: "Upgrade Now",
    highlighted: false, // Highlighted plan
  },
  {
    name: "Enterprise",
    description: "Best for teams and businesses at scale.",
    price: "$99/month",
    features: [
      "Unlimited secure storage",
      "Full file & transaction management",
      "Dedicated account manager",
      "24/7 premium support",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard"
  },
  {
    id: "02",
    label: "Upload",
    icon: Upload,
    path: "/upload"
  },
  {
    id: "03",
    label: "My-Files",
    icon: File,
    path: "/my-files"
  },
  {
    id: "04",
    label: "Subscription",
    icon: CreditCard,
    path: "/subscription"
  },
  {
    id: "05",
    label: "Transaction",
    icon: Receipt,
    path: "/transaction"
  }
];