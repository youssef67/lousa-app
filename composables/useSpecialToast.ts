export const useSpecialToast = () => {
  const toast = useToast()

  const showError = (title: string, description?: string) => {
    toast.add({
      title: title,
      description: description,
      color: 'red',
      closeButton: {
        color: 'white'
      },
      ui: {
        rounded: 'rounded-xl',
        progress: {
          base: 'absolute bottom-0 end-0 start-0 h-1',
          background: 'bg-red-200 dark:bg-red-200'
        },
        ring: 'ring-0 ring-red-800 dark:ring-red-800',
        background: 'bg-red-500 dark:bg-red-500',
        title: 'text-base font-medium text-red-100 dark:text-red-100',
        description: 'mt-1 text-xs leading-4 text-gray-300 dark:text-gray-300'
      }
    })
  }

  const showSuccess = (title: string, description?: string) => {
    toast.add({
      title: title,
      description: description,
      color: 'green',
      closeButton: {
        color: 'white'
      },
      ui: {
        progress: {
          base: 'absolute bottom-0 end-0 start-0 h-1',
          background: 'bg-green-200 dark:bg-green-200'
        },
        ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
        background: 'bg-green-100 dark:bg-green-500',
        title: 'text-base font-medium text-green-100 dark:text-green-100',
        description: 'mt-1 text-xs leading-4 text-gray-300 dark:text-gray-300'
      }
    })
  }

  return {
    showError,
    showSuccess
  }
}
