import React from 'react';
import { Briefcase, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
           {/* Brand */}
           <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                 <div className="bg-indigo-600 text-white p-1 rounded">
                    <Briefcase className="h-5 w-5" />
                 </div>
                 <span className="text-xl font-bold text-slate-900">JobReady</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                 The #1 AI-powered career platform designed to help you build, optimize, and land your dream job.
              </p>
           </div>

           {/* Links Column 1 */}
           <div>
              <h4 className="font-bold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                 <li><a href="#" className="hover:text-indigo-600">Features</a></li>
                 <li><a href="#" className="hover:text-indigo-600">Pricing</a></li>
                 <li><a href="#" className="hover:text-indigo-600">Resume Builder</a></li>
                 <li><a href="#" className="hover:text-indigo-600">Success Stories</a></li>
              </ul>
           </div>

           {/* Links Column 2 */}
           <div>
              <h4 className="font-bold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                 <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
                 <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
                 <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
                 <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
              </ul>
           </div>

           {/* Social */}
           <div>
              <h4 className="font-bold text-slate-900 mb-4">Connect</h4>
              <div className="flex space-x-4">
                  <a href="#" className="text-slate-400 hover:text-indigo-600"><Twitter className="h-5 w-5" /></a>
                  <a href="#" className="text-slate-400 hover:text-indigo-600"><Github className="h-5 w-5" /></a>
                  <a href="#" className="text-slate-400 hover:text-indigo-600"><Linkedin className="h-5 w-5" /></a>
              </div>
           </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
           <p>&copy; 2026 JobReady Inc. All rights reserved.</p>
           <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-slate-900">Privacy Policy</a>
              <a href="#" className="hover:text-slate-900">Terms of Use</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
