"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, CheckIcon, Cross1Icon } from "@radix-ui/react-icons";

export interface PricingFeature {
    key?: string;
    name: string | React.ReactNode;
    highlight?: boolean;
    included: boolean;
}

export interface PricingTier {
    name: string;
    price: number;
    interval?: string;
    description: string;
    features: PricingFeature[];
    highlight?: boolean;
    lightMode?: boolean;
    cta?: {
        text: string;
        href?: string;
        onClick?: () => void;
    };
}

export interface PricingCardsProps extends React.HTMLAttributes<HTMLDivElement> {
    tiers: PricingTier[];
    containerClassName?: string;
    cardClassName?: string;
    sectionClassName?: string;
}

export function PricingCards({
    tiers,
    className,
    containerClassName,
    cardClassName,
    sectionClassName,
    ...props
}: PricingCardsProps) {
    return (
        <section
            className={cn(
                "bg-background text-foreground",
                "py-12 sm:py-24 md:py-32 px-4",
                "fade-bottom overflow-hidden pb-0",
                sectionClassName
            )}
        >
            <div className={cn("w-full max-w-5xl mx-auto px-4", containerClassName)} {...props}>
                <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8", className)}>
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={cn(
                                "relative overflow-hidden rounded-[32px] border bg-white/80 shadow-[0_25px_45px_rgba(15,23,42,0.1)] transition duration-500 will-change-transform hover:-translate-y-1 hover:shadow-[0_30px_50px_rgba(15,23,42,0.17)]",
                                tier.highlight
                                    ? "border-blue-500/20 dark:border-blue-400/30"
                                    : "border-border/60 dark:border-neutral-800",
                                tier.lightMode ? "bg-white shadow-[0_20px_35px_rgba(15,23,42,0.08)]" : "bg-white dark:bg-neutral-950",
                                cardClassName
                            )}
                        >
                            <div
                                className="absolute inset-x-6 top-4 h-1 rounded-full opacity-30 transition-all duration-500 pointer-events-none"
                                style={{
                                    background: tier.highlight
                                        ? "linear-gradient(90deg, rgba(59,130,246,0.9), rgba(96,165,250,0.9))"
                                        : "linear-gradient(90deg, rgba(156,163,175,0.7), rgba(129,140,248,0.7))",
                                }}
                            />
                            <div className="relative p-10 flex flex-col gap-8 h-full">
                                <div className="space-y-4">
                                    <h3
                                        className={cn(
                                            "text-lg uppercase tracking-wider font-medium",
                                            tier.lightMode
                                                ? tier.highlight
                                                    ? "text-blue-900"
                                                    : "text-neutral-900"
                                                : tier.highlight
                                                    ? "text-white"
                                                    : "text-neutral-900 dark:text-white"
                                        )}
                                    >
                                        {tier.name}
                                    </h3>
                                    <div className="flex items-baseline gap-2">
                                        <span
                                            className={cn(
                                                "text-5xl font-semibold",
                                                tier.highlight ? "text-blue-900 dark:text-blue-300" : "text-foreground"
                                            )}
                                        >
                                            ${tier.price}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {tier.interval || "one-time"}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground border-b border-border/60 pb-6">
                                        {tier.description}
                                    </p>
                                </div>

                                <div className="mt-4 space-y-3 flex-grow">
                                    {tier.features.map((feature) => (
                                        <div
                                            key={feature.key || JSON.stringify(feature.name)}
                                            className="flex items-center gap-3 rounded-2xl border border-border/70 bg-muted/40 px-4 py-3 shadow-inner shadow-black/5"
                                        >
                                            <div
                                                className={cn(
                                                    "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                                                    feature.included
                                                        ? "text-blue-600 dark:text-blue-300"
                                                        : "text-muted-foreground"
                                                )}
                                            >
                                                {feature.included ? (
                                                    <CheckIcon className="w-3.5 h-3.5" />
                                                ) : (
                                                    <Cross1Icon className="w-3.5 h-3.5" />
                                                )}
                                            </div>
                                            <span
                                                className={cn(
                                                    "text-sm",
                                                    feature.included ? "text-foreground" : "text-muted-foreground"
                                                )}
                                            >
                                                {feature.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {tier.cta && (
                                    <div className="mt-8">
                                        <Button
                                            className={cn(
                                                "w-full h-12 group relative",
                                                tier.lightMode
                                                    ? tier.highlight
                                                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                        : "bg-neutral-900 hover:bg-neutral-800 text-white"
                                                    : tier.highlight
                                                        ? "bg-white hover:bg-neutral-100 text-neutral-900"
                                                        : "bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900",
                                                "transition-all duration-300"
                                            )}
                                            onClick={tier.cta.onClick}
                                            asChild={Boolean(tier.cta.href)}
                                        >
                                            {tier.cta.href ? (
                                                <a href={tier.cta.href}>
                                                    <span className="relative z-10 flex items-center justify-center gap-2 font-medium tracking-wide">
                                                        {tier.cta.text}
                                                        <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                    </span>
                                                </a>
                                            ) : (
                                                <span className="relative z-10 flex items-center justify-center gap-2 font-medium tracking-wide">
                                                    {tier.cta.text}
                                                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
