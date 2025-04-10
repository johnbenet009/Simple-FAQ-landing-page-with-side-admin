# Simple FAQ Landing Page with Admin Panel

A modern, responsive FAQ landing page system built with React, TypeScript, and Tailwind CSS. This system provides a beautiful interface for managing and displaying frequently asked questions, complete with an admin panel and AI-powered question answering capabilities using Google's Gemini API.

## 🌟 Features

- 🎨 Beautiful, responsive UI with Tailwind CSS
- 🌓 Dark/Light mode toggle
- 🔐 Admin panel for FAQ management
- 🤖 AI-powered question answering with Gemini API
- 🔍 Real-time search functionality
- 📱 Mobile-friendly design
- ⚡ Fast and optimized performance
- 🛠 Easy customization through environment variables

## 🚀 Demo

Check out the live demo: [Simple FAQ Landing Page Demo](http://faq.sakeenaharabicinstitute.site)

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

## 🛠 Installation

1. Clone the repository:
```bash
git clone https://github.com/johnbenet009/Simple-FAQ-landing-page-with-side-admin.git
cd Simple-FAQ-landing-page-with-side-admin
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_GEMINI_MODEL=gemini-pro
VITE_GEMINI_KEY=your_gemini_api_key
VITE_INSTITUTION_NAME="Your Institution Name"
VITE_INSTITUTION_URL="https://your-institution-url.com"
```

4. Start the development server:
```bash
npm run dev
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_MODEL` | Gemini AI model for Q&A | Yes |
| `VITE_GEMINI_KEY` | Your Gemini API key | Yes |
| `VITE_INSTITUTION_NAME` | Your institution's name | Yes |
| `VITE_INSTITUTION_URL` | Your institution's website URL | Yes |

## 📁 Project Structure

```
├── src/
│   ├── components/    # Reusable UI components
│   ├── contexts/      # React context providers
│   ├── pages/         # Page components
│   ├── types/         # TypeScript definitions
│   └── db.json       # Static FAQ data
├── public/           # Static assets
└── ...
```

## 👨‍💼 Admin Access

The system includes an admin panel for FAQ management:
- Default username: `admin`
- Default password: `admin123`

⚠️ **Security Note**: Change these credentials before deploying to production!

## 📝 FAQ Management

This system uses a static JSON file (`src/db.json`) for FAQ storage, making it ideal for:
- Simple FAQ systems
- Static content management
- Version-controlled content
- Easy deployment
- No database setup required

## ✨ Customization

### Theme
Modify `tailwind.config.js` to customize colors, fonts, and other design tokens.

### Content
Edit `src/db.json` to manage FAQ content:
```json
{
  "faqs": [
    {
      "id": "1",
      "question": "Your question here?",
      "answer": "Your answer here",
      "category": "general",
      "relatedIds": [],
      "createdAt": "2024-03-10T00:00:00Z",
      "updatedAt": "2024-03-10T00:00:00Z"
    }
  ]
}
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🙏 Acknowledgments

- Built with React, TypeScript, and Tailwind CSS
- Icons by Lucide React
- AI capabilities powered by Google's Gemini API

## 📫 Contact

For questions or support, please open an issue in the [GitHub repository](https://github.com/johnbenet009/Simple-FAQ-landing-page-with-side-admin/issues).