import { IoPersonCircleOutline } from "react-icons/io5";
import { PiPackage } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";

const tabs = [
  { id: "profile", label: "Personal Information", icon: <IoPersonCircleOutline />},
  { id: "orders", label: "Order History", icon: <PiPackage /> },
  { id: "tracking", label: "Order Tracking", icon: <TbTruckDelivery /> },
  { id: "wishlist", label: "Wishlist", icon: <CiHeart /> },

];

export default tabs;