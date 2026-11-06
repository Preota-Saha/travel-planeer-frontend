import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  icon = null,
  iconPosition = 'left',
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
    xl: 'px-9 py-4 text-lg'
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-primary text-primary-content hover:bg-primary/90 border border-primary/20',
    secondary: 'bg-secondary text-secondary-content hover:bg-secondary/90 border border-secondary/20',
    accent: 'bg-accent text-accent-content hover:bg-accent/90 border border-accent/20',
    success: 'bg-success text-success-content hover:bg-success/90 border border-success/20',
    warning: 'bg-warning text-warning-content hover:bg-warning/90 border border-warning/20',
    error: 'bg-error text-error-content hover:bg-error/90 border border-error/20',
    outline: 'bg-transparent border-2 border-base-300 text-base-content hover:bg-base-200',
    ghost: 'bg-transparent hover:bg-base-200 text-base-content',
    gradient: 'bg-gradient-to-r from-orange-400 to-amber-400 text-white hover:from-orange-500 hover:to-amber-500 border-0 shadow-lg shadow-orange-500/30'
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-xl
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${loading ? 'cursor-wait' : ''}
    ${className}
  `;

  return (
    <button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
            fill="none"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      
      <span>{children}</span>
      
      {!loading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </button>
  );
};

export default Button;