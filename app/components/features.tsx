export default function Features() {
    const features = [
        {
            title: "Quality - Set your bar & we do the rest",
            description:
                "Noha.ai evaluates candidates according to the company’s established standards, with depth levels adjustable to meet specific requirements.",
            image: "/images/feature-1.jpg",
        },
        {
            title: "Zero Bias - Unbiased Candidate Evaluation",
            description: "Noha.ai ensures an impartial assessment of candidates.",
            image: "/images/feature-2.jpg",
        },
        {
            title: "In-Depth Analytics",
            description:
                "Noha.ai offers detailed analytics on candidate performance during interviews, empowering hiring managers to make informed decisions.",
            image: "/images/feature-3.jpg",
        },
    ];

    return (
        <section id="product" className="py-16">
            <div className="container mx-auto text-center mb-12 px-4">
                <h2 className="text-4xl font-bold">How Noha Enhances Efficiency in Interview Process</h2>
            </div>
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center"
                    >
                        <img
                            src={feature.image}
                            alt={feature.title}
                            className="w-55 h-55 object-cover rounded-full mb-6"
                        />
                        <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
