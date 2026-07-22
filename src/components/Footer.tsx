import React from 'react';
import { Mail, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="about" className="bg-warm-surface-light dark:bg-[#0b0f19] border-t border-warm-border-light/20 dark:border-warm-border-dark/20 pt-16 pb-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Bio info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-warm-accent-light dark:border-warm-accent-dark">
                <img 
                  src="/avatar.jpg" 
                  alt="Victor Xu" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-warm-text-light dark:text-warm-text-dark">Victor Xu</h3>
            </div>
            <p className="text-warm-muted-light dark:text-warm-muted-dark leading-relaxed mb-6">
              An IT Specialist, Solution Architect, and AI Enthusiast based in Ireland,
              passionate about building scalable cloud systems and exploring the frontiers of Artificial Intelligence.
            </p>
          </div>

          {/* Expertise */}
          <div>
            <h4 className="text-warm-text-light dark:text-warm-text-dark font-bold mb-6">Expertise</h4>
            <ul className="space-y-3 text-warm-muted-light dark:text-warm-muted-dark text-sm">
              <li className="flex items-start">
                <span className="text-warm-accent-light dark:text-warm-accent-dark mr-2">✓</span>
                <span>AI/ML & Agentic Engineering</span>
              </li>
              <li className="flex items-start">
                <span className="text-warm-accent-light dark:text-warm-accent-dark mr-2">✓</span>
                <span>Cloud Architecture (AWS/Azure/GCP)</span>
              </li>
              <li className="flex items-start">
                <span className="text-warm-accent-light dark:text-warm-accent-dark mr-2">✓</span>
                <span>Big Data & Analytics</span>
              </li>
              <li className="flex items-start">
                <span className="text-warm-accent-light dark:text-warm-accent-dark mr-2">✓</span>
                <span>Full Stack Development</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-warm-text-light dark:text-warm-text-dark font-bold mb-6">Contact</h4>
            <ul className="space-y-3 text-warm-muted-light dark:text-warm-muted-dark text-sm">
              <li>
                <a 
                  href="https://availlogic.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-warm-accent-light dark:hover:text-warm-accent-dark transition-colors flex items-center"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  <span>Website</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:victor.xu@availlogic.com"
                  className="hover:text-warm-accent-light dark:hover:text-warm-accent-dark transition-colors flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  <span>Email</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* FTC Outcome Claim Disclaimer Section */}
        <div className="border-t border-warm-border-light/20 dark:border-warm-border-dark/20 pt-8 mb-8 text-center max-w-3xl mx-auto">
          <p className="text-xs text-warm-muted-light dark:text-warm-muted-dark leading-relaxed">
            <strong>FTC Disclaimer:</strong> MindFlex is a directory listing aggregator platform. 
            The applications listed here are designed to challenge cognitive skills (such as logic, focus, and memory). 
            They do not claim to treat, cure, improve, or prevent any cognitive decline, disease, or medical condition.
          </p>
          <p className="text-xs text-warm-muted-light/75 dark:text-warm-muted-dark/75 mt-2">
            This platform uses privacy-first, cookie-free analytics via Cloudflare Web Analytics to measure outbound referral clicks.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center text-warm-muted-light/60 dark:text-warm-muted-dark/60 text-xs">
          <p>&copy; {new Date().getFullYear()} Victor Xu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
