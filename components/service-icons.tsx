"use client";

import * as React from "react";
import Image from "next/image";

interface ServiceIconProps {
  service: "openai" | "claude" | "gemini" | "v0" | "replit";
  className?: string;
}

const serviceIcons = {
  openai: "/openai-1.svg",
  claude: "/claude-color.svg", 
  gemini: "/gemini-color.svg",
  v0: "/v0.svg",
  replit: "/replit-color.svg",
};

export function ServiceIcon({ service, className = "w-5 h-5" }: ServiceIconProps) {
  return (
    <Image
      src={serviceIcons[service]}
      alt={service}
      width={20}
      height={20}
      className={className}
    />
  );
}

interface ServiceIconsRowProps {
  services: Array<"openai" | "claude" | "gemini" | "v0" | "replit">;
  className?: string;
}

export function ServiceIconsRow({ services, className = "flex items-center gap-1" }: ServiceIconsRowProps) {
  return (
    <div className={className}>
      {services.map((service) => (
        <ServiceIcon key={service} service={service} />
      ))}
    </div>
  );
}