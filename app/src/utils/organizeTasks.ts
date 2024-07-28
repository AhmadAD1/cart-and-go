import dayjs from "dayjs";
const organizeTasksByMonth = (tasks=[]) => {
  const tasksByMonthAndDay = {};

  tasks.forEach((task) => {
    const monthYear = dayjs(task.time).format("YYYY-MM");
    const dayOfMonth = dayjs(task.time).format("YYYY-MM-DD");

    if (!tasksByMonthAndDay[monthYear]) {
      tasksByMonthAndDay[monthYear] = {};
    }

    if (!tasksByMonthAndDay[monthYear][dayOfMonth]) {
      tasksByMonthAndDay[monthYear][dayOfMonth] = [];
    }

    tasksByMonthAndDay[monthYear][dayOfMonth].push(task);
  });

  return tasksByMonthAndDay;
};
export { organizeTasksByMonth };
