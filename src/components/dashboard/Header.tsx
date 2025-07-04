import Image from "next/image";
import { ChevronDown, Menu } from "lucide-react";

interface HeaderProps {
  title: string;
  userName: string;
  userAvatar?: string;
  onToggleSidebar?: () => void;
}

export function Header({ title, userName, userAvatar, onToggleSidebar }: HeaderProps) {
  return (
    <header className="bg-[linear-gradient(90deg,_#FFFFFF_0%,_#DEDEDE_100%)] border-b border-gray-200 w-full px-4 md:px-8 py-4">
      <div className="flex items-center justify-between w-full relative">
        {/* Left: Hamburger & Logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger only on mobile */}
          <button
            className="md:hidden block text-black"
            onClick={onToggleSidebar}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo always visible */}
          <Image
            src="/images/alligned-transparent-logo-200-x-70-px-1-1-ezgif.com-webp-to-png-converter 1.png"
            alt="Falcon Tour Travel"
            width={200}
            height={70}
            className="h-[70px] w-[200px]"
            priority
          />
        </div>

        {/* Center Title (only on md and up) */}
        <div className="hidden md:flex flex-1 justify-start md:pl-20">
          <h1 className="font-poppins font-normal text-[33px] leading-[1] tracking-[0] text-black text-center">
            {title}
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Mobile: avatar + chevron */}
          <div className="flex md:hidden items-center gap-2">
            <div className="w-[34px] h-[34px] rounded-full bg-gray-300 overflow-hidden">
              <Image
                src={userAvatar || "/images/avatar.png"}
                alt="Profile"
                width={34}
                height={34}
                className="w-full h-full object-cover"
              />
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>

          {/* Desktop: notification + full profile */}
          <div className="hidden md:flex items-center gap-4">
            <Image
              src="/images/Notification.png"
              alt="Notifications"
              width={24}
              height={24}
              className="h-[24px] w-[24px]"
              priority
            />
            <div className="flex items-center gap-3">
              <span className="font-open-sans font-semibold text-[19px] text-black">
                {userName}
              </span>
              <div className="w-[38px] h-[38px] rounded-full bg-gray-300 overflow-hidden">
                <Image
                  src={userAvatar || "/images/avatar.png"}
                  alt="Profile"
                  width={38}
                  height={38}
                  className="w-full h-full object-cover"
                />
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
