export const formatDate = (value: string | Date) => {
  return new Date(value).toLocaleDateString('pt-br', { dateStyle: 'short' })
}
