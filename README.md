# PersonaSense ✨

A beautiful, interactive personality quiz application that helps you discover whether you're more of an introvert or extrovert through thoughtfully designed questions about your daily habits and social preferences.

![PersonaSense](https://img.shields.io/badge/PersonaSense-Personality%20Quiz-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.1-purple?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.11-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

### 🎯 Interactive Personality Assessment

- **7 carefully crafted questions** about lifestyle and social habits
- **Multiple question types**: Sliders, radio buttons, and number inputs
- **Real-time progress tracking** with visual progress bar
- **Instant personality results** (Introvert 🌙 or Extrovert 🌞)

### 🎨 Beautiful User Experience

- **Responsive design** that works on all devices
- **Smooth animations** and transitions throughout the app
- **Intuitive navigation** with back/forward functionality
- **Visual feedback** with emojis and engaging UI elements

### 🌙 Dark Theme Support

- **Three theme modes**: Light, Dark, and System preference
- **Automatic theme persistence** across sessions
- **Seamless theme switching** with the toggle in the top-right corner

### 📱 Modern Features

- **Share results** functionality using Web Share API
- **No data collection** - everything stays on your device
- **Quick completion** - takes just 2-3 minutes
- **No registration required** - start exploring immediately

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to see the application running.

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🏗️ Tech Stack

### Frontend Framework

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development experience
- **Vite** - Fast build tool and development server

### UI & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful, customizable icons

### State Management & Routing

- **React Router DOM** - Client-side routing
- **React Query** - Server state management (ready for future API integration)
- **React Hook Form** - Form state management

### Development Tools

- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── PersonalityQuiz.tsx
│   ├── Results.tsx
│   ├── ThemeProvider.tsx
│   └── ThemeToggle.tsx
├── pages/              # Page components
│   ├── Index.tsx       # Welcome page
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── App.tsx             # Main app component
└── main.tsx            # App entry point
```

## 🎯 How It Works

### Personality Assessment Logic

The app uses a scoring system based on your answers to determine your personality type:

- **Hours spent alone** - More time alone suggests introversion
- **Stage fear** - Fear of public speaking indicates introversion
- **Social event frequency** - Higher attendance suggests extroversion
- **Outdoor activity** - More outdoor time suggests extroversion
- **Post-socializing energy** - Feeling drained suggests introversion
- **Friend circle size** - Larger groups suggest extroversion
- **Social media activity** - More posting suggests extroversion

### Result Categories

- **🌙 Introvert**: The Thoughtful Observer
  - Prefers quiet environments
  - Values deep relationships
  - Enjoys solitary activities
  - Observant and reflective

- **🌞 Extrovert**: The Social Energizer
  - Energized by social interaction
  - Enjoys group activities
  - Comfortable in crowds
  - Expressive and outgoing

## 🎨 Customization

### Adding New Questions

To add new questions to the quiz, modify the `questions` array in `src/components/PersonalityQuiz.tsx`:

```typescript
const questions = [
  // ... existing questions
  {
    id: 'newQuestion',
    title: 'Your new question here?',
    type: 'slider', // or 'radio', 'number'
    emoji: '🎯',
    min: 0,
    max: 10,
    scaleLabels: { low: 'Never', high: 'Always' }
  }
];
```

### Updating Personality Logic

Modify the `calculatePersonality` function to adjust how answers are scored and categorized.

### Styling

The app uses Tailwind CSS with custom gradients and animations. Theme colors can be customized in `tailwind.config.ts`.

## 🚀 Deployment

### Environment Configuration

The frontend connects to a backend API for personality predictions. Configure the API endpoint using environment variables:

#### For Local Development

The app uses a proxy configuration in `vite.config.ts` that forwards `/api/*` requests to `http://localhost:8000`.

#### For Production (Netlify/Vercel/etc.)

Set the `VITE_API_BASE_URL` environment variable to your Railway backend URL:

```bash
VITE_API_BASE_URL=https://web-production-1231.up.railway.app
```

**Netlify Configuration:**

1. Go to your site settings in Netlify
2. Navigate to "Environment variables"
3. Add: `VITE_API_BASE_URL` = `https://web-production-1231.up.railway.app`
4. Redeploy your site

**Vercel Configuration:**

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add: `VITE_API_BASE_URL` = `https://web-production-1231.up.railway.app`
4. Redeploy your project

### Build for Production

```bash
npm run build
```

### Deploy Options

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect your GitHub repo
- **GitHub Pages**: Use GitHub Actions for automatic deployment
- **Any static hosting service**: The app builds to static files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first styling approach
- **Lucide** for the beautiful icons
- **Vite** for the fast development experience

---

Made with ❤️ by the Abdullah Jawahir

*Discover yourself, one question at a time* ✨
