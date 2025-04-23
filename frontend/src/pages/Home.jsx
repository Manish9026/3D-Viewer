// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../components/Button.jsx';

const Home = () => {
  return (
    <div className="min-h-screen center primary-p flex flex-col">
      {/* Header */}
      {/* <header className="container py-6">
        <nav className="flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
            3D Viewer
          </div>
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </nav>
      </header> */}

      {/* Hero Section */}
      <main className="flex-1 flex mt-10 flex-col items-center justify-center container">
        <div className="max-w-3xl text-center space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Visualize & Manipulate <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">3D Objects</span> in Your Browser
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload, view, and interact with 3D objects in real-time. Save camera positions and share your designs with others.
          </p>
          <div className="flex flex-col items-center sm:flex-row gap-4 justify-center pt-4 ">
            <Link to="/upload">
              <Button  className="flex gap-2 group flex-1 sm:min-w-[200px] min-w-[200px] items-center justify-center h-[60px]">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/model/view">
              <Button variant="outline" size="md" className="flex gap-2 group min-w-[150px] flex-1 max-w-[200px] h-[50px]">
                Try Demo
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="container py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg glassmorphism animate-slide-in">
            <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">3D Manipulation</h3>
            <p className="text-muted-foreground">Rotate, zoom, and pan 3D objects with intuitive controls. Interact with your models in real-time.</p>
          </div>
          
          <div className="p-6 rounded-lg glassmorphism animate-slide-in [animation-delay:150ms]">
            <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Object Upload</h3>
            <p className="text-muted-foreground">Upload .obj and .glb files to view your own 3D models. Share and collaborate with team members.</p>
          </div>
          
          <div className="p-6 rounded-lg glassmorphism animate-slide-in [animation-delay:300ms]">
            <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Scene Persistence</h3>
            <p className="text-muted-foreground">Save camera positions and scene configurations. Return to your work exactly as you left it.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container py-8 border-t border-border text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} 3D Viewer | MERN Stack Application</p>
      </footer>
    </div>
  );
};
export default Home