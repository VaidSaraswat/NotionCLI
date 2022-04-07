const formatPageId = (unformattedPageId) => {
  const pageId =
    unformattedPageId.slice(0, 8) +
    "-" +
    unformattedPageId.slice(8, 12) +
    "-" +
    unformattedPageId.slice(12, 16) +
    "-" +
    unformattedPageId.slice(16, 20) +
    "-" +
    unformattedPageId.slice(20);

  return pageId;
};

module.exports = formatPageId;
