import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from '../useTheme';

describe('useTheme Hook', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    document.body.className = '';
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.style.cssText = '';
    document.head.querySelector('meta[name="theme-color"]')?.remove();
    const themeColor = document.createElement('meta');
    themeColor.name = 'theme-color';
    themeColor.content = '#ffffff';
    document.head.append(themeColor);
  });

  it('should initialize with light mode by default', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.querySelector('meta[name="theme-color"]').content).toBe('#ffffff');
    expect(document.documentElement.style.backgroundColor).toBe('rgb(255, 255, 255)');
  });

  it('should toggle theme state and update DOM classes', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.body.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.querySelector('meta[name="theme-color"]').content).toBe('#09090b');
    expect(document.documentElement.style.backgroundColor).toBe('rgb(9, 9, 11)');
    expect(document.documentElement.style.colorScheme).toBe('dark');
  });

  it('should restore theme state from localStorage if present', () => {
    localStorage.setItem('theme', 'dark');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
