import Link from "next/link";

export default function Button({ title }: any) {
  return (
      <button className="cursor-pointer">{title}</button>
  );
}
