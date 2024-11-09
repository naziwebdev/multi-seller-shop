const createPaginationData = (page, limit, totalCount, resourceName) => {
  return {
    page,
    limit,
    totalPage: Math.ceil(totalCount / limit),
    ["total" + resourceName]: totalCount,
  };
};

module.exports = { createPaginationData };
