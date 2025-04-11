# Simple FAQ / Landing page System

A modern, responsive FAQ system built with React, TypeScript, and Tailwind CSS. This application provides a beautiful interface for managing and displaying frequently asked questions about Sakeenah Arabic Institute's programs and services, complete with an admin panel and AI-powered question answering capabilities using Google's Gemini API.

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

Check out the live demo: [Sakeenah Arabic Institute FAQ System](http://faq.sakeenaharabicinstitute.site)

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18 or higher
- npm or yarn package manager
- A Google Cloud account for Gemini API access

## 🛠 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sakeenah-faq-system.git
cd sakeenah-faq-system
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_GEMINI_MODEL=gemini-pro
VITE_GEMINI_KEY=your_gemini_api_key
VITE_INSTITUTION_NAME="Sakeenah Arabic Institute"
VITE_INSTITUTION_URL="https://sakeenaharabicinstitute.site"
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
| `VITE_INSTITUTION_NAME` | Institution name | Yes |
| `VITE_INSTITUTION_URL` | Institution website URL | Yes |

## 📁 Project Structure

```
├── src/
│   ├── components/    # Reusable UI components
│   ├── contexts/      # React context providers
│   ├── pages/         # Page components
│   ├── types/         # TypeScript definitions
│   └── db.json       # FAQ data store
├── public/           # Static assets
└── ...
```

## 👨‍💼 Admin Access

Access the admin panel at `/setup`:
- Default username: `demo@demo.com`
- Default password: `111`

⚠️ **Important**: Change these credentials before deploying to production!

## 📝 Content Management

The system uses a static JSON file (`src/db.json`) for content storage, making it:
- Simple to maintain
- Version control friendly
- Easy to deploy
- Database-free

## ✨ Customization

### Theme
Modify `tailwind.config.js` to customize:
- Colors
- Typography
- Spacing
- Other design tokens

### Content Structure
The `db.json` schema:
```json
{
  "faqs": [
    {
      "id": "string",
      "question": "string",
      "answer": "string",
      "category": "string",
      "relatedIds": ["string"],
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🙏 Acknowledgments

Built with:
- React + TypeScript
- Tailwind CSS
- Lucide React icons
- Google Gemini API
- Framer Motion
- React Router DOM
- React Markdown

## 📫 Support

For questions or support:
- Open an issue
- Contact: support@sakeenaharabicinstitute.site
