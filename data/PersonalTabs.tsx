import { IoPersonCircleOutline } from "react-icons/io5";
import { PiPackage } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";

const tabs = [
  { id: "profile", label: "Personal Information", icon: <IoPersonCircleOutline className="text-2xl"/>},
  { id: "orders", label: "Order History", icon: <PiPackage className="text-2xl"/> },
  { id: "tracking", label: "Order Tracking", icon: <TbTruckDelivery className="text-2xl"/> },
  { id: "wishlist", label: "Wishlist", icon: <CiHeart className="text-2xl"/> },

];

export default tabs;