const FAQPage = () => {
  // Define your FAQ data
  const faqData = [
    {
      question: 'What is Bitcoin?',
      answer:
        'Bitcoin is a decentralized digital currency that allows people to send or receive money over the internet. It operates on a technology called blockchain, which ensures security and transparency.',
    },
    {
      question: 'How do I invest in Bitcoin?',
      answer:
        "To invest in Bitcoin, you can create an account on our platform, fund your account, and choose a suitable investment plan. We'll take care of the rest, managing your investments securely.",
    },
    {
      question: 'Is my investment safe?',
      answer:
        'We prioritize the security of your investments. Our platform employs industry-standard security measures, including encryption and multi-factor authentication, to protect your assets.',
    },
    {
      question: 'What is the minimum investment?',
      answer:
        'The minimum investment amount depends on the investment plan you choose. Please check our investment plans for specific details.',
    },
    {
      question: 'How can I contact customer support?',
      answer:
        "You can reach our customer support team 24/7 through the contact information provided on our 'Contact Us' page. We're here to assist you with any questions or concerns.",
    },
  ];

  return (
    <div className=" min-h-screen p-8">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-8">
          Frequently Asked Questions
        </h1>
        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-primary-foreground p-4 rounded-lg shadow-md"
            >
              <button className="text-blue-500 font-semibold text-lg">
                {item.question}
              </button>
              <div className="text-gray-700 mt-2">{item.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
