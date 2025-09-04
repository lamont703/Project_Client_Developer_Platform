// Global DOM Protection Script
(function() {
    'use strict';
    
    console.log('🔒 Global DOM Protection Script Loaded');
    
    // Store original methods
    const originalAddEventListener = Element.prototype.addEventListener;
    const originalQuerySelector = document.querySelector;
    const originalGetElementById = document.getElementById;
    
    // Safe addEventListener wrapper
    Element.prototype.addEventListener = function(type, listener, options) {
        try {
            if (this && typeof this.addEventListener === 'function') {
                return originalAddEventListener.call(this, type, listener, options);
            } else {
                console.warn('Attempted to addEventListener to null/undefined element:', type);
                return;
            }
        } catch (error) {
            console.error('addEventListener error:', error);
            return;
        }
    };
    
    // Safe querySelector wrapper with hash URL protection
    document.querySelector = function(selector) {
        try {
            if (typeof selector === 'string') {
                // Fix invalid hash-based selectors (e.g., '#/developers' -> '#developers')
                let fixedSelector = selector;
                if (selector.startsWith('#/')) {
                    fixedSelector = '#' + selector.substring(2);
                    console.warn('Fixed invalid hash selector:', selector, '->', fixedSelector);
                }
                
                const result = originalQuerySelector.call(this, fixedSelector);
                if (result === null) {
                    console.warn('querySelector returned null for:', selector);
                }
                return result;
            }
            return null;
        } catch (error) {
            console.error('querySelector error:', error);
            return null;
        }
    };
    
    // Safe getElementById wrapper with hash URL protection
    document.getElementById = function(id) {
        try {
            if (typeof id === 'string') {
                // Fix invalid hash-based IDs (e.g., '/developers' -> 'developers')
                let fixedId = id;
                if (id.startsWith('/')) {
                    fixedId = id.substring(1);
                    console.warn('Fixed invalid hash ID:', id, '->', fixedId);
                }
                
                const result = originalGetElementById.call(this, fixedId);
                if (result === null) {
                    console.warn('getElementById returned null for:', id);
                }
                return result;
            }
            return null;
        } catch (error) {
            console.error('getElementById error:', error);
            return null;
        }
    };
    
    // Protect against null DOM access
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
        try {
            if (tagName && typeof tagName === 'string') {
                return originalCreateElement.call(this, tagName);
            }
            console.warn('Invalid tagName for createElement:', tagName);
            return originalCreateElement.call(this, 'div');
        } catch (error) {
            console.error('createElement error:', error);
            return originalCreateElement.call(this, 'div');
        }
    };
    
    // Additional protection for GoHighLevel specific issues
    const originalQuerySelectorAll = document.querySelectorAll;
    document.querySelectorAll = function(selector) {
        try {
            if (typeof selector === 'string') {
                // Fix invalid hash-based selectors
                let fixedSelector = selector;
                if (selector.startsWith('#/')) {
                    fixedSelector = '#' + selector.substring(2);
                    console.warn('Fixed invalid hash selector in querySelectorAll:', selector, '->', fixedSelector);
                }
                
                return originalQuerySelectorAll.call(this, fixedSelector);
            }
            return [];
        } catch (error) {
            console.error('querySelectorAll error:', error);
            return [];
        }
    };
    
    // Protect against React hydration issues
    const originalAppendChild = Node.prototype.appendChild;
    Node.prototype.appendChild = function(child) {
        try {
            if (this && child) {
                return originalAppendChild.call(this, child);
            } else {
                console.warn('Attempted to appendChild with null/undefined node or child');
                return null;
            }
        } catch (error) {
            console.error('appendChild error:', error);
            return null;
        }
    };
    
    // Protect against React rendering issues
    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function(newNode, referenceNode) {
        try {
            if (this && newNode) {
                return originalInsertBefore.call(this, newNode, referenceNode);
            } else {
                console.warn('Attempted to insertBefore with null/undefined node');
                return null;
            }
        } catch (error) {
            console.error('insertBefore error:', error);
            return null;
        }
    };
    
    console.log('✅ DOM Protection Script Active with HashRouter Support');
})(); 