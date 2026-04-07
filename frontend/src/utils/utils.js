export const formatDate = (date) => {
  const diff = Math.floor(
    (Date.now() - new Date(date)) / (1000 * 60 * 60 * 24),
  );

  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff} days ago`;

  return new Date(date).toLocaleDateString();
};
