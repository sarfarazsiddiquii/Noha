export default function About() {
    return (
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">About Noha.ai</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">Our Story</h3>
              <p className="text-gray-600">
                At Noha.ai, our story revolves around revolutionizing the technical interview process.
                We are dedicated to leveraging AI to simplify and enhance the hiring journey.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600">
                Our vision is to redefine the way technical interviews are conducted, ensuring fairness,
                accuracy, and efficiency through AI-powered automation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">Our Technology</h3>
              <p className="text-gray-600">
                We are at the forefront of technology, utilizing advanced AI algorithms to conduct
                interviews that closely mimic human interactions, setting new standards in hiring
                technology.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  