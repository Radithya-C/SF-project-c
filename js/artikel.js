const timelineList = document.getElementById('timeline-list');
const caseData = CASES[0]; // Dyatlov Pass

caseData.timeline.forEach(item => {
  const li = document.createElement('li');
  li.innerHTML = `<strong>${item.date}:</strong> ${item.event}`;
  timelineList.appendChild(li);
});

