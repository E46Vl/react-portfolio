import React from 'react';
import {
  FiSearch,
  FiMoon,
  FiSun,
  FiMenu,
  FiX,
  FiBookmark,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiAlertTriangle,
  FiRefreshCw,
  FiExternalLink,
  FiUser,
  FiMapPin,
  FiGlobe,
  FiEdit,
  FiFileText,
  FiEye,
  FiSave,
  FiInfo,
  FiAlertCircle,
  FiCheck,
  FiHelpCircle,
  FiFilter,
  FiTrendingUp,
  FiTrendingDown,
} from 'react-icons/fi';

const iconMap = {
  FiSearch,
  FiMoon,
  FiSun,
  FiMenu,
  FiX,
  FiBookmark,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiAlertTriangle,
  FiRefreshCw,
  FiExternalLink,
  FiUser,
  FiMapPin,
  FiGlobe,
  FiEdit,
  FiFileText,
  FiEye,
  FiSave,
  FiInfo,
  FiAlertCircle,
  FiCheck,
  FiHelpCircle,
  FiFilter,
  FiTrendingUp,
  FiTrendingDown,
};

interface IconProps {
  name: keyof typeof iconMap;
  size?: number;
  className?: string;
  [key: string]: any;
}

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const IconComponent = iconMap[name];
  return React.createElement(IconComponent, props);
};

export default Icon; 