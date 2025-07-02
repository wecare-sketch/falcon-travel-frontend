"use client";
import Image from "next/image";

const SocialLoginButtons = () => (
  <div className="flex justify-center gap-4 mb-6">
    <button className="bg-[#F5F5F5] rounded-lg h-12 w-24 flex items-center justify-center cursor-pointer">
      <Image src="/images/apple.png" alt="Apple" width={28} height={28} />
    </button>
    <button className="bg-[#F5F5F5] rounded-lg h-12 w-24 flex items-center justify-center cursor-pointer">
      <Image src="/images/google.png" alt="Google" width={28} height={28} />
    </button>
  </div>
);

export default SocialLoginButtons;
