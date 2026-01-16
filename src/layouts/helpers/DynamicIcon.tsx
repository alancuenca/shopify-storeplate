import type { FC } from "react";
import type { IconType } from "react-icons";
// Only import the specific icons that are actually used
import {
  FaFacebook,
  FaFacebookF,
  FaXTwitter,
  FaLinkedin,
  FaLinkedinIn,
  FaGithub,
  FaRegCopy,
} from "react-icons/fa6";

// Map of icon names to their components - only includes icons actually used in the app
const iconMap: Record<string, IconType> = {
  FaFacebook,
  FaFacebookF,
  FaXTwitter,
  FaLinkedin,
  FaLinkedinIn,
  FaGithub,
  FaRegCopy,
};

interface IDynamicIcon extends React.SVGProps<SVGSVGElement> {
  icon: string;
  className?: string;
}

const DynamicIcon: FC<IDynamicIcon> = ({ icon, ...props }) => {
  const Icon = iconMap[ icon ];

  if (!Icon) {
    console.warn(`Icon "${icon}" not found. Add it to DynamicIcon.tsx iconMap.`);
    return null;
  }

  return <Icon {...props} />;
};

export default DynamicIcon;
