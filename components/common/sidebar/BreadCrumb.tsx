"use client";
import React from "react";
import {usePathname} from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadCrumb = () => {
    const pathname = usePathname();
    const paths = pathname.split("/").filter(Boolean);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {paths.map((path, index) => {
                    const href = `/${paths.slice(0, index + 1).join("/")}`;
                    const isLast = index === paths.length - 1;
                    const displayText = path
                        .split("-")
                        .map(
                            (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" ");

                    return (
                        <React.Fragment key={href}>
                            <BreadcrumbItem className="hidden md:block">
                                {isLast ? (
                                    <BreadcrumbPage>
                                        {displayText}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={href}>
                                        {displayText}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && (
                                <BreadcrumbSeparator className="hidden md:block" />
                            )}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadCrumb;
