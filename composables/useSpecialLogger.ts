export const useSpecialLogger = () => {
  const e = async (message: string, data?: any) => {
    console.error(message, data)
  }

  const d = async (message: string, data?: any) => {
    console.log(message, data)
  }

  const reportIllegalState = async (message: string, data?: any) => {
    // TODO REPORT ILLEGAL STATE
    console.log(message, data)
  }

  return {
    e,
    d,
    reportIllegalState
  }
}
