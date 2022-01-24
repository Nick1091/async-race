function getPositionPointer(elem: HTMLElement) {
  const { left, width } = elem.getBoundingClientRect();
  return left + width;
}

export function getDistance(start: HTMLElement, finish: HTMLElement) {
  const startPosition = getPositionPointer(start);
  const finishPosition = getPositionPointer(finish);
  return finishPosition - startPosition;
}
