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
                  src="/personal_img.jpeg" 
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
                  href="https://github.com/victorunique" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-warm-accent-light dark:hover:text-warm-accent-dark transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/victorunique/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-warm-accent-light dark:hover:text-warm-accent-dark transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>LinkedIn</span>
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
            <strong>FTC Disclaimer:</strong> MindFlex/MaxitHome is a directory listing aggregator platform. 
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
