export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Форматируем дату в нужный формат
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${hours}.${minutes}.${year}`;
};