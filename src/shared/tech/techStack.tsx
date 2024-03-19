import Card from "../../components/card/card";

interface TechStackProps {
    stack?: string[];
}

export default function TechStack(props: TechStackProps) {
    const stackItems = props.stack || [];

    return (
        <div className="mx-auto">
            <Card height="xs:h-30" color="bg-light-cardTheme dark:bg-dark-cardTheme" margin="my-4">
                <h2 className="text-black dark:text-white text-lg font-semibold px-4 py-2">Tech Stack</h2>
                <div className="flex flex-wrap items-center lg:ml-3 md:ml-2 sm:ml-1 mb-2">
                    {stackItems.map((item, index) => (
                        <div key={index} className="sm:px-2 md:px-1 lg:px-2 my-1">
                            <Card color="bg-light-inlineTheme dark:bg-dark-inlineTheme" maxWidth="sm:min-w-[100%] md:max-w-1/3 lg:min-w-1/4">
                                <div className="text-black dark:text-white px-4 py-2">
                                    <h2 className="text-xs">{item}</h2>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
