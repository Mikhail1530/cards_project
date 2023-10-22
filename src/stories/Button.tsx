import './button.css'

interface ButtonProps {
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * MyButton contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * How large should the Button be?
   */
  size?: 'large' | 'medium' | 'small'
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  backgroundColor,
  label,
  primary = false,
  size = 'medium',
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-Button--primary' : 'storybook-Button--secondary'

  return (
    <button
      className={['storybook-Button', `storybook-button--${size}`, mode].join(' ')}
      style={{ backgroundColor }}
      type={'button'}
      {...props}
    >
      {label}
    </button>
  )
}
