import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { AppIcon } from '../components/AppIcon';

describe('AppIcon component', () => {
  it('should render icon container with correct style for talkdrill', () => {
    const { container } = render(<AppIcon id="talkdrill" className="w-6 h-6" />);
    const iconWrapper = container.firstElementChild;
    expect(iconWrapper).not.toBeNull();
    expect(iconWrapper?.className).toContain('bg-blue-600/10');
    expect(iconWrapper?.className).toContain('text-blue-600');
  });

  it('should render icon container with correct style for xherbert', () => {
    const { container } = render(<AppIcon id="xherbert" className="w-6 h-6" />);
    const iconWrapper = container.firstElementChild;
    expect(iconWrapper).not.toBeNull();
    expect(iconWrapper?.className).toContain('bg-indigo-500/10');
    expect(iconWrapper?.className).toContain('text-indigo-500');
  });

  it('should render icon container with correct style for type-orbit', () => {
    const { container } = render(<AppIcon id="type-orbit" className="w-6 h-6" />);
    const iconWrapper = container.firstElementChild;
    expect(iconWrapper).not.toBeNull();
    expect(iconWrapper?.className).toContain('bg-cyan-500/10');
    expect(iconWrapper?.className).toContain('text-cyan-500');
  });

  it('should render icon container with correct style for party-nest', () => {
    const { container } = render(<AppIcon id="party-nest" className="w-6 h-6" />);
    const iconWrapper = container.firstElementChild;
    expect(iconWrapper).not.toBeNull();
    expect(iconWrapper?.className).toContain('bg-pink-500/10');
    expect(iconWrapper?.className).toContain('text-pink-500');
  });

  it('should fallback to default style for unknown app id', () => {
    const { container } = render(<AppIcon id="unknown-app" className="w-6 h-6" />);
    const iconWrapper = container.firstElementChild;
    expect(iconWrapper).not.toBeNull();
    expect(iconWrapper?.className).toContain('bg-slate-500/10');
  });
});
