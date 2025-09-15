// this is a production file :)
console.log("popup.js");

(function() {
    'use strict';
    
    console.log('🔔 Notification system loading...');
    
    // Create notification container
    let container = null;
    
    function createContainer() {
        if (container) return container;
        
        console.log('📦 Creating notification container...');
        
        container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 999999;
            pointer-events: none;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;
        
        // Ensure body exists
        if (!document.body) {
            console.error('❌ Document body not found!');
            return null;
        }
        
        document.body.appendChild(container);
        console.log('✅ Container added to body');
        return container;
    }
    
    function createNotification(options = {}) {
        console.log('🎨 Creating notification with options:', options);
        
        const {
            icon = '🔔',
            title = 'Notification',
            message = '',
            duration = 60000
        } = options;
        
        const notification = document.createElement('div');
        notification.style.cssText = `
            display: flex;
            align-items: flex-start;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 12px;
            width: 320px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            pointer-events: auto;
            cursor: pointer;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        `;
        
        notification.innerHTML = `
            <div style="
                font-size: 24px;
                margin-right: 12px;
                flex-shrink: 0;
                line-height: 1;
            ">${icon}</div>
            <div style="flex: 1; min-width: 0;">
                <div style="
                    font-weight: 600;
                    font-size: 14px;
                    color: #1d1d1f;
                    margin-bottom: 4px;
                    line-height: 1.2;
                ">${title}</div>
                <div style="
                    font-size: 13px;
                    color: #86868b;
                    line-height: 1.3;
                    word-wrap: break-word;
                ">${message}</div>
            </div>
            <div style="
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #007AFF;
                margin-left: 8px;
                flex-shrink: 0;
                margin-top: 3px;
            "></div>
        `;
        
        // Click to dismiss
        notification.addEventListener('click', () => {
            console.log('👆 Notification clicked');
            dismissNotification(notification);
        });
        
        // Hover effects
        notification.addEventListener('mouseenter', () => {
            notification.style.transform = 'translateX(0) scale(1.02)';
        });
        
        notification.addEventListener('mouseleave', () => {
            notification.style.transform = 'translateX(0) scale(1)';
        });
        
        return notification;
    }
    
    function dismissNotification(notification) {
        console.log('👋 Dismissing notification');
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    function showNotification(options) {
        console.log('🚀 showNotification called with:', options);
        
        try {
            const container = createContainer();
            if (!container) {
                console.error('❌ Failed to create container');
                return null;
            }
            
            const notification = createNotification(options);
            container.appendChild(notification);
            console.log('📌 Notification added to container');
            
            // Trigger animation
            requestAnimationFrame(() => {
                console.log('🎬 Animating notification in');
                notification.style.transform = 'translateX(0)';
                notification.style.opacity = '1';
            });
            
            // Auto dismiss
            const duration = options.duration || 60000;
            setTimeout(() => {
                dismissNotification(notification);
            }, duration);
            
            return notification;
            
        } catch (error) {
            console.error('❌ Error showing notification:', error);
            return null;
        }
    }
    
    // Global API
    window.showNotification = showNotification;
    console.log('🌍 Global showNotification function registered');
    
    // Auto-show notification on load
    function init() {
        console.log('🎯 Initializing notification system...');
        
        // Wait a bit to ensure everything is ready
        setTimeout(() => {
            console.log('⏰ Showing initial notification');
            showNotification({
                icon: '🎉',
                title: 'System Ready!',
                message: 'Notification system loaded successfully. Check console for debug info.',
                duration: 8000
            });
        }, 100);
    }
    
    // Multiple ways to ensure DOM is ready
    if (document.readyState === 'complete') {
        console.log('📄 Document already complete, initializing now');
        init();
    } else if (document.readyState === 'loading') {
        console.log('⏳ Document loading, waiting for DOMContentLoaded');
        document.addEventListener('DOMContentLoaded', init);
    } else {
        console.log('📄 Document interactive, initializing now');
        init();
    }
    
    // Fallback
    window.addEventListener('load', () => {
        console.log('🏁 Window loaded, ensuring notification system is active');
        if (!container) {
            init();
        }
    });
    
    console.log('✨ Notification system script fully loaded');
    
})();
