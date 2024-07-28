const reformationTasks = (items) => {
  const res = items?.map((item) => {
    const startDate = new Date(item.time);
    // const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
    return {
      id: item._id,
      start: startDate.toISOString(),
      //   end: endDate.toISOString(),
      allDay: true,
      ...item,
    };
  });
  return res;
};
const reformationTask = (item) => {
  const startDate = new Date(item.time);
  // const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
  const res = {
    id: item._id,
    start: startDate.toISOString(),
    // end: endDate,
    allDay: true,
    ...item,
  };
  return res;
};

export { reformationTask, reformationTasks };
