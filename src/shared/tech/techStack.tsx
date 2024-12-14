import React from "react";
import Card from "../../components/card/card";

interface TechStackProps {
    stack?: string[];
}

export default function TechStack(props: TechStackProps) {
    const stackItems = props.stack || [];

    return (
        <>
            {stackItems && stackItems.length > 0 && (
                <div className="mx-auto">
                    <Card testId="shared-techStackMain" height="xs:h-30" color="bg-light-cardTheme dark:bg-dark-cardTheme" margin="my-4">
                        <h2 className="text-black dark:text-white text-lg font-semibold px-4 py-2">Tech Stack</h2>
                        <div className="flex flex-wrap gap-3 items-center mx-3 my-3">
                            {stackItems.map((item, index) => (
                                <Card key={index} testId="shared-techStackItem" color="bg-light-inlineTheme dark:bg-dark-inlineTheme" maxWidth="w-fit" margin="">
                                    <div className="text-black dark:text-white px-4 py-2">
                                        <h2 className="text-xs">{item}</h2>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
}
