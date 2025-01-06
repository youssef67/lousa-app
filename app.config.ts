export default defineAppConfig({
  ui: {
    variables: {
      light: {
        background: '254 247 238', // '250 252 255', // ##fafcff #F4EEE1
        foreground: '0 27 46' // #001B2E
      },
      dark: {
        background: '0 27 46', // #001B2E
        foreground: '223 238 255' // #DFEEFF
      }
    },
    colors: ['lousa-input-bg'] as string[],
    primary: 'lousa-primary',
    gray: 'cool',
    modal: {
      rounded: 'rounded-3xl'
    },
    select: {
      rounded: 'rounded-full',
      default: {
        size: 'xl',
        variant: 'none'
      },
      variant: {
        none: 'dark:bg-lousa-input-bg-dark bg-lousa-input-bg-light text-black font-semibold'
      },
      icon: { trailing: { pointer: '' } },
      placeholder: 'placeholder-gray-400 dark:placeholder-gray-500 font-semibold'
    },
    selectMenu: {
      rounded: 'rounded-xl'
    },
    button: {
      font: 'font-semibold',
      rounded: 'rounded-lg',
      default: {
        size: 'md'
      },
      color: {
        'lousa-input-bg': {
          solid:
            'shadow-md ring-0 ring-inset ring-gray-300 dark:ring-gray-700 text-lousa-text-over-input-light dark:lousa-text-over-input-dark bg-lousa-input-bg-light hover:bg-lousa-input-bg-100 disabled:bg-white aria-disabled:bg-white dark:bg-lousa-input-bg-dark dark:hover:bg-lousa-input-bg-100 dark:disabled:bg-gray-900 dark:aria-disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
          ghost:
            'text-lousa-text-over-input-light dark:text-lousa-text-over-input-dark hover:bg-lousa-text-over-input-dark/10 dark:hover:bg-lousa-text-over-input-dark/10 focus-visible:ring-inset focus-visible:ring-0 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400'
        }
      }
    },
    checkbox: {
      rounded: 'rounded-md'
    },
    input: {
      default: {
        size: 'md',
        variant: 'none'
      },
      variant: {
        none: 'dark:bg-lousa-input-bg-dark bg-lousa-input-bg-light text-black'
      },
      icon: { trailing: { pointer: '' } },
      rounded: 'rounded-lg',
      placeholder: 'placeholder-gray-400 dark:placeholder-gray-500 font-semibold'
    },
    dropdown: {
      rounded: 'rounded-3xl',
      padding: 'p-0',
      item: {
        padding: 'px-3 py-4',
        size: 'text-xl'
      }
    },
    inputMenu: {
      rounded: 'rounded-3xl',
      padding: 'p-2',
      container: 'z-20 group mt-4',
      default: {
        selectedIcon: '',
        trailingIcon: ''
      },
      variant: {
        none: 'dark:bg-lousa-input-bg-dark bg-lousa-input-bg-light text-black'
      },
      option: {
        rounded: 'rounded-xl',
        padding: 'px-2 py-2'
      },
      icon: { trailing: { pointer: '' } },
      placeholder: 'placeholder-gray-400 dark:placeholder-gray-500 font-semibold'
    },
    card: {
      rounded: 'rounded-xl'
    },
    footer: {
      top: {
        wrapper: 'border-t border-gray-200 dark:border-gray-800',
        container: 'py-8 lg:py-16'
      },
      bottom: {
        wrapper: 'border-t border-gray-200 dark:border-gray-800'
      }
    },
    header: {
      wrapper: 'bg-background/75 backdrop-blur border-b-0 border-gray-200 dark:border-gray-800 -mb-px sticky top-0 z-50'
    },
    page: {
      hero: {
        wrapper: 'lg:py-24'
      }
    },
    slideover: {
      width: 'w-screen max-w-xs',
    }
  }
})
