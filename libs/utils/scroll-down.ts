export const scrollDown = (
  element: HTMLElement | null,
  offset: number = 0
): void => {
  if (element) {
    const y = element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: y + offset,
      behavior: 'smooth',
    });
  }
};
