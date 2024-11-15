import React from "react";
// import JavascriptIcon from '@mui/icons-material/Javascript';
import { FaReact } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { FaPython } from "react-icons/fa6";
import { FaHtml5 } from "react-icons/fa6";
import { FaCss3Alt } from "react-icons/fa6";
import { RiSupabaseFill } from "react-icons/ri";
import { FaDocker } from "react-icons/fa6";
import { SiKubernetes } from "react-icons/si";
import { FaCloudflare } from "react-icons/fa6";
import { SiNginx } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiMysql } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa6";
import { SiK6 } from "react-icons/si";
import { SiMicrosoftazure } from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { SiSelenium } from "react-icons/si";
import { SiPlaywright } from "react-icons/si";
import { SiTerraform } from "react-icons/si";
import { SiAnsible } from "react-icons/si";
import { FaGit } from "react-icons/fa";
import { SiPostman } from "react-icons/si";

const icons = [
  { component: FaReact, label: "React" },
  { component: SiJavascript, label: "Javascript" },
  { component: RiNextjsFill, label: "Nextjs" },
  { component: FaPython, label: "Python" },
  { component: FaHtml5, label: "Html5" },
  { component: FaCss3Alt, label: "CSS3" },
  { component: RiSupabaseFill, label: "Supabase" },
  { component: FaDocker, label: "Docker" },
  { component: SiKubernetes, label: "Kubernetes" },
  { component: FaCloudflare, label: "Cloudflare" },
  { component: SiNginx, label: "Nginx" },
  { component: SiTailwindcss, label: "Tailwindcss" },
  { component: SiTypescript, label: "Typescript" },
  { component: TbBrandReactNative, label: "React Native" },
  { component: BiLogoPostgresql, label: "Postgresql" },
  { component: SiMysql, label: "Mysql" },
  { component: FaNodeJs, label: "NodeJs" },
  { component: SiK6, label: "K6" },
  { component: SiMicrosoftazure, label: "Azure" },
  { component: FaAws, label: "AWS" },
  { component: SiSelenium, label: "Selenium" },
  { component: SiPlaywright, label: "Playwright" },
  { component: SiTerraform, label: "Terraform" },
  { component: SiAnsible, label: "Ansible" },
  { component: FaGit, label: "Git" },
  { component: SiPostman, label: "Postman" },
];

const SkillsIcons: React.FC = () => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 justify-center gap-4 p-4 md:p-8 rounded-lg bg-secondary shadow-lg">
      {icons.map(({ component: Icon, label }, index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-center space-y-2 transition-transform transform hover:scale-110 hover:text-red-500"
        >
          <Icon className="text-4xl text-primary transition-colors" />
          <span className="text-sm font-medium text-gray-200">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default SkillsIcons;
