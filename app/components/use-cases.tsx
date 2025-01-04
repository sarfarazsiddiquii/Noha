export default function UseCases() {
    const useCases = [
      {
        title: "How Noha helps to increase efficiency in campus interviews",
        buttonText: "Know More",
        link: "https://www.youtube.com/watch?v=5EOMyIaOY1I&feature=youtu.be",
        image: "/images/use1.jpg",
        alt: "image 1"
      },
      {
        title:
          "How Noha helps start-ups & midsize technology companies to hire their top talent",
        buttonText: "Know More",
        link: "https://youtu.be/yVpBXtcJ1Lk",
        image: "/images/use2.jpg",
        alt: "image 2"
      },
      {
        title:
          "How Noha helps to conduct bulk interviews seamlessly for technology service organizations?",
        buttonText: "Know More",
        link: "https://youtu.be/TNaK-WiTf7M",
        image: "/images/use3.jpg",
        alt: "image 3"
      },
      {
        title:
          "How Noha helps to conduct interview drives for technology product organizations?",
        buttonText: "Know More",
        link: "https://youtu.be/qhZc2VUf3Ts",
        image: "/images/use4.jpg",
        alt: "image 4"
      },
    ];
  
    return (
      <section id="use-cases" className="py-10 bg-gray-50"> 
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Use Cases of Noha.ai</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-lg shadow-md border flex flex-col justify-between"
              >
                <img src={useCase.image} alt={useCase.alt} className="mb-4 rounded-md" />
                <h3 className="text-base font-semibold mb-4">{useCase.title}</h3>
                <a
                  href={useCase.link}
                  className="px-5 py-2 bg-black text-white text-sm font-medium rounded-md text-center hover:bg-gray-800"
                >
                  {useCase.buttonText}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }