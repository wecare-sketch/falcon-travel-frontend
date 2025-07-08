import Image from "next/image";

export function ProfileImage() {
  return (
    <Image
      src="/images/profile.png"
      alt="Profile"
      width={20} height={20}
    />
  );
} 