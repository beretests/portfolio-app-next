import React from "react";
import { FaReact } from "react-icons/fa";
import { FaGit, FaHtml5 } from "react-icons/fa";
import { FaAws, FaCss3Alt, FaDocker, FaNodeJs, FaPython } from "react-icons/fa6";
import { RiNextjsFill, RiSupabaseFill } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import {
  SiAnsible,
  SiJavascript,
  SiK6,
  SiKubernetes,
  SiMicrosoftazure,
  SiMysql,
  SiNginx,
  SiPlaywright,
  SiPostman,
  SiSelenium,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
} from "react-icons/si";
import { FaCloudflare } from "react-icons/fa6";
import { TbBrandReactNative } from "react-icons/tb";
import type { ComponentType } from "react";

export const iconNames = [
  "React",
  "Javascript",
  "Nextjs",
  "Python",
  "Html5",
  "CSS3",
  "Supabase",
  "Docker",
  "Kubernetes",
  "Cloudflare",
  "Nginx",
  "Tailwind",
  "Typescript",
  "ReactNative",
  "Postgresql",
  "Mysql",
  "NodeJs",
  "K6",
  "Azure",
  "AWS",
  "Selenium",
  "Playwright",
  "Terraform",
  "Ansible",
  "Git",
  "Postman",
] as const;

export type IconName = (typeof iconNames)[number];

export type SkillsIconItem = { name: string; icon?: IconName | null };

const iconMap: Record<IconName, ComponentType<{ className?: string }>> = {
  React: FaReact,
  Javascript: SiJavascript,
  Nextjs: RiNextjsFill,
  Python: FaPython,
  Html5: FaHtml5,
  CSS3: FaCss3Alt,
  Supabase: RiSupabaseFill,
  Docker: FaDocker,
  Kubernetes: SiKubernetes,
  Cloudflare: FaCloudflare,
  Nginx: SiNginx,
  Tailwind: SiTailwindcss,
  Typescript: SiTypescript,
  ReactNative: TbBrandReactNative,
  Postgresql: BiLogoPostgresql,
  Mysql: SiMysql,
  NodeJs: FaNodeJs,
  K6: SiK6,
  Azure: SiMicrosoftazure,
  AWS: FaAws,
  Selenium: SiSelenium,
  Playwright: SiPlaywright,
  Terraform: SiTerraform,
  Ansible: SiAnsible,
  Git: FaGit,
  Postman: SiPostman,
};

const defaultIcons: SkillsIconItem[] = Object.keys(iconMap).map((key) => ({
  name: key,
  icon: key as IconName,
}));

type Props = {
  items?: SkillsIconItem[];
};

const SkillsIcons: React.FC<Props> = ({ items }) => {
  const data = (items && items.length > 0 ? items : defaultIcons)
    .map((item) => {
      const iconKey = (item.icon || item.name) as IconName;
      const component = iconMap[iconKey];
      return component
        ? {
            component,
            label: item.name,
          }
        : null;
    })
    .filter(Boolean) as { component: ComponentType<{ className?: string }>; label: string }[];

  return (
    <div className="grid grid-cols-center-3 md:grid-cols-center-6 justify-center gap-4 p-4 md:p-8 rounded-lg bg-background border border-borderPrimary shadow-sm">
      {data.map(({ component: Icon, label }, index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-center space-y-2 transition-transform transform hover:scale-105 focus-within:scale-105 focus-within:ring-2 focus-within:ring-primary rounded-md p-2"
        >
          <Icon className="text-4xl text-primary dark:text-highlight transition-colors" aria-hidden />
          <span className="text-sm font-semibold text-foreground dark:text-active">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SkillsIcons;
